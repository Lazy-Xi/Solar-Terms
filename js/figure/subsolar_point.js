var subsolar_point = {
    geometry: new THREE.CylinderGeometry(0.0075, 0.0075, 0.001, 128),
    material: new THREE.MeshBasicMaterial({ color: 0xd7ff80 })
};
subsolar_point.mesh = new THREE.Mesh(subsolar_point.geometry, subsolar_point.material);
subsolar_point.mesh.rotation.x = Math.PI / 2;