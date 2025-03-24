<template>
  <div class="user-info-container">
    <div class="page-header">
      <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">人员信息</h2>
      </div>
      <!-- 任务分配按钮会由MainLayout组件添加到右上角 -->
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchQuery.id" placeholder="请输入人员编号" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchQuery.name" placeholder="请输入人员姓名" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchQuery.position" placeholder="请选择身份" size="medium" clearable>
            <el-option label="在职" value="在职"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchQuery.status" placeholder="请选择人员状态" size="medium" clearable>
            <el-option label="正常" value="正常"></el-option>
            <el-option label="禁用" value="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="date-range-container">
            <el-date-picker
              v-model="searchQuery.startDate"
              type="date"
              placeholder="开始日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="medium">
            </el-date-picker>
            <span class="date-separator">至</span>
            <el-date-picker
              v-model="searchQuery.endDate"
              type="date"
              placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="medium">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="background-color: #fff;">
      <div class="toolbar">
      <el-button type="primary" class="action-btn" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <el-button type="primary" class="action-btn" icon="el-icon-edit" @click="handleEdit">编辑</el-button>
      <el-button type="primary" class="action-btn" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      <el-button type="primary" class="action-btn" icon="el-icon-upload2" @click="handleImport">导入</el-button>
      <el-button type="primary" class="action-btn" icon="el-icon-download" @click="handleExport">导出</el-button>
    </div>
    <div style="padding: 0 20px 0 20px">
      <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="id" label="人员编号" width="120" sortable align="center" />
      <el-table-column prop="name" label="姓名" width="120" sortable align="center" />
      <el-table-column prop="gender" label="性别" width="80" sortable align="center" />
      <el-table-column prop="department" label="部门" width="150" align="center" />
      <el-table-column prop="status" label="状态" width="100" align="center" />
      <el-table-column prop="contactMethod" label="联系方式" width="150" align="center" />
      <el-table-column prop="createTime" label="创建时间" width="220" sortable align="center" />
      <el-table-column label="操作"  align="center">
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
    </div>
    

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </div>
    </div>

    <!-- 用户表单对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" @close="resetForm">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="user-form">
        <el-form-item label="人员编号" prop="id">
          <el-input v-model="userForm.id" placeholder="请输入人员编号" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" placeholder="请输入姓名" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="userForm.gender" size="medium">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="userForm.department" placeholder="请选择部门" size="medium" clearable>
            <el-option label="技术部" value="技术部"></el-option>
            <el-option label="人事部" value="人事部"></el-option>
            <el-option label="财务部" value="财务部"></el-option>
            <el-option label="市场部" value="市场部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="userForm.status" placeholder="请选择状态" size="medium" clearable>
            <el-option label="在职" value="在职"></el-option>
            <el-option label="离职" value="离职"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="contactMethod">
          <el-input v-model="userForm.contactMethod" placeholder="请输入联系方式" size="medium" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm" class="action-btn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserInfoView',
  data() {
    return {
      searchQuery: {
        id: '',
        name: '',
        position: '',
        status: '',
        startDate: '2025-02-24',
        endDate: '2025-02-26'
      },
      currentPage: 1,
      pageSize: 10,
      total: 100,
      selectedRows: [],
      dialogVisible: false,
      dialogTitle: '新增人员',
      userForm: {
        id: '',
        name: '',
        gender: '男',
        department: '',
        status: '在职',
        contactMethod: '',
        createTime: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入人员编号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        contactMethod: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          id: '001',
          name: '张三',
          gender: '男',
          department: '部门',
          status: '在职',
          contactMethod: '18145674589',
          createTime: '2025-03-03'
        },
        {
          id: '002',
          name: '李四',
          gender: '男',
          department: '技术部',
          status: '在职',
          contactMethod: '13812345678',
          createTime: '2025-03-04'
        },
        {
          id: '003',
          name: '王五',
          gender: '女',
          department: '人事部',
          status: '在职',
          contactMethod: '15987654321',
          createTime: '2025-03-05'
        },
        {
          id: '004',
          name: '赵六',
          gender: '男',
          department: '财务部',
          status: '在职',
          contactMethod: '17698765432',
          createTime: '2025-03-06'
        },
        {
          id: '005',
          name: '钱七',
          gender: '女',
          department: '市场部',
          status: '在职',
          contactMethod: '13567891234',
          createTime: '2025-03-07'
        }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/battle-simulation')
    },
    handleSearch() {
      console.log('Search with:', this.searchQuery)
      // 实际应用中这里应该调用API获取数据
    },
    handleAdd() {
      this.dialogTitle = '新增人员'
      this.userForm = {
        id: '',
        name: '',
        gender: '男',
        department: '',
        status: '在职',
        contactMethod: '',
        createTime: new Date().toISOString().split('T')[0]
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑人员'
      if (row) {
        this.userForm = JSON.parse(JSON.stringify(row))
      } else if (this.selectedRows.length === 1) {
        this.userForm = JSON.parse(JSON.stringify(this.selectedRows[0]))
      } else {
        this.$message.warning('请选择一条记录进行编辑')
        return
      }
      this.dialogVisible = true
    },
    handleDelete(row) {
      console.log('Delete user:', row || this.selectedRows)
    },
    handleImport() {
      console.log('Import users')
    },
    handleExport() {
      console.log('Export users')
    },
    handleGroupManage() {
      console.log('Manage user groups')
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log('Page size changed to:', val)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log('Current page changed to:', val)
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection
      console.log('Selection changed:', selection)
    },
    submitForm() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '新增人员') {
            // 模拟新增用户
            this.tableData.unshift({
              ...this.userForm,
              createTime: new Date().toISOString().split('T')[0]
            })
            this.$message.success('新增成功')
          } else {
            // 模拟编辑用户
            const index = this.tableData.findIndex(item => item.id === this.userForm.id)
            if (index !== -1) {
              this.tableData.splice(index, 1, this.userForm)
              this.$message.success('编辑成功')
            }
          }
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.userForm && this.$refs.userForm.resetFields()
    },
  }
}
</script>

