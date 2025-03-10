<template>
  <div class="user-info-container">
    <div class="search-form">
      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item label="关键字">
          <el-input v-model="searchQuery.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="searchQuery.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="toolbar">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="danger" @click="handleDelete">删除</el-button>
      <el-button type="warning" @click="handleImport">导入</el-button>
      <el-button type="success" @click="handleExport">导出</el-button>
    </div>

    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="人员编号" width="120" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="gender" label="性别" width="80" />
      <el-table-column prop="department" label="部门" width="150" />
      <el-table-column prop="position" label="职位" width="150" />
      <el-table-column prop="phone" label="联系电话" width="150" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfoView',
  data() {
    return {
      searchQuery: {
        keyword: '',
        name: '',
        status: ''
      },
      currentPage: 1,
      pageSize: 10,
      total: 100,
      selectedRows: [],
      tableData: [
        {
          id: '001',
          name: '张三',
          gender: '男',
          department: '部门',
          position: '职位',
          phone: '18145674589',
          createTime: '2025-03-03'
        },
        {
          id: '002',
          name: '李四',
          gender: '男',
          department: '技术部',
          position: '开发工程师',
          phone: '13812345678',
          createTime: '2025-03-04'
        },
        {
          id: '003',
          name: '王五',
          gender: '女',
          department: '人事部',
          position: '人事专员',
          phone: '15987654321',
          createTime: '2025-03-05'
        }
      ]
    }
  },
  methods: {
    handleSearch() {
      console.log('Search with:', this.searchQuery)
    },
    handleAdd() {
      console.log('Add new user')
    },
    handleEdit(row) {
      console.log('Edit user:', row)
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
    }
  }
}
</script>

<style scoped>
.user-info-container {
  padding: 20px;
}

.search-form {
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.toolbar {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
