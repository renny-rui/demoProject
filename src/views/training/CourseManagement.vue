<template>
  <div class="course-management-container">
    <!-- <div class="page-header">
      <h2>课程管理与发布</h2>
    </div> -->

    <div class="search-form">
      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchQuery.name" placeholder="请输入课程名称" size="medium" clearable></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-container">
      <div class="table-operations">
        <el-button type="primary" size="medium" @click="handleAdd" style="color:#000" disabled>添加课程</el-button>
      </div>
      
      <el-table
        :data="courseList"
        border
        style="width: 100%"
        :header-cell-style="{ background: '#505962', color: '#fff' }"
        :row-style="{ background: '#7B8B9B', color: '#fff' }"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="课程名称"
        ></el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)" class="edit-btn" disabled>
                <i class="el-icon-edit"></i> 编辑
              </el-button>
            
              <el-button type="text" size="small" @click="handleDelete(scope.row)" class="delete-btn" disabled>
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </template>
          </el-table-column>
      </el-table>
      
   
    </div>

    <!-- 添加/编辑课程对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form :model="courseForm" :rules="rules" ref="courseForm" label-width="100px">
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="courseForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMissionTypeRole } from '@/api/mission';

export default {
  name: 'CourseManagement',
  data() {
    return {
      searchQuery: {
        name: ''
      },
      courseList: [],
      originalCourseList: [], // 保存原始数据用于搜索
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      dialogTitle: '',
      courseForm: {
        id: null,
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ]
      },
      isEdit: false,
      loading: false
    };
  },
  created() {
    this.fetchCourseList();
  },
  methods: {
    fetchCourseList() {
      this.loading = true;
      getMissionTypeRole()
        .then(response => {
          console.log('获取课程列表：',response)
          if (response) {
            // 从response.data中提取type数组，并重新组成新的数组
            if (response.data) {
              // 提取Id和EnName字段组成新数组
              const newCourseList = response.data.map(item => ({
                
                id: item.type.Id,
                name: item.type.EnName
              }));
              console.log('newCourseList:',newCourseList)
              this.courseList = newCourseList;
              this.originalCourseList = [...newCourseList]; // 保存原始数据
            } else {
              this.$message.error('返回数据格式不正确');
              console.error('返回数据格式不正确:', response.data);
            }
          } else {
            this.$message.error(response.data.message || '获取课程列表失败');
          }
        })
        .catch(error => {
          console.error('获取课程列表出错:', error);
          this.$message.error('获取课程列表失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSearch() {
      if (this.searchQuery.name) {
        this.courseList = this.originalCourseList.filter(item => 
          item.name.toLowerCase().includes(this.searchQuery.name.toLowerCase())
        );
        this.total = this.courseList.length;
      } else {
        // 重置为原始数据
        this.courseList = [...this.originalCourseList];
        this.total = this.originalCourseList.length;
      }
      this.currentPage = 1;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleAdd() {
      this.dialogTitle = '添加课程';
      this.courseForm = {
        id: null,
        name: ''
      };
      this.isEdit = false;
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.dialogTitle = '编辑课程';
      this.courseForm = JSON.parse(JSON.stringify(row));
      this.isEdit = true;
      this.dialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm('确认删除该课程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 实现删除逻辑
        this.courseList = this.courseList.filter(item => item.id !== row.id);
        this.originalCourseList = this.originalCourseList.filter(item => item.id !== row.id);
        this.total = this.courseList.length;
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    submitForm() {
      this.$refs.courseForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            // 编辑课程
            const index = this.courseList.findIndex(item => item.id === this.courseForm.id);
            if (index !== -1) {
              this.courseList.splice(index, 1, this.courseForm);
              
              // 同时更新原始数据
              const originalIndex = this.originalCourseList.findIndex(item => item.id === this.courseForm.id);
              if (originalIndex !== -1) {
                this.originalCourseList.splice(originalIndex, 1, this.courseForm);
              }
            }
          } else {
            // 添加课程
            const newId = this.originalCourseList.length > 0 ? 
              Math.max(...this.originalCourseList.map(item => item.id)) + 1 : 1;
            
            const newCourse = {
              id: newId,
              name: this.courseForm.name
            };
            
            this.courseList.push(newCourse);
            this.originalCourseList.push(newCourse);
            this.total = this.courseList.length;
          }
          this.dialogVisible = false;
          this.$message({
            type: 'success',
            message: this.isEdit ? '编辑成功!' : '添加成功!'
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
.course-management-container {
  padding: 20px;
  background-color: #383d44;
  color: #fff;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  color: #fff;
  font-size: 24px;
  font-weight: normal;
  margin: 0;
}

.search-form {
  margin-bottom: 20px;
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
}

.table-container {
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
}

.table-operations {
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
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

::v-deep .el-pagination {
  color: #fff;
}

::v-deep .el-pagination button {
  background-color: #505962;
  color: #fff;
}

::v-deep .el-pagination .el-select .el-input .el-input__inner {
  background-color: #505962;
  color: #fff;
  border-color: #606266;
}

::v-deep .el-pagination .el-pagination__jump {
  color: #fff;
}

::v-deep .el-pagination .el-pagination__editor.el-input .el-input__inner {
  background-color: #505962;
  color: #fff;
  border-color: #606266;
}
</style>
