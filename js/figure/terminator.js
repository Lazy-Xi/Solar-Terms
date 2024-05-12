var terminator = {
    geometry: new THREE.CylinderGeometry(0.40043, 0.40043, 0.01, 128, 1, true),
    material: new THREE.MeshBasicMaterial({ color: 0xffff00 })
};
terminator.mesh = new THREE.Mesh(terminator.geometry, terminator.material);
terminator.mesh.rotation.x = Math.PI / 2;