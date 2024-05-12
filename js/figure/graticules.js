var graticules = {
    geometry: new THREE.SphereGeometry(0.41, 128, 128),
    texture: new THREE.TextureLoader().load("./src/earth_graticules.png"),
    alpha: new THREE.TextureLoader().load("./src/earth_graticules_alpha.png")
};
graticules.material = new THREE.MeshBasicMaterial({
    map: graticules.texture,
    alphaMap: graticules.alpha,
    transparent: true
});
graticules.mesh = new THREE.Mesh(graticules.geometry, graticules.material);
graticules.mesh.geometry.center();
graticules.mesh.rotation.z = -phi;
graticules.mesh.geometry.center();
graticules.mesh.position.y = 0;