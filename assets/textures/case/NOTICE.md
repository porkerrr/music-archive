# Component textures from supplied reference

Original cd-transparent.png remains byte-identical (SHA256 1f90055fc54ce4218c466a019d95079e235dec4c53b05167b815a10aafb7a1b2).
Source: user-provided PNG, 2026-10-14. Independent image rights remain UNVERIFIED. EIDDIE MIT code permission is not image permission.

Runtime now uses six derived RGBA component textures, not the full source image:
disc.png (annular disc only), hub.png (tray hub only), plastic-top.png,
plastic-bottom.png, plastic-spine.png, plastic-right.png. Rectangular strips
retain original pixels and Alpha; circular masks separate the disc/hub and remove
any disc pixels from plastic strips. No relighting, normal/roughness conversion,
background fill or JPEG conversion. Measurements: component-measurements.json.

Rebuild derivations with Python + Pillow: python scripts/split-case-textures.py.
Then node scripts/build-case-texture.cjs embeds only those six files in
cd-transparent.js for offline origin-clean upload. Production does not need Python,
Node, a server or network. Older composite assets are unused history.
