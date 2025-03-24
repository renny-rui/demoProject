<template>
  <div class="container" @click="handleContainerClick">
    <!-- 视频播放区域 -->
    <div v-if="showVideo" class="video-container">
      <video ref="videoPlayer" class="video-player" :src="require('@/assets/0001-0060.mp4')" autoplay muted playsinline
        @ended="onEnded"></video>
    </div>
   
    <!-- 战场信息展示区域 - 只显示3D模型，不显示卡片 -->
    <div v-if="!showVideo" class="battlefield-container">
      
      <!-- <div class="battlefield-header">
        <div class="topic" style="color: #fff; position: absolute;font-size: 22px;">军事训练--模拟演习</div>
        <img :src="require('@/assets/header.png')" alt="Header" />
      </div> -->

      <!-- Three.js容器 -->
      <div ref="threeContainer" class="three-container">
        <div class="full-screen-header"></div>
      </div>

      <!-- 右侧悬浮菜单栏 -->
      <div ref="floatingMenu" class="floating-menu" :class="{ 'collapsed': isMenuCollapsed }" @click.stop>
        <div class="menu-toggle" @click="toggleMenu">
          <i :class="isMenuCollapsed ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
        </div>

        <div class="menu-content-wrapper">
          <div class="menu-header">
            <h3>智能化评估系统</h3>
            <span class="close-btn" @click="toggleMenu">×</span>
          </div>
          <div class="menu-content">
            <div class="menu-item" :class="{ 'active': activeMenuItem === 'userManage' }"
              @click="handleMenuItemClick('userManage')">
              <img src="@/assets/Menu Botton1.png" alt="人员信息" class="menu-icon" />
              <span>用户管理</span>
            </div>
            <div class="submenu" v-if="activeMenuItem === 'userManage'">
              <div class="submenu-item" @click="showUserInfoDialog">
                <span>人员信息</span>
              </div>
              <div class="submenu-item" @click="navigateTo('/user/organization')">
                <span>组织结构</span>
              </div>
              <div class="submenu-item" @click="navigateTo('/user/roles')">
                <span>权限管理</span>
              </div>
              <div class="submenu-item" @click="navigateTo('/user/logs')">
                <span>操作日志</span>
              </div>
              <div class="submenu-item" @click="showUserInfoDialog">
                <span>用户信息</span>
              </div>
            </div>
            <div class="menu-item" :class="{ 'active': activeMenuItem === 'deviceManage' }"
              @click="handleMenuItemClick('deviceManage')">
              <img src="@/assets/Menu Botton 2.png" alt="设备管理" class="menu-icon" />
              <span>设备管理</span>
            </div>
            <div class="submenu" v-if="activeMenuItem === 'deviceManage'">
              <div class="submenu-item" @click="navigateTo('/management/equipment')">
                <span>设备列表</span>
              </div>
              <div class="submenu-item" @click="navigateTo('/management/equipment')">
                <span>设备状态</span>
              </div>
              <div class="submenu-item" @click="navigateTo('/management/equipment')">
                <span>设备控制</span>
              </div>
            </div>
            <div class="menu-item" :class="{ 'active': activeMenuItem === 'scoreManage' }"
              @click="handleMenuItemClick('scoreManage')">
              <img src="@/assets/Menu Botton 3.png" alt="课程管理" class="menu-icon" />
              <span>成绩管理</span>
            </div>
            <div class="submenu" v-if="activeMenuItem === 'scoreManage'">
              <div class="submenu-item" @click="navigateTo('/management/grades')">
                <span>成绩列表</span>
              </div>
              <div class="submenu-item" @click="navigateTo('/management/grades')">
                <span>成绩分析</span>
              </div>
            </div>
            <div class="menu-item" :class="{ 'active': activeMenuItem === 'contentManage' }"
              @click="handleMenuItemClick('contentManage')">
              <img src="@/assets/Menu Botton 4.png" alt="成绩管理" class="menu-icon" />
              <span>示教内容管理</span>
            </div>
            <div class="submenu" v-if="activeMenuItem === 'contentManage'">
              <div class="submenu-item" @click="navigateTo('/management/content')">
                <span>内容列表</span>
              </div>
              <div class="submenu-item" @click="navigateTo('/management/content')">
                <span>内容上传</span>
              </div>
            </div>
            <div class="menu-item" :class="{ 'active': activeMenuItem === 'taskPublish' }"
              @click="handleMenuItemClick('taskPublish')">
              <i class="el-icon-picture"></i>
              <span>任务发布</span>
            </div>
            <div class="menu-item" :class="{ 'active': activeMenuItem === 'taskManage' }"
              @click="handleMenuItemClick('taskManage')">
              <i class="el-icon-s-order"></i>
              <span>任务分配</span>
            </div>
            <div class="submenu" v-if="activeMenuItem === 'taskManage'">
              <div class="submenu-item" @click="navigateTo('/tasks/device-binding')">
                <span>设备/人员绑定</span>
              </div>
              <div class="submenu-item" @click="navigateTo('/tasks/task-assignment')">
                <span>任务分配</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>

    <!-- 帮助面板 -->
    <div v-if="showHelpPanel" class="help-panel">
      <div class="help-panel-header">
        <h3>帮助信息</h3>
        <i class="el-icon-close" @click="toggleHelpPanel"></i>
      </div>
      <div class="help-panel-content">
        <p>这是一个战场模拟系统，展示了红蓝双方的兵力部署和战场态势。</p>
        <p>您可以通过点击视频控制按钮来播放/暂停视频。</p>
        <p>视频结束后，将展示3D战场模型。</p>
        <p>在3D模式下，您可以：</p>
        <ul>
          <li>使用鼠标拖拽旋转视角</li>
          <li>使用鼠标滚轮缩放</li>
          <li>使用右侧菜单控制战场显示</li>
        </ul>
      </div>
    </div>

    <!-- 用户信息对话框 -->
    <el-dialog
      title="用户信息"
      :visible.sync="userInfoDialogVisible"
      width="70%"
      :before-close="closeUserInfoDialog"
      custom-class="user-info-dialog"
      :append-to-body="true"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :modal="false"
    >
      <UserInfo />
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUserInfoDialog">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import CardDisplay from '@/components/CardDisplay.vue';
import UserInfo from '@/views/user/UserInfo.vue'; // Import UserInfo component
export default {
  name: 'BattleSimulation',
  components: {
    CardDisplay,
    UserInfo
  },
  data() {
    return {
      // 视频相关
      showHelpPanel: false,
      showVideo: true,

      // Three.js 相关
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      airplane: null, // 存储飞机模型
      tank: null, // 存储坦克模型
      tankLoading: true, // Add loading state for tank
      secondTank: null, // 存储第二个坦克模型
      terrain: null, // 新增地形模型
      terrainTextures: {}, // 存储地形贴图
      mixer: null, // 动画混合器
      clock: new THREE.Clock(), // 时钟对象，用于动画
      modelPaths: [
        // 军事战场模型路径
        // 注意：如果需要使用实际模型，请将模型文件放置在public/models目录下
      ],

      // 飞行动画相关
      flightAnimation: {
        startX: 50,
        startY: 40, // 调整飞机高度与地形匹配
        startZ: 30,

        endX: 30,
        endY: 10, // 调整飞机高度与地形匹配
        endZ: -60,

        currentX: -50,
        currentY: 10, // 调整飞机高度与地形匹配
        currentZ: -30,

        progress: 0,
        speed: 20,     // 降低飞行速度
        isComplete: false, // 是否完成当前飞行
        shouldLoop: true   // 是否循环飞行
      },

      // 坦克移动动画相关
      tankAnimation: {
        // 第一个坦克
        tank1: {
          startX: 10,
          startZ: 0,
          endX: 30,
          endZ: 0,
          currentX: 10,
          currentZ: 0,
          progress: 0,
          speed: 5,      // 坦克移动速度
          isComplete: false,
          isReturning: false
        },
        // 第二个坦克
        tank2: {
          startX: -15,
          startZ: -10,
          endX: -15,
          endZ: 10,
          currentX: -15,
          currentZ: -10,
          progress: 0,
          speed: 3,      // 第二个坦克速度稍慢
          isComplete: false,
          isReturning: false
        }
      },


      // 爆炸效果相关
      explosions: [],
      explosionInterval: null,
      muzzleFlashes: [],
      bulletTrails: [],
      smokeParticles: [],

      // 战场数据
      battlefieldData: {
        redForce: {
          tanks: 10,
          infantry: 100,
          artillery: 5
        },
        blueForce: {
          tanks: 8,
          infantry: 80,
          artillery: 4
        }
      },

      // 控制选项
      isAnimating: true,
      showWireframe: false,
      showLabels: false,
      nightMode: false,
      skipVideoOnAutoplayFail: false,
      containerWidth: 0,
      containerHeight: 0,
      isMenuCollapsed: true, // 控制菜单折叠状态，默认折叠
      activeMenuItem: null, // 当前激活的菜单项
      activeSubmenuItem: null, // 当前激活的子菜单项
      userInfoDialogVisible: false,
    };
  },
  mounted() {
    // 尝试自动播放视频
    this.$nextTick(() => {
      const video = this.$refs.videoPlayer;
      if (video) {
        // 尝试自动播放
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error('自动播放失败:', error);

            // 如果自动播放失败，添加点击事件监听器
            const videoContainer = this.$el.querySelector('.video-container');
            if (videoContainer) {
              videoContainer.addEventListener('click', () => {
                video.play().catch(err => {
                  console.error('点击后播放失败:', err);
                });
              });

              // 添加提示
              const playPrompt = document.createElement('div');
              playPrompt.className = 'play-prompt';
              playPrompt.innerHTML = '<div><i class="el-icon-video-play"></i><span>点击播放</span></div>';
              videoContainer.appendChild(playPrompt);
            }

            // 或者直接跳过视频
            if (this.skipVideoOnAutoplayFail) {
              this.onEnded();
            }
          });
        }
      }
    });

    // 监听窗口大小变化
    window.addEventListener('resize', this.onWindowResize);
  },
  beforeDestroy() {
    // 清除定时器
    if (this.explosionInterval) {
      clearInterval(this.explosionInterval);
    }

    // 停止动画循环
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // 移除窗口大小变化监听器
    window.removeEventListener('resize', this.onWindowResize);

    // 清理Three.js资源
    if (this.scene) {
      // 移除所有爆炸效果
      this.explosions.forEach(explosion => {
        this.scene.remove(explosion.particles);
      });
      this.explosions = [];

      // 移除所有烟雾效果
      this.smokeParticles.forEach(smoke => {
        this.scene.remove(smoke.particles);
      });
      this.smokeParticles = [];

      // 移除所有枪口闪光
      this.muzzleFlashes.forEach(flash => {
        this.scene.remove(flash.mesh);
        this.scene.remove(flash.light);
      });
      this.muzzleFlashes = [];

      // 移除所有子弹轨迹
      this.bulletTrails.forEach(trail => {
        this.scene.remove(trail.line);
      });
      this.bulletTrails = [];

      // 移除飞机模型
      if (this.airplane) {
        this.scene.remove(this.airplane);
      }

      // 移除坦克模型
      if (this.tank) {
        this.scene.remove(this.tank);
      }

      // 移除地形模型
      if (this.terrain) {
        this.scene.remove(this.terrain);
      }
    }
  },
  methods: {
    // 视频结束事件处理
    onEnded() {
      console.log('视频播放结束');
      this.showVideo = false;

      // 在下一个事件循环中初始化Three.js场景
      this.$nextTick(() => {
        console.log('初始化Three.js场景');
        this.initThree();
      });
    },

    // 初始化Three.js场景
    // 创建正交相机
    // 初始化场景和相机
    // 初始化Three.js场景和相机
    initThree() {
      // 获取容器元素
      const container = this.$refs.threeContainer;
      if (!container) {
        console.error('Three.js容器未找到!');
        return;  // 如果容器未找到，退出
      }

      // 创建场景
      this.scene = new THREE.Scene(); // 确保在操作场景之前先初始化场景

      // 获取容器尺寸
      this.containerWidth = container.clientWidth;
      this.containerHeight = container.clientHeight;
      const topOffset = 90;
      // 创建正交相机
      const aspect = this.containerWidth / this.containerHeight;
      const zoom = 40;  // 视野范围的缩放因子，您可以根据需要进行调整
      const near = 0.1;  // 近裁剪面
      const far = 1000;  // 远裁剪面

      // 为了将下边界与页面底部重合，您需要根据容器的高度设置相机的上下边界。
      const top = zoom + topOffset;  // 上边界
      const bottom = -zoom;  // 下边界，根据容器的高宽比调整

      const left = -zoom * aspect;
      const right = zoom * aspect;

      this.camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);

      // 设置相机位置
      this.camera.position.set(0, 0, 50);  // 根据地形和场景调整位置
      this.camera.rotation.set(0, Math.PI, 0);  // 使相机俯视地面（确保平行）
      this.camera.lookAt(0, 0, 0);  // 确保相机指向地面

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true
      });
      this.renderer.setSize(this.containerWidth, this.containerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      // 启用阴影
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // 设置环境背景（HDR贴图）
      const hdrLoader = new RGBELoader();
      hdrLoader.setPath('/textures/');  // 确保这里是正确的背景图路径
      hdrLoader.load('户外泥地场景白天多云HDR贴图.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        // 设置场景的背景为HDR贴图
        this.scene.background = texture;  // 设置背景

        // 设置环境光（可选，确保环境光反射效果）
        this.scene.environment = texture;

        console.log('背景图加载成功');
      }, undefined, (error) => {
        console.error('加载背景图时出错:', error);
      });

      // 将渲染器的DOM元素添加到容器中
      container.appendChild(this.renderer.domElement);

      // 添加轨道控制器（允许鼠标控制视角）
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true; // 启用阻尼效果
      this.controls.dampingFactor = 0.25;
      this.controls.screenSpacePanning = false;

      // 添加环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);

      // 添加平行光（模拟太阳光）
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(30, 100, 30);
      directionalLight.castShadow = true;
      this.scene.add(directionalLight);

      // 加载飞机模型
      this.loadAirplaneModel();

      // 加载地形模型
      this.loadTerrainModel();

      // 加载ZCWL_Zhi20_JiShen模型
      this.loadZhi20Model();

      // 启动动画循环
      this.animate();
    },

    // 加载飞机模型
    loadAirplaneModel() {
      // 创建GLTF加载器
      const loader = new GLTFLoader();

      // 创建加载管理器来处理贴图路径
      const loadingManager = new THREE.LoadingManager();
      loadingManager.setURLModifier((url) => {
        console.log("Loading texture:", url);  // 打印调试信息
        if (url.includes('ZCWL_APaQi') && (url.includes('.png') || url.includes('.jpg'))) {
          // 从URL中提取文件名
          const fileName = url.split('/').pop();
          // 将贴图路径重定向到textures目录
          const texturePath = `/textures/${fileName}`;
          console.log('Redirected texture path:', texturePath);  // 输出重定向后的路径
          return texturePath;
        }
        return url;
      });

      loader.manager = loadingManager;

      console.log('开始加载飞机模型...');

      // 加载模型
      loader.load(
        'ZCWL_APaQi.gltf',
        (gltf) => {
          console.log('飞机模型加载成功:', gltf);
          this.airplane = gltf.scene;

          // 调整模型大小和位置
          this.airplane.scale.set(1, 1, 1);

          // 设置飞机的初始位置
          this.airplane.position.set(
            this.flightAnimation.startX,
            this.flightAnimation.startY,
            this.flightAnimation.startZ
          );

          // 调整飞机的朝向
          const directionX = this.flightAnimation.endX - this.flightAnimation.startX;
          const directionZ = this.flightAnimation.endZ - this.flightAnimation.startZ;
          const angle = Math.atan2(directionX, directionZ);
          this.airplane.rotation.y = angle;

          // 处理材质和阴影
          this.airplane.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              // 设置材质属性
              if (child.material) {
                child.material.metalness = 0.7;  // 增加金属感
                child.material.roughness = 0.3;  // 减少粗糙度
                child.material.needsUpdate = true;

                // 如果材质有贴图，确保它们正确加载
                if (child.material.map) {
                  child.material.map.encoding = THREE.sRGBEncoding;
                }
                if (child.material.normalMap) {
                  child.material.normalScale.set(1, 1);
                }
                if (child.material.metalnessMap || child.material.roughnessMap) {
                  child.material.metalness = 1;
                  child.material.roughness = 1;
                }
              }
            }
          });

          // 将模型添加到场景中
          this.scene.add(this.airplane);
          console.log('飞机模型已添加到场景中');

          // 设置动画混合器
          if (gltf.animations && gltf.animations.length) {
            this.mixer = new THREE.AnimationMixer(this.airplane);
            gltf.animations.forEach((clip) => {
              this.mixer.clipAction(clip).play();
            });
          }

          // 重置飞行动画状态
          this.flightAnimation.currentX = this.flightAnimation.startX;
          this.flightAnimation.currentY = this.flightAnimation.startY;
          this.flightAnimation.currentZ = this.flightAnimation.startZ;
          this.flightAnimation.progress = 0;
          this.flightAnimation.isComplete = false;

          // 调整相机位置以更好地查看飞机
          this.camera.position.set(0, 50, 100);
          this.camera.lookAt(0, 0, 0);
          this.controls.target.set(0, 0, 0);
          this.controls.update();
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% 已加载');
        },
        (error) => {
          console.error('加载飞机模型时出错:', error);
        }
      );
    },

    // 加载ZCWL_Zhi20_JiShen模型
    loadZhi20Model() {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/'); // 确保路径正确
      loader.setDRACOLoader(dracoLoader);

      const loadingManager = new THREE.LoadingManager();
      loadingManager.setURLModifier((url) => {
        console.log("Loading resource:", url);
        if (url.includes('ZCWL_Zhi20') && (url.includes('.png') || url.includes('.jpg'))) {
          const fileName = url.split('/').pop();
          const texturePath = `/textures/${fileName}`;
          console.log('Texture path:', texturePath);
          return texturePath;
        }
        return url;
      });

      loader.manager = loadingManager;

      loader.load('/models/ZCWL_Zhi20_JiShen.gltf', (gltf) => {
        console.log('Zhi20 model loaded', gltf);
        const zhi20Model = gltf.scene;

        // 设置模型的初始位置
        zhi20Model.position.set(0, 10, 50);  // 飞机从远处开始

        this.scene.add(zhi20Model);

        let isReturning = false; // 飞机是否正在返回
        const speed = 0.5; // 飞行速度
        const maxZ = 50; // 飞机的起始位置（远）
        const minZ = -50; // 飞机的终点位置（近）

        const animateZhi20 = () => {
          // 如果飞机没有到达终点，则继续沿着z轴移动
          if (!isReturning) {
            zhi20Model.position.z -= speed; // 飞机向前飞行（从远到近）
            if (zhi20Model.position.z <= minZ) {  // 飞机到达终点
              isReturning = true;  // 反转飞行方向，飞机开始掉头
            }
          } else {
            zhi20Model.position.z += speed; // 飞机向后飞行（返回远端）
            if (zhi20Model.position.z >= maxZ) {  // 飞机到达起点
              isReturning = false;  // 反转飞行方向，飞机开始掉头
            }
          }

          // 使用requestAnimationFrame进行动画渲染
          requestAnimationFrame(animateZhi20);
        };

        // 开始动画
        animateZhi20();

        console.log('Zhi20 model added to the scene');
      }, undefined, (error) => {
        console.error('Error loading Zhi20 model:', error);
      });
    },





    // 获取地形表面的高度
    getGroundHeight(x, z) {
      // 使用射线投射向下检测地面
      const raycaster = new THREE.Raycaster();
      const direction = new THREE.Vector3(0, -1, 0); // 向下的方向
      const origin = new THREE.Vector3(x, 50, z);  // 从较高的位置发射射线



      // 将射线的原点和方向设置到射线投射器
      raycaster.ray.origin.copy(origin);
      raycaster.ray.direction.copy(direction);

      // 检测地面与射线的交点
      const intersects = raycaster.intersectObject(this.terrain, true);  // 确保射线与地形相交
      if (intersects.length > 0) {
        // 返回交点的高度
        return intersects[0].point.y + 0.5;  // 添加偏移量，防止坦克与地面相交
      }

      // 如果没有交点，返回默认高度（例如，-2）
      return -2;
    },

    // 加载坦克模型
    loadTankModel() {
      if (!this.terrain) {
        console.error('地形模型未加载完成，无法加载坦克模型');
        return; // 地形未加载完成，不加载坦克模型
      }

      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);

      console.log('开始加载坦克模型...');
      fetch('/models/ZCWL_05ATanKe_CheShen.gltf')
        .then((response) => response.arrayBuffer())
        .then((buffer) => {
          loader.parse(buffer, '/models/', (gltf) => {
            if (!gltf.scene || !gltf.scenes || gltf.scenes.length === 0) {
              console.error('模型数据不完整');
              return;
            }

            this.tank = gltf.scene; // 加载模型

            // 获取初始地面高度
            const groundHeight = this.getGroundHeight(this.tank.position.x, this.tank.position.z);

            // 设置坦克位置，稍微上移，避免与地面重叠
            this.tank.position.set(this.tank.position.x, groundHeight + 0.5, this.tank.position.z);

            // 设置坦克初始朝向
            this.tank.rotation.y = Math.PI / 2;

            // 添加到场景
            this.scene.add(this.tank);
            console.log('坦克模型已添加到场景中');

            // Duplicate the tank
            const secondTank = this.tank.clone();
            secondTank.position.x += 10; // Position the duplicate tank
            this.scene.add(secondTank);

            // Initialize variables for tank movement
            let tank1Returning = false;
            let tank2Returning = false;
            const tankSpeed = 0.1;
            const maxX = 20;
            const minX = -20;

            // Animate the tanks
            const animateTanks = () => {
              // Tank 1 movement
              if (!tank1Returning) {
                this.tank.position.x += tankSpeed;
                if (this.tank.position.x >= maxX) {
                  tank1Returning = true;
                }
              } else {
                this.tank.position.x -= tankSpeed;
                if (this.tank.position.x <= minX) {
                  tank1Returning = false;
                }
              }

              // Tank 2 movement
              if (!tank2Returning) {
                secondTank.position.x += tankSpeed;
                if (secondTank.position.x >= maxX) {
                  tank2Returning = true;
                }
              } else {
                secondTank.position.x -= tankSpeed;
                if (secondTank.position.x <= minX) {
                  tank2Returning = false;
                }
              }

              requestAnimationFrame(animateTanks);
            };
            animateTanks();
          }, (error) => {
            console.error('解析坦克模型时出错:', error);
          });
        })
        .catch((error) => {
          console.error('获取模型文件时出错:', error);
        });
    },

    // 加载地形模型
    loadTerrainModel() {
      const loader = new GLTFLoader();

      const loadingManager = new THREE.LoadingManager();
      loadingManager.setURLModifier((url) => {
        if (url.includes('Terrain') || url.includes('Grass') ||
          url.includes('Acacia') || url.includes('Diffuse')) {
          let fileName = url.split('/').pop();
          fileName = decodeURIComponent(fileName);
          if (fileName.includes('Terrain')) {
            if (fileName.includes('Diffuse')) {
              fileName = 'Terrain_0_0-20180420-220346_Basemap_Diffuse.png';
            } else if (fileName.includes('Normal')) {
              fileName = 'Terrain_0_0-20180420-220346_Basemap_Normal.png';
            }
          }
          return `/textures/${fileName}`;
        }
        return url;
      });

      loader.manager = loadingManager;

      console.log('开始加载地形模型...');

      // 加载模型
      loader.load(
        '/models/dixing(1).gltf',
        (gltf) => {
          console.log('地形模型加载完成');
          this.terrain = gltf.scene;

          // 设置地形的位置
          this.terrain.position.set(0, -25, 0);

          // 添加到场景
          this.scene.add(this.terrain);
          console.log('地形模型已添加到场景中');

          // 确保地形加载完成后再加载坦克模型
          this.loadTankModel();
        },
        (xhr) => {
          const progress = (xhr.loaded / xhr.total * 100);
          console.log('地形模型加载进度:', progress.toFixed(0) + '%');
        },
        (error) => {
          console.error('加载地形模型时出错:', error);
        }
      );
    },


    // 预加载地形贴图
    preloadTerrainTextures() {
      // 创建纹理加载器
      const textureLoader = new THREE.TextureLoader();

      // 贴图文件路径
      const texturePaths = {
        grass: '/textures/Grass_A.png',
        dirt: '/textures/Terrain_0_0-20180420-220346 Basemap Diffuse.png',
        rocks: '/textures/Terrain_0_0-20180420-220346 Basemap Normal.png',
        diffuse: '/textures/DiffuseColor_Texture.png',
        normal: '/textures/DiffuseColor_Texture_1.png',
        roughness: '/textures/DiffuseColor_Texture_2-DiffuseColor_Texture_2.png',
        acaciaBark: '/textures/AcaciaBark_Normal.png',
        acaciaNew: '/textures/AcaciaNew_Low_Atlas_Normal.png'
      };

      // 预加载所有贴图
      this.terrainTextures = {};
      Object.keys(texturePaths).forEach((key) => {
        this.terrainTextures[key] = textureLoader.load(texturePaths[key], () => {
          console.log(`✅ 贴图 ${texturePaths[key]} 加载成功`);
        }, undefined, (err) => {
          console.error(`❌ 贴图 ${texturePaths[key]} 加载失败`, err);
        });
      });
    },

    // 应用地形材质
    applyTerrainMaterial(mesh) {
      const processMaterial = (material) => {
        // 设置基本材质属性
        material.metalness = 0.3;
        material.roughness = 0.7;

        // 根据材质名称应用合适的贴图
        if (material.name) {
          const name = material.name.toLowerCase();

          // 应用漫反射贴图
          if (name.includes('grass')) {
            material.map = this.terrainTextures.grass;
          } else if (name.includes('terrain')) {
            material.map = this.terrainTextures.dirt;
            // 应用法线贴图
            material.normalMap = this.terrainTextures.rocks;
          } else if (name.includes('acacia')) {
            // 应用法线贴图
            if (name.includes('bark')) {
              material.normalMap = this.terrainTextures.acaciaBark;
            } else {
              material.normalMap = this.terrainTextures.acaciaNew;
            }

            // 应用漫反射贴图
            material.map = this.terrainTextures.diffuse;
          } else {
            // 默认贴图
            material.map = this.terrainTextures.diffuse;
            material.normalMap = this.terrainTextures.normal;
            material.roughnessMap = this.terrainTextures.roughness;
          }
        }

        material.needsUpdate = true;
      };

      // 处理材质（可能是数组或单个材质）
      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(mat => processMaterial(mat));
      } else if (mesh.material) {
        processMaterial(mesh.material);
      }
    },

    // 动画循环
    animate() {
      this.animationFrameId = requestAnimationFrame(this.animate);

      // 获取时间增量
      const delta = this.clock.getDelta();

      // 更新轨道控制器
      if (this.controls) {
        this.controls.update();
      }

      // 更新动画混合器
      if (this.mixer) {
        this.mixer.update(delta);
      }

      // 处理飞机的飞行动画
      if (this.airplane && this.flightAnimation && !this.flightAnimation.isComplete) {
        // 计算飞机应该移动的距离
        const speed = this.flightAnimation.speed;
        const distanceX = this.flightAnimation.endX - this.flightAnimation.startX;
        const distanceY = this.flightAnimation.endY - this.flightAnimation.startY;
        const distanceZ = this.flightAnimation.endZ - this.flightAnimation.startZ;
        const totalDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY + distanceZ * distanceZ);

        // 计算当前时间点的位置
        const t = Math.min(this.flightAnimation.progress / totalDistance, 1);
        this.flightAnimation.currentX = this.flightAnimation.startX + distanceX * t;
        this.flightAnimation.currentY = this.flightAnimation.startY + distanceY * t;
        this.flightAnimation.currentZ = this.flightAnimation.startZ + distanceZ * t;

        // 更新飞机位置
        this.airplane.position.set(
          this.flightAnimation.currentX,
          this.flightAnimation.currentY,
          this.flightAnimation.currentZ
        );

        // 更新进度
        this.flightAnimation.progress += speed * delta;

        // 检查是否到达终点
        if (t >= 1) {
          this.flightAnimation.isComplete = true;

          // 重置动画，使飞机循环飞行
          setTimeout(() => {
            // 交换起点和终点
            const tempX = this.flightAnimation.startX;
            const tempY = this.flightAnimation.startY;
            const tempZ = this.flightAnimation.startZ;

            this.flightAnimation.startX = this.flightAnimation.endX;
            this.flightAnimation.startY = this.flightAnimation.endY;
            this.flightAnimation.startZ = this.flightAnimation.endZ;

            this.flightAnimation.endX = tempX;
            this.flightAnimation.endY = tempY;
            this.flightAnimation.endZ = tempZ;

            // 调整飞机的朝向
            const directionX = this.flightAnimation.endX - this.flightAnimation.startX;
            const directionZ = this.flightAnimation.endZ - this.flightAnimation.startZ;
            const angle = Math.atan2(directionX, directionZ);
            this.airplane.rotation.y = angle;

            // 重置当前位置和进度
            this.flightAnimation.currentX = this.flightAnimation.startX;
            this.flightAnimation.currentY = this.flightAnimation.startY;
            this.flightAnimation.currentZ = this.flightAnimation.startZ;
            this.flightAnimation.progress = 0;
            this.flightAnimation.isComplete = false;
          }, 1000); // 2秒后重新开始
        }
      }

      // 坦克移动动画更新
      // 坦克的移动动画
      if (this.tank && this.tankAnimation && this.tankAnimation.tank1) {
        const speed = this.tankAnimation.tank1.speed * 0.6; // 调整速度，确保平滑移动
        const distanceX = this.tankAnimation.tank1.endX - this.tankAnimation.tank1.startX;
        const distanceZ = this.tankAnimation.tank1.endZ - this.tankAnimation.tank1.startZ;
        const totalDistance = Math.sqrt(distanceX * distanceX + distanceZ * distanceZ);

        // 根据isReturning控制坦克移动方向
        if (!this.tankAnimation.tank1.isReturning) {
          this.tankAnimation.tank1.progress += speed * delta; // 向前进
        } else {
          this.tankAnimation.tank1.progress -= speed * delta; // 向后退
        }

        // 保证进度在0到1之间
        const t = Math.min(Math.max(this.tankAnimation.tank1.progress / totalDistance, 0), 1);

        // 计算当前坦克的位置
        const currentX = this.tankAnimation.tank1.startX + distanceX * t;
        const currentZ = this.tankAnimation.tank1.startZ + distanceZ * t;

        // 获取当前坐标的地面高度
        const groundHeight = this.getGroundHeight(currentX, currentZ);

        // 更新坦克的位置，确保它离地面有适当的偏移量
        this.tank.position.set(
          currentX,
          groundHeight + 0.5, // 添加0.5偏移，避免与地面重叠
          currentZ
        );

        // 根据当前位置计算坦克的朝向
        if (distanceX !== 0 || distanceZ !== 0) {
          const angle = Math.atan2(distanceZ, distanceX); // 计算朝向
          this.tank.rotation.y = angle; // 设置坦克的朝向
        }

        // 如果坦克到达终点或者回到起点，切换移动方向
        if (t >= 1 || t <= 0) {
          // 坦克到达终点或起点后，反转方向
          this.tankAnimation.tank1.isReturning = !this.tankAnimation.tank1.isReturning; // 切换方向
          this.tankAnimation.tank1.progress = 0; // 重置进度，确保回程时从起点开始
        }
      }

      // 处理第二个坦克的移动动画
      if (this.secondTank && this.tankAnimation && this.tankAnimation.tank2) {
        const speed = this.tankAnimation.tank2.speed * 0.6; // Adjusted speed for smoother movement
        const distanceX = this.tankAnimation.tank2.endX - this.tankAnimation.tank2.startX;
        const distanceZ = this.tankAnimation.tank2.endZ - this.tankAnimation.tank2.startZ;
        const totalDistance = Math.sqrt(distanceX * distanceX + distanceZ * distanceZ);

        if (!this.tankAnimation.tank2.isReturning) {
          this.tankAnimation.tank2.progress += speed * delta;
        } else {
          this.tankAnimation.tank2.progress -= speed * delta;
        }

        const t = Math.min(Math.max(this.tankAnimation.tank2.progress / totalDistance, 0), 1);

        const currentX = this.tankAnimation.tank2.startX + distanceX * t;
        const currentZ = this.tankAnimation.tank2.startZ + distanceZ * t;

        const groundHeight = this.getGroundHeight(currentX, currentZ);

        this.secondTank.position.set(
          currentX,
          groundHeight + 0.5,
          currentZ
        );

        if (distanceX !== 0 || distanceZ !== 0) {
          const angle = Math.atan2(distanceZ, distanceX);
          this.secondTank.rotation.y = angle;
        }

        if (t >= 1 || t <= 0) {
          this.tankAnimation.tank2.isReturning = !this.tankAnimation.tank2.isReturning;
          this.tankAnimation.tank2.progress = 0;
        }
      }

      // 渲染场景
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    },

    // 窗口大小变化处理
    onWindowResize() {
      if (!this.$refs.threeContainer) return;

      // 获取新的容器尺寸
      this.containerWidth = this.$refs.threeContainer.clientWidth;
      this.containerHeight = this.$refs.threeContainer.clientHeight;

      // 更新相机和渲染器
      if (this.camera && this.renderer) {
        this.camera.aspect = this.containerWidth / this.containerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.containerWidth, this.containerHeight);
      }
    },

    // 切换帮助面板
    toggleHelpPanel() {
      this.showHelpPanel = !this.showHelpPanel;
    },

    // 切换菜单折叠状态
    toggleMenu() {
      this.isMenuCollapsed = !this.isMenuCollapsed;
    },

    // 处理菜单项点击事件
    handleMenuItemClick(item) {
      // 如果点击的是已经激活的菜单项，则关闭它
      if (this.activeMenuItem === item) {
        this.activeMenuItem = null;
        this.activeSubmenuItem = null;
      } else {
        this.activeMenuItem = item;
        this.activeSubmenuItem = null;
      }
    },

    // 处理子菜单项点击事件
    handleSubmenuItemClick(item) {
      this.activeSubmenuItem = item;
      // 这里可以添加子菜单项的具体处理逻辑
    },

    // 页面导航
    navigateTo(route) {
      this.$router.push(route);
    },

    // 创建爆炸效果
    createExplosion(x, z, size = 1, duration = 2) {
      // 创建粒子几何体
      const particleCount = 200; // 增加粒子数量
      const geometry = new THREE.BufferGeometry();

      // 创建粒子位置数组
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      // 设置爆炸中心位置
      const center = new THREE.Vector3(x, -4.5, z); // 略微提高爆炸位置

      // 初始化粒子位置和颜色
      for (let i = 0; i < particleCount; i++) {
        // 随机位置（球形分布）
        const offset = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          Math.random() * 3, // 更高的上升高度
          (Math.random() - 0.5) * 2
        );

        // 设置粒子位置
        positions[i * 3] = center.x + offset.x * size;
        positions[i * 3 + 1] = center.y + offset.y * size;
        positions[i * 3 + 2] = center.z + offset.z * size;

        // 设置粒子颜色（从亮黄到橙红）
        if (Math.random() > 0.7) {
          // 30%的粒子是明亮的黄色/白色（模拟火花）
          colors[i * 3] = 1.0;       // R: 1.0
          colors[i * 3 + 1] = 1.0;   // G: 1.0
          colors[i * 3 + 2] = Math.random() * 0.5; // B: 0-0.5
        } else {
          // 70%的粒子是橙红色（模拟火焰）
          colors[i * 3] = Math.random() * 0.2 + 0.8; // R: 0.8-1.0
          colors[i * 3 + 1] = Math.random() * 0.5;   // G: 0-0.5
          colors[i * 3 + 2] = 0;                     // B: 0
        }

        // 设置粒子大小 - 减小粒子大小
        sizes[i] = Math.random() * 1.5 + 0.5;
      }

      // 将位置和颜色添加到几何体
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // 创建粒子材质
      const material = new THREE.PointsMaterial({
        size: 0.8, // 减小基础粒子大小
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending // 使用加法混合使粒子更亮
      });

      // 创建粒子系统
      const particles = new THREE.Points(geometry, material);

      // 将粒子系统添加到场景
      this.scene.add(particles);

      // 创建爆炸对象
      const explosion = {
        particles,
        positions,
        velocities: [],
        startTime: this.clock.getElapsedTime(),
        duration,
        size
      };

      // 初始化粒子速度
      for (let i = 0; i < particleCount; i++) {
        const vx = (Math.random() - 0.5) * 15 * size; // 增加水平速度
        const vy = Math.random() * 15 * size;         // 增加垂直速度
        const vz = (Math.random() - 0.5) * 15 * size; // 增加水平速度
        explosion.velocities.push({ x: vx, y: vy, z: vz });
      }

      // 添加到爆炸数组
      this.explosions.push(explosion);

      // 创建爆炸光源
      const light = new THREE.PointLight(0xff9500, 8, 15); // 更亮、更大范围的光
      light.position.copy(center);
      this.scene.add(light);

      // 设置光源淡出
      setTimeout(() => {
        const fadeOut = setInterval(() => {
          light.intensity -= 0.8;
          if (light.intensity <= 0) {
            clearInterval(fadeOut);
            this.scene.remove(light);
          }
        }, 50); // 更快的淡出
      }, 50);

      // 添加烟雾效果
      this.createSmoke(center.x, center.y, center.z, size * 2, duration * 2);

      // 添加震动效果
      if (size > 1) {
        this.shakeCamera(size * 0.5);
      }
    },

    // 创建烟雾效果
    createSmoke(x, y, z, size = 2, duration = 4) {
      // 创建粒子几何体
      const particleCount = 50;
      const geometry = new THREE.BufferGeometry();

      // 创建粒子位置数组
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      // 设置烟雾中心位置
      const center = new THREE.Vector3(x, y, z);

      // 初始化粒子位置和颜色
      for (let i = 0; i < particleCount; i++) {
        // 随机位置（半球形分布，主要向上）
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI * 0.5; // 半球
        const r = Math.random() * size * 2;

        const offsetX = r * Math.sin(phi) * Math.cos(theta);
        const offsetY = r * Math.cos(phi); // 主要向上
        const offsetZ = r * Math.sin(phi) * Math.sin(theta);

        // 设置粒子位置
        positions[i * 3] = center.x + offsetX;
        positions[i * 3 + 1] = center.y + offsetY;
        positions[i * 3 + 2] = center.z + offsetZ;

        // 设置粒子颜色（灰色烟雾）
        const gray = Math.random() * 0.3 + 0.2; // 0.2-0.5
        colors[i * 3] = gray;     // R
        colors[i * 3 + 1] = gray; // G
        colors[i * 3 + 2] = gray; // B

        // 设置粒子大小
        sizes[i] = Math.random() * 5 + 3; // 烟雾粒子更大
      }

      // 将位置和颜色添加到几何体
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // 创建粒子材质
      const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true
      });

      // 创建粒子系统
      const particles = new THREE.Points(geometry, material);

      // 将粒子系统添加到场景
      this.scene.add(particles);

      // 创建烟雾对象
      const smoke = {
        particles,
        positions,
        velocities: [],
        startTime: this.clock.getElapsedTime(),
        duration,
        size
      };

      // 初始化粒子速度（烟雾上升缓慢）
      for (let i = 0; i < particleCount; i++) {
        const vx = (Math.random() - 0.5) * 2;
        const vy = Math.random() * 3 + 1;
        const vz = (Math.random() - 0.5) * 2;
        smoke.velocities.push({ x: vx, y: vy, z: vz });
      }

      // 添加到烟雾数组
      this.smokeParticles.push(smoke);
    },

    // 创建枪口闪光效果
    createMuzzleFlash(x, y, z, direction = { x: 0, y: 0, z: 1 }, duration = 0.1) {
      // 随机位置（在地面上）
      const posX = x || (Math.random() - 0.5) * 80;
      const posY = y || -4.5;
      const posZ = z || (Math.random() - 0.5) * 80;

      // 创建闪光几何体（扁平的椭球体，模拟枪口火焰形状）
      const geometry = new THREE.SphereGeometry(0.5, 8, 8); // 减小闪光大小
      geometry.scale(1, 0.3, 1); // 使其扁平，模拟枪口火焰形状

      // 创建闪光材质
      const material = new THREE.MeshBasicMaterial({
        color: 0xffff80, // 亮黄色
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending // 使用加法混合使闪光更亮
      });

      // 创建闪光网格
      const flash = new THREE.Mesh(geometry, material);
      flash.position.set(posX, posY, posZ);

      // 设置闪光朝向
      flash.lookAt(posX + direction.x, posY + direction.y, posZ + direction.z);

      // 将闪光添加到场景
      this.scene.add(flash);

      // 添加闪光光源
      const light = new THREE.PointLight(0xffffaa, 3, 5); // 减小光源强度和范围
      light.position.copy(flash.position);
      this.scene.add(light);

      // 创建闪光对象
      const muzzleFlash = {
        mesh: flash,
        light: light,
        startTime: this.clock.getElapsedTime(),
        duration: duration // 闪光持续时间很短
      };

      // 添加到闪光数组
      this.muzzleFlashes.push(muzzleFlash);

      // 创建子弹轨迹
      this.createBulletTrail(posX, posY, posZ, direction);

      // 50%的概率在子弹落点创建小爆炸
      if (Math.random() > 0.5) {
        // 计算子弹落点
        const distance = 20 + Math.random() * 40;
        const impactX = posX + direction.x * distance;
        const impactZ = posZ + direction.z * distance;

        // 创建小爆炸
        setTimeout(() => {
          this.createExplosion(impactX, impactZ, 0.5 + Math.random() * 0.5, 1);
        }, distance * 20); // 子弹飞行时间
      }
    },

    // 创建子弹轨迹
    createBulletTrail(x, y, z, direction, duration = 0.2) {
      // 创建轨迹几何体
      const geometry = new THREE.BufferGeometry();

      // 计算轨迹终点
      const distance = 20 + Math.random() * 40;
      const endX = x + direction.x * distance;
      const endY = y + direction.y * distance;
      const endZ = z + direction.z * distance;

      // 设置轨迹顶点
      const positions = new Float32Array([
        x, y, z,
        endX, endY, endZ
      ]);

      // 将位置添加到几何体
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // 创建轨迹材质
      const material = new THREE.LineBasicMaterial({
        color: 0xffff00, // 亮黄色
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        linewidth: 1 // 线宽（注意：在WebGL中，线宽可能不会超过1像素）
      });

      // 创建轨迹线
      const trail = new THREE.Line(geometry, material);

      // 将轨迹添加到场景
      this.scene.add(trail);

      // 创建轨迹对象
      const bulletTrail = {
        line: trail,
        startTime: this.clock.getElapsedTime(),
        duration: duration // 轨迹持续时间短
      };

      // 添加到轨迹数组
      this.bulletTrails.push(bulletTrail);
    },

    // 相机震动效果
    shakeCamera(intensity = 1) {
      const originalPosition = this.camera.position.clone();
      const originalTarget = this.controls.target.clone();

      let elapsed = 0;
      const duration = 0.5; // 震动持续时间

      const shake = () => {
        elapsed += 0.016; // 假设60fps

        if (elapsed < duration) {
          // 随机偏移
          const offsetX = (Math.random() - 0.5) * intensity;
          const offsetY = (Math.random() - 0.5) * intensity;
          const offsetZ = (Math.random() - 0.5) * intensity;

          // 应用偏移
          this.camera.position.set(
            originalPosition.x + offsetX,
            originalPosition.y + offsetY,
            originalPosition.z + offsetZ
          );

          this.controls.target.set(
            originalTarget.x + offsetX * 0.5,
            originalTarget.y + offsetY * 0.5,
            originalTarget.z + offsetZ * 0.5
          );

          // 更新控制器
          this.controls.update();

          // 继续震动
          requestAnimationFrame(shake);
        } else {
          // 恢复原始位置
          this.camera.position.copy(originalPosition);
          this.controls.target.copy(originalTarget);
          this.controls.update();
        }
      };

      // 开始震动
      shake();
    },

    // 启动随机爆炸效果
    startRandomExplosions() {
      // 清除之前的定时器
      if (this.explosionInterval) {
        clearInterval(this.explosionInterval);
      }

      // 每隔一段时间创建一组战场效果
      this.explosionInterval = setInterval(() => {
        // 创建枪口闪光和子弹轨迹
        for (let i = 0; i < 3 + Math.floor(Math.random() * 5); i++) {
          // 随机位置
          const x = (Math.random() - 0.5) * 80;
          const z = (Math.random() - 0.5) * 80;

          // 随机方向
          const angle = Math.random() * Math.PI * 2;
          const direction = {
            x: Math.sin(angle),
            y: 0.1,
            z: Math.cos(angle)
          };

          // 创建枪口闪光
          setTimeout(() => {
            this.createMuzzleFlash(x, -4.5, z, direction);
          }, Math.random() * 500);
        }

        // 随机创建爆炸
        if (Math.random() > 0.5) {
          // 随机位置
          const x = (Math.random() - 0.5) * 80;
          const z = (Math.random() - 0.5) * 80;

          // 随机大小
          const size = Math.random() * 2 + 0.5;

          // 随机持续时间
          const duration = Math.random() * 1 + 1.5;

          // 创建爆炸
          this.createExplosion(x, z, size, duration);
        }
      }, 1000); // 每1秒创建一组战场效果
    },

    // 创建天空盒
    createSkybox() {
      // 由于没有天空盒纹理，设置场景背景为天蓝色
      this.scene.background = new THREE.Color(0x87CEEB);
    },
    handleContainerClick(event) {
      if (this.$refs.floatingMenu && !this.$refs.floatingMenu.contains(event.target)) {
        this.isMenuCollapsed = true;
      }
    },
    closeUserInfoDialog() {
      this.userInfoDialogVisible = false;
    },
    showUserInfoDialog() {
      this.userInfoDialogVisible = true;
    }
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}



