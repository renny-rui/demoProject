<template>
  <div class="equipment-management">

    <!-- 搜索和操作区域 -->
    <div class="operation-box">

      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchQuery.Num" placeholder="请输入设备编号" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchQuery.Name" placeholder="请输入设备名称" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <!-- 数据表格 -->
    <div class="content-box">
      <div style="margin-bottom: 10px; ">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd" size="small" class="add-btn">添加设备</el-button>

      </div>
      <el-table :data="equipmentList" border stripe v-loading="loading" style="width: 100%">
        <el-table-column prop="Num" label="设备编号" width="100"></el-table-column>
        <el-table-column prop="Name" label="设备名称" width="120"></el-table-column>
        <el-table-column prop="Ip" label="IP地址"></el-table-column>
        <el-table-column prop="Mac" label="MAC地址"></el-table-column>
        <el-table-column prop="GroupId" label="分组ID" width="80"></el-table-column>
        <el-table-column prop="TaskType" label="用于训练的课程" width="120"></el-table-column>
        <el-table-column prop="TaskTypeRole" label=" 课程下的角色" width="120"></el-table-column>
        <el-table-column label="创建时间" width="180" sortable align="center">
          <template slot-scope="scope">
            {{ formatTimestamp(scope.row.CreateTime) }}
          </template>
        </el-table-column>
        
        <el-table-column label="操作" width="200" align="center">
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
        <el-pagination class="custom-pagination" :current-change="handleCurrentChange" :current-page="CurrentPage"
          :page-size="PerPageCount" layout="prev, pager, next" :total="total">
        </el-pagination>

      </div>
    </div>

    <!-- 添加/编辑设备对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="50%" custom-class="user-form-dialog"
      :lock-scroll="false" :modal="false" append-to-body :modal-append-to-body="false">
      <el-form :model="equipmentForm" :rules="rules" ref="equipmentForm" label-width="100px">
        <el-form-item label="设备编号" prop="Num">
          <el-input v-model="equipmentForm.Num" placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="Name">
          <el-input v-model="equipmentForm.Name" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" prop="Type">
          <el-select v-model="equipmentForm.Type" placeholder="请选择设备类型" style="width: 100%;">
            <el-option v-for="item in deviceGroupList" :key="item.Id" :label="item.Name" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备IP" prop="Ip">
          <el-input v-model="equipmentForm.Ip" placeholder="请输入设备名IP"></el-input>
        </el-form-item>
        <el-form-item label="用于训练的课程" prop="TaskType">
          <el-input v-model="equipmentForm.TaskType" placeholder="请输入用于训练的课程"></el-input>
        </el-form-item>
        <el-form-item label="课程下的角色" prop="TaskTypeRole">
          <el-input v-model="equipmentForm.TaskTypeRole" placeholder="请输入课程下的角色"></el-input>
        </el-form-item>
        <el-form-item label="设备MAC地址" prop="Mac">
          <el-input v-model="equipmentForm.Mac" placeholder="请输入设备MAC地址"></el-input>
        </el-form-item>
        <el-form-item label="设备分类ID" prop="GroupId">
          <el-input v-model="equipmentForm.GroupId" placeholder="请输入设备设备分类ID"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="submit-button">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 设备分类对话框 -->
    <el-dialog title="添加设备分类" :visible.sync="categoryDialogVisible" width="500px">
      <el-form :model="categoryForm" :rules="categoryRules" ref="categoryForm" label-width="100px">
        <el-form-item label="分类编号" prop="Num">
          <el-input v-model="categoryForm.Num" placeholder="请输入分类编号"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="Name">
          <el-input v-model="categoryForm.Name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="categoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitCategoryForm" class="submit-button">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getDeviceList, addDevice, updateDevice, deleteDevice, addCategory, getDeviceGroupList } from '@/api/device';

