
<template>
  <div class="device-category-management">
  
    
    <!-- 搜索和操作区域 -->
    <div class="operation-box">
      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchQuery.Num" placeholder="请输入分类编号" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchQuery.Name" placeholder="请输入分类名称" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <!-- 数据表格 -->
    <div class="content-box">
      <div style="margin-bottom: 10px; ">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd" size="small" class="add-btn">添加设备分类</el-button>
      </div>
      <el-table
        :data="categoryList"
        border
        stripe
        v-loading="loading"
        style="width: 100%">
        <el-table-column prop="Id" label="分类ID" width="80"></el-table-column>
        <el-table-column prop="Num" label="分类编号" width="120"></el-table-column>
        <el-table-column prop="Name" label="分类名称" width="180"></el-table-column>
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
      
      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination class="custom-pagination"
      @current-change="handleCurrentChange"
      :current-page="CurrentPage"
      :page-size="PerPageCount"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>

      </div>
    </div>
    
    <!-- 添加/编辑设备分类对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px"  custom-class="user-form-dialog" :lock-scroll="false"
    :modal="false" append-to-body 
    :modal-append-to-body="false">
      <el-form :model="categoryForm" :rules="rules" ref="categoryForm" label-width="100px">
        <el-form-item label="分类编号" prop="Num">
          <el-input v-model="categoryForm.Num" placeholder="请输入分类编号"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="Name">
          <el-input v-model="categoryForm.Name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <div  class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="submit-button">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDeviceGroupList, addCategory, updateCategory, deleteCategory } from '@/api/device';

