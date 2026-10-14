/* YeVerse-derived material approach. Copyright (c) 2025 EIDDIE — MIT.
 * Full license: assets/vendor/YEVERSE-LICENSE.txt. Geometry rebuilt from measured
 * component boundaries; source bitmap is never placed on a whole-case plane.
 */
(function (global) {
  'use strict';
  const S=2.65/1224, W=2.65, H=1153*S, CX=(664-626)*S, CY=(606.5-602)*S;
  const R=516*S, HOLE=132*S;
  global.createYeVerseCaseResources=function(THREE){
    const geometries=new Map();
    const geometry=(key,create)=>{if(!geometries.has(key))geometries.set(key,create());return geometries.get(key);};
    const plastic=(opacity)=>new THREE.MeshPhysicalMaterial({color:0xbac5c7,metalness:0,roughness:.3,clearcoat:.45,clearcoatRoughness:.22,transparent:true,opacity,depthWrite:false,side:THREE.DoubleSide});
    // Photographed reflections already contain lighting; do not light them twice.
    const printed=()=>new THREE.MeshBasicMaterial({transparent:true,opacity:1,alphaTest:.015,depthWrite:false,toneMapped:false,side:THREE.FrontSide});
    const materials={shellPlastic:plastic(.22),lidPlastic:plastic(.36),hingeMaterial:plastic(.4),trayMaterial:plastic(.22),discMaterial:printed(),hub:printed(),discEdge:new THREE.MeshStandardMaterial({color:0xa7afb2,metalness:.35,roughness:.42})};
    for(const part of ['plastic-top','plastic-bottom','plastic-spine','plastic-right'])materials[part]=printed();
    function setTheme(value){const dark=value==='dark';materials.trayMaterial.color.setHex(dark?0x292825:0x78868a);materials.shellPlastic.opacity=dark?.2:.26;materials.lidPlastic.opacity=dark?.29:.36;}
    function setPartTexture(name,texture){const mat=name==='disc'?materials.discMaterial:materials[name];if(mat){mat.map=texture;mat.needsUpdate=true;}}
    function setDiscTexture(texture){setPartTexture('disc',texture);}
    function collect(gs,ms,ts){geometries.forEach(g=>gs.add(g));Object.values(materials).forEach(m=>{ms.add(m);if(m.map)ts.add(m.map);});}
    return {geometry,materials,setTheme,setPartTexture,setDiscTexture,collect};
  };
  global.createYeVerseJewelCase=function(THREE,texture,theme='light',shared){
    const resources=shared||global.createYeVerseCaseResources(THREE),{geometry,materials:m}=resources;
    const root=new THREE.Group();root.name='jewel-case';const tray=new THREE.Group();tray.name='box-bottom';root.add(tray);
    const unitBox=geometry('box',()=>new THREE.BoxGeometry(1,1,1));
    function mesh(parent,name,g,material,x=0,y=0,z=0){const o=new THREE.Mesh(g,material);o.name=name;o.position.set(x,y,z);parent.add(o);return o;}
    function box(parent,name,x,y,z,w,h,d,material){const o=mesh(parent,name,unitBox,material,x,y,z);o.scale.set(w,h,d);return o;}
    // One silhouette: every side wall occupies the same pixel footprint as its
    // front detail strip and extends backwards, never outside the reference.
    const bounds={top:[14,30,1238,80],bottom:[14,1132,1238,1183],spine:[14,80,164,1132],right:[1184,80,1238,1132]};
    const rear=new THREE.Group();rear.name='tray-back';tray.add(rear);
    for(const [part,b] of Object.entries(bounds)){
      const w=(b[2]-b[0])*S,h=(b[3]-b[1])*S,x=((b[0]+b[2])/2-626)*S,y=(606.5-(b[1]+b[3])/2)*S;
      // Narrow actual perimeter walls; the wide spine has a clear recessed plate.
      const wallW=part==='spine'?.042:w,wallX=part==='spine'?-W/2+.021:x;
      box(rear,part==='top'?'rear-top':'wall-'+part,wallX,y,-.035,wallW,h,.19,m.trayMaterial);
      if(part==='spine')box(tray,'spine-plate',x,y,-.07,w,h,.018,m.shellPlastic);
      mesh(tray,'detail-'+part,geometry('detail-'+part,()=>new THREE.PlaneGeometry(w,h)),m['plastic-'+part],x,y,.064);
    }
    // Sparse inferred back support: no solid rectangle under transparent corners.
    for(const y of [-.68,.68])box(tray,'rear-support',CX,y,-.10,1.85,.024,.025,m.shellPlastic);
    function ring(key,inner,outer){return geometry(key,()=>new THREE.RingGeometry(inner,outer,128));}
    const discGeometry=geometry('disc-front',()=>{
      const g=new THREE.RingGeometry(HOLE,R,128),p=g.attributes.position,uv=g.attributes.uv;
      for(let i=0;i<p.count;i++)uv.setXY(i,p.getX(i)/(2*R)+.5,p.getY(i)/(2*R)+.5);
      return g;
    });
    const disc=mesh(tray,'compact-disc',discGeometry,m.discMaterial,CX,CY,.075);
    mesh(tray,'disc-back',ring('disc-back',HOLE,R),m.discEdge,CX,CY,.063).rotation.y=Math.PI;
    for(const [name,r] of [['disc-outer-edge',R],['disc-hole-edge',HOLE]]){
      const g=geometry(name,()=>new THREE.CylinderGeometry(r,r,.012,128,1,true));
      const o=mesh(tray,name,g,m.discEdge,CX,CY,.069);o.rotation.x=Math.PI/2;
    }
    const hubRadius=86*S;
    const hubBase=mesh(tray,'tray-hub',geometry('hub-base',()=>new THREE.CylinderGeometry(hubRadius,hubRadius,.045,64)),m.shellPlastic,CX,CY,.058);hubBase.rotation.x=Math.PI/2;
    mesh(tray,'hub-detail',geometry('hub-detail',()=>new THREE.PlaneGeometry(hubRadius*2,hubRadius*2)),m.hub,CX,CY,.083);
    const hinge=new THREE.Group();hinge.name='left-hinge';hinge.position.set(-W/2,0,.13);root.add(hinge);
    const lid=new THREE.Group();lid.name='hinged-lid';hinge.add(lid);
    // Cover/lid share the outer footprint. Thin lid edges form the opening seam,
    // not a second larger concentric frame around the front texture.
    for(const y of [-H/2+.013,H/2-.013])box(lid,'lid-edge',W/2,y,0,W,.026,.025,m.lidPlastic);
    for(const x of [.013,W-.013])box(lid,'lid-side',x,0,0,.026,H,.025,m.lidPlastic);
    const coverSize=2.30,coverX=W/2+.13;
    const coverGeometry=geometry('cover',()=>new THREE.PlaneGeometry(coverSize,coverSize));
    const cover=mesh(lid,'original-cover',coverGeometry,new THREE.MeshBasicMaterial({map:texture,toneMapped:false,side:THREE.FrontSide}),coverX,0,.025);
    const innerCover=mesh(lid,'inner-cover',geometry('inner-cover',()=>new THREE.PlaneGeometry(coverSize,coverSize)),new THREE.MeshBasicMaterial({map:texture,toneMapped:false,side:THREE.FrontSide}),coverX,0,-.021);innerCover.rotation.y=Math.PI;
    // Clear side margins only: no white layer over the album cover.
    box(lid,'lid-spine',.1,0,0,.18,H,.018,m.lidPlastic);
    for(const y of [-.96,.96])mesh(root,'hinge-pin',geometry('hinge-pin',()=>new THREE.CylinderGeometry(.032,.032,.20,20)),m.hingeMaterial,-W/2+.032,y,.13);
    function setOpen(amount){hinge.rotation.y=-2.35*Math.max(0,Math.min(1,amount));}
    function setTheme(value){resources.setTheme(value);}setTheme(theme);
    return {root,tray,disc,hinge,lid,cover,innerCover,resources,setOpen,setTheme};
  };
}(window));
