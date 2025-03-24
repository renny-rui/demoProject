<template>
  <div class="roles-container">
    <div class="page-header">
      <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">权限管理</h2>
      </div>
      <!-- 任务分配按钮会由MainLayout组件添加到右上角 -->
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchQuery.name" placeholder="请输入用户名" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchQuery.realName" placeholder="请输入姓名" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchQuery.status" placeholder="请选择状态" size="medium" clearable>
            <el-option label="正常" :value="'正常'"></el-option>
            <el-option label="禁用" :value="'禁用'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="toolbar">
      <div>
        <el-button type="primary" class="action-btn" @click="showAddUserDialog">
        <i class="el-icon-plus"></i> 新增用户
      </el-button>
      </div>
      
      <!-- 用户列表 -->
    <div style="padding: 0 20px 0 20px;">
      <el-table
      :data="userList"
      border
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="用户名"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="260"
      ></el-table-column>
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
      <el-table-column
        prop="role"
        label="角色"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.role === '0' ? '0' : '1' }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="300"
      >
        <template slot-scope="scope">
          <span class="edit-btn" @click="handleEdit(scope.row)">
            <i class="el-icon-edit"></i> 编辑
          </span>
          <span class="edit-btn" @click="handleChangePassword(scope.row)" style="margin-left: 10px;">
            <i class="el-icon-key"></i> 修改密码
          </span>
          <span class="delete-btn" @click="handleDelete(scope.row)">
            <i class="el-icon-delete"></i> 删除
          </span>
        </template>
      </el-table-column>
    </el-table>
    </div>
   

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    </div>

    <!-- 新增/编辑用户对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" @close="resetForm">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="user-form">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入用户名" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="userForm.realName" placeholder="请输入姓名" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="userForm.department" placeholder="请输入部门" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="contactMethod">
          <el-input v-model="userForm.contactMethod" placeholder="请输入联系方式" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userForm.status" placeholder="请选择状态" size="medium" clearable>
            <el-option label="正常" :value="'正常'"></el-option>
            <el-option label="禁用" :value="'禁用'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isEdit" label="密码" prop="password">
          <el-input type="password" v-model="userForm.password" placeholder="请输入密码" size="medium" show-password></el-input>
        </el-form-item>
        <el-form-item v-if="!isEdit" label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="userForm.confirmPassword" placeholder="请再次输入密码" size="medium" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitForm" size="medium">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="passwordDialogVisible" width="500px" @close="resetPasswordForm">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="100px" class="password-form">
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword" placeholder="请输入新密码" size="medium" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="passwordForm.confirmPassword" placeholder="请再次输入新密码" size="medium" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogVisible = false" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitPasswordForm" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'Roles',
  data() {
    // 验证密码是否一致
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    // 验证修改密码时密码是否一致
    const validatePasswordConfirm = (rule, value, callback) => {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      // 搜索条件
      searchQuery: {
        name: '',
        realName: '',
        status: ''
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
        name: '',
        realName: '',
        department: '',
        contactMethod: '',
        status: '正常',
        password: '',
        confirmPassword: ''
      },

      // 表单验证规则
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        contactMethod: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' }
        ]
      },

      // 修改密码相关
      passwordDialogVisible: false,
      passwordForm: {
        newPassword: '',
        confirmPassword: ''
      },
      passwordRules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePasswordConfirm, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    console.log('Roles组件已创建');
    this.fetchUserList();
  },
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
    
    // 获取用户列表
    async fetchUserList() {
      try {
        this.loading = true;
        
        // 构建查询参数 - 页码和每页数量
        const params = {
          currentpage: this.currentPage,
          perpagecount: this.pageSize
        };
        
        console.log('请求参数:', params);
        
        // 从 cookie 中获取 token
        const token = Cookies.get('Authorization') || Cookies.get('token');
        console.log('从 cookie 中获取的 token:', token);
        
        if (!token) {
          console.error('未找到认证 token，请重新登录');
          this.$message.error('认证已过期，请重新登录');
          this.$router.push('/login');
          return;
        }
        
        // 直接使用axios发送请求，手动设置请求头
        const axios = require('axios');
        
        // 配置请求选项
        const config = {
          headers: { 
            'Authorization': token, // 直接使用从 cookie 中获取的 token，不添加 Bearer 前缀
            'Content-Type': 'application/json'
          },
          withCredentials: true // 确保跨域请求时携带 cookie
        };
        
        console.log('发送请求配置:', config);
        
        // 发送请求获取用户列表
        const response = await axios.post(
          'http://117.50.115.177:8991/user/list',
          params,
          config
        );
        
        console.log('用户列表接口响应:', response);
        
        // 处理响应数据
        if (response) {
          this.userList = response.data.data;
          this.total = response.rowcount || 0;
          console.log('获取到的用户列表:', this.userList);
        } else {
          console.error('接口返回数据格式不正确:', response.data);
          this.$message.error('获取用户列表失败: 数据格式不正确');
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
        name: '',
        realName: '',
        department: '',
        contactMethod: '',
        status: '正常',
        password: '',
        confirmPassword: ''
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
      this.currentUserId = row.id;
      this.userForm = {
        name: row.name,
        realName: row.realName,
        department: row.department,
        contactMethod: row.contactMethod,
        status: row.status
      };
      this.dialogVisible = true;
      // 等待DOM更新后重置表单验证
      this.$nextTick(() => {
        if (this.$refs.userForm) {
          this.$refs.userForm.clearValidate();
        }
      });
    },

    // 修改密码
    handleChangePassword(row) {
      this.currentUserId = row.id;
      this.passwordForm = {
        newPassword: '',
        confirmPassword: ''
      };
      this.passwordDialogVisible = true;
      // 等待DOM更新后重置表单验证
      this.$nextTick(() => {
        if (this.$refs.passwordForm) {
          this.$refs.passwordForm.clearValidate();
        }
      });
    },

    // 删除用户
    handleDelete(row) {
      this.$confirm('确认删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 模拟删除成功
        const index = this.userList.findIndex(item => item.id === row.id);
        if (index !== -1) {
          this.userList.splice(index, 1);
          this.$message.success('删除成功');
        }
      }).catch(() => {
        // 取消删除，不做任何操作
      });
    },

    // 提交用户表单
    submitForm() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          const formData = { ...this.userForm };
          // 删除确认密码字段，不需要提交给后端
          delete formData.confirmPassword;
          
          if (this.isEdit) {
            // 模拟编辑成功
            const index = this.userList.findIndex(item => item.id === this.currentUserId);
            if (index !== -1) {
              this.userList[index] = { ...this.userList[index], ...formData };
              this.$message.success('更新成功');
              this.dialogVisible = false;
            }
          } else {
            // 模拟添加成功
            const newUser = {
              ...formData,
              id: this.userList.length + 1
            };
            this.userList.push(newUser);
            this.$message.success('添加成功');
            this.dialogVisible = false;
          }
        } else {
          return false;
        }
      });
    },

    // 提交修改密码表单
    submitPasswordForm() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          // 模拟密码修改成功
          this.$message.success('密码修改成功');
          this.passwordDialogVisible = false;
        } else {
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
    }
  }
};
</script>

<style scoped>
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
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.toolbar {
  background-color: #f5f7fa;
  padding: 23px 0px 0px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.action-btn {
  margin-right: 10px;
  margin-bottom: 20px;
}

.edit-btn, .delete-btn {
  cursor: pointer;
  color: #409EFF;
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

.user-form, .password-form {
  max-width: 100%;
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
.search-btn{
  background-color: #409EFF;
}
</style>