<style>
/* 基本输入框样式 */
.el-input__inner {
  background-color: #fff !important;
  border: 1px solid #dcdfe6 !important;
  color: #606266 !important;
}

/* 确保禁用状态的输入框也有正确的背景色 */
.el-input.is-disabled .el-input__inner {
  background-color: #f5f7fa !important;
}

/* 确保所有输入框都有白色背景 */
.el-input .el-input__inner,
.el-select .el-input__inner,
.el-date-editor .el-input__inner {
  background-color: #fff !important;
}

/* 为搜索表单中的输入框特别设置 */
.search-form .el-input__inner {
  background-color: #fff !important;
}

/* placeholder样式 - 使用所有浏览器兼容的方式 */
.el-input__inner::placeholder {
  color: #000 !important;
  opacity: 1 !important;
}

.el-select .el-input__inner::placeholder {
  color: #000 !important;
  opacity: 1 !important;
}

/* 为Firefox浏览器设置 */
.el-input__inner::-moz-placeholder {
  color: #000 !important;
  opacity: 1 !important;
}

/* 为Chrome/Safari/Opera浏览器设置 */
.el-input__inner::-webkit-input-placeholder {
  color: #000 !important;
  opacity: 1 !important;
}

/* 为IE10+浏览器设置 */
.el-input__inner:-ms-input-placeholder {
  color: #000 !important;
  opacity: 1 !important;
}

/* 确保下拉框也有正确的样式 */
.el-select .el-input__inner {
  background-color: #fff !important;
  border: 1px solid #dcdfe6 !important;
}

/* 日期选择器样式 */
.el-date-editor.el-input .el-input__inner {
  background-color: #fff !important;
}

/* 自定义类样式 */
.custom-input,
.custom-select {
  border-radius: 4px !important;
  font-size: 14px !important;
}

/* 确保表单中的输入框也有黑色placeholder */
.demo-form-inline .el-input__inner::placeholder {
  color: #000 !important;
}

/* 确保表单中的输入框也有黑色placeholder - 其他浏览器 */
.demo-form-inline .el-input__inner::-webkit-input-placeholder {
  color: #000 !important;
}

.demo-form-inline .el-input__inner::-moz-placeholder {
  color: #000 !important;
}

.demo-form-inline .el-input__inner:-ms-input-placeholder {
  color: #000 !important;
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
  color: #409EFF;
  font-size: 14px;
  margin-right: 15px;
}

.search-form {
  background-color: #fff ;
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
  background-color: #f5f7fa;
  padding: 23px 0px 0px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.action-btn {
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}
.search-btn {
    background-color: #3a8ee6 !important;
    border-color: #3a8ee6 !important;
}

.pagination {
  margin-top: 20px;
  text-align: right;
  padding: 20px;
  background-color: #f5f7fa;
}

.edit-btn {
  color: #409EFF;
  cursor: pointer;
}

.delete-btn {
  color: #F56C6C;
  margin-left: 10px;
}
</style>

<style scoped>
</style>
