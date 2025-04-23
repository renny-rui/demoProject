<template>
  <div class="user-info-container">
    <div class="page-header">
      <!-- <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">人员信息</h2>
      </div> -->
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchQuery.Num" placeholder="请输入人员编号" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchQuery.Name" placeholder="请输入人员姓名" size="medium" clearable></el-input>
        </el-form-item>

        <!-- <el-form-item>
          <div class="date-range-container">
            <el-date-picker v-model="searchQuery.startDate" type="date" placeholder="开始日期" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd" size="medium">
            </el-date-picker>
            <span class="date-separator" style="color:#fff">至</span>
            <el-date-picker v-model="searchQuery.endDate" type="date" placeholder="结束日期" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd" size="medium">
            </el-date-picker>
          </div>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
          <el-button @click="handleReset" size="medium" style="background-color: #a6b5bb;color:#333">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div  style="background-color:#505962 ;">
      <div class="toolbar">
        <el-button type="primary" class="action-btn" icon="el-icon-plus" @click="handleAdd" size="small">新增</el-button>

        <el-button type="danger" class="action-btn" icon="el-icon-delete" @click="handleDelete" size="small"
          style="background-color:#C1FFFF; color:#333; border-color:#C1FFFF">删除</el-button>
        
      </div>
      <div style="padding: 0 20px 0 20px;">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border
          v-loading="loading">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column prop="Num" label="人员编号" width="120" sortable align="center" />
          <el-table-column prop="Name" label="姓名" width="100" sortable align="center" />
          <el-table-column label="性别" width="80" sortable align="center">
            <template slot-scope="scope">
              {{ scope.row.Sex === 0 ? '男' : (scope.row.Sex === 1 ? '女' : '未知') }}
            </template>
          </el-table-column>
          <el-table-column prop="GroupId" label="组织架构ID" width="120" align="center" />
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              <span >
                {{ scope.row.Status === 0 ? '正常' : (scope.row.Status === 1 ? '删除' : '未知') }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180" sortable align="center">
            <template slot-scope="scope">
              {{ formatTimestamp(scope.row.CreateTime) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
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
        <div class="pagination-container">
          <el-pagination @current-change="handleCurrentChange"
            :current-page="CurrentPage" :page-size="PerPageCount"
            layout="prev, pager, next" :total="total"
            class="custom-pagination">
          </el-pagination>
        </div>

      </div>



    </div>

    <!-- 用户表单对话框 -->
    <el-dialog ref="dialog" :title="dialogTitle" :visible.sync="dialogVisible" width="500px" @close="resetForm"
      custom-class="user-form-dialog-top" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false" :modal="false">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="user-form">
        <el-form-item label="人员ID" prop="Id" v-if="dialogTitle === '编辑人员'">
          <el-input v-model="userForm.Id" placeholder="人员ID" size="medium" disabled></el-input>
        </el-form-item>
        <el-form-item label="人员编号" prop="Num">
          <el-input v-model="userForm.Num" placeholder="请输入人员编号" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="userForm.Name" placeholder="请输入姓名" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-radio-group v-model="userForm.Sex" size="medium" class="custom-radio-group">
            <el-radio :label="0" class="custom-radio">
              <span style="color: #fff;">男</span>
            </el-radio>
            <el-radio :label="1" class="custom-radio">
              <span style="color: #fff;">女</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="组织架构ID" prop="GroupId">
          <el-input v-model="userForm.GroupId" placeholder="请输入组织架构ID" size="medium" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"  class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cancel-btn">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="action-btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPeopleList, addPeople, updatePeople, deletePeople } from '@/api/user';

export default {
  name: 'UserInfoView',
  data() {
    return {
      searchQuery: {
        Num: '',
        Name: '',
        startDate: '',
        endDate: ''
      },
      CurrentPage: 1,
      PerPageCount: 10,
      total: 0,
      selectedRows: [],
      dialogVisible: false,
      dialogTitle: '新增人员',
      userForm: {
        Id: '',
        Num: '',
        Name: '',
        Sex: 0,
        GroupId: 1,
        Status: 0,
        CreateTime: ''
      },
      rules: {
        Num: [
          { required: true, message: '请输入人员编号', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        GroupId: [
          { required: true, message: '请输入组织架构ID', trigger: 'blur' }
        ]
      },
      tableData: [],
      loading: false
    }
  },
  created() {
    // 组件创建时加载人员列表数据
    this.fetchPeopleList();
    
    // 修复Element UI对话框z-index问题
    this.fixDialogZIndex();
  },
  methods: {
    handleBeforeClose(done) {
      // 先检查对话框引用是否存在
      if (this.$refs.dialog && this.$refs.dialog.$el) {
        // 获取对话框元素
        const dialogEl = this.$refs.dialog.$el.querySelector('.el-dialog');
        
        // 添加动画类
        if (dialogEl) {
          dialogEl.classList.add('dialog-closing');
          
          // 使用setTimeout来延迟关闭弹窗，确保动画执行完毕
          setTimeout(() => {
            done(); // 关闭弹窗
          }, 300); // 动画时间（300ms）
        } else {
          done();
        }
      } else {
        // 如果引用不存在，直接关闭
        done();
      }
    },
  
    // 格式化时间戳为 YY-MM-DD HH:MM:SS 格式
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      
      // 检查是否已经是格式化的日期字符串
      if (typeof timestamp === 'string' && timestamp.includes('-')) {
        return timestamp;
      }
      
      const date = new Date(Number(timestamp) * 1000);
      
      // 如果日期无效，尝试不乘以1000（可能已经是毫秒）
      if (isNaN(date.getTime())) {
        const directDate = new Date(Number(timestamp));
        if (!isNaN(directDate.getTime())) {
          return this.formatDate(directDate);
        }
        return timestamp; // 如果仍然无效，返回原始值
      }
      
      return this.formatDate(date);
    },
    
    // 辅助函数：将Date对象格式化为YY-MM-DD HH:MM:SS
    formatDate(date) {
      const year = date.getFullYear().toString().substr(2); // 获取年份后两位
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    
    // 获取人员列表数据
    fetchPeopleList() {
      this.loading = true;

      const params = {
        CurrentPage: this.CurrentPage,
        PerPageCount: this.PerPageCount,
        GroupId: 0,
        Status: 0
      };

      // 添加搜索条件
      if (this.searchQuery.Num) {
        params.Num = this.searchQuery.Num;
      }
      if (this.searchQuery.Name) {
        params.Name = this.searchQuery.Name;
      }

      getPeopleList(params)
        .then(response => {
          console.log('获取人员列表成功:', response);
          if (response && response.success === true && response.data) {
            // 处理每条记录的时间戳
            const processedData = (response.data || []).map(item => {
              // 创建一个新对象，避免修改原始数据
              return { ...item };
            });
            
            this.tableData = processedData;
            
            this.total = response.ToalCount
          } else {
            this.$message.error('获取人员列表失败: ' + (response.message || '未知错误'));
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(error => {
          console.error('获取人员列表失败:', error);
          this.$message.error('获取人员列表失败: ' + (error.message || '未知错误'));
          this.tableData = [];
          this.total = 0;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goBack() {
      this.$router.push('/battle-simulation')
    },
    handleSearch() {
      this.CurrentPage = 1; // 重置为第一页
      this.fetchPeopleList(); // 调用API获取数据
    },
    
    // 重置搜索表单
    handleReset() {
      this.searchQuery = {
        Num: '',
        Name: '',
        startDate: '',
        endDate: ''
      };
      this.CurrentPage = 1;
      this.fetchPeopleList();
    },
    
    handleAdd() {
      const formData = {
        Id: '',
        Num: '',
        Name: '',
        Sex: 0,
        GroupId: 1,
        Status: 0,
        CreateTime: ''
      };
      this.openDialogWithoutModal('新增人员', formData);
    },
    handleEdit(row) {
      if (row) {
        this.openDialogWithoutModal('编辑人员', JSON.parse(JSON.stringify(row)));
      } else if (this.selectedRows.length === 1) {
        this.openDialogWithoutModal('编辑人员', JSON.parse(JSON.stringify(this.selectedRows[0])));
      } else {
        this.$message.warning('请选择一条记录进行编辑');
      }
    },
    handleDelete(row) {
      if (!row && this.selectedRows.length === 0) {
        this.$message.warning('请先选择要删除的人员');
        return;
      }

      const id = row ? row.Id : this.selectedRows[0].Id;
      
      this.$confirm('确认删除该人员信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        deletePeople(id).then(response => {
          if (response) {
            this.$message.success('删除成功');
            // 刷新列表数据
            this.fetchPeopleList();
          } else {
            this.$message.error(response.data.message || '删除失败');
          }
        }).catch(error => {
          console.error('删除人员失败:', error);
          this.$message.error('删除失败: ' + (error.message || '未知错误'));
        }).finally(() => {
          this.loading = false;
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleImport() {
      console.log('Import users')
    },
    handleExport() {
      console.log('Export users')
    },
    handleSizeChange(val) {
      this.CurrentPage = val;
      this.fetchPeopleList();
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.fetchPeopleList();
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection
      console.log('Selection changed:', selection)
    },
    submitForm() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '新增人员') {
            // 调用新增人员接口
            this.loading = true;

            // 按照后端要求的格式准备数据
            const formData = new FormData();
            formData.append('Num', this.userForm.Num);
            formData.append('Name', this.userForm.Name);
            formData.append('Sex', Number(this.userForm.Sex));
            formData.append('GroupId', Number(this.userForm.GroupId));
            formData.append('Status', Number(this.userForm.Status));

            console.log('提交的表单数据:', {
              Num: formData.get('Num'),
              Name: formData.get('Name'),
              Sex: Number(formData.get('Sex')),
              GroupId: Number(formData.get('GroupId')),
              Status: Number(formData.get('Status'))
            });

            addPeople(formData)
              .then(response => {
                console.log('新增人员成功，完整响应:', response);
                console.log('响应数据:', response.data);

                // 更灵活的成功判断
                if (response && response.success === true) {
                  this.$message.success('新增成功');
                  this.dialogVisible = false;
                  // 重新获取列表数据
                  this.fetchPeopleList();
                } else {
                  console.error('新增失败详情:', response);
                  let errorMsg = '未知错误';
                  if (response.data) {
                    if (typeof response.data === 'string') {
                      errorMsg = response.data;
                    } else if (response.data.message) {
                      errorMsg = response.data.message;
                    } else if (response.data.error) {
                      errorMsg = response.data.error;
                    }
                  }
                  this.$message.error('新增失败: ' + errorMsg);
                }
              })
              .catch(error => {
                console.error('新增人员失败详情:', error);
                console.error('错误响应:', error.response);
                this.$message.error('新增失败: ' + (error.message || '未知错误'));
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            // 调用更新人员接口
            this.loading = true;

            // 按照后端要求的格式准备数据
            const formData = new FormData();
            formData.append('Id', Number(this.userForm.Id));
            formData.append('Num', this.userForm.Num);
            formData.append('Name', this.userForm.Name);
            formData.append('Sex', Number(this.userForm.Sex));
            formData.append('GroupId', Number(this.userForm.GroupId));
            formData.append('Status', Number(this.userForm.Status));
            
            console.log('编辑提交的表单数据:', {
              Id: Number(formData.get('Id')),
              Num: formData.get('Num'),
              Name: formData.get('Name'),
              Sex: Number(formData.get('Sex')),
              GroupId: Number(formData.get('GroupId')),
              Status: Number(formData.get('Status'))
            });

            updatePeople(formData)
              .then(response => {
                console.log('更新人员成功，完整响应:', response);
                console.log('响应数据:', response.data);

                // 更灵活的成功判断
                if (response) {
                  this.$message.success('更新成功');
                  this.dialogVisible = false;
                  // 重新获取列表数据
                  this.fetchPeopleList();
                } else {
                  console.error('更新失败详情:', response);
                  let errorMsg = '未知错误';
                  if (response.data) {
                    if (typeof response.data === 'string') {
                      errorMsg = response.data;
                    } else if (response.data.message) {
                      errorMsg = response.data.message;
                    } else if (response.data.error) {
                      errorMsg = response.data.error;
                    }
                  }
                  this.$message.error('更新失败: ' + errorMsg);
                }
              })
              .catch(error => {
                console.error('更新人员失败详情:', error);
                console.error('错误响应:', error.response);
                this.$message.error('更新失败: ' + (error.message || '未知错误'));
              })
              .finally(() => {
                this.loading = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.userForm && this.$refs.userForm.resetFields()
    },
    // 修复Element UI对话框z-index问题
    fixDialogZIndex() {
      // 创建一个样式元素
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `
        .el-dialog__wrapper {
          z-index: 3000 !important;
        }
        .v-modal {
          display: none !important; /* 完全隐藏遮罩层 */
          opacity: 0 !important;
          z-index: -1 !important;
        }
        .el-dialog {
          z-index: 3001 !important;
        }
        .user-form-dialog-top {
          z-index: 3002 !important;
        }
      `;
      // 将样式添加到文档头部
      document.head.appendChild(style);
    },
    // 新增方法：处理对话框打开并移除遮罩层
    openDialogWithoutModal(title, formData) {
      this.dialogTitle = title;
      this.userForm = formData;
      this.dialogVisible = true;
      
      // 使用setTimeout确保在对话框完全渲染后移除遮罩层
      setTimeout(() => {
        const modals = document.querySelectorAll('.v-modal');
        modals.forEach(modal => {
          modal.parentNode.removeChild(modal);
        });
      }, 50);
    },
  }
}
</script>

<style>
/* 表格样式覆盖 */

/* 基本输入框样式 */
.el-input__inner {
  background-color: #fff !important;
  border: 1px solid #dcdfe6 !important;
  color: #606266 !important;
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

/* 确保禁用状态的输入框也有正确的背景色 */
.el-input.is-disabled .el-input__inner {
  background-color: #2e2e3a !important;
  border-color: #4e4e5a !important;
  color: #aaa !important;
}

/* 确保所有输入框都有白色背景 */
.el-input .el-input__inner,
.el-date-editor .el-input__inner {
  background-color: #2e2e3a !important;
  border-color: #4e4e5a !important;
}

/* placeholder样式 - 使用所有浏览器兼容的方式 */
.el-input__inner::placeholder {
  color:  #aaa !important;
  opacity: 1 !important;
}



/* 为Chrome/Safari/Opera浏览器设置 */
.el-input__inner::-webkit-input-placeholder {
  color: #909399 !important;
  opacity: 1 !important;
}



/* 对话框样式 */
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 auto !important;
  position: relative;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 3000 !important;
  position: relative;
  z-index: 20001 !important;
}

.el-dialog__wrapper {
  z-index: 20000 !important;
}

.v-modal {
  z-index: 19999 !important;
}

/* 自定义新增人员弹窗样式 */
.user-form-dialog-top {
  z-index: 20001 !important;
}

.user-form-dialog-top .el-dialog {
  background-color: #7B8B9B !important;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 20002 !important;
  margin-top: 15vh !important;
}

.user-form-dialog-top .el-dialog__header {
  background-color: #BBBEC1;
  padding: 10px 20px;
}

.user-form-dialog-top .el-dialog__body {
  background-color: #7B8B9B;
  padding: 20px;
}

.user-form-dialog-top .el-dialog__title {
  color: #000;
}

.user-form-dialog-top .dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #7B8B9B;
}

/* 确保弹窗标题栏样式一致 */
.user-form-dialog-top .el-dialog__title {
  color: #000;
}

/* 确保按钮样式一致 */
.user-form-dialog-top .action-btn {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}

.user-info-container {
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
  color: #C1FFFF;
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

.date-range-container {
  display: flex;
  align-items: center;
}

.date-separator {
  margin: 0 5px;
}

.toolbar {
  padding: 8px 0px 0px 20px;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}

.action-btn {
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}
.cancel-btn {
  margin-right: 10px;
  margin-bottom: 10px;
  color: #333 !important;
}

.search-btn {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}



.edit-btn {
  color: #C1FFFF;
  cursor: pointer;
}

.edit-btn:hover {
  color: #C1FFFF !important;
}

.delete-btn {
  color: rgba(236, 23, 23, 0.829);
  margin-left: 10px;
}

.delete-btn:hover,
.delete-btn:active,
.delete-btn:focus {
  color: rgba(236, 23, 23, 0.829) !important;
}



.pagination-container {
  background-color: #505962;
  padding: 10px 20px;
  border-radius: 8px;
  margin-top: 15px;
  color: #fff;
  display: flex;
  justify-content: flex-end;
}

/* 统一分页组件内部元素的高度与样式 */
::v-deep .custom-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  font-size: 14px;
  height: 40px;
}







.el-table .cell {
 
  white-space: nowrap !important;
}



.el-table .el-table__header-wrapper th {
  background-color: #6C767F;
  color: #FFFFFF;
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

/* Direct Element UI overrides */
.el-radio__input.is-checked .el-radio__inner {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
}

.el-radio__inner::after {
  background-color: #fff !important;
}

/* Radio button styles */
.custom-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #c1ffff !important;
  background: #c1ffff !important;
}

.custom-radio .el-radio__input.is-checked + .el-radio__label {
  color: #c1ffff !important;
}

.custom-radio .el-radio__inner:hover {
  border-color: #c1ffff !important;
}

.custom-radio .el-radio__inner {
  border-color: #c1ffff !important;
}

/* Override Element UI's default focus styles */
.custom-radio .el-radio__input.is-checked .el-radio__inner::after {
  background-color: #333 !important;
  transform: translate(-50%, -50%) scale(1) !important;
}

/* Force the styles with higher specificity */
.user-form-dialog-top .custom-radio-group .custom-radio .el-radio__input.is-checked .el-radio__inner {
  border-color: #c1ffff !important;
  background: #c1ffff !important;
}

.user-form-dialog-top .custom-radio-group .custom-radio .el-radio__input.is-checked + .el-radio__label {
  color: #c1ffff !important;
}

/* Global styles to override Element UI pagination */
.el-pagination .btn-prev,
.el-pagination .btn-next,
.el-pagination .el-pager li {
  background-color: #626C77 !important;
  color: #fff !important;
  border: 1px solid #626C77  !important;
}
.el-pagination .btn-prev {
  border-radius: 8px 0 0 8px !important;
}
.el-pagination .btn-next{
  border-radius:  0 8px 8px 0 !important;
}

.el-pagination .el-pager li.active {
  background-color: #606266 !important;
  color: #333 !important;
  font-weight: bold !important;
}

/* 确保对话框显示在遮罩层上方 */
.user-form-dialog-top {
  z-index: 20001 !important;
}

.user-form-dialog-top .el-dialog {
  margin-top: 15vh !important;
  background-color: #7B8B9B !important;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5);
}

.user-form-dialog-top .el-dialog__header {
  background-color: #BBBEC1;
  padding: 10px 20px;
}

.user-form-dialog-top .el-dialog__body {
  background-color: #7B8B9B;
  padding: 20px;
}

.user-form-dialog-top .el-dialog__title {
  color: #000;
}

.user-form-dialog-top .dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: #7B8B9B;
}

/* 修复遮罩层问题 */
.el-dialog__wrapper {
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20000 !important;
}

.v-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 19999 !important;
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

<style scoped>
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

<style>
/* 全局对话框样式覆盖 */
body .el-dialog__wrapper {
  z-index: 20000 !important;
}

body .v-modal {
  z-index: 19999 !important;
}

body .el-dialog {
 
  background-color: #7B8B9B !important;
  position: relative;
  z-index: 20001 !important;
}

body .el-dialog__header {
  background-color: #BBBEC1;
  padding: 10px 20px;
}

body .el-dialog__body {
  background-color: #7B8B9B;
  padding: 20px;
}

body .el-dialog__title {
  color: #000;
}
</style>
