(function (global) {
  'use strict';
  global.createArchiveShelfScene = function ({ host, albums, theme = 'light', onInvalidate = () => {}, onFailure = () => {}, caseFactory = global.createArchiveJewelCase, resourceFactory = global.createArchiveCaseResources }) {
    const THREE = global.THREE;
    if (!THREE || !global.ARCHIVE_COVER_TEXTURES) throw new Error('本地 3D 资源未完整加载');
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(global.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0xb9b1a2, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    const canvas = renderer.domElement;
    canvas.className = 'shelf-canvas'; canvas.setAttribute('aria-hidden', 'true');
    host.prepend(canvas);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    camera.position.set(0, 0.6, 8.5); camera.lookAt(0, 0, 0);
    const hemisphere = new THREE.HemisphereLight(0xf7f4ec, 0x65717c, 2.2); scene.add(hemisphere);
    const key = new THREE.DirectionalLight(0xfff9ed, 2.8); key.position.set(-3, 5, 6); scene.add(key);
    const fill = new THREE.DirectionalLight(0xe6edf3, 1.6); fill.position.set(5, 2, 4); scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 1.1); rim.position.set(-5, -1, -2); scene.add(rim);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const cases = new Map();
    const caseResources = resourceFactory(THREE);
    let width = 0, height = 0, disposed = false, lost = false;
    let currentTheme = theme === 'dark' ? 'dark' : 'light';
    function setTheme(value) {
      if (disposed || !['light', 'dark'].includes(value)) return;
      currentTheme = value;
      const dark = value === 'dark';
      renderer.setClearColor(dark ? 0x191815 : 0xb9b1a2, 0);
      renderer.toneMappingExposure = dark ? 0.96 : 0.95;
      hemisphere.color.setHex(dark ? 0xfff8e9 : 0xf7f4ec);
      hemisphere.groundColor.setHex(dark ? 0x42413d : 0x65717c);
      hemisphere.intensity = dark ? 1.55 : 1.65;
      key.color.setHex(dark ? 0xfff6e8 : 0xfff9ed); key.intensity = dark ? 2.35 : 2.5;
      fill.color.setHex(dark ? 0xe2ecf1 : 0xe6edf3); fill.intensity = dark ? 1.15 : 1.25;
      rim.intensity = dark ? 0.72 : 0.85;
      cases.forEach(item => item.setTheme(value));
      onInvalidate(); // Also repaint a completely settled/idle shelf.
    }
    setTheme(currentTheme);
    function dispose() {
      if (disposed) return;
      disposed = true;
      const geometries = new Set(), materials = new Set(), textures = new Set();
      caseResources.collect(geometries, materials, textures);
      scene.traverse(object => {
        if (object.geometry) geometries.add(object.geometry);
        for (const material of object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : []) {
          materials.add(material); for (const key of ['map','normalMap','roughnessMap','envMap']) if (material[key]) textures.add(material[key]);
        }
      });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
      renderer.dispose(); canvas.remove();
    }
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault(); lost = true;
      onFailure('3D 显示暂不可用，仍可通过下方专辑列表查看资料。');
    });
    // Data-URI JPEG images are origin-clean. Local JPGs remain separate originals.
    function loadTexture(album) {
      return new Promise((resolve, reject) => {
        const data = global.ARCHIVE_COVER_TEXTURES[album.id];
        if (!data || !data.startsWith('data:image/jpeg;base64,')) { reject(new Error('封面纹理缺失')); return; }
        const image = new Image();
        image.onload = () => {
          if (disposed) { resolve(null); return; }
          const texture = new THREE.Texture(image); texture.colorSpace = THREE.SRGBColorSpace;
          texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy()); texture.needsUpdate = true;
          resolve(texture);
        };
        image.onerror = () => reject(new Error('封面纹理解码失败'));
        image.src = data;
      });
    }
    const parts = global.ARCHIVE_CASE_TEXTURES;
    const caseTextureReady = !caseResources.setPartTexture ? Promise.resolve() : Promise.all(
      ['disc','hub','plastic-top','plastic-bottom','plastic-spine','plastic-right'].map(name => new Promise((resolve,reject) => {
        const data=parts && parts[name];
        if (!data || !data.startsWith('data:image/png;base64,')) { reject(new Error('本地分部件贴图缺失：'+name)); return; }
        const image=new Image();
        image.onload=()=>{
          if(!disposed){const texture=new THREE.Texture(image);texture.colorSpace=THREE.SRGBColorSpace;
            texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());texture.needsUpdate=true;
            caseResources.setPartTexture(name,texture);}
          resolve();
        };
        image.onerror=()=>reject(new Error('本地分部件贴图解码失败：'+name));image.src=data;
      })));
    const ready = Promise.all([caseTextureReady, ...albums.map(async album => {
      const texture = await loadTexture(album);
      if (!texture || disposed) return;
      // Read at completion, not at load start: user may toggle during decode.
      const item = caseFactory(THREE, texture, currentTheme, caseResources);
      item.root.userData.albumId = album.id;
      item.root.traverse(object => { object.userData.albumId = album.id; });
      cases.set(album.id, item); scene.add(item.root);
    })]).then(() => { if (disposed) throw new Error('场景已释放'); });

    function resize() {
      const box = host.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(box.width));
      const nextHeight = Math.max(1, Math.round(box.height));
      if (nextWidth !== width || nextHeight !== height) {
        width = nextWidth; height = nextHeight; renderer.setSize(width, height, false);
        camera.aspect = width / height; camera.updateProjectionMatrix();
      }
    }
    function render({ visible, position, activeId, pull = 0, lid = 0, reduced = false, dt = 16 }) {
      if (disposed || lost || !host.clientWidth) return;
      resize();
      // A mobile open box needs room for BOTH halves. Zoom is framing, not a
      // simulated camera orbit; reduced-motion input uses the final frame.
      // The open lid comes toward the camera by ~1.9 units beyond the tray.
      // Include that depth in the fit so its left edge stays inside narrow screens.
      const openZ = Math.max(8.5, 3.6 + 6.0 / camera.aspect / (2 * Math.tan(17 * Math.PI / 180)));
      const blend = reduced ? 1 : 1 - Math.exp(-dt / 75);
      let moving = false;
      function approach(value, target) {
        if (reduced || Math.abs(target - value) < 0.001) return target;
        moving = true; return THREE.MathUtils.lerp(value, target, blend);
      }
      camera.position.set(0, approach(camera.position.y, 0.6 * (1-pull)), approach(camera.position.z, THREE.MathUtils.lerp(8.5, openZ, pull)));
      camera.lookAt(0, 0, 0);
      const selectedIndex = visible.indexOf(activeId);
      cases.forEach((item, id) => {
        const index = visible.indexOf(id);
        item.root.visible = index >= 0;
        if (index < 0) return;
        const delta = index - position;
        const base = new THREE.Vector3(delta * 2.45, -Math.abs(delta) * 0.025, -Math.abs(delta) * 0.16);
        let x = 0, y = 0, z = 0;
        let angle = reduced ? 0 : -0.4 + THREE.MathUtils.clamp(delta * -0.07, -0.18, 0.18);
        if (id === activeId) {
          x += 0.96 * pull;
          y = -base.y * pull;
          z = (1.55 - base.z) * pull;
          angle *= 1 - pull;
        } else {
          if (activeId) {
            x += (index < selectedIndex ? -1 : 1) * pull * 2.6;
            z -= pull * 1.0;
          }
        }
        // Browsing translation has ONE interpolated position, owned by shelf.js.
        // Only the independent open/close pose is eased here; never ease base again.
        const first = !item.initialized; item.initialized = true;
        const offset = item.poseOffset || (item.poseOffset = new THREE.Vector3());
        offset.set(first ? x : approach(offset.x,x), first ? y : approach(offset.y,y), first ? z : approach(offset.z,z));
        item.root.position.copy(base).add(offset);
        item.root.rotation.set(0, first ? angle : approach(item.root.rotation.y,angle), 0);
        item.openAmount = approach(item.openAmount || 0, id === activeId ? lid : 0);
        item.setOpen(item.openAmount);
      });
      renderer.render(scene, camera);
      // A tilted case can cover the screen center even when its tray origin is
      // farther away than its neighbour's. Prefer the actually visible center
      // hit; projected tray distance is only the fallback for gaps in the rail.
      const centers = visible.map(id => {
        const point = cases.get(id).root.getWorldPosition(new THREE.Vector3()).project(camera);
        return { id, x: point.x, y: point.y };
      });
      const centerId = pickAt(0, 0) || centers.reduce((best, point) => !best || Math.abs(point.x) < Math.abs(best.x) ? point : best, null)?.id;
      return { moving, centerId, centers, position };
    }
    function pick(clientX, clientY) {
      if (disposed || lost) return null;
      const box = canvas.getBoundingClientRect();
      return pickAt((clientX - box.left) / box.width * 2 - 1, -(clientY - box.top) / box.height * 2 + 1);
    }
    function pickAt(x, y) {
      pointer.set(x, y);
      raycaster.setFromCamera(pointer, camera);
      const roots = [...cases.values()].filter(item => item.root.visible).map(item => item.root);
      return raycaster.intersectObjects(roots, true)[0]?.object.userData.albumId || null;
    }
    return Object.freeze({ ready, render, pick, dispose, canvas, setTheme });
  };
}(window));
