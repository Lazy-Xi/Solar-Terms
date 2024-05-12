var moon = {
    geometry: new THREE.SphereGeometry(0.15, 128, 128),
    texture: new THREE.TextureLoader().load("./src/moon.jpg"),
    autorotation: {
        axis: new THREE.Vector3(-Math.sin(beta), -Math.cos(beta), 0),
        step: -Math.PI / 150,
    },
    revolution: {
        degree: 0,
        step: Math.PI / 150
    }
};

moon.material = new THREE.ShaderMaterial({
    uniforms: {
        moon_texture: { type: "t", value: moon.texture },
        light_position: { type: "v3", value: new THREE.Vector3(0, 0, 0) },
        view_matrix: { type: "m4", value: camera.matrixWorldInverse },
        gray_color: { type: "v4", value: new THREE.Vector4(0, 0, 0, 1) }
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
uniform sampler2D moon_texture; // 接收uniform变量texture
uniform vec3 light_position; // 接收uniform变量light_position
uniform mat4 view_matrix;
uniform vec4 gray_color;

varying vec2 v_uv; // 接收varying变量v_uv
varying vec3 v_normal; // 接收varying变量v_normal
varying vec3 v_position;

void main() {
    vec4 color = pow(texture2D(moon_texture, v_uv), vec4(0.8)); // 根据纹理坐标采样白天贴图的颜色

    vec3 light_pos = (view_matrix * vec4(light_position, 1.0)).xyz; // 将光源位置转换到视图空间
    vec3 pixel_pos = (view_matrix * vec4(v_position, 1.0)).xyz; // 将像素点位置转换到视图空间

    vec3 light_dir = normalize(light_pos - pixel_pos); // 计算光源方向向量，并归一化

    float dot_product = dot(v_normal, light_dir); // 计算光线和月球位置的点积，表示太阳和月球的相对位置
    float diffuse_factor = max(dot_product, 0.0); // 计算漫反射系数，按照Lambert定律
    float ambient_factor = 0.1; // 定义环境光系数

    gl_FragColor = mix(gray_color, color, diffuse_factor + ambient_factor); // 使用内置函数mix按照光照系数混合两个颜色值，实现白天和夜晚的过渡效果，并考虑漫反射、镜面反射和环境光的影响
}`
});

moon.mesh = new THREE.Mesh(moon.geometry, moon.material);
moon.mesh.castShadow = true;
moon.mesh.position.y = 0;
moon.mesh.rotation.z = -beta;