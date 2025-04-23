<template>
  <div class="roles-container">
    <div class="page-header">
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchQuery.name" placeholder="请输入用户名" size="medium" clearable></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="toolbar" style="background-color:#505962; display: flex; flex-direction: column; padding: 10px 0; margin-bottom: 20px; border-radius: 4px;">
      <div style="padding: 10px 20px;  width: 100%;">
        <el-button type="primary" class="action-btn" @click="showAddUserDialog" size="small">
          <i class="el-icon-plus"></i> 新增用户
        </el-button>
      </div>

      <!-- 用户列表 -->
      <div style="padding: 0 20px 20px 20px; width: 100%;">
        <el-table :data="userList" border style="width: 100%" v-loading="loading"
          @selection-change="handleSelectionChange"
          :header-cell-style="{ background: '#2c3e50', color: '#fff' }" 
          :cell-style="{ background: '#34495e', color: '#fff' }">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="Id" label="ID" width="80"></el-table-column>
          <el-table-column prop="Name" label="用户名" width="150"></el-table-column>
          <el-table-column prop="PassWord" label="密码" width="130">
            <template>
              <span>******</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
        prop="department"
        label="部门"
        width="150"
      ></el-table-column> -->
          <!-- <el-table-column
        prop="contactMethod"
        label="联系方式"
        width="150"
      ></el-table-column> -->
          <el-table-column prop="Role" label="角色" width="100">
            <template slot-scope="scope">
              {{ scope.row.Role === '0' ? '管理员' : '普通用户' }}
            </template>
          </el-table-column>
          <el-table-column prop="CreateTime" label="创建时间">
            <template slot-scope="scope">
              {{ formatDate(scope.row.CreateTime) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)" class="edit-btn">
                <i class="el-icon-edit"></i> 编辑
              </el-button>
            
              <el-button type="text" size="small" @click="handleDelete(scope.row)" class="delete-btn">
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination @current-change="handleCurrentChange"
            :current-page="currentPage" :page-size="pageSize"
            layout="prev, pager, next" :total="total"
            class="custom-pagination">
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 新增/编辑用户对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="400px" @close="resetForm" custom-class="user-dialog">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="80px" class="user-form-centered">
        <el-form-item label="用户名" prop="UserName">
          <el-input v-model="userForm.UserName" placeholder="请输入用户名" size="medium" clearable></el-input>
        </el-form-item>
      
        <el-form-item label="密码" prop="PassWord">
          <el-input type="password" v-model="userForm.PassWord" placeholder="请输入密码" size="medium"
            show-password></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="Role">
          <el-radio-group v-model="userForm.Role" size="medium">
            <el-radio :label="0">管理员</el-radio>
            <el-radio :label="1">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer-centered">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="medium" style="color:#333">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { getUserList, addUser, updateUser, deleteUser } from '@/api/roles';

export default {
  name: 'Roles',
  data() {
   

    return {
      // 搜索条件
      searchQuery: {
        Name: '',
        Status: ''
      },

      // 用户列表数据
      userList: [],
      loading: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      selectedUsers: [],

      // 对话框相关
      dialogVisible: false,
      dialogTitle: '新增用户',
      isEdit: false,
      currentUserId: null,

      // 用户表单
      userForm: {
        UserName: '',
        PassWord: '',
        Role: '',
        Id:''
      },

      // 表单验证规则
      rules: {
        UserName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        PassWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        Role: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ]
      },

   
      submitLoading: false
    };
  },
  created() {
    console.log('Roles组件已创建');
    this.fetchUserList();
  },
  methods: {
   

    // 获取用户列表
    async fetchUserList() {
      this.loading = true;
      try {
        const response = await getUserList({
          page: this.currentPage,
          limit: this.pageSize
        });
        
        console.log('API Response:', response);
        
        if (response.data) {
          // 处理用户列表数据
          this.userList = response.data || [];
          this.total = response.ToalCount || 0;
          
          // 打印第一条数据的创建时间，用于调试
          if (this.userList.length > 0) {
            console.log('First user CreateTime:', this.userList[0].CreateTime);
          }
        }
      } catch (error) {
        console.error('获取用户列表失败:', error);
        this.$message.error('获取用户列表失败: ' + (error.message || '未知错误'));
      } finally {
        this.loading = false;
      }
    },

    // 搜索用户
    handleSearch() {
      this.currentPage = 1;
      this.fetchUserList();
    },

    // 分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchUserList();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchUserList();
    },

    // 表格选择项变化
    handleSelectionChange(selection) {
      this.selectedUsers = selection;
    },

    // 显示新增用户对话框
    showAddUserDialog() {
      this.dialogTitle = '新增用户';
      this.isEdit = false;
      this.userForm = {
        UserName: '',
        PassWord: '',
        Role: ''
      };
      this.dialogVisible = true;
      // 等待DOM更新后重置表单验证
      this.$nextTick(() => {
        if (this.$refs.userForm) {
          this.$refs.userForm.clearValidate();
        }
      });
    },

    // 编辑用户
    handleEdit(row) {
      this.dialogTitle = '编辑用户';
      this.isEdit = true;
      console.log('编辑用户：',row.Id)
      this.userForm = {
        UserName: row.Name,
        Role: row.Role,
        PassWord:row.PassWord,
        Id:row.Id
      };
      this.dialogVisible = true;
      // 等待DOM更新后重置表单验证
      this.$nextTick(() => {
        if (this.$refs.userForm) {
          this.$refs.userForm.clearValidate();
        }
      });
    },

    // 删除用户
    handleDelete(row) {
      // 使用 MessageBox 而不是 $confirm，并设置 appendToBody 为 true
      this.$msgbox({
        title: '提示',
        message: '确认删除该用户吗？此操作不可恢复',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'delete-confirm-dialog',
        distinguishCancelAndClose: true,
        callback: (action, instance) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            
            // 执行删除操作
            deleteUser(row.Id)
              .then(() => {
                this.$message.success('删除成功');
                this.fetchUserList();
              })
              .catch(error => {
                console.error('删除失败:', error);
                this.$message.error('删除失败: ' + (error.message || '未知错误'));
              })
              .finally(() => {
                instance.confirmButtonLoading = false;
              });
          } else if (action === 'cancel') {
            this.$message.info('已取消删除');
          }
        }
      }).catch(() => {
        // 处理取消操作
      });
    },

    // 提交表单（新增/编辑用户）
    submitForm() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          this.submitLoading = true;
          try {
            const formData = { ...this.userForm };
            
            // 确保角色值是数字类型
            if (formData.Role !== undefined) {
              formData.Role = Number(formData.Role);
            }
            
            // 如果是编辑模式，添加用户ID
            if (this.isEdit) {
              formData.Id = this.userForm.Id;
              // 调用编辑用户API
              await updateUser(formData);
              this.$message.success('编辑用户成功');
            } else {
              // 调用新增用户API
              await addUser(formData);
              this.$message.success('新增用户成功');
            }
            
            // 关闭对话框
            this.dialogVisible = false;
            // 刷新用户列表
            this.fetchUserList();
          } catch (error) {
            console.error('操作失败:', error);
            this.$message.error('操作失败: ' + (error.message || '未知错误'));
          } finally {
            this.submitLoading = false;
          }
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },

  

    // 重置表单
    resetForm() {
      if (this.$refs.userForm) {
        this.$refs.userForm.resetFields();
      }
    },

    // 重置密码表单
    resetPasswordForm() {
      if (this.$refs.passwordForm) {
        this.$refs.passwordForm.resetFields();
      }
    },
    formatDate(timestamp) {
      // 如果为空，返回空字符串
      if (!timestamp) return '';
      
      try {
        // 如果是字符串日期格式，直接提取日期部分
        if (typeof timestamp === 'string') {
          // 如果已经是格式化的日期字符串，直接返回日期部分
          if (timestamp.includes('-') || timestamp.includes('/')) {
            // 处理 "2023-04-15 14:30:00" 或 "2023/04/15 14:30:00" 格式
            return timestamp.split(' ')[0];
          }
          
          // 如果是数字字符串，尝试转换为数字
          if (!isNaN(timestamp)) {
            timestamp = Number(timestamp);
          }
        }
        
        // 处理Unix时间戳（秒或毫秒）
        if (typeof timestamp === 'number') {
          // 如果是秒级时间戳（10位数字），转换为毫秒
          if (timestamp.toString().length === 10) {
            timestamp *= 1000;
          }
          
          const date = new Date(timestamp);
          // 检查日期是否有效
          if (!isNaN(date.getTime())) {
            return date.getFullYear() + '-' + 
                  (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                  date.getDate().toString().padStart(2, '0');
          }
        }
        
        // 如果上面的方法都失败，尝试直接使用Date构造函数
        const date = new Date(timestamp);
        if (!isNaN(date.getTime())) {
          return date.getFullYear() + '-' + 
                (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
                date.getDate().toString().padStart(2, '0');
        }
        
        // 如果所有方法都失败，返回原始值
        return timestamp;
      } catch (e) {
        console.error('日期格式化错误:', e);
        return timestamp;
      }
    }
  }
};
</script>

