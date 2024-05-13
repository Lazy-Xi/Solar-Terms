var earth = {
    geometry: new THREE.SphereGeometry(0.4, 128, 128),
    texture: {
        day: new THREE.TextureLoader().load("./src/earth_daymap.jpg"),
        night: new THREE.TextureLoader().load("./src/earth_nightmap.jpg"),
        nightmask: new THREE.TextureLoader().load("./src/earth_nightmask.jpg")
    },
    autorotation: {
        axis: new THREE.Vector3(-Math.sin(phi), -Math.cos(phi), 0),
        step: -Math.PI / 75
    },
    revolution: {
        degree: 0,
        step: Math.PI / 1800,
        term_step: -1
    }
};

earth.material = new THREE.ShaderMaterial({
    uniforms: {
        day_texture: { type: "t", value: earth.texture.day },
        night_texture: { type: "t", value: earth.texture.night },
        night_mask: { type: "t", value: earth.texture.nightmask },
        light_position: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
        view_matrix: { type: "m4", value: camera.matrixWorldInverse }
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
}`,
    fragmentShader: `
uniform sampler2D day_texture; // 接收uniform变量day_texture
uniform sampler2D night_texture; // 接收uniform变量night_texture
uniform sampler2D night_mask;
uniform vec3 light_position; // 接收uniform变量light_position
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
}`
});

earth.mesh = new THREE.Mesh(earth.geometry, earth.material);
earth.mesh.castShadow = true;
earth.mesh.rotation.z = -phi;
earth.mesh.position.y = 0;