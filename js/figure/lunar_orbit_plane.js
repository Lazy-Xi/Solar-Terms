var lunar_orbit_plane = {
    geometry: new THREE.CylinderGeometry(1.15, 1.15, 0.00001, 128),
    material: new THREE.MeshBasicMaterial({
        color: 0xdfdb8c,
        opacity: 0.5,
        transparent: true
    })
};

lunar_orbit_plane.mesh = new THREE.Mesh(lunar_orbit_plane.geometry, lunar_orbit_plane.material);
lunar_orbit_plane.mesh.position.y = 0;
lunar_orbit_plane.mesh.rotation.z = -beta;