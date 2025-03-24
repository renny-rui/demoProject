<template>
  <div class="user-management">
    <div class="page-header">
      <h1>权限管理</h1>
      <el-button type="primary" @click="showAddUserDialog">新增用户</el-button>
    </div>

    <!-- 用户列表 -->
    <el-table
      :data="userList"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        prop="username"
        label="用户名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="realName"
        label="姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
      ></el-table-column>
      <el-table-column
        prop="role"
        label="角色"
      >
        <template slot-scope="scope">
          {{ scope.row.role === 0 ? '管理员' : '普通用户' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="handleChangePassword(scope.row)"
          >修改密码</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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

    <!-- 新增/编辑用户对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="userForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" :value="0"></el-option>
            <el-option label="普通用户" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" v-if="!isEdit">
          <el-input v-model="userForm.confirmPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="passwordDialogVisible" width="500px">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="100px">
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitPasswordForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 暂时注释掉未使用的API导入
// import { getUserList, addUser, updateUser, deleteUser, changePassword } from '@/api/user';

export default {
  name: 'UserManagement',
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
      // 用户列表数据
      userList: [
        {
          id: 1,
          username: 'admin',
          realName: '管理员',
          email: 'admin@example.com',
          phone: '13800138000',
          role: 0
        },
        {
          id: 2,
          username: 'user1',
          realName: '用户1',
          email: 'user1@example.com',
          phone: '13800138001',
          role: 1
        },
        {
          id: 3,
          username: 'user2',
          realName: '用户2',
          email: 'user2@example.com',
          phone: '13800138002',
          role: 1
        }
      ],
      loading: false,
      total: 3,
      currentPage: 1,
      pageSize: 10,

      // 对话框相关
      dialogVisible: false,
      dialogTitle: '新增用户',
      isEdit: false,
      currentUserId: null,

      // 用户表单
      userForm: {
        username: '',
        realName: '',
        email: '',
        phone: '',
        role: 1,
        password: '',
        confirmPassword: ''
      },

      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'change' }
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
    console.log('UserManagement组件已创建');
    this.fetchUserList();
  },
  methods: {
    // 获取用户列表
    fetchUserList() {
      console.log('正在获取用户列表...');
      this.loading = true;
      
      // 由于后端API可能尚未实现，先使用本地数据
      setTimeout(() => {
        console.log('使用本地数据');
        // 这里不调用API，直接使用初始数据
        this.loading = false;
      }, 500);
      
      /* 
      // 实际API调用，等后端准备好后可以取消注释
      getUserList({
        page: this.currentPage,
        limit: this.pageSize
      }).then(response => {
        if (response.success) {
          this.userList = response.data.list || [];
          this.total = response.data.total || 0;
        } else {
          this.$message.error(response.msg || '获取用户列表失败');
        }
        this.loading = false;
      }).catch(error => {
        console.error('获取用户列表失败:', error);
        this.$message.error('获取用户列表失败，请检查网络连接');
        this.loading = false;
      });
      */
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

    // 显示新增用户对话框
    showAddUserDialog() {
      this.dialogTitle = '新增用户';
      this.isEdit = false;
      this.userForm = {
        username: '',
        realName: '',
        email: '',
        phone: '',
        role: 1,
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
        username: row.username,
        realName: row.realName,
        email: row.email,
        phone: row.phone,
        role: row.role
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
        
        /* 
        // 实际API调用，等后端准备好后可以取消注释
        deleteUser(row.id).then(response => {
          if (response.success) {
            this.$message.success('删除成功');
            this.fetchUserList();
          } else {
            this.$message.error(response.msg || '删除失败');
          }
        }).catch(error => {
          console.error('删除用户失败:', error);
          this.$message.error('删除用户失败，请检查网络连接');
        });
        */
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
            
            /*
            // 编辑用户 - 实际API调用
            updateUser(this.currentUserId, formData).then(response => {
              if (response.success) {
                this.$message.success('更新成功');
                this.dialogVisible = false;
                this.fetchUserList();
              } else {
                this.$message.error(response.msg || '更新失败');
              }
            }).catch(error => {
              console.error('更新用户失败:', error);
              this.$message.error('更新用户失败，请检查网络连接');
            });
            */
          } else {
            // 模拟添加成功
            const newUser = {
              ...formData,
              id: this.userList.length + 1
            };
            this.userList.push(newUser);
            this.$message.success('添加成功');
            this.dialogVisible = false;
            
            /*
            // 新增用户 - 实际API调用
            addUser(formData).then(response => {
              if (response.success) {
                this.$message.success('添加成功');
                this.dialogVisible = false;
                this.fetchUserList();
              } else {
                this.$message.error(response.msg || '添加失败');
              }
            }).catch(error => {
              console.error('添加用户失败:', error);
              this.$message.error('添加用户失败，请检查网络连接');
            });
            */
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
          
          /*
          // 实际API调用
          const data = {
            newPassword: this.passwordForm.newPassword
          };
          
          changePassword(this.currentUserId, data).then(response => {
            if (response.success) {
              this.$message.success('密码修改成功');
              this.passwordDialogVisible = false;
            } else {
              this.$message.error(response.msg || '密码修改失败');
            }
          }).catch(error => {
            console.error('修改密码失败:', error);
            this.$message.error('修改密码失败，请检查网络连接');
          });
          */
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.user-management {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
