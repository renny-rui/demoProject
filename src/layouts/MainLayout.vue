<template>
  <div class="main-layout">
    <Sidebar class="sidebar" />
    <div class="main-content">
      <TaskAssignButton v-if="!isDashboard" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import TaskAssignButton from '@/components/TaskAssignButton.vue'

export default {
  name: 'MainLayout',
  components: {
    Sidebar,
    TaskAssignButton
  },
  computed: {
    isDashboard() {
      return this.$route.path === '/dashboard' || this.$route.path === '/';
    }
  }
}
</script>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  min-height: 100vh;
  flex-shrink: 0;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  position: relative;
}
</style>
