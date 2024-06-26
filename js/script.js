const radios = {
    default: document.getElementById("default"),
    track: document.getElementById("track"),
    face_to: document.getElementById("face-to"),
    same_direction: document.getElementById("same-direction"),
    look_equator: document.getElementById("look-equator")
};
const track_degrees = {
    horizon: document.getElementById("horizon"),
    vertical: document.getElementById("vertical"),
    zoom: document.getElementById("zoom")
};
const checkboxes = {
    earth_axis: document.getElementById("earth-axis"),
    terminator: document.getElementById("terminator"),
    ecliptic: document.getElementById("ecliptic"),
    subsolar_point: document.getElementById("subsolar-point"),
    graticules: document.getElementById("graticules"),
    lunar_orbit_plane: document.getElementById("lunar-orbit-plane")
};
const pause_button = document.getElementById("pause-btn");

degree_box = document.getElementById("ecliptic-longitude");
term_box = document.getElementById("term-period");

var last_move_mode = "default";
document.querySelector("select").addEventListener("change", function (e) {
    last_move_mode = camera_track.move_mode;
    camera_track.move_mode = e.target.value;

    if (camera_track.move_mode == "default") {
        initCamera();

        camera_track.horizon_degree = 0;
        camera_track.vertical_degree = 45 * (Math.PI / 180);

        horizon.value = 0;
        vertical.value = 45;
    }
    else if (camera_track.move_mode == "look-equator") {
        camera_track.vertical_degree = 0;
        vertical.value = 0;
    }
    else if (last_move_mode == "default") {
        camera.position.y = 0;

        camera_track.horizon_degree = 0;
        camera_track.vertical_degree = 0;

        horizon.value = 0;
        vertical.value = 0;
    }
});

track_degrees.horizon.addEventListener("input", function () {
    camera_track.horizon_degree = track_degrees.horizon.value * (Math.PI / 180);
})
track_degrees.vertical.addEventListener("input", function () {
    if (camera_track.move_mode == "default") {
        if (track_degrees.vertical.value >= 80)
            track_degrees.vertical.value = 80;
        if (track_degrees.vertical.value <= -80)
            track_degrees.vertical.value = -80;
    }
    else if (camera_track.move_mode == "look-equator") {
        track_degrees.vertical.value = 0;
    }
    camera_track.vertical_degree = track_degrees.vertical.value * (Math.PI / 180);
})
track_degrees.zoom.addEventListener("input", function () {
    camera.zoom = track_degrees.zoom.value;
    camera.updateProjectionMatrix();
})

function resetCamera() {
    if (camera_track.move_mode == "default") {
        track_degrees.vertical.value = 45;
        camera_track.vertical_degree = Math.PI / 4;
    }
    else {
        track_degrees.vertical.value = 0;
        camera_track.vertical_degree = 0;
    }

    track_degrees.horizon.value = 0;
    track_degrees.zoom.value = 2.8;

    camera_track.horizon_degree = 0;
    camera.zoom = 2.8;
    camera.updateProjectionMatrix();
}

checkboxes.earth_axis.addEventListener("change", function () {
    if (checkboxes.earth_axis.checked == true)
        scene.add(earth_axis.mesh);
    else
        scene.remove(earth_axis.mesh);
});
checkboxes.terminator.addEventListener("change", function () {
    if (checkboxes.terminator.checked == true)
        scene.add(terminator.mesh);
    else
        scene.remove(terminator.mesh);
});
checkboxes.ecliptic.addEventListener("change", function () {
    if (checkboxes.ecliptic.checked == true)
        scene.add(ecliptic.mesh);
    else
        scene.remove(ecliptic.mesh);
});
checkboxes.subsolar_point.addEventListener("change", function () {
    if (checkboxes.subsolar_point.checked == true)
        scene.add(subsolar_point.mesh);
    else
        scene.remove(subsolar_point.mesh);
});
checkboxes.graticules.addEventListener("change", function () {
    if (checkboxes.graticules.checked == true)
        scene.add(graticules.mesh);
    else
        scene.remove(graticules.mesh);
});
checkboxes.lunar_orbit_plane.addEventListener("change", function () {
    if (checkboxes.lunar_orbit_plane.checked == true)
        scene.add(lunar_orbit_plane.mesh);
    else
        scene.remove(lunar_orbit_plane.mesh);
});

pause_button.addEventListener("click", function () {
    if (this.value === "暂停旋转") {
        this.value = "继续旋转";

        is_revolution = false;
        is_autorotation = false;
    }
    else {
        this.value = "暂停旋转";

        if (!is_exist_card)
            is_revolution = true;
        is_autorotation = true;
    }
});