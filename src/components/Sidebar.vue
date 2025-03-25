<template>
  <div class="sidebar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :unique-opened="true"
      router
    >
      <div class="logo-container">
        <img src="../assets/logo.png" class="logo" alt="Logo">
        <span v-if="!isCollapse" class="title">智能评估系统</span>
      </div>

      <!-- 用户管理 -->
      <el-submenu index="/user">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>人员管理</span>
        </template>
        <!-- 人员信息 - 所有用户可见 -->
        <el-menu-item index="/user/info">人员信息</el-menu-item>
        <!-- 以下菜单项仅管理员可见 -->
        <el-menu-item v-if="isAdmin" index="/user/organization">组织架构</el-menu-item>
        <el-menu-item v-if="isAdmin" index="/user/roles">权限管理</el-menu-item>
        <el-menu-item v-if="isAdmin" index="/user/logs">操作日志</el-menu-item>
      </el-submenu>

      <!-- 设备管理 -->
      <el-submenu index="/device">
        <template slot="title">
          <i class="el-icon-monitor"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item index="/device/info">设备信息</el-menu-item>
      </el-submenu>

      <!-- 任务分配 -->
      <el-submenu index="/tasks">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>任务分配</span>
        </template>
        <el-menu-item index="/tasks/device-binding">任务基本设置</el-menu-item>
        <el-menu-item index="/tasks/task-assignment">小队任务分配</el-menu-item>
      </el-submenu>

      <!-- 作战态势分析 -->
      <el-menu-item index="/battle-simulation">
        <i class="el-icon-map-location"></i>
        <span>作战态势分析</span>
      </el-menu-item>

      <!-- 课程管理 -->
      <el-submenu index="/course">
        <template slot="title">
          <i class="el-icon-reading"></i>
          <span>课程管理</span>
        </template>
        <el-menu-item index="/course/info">课程信息</el-menu-item>
        <el-menu-item index="/course/category">课程分类</el-menu-item>
        <el-menu-item index="/course/publish">发布记录</el-menu-item>
      </el-submenu>

      <!-- 成绩管理 -->
      <el-submenu index="/score">
        <template slot="title">
          <i class="el-icon-data-analysis"></i>
          <span>成绩管理</span>
        </template>
        <el-menu-item index="/score/statistics">成绩统计</el-menu-item>
      </el-submenu>

      <!-- 示教内容管理 -->
      <el-submenu index="/teaching">
        <template slot="title">
          <i class="el-icon-notebook-1"></i>
          <span>示教内容管理</span>
        </template>
        <el-menu-item index="/teaching/content">示教内容</el-menu-item>
        <el-menu-item index="/teaching/category">示教分类</el-menu-item>
        <el-menu-item index="/teaching/publish">发布记录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isCollapse: false,
      activeIndex: this.$route.path,
      userInfo: null
    }
  },
  computed: {
    // 判断当前用户是否为管理员
    isAdmin() {
      console.log('isAdmin计算属性被调用，当前用户信息:', this.userInfo);
      // 使用==而不是===，允许类型转换
      return this.userInfo && this.userInfo.role == 0;
    }
  },
  created() {
    // 获取用户信息
    this.getUserInfo();
    
    // 监听用户信息变化
    window.addEventListener('storage', this.handleStorageChange);
  },
  beforeDestroy() {
    // 移除事件监听
    window.removeEventListener('storage', this.handleStorageChange);
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      const userInfoStr = localStorage.getItem('userInfo');
      
      console.log('侧边栏从localStorage获取的原始字符串:', userInfoStr);
      
      if (userInfoStr) {
        try {
          this.userInfo = JSON.parse(userInfoStr);
          console.log('当前用户角色:', this.userInfo.role);
        } catch (error) {
          console.error('解析用户信息失败:', error);
          this.userInfo = null;
        }
      } else {
        console.log('localStorage中没有找到userInfo');
      }
    },
    // 处理本地存储变化
    handleStorageChange(e) {
      if (e.key === 'userInfo') {
        this.getUserInfo();
      }
    }
  },
  watch: {
    $route(route) {
      this.activeIndex = route.path;
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  min-height: 100vh;
  background-color: #304156;
}

.el-menu-vertical {
  height: 100%;
  border-right: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: #263445;
}

.logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.title {
  margin-left: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
</style>
