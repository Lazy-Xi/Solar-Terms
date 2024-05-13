scene.add(earth.mesh);
scene.add(sun.mesh);
scene.add(earth_axis.mesh);
scene.add(terminator.mesh);
scene.add(subsolar_point.mesh);
scene.add(graticules.mesh);
scene.add(moon.mesh);
scene.add(lunar_orbit_plane.mesh);

animate();

function update() {
    if (is_revolution) {
        if (earth.revolution.term_step == -1) {
            earth.revolution.degree += earth.revolution.step;
        }
        else {
            earth.revolution.degree += earth.revolution.term_step;
        }
    }

    if (earth.revolution.degree >= Math.PI * 2) {
        earth.revolution.degree -= Math.PI * 2;
    }

    if (is_moon_rotation) {
        moon.revolution.degree += moon.revolution.step;
        moon.mesh.rotateOnWorldAxis(moon.autorotation.axis, moon.autorotation.step);
    }

    if (moon.revolution.degree >= Math.PI * 2) {
        moon.revolution.degree -= Math.PI * 2;
    }

    x = -1 * earth_revolution_radius * Math.sin(earth.revolution.degree);
    z = -1 * earth_revolution_radius * Math.cos(earth.revolution.degree);

    sun.mesh.rotation.y += 0.004;

    if (is_autorotation) {
        earth.mesh.rotateOnWorldAxis(earth.autorotation.axis, earth.autorotation.step);
        graticules.mesh.rotateOnWorldAxis(earth.autorotation.axis, earth.autorotation.step);
    }

    terminator.mesh.rotation.z = -earth.revolution.degree;
    subsolar_point.mesh.rotation.z = -earth.revolution.degree;

    earth.mesh.position.x = x;
    earth.mesh.position.z = z;
    graticules.mesh.position.x = x;
    graticules.mesh.position.z = z;

    moon.mesh.position.x = x - moon_revolution_radius * Math.cos(moon.revolution.degree) * Math.cos(beta);
    moon.mesh.position.y = moon_revolution_radius * Math.cos(moon.revolution.degree) * Math.sin(beta);
    moon.mesh.position.z = z + moon_revolution_radius * Math.sin(moon.revolution.degree);

    earth_axis.mesh.position.x = x;
    earth_axis.mesh.position.z = z;

    terminator.mesh.position.x = x;
    terminator.mesh.position.z = z;

    subsolar_point.mesh.position.x = 0.88301064 * x;
    subsolar_point.mesh.position.z = 0.88301064 * z;

    lunar_orbit_plane.mesh.position.x = x;
    lunar_orbit_plane.mesh.position.z = z;

    cameraMoveUpdate();

    degree_box.innerHTML = (Math.round(earth.revolution.degree * (180 / Math.PI))).toString() + "°";

    let p = parseInt(Math.round(earth.revolution.degree * (12 / Math.PI))) % 24;
    term_box.innerHTML = dict[p];
}

function cameraMoveUpdate() {
    if (camera_track.move_mode == "default") {
        camera.position.x = -15 / Math.sqrt(2) * Math.sin(camera_track.horizon_degree) * Math.cos(camera_track.vertical_degree);
        camera.position.y = 15 / Math.sqrt(2) * Math.sin(camera_track.vertical_degree);
        camera.position.z = 15 / Math.sqrt(2) * Math.cos(camera_track.horizon_degree) * Math.cos(camera_track.vertical_degree);
        camera.lookAt(-0.8 * Math.sin(camera_track.horizon_degree), 0, 0.8 * Math.cos(camera_track.horizon_degree));
    }
    else if (camera_track.move_mode == "track") {
        camera.position.x = x + 3 * Math.cos(earth.revolution.degree - Math.PI / 2 + camera_track.horizon_degree) * Math.cos(camera_track.vertical_degree);
        camera.position.y = 3 * Math.sin(camera_track.vertical_degree);
        camera.position.z = z - 3 * Math.sin(earth.revolution.degree - Math.PI / 2 + camera_track.horizon_degree) * Math.cos(camera_track.vertical_degree);
        camera.lookAt(x, 0, z);
    }
    else if (camera_track.move_mode == "face-to") {
        camera.position.x = x - 3 * Math.sin(camera_track.horizon_degree) * Math.cos(camera_track.vertical_degree);
        camera.position.y = 3 * Math.sin(camera_track.vertical_degree);
        camera.position.z = z + 3 * Math.cos(camera_track.horizon_degree) * Math.cos(camera_track.vertical_degree);
        camera.lookAt(x, 0, z);
    }
    else if (camera_track.move_mode == "same-direction") {
        camera.position.x = x + 3 * Math.sin(earth.revolution.degree - Math.PI / 2 - camera_track.horizon_degree) * Math.cos(camera_track.vertical_degree);
        camera.position.y = 3 * Math.sin(camera_track.vertical_degree);
        camera.position.z = z + 3 * Math.cos(earth.revolution.degree - Math.PI / 2 - camera_track.horizon_degree) * Math.cos(camera_track.vertical_degree);
        camera.lookAt(x, 0, z);
    }
    else if (camera_track.move_mode == "look-equator") {
        let positive_position = new THREE.Vector3(
            -3 * Math.cos(earth.revolution.degree - Math.PI / 2 + camera_track.horizon_degree),
            0,
            3 * Math.sin(earth.revolution.degree - Math.PI / 2 + camera_track.horizon_degree)
        );
        let relative_position = earth_axis.mesh.localToWorld(positive_position.clone());
        camera.position.x = relative_position.x;
        camera.position.y = relative_position.y;
        camera.position.z = relative_position.z;

        camera.rotation.z = 0;
        camera.lookAt(x, 0, z);

        let dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        dir.normalize();

        let theta = -phi * Math.cos(earth.revolution.degree + camera_track.horizon_degree);
        camera.rotateOnWorldAxis(dir, theta);

        camera.updateProjectionMatrix();
    }
}

function animate() {
    requestAnimationFrame(animate);

    update();

    renderer.render(scene, camera);
}