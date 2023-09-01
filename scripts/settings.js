var radios = {
    default: document.getElementById("default"),
    track: document.getElementById("track"),
    face_to: document.getElementById("face-to"),
    same_direction: document.getElementById("same-direction")
};
var track_degrees = {
    horizon: document.getElementById("horizon"),
    vertical: document.getElementById("vertical")
};
var checkboxes = {
    earth_axis: document.getElementById("earth-axis"),
    terminator: document.getElementById("terminator"),
    equator: document.getElementById("equator"),
    ecliptic: document.getElementById("ecliptic"),
    subsolar_point: document.getElementById("subsolar-point"),
    tropic: document.getElementById("tropic")
};

function onTrackModeUpdate(e) {
    const last_move_mode = camera_track.move_mode;
    camera_track.move_mode = e.value;

    if (camera_track.move_mode == "default") {
        initCamera();

        camera_track.horizon_degree = 0;
        camera_track.vertical_degree = 45 * (Math.PI / 180);

        horizon.value = 0;
        vertical.value = 45;
    }
    else if (last_move_mode == "default") {
        camera.position.y = 0;

        camera_track.horizon_degree = 0;
        camera_track.vertical_degree = 0;

        horizon.value = 0;
        vertical.value = 0;
    }
}

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
    camera_track.vertical_degree = track_degrees.vertical.value * (Math.PI / 180);
})

function resetCamera() {
    console.log(camera_track.move_mode);
    if (camera_track.move_mode == "default") {
        track_degrees.vertical.value = 45;
        camera_track.vertical_degree = Math.PI / 4;
    }
    else {
        track_degrees.vertical.value = 0;
        camera_track.vertical_degree = 0;
    }

    track_degrees.horizon.value = 0;
    camera_track.horizon_degree = 0;
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
checkboxes.equator.addEventListener("change", function () {
    if (checkboxes.equator.checked == true)
        scene.add(equator.mesh);
    else
        scene.remove(equator.mesh);
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
checkboxes.tropic.addEventListener("change", function () {
    if (checkboxes.tropic.checked == true) {
        scene.add(tropic.mesh.north);
        scene.add(tropic.mesh.south);
    }
    else {
        scene.remove(tropic.mesh.north);
        scene.remove(tropic.mesh.south)
    }
});