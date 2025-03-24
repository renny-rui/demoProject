<template>
  <div class="task-assignment-container">
    <div class="page-header">
      <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">任务分配</h2>
      </div>
    </div>

    <div class="content-container">
      <div class="search-form">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="searchForm.taskId" placeholder="任务编号" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchForm.taskName" placeholder="任务名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.status" placeholder="任务状态" clearable>
              <el-option label="未开始" value="未开始"></el-option>
              <el-option label="进行中" value="进行中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="已取消" value="已取消"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="searchForm.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-container">
        <div class="table-operations">
          <el-button type="primary" @click="handleAddTask">新增任务</el-button>
          <el-button type="danger" @click="handleBatchDelete" :disabled="!selectedTasks.length">批量删除</el-button>
          <el-button type="success" @click="handleBatchExport" :disabled="!selectedTasks.length">批量导出</el-button>
        </div>

        <el-table
          :data="taskList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="taskId" label="任务编号" width="100"></el-table-column>
          <el-table-column prop="taskName" label="任务名称" width="150"></el-table-column>
          <el-table-column prop="assignTo" label="分配给" width="100"></el-table-column>
          <el-table-column prop="deviceName" label="关联设备" width="120"></el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="140"></el-table-column>
          <el-table-column prop="endTime" label="结束时间" width="140"></el-table-column>
          <el-table-column prop="status" label="状态" width="80">
            <template slot-scope="scope">
              <el-tag :type="getStatusType(scope.row.status)">{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="priority" label="优先级" width="80">
            <template slot-scope="scope">
              <el-tag :type="getPriorityType(scope.row.priority)">{{ scope.row.priority }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="progress" label="进度" width="120">
            <template slot-scope="scope">
              <el-progress :percentage="scope.row.progress" :status="getProgressStatus(scope.row.progress)"></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleView(scope.row)">查看</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 任务表单对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px" @close="resetForm">
      <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="taskForm.taskName" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="分配给" prop="assignTo">
          <el-select v-model="taskForm.assignTo" filterable placeholder="请选择人员">
            <el-option
              v-for="item in userOptions"
              :key="item.id"
              :label="`${item.name} (${item.department})`"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联设备" prop="deviceId">
          <el-select v-model="taskForm.deviceId" filterable placeholder="请选择设备" @change="handleDeviceChange">
            <el-option
              v-for="item in deviceOptions"
              :key="item.id"
              :label="`${item.name} (${item.id})`"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务时间" prop="timeRange">
          <el-date-picker
            v-model="taskForm.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-select v-model="taskForm.priority" placeholder="请选择优先级">
            <el-option label="高" value="高"></el-option>
            <el-option label="中" value="中"></el-option>
            <el-option label="低" value="低"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态" prop="status">
          <el-select v-model="taskForm.status" placeholder="请选择任务状态">
            <el-option label="未开始" value="未开始"></el-option>
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="已取消" value="已取消"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进度" prop="progress">
          <el-slider v-model="taskForm.progress" :step="5" show-stops></el-slider>
        </el-form-item>
        <el-form-item label="任务描述" prop="description">
          <el-input type="textarea" v-model="taskForm.description" rows="4" placeholder="请输入任务描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 任务详情对话框 -->
    <el-dialog title="任务详情" :visible.sync="detailVisible" width="600px">
      <div v-if="currentTask" class="task-detail">
        <div class="detail-item">
          <span class="label">任务编号:</span>
          <span class="value">{{ currentTask.taskId }}</span>
        </div>
        <div class="detail-item">
          <span class="label">任务名称:</span>
          <span class="value">{{ currentTask.taskName }}</span>
        </div>
        <div class="detail-item">
          <span class="label">分配给:</span>
          <span class="value">{{ currentTask.assignTo }}</span>
        </div>
        <div class="detail-item">
          <span class="label">关联设备:</span>
          <span class="value">{{ currentTask.deviceName }}</span>
        </div>
        <div class="detail-item">
          <span class="label">开始时间:</span>
          <span class="value">{{ currentTask.startTime }}</span>
        </div>
        <div class="detail-item">
          <span class="label">结束时间:</span>
          <span class="value">{{ currentTask.endTime }}</span>
        </div>
        <div class="detail-item">
          <span class="label">优先级:</span>
          <span class="value">
            <el-tag :type="getPriorityType(currentTask.priority)">{{ currentTask.priority }}</el-tag>
          </span>
        </div>
        <div class="detail-item">
          <span class="label">状态:</span>
          <span class="value">
            <el-tag :type="getStatusType(currentTask.status)">{{ currentTask.status }}</el-tag>
          </span>
        </div>
        <div class="detail-item">
          <span class="label">进度:</span>
          <span class="value" style="width: 100%">
            <el-progress :percentage="currentTask.progress" :status="getProgressStatus(currentTask.progress)"></el-progress>
          </span>
        </div>
        <div class="detail-item full-width">
          <span class="label">任务描述:</span>
          <div class="value description">{{ currentTask.description }}</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关 闭</el-button>
        <el-button type="primary" @click="handleEditFromDetail">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TaskAssignment',
  data() {
    return {
      searchForm: {
        taskId: '',
        taskName: '',
        status: '',
        dateRange: []
      },
      taskList: [
        {
          taskId: 'T001',
          taskName: '设备维护任务',
          assignTo: '张三',
          deviceId: 'DEV001',
          deviceName: '训练设备A',
          startTime: '2025-03-19 09:00:00',
          endTime: '2025-03-20 18:00:00',
          status: '进行中',
          priority: '高',
          progress: 45,
          description: '对训练设备A进行日常维护和检查，确保设备正常运行。'
        },
        {
          taskId: 'T002',
          taskName: '系统升级任务',
          assignTo: '李四',
          deviceId: 'DEV002',
          deviceName: '训练设备B',
          startTime: '2025-03-21 10:00:00',
          endTime: '2025-03-21 16:00:00',
          status: '未开始',
          priority: '中',
          progress: 0,
          description: '对训练设备B的操作系统进行升级，提高系统稳定性。'
        },
        {
          taskId: 'T003',
          taskName: '数据备份任务',
          assignTo: '王五',
          deviceId: 'DEV003',
          deviceName: '训练设备C',
          startTime: '2025-03-18 14:00:00',
          endTime: '2025-03-18 17:00:00',
          status: '已完成',
          priority: '低',
          progress: 100,
          description: '对训练设备C的历史数据进行备份，确保数据安全。'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 3,
      selectedTasks: [],
      dialogVisible: false,
      detailVisible: false,
      dialogTitle: '新增任务',
      currentTask: null,
      taskForm: {
        taskId: '',
        taskName: '',
        assignTo: '',
        deviceId: '',
        deviceName: '',
        timeRange: [],
        status: '未开始',
        priority: '中',
        progress: 0,
        description: ''
      },
      rules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        assignTo: [
          { required: true, message: '请选择分配人员', trigger: 'change' }
        ],
        deviceId: [
          { required: true, message: '请选择关联设备', trigger: 'change' }
        ],
        timeRange: [
          { required: true, message: '请选择任务时间范围', trigger: 'change' }
        ],
        priority: [
          { required: true, message: '请选择优先级', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择任务状态', trigger: 'change' }
        ]
      },
      deviceOptions: [
        { id: 'DEV001', name: '训练设备A', type: '模拟器' },
        { id: 'DEV002', name: '训练设备B', type: '监控器' },
        { id: 'DEV003', name: '训练设备C', type: '模拟器' },
        { id: 'DEV004', name: '训练设备D', type: '监控器' },
        { id: 'DEV005', name: '训练设备E', type: '模拟器' }
      ],
      userOptions: [
        { id: '001', name: '张三', department: '技术部' },
        { id: '002', name: '李四', department: '技术部' },
        { id: '003', name: '王五', department: '人事部' },
        { id: '004', name: '赵六', department: '财务部' },
        { id: '005', name: '钱七', department: '市场部' }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router.push('/battle-simulation')
    },
    handleSearch() {
      console.log('搜索条件:', this.searchForm)
      // 实际应用中这里应该调用API进行搜索
    },
    resetSearch() {
      this.searchForm = {
        taskId: '',
        taskName: '',
        status: '',
        dateRange: []
      }
    },
    handleAddTask() {
      this.dialogTitle = '新增任务'
      this.taskForm = {
        taskId: '',
        taskName: '',
        assignTo: '',
        deviceId: '',
        deviceName: '',
        timeRange: [],
        status: '未开始',
        priority: '中',
        progress: 0,
        description: ''
      }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑任务'
      
      // 将开始时间和结束时间转换为timeRange数组
      const timeRange = [row.startTime, row.endTime]
      
      this.taskForm = {
        ...JSON.parse(JSON.stringify(row)),
        timeRange: timeRange
      }
      
      this.dialogVisible = true
    },
    handleView(row) {
      this.currentTask = JSON.parse(JSON.stringify(row))
      this.detailVisible = true
    },
    handleEditFromDetail() {
      this.detailVisible = false
      this.handleEdit(this.currentTask)
    },
    handleDelete(row) {
      const taskName = row.taskName;
      this.$confirm(`确认删除任务"${taskName}"?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 实际应用中这里应该调用API进行删除
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleBatchDelete() {
      if (this.selectedTasks.length === 0) {
        this.$message.warning('请选择要删除的任务')
        return
      }
      
      this.$confirm(`确认删除选中的 ${this.selectedTasks.length} 个任务?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 实际应用中这里应该调用API进行批量删除
        this.$message.success('批量删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleBatchExport() {
      if (this.selectedTasks.length === 0) {
        this.$message.warning('请选择要导出的任务')
        return
      }
      
      // 实际应用中这里应该调用API进行批量导出
      this.$message.success(`已导出 ${this.selectedTasks.length} 个任务`)
    },
    handleSelectionChange(selection) {
      this.selectedTasks = selection
    },
    handleSizeChange(val) {
      this.pageSize = val
      // 重新加载数据
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // 重新加载数据
    },
    handleDeviceChange(deviceId) {
      const device = this.deviceOptions.find(item => item.id === deviceId)
      if (device) {
        this.taskForm.deviceName = device.name
      }
    },
    getStatusType(status) {
      const statusMap = {
        '未开始': 'info',
        '进行中': 'warning',
        '已完成': 'success',
        '已取消': 'danger'
      }
      return statusMap[status] || 'info'
    },
    getPriorityType(priority) {
      const priorityMap = {
        '高': 'danger',
        '中': 'warning',
        '低': 'info'
      }
      return priorityMap[priority] || 'info'
    },
    getProgressStatus(progress) {
      if (progress === 100) return 'success'
      if (progress > 80) return 'exception'
      return ''
    },
    submitForm() {
      this.$refs.taskForm.validate(valid => {
        if (valid) {
          if (this.taskForm.timeRange && this.taskForm.timeRange.length === 2) {
            // 将timeRange拆分为开始时间和结束时间
            const [startTime, endTime] = this.taskForm.timeRange
            
            const taskData = {
              ...this.taskForm,
              startTime,
              endTime
            }
            
            delete taskData.timeRange
            
            // 实际应用中这里应该调用API保存数据
            const message = this.taskForm.taskId ? '更新成功' : '添加成功'
            this.$message.success(message)
            this.dialogVisible = false
          } else {
            this.$message.error('请选择有效的时间范围')
          }
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.taskForm && this.$refs.taskForm.resetFields()
    }
  }
}
</script>

<style scoped>
.task-assignment-container {
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
  margin-right: 15px;
  color: #409EFF;
}

.page-title {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
}

.content-container {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.search-form {
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

.table-container {
  padding: 20px;
}

.table-operations {
  margin-bottom: 15px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.task-detail {
  display: flex;
  flex-wrap: wrap;
}

.detail-item {
  width: 50%;
  margin-bottom: 15px;
  display: flex;
}

.detail-item.full-width {
  width: 100%;
  flex-direction: column;
}

.detail-item .label {
  font-weight: bold;
  width: 100px;
  color: #606266;
}

.detail-item .value {
  flex: 1;
}

.detail-item .description {
  margin-top: 10px;
  white-space: pre-line;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  min-height: 80px;
}
</style>
