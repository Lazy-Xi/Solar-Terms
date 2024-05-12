var earth_axis = {
    geometry: new THREE.CylinderGeometry(0.005, 0.005, 1.2, 128),
    material: new THREE.MeshBasicMaterial({ color: 0xff0000 })
};
earth_axis.mesh = new THREE.Mesh(earth_axis.geometry, earth_axis.material);
earth_axis.mesh.rotation.z = -phi;