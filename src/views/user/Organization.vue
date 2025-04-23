<template>
  <div>
    <div class="organization-container">
      <div class="page-header">
      </div>

      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="searchForm.GroupName" placeholder="请输入组织架构名称" size="medium" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.GroupNum" placeholder="请输入组织架构编号" size="medium" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
            <el-button @click="resetForm" size="medium" style="background-color: #a6b5bb;color:#333">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="content-area" style="background-color:#505962;">
        <div class="toolbar">
          <el-button type="primary" class="action-btn" icon="el-icon-plus" @click="handleAdd" size="small">新增</el-button>
          <el-button type="danger" class="action-btn" icon="el-icon-delete" @click="handleBatchDelete" size="small"
            style="background-color:#C1FFFF; color:#333; border-color:#C1FFFF">删除</el-button>
          
        </div>
        <div style="padding: 0 20px 20px 20px;">
          <el-table :data="organizationList" style="width: 100%" border stripe
            :header-cell-style="{ background: '#2c3e50', color: '#fff' }" :cell-style="{ background: '#34495e', color: '#fff' }">
            <el-table-column prop="Id" label="ID" width="70">
            </el-table-column>
            <el-table-column prop="Num" label="编号" width="80">
            </el-table-column>
            <el-table-column prop="Name" label="组织名称">
            </el-table-column>
            <el-table-column prop="Fid" label="父级ID" width="80">
            </el-table-column>
            <el-table-column label="创建时间" width="180">
              <template slot-scope="scope">
                {{ formatTime(scope.row.CreateTime) }}
              </template>
            </el-table-column>
            <el-table-column label="修改时间" width="180">
              <template slot-scope="scope">
                {{ formatTime(scope.row.ModifyTime) }}
              </template>
            </el-table-column>
            <el-table-column label="状态" width="80">
              <template slot-scope="scope">
               
                  {{ scope.row.Status === 0 ? '正常' : '禁用' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
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

      <!-- 新增/编辑组织机构弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" @close="resetForm"
        :before-close="handleBeforeClose" append-to-body :modal-append-to-body="false" custom-class="org-form-dialog"
        :lock-scroll="false" :modal="false" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
        <el-form :model="orgForm" :rules="rules" ref="orgForm" label-width="100px" class="org-form">
          <el-form-item label="组织架构编号" prop="Num">
            <el-input v-model="orgForm.Num" placeholder="请输入组织架构编号"></el-input>
          </el-form-item>
          <el-form-item label="组织架构名称" prop="Name">
            <el-input v-model="orgForm.Name" placeholder="请输入组织架构名称"></el-input>
          </el-form-item>
          <el-form-item label="组织架构ID" prop="Fid">
            <el-input v-model="orgForm.Fid" placeholder="请输入组织架构ID"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" class="cancel-btn">取消</el-button>
          <el-button type="primary" @click="submitForm" class="submit-btn">确定</el-button>
        </div>
      </el-dialog>

      <!-- 删除确认弹窗 -->
      <el-dialog title="删除确认" :visible.sync="deleteDialogVisible" width="400px" custom-class="org-form-dialog"
        :lock-scroll="false" :modal="false" :show-close="false" :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="delete-confirm-content">
          <i class="el-icon-warning warning-icon"></i>
          <p>确定要删除该组织机构吗？此操作不可恢复。</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false" class="cancel-btn">取消</el-button>
          <el-button type="danger" @click="confirmDelete" class="delete-confirm-btn">确定删除</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getOrganizationList,addOrganization,updateOrganization,deleteOrganization }  from '@/api/organization';
export default {
  name: 'Organization',
  data() {
    return {
      searchForm: {
        GroupNum: '',
        GroupName: ''
      },
      CurrentPage: 1,
      PerPageCount: 10,
      total: 0,
      organizationList: [],
      dialogTitle: '',
      dialogVisible: false,
      orgForm: {
        Num: '',
        Name: '',
        Fid: '',
      },
      rules: {
        Num: [
          { required: true, message: '请输入组织架构编号', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入组织架构名称', trigger: 'blur' }
        ],
        Fid: [
          { required: true, message: '请输入组织架构ID', trigger: 'blur' }
        ],
       
      },
      parentOptions: [],
      deleteDialogVisible: false,
      currentRow: null
    }
  },
  created() {
    this.fetchOrganizationList();
  },
  methods: {
    handleSearch() {
      this.currentPage = 1;
      this.fetchOrganizationList()
    },
    formatTime(timestamp) {
      if (!timestamp) return '';
      const date = new Date(timestamp * 1000); // 将秒转换为毫秒
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    async fetchOrganizationList(){
      try {
        this.loading = true;
        
        // 构建查询参数
        const params = {
          CurrentPage: this.currentPage,
          PerPageCount: this.pageSize,
          ...this.searchQuery
        };
        
        console.log('请求参数:', params);
        
        // 调用API获取用户列表
        const response = await getOrganizationList(params);
        // 处理响应数据
        if (response && response.data) {
          this.organizationList = response.data|| [];
          this.total = response.ToalCount;
          console.log('获取到的组织列表:', this.organizationList);
        } else {
          console.error('接口返回数据格式不正确:', response);
          this.$message.error('获取组织列表失败: 数据格式不正确');
        }
      } catch(error){
        console.error('获取组织列表失败:', error);
        this.$message.error('获取组织列表失败: ' + (error.message || '未知错误'));
      } 
      
    },
      // 分页处理
      handleSizeChange(val) {
      this.pageSize = val;
      this.fetchOrganizationList();
    },

    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchOrganizationList();
    },

    // 表格选择项变化
    handleSelectionChange(selection) {
      this.selectedUsers = selection;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑组织机构';
      this.dialogVisible = true;
      this.orgForm = { ...row };
      // 获取父级组织选项
      this.getParentOptions();
    },
    handleDelete(row) {
      this.currentRow = row;
      this.deleteDialogVisible = true;
      
      // 使用setTimeout确保在对话框完全渲染后移除遮罩层
      setTimeout(() => {
        const modals = document.querySelectorAll('.v-modal');
        modals.forEach(modal => {
          modal.parentNode.removeChild(modal);
        });
      }, 50);
    },
    handleAdd() {
      this.dialogTitle = '新增组织机构';
      this.dialogVisible = true;
      this.resetOrgForm();
      // 获取父级组织选项
      this.getParentOptions();
    },
    handleBatchDelete() {
      this.$message({
        message: '批量删除功能正在开发中',
        type: 'info'
      });
    },
    resetForm() {
      this.searchForm.name = '';
      this.searchForm.type = '';
    },
    resetOrgForm() {
      this.orgForm = {
        Num: '',
        Name: '',
        Fid: 0,
        Status: 0,
        UserId: 1 // 默认用户ID
      };
    },
    handleBeforeClose(done) {
      this.$refs.orgForm.resetFields();
      done();
    },
     // 新增方法：处理对话框打开并移除遮罩层
     openDialogWithoutModal(title, formData) {
      this.dialogTitle = title;
      this.orgForm = formData;
      this.dialogVisible = true;
      
      // 使用setTimeout确保在对话框完全渲染后移除遮罩层
      setTimeout(() => {
        const modals = document.querySelectorAll('.v-modal');
        modals.forEach(modal => {
          modal.parentNode.removeChild(modal);
        });
      }, 50);
    },
    submitForm() {
      this.$refs.orgForm.validate(async (valid) => {
        if (valid) {
          try {
            if (this.dialogTitle === '编辑组织机构') {
              // 编辑现有组织
              await this.updateOrganizationData();
            } else {
              // 新增组织
              await this.addOrganizationData();
            }
            this.dialogVisible = false;
            this.fetchOrganizationList(); // 刷新列表
          } catch (error) {
            console.error('提交表单失败:', error);
            this.$message.error('操作失败: ' + (error.message || '未知错误'));
          }
        } else {
          return false;
        }
      });
    },
    addOrganization() {
      const formData = {
        Num: '',
        Name: '',
        Fid: 0
      };
      this.openDialogWithoutModal('新增组织机构', formData);

    },
    updateOrganization(row) {
      const formData = {
        Id: row.Id,
        Num: row.Num,
        Name: row.Name,
        Fid: row.Fid
      };
      this.openDialogWithoutModal('编辑组织机构', formData);
    },
    // 新增组织数据提交到API
    async addOrganizationData() {
      try {
        const formData = new FormData();
        formData.append('Num', this.orgForm.Num);
        formData.append('Name', this.orgForm.Name);
        formData.append('Fid', this.orgForm.Fid);
        
        console.log('提交新增组织数据:', Object.fromEntries(formData));
        
        const response = await addOrganization(formData);
        
        if (response && response.success) {
          this.$message.success('添加组织架构成功');
          return true;
        } else {
          throw new Error(response.message || '添加组织架构失败');
        }
      } catch (error) {
        console.error('添加组织架构失败:', error);
        this.$message.error('添加组织架构失败: ' + (error.message || '未知错误'));
        throw error;
      }
    },
    // 更新组织数据提交到API
    async updateOrganizationData() {
      try {
        const formData = new FormData();
        formData.append('Id', this.orgForm.Id);
        formData.append('Num', this.orgForm.Num);
        formData.append('Name', this.orgForm.Name);
        formData.append('Fid', this.orgForm.Fid);
        
        console.log('提交更新组织数据:', Object.fromEntries(formData));
        
        const response = await updateOrganization(formData);
        
        if (response && response.success) {
          this.$message.success('更新组织架构成功');
          return true;
        } else {
          throw new Error(response.message || '更新组织架构失败');
        }
      } catch (error) {
        console.error('更新组织架构失败:', error);
        this.$message.error('更新组织架构失败: ' + (error.message || '未知错误'));
        throw error;
      }
    },
    async confirmDelete() {
      if (!this.currentRow) return;
      
      try {
        console.log('删除组织架构:', this.currentRow.Id);
        
        // 调用删除API
        const response = await deleteOrganization(this.currentRow.Id);
        
        if (response && response.success) {
          this.$message.success('删除组织架构成功');
          this.deleteDialogVisible = false;
          this.currentRow = null;
          this.fetchOrganizationList(); // 刷新列表
        } else {
          throw new Error(response.message || '删除组织架构失败');
        }
      } catch (error) {
        console.error('删除组织架构失败:', error);
        this.$message.error('删除组织架构失败: ' + (error.message || '未知错误'));
      }
    },
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
  background-color: #505962;
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
  background-color: #2e2e3a !important;
  border-color: #4e4e5a !important;
  color: #f0f0f0 !important;
}



.toolbar {
  display: flex;
  flex-direction: row;
  padding-left: 16px;
  background-color: #505962;
  border-radius: 4px 4px 0 0;
}

.action-btn {
  width: 80px !important;
  margin-right: 10px;
}

.search-btn {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}

/* 禁用按钮hover效果 */
.action-btn:hover,
.search-btn:hover,
.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}

.org-form-dialog {
  margin-top: 10vh !important;
  position: relative;
  z-index: 3001 !important;
  background-color: #383D44 !important;
}

::v-deep .org-form-dialog .el-dialog__header {
  background-color: #61646A;
  padding: 15px 20px;
  height: 45px;
}

::v-deep .org-form-dialog .el-dialog__title {
  color: #fff;
  font-size: 16px;
}

::v-deep .org-form-dialog .el-dialog__body {
  padding: 20px;
}

::v-deep .org-form-dialog .el-dialog__footer {
  padding: 10px 20px 20px;
}

.org-form .el-form-item__label {
  color: #fff !important;
}
::v-deep .org-form .el-form-item__label {
  width: 110px !important;
}
::v-deep .org-form .el-form-item__content {
  display: flex !important;
}
.submit-btn {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}
.dialog-footer{
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
.cancel-btn {
  margin-right: 10px;
  margin-top:10px;
  color: #000 !important;
}

.delete-confirm-content {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.warning-icon {
  font-size: 24px;
  color: #E6A23C;
  margin-right: 10px;
}

.delete-confirm-btn {
  background-color: #F56C6C !important;
  border-color: #F56C6C !important;
}

.edit-btn {
  color: #C1FFFF;
}

.delete-btn {
  color: #F56C6C;
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
</style>