var scene;
var camera;
var camera_track = {
  move_mode: "default",
  horizon_degree: 0,
  vertical_degree: Math.PI / 4
}
var renderer;

var earth;
var sun;

var earth_axis;
var terminator;
var equator;
var tropic;
var subsolar_point;
var ecliptic;

var is_revolution = true;

init();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
const canvas = document.querySelector("canvas");
canvas.style["width"] = "90%";
canvas.style["height"] = "90%";

initCamera();
initEarth();
initSun();
initEarthAxis();
initTerminator();
initEquator();
initSubsolarPoint();
initTropic();

addMesh();

let x = 0;
let z = -3.5;

animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(82, window.innerWidth / window.innerHeight, 0.1, 100);
  renderer = new THREE.WebGLRenderer({ alpha: true });

  earth = {
    geometry: new THREE.SphereGeometry(0.4, 128, 128),
    texture: {
      day: new THREE.TextureLoader().load("./src/earth_daymap.jpg"),
      night: new THREE.TextureLoader().load("./src/8k_earth_nightmap.jpg"),
      nightmask: new THREE.TextureLoader().load("./src/8k_earth_nightmask.jpg")
    },
    autorotation: {
      axis: new THREE.Vector3(-Math.sin(23.5 * (Math.PI / 180)), -Math.cos(23.5 * (Math.PI / 180)), 0),
      degree: -Math.PI / 180
    },
    revolution: {
      degree: 0,
      step: Math.PI / 1080,
      term_step: -1
    }
  };
  earth.material = new THREE.ShaderMaterial({
    uniforms: {
      day_texture: { type: "t", value: earth.texture.day }, // 定义一个纹理类型的uniform变量day_texture，表示地球白天的贴图
      night_texture: { type: "t", value: earth.texture.night }, // 定义一个纹理类型的uniform变量night_texture，表示地球夜晚的贴图
      night_mask: { type: "t", value: earth.texture.nightmask },
      light_position: { type: "v3", value: new THREE.Vector3(0, 0, 0) }, // 定义一个三维向量类型的uniform变量light_position，表示光源位置
      view_matrix: { type: "m4", value: camera.matrixWorldInverse },
      emissive_color: { type: "v3", value: new THREE.Color(0xffff00) }
    },
    vertexShader: `
      varying vec2 v_uv; // 定义一个二维向量类型的varying变量v_uv，用于传递纹理坐标
      varying vec3 v_normal; // 定义一个三维向量类型的varying变量v_normal，用于传递法线向量
      varying vec3 v_position; // 定义一个三维向量类型的varying变量v_position，用于传递像素点位置
      void main() {
        v_uv = uv; // 将顶点的uv属性赋值给v_uv变量
        v_normal = normalMatrix * normal; // 将顶点的normal属性乘以normalMatrix矩阵，得到变换后的法线向量，并赋值给v_normal变量
        v_position = (modelMatrix * vec4(position, 1.0)).xyz; // 计算像素点位置，并赋值给v_position变量
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // 计算顶点位置，并赋值给gl_Position变量
      }
    `,
    fragmentShader: `
      uniform sampler2D day_texture; // 接收uniform变量day_texture
      uniform sampler2D night_texture; // 接收uniform变量night_texture
      uniform sampler2D night_mask;
      uniform vec3 light_position; // 接收uniform变量light_position
      uniform vec3 emissive_color;
      uniform mat4 view_matrix;

      varying vec2 v_uv; // 接收varying变量v_uv
      varying vec3 v_normal; // 接收varying变量v_normal
      varying vec3 v_position;
  
      void main() {
        vec4 day_color = pow(texture2D(day_texture, v_uv), vec4(0.8)); // 根据纹理坐标采样白天贴图的颜色
        vec4 night_color = pow(texture2D(night_texture, v_uv), vec4(1.2)); // 根据纹理坐标采样夜晚贴图的颜色
        vec4 mask_color = texture2D(night_mask, v_uv);

        vec3 light_pos = (view_matrix * vec4(light_position, 1.0)).xyz; // 将光源位置转换到视图空间
        vec3 pixel_pos = (view_matrix * vec4(v_position, 1.0)).xyz; // 将像素点位置转换到视图空间

        vec3 light_dir = normalize(light_pos - pixel_pos); // 计算光源方向向量，并归一化

        float dot_product = dot(v_normal, light_dir); // 计算光线和地球位置的点积，表示太阳和地球的相对位置
        float diffuse_factor = max(dot_product, 0.0); // 计算漫反射系数，按照Lambert定律
        float ambient_factor = 0.1; // 定义环境光系数
        float glow_intensity = mask_color.r;

        vec4 base_color = mix(night_color, day_color, diffuse_factor + ambient_factor); // 使用内置函数mix按照光照系数混合两个颜色值，实现白天和夜晚的过渡效果，并考虑漫反射、镜面反射和环境光的影响
        vec4 glow_color = pow(night_color * glow_intensity, vec4(0.8));

        gl_FragColor = base_color + glow_color; // 设置片元颜色为混合后的颜色
      }
    `
  });

  earth.mesh = new THREE.Mesh(earth.geometry, earth.material);

  sun = {
    geometry: new THREE.SphereGeometry(0.5, 128, 128),
    texture: new THREE.TextureLoader().load("./src/8k_sun.jpg")
  }
  sun.material = new THREE.MeshBasicMaterial({ map: sun.texture });
  sun.mesh = new THREE.Mesh(sun.geometry, sun.material);

  earth_axis = {
    geometry: new THREE.CylinderGeometry(0.01, 0.01, 1.2, 128),
    texture: new THREE.MeshBasicMaterial({ color: 0xff0000 })
  }
  earth_axis.mesh = new THREE.Mesh(earth_axis.geometry, earth_axis.texture);

  terminator = {
    geometry: new THREE.CylinderGeometry(0.40043, 0.40043, 0.015, 128, 1, true),
    texture: new THREE.MeshBasicMaterial({ color: 0xffff00 })
  }
  terminator.mesh = new THREE.Mesh(terminator.geometry, terminator.texture);

  equator = {
    geometry: new THREE.CylinderGeometry(0.40057, 0.40057, 0.015, 128, 1, true),
    texture: new THREE.MeshBasicMaterial({ color: 0xff4b9b })
  }
  equator.mesh = new THREE.Mesh(equator.geometry, equator.texture);

  ecliptic = {
    geometry: new THREE.CylinderGeometry(5, 5, 0.00001, 128),
    texture: new THREE.MeshBasicMaterial({
      color: 0xdddddd,
      opacity: 0.5,
      transparent: true
    })
  }
  ecliptic.mesh = new THREE.Mesh(ecliptic.geometry, ecliptic.texture);

  subsolar_point = {
    geometry: new THREE.CylinderGeometry(0.0075, 0.0075, 0.001, 128),
    texture: new THREE.MeshBasicMaterial({ color: 0xd7ff80 })
  }
  subsolar_point.mesh = new THREE.Mesh(subsolar_point.geometry, subsolar_point.texture);

  tropic = {
    geometry: {
      north: new THREE.CylinderGeometry(0.36, 0.375, 0.015, 128, 1, true),
      south: new THREE.CylinderGeometry(0.375, 0.36, 0.015, 128, 1, true),
    },
    texture: new THREE.MeshBasicMaterial({ color: 0x4bc8ff }),
    mesh: {}
  }
  tropic.mesh.north = new THREE.Mesh(tropic.geometry.north, tropic.texture);
  tropic.mesh.south = new THREE.Mesh(tropic.geometry.south, tropic.texture);
}

