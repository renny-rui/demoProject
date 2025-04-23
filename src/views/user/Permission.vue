<template>
  <div class="permission-container">
    <div class="page-header">
      <el-button type="primary" @click="handleAdd" class="add-btn">添加权限</el-button>
    </div>

    <!-- 权限列表 -->
    <el-table
      :data="permissionList"
      border
      stripe
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="Id"
        label="ID"
        width="80"
        align="center">
      </el-table-column>
      <el-table-column
        prop="Priority"
        label="权限级别"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="Description"
        label="权限描述"
        min-width="200">
      </el-table-column>
      
     
      
      <el-table-column
        label="操作"
        width="180"
        align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            class="edit-btn"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            disabled>
            编辑
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            class="delete-btn"
            @click="handleDelete(scope.row)"
            disabled>
            删除
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

    <!-- 添加/编辑权限对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :modal="false">
      <el-form :model="permissionForm" :rules="rules" ref="permissionForm" label-width="100px" style="padding: 15px;">
        <el-form-item v-if="dialogType === 'edit'" label="ID">
          <el-input v-model="permissionForm.Id" disabled></el-input>
        </el-form-item>
        <el-form-item label="权限级别" prop="Priority">
          <el-input v-model="permissionForm.Priority" placeholder="请输入权限级别"></el-input>
        </el-form-item>
        <el-form-item label="权限描述" prop="Description">
          <el-input v-model="permissionForm.Description" placeholder="请输入权限描述" type="textarea" :rows="3"></el-input>
        </el-form-item>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission, updatePermission, deletePermission } from '@/api/permission';

