var sun = {
    geometry: new THREE.SphereGeometry(0.5, 128, 128),
    texture: new THREE.TextureLoader().load("./src/sun.jpg")
};
sun.material = new THREE.MeshBasicMaterial({ map: sun.texture });
sun.mesh = new THREE.Mesh(sun.geometry, sun.material);
sun.mesh.position.y = 0;