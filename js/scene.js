var scene;
var camera;
var camera_track = {
    move_mode: "default",
    horizon_degree: 0,
    vertical_degree: Math.PI / 4
}
var renderer;

var is_revolution = true;
var is_autorotation = true;
var is_moon_rotation = true;

var degree_box;
var term_box;

const phi = 23.5 * (Math.PI / 180);
const beta = 5.1 * (Math.PI / 180);

var x = 0;
var z = -3.5;

init();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
const canvas = document.querySelector("canvas");
canvas.style["width"] = "90%";
canvas.style["height"] = "90%";

initCamera();

function initCamera() {
    camera.position.y = 7.5;
    camera.position.z = 7.5;
    camera.lookAt(0, 0, 0.8);
    camera.zoom = 2.8;
    camera.updateProjectionMatrix();
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(82, window.innerWidth / window.innerHeight, 0.1, 100);
    renderer = new THREE.WebGLRenderer({ alpha: true });
}