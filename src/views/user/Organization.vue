<template>
  <div class="organization-container">
    <div class="page-header">
      <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">组织架构管理</h2>
      </div>
      <!-- 任务分配按钮会由MainLayout组件添加到右上角 -->
    </div>
    
    <div class="search-form">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchForm.name" placeholder="请输入组织名称" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchForm.type" placeholder="请选择组织类型" size="medium" clearable>
            <el-option label="部门" value="department"></el-option>
            <el-option label="团队" value="team"></el-option>
            <el-option label="项目组" value="project"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="content-area">
      <p>组织架构管理功能正在开发中...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Organization',
  data() {
    return {
      searchForm: {
        name: '',
        type: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleSearch() {
      this.$message({
        message: '搜索功能正在开发中',
        type: 'info'
      });
    }
  }
}
</script>

<style scoped>
.organization-container {
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

.search-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.content-area {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 自定义输入框样式 */
.el-input__inner {
  background-color: #fff !important;
  border: 1px solid #dcdfe6 !important;
}

.el-input__inner::placeholder {
  color: #333 !important;
  opacity: 0.7;
}

.el-select .el-input__inner::placeholder {
  color: #333 !important;
  opacity: 0.7;
}

/* 确保下拉框也有边框 */
.el-select .el-input__inner {
  border: 1px solid #dcdfe6 !important;
}

/* 确保鼠标悬停和聚焦时的样式 */
.el-input__inner:hover, 
.el-input__inner:focus {
  border-color: #409EFF !important;
}

.date-range-container {
  display: flex;
  align-items: center;
}

.date-separator {
  margin: 0 5px;
}
</style>