<style>
/* Global styles for message box and modal with extremely high z-index */
.el-message-box__wrapper {
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  z-index: 99999 !important;
}

.v-modal {
  position: fixed !important;
  z-index: 99998 !important;
}

.el-message {
  z-index: 100000 !important;
}

/* Override any other styles that might be affecting z-index */
body > .el-message-box__wrapper {
  position: fixed !important;
  z-index: 99999 !important;
}

body > .v-modal {
  position: fixed !important;
  z-index: 99998 !important;
}

/* 角色管理页面对话框样式 */
.user-dialog .el-dialog {
  border-radius: 4px;
}

.user-dialog .el-dialog__body {
  padding: 30px 20px !important;
}

.user-form-centered {
  margin: 0 auto !important;
}

.user-dialog .el-form-item__label {
  color: #333;
}

.dialog-footer-centered {
  text-align: center !important;
  padding-top: 10px;
}

.user-dialog .el-radio-group {
  display: flex;
}

.user-dialog .el-radio {
  margin-right: 15px;
}

/* Table styling */
::v-deep .el-table {
  background-color: #7B8B9B !important;
}

::v-deep .el-table__header-wrapper,
::v-deep .el-table__body-wrapper {
  background-color: #7B8B9B !important;
}

::v-deep .el-table td,
::v-deep .el-table th.is-leaf {
  background-color: #7B8B9B !important;
  border-bottom: 1px solid #909399 !important;
  color: #f0f0f0 !important;
}

