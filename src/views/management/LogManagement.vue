<template>
  <div class="log-management-container">
    <div class="page-header">
      <div class="search-container">
        <el-form :inline="true" :model="searchForm">
          <el-form-item label="操作类型">
            <el-select v-model="searchForm.operation" placeholder="请选择操作类型" clearable>
              <el-option label="查询(search)" value="search"></el-option>
              <el-option label="添加(add)" value="add"></el-option>
              <el-option label="更新(update)" value="update"></el-option>
              <el-option label="删除(delete)" value="delete"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="searchForm.userName" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch" style="color:#000">查询</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 日志列表 -->
    <div class="log-table">
      <el-table :data="logList" border stripe style="width: 100%">
        <el-table-column prop="Id" label="ID" width="80" align="center">
        </el-table-column>
        <el-table-column prop="UserName" label="用户名" width="100" align="center">
        </el-table-column>
        <el-table-column prop="FunctionName" label="功能模块" width="180">
        </el-table-column>
        <el-table-column prop="Opertion" label="操作类型" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="getOperationTagType(scope.row.Opertion)">
              {{ scope.row.Opertion }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="Content" label="日志内容" min-width="300" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" width="180" align="center">
          <template slot-scope="scope">
            {{ formatDate(scope.row.CreateTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="Level" label="日志级别" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="getLevelTagType(scope.row.Level)">
              {{ getLevelText(scope.row.Level) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="Ip" label="IP地址" width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleViewDetail(scope.row)"
              style="color:#c1ffff">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-container">
        <el-pagination @current-change="handleCurrentChange" :current-page="CurrentPage" :page-size="PerPageCount"
          layout="prev, pager, next" :total="total" class="custom-pagination">
        </el-pagination>
      </div>
    </div>

    <!-- 日志详情对话框 -->
    <el-dialog title="日志详情" :visible.sync="dialogVisible" width="80%" :modal="false" >
      <div v-if="currentLog" class="log-detail">
        <div class="detail-item">
          <span class="label">ID:</span>
          <span class="value">{{ currentLog.Id }}</span>
        </div>
        <div class="detail-item">
          <span class="label">用户名:</span>
          <span class="value">{{ currentLog.UserName }}</span>
        </div>
        <div class="detail-item">
          <span class="label">功能模块:</span>
          <span class="value">{{ currentLog.FunctionName }}</span>
        </div>
        <div class="detail-item">
          <span class="label">操作类型:</span>
          <span class="value">
            <el-tag :type="getOperationTagType(currentLog.Opertion)">
              {{ currentLog.Opertion }}
            </el-tag>
          </span>
        </div>
        <div class="detail-item">
          <span class="label">日志级别:</span>
          <span class="value">
            <el-tag :type="getLevelTagType(currentLog.Level)">
              {{ getLevelText(currentLog.Level) }}
            </el-tag>
          </span>
        </div>
        <div class="detail-item">
          <span class="label">创建时间:</span>
          <span class="value">{{ formatDate(currentLog.CreateTime) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">IP地址:</span>
          <span class="value">{{ currentLog.Ip }}</span>
        </div>
        <div class="detail-item full-width">
          <span class="label">日志内容:</span>
          <div class="content-value">{{ currentLog.Content }}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLogList } from '@/api/user';
export default {
  name: 'LogManagement',
  data() {
    return {
      // 搜索表单
      searchForm: {
        operation: '',
        functionName: '',
        level: '',
        userName: '',
        dateRange: []
      },
      // 日志列表
      logList: [],
      // 加载状态
      loading: false,
      // 分页信息
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      // 对话框
      dialogVisible: false,
      // 当前查看的日志
      currentLog: null
    };
  },
  created() {
    this.fetchLogs();
  },
  methods: {
    // 获取日志列表
    fetchLogs() {
      this.loading = true;

      // 构建查询参数
      const params = {
        CurrentPage: this.pagination.currentPage,
        PerPageCount: this.pagination.pageSize
      };

      // 添加搜索条件
      if (this.searchForm.operation) {
        params.Opertion = this.searchForm.operation;
      }
      if (this.searchForm.functionName) {
        params.FunctionName = this.searchForm.functionName;
      }
      if (this.searchForm.level) {
        params.Level = this.searchForm.level;
      }
      if (this.searchForm.userName) {
        params.UserName = this.searchForm.userName;
      }
      if (this.searchForm.dateRange && this.searchForm.dateRange.length === 2) {
        params.StartTime = this.searchForm.dateRange[0] / 1000; // 转换为秒
        params.EndTime = this.searchForm.dateRange[1] / 1000; // 转换为秒
      }


      getLogList(params).then(response => {
        if (response) {
          console.log('获取日志列表', response)
          this.logList = response.data || []
          this.total = response.ToalCount
        }
      })
    },

    // 处理查询
    handleSearch() {
      this.pagination.currentPage = 1;
      this.fetchLogs();
    },

    // 重置查询
    resetSearch() {
      this.searchForm = {
        operation: '',
        functionName: '',
        level: '',
        userName: '',
        dateRange: []
      };
      this.pagination.currentPage = 1;
      this.fetchLogs();
    },

    // 处理页码变化
    handleCurrentChange(currentPage) {
      this.pagination.currentPage = currentPage;
      this.fetchLogs();
    },

    // 处理每页条数变化
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.currentPage = 1;
      this.fetchLogs();
    },

    // 查看日志详情
    handleViewDetail(log) {
      this.currentLog = log;
      this.dialogVisible = true;
    },

    // 格式化日期
    formatDate(timestamp) {
      if (!timestamp) return '';

      const date = new Date(timestamp * 1000); // 转换为毫秒

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    // 获取操作类型标签样式
    getOperationTagType(operation) {
      const typeMap = {
        'search': 'info',
        'add': 'success',
        'update': 'warning',
        'delete': 'danger'
      };

      return typeMap[operation] || 'info';
    },

    // 获取日志级别标签样式
    getLevelTagType(level) {
      const typeMap = {
        1: '',       // 普通
        2: 'warning', // 警告
        3: 'danger'   // 错误
      };

      return typeMap[level] || '';
    },

    // 获取日志级别文本
    getLevelText(level) {
      const textMap = {
        1: '普通',
        2: '警告',
        3: '错误'
      };

      return textMap[level] || '未知';
    }
  }
};
</script>

<style scoped>
.log-management-container {
  padding: 20px;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.search-container {
  background-color: #505962;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
}

.log-table {
  padding: 20px;
  border-radius: 4px;
  background-color: #505962;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.el-pagination .btn-prev,
.el-pagination .btn-next,
.el-pagination .el-pager li {
  background-color: #626C77 !important;
  color: #fff !important;
  border: 1px solid #626C77 !important;
}

.el-pagination .btn-prev {
  border-radius: 8px 0 0 8px !important;
}

.el-pagination .btn-next {
  border-radius: 0 8px 8px 0 !important;
}

.el-pagination .el-pager li.active {
  background-color: #606266 !important;
  color: #333 !important;
  font-weight: bold !important;
}


.log-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 15px;
}

.detail-item {
  width: calc(50% - 15px);
  display: flex;
  margin-bottom: 10px;
}

.detail-item.full-width {
  width: 100%;
  flex-direction: column;
}

.label {
  font-weight: bold;
  width: 100px;
  color: #fff;
}
.value{
  color:#fff
}

.content-value {
  margin-top: 10px;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-all;
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .log-management-container {
    background-color: #2c3e50;
    color: #fff;
  }




  .content-value {
    background-color: #2c3e50;
    color: #ddd;
  }

  .label {
    color: #ddd;
  }


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

::v-deep .el-table__body tr:hover>td {
  background-color: #7B8B9B !important;
}

::v-deep .el-table .el-table__header th {
  background-color: #6C767F !important;
  color: #f0f0f0 !important;
}
</style>
