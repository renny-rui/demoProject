<template>
  <div class="earth-container" ref="earthContainer"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default {
  name: "Earth3D",
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      earthMesh: null,
      cloudMesh: null,
      gridMesh: null,
      animationId: null,
    };
  },
  mounted() {
    this.initThree();
    window.addEventListener("resize", this.onWindowResize);
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationId);
    if (this.renderer) {
      this.renderer.dispose();
    }
    window.removeEventListener("resize", this.onWindowResize);
  },
  methods: {
    initThree() {
      const container = this.$refs.earthContainer;
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 创建场景
      const scene = new THREE.Scene();
      this.scene = scene;
      scene.background = new THREE.Color(0x000000);

      // 创建相机
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 3;
      this.camera = camera;

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
      this.renderer = renderer;

      // 控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // 光源
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      // 贴图加载
      const textureLoader = new THREE.TextureLoader();
      const earthTexture = textureLoader.load("../assets/earth.jpg");
      const cloudTexture = textureLoader.load("../assets/clouds.png");

      // 地球材质
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: earthTexture,
      });

      // 地球模型
      const earthGeometry = new THREE.SphereGeometry(1, 64, 64);
      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earthMesh);
      this.earthMesh = earthMesh;

      // 云层
      const cloudGeometry = new THREE.SphereGeometry(1.01, 64, 64);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: cloudTexture,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      });
      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
      scene.add(cloudMesh);
      this.cloudMesh = cloudMesh;

      // ✅ 水平网格动态 Shader
      const gridVertexShader = `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normal;

          // 仅对 Y 轴（纬线方向）进行扰动
          vec3 newPosition = position;
          newPosition.y += sin(uTime + position.y * 10.0) * 0.01;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `;

      const gridFragmentShader = `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          // 控制透明度：只渲染水平线
          float lineWidth = 0.01;
          float alpha = smoothstep(lineWidth, lineWidth + 0.005, abs(vUv.y - 0.5));

          // 控制颜色与动态流动效果
          float flow = sin(uTime + vUv.y * 20.0) * 0.5 + 0.5;
          gl_FragColor = vec4(0.0, 1.0, 0.8, alpha * flow);
        }
      `;

      const gridUniforms = {
        uTime: { value: 0 },
      };

      const gridMaterial = new THREE.ShaderMaterial({
        uniforms: gridUniforms,
        vertexShader: gridVertexShader,
        fragmentShader: gridFragmentShader,
        transparent: true,
        wireframe: true,
      });

      // 网格线模型（仅水平线）
      const gridGeometry = new THREE.SphereGeometry(1.02, 64, 64);
      const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
      scene.add(gridMesh);
      this.gridMesh = gridMesh;

      // 动画循环
      const animate = () => {
        this.animationId = requestAnimationFrame(animate);
        const elapsedTime = performance.now() / 1000;
        gridUniforms.uTime.value = elapsedTime;

        earthMesh.rotation.y += 0.001;
        cloudMesh.rotation.y += 0.0005;
        gridMesh.rotation.y += 0.001;

        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    },

    onWindowResize() {
      const container = this.$refs.earthContainer;
      if (!container || !this.camera || !this.renderer) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },
  },
};
</script>

<style scoped>
.earth-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  background-color: transparent;
  opacity: 0.6;
}
</style>