export default {
  name: "EquipmentManagement",
  data() {
    return {
      // 搜索和筛选
      searchQuery: {
        Num: '',
        Name: ''
      },
      filteredEquipmentList: [],
      statusFilter: "",

      // 分页
      CurrentPage: 1,
      PerPageCount: 10,
      total: 0,

      // 表格数据
      loading: false,
      equipmentList: [],

      // 对话框
      dialogVisible: false,
      dialogTitle: "添加设备",
      categoryDialogVisible: false,
      detailDialogVisible: false,
      currentEquipment: {},

      // 表单
      equipmentForm: {
        Num: "",
        Name: "",
        Ip: "",
        Type: null,
        Mac: "",
        GroupId: null,
        TaskType:"",
        TaskTypeRole:""
      },
      categoryForm: {
        Num: "",
        Name: ""
      },

      // 设备分类列表
      deviceGroupList: [],

      // 表单验证规则
      rules: {
        Num: [
          { required: true, message: "请输入分类编号", trigger: "blur" },
        ],
        Name: [
          { required: true, message: "请输入设备名称", trigger: "blur" },
        ],
        Type: [
          { required: true, message: "请选择设备类型", trigger: "change" }
        ],
        TaskType:[
        { required: true, message: "请输入用于训练的课程", trigger: "blur" }
        ],
        TaskTypeRole:[
          {
            required: true, message: "请输入课程下的角色", trigger: "blur"
          }
        ],
        Ip: [
          { required: true, message: "请输入设备IP地址", trigger: "blur" }
        ],
        Mac: [
          { required: true, message: "请输入设备MAC地址", trigger: "blur" }
        ],
        GroupId: [
          { required: true, message: "请选择设备分类ID", trigger: "change" }
        ]
      },
      categoryRules: {
        Num: [
          { required: true, message: "请输入分类编号", trigger: "blur" },
        ],
        Name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ]
      }
    };
  },
  computed: {
  },
  created() {
    this.fetchData();
    this.fetchDeviceGroupList(); // 获取设备分类列表
  },
  methods: {
    // 获取设备数据
    fetchData() {
      this.loading = true;

      const params = {
        PerPageCount: this.PerPageCount,
        CurrentPage: this.CurrentPage
      };

      // 添加搜索条件
      if (this.searchQuery.Num) {
        params.Num = this.searchQuery.Num;
      }
      if (this.searchQuery.Name) {
        params.Name = this.searchQuery.Name;
      }

      console.log('搜索参数:', params);

      getDeviceList(params)
        .then(response => {
          console.log('获取设备列表成功:', response);
          if (response && response.data) {
            this.equipmentList = response.data || [];
            this.total = response.ToalCount || 0;
          } else {
            this.$message.error('获取设备列表失败: ' + (response.message || '未知错误'));
            this.equipmentList = [];
            this.total = 0;
          }
        })
        .catch(error => {
          console.error('获取设备列表失败:', error);
          this.$message.error('获取设备列表失败: ' + (error.message || '未知错误'));
          this.equipmentList = [];
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
      console.log('当前第几页：', val)
      this.CurrentPage = val;
      this.fetchData();
    },

    // 处理每页显示条数变化
    handleSizeChange(val) {
      console.log('每页条数：', val)
      this.PerPageCount = val; // 正确设置每页条数
      this.CurrentPage = 1; // 重置到第一页
      this.fetchData();
    },

    // 处理搜索
    handleSearch() {
      this.CurrentPage = 1; // 重置为第一页
      this.fetchData(); // 调用API获取数据
      console.log(this.searchQuery);
    },

    // 添加设备
    handleAdd() {
      this.dialogTitle = "添加设备";
      this.equipmentForm = {
        Num: "",
        Name: "",
        Ip: "",
        Type: null,
        Mac: "",
        GroupId: null,
        TaskType:"",
        TaskTypeRole:""
      };
      this.dialogVisible = true;
    },

    // 编辑设备
    handleEdit(row) {
      this.dialogTitle = "编辑设备";
      // 复制行数据，确保包含id字段
      this.equipmentForm = {
        Id: row.Id, // 确保id字段被包含
        Num: row.Num,
        Name: row.Name,
        Ip: row.Ip,
        Mac: row.Mac,
        Type: row.Type,
        GroupId: row.GroupId,
        TaskType:row.TaskType,
        TaskTypeRole:row.TaskTypeRole
      };
      this.dialogVisible = true;
    },

    // 删除设备
    handleDelete(row) {
      this.$confirm('确认删除该设备吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        console.log('删除设备：',row.Id)
        deleteDevice(row.Id)
          .then(response => {
            console.log('删除设备成功:', response);
            if (response) {
              this.$message.success('删除成功');
              this.fetchData(); // 重新获取列表
            } else {
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
              this.$message.error('删除失败: ' + errorMsg);
            }
          })
          .catch(error => {
            console.error('删除设备失败:', error);
            this.$message.error('删除失败: ' + (error.message || '未知错误'));
          })
          .finally(() => {
            this.loading = false;
          });
      }).catch(() => {
        // 取消删除操作
      });
    },

    // 查看设备详情
    handleDetail(row) {
      this.currentEquipment = { ...row };
      this.detailDialogVisible = true;
    },

    // 提交表单
    submitForm() {
      this.$refs.equipmentForm.validate((valid) => {
        if (valid) {
          this.loading = true;

          // 按照后端要求的格式准备数据
          const formData = new FormData();

          // 如果是编辑模式，添加id参数
          if (this.dialogTitle !== "添加设备" && this.equipmentForm.Id) {
            formData.append('Id', Number(this.equipmentForm.Id));
          }

          // 确保所有必填字段都有值
          formData.append('Num', this.equipmentForm.Num || '');
          formData.append('Name', this.equipmentForm.Name || '');
          formData.append('Ip', this.equipmentForm.Ip || '');
          formData.append('Mac', this.equipmentForm.Mac || '');
          formData.append('TaskType', this.equipmentForm.TaskType || '');
          formData.append('TaskTypeRole', this.equipmentForm.TaskTypeRole || '');
          // 确保数值类型字段为数字，并且不为null或undefined
          const type = this.equipmentForm.Type !== null && this.equipmentForm.Type !== undefined ? 
                      Number(this.equipmentForm.Type) : 0;
          const groupId = this.equipmentForm.GroupId !== null && this.equipmentForm.GroupId !== undefined ? 
                      Number(this.equipmentForm.GroupId) : 0;
                      
          formData.append('Type', type);
          formData.append('GroupId', groupId);
          
          // 添加Status字段，可能后端需要这个字段
          formData.append('Status', 0);

          console.log('提交的表单数据:', {
            Id: this.dialogTitle !== "添加设备" ? Number(this.equipmentForm.Id) : undefined,
            Num: this.equipmentForm.Num,
            Name: this.equipmentForm.Name,
            Ip: this.equipmentForm.Ip,
            Mac: this.equipmentForm.Mac,
            TaskType:this.equipmentForm.TaskType,
            TaskTypeRole:this.equipmentForm.TaskTypeRole,
            Type: type,
            GroupId: groupId,
            Status: 0
          });

          // 根据操作类型调用不同的API
          const apiMethod = this.dialogTitle === "添加设备" ? addDevice : updateDevice;
          const successMsg = this.dialogTitle === "添加设备" ? "添加成功" : "更新成功";
          const errorMsg = this.dialogTitle === "添加设备" ? "添加失败" : "更新失败";

          apiMethod(formData)
            .then(response => {
              console.log(this.dialogTitle + '成功:', response);
              if (response) {
                this.$message.success(successMsg);
                this.dialogVisible = false;
                this.fetchData(); // 重新获取列表
              } else {
                let errMsg = '未知错误';
                if (response.data) {
                  if (typeof response.data === 'string') {
                    errMsg = response.data;
                  } else if (response.data.message) {
                    errMsg = response.data.message;
                  } else if (response.data.error) {
                    errMsg = response.data.error;
                  }
                }
                this.$message.error(errorMsg + ': ' + errMsg);
              }
            })
            .catch(error => {
              console.error(this.dialogTitle + '失败:', error);
              this.$message.error(errorMsg + ': ' + (error.message || '未知错误'));
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },

    // 提交分类表单
    submitCategoryForm() {
      this.$refs.categoryForm.validate((valid) => {
        if (valid) {
          this.loading = true;

          // 创建FormData对象
          const formData = new FormData();
          for (const key in this.categoryForm) {
            formData.append(key, this.categoryForm[key]);
          }

          addCategory(formData)
            .then(response => {
              console.log('添加分类成功:', response);
              if (response) {
                this.$message.success('添加成功');
                this.categoryDialogVisible = false;
              } else {
                let errMsg = '未知错误';
                if (response.data) {
                  if (typeof response.data === 'string') {
                    errMsg = response.data;
                  } else if (response.data.message) {
                    errMsg = response.data.message;
                  } else if (response.data.error) {
                    errMsg = response.data.error;
                  }
                }
                this.$message.error('添加失败: ' + errMsg);
              }
            })
            .catch(error => {
              console.error('添加分类失败:', error);
              this.$message.error('添加失败: ' + (error.message || '未知错误'));
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },

    // 添加设备分类
    handleAddCategory() {
      this.categoryForm = {
        Num: "",
        Name: ""
      };
      this.categoryDialogVisible = true;
    },

    // 获取设备分类列表
    fetchDeviceGroupList() {
      getDeviceGroupList()
        .then(response => {
          console.log('获取设备分类列表成功:', response);
          if (response && response.data) {
            this.deviceGroupList = response.data || [];
          } else {
            this.$message.error('获取设备分类列表失败: ' + (response.message || '未知错误'));
            this.deviceGroupList = [];
          }
        })
        .catch(error => {
          console.error('获取设备分类列表失败:', error);
          this.$message.error('获取设备分类列表失败: ' + (error.message || '未知错误'));
          this.deviceGroupList = [];
        });
    },

    // 获取状态类型（用于标签颜色）
    getStatusType(status) {
      const map = {
        0: "success", // 正常
        1: "info"     // 离线
      };
      return map[status] || "info";
    },

    // 获取状态文本
    getStatusText(status) {
      const map = {
        0: "正常",
        1: "离线"
      };
      return map[status] || "未知";
    },

    // 获取设备类型文本
    getTypeText(type) {
      const map = {
        computer: "电脑设备",
        network: "网络设备",
        training: "训练设备",
        simulator: "模拟器",
        other: "其他设备"
      };
      return map[type] || "未知";
    }
  }
};
</script>

<style scoped>
.equipment-management {
  padding: 20px;
}

.operation-box {
  background-color: #505962;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.content-box {
  background-color: #505962;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.add-btn {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
  color: #333 !important
}

.edit-btn,
.delete-btn,
.detail-btn {
  margin-right: 10px;
}

.submit-button {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
  color: #333 !important
}


.user-form-dialog {
  margin-top: 10vh !important;
  position: relative;
  z-index: 3001 !important;
  /* 确保比用户信息弹窗的z-index高 */
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
  z-index: 3001 !important;
  /* 确保比用户信息弹窗的z-index高 */
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

/* 设备类型下拉框样式 */
/* ::v-deep .el-input__inner,
::v-deep .el-select .el-input__inner {
  background-color: #2e2e3a !important;
  border-color: #4e4e5a !important;
  color: #fff !important;
}


::v-deep .el-select-dropdown__item {
  color: #fff !important;
}

::v-deep .el-select-dropdown__item.hover,
::v-deep .el-select-dropdown__item:hover {
  background-color: #4e4e5a !important;
}

::v-deep .el-select-dropdown {
  background-color: #2e2e3a !important;
  border-color: #4e4e5a !important;
}


::v-deep .el-select-dropdown__item.selected {
  color: #c1ffff !important;
  font-weight: bold;
  background-color: #3e3e4a !important;
} */
.dialog-footer {
  display: flex !important;
  justify-content: center !important;
  width: 100%;
  margin-top: 20px;
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
</style>
