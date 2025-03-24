<template>
  <div class="task-assign-button">
    <el-button type="primary" round class="assign-btn" @click="handleAssign">
      <i class="el-icon-share"></i> 任务分配
    </el-button>
   
  </div>
</template>

<script>
export default {
  name: 'TaskAssignButton',
  methods: {
    handleAssign() {
      this.$message({
        message: '任务分配功能即将上线',
        type: 'info'
      });
    }
  }
}
</script>

<style scoped>
.task-assign-button {
  position: absolute;
  top: 20px;
  right: 30px;
  z-index: 1000;
}

.assign-btn {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
  color: white !important;
  font-weight: bold;
  border-radius: 20px !important;
  padding: 8px 16px !important;
  font-size: 14px;
}

.assign-btn i {
  margin-right: 5px;
}
</style>
