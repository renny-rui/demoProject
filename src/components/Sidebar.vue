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

      <!-- User Management -->
      <el-submenu index="/user">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>人员管理</span>
        </template>
        <el-menu-item index="/user/info">人员信息</el-menu-item>
        <el-menu-item index="/user/organization">组织架构</el-menu-item>
        <el-menu-item index="/user/roles">权限管理</el-menu-item>
        <el-menu-item index="/user/logs">操作日志</el-menu-item>
      </el-submenu>

      <!-- Device Management -->
      <el-submenu index="/device">
        <template slot="title">
          <i class="el-icon-monitor"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item index="/device/info">设备信息</el-menu-item>
      </el-submenu>

      <!-- Course Management -->
      <el-submenu index="/course">
        <template slot="title">
          <i class="el-icon-reading"></i>
          <span>课程管理</span>
        </template>
        <el-menu-item index="/course/info">课程信息</el-menu-item>
        <el-menu-item index="/course/category">课程分类</el-menu-item>
        <el-menu-item index="/course/publish">发布记录</el-menu-item>
      </el-submenu>

      <!-- Score Management -->
      <el-submenu index="/score">
        <template slot="title">
          <i class="el-icon-data-analysis"></i>
          <span>成绩管理</span>
        </template>
        <el-menu-item index="/score/statistics">成绩统计</el-menu-item>
      </el-submenu>

      <!-- Teaching Content Management -->
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
      activeIndex: this.$route.path
    }
  },
  watch: {
    $route(route) {
      this.activeIndex = route.path
    }
  }
}
</script>

<style scoped>
.sidebar {
  height: 100%;
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