function initEarth() {
  earth.mesh.castShadow = true;
  earth.mesh.geometry.center();
  earth.mesh.rotation.z = -23.5 * (Math.PI / 180);
  earth.mesh.geometry.center();
  earth.mesh.position.y = 0;
  earth.mesh.translateZ(-2);
}

function initSun() {
  sun.mesh.position.y = 0;
}

function initCamera() {
  camera.position.y = 7.5;
  camera.position.z = 7.5;
  camera.lookAt(0, 0, 0.8);
  camera.zoom = 2.8;
  camera.updateProjectionMatrix();
}

function initEarthAxis() {
  earth_axis.mesh.rotation.z = -23.5 * (Math.PI / 180);
}

function initTerminator() {
  terminator.mesh.rotation.x = Math.PI / 2;
}

function initEquator() {
  equator.mesh.rotation.z = -23.5 * (Math.PI / 180);
}

function initSubsolarPoint() {
  subsolar_point.mesh.rotation.x = Math.PI / 2;
}

function initTropic() {
  tropic.mesh.north.rotation.z = -23.5 * (Math.PI / 180);
  tropic.mesh.south.rotation.z = -23.5 * (Math.PI / 180);

  tropic.mesh.north.position.y = 0.4 * Math.sin(23.5 * (Math.PI / 180)) * Math.cos(23.5 * (Math.PI / 180)) + 0.005;
  tropic.mesh.south.position.y = -0.4 * Math.sin(23.5 * (Math.PI / 180)) * Math.cos(23.5 * (Math.PI / 180)) - 0.005;
}

function addMesh() {
  scene.add(earth.mesh);
  scene.add(sun.mesh);
  scene.add(earth_axis.mesh);
  scene.add(terminator.mesh);
  scene.add(equator.mesh);
  scene.add(subsolar_point.mesh);
}

function update() {
  if (is_revolution)
    if (earth.revolution.term_step == -1)
      earth.revolution.degree += earth.revolution.step;
    else
      earth.revolution.degree += earth.revolution.term_step;

  if (earth.revolution.degree >= Math.PI * 2)
    earth.revolution.degree -= Math.PI * 2;

  x = -3.5 * Math.sin(earth.revolution.degree);
  z = -3.5 * Math.cos(earth.revolution.degree);

  sun.mesh.rotation.y += 0.004;
  earth.mesh.rotateOnWorldAxis(earth.autorotation.axis, earth.autorotation.degree);
  terminator.mesh.rotation.z = -earth.revolution.degree;
  subsolar_point.mesh.rotation.z = -earth.revolution.degree;

  earth.mesh.position.x = x;
  earth.mesh.position.z = z;

  earth_axis.mesh.position.x = x;
  earth_axis.mesh.position.z = z;

  terminator.mesh.position.x = x;
  terminator.mesh.position.z = z;

  equator.mesh.position.x = x;
  equator.mesh.position.z = z;

  subsolar_point.mesh.position.x = 31 / 35 * x;
  subsolar_point.mesh.position.z = 31 / 35 * z;

  tropic.mesh.north.position.x = x + 0.4 * Math.pow(Math.sin(23.5 * (Math.PI / 180)), 2);
  tropic.mesh.south.position.x = x - 0.4 * Math.pow(Math.sin(23.5 * (Math.PI / 180)), 2);
  tropic.mesh.north.position.z = z;
  tropic.mesh.south.position.z = z;

  cameraMoveUpdate();
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
}

function animate() {
  requestAnimationFrame(animate);

  update();

  renderer.render(scene, camera);
}