.video-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  position: relative;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px 40px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.play-prompt i {
  font-size: 24px;
  margin-right: 10px;
}

.battlefield-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.three-container {
  /* position: absolute; */
  /* top: 60px; */
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
  /* height: calc(100% - 60px); */
}

/* 右侧悬浮菜单栏样式 */
.floating-menu {
  position: absolute;
  top: 50%;
  right: -1px;
  transform: translateY(-50%);
  width: 300px;
  background-color: rgba(44, 52, 60, 0.9);
  border: 1px solid #3a4452;
  border-radius: 8px 0 0 8px;
  color: white;
  z-index: 1000;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: width 0.3s ease;
}

.floating-menu.collapsed {
  width: 25px;
  height: 410px;
  background-color: rgba(44, 52, 60, 0.7);
  border-width: 1px 0 1px 1px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.floating-menu.collapsed .menu-content-wrapper {
  opacity: 0;
  visibility: hidden;
  transform: translateX(50px);
}

.menu-toggle {
  position: absolute;
  top: 50%;
  left: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: translateY(-50%);
  background-color: rgba(44, 52, 60, 0.9);
  border-radius: 50%;
  border: 1px solid #3a4452;
  z-index: 1002;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.floating-menu:not(.collapsed) .menu-toggle {
  left: 10px;
}

.menu-toggle i {
  color: #fff;
  font-size: 12px;
}

.menu-content-wrapper {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  transform: translateX(0);
  padding: 10px 0 10px 40px;
  width: 100%;
}

.menu-header {
  padding: 10px 15px;
  background-color: rgba(44, 52, 60, 1);
  border-bottom: 1px solid #3a4452;
  text-align: center;
  margin-left: -30px;
  position: relative;
}

.menu-header h3 {
  margin: 0;
  font-size: 16px;
  color: #fff;
  font-weight: normal;
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
}

.menu-content {
  padding: 10px 0;
  margin-left: -30px;
}

.menu-item {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 0;
  margin: 0;
  border-bottom: 1px solid rgba(58, 68, 82, 0.5);
}

.menu-item:hover,
.menu-item.active {
  background-color: rgba(58, 68, 82, 0.8);
}

.menu-item.active {
  position: relative;
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: #00a8ff;
}

.menu-item i,
.menu-item .menu-icon {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item span {
  color: #fff;
  font-size: 14px;
}

.help-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
}

.help-panel {
  position: absolute;
  top: 70px;
  right: 20px;
  width: 300px;
  background-color: rgba(0, 20, 40, 0.8);
  color: white;
  border-radius: 5px;
  padding: 15px;
  z-index: 1000;
  border: 1px solid #00a8ff;
  box-shadow: 0 0 15px rgba(0, 168, 255, 0.3);
}

.help-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.help-panel-content {
  font-size: 14px;
  line-height: 1.5;
}

.help-panel-content ul {
  padding-left: 20px;
  margin-top: 5px;
}

.help-panel-content li {
  margin-bottom: 5px;
}

/* 子菜单样式 */
.submenu {
  background-color: rgba(30, 40, 50, 0.9);
  margin-left: 20px;
  border-left: 1px solid rgba(58, 68, 82, 0.8);
}

.submenu-item {
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #ccc;
  font-size: 13px;
  border-bottom: 1px solid rgba(58, 68, 82, 0.3);
}

.submenu-item:hover {
  background-color: rgba(58, 68, 82, 1);
  color: #fff;
}

/* 标签样式 */
.label-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.model-label {
  position: absolute;
  background-color: rgba(0, 20, 40, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  border: 1px solid #00a8ff;
  transform: translate(-50%, -100%);
  margin-top: -10px;
}

.card-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  width: 80%;
  max-width: 1200px;
}

.card-content {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}
</style>

<style>
/* User Info Dialog Styles */
.user-info-dialog {
  margin-right: 300px; /* Move dialog to the left by adding margin on the right */
  margin-top: 5vh;
}

.user-info-dialog .el-dialog__header {
  background-color: #1e3c72;
  padding: 15px 20px;
  border-bottom: 1px solid #ddd;
}

.user-info-dialog .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.user-info-dialog .el-dialog__body {
  padding: 0;
  max-height: 75vh;
  overflow-y: auto;
}

.user-info-dialog .el-dialog__headerbtn .el-dialog__close {
  color: white;
}
.battlefield-header {
  position: absolute;
  width: 100%;
  height: auto;
}

.header-image {
  max-width: 100vw; /* 宽度自适应 */
  height: auto;     /* 高度按比例缩放 */
}
.full-screen-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/header.png');
  background-size: cover;
  background-position: center;
  z-index: 10; /* 放到最底层，避免遮挡Three.js */
  pointer-events: none;
  padding: 20px;
}

</style>