::v-deep .el-table--border::after,
::v-deep .el-table--group::after,
::v-deep .el-table::before {
  background-color: #909399 !important;
}

::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #7B8B9B !important;
}

::v-deep .el-table__body tr:hover > td {
  background-color: #7B8B9B !important;
}

::v-deep .el-table .el-table__header th {
  background-color: #6C767F !important;
  color: #f0f0f0 !important;
}

/* 角色管理页面特定的对话框样式 */
::v-deep .user-dialog {
  display: flex;
  flex-direction: column;
}

::v-deep .user-dialog .el-dialog__body {
  padding: 20px 30px;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.user-form,
.password-form {
  max-width: 400px !important;
  margin: 0 auto !important;
}

:v-deep .user-form .el-form-item__content {
  margin-left: 100px !important;
  margin-top: 10px !important;
}

:v-deep .dialog-footer {
  text-align: center !important;
}
</style>

<style scoped>
/* 新增样式 */
.form-container-center {
  display: flex;
  justify-content: center;
  width: 100%;
}

.user-form-centered {
  width: 80%;
  max-width: 400px;
}

.user-dialog .el-dialog__body {
  padding: 10px 0 !important;
}

.dialog-footer-centered {
  text-align: center;
}

/* 确保删除确认对话框显示在最上层 */
::v-deep .delete-confirm-dialog {
  z-index: 9999 !important;
}

::v-deep .el-message-box__wrapper {
  z-index: 3000 !important;
}

::v-deep .v-modal {
  z-index: 2999 !important;
}

.roles-container {
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

.back-button {
  cursor: pointer;
  color: #409EFF;
  font-size: 14px;
  margin-right: 15px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.search-form {
  background-color: #505962;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.toolbar {
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  margin-bottom: 20px;
  border-radius: 4px;
}

.action-btn {
  margin-right: 10px;
  margin-bottom: 20px;
}

.edit-btn,
.delete-btn {
  cursor: pointer;
  color: #c1ffff;
  margin-right: 10px;
}

.delete-btn {
  color: #F56C6C;
}

.pagination {
  margin-top: 20px;
  text-align: right;
  padding: 0 20px 20px 0;
}

.user-form,
.password-form {
  max-width: 400px !important;
  margin: 0 auto !important;
}

:v-deep .user-form .el-form-item__content {
  margin-left: 100px !important;
  margin-top: 10px !important;
}

:v-deep .dialog-footer {
  text-align: center !important;
}
</style>