export default {
  name: "DeviceCategoryManagement",
  data() {
    return {
      // 搜索
      searchQuery: {
        Num: '',
        Name: ''
      },
      
      // 分页
      CurrentPage: 1,
      PerPageCount: 10,
      total: 0,
      
      // 表格数据
      loading: false,
      categoryList: [],
      
      // 对话框
      dialogVisible: false,
      dialogTitle: "添加设备分类",
      
      // 表单
      categoryForm: {
        Id: "",
        Num: "",
        Name: ""
      },
      
      // 表单验证规则
      rules: {
       Num: [
          { required: true, message: "请输入分类编号", trigger: "blur" }
        ],
        Name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取设备分类数据
    fetchData() {
      this.loading = true;
      
      const params = {
        CurrentPage: this.CurrentPage,
        PerPageCount: this.PerPageCount
      };
      
      // 添加搜索条件
      if (this.searchQuery.Num) {
        params.Num = this.searchQuery.Num;
      }
      if (this.searchQuery.Name) {
        params.Name = this.searchQuery.Name;
      }
      
      console.log('搜索参数:', params);
      
      getDeviceGroupList(params)
        .then(response => {
          console.log('获取设备分类列表成功:', response);
          if (response) {
            this.categoryList = response.data || [];
            this.total = response.ToalCount;
          } else {
            this.$message.error('获取设备分类列表失败: ' + (response.message || '未知错误'));
            this.categoryList = [];
            this.total = 0;
          }
        })
        .catch(error => {
          console.error('获取设备分类列表失败:', error);
          this.$message.error('获取设备分类列表失败: ' + (error.message || '未知错误'));
          this.categoryList = [];
          this.total = 0;
        })
        .finally(() => {
          this.loading = false;
        });
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
    
    // 处理页码变化
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.fetchData();
    },
    
    // 处理每页显示条数变化
    handleSizeChange(val) {
      this.PerPageCount = val;
      this.CurrentPage = 1;
      this.fetchData();
    },
    
    // 处理搜索
    handleSearch() {
      this.CurrentPage = 1; // 重置为第一页
      this.fetchData(); // 调用API获取数据
      console.log(this.searchQuery);
    },
    
    // 添加设备分类
    handleAdd() {
      this.dialogTitle = "添加设备分类";
      this.categoryForm = {
        Id: "",
        Num: "",
        Name: ""
      };
      this.dialogVisible = true;
    },
    
    // 编辑设备分类
    handleEdit(row) {
      this.dialogTitle = "编辑设备分类";
      // 复制行数据，确保包含id字段
      this.categoryForm = {
        Id: row.Id,
        Num: row.Num,
        Name: row.Name
      };
      this.dialogVisible = true;
    },
    
    // 删除设备分类
    handleDelete(row) {
      this.$confirm('确认删除该设备分类吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        
        // 调用删除API
        deleteCategory(row.Id)
          .then(response => {
            console.log('删除设备分类成功:', response);
            if (response) {
              this.$message.success('删除成功');
              this.fetchData(); // 重新获取列表
            } else {
              this.$message.error('删除失败: ' + (response.message || '未知错误'));
            }
          })
          .catch(error => {
            console.error('删除设备分类失败:', error);
            this.$message.error('删除失败: ' + (error.message || '未知错误'));
          })
          .finally(() => {
            this.loading = false;
          });
      }).catch(() => {
        // 取消删除操作
      });
    },
    
    // 提交表单
    submitForm() {
      this.$refs.categoryForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          
          // 按照后端要求的格式准备数据
          const formData = new FormData();
          
          // 如果是编辑模式，添加id参数
          if (this.dialogTitle !== "添加设备分类" && this.categoryForm.Id) {
            formData.append('Id', this.categoryForm.Id);
          }
          
          formData.append('Num', this.categoryForm.Num);
          formData.append('Name', this.categoryForm.Name);
          
          console.log('提交的表单数据:', {
            Id: this.dialogTitle !== "添加设备分类" ? this.categoryForm.Id : undefined,
            Num: this.categoryForm.Num,
            Name: this.categoryForm.Name
          });
          
          // 根据操作类型选择不同的API
          const apiMethod = this.dialogTitle === "添加设备分类" ? addCategory : updateCategory;
          
          // 调用API
          apiMethod(formData)
            .then(response => {
              console.log(this.dialogTitle + '成功:', response);
              if (response) {
                this.$message.success(this.dialogTitle === "添加设备分类" ? "添加成功" : "更新成功");
                this.dialogVisible = false;
                this.fetchData(); // 重新获取列表
              } else {
                this.$message.error((this.dialogTitle === "添加设备分类" ? "添加失败" : "更新失败") + ': ' + (response.message || '未知错误'));
              }
            })
            .catch(error => {
              console.error(this.dialogTitle + '失败:', error);
              this.$message.error((this.dialogTitle === "添加设备分类" ? "添加失败" : "更新失败") + ': ' + (error.message || '未知错误'));
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.device-category-management {
  padding: 20px;
}

.operation-box {
  margin-bottom: 20px;
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.content-box {
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.search-btn {
  margin-left: 10px;
}

.add-btn {
  margin-bottom: 15px;
  background-color: #c1ffff !important;
  border-color:#c1ffff !important;
  color:#000 !important
}
.dialog-footer{
  display: flex;
    justify-content: center;
}
/* 取消按钮样式，确保悬停时不变成蓝色 */
.dialog-footer .el-button:not(.submit-button):not(.el-button--primary) {
  background-color: #fff !important;
  border-color: #fff !important;
  color: #333 !important;
}

.dialog-footer .el-button:not(.submit-button):not(.el-button--primary):hover,
.dialog-footer .el-button:not(.submit-button):not(.el-button--primary):focus {
  background-color: #fff !important;
  border-color: #fff !important;
  color: #333 !important;
}
.edit-btn, .delete-btn {
  margin-right: 10px;
}

.submit-button{
  background-color: #c1ffff !important;
  border-color:#c1ffff !important;
  color:#000 !important
}
.user-form-dialog {
  margin-top: 10vh !important;
  position: relative;
  z-index: 3001 !important; /* 确保比用户信息弹窗的z-index高 */
}

/* 自定义遮罩层样式，使其只覆盖用户信息弹窗 */
.user-form-dialog .el-dialog__wrapper {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.user-form-dialog .el-dialog__mask {
  position: absolute !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  z-index: 2000 !important;
}

.el-table .cell {
  white-space: nowrap !important;
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
::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #7B8B9B !important;
}

::v-deep .el-table__body tr:hover>td {
  background-color: #7B8B9B !important;
}

::v-deep .el-table .el-table__header th {
  background-color: #6C767F !important;
  color: #f0f0f0 !important;
}
/* 自定义新增人员弹窗样式 */
.user-form-dialog {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  margin: 0 !important;
  z-index: 3001 !important; /* 确保比用户信息弹窗的z-index高 */
}

/* 自定义遮罩层样式 */
.user-form-dialog .el-dialog__wrapper {
  position: absolute !important;
}

.user-form-dialog .el-dialog__mask {
  position: absolute !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

/* 确保弹窗内容正确显示 */
.user-form-dialog .el-dialog {
  margin: 0 !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

/* 确保弹窗标题栏样式一致 */
.user-form-dialog .el-dialog__header {
  background-color: #304156;
  padding: 10px 20px;
}

.user-form-dialog .el-dialog__title {
  color: #fff;
}

/* 确保按钮样式一致 */
.user-form-dialog .action-btn {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
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
</style>