<template>
  <div class="task-detail-container">
    <!-- 任务基础配置部分 -->
    <div class="task-basic-config">
      <div class="section-title">任务基础配置</div>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="map-container">
            <div class="map-placeholder">
              <img v-if="taskData.mapImage" :src="taskData.mapImage" alt="任务地图" class="map-image" />
              <div v-else class="no-map">
                <i class="el-icon-picture-outline"></i>
                <p>地图加载中...</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="task-info">
            <div class="info-item">
              <span class="info-label">任务ID:</span>
              <span class="info-value">{{ taskData.id || '未设置' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">任务名称:</span>
              <span class="info-value">{{ taskData.name || '未设置' }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">天气:</span>
              <span class="info-value">{{ formatWeather(taskData.weather) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">时间:</span>
              <span class="info-value">{{ formatTime(taskData.time) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">参与人数:</span>
              <span class="info-value">{{ taskData.participantsCount || 0 }} 人</span>
            </div>
            <div class="info-item">
              <span class="info-label">任务状态:</span>
              <el-tag :type="getStatusType(taskData.status)">{{ formatStatus(taskData.status) }}</el-tag>
            </div>
            <div class="info-item">
              <span class="info-label">创建时间:</span>
              <span class="info-value">{{ formatDate(taskData.createTime) }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">任务描述:</span>
              <div class="task-description">{{ taskData.description || '暂无描述' }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 任务人员配置部分 -->
    <div class="task-personnel-config">
      <div class="section-title">任务人员配置</div>
      <el-table :data="taskData.participants" border stripe style="width: 100%">
        <el-table-column prop="name" label="姓名"  align="center"></el-table-column>
        <el-table-column prop="subject" label="科目" ></el-table-column>
        <el-table-column prop="role" label="科目角色" ></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="getParticipantStatusType(scope.row.status)">
              {{ formatParticipantStatus(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        
      </el-table>
    </div>

    <!-- 完成任务按钮 -->
    <div class="task-actions">
      <el-button type="primary" @click="completeTask" :disabled="!canCompleteTask">完成任务</el-button>
     
    </div>

    <!-- 人员详情对话框 -->
    <el-dialog title="人员详情" :visible.sync="participantDialogVisible" width="50%" :modal="false">
      <div v-if="currentParticipant" class="participant-detail">
        <div class="detail-item">
          <span class="label">姓名:</span>
          <span class="value">{{ currentParticipant.name }}</span>
        </div>
        <div class="detail-item">
          <span class="label">科目:</span>
          <span class="value">{{ currentParticipant.subject }}</span>
        </div>
        <div class="detail-item">
          <span class="label">科目角色:</span>
          <span class="value">{{ currentParticipant.role }}</span>
        </div>
        <div class="detail-item">
          <span class="label">状态:</span>
          <el-tag :type="getParticipantStatusType(currentParticipant.status)">
            {{ formatParticipantStatus(currentParticipant.status) }}
          </el-tag>
        </div>
        <div class="detail-item">
          <span class="label">加入时间:</span>
          <span class="value">{{ formatDate(currentParticipant.joinTime) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">完成情况:</span>
          <el-progress :percentage="currentParticipant.completionPercentage || 0" :status="getProgressStatus(currentParticipant.completionPercentage)"></el-progress>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { service } from '@/api/auth';
import { getMissionLastList } from '@/api/mission';

export default {
  name: 'TaskDetail',
  data() {
    return {
      taskId: null,
      taskData: {
        id: '',
        name: '',
        weather: '',
        time: '',
        participantsCount: 0,
        status: '',
        createTime: '',
        description: '',
        mapImage: '',
        participants: []
      },
      loading: false,
      participantDialogVisible: false,
      currentParticipant: null
    };
  },
  computed: {
    canCompleteTask() {
      // 只有当任务状态为进行中时才能完成任务
      return this.taskData.status === 'in_progress';
    }
  },
  created() {
    // 从路由参数或父组件传递获取任务ID
    this.taskId = this.$route.params.id || this.$route.query.id || '';
    
    // 获取最新任务列表
    this.fetchMissionLastList();
  },
  methods: {
    // 获取最新任务列表
    fetchMissionLastList() {
      this.loading = true;
      getMissionLastList()
        .then(response => {
          console.log('最新任务列表响应:', response);
          if (response && response.success) {
            const missionData = response.data;
            
            if (missionData) {
              // 根据地形值设置地图图片
              if (missionData.GameConfig.WarfareSetting.WarfareSetting.Terrain) {
                switch(missionData.GameConfig.WarfareSetting.WarfareSetting.Terrain.toLowerCase()) {
                  case 'rainforest':
                    this.taskData.mapImage = require('../../assets/taskPic/3.png');
                    break;
                  case 'beach':
                    this.taskData.mapImage = require('@/assets/taskPic/1.png');
                    break;
                  case 'ship':
                    this.taskData.mapImage = require('@/assets/taskPic/2.png');
                    break;
                  default:
                    // 默认图片或无图片
                    this.taskData.mapImage = '';
                }
              }
              
              // 从 MissionLib 中提取任务ID和名称
              console.log('任务数据',missionData)
              if (missionData.MissionLib) {
                this.taskData.id = missionData.MissionLib.MissionId || '';
                this.taskData.name = missionData.MissionLib.Name || '';
              }
              
              // 从 WarfareSetting 中提取天气
              if (missionData.GameConfig.WarfareSetting.WarfareSetting.Terrain) {
                this.taskData.weather = missionData.GameConfig.WarfareSetting.WarfareSetting.Terrain;
              }
              
              // 计算总人数
              let totalParticipants = 0;
              if (missionData.MissionLib) {
                // 遍历六个任务对象计算总人数
                const taskObjects = [
                  missionData.MissionLib.CombatVehicleMaintenance,
                  missionData.MissionLib.CombatVehicleRefueling,
                  missionData.MissionLib.HotMealDelivery,
                  missionData.MissionLib.HotMealPreparation,
                  missionData.MissionLib.MedicalEvacuation,
                  missionData.MissionLib.OilDrumDelivery
                ];
                
                // 遍历每个任务对象
                taskObjects.forEach(task => {
                  console.log('任务对象：',task)
                  if (task && task.Groups && Array.isArray(task.Groups)) {
                    // 遍历每个组的成员
                    task.Groups.forEach(group => {
                      if (group.Members && Array.isArray(group.Members)) {
                        totalParticipants += group.Members.length;
                      }
                    });
                  }
                });
              }
              this.taskData.participantsCount = totalParticipants;
              
              // 设置其他字段
              this.taskData.time = new Date().toISOString();
              this.taskData.status = 'in_progress';
              this.taskData.createTime = new Date().toISOString();
              this.taskData.description = missionData.missionLib ? missionData.missionLib.Description || '暂无描述' : '暂无描述';
              
            
            }
          } else {
            console.error('获取最新任务列表失败:', response?.msg || '未知错误');
            this.loading = false;
          }
        })
        .catch(error => {
          console.error('获取最新任务列表请求失败:', error);
          this.loading = false;
        });
    },
    
    // 获取任务详情
    // fetchTaskDetail() {
    //   this.loading = true;
    //   const token = localStorage.getItem('token');
      
    //   service({
    //     url: `/Task/Detail`,
    //     method: 'get',
    //     params: { id: this.taskId },
    //     headers: {
    //       'Authorization': token ? `Bearer ${token}` : ''
    //     }
    //   })
    //     .then(response => {
    //       console.log('任务详情响应:', response);
    //       if (response && response.success) {
    //         this.taskData = response.data || this.taskData;
    //       } else {
    //         this.$message.error(response?.msg || '获取任务详情失败');
    //         // 加载模拟数据
    //         this.loadMockData();
    //       }
    //     })
    //     .catch(error => {
    //       console.error('获取任务详情失败:', error);
    //       this.$message.error('获取任务详情失败');
    //       // 加载模拟数据
    //       this.loadMockData();
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },
    
    
    // 完成任务
    completeTask() {
      this.$confirm('确认完成此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用完成任务API
        const token = localStorage.getItem('token');
        
        service({
          url: `/Task/Complete`,
          method: 'post',
          data: { id: this.taskData.id },
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response && response.success) {
              this.$message.success('任务已完成');
              this.taskData.status = 'completed';
            } else {
              this.$message.error(response?.msg || '完成任务失败');
            }
          })
          .catch(error => {
            console.error('完成任务失败:', error);
            this.$message.error('完成任务失败');
          });
      }).catch(() => {
        this.$message.info('已取消操作');
      });
    },
    
    // 返回任务列表
    backToList() {
      this.$emit('back');
    },
    
    // 查看参与人员详情
    handleViewParticipant(participant) {
      this.currentParticipant = participant;
      this.participantDialogVisible = true;
    },
    
    // 格式化天气
    formatWeather(weather) {
      const weatherMap = {
        'sunny': '晴朗',
        'cloudy': '多云',
        'rainy': '雨天',
        'snowy': '雪天',
        'foggy': '雾天',
        'windy': '大风'
      };
      
      return weatherMap[weather] || weather || '未设置';
    },
    
    // 格式化时间
    formatTime(time) {
      if (!time) return '未设置';
      
      // 如果是时间戳，转换为日期对象
      let date;
      if (typeof time === 'number') {
        date = new Date(time * 1000);
      } else {
        date = new Date(time);
      }
      
      // 检查日期是否有效
      if (isNaN(date.getTime())) {
        return time;
      }
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    
    // 格式化日期
    formatDate(timestamp) {
      if (!timestamp) return '';
      
      // 如果是字符串形式的日期，直接返回
      if (typeof timestamp === 'string' && timestamp.includes('-')) {
        return timestamp;
      }
      
      // 如果是时间戳，转换为日期对象
      const date = new Date(typeof timestamp === 'number' ? timestamp * 1000 : timestamp);
      
      // 检查日期是否有效
      if (isNaN(date.getTime())) {
        return timestamp;
      }
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    
    // 获取任务状态类型
    getStatusType(status) {
      const typeMap = {
        'pending': 'info',
        'in_progress': 'warning',
        'completed': 'success',
        'cancelled': 'danger'
      };
      
      return typeMap[status] || 'info';
    },
    
    // 格式化任务状态
    formatStatus(status) {
      const statusMap = {
        'pending': '待开始',
        'in_progress': '进行中',
        'completed': '已完成',
        'cancelled': '已取消'
      };
      
      return statusMap[status] || status || '未知状态';
    },
    
    // 获取参与人员状态类型
    getParticipantStatusType(status) {
      const typeMap = {
        'active': 'success',
        'inactive': 'danger',
        'pending': 'info'
      };
      
      return typeMap[status] || 'info';
    },
    
    // 格式化参与人员状态
    formatParticipantStatus(status) {
      const statusMap = {
        'active': '在线',
        'inactive': '离线',
        'pending': '待加入'
      };
      
      return statusMap[status] || status || '未知状态';
    },
    
    // 获取进度条状态
    getProgressStatus(percentage) {
      if (percentage >= 100) {
        return 'success';
      } else if (percentage >= 80) {
        return 'success';
      } else if (percentage >= 50) {
        return '';
      } else {
        return 'exception';
      }
    }
  }
};
</script>

<style scoped>
.task-detail-container {
  padding: 20px;
  background-color: #505962;
  border-radius: 4px;
  color: #fff;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c1ffff;
  color: #c1ffff;
}

.task-basic-config {
  margin-bottom: 30px;
}

.map-container {
  height: 300px;
  background-color: #383D44;
  border-radius: 4px;
  overflow: hidden;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #383D44;
}

.map-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-map {
  text-align: center;
  color: #c1ffff;
}

.no-map i {
  font-size: 48px;
  margin-bottom: 10px;
}

.task-info {
  background-color: #383D44;
  border-radius: 4px;
  padding: 20px;
  height: 300px;
  overflow-y: auto;
}

.info-item {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
}

.info-label {
  width: 80px;
  font-weight: bold;
  color: #c1ffff;
}

.info-value {
  flex: 1;
  word-break: break-all;
}

.task-description {
  margin-top: 5px;
  padding: 10px;
  background-color: #2c3e50;
  border-radius: 4px;
  min-height: 60px;
  max-height: 100px;
  overflow-y: auto;
}

.task-personnel-config {
  margin-bottom: 30px;
}

.task-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px dashed #c1ffff;
}

.task-actions .el-button {
  margin: 0 10px;
}

.participant-detail {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #505962;
  border-radius: 4px;
  color: #fff;
}

.detail-item {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.label {
  width: 80px;
  font-weight: bold;
  color: #c1ffff;
}

.value {
  flex: 1;
}

/* 表格样式 */
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

/* 对话框样式 */
::v-deep .el-dialog {
  background-color: #505962 !important;
  border-radius: 4px !important;
  border: 2px solid #c1ffff !important;
}

::v-deep .el-dialog__title {
  color: #c1ffff !important;
}

::v-deep .el-dialog__header {
  background-color: #383D44 !important;
  padding: 15px 20px !important;
}

::v-deep .el-dialog__body {
  color: #fff !important;
  padding: 20px !important;
}

/* 按钮样式 */
::v-deep .el-button--primary {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
  color: #fff !important;
}

::v-deep .el-button--primary:hover {
  background-color: #66b1ff !important;
  border-color: #66b1ff !important;
}

::v-deep .el-button--primary:disabled {
  background-color: #a0cfff !important;
  border-color: #a0cfff !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .info-item {
    flex-direction: column;
  }
  
  .info-label {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
