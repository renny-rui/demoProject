<template>
  <div class="logs-container">
    <div class="page-header">
      <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">操作日志</h2>
      </div>
      <!-- 任务分配按钮会由MainLayout组件添加到右上角 -->
    </div>
    
    <div class="content-area">
      <p>操作日志功能正在开发中...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationLogs',
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.logs-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  align-items: center;
}

.page-title {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.back-button {
  cursor: pointer;
  color: #409EFF;
  font-size: 14px;
  margin-right: 15px;
}

.content-area {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
