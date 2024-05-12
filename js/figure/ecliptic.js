var ecliptic = {
    geometry: new THREE.CylinderGeometry(7, 7, 0.00001, 128),
    material: new THREE.MeshBasicMaterial({
        color: 0xdfdb8c,
        opacity: 0.5,
        transparent: true
    })
};
ecliptic.mesh = new THREE.Mesh(ecliptic.geometry, ecliptic.material);