export default {
  name: 'Permission',
  data() {
    return {
      // 权限列表数据
      permissionList: [],
      // 加载状态
      loading: false,
      // 分页相关
      currentPage: 1,
      pageSize: 10,
      total: 0,
      // 对话框相关
      dialogVisible: false,
      dialogTitle: '添加权限',
      dialogType: 'add', // add 或 edit
      // 表单数据
      permissionForm: {
        Id: '',
        Priority: '',
        Description: '',
        Status: 0,
        IsUpdate: 1,
        CreateTime: 0
      },
      // 表单验证规则
      rules: {
        Priority: [
          { required: true, message: '请输入权限级别', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        Description: [
          { required: true, message: '请输入权限描述', trigger: 'blur' },
          { min: 2, max: 100, message: '长度在 2 到 100 个字符', trigger: 'blur' }
        ],
        Status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        IsUpdate: [
          { required: true, message: '请选择是否可修改', trigger: 'change' }
        ]
      }
    };
  },
  created() {
    this.fetchPermissionList();
  },
  methods: {
    // 获取权限列表
    async fetchPermissionList() {
      this.loading = true;
      try {
        // 模拟API调用，实际项目中应替换为真实API
        const response = await getPermissionList({
          currentPage: this.currentPage,
          pageSize: this.pageSize

        });
        
        // 使用示例数据进行模拟
        // const response = {
        //   success: true,
        //   msg: "",
        //   data: [
        //     {
        //       Id: 1,
        //       Priority: "一级权限",
        //       Description: "管理员权限",
        //       Status: 0,
        //       CreateTime: 1745125103,
        //       IsUpdate: 1
        //     },
        //     {
        //       Id: 2,
        //       Priority: "二级权限",
        //       Description: "二级用户权限",
        //       Status: 0,
        //       CreateTime: 1745125127,
        //       IsUpdate: 0
        //     },
        //     {
        //       Id: 3,
        //       Priority: "三级权限",
        //       Description: "三级用户权限",
        //       Status: 0,
        //       CreateTime: 1745125151,
        //       IsUpdate: 0
        //     }
        //   ]
        // };

        if (response.success) {
          this.permissionList = response.data;
        
        } else {
          this.$message.error(response.msg || '获取权限列表失败');
        }
      } catch (error) {
        console.error('获取权限列表失败:', error);
        this.$message.error('获取权限列表失败');
      } finally {
        this.loading = false;
      }
    },

    // 处理添加权限
    handleAdd() {
      this.dialogType = 'add';
      this.dialogTitle = '添加权限';
      this.resetForm();
      this.dialogVisible = true;
    },

    // 处理编辑权限
    handleEdit(row) {
      if (row.IsUpdate === 0) {
        this.$message.warning('该权限不可修改');
        return;
      }
      
      this.dialogType = 'edit';
      this.dialogTitle = '编辑权限';
      this.resetForm();
      
      // 复制数据到表单
      this.permissionForm = {
        Id: row.Id,
        Priority: row.Priority,
        Description: row.Description,
        Status: row.Status,
        IsUpdate: row.IsUpdate,
        CreateTime: row.CreateTime
      };
      
      this.dialogVisible = true;
    },

    // 处理删除权限
    handleDelete(row) {
      if (row.IsUpdate === 0) {
        this.$message.warning('该权限不可删除');
        return;
      }
      
      this.$confirm('确认删除该权限吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          // 实际项目中应调用真实API
          // const response = await deletePermission(row.Id);
          
          // 模拟API响应
          const response = { success: true, msg: '删除成功' };
          
          if (response.success) {
            this.$message.success('删除成功');
            this.fetchPermissionList();
          } else {
            this.$message.error(response.msg || '删除失败');
          }
        } catch (error) {
          console.error('删除权限失败:', error);
          this.$message.error('删除权限失败');
        }
      }).catch(() => {
        // 取消删除操作
      });
    },

    // 提交表单
    submitForm() {
      this.$refs.permissionForm.validate(async (valid) => {
        if (valid) {
          try {
            const formData = { ...this.permissionForm };
            
            // 确保数值类型正确
            formData.Status = Number(formData.Status);
            formData.IsUpdate = Number(formData.IsUpdate);
            
            let response;
            
            if (this.dialogType === 'add') {
              // 添加权限时不需要ID
              delete formData.Id;
              // 添加创建时间
              formData.CreateTime = Math.floor(Date.now() / 1000);
              
              // 实际项目中应调用真实API
              // response = await addPermission(formData);
              
              // 模拟API响应
              response = { success: true, msg: '添加成功' };
            } else {
              // 实际项目中应调用真实API
              // response = await updatePermission(formData);
              
              // 模拟API响应
              response = { success: true, msg: '更新成功' };
            }
            
            if (response.success) {
              this.$message.success(this.dialogType === 'add' ? '添加成功' : '更新成功');
              this.dialogVisible = false;
              this.fetchPermissionList();
            } else {
              this.$message.error(response.msg || (this.dialogType === 'add' ? '添加失败' : '更新失败'));
            }
          } catch (error) {
            console.error(this.dialogType === 'add' ? '添加权限失败:' : '更新权限失败:', error);
            this.$message.error(this.dialogType === 'add' ? '添加权限失败' : '更新权限失败');
          }
        } else {
          return false;
        }
      });
    },

    // 重置表单
    resetForm() {
      if (this.$refs.permissionForm) {
        this.$refs.permissionForm.resetFields();
      }
      
      this.permissionForm = {
        Id: '',
        Priority: '',
        Description: '',
        Status: 0,
        IsUpdate: 1,
        CreateTime: 0
      };
    },

    // 处理页码变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchPermissionList();
    },

    // 处理每页显示条数变化
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchPermissionList();
    },

    // 格式化时间戳
  

    // 获取状态文本
    getStatusText(status) {
      return status === 0 ? '正常' : '禁用';
    }
  }
};
</script>

<style scoped>
.add-btn{
    color: #000;
}
.permission-container {
  padding: 20px;
  background-color: #505962;
  margin: 20px;
  border-radius: 4px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.delete-btn {
  color: #F56C6C;
}
.edit-btn{
    color: #c1ffff;
}
.el-table {
  margin-top: 15px;
}

.el-table th {
  background-color: #f5f7fa;
}

.el-form-item {
  margin-bottom: 20px;
}
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
.dialog-footer{
    display: flex;
    justify-content: center;
    
}
.dialog-footer .el-button{
    color: #000;
}

</style>