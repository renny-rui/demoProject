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
           
           
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 任务人员配置部分 -->
    <div class="task-personnel-config">
      <div class="section-title">任务人员配置</div>
      <el-table 
        :data="taskData.participants" 
        border 
        stripe 
        style="width: 100%"
        v-loading="membersLoading"
        element-loading-text="加载人员数据中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.6)">
        <el-table-column prop="SolidName" label="姓名"  align="center"></el-table-column>
        <el-table-column prop="TeamTypeEnName" label="科目" ></el-table-column>
        <el-table-column prop="RoleName" label="科目角色" ></el-table-column>
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
      <el-button type="primary" @click="completeTask()" >完成任务</el-button>
     
    </div>

    <!-- 任务完成结算对话框 -->
    <el-dialog 
      title="任务完成结算" 
      :visible.sync="settlementDialogVisible" 
      width="80%" 
      :before-close="handleSettlementDialogClose"
      center
      :modal="false"
    >
      <div class="settlement-dialog-content">
        <!-- 图表展示区域 -->
        <div class="charts-container">
          <h3>此次任务团队和个人详细数据</h3>
          <div class="charts-row">
            <div class="chart-item">
              <h4>团队完成情况</h4>
              <div class="chart-placeholder">
                <div class="pie-chart"></div>
              </div>
            </div>
            <div class="chart-item">
              <h4>个人表现分析</h4>
              <div class="chart-placeholder">
                <div class="line-chart"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 小组评语区域 -->
        <div class="team-comments-container">
          <h3>小组评语</h3>
          <div class="team-comments">
            <div class="team-comment-item" v-for="(team, index) in teamEvaluations" :key="index">
              <div class="team-comment-header">
                <span class="team-name">小组{{ index + 1 }}: {{ team.name }}</span>
                <span class="team-score">
                  评分: 
                  
                  <el-input-number v-model="team.score" :min="0" :max="100" @change="handleChange" />
                </span>
              </div>
              <div class="team-comment-content">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="请输入小组评语"
                  v-model="team.comment"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 专家教官评语 -->
        <div class="expert-comment-container">
          <h3>专家教官评语</h3>
          <div class="expert-comment">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入专家教官评语"
              v-model="expertComment"
            ></el-input>
          </div>
        </div>
        
        <!-- 任务整体评分 -->
        <div class="overall-score-container">
          <h3>任务整体评分</h3>
          <div class="overall-score">
            <el-input-number 
              v-model="overallScore" 
              :min="0" 
              :max="100" 
            ></el-input-number>
            <span class="score-max">/100</span>
          </div>
        </div>
        
        <!-- 底部按钮 -->
        <div class="settlement-footer">
          <el-button type="primary" @click="finalizeTask" class="finalize-btn">完成任务（上传）</el-button>
        </div>
      </div>
    </el-dialog>
    
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
import { getMissionLastList, getMissionMembers, getMissionProcess } from '@/api/mission';

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
      membersLoading: false,
      loading: false,
      participantDialogVisible: false,
      currentParticipant: null,
      settlementDialogVisible: false,
      teamEvaluations: [
        { name: '油料前送组', score: 92, comment: '油料前送组表现出色，在规定时间内完成了所有任务，团队协作良好，油桶平衡度控制得当。' },
        { name: '热食制作组', score: 88, comment: '热食制作组完成任务过程中展现了良好的协作能力，但在时间控制上还有提升空间。' },
        { name: '卡勤救护组', score: 95, comment: '卡勤救护组在救护过程中反应迅速，操作规范，担架运送平衡度控制出色，是本次任务中表现最优的小组。' }
      ],
      expertComment: '本次任务中，各小组协作良好，在面对复杂地形和恶劣天气的情况下，仍能保持良好的状态完成任务。卡勤救护组表现特别突出，值得表扬。建议热食制作组加强时间管理意识，提高效率。',
      overallScore: 92
    };
  },
  computed: {
    
  },
  created() {
    // 从路由参数或父组件传递获取任务ID
    this.taskId = this.$route.params.id || this.$route.query.id || '';
    
    // 获取最新任务列表
    this.fetchMissionLastList();
    
    // 如果有任务ID，获取任务人员配置
    if (this.taskId) {
      this.fetchMissionMembers();
    }
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
              if (missionData.GameConfig.WarfareSetting.Weather[0].Type) {
                this.taskData.weather = missionData.GameConfig.WarfareSetting.Weather[0].Type;
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
              // 使用后端返回的StartTime作为任务时间
              this.taskData.time = missionData.MissionLib && missionData.MissionLib.StartTime ? missionData.MissionLib.StartTime : new Date().toISOString();
              this.taskData.status = 'in_progress';
              this.taskData.createTime = new Date().toISOString();
              this.taskData.description = missionData.missionLib ? missionData.missionLib.Description || '暂无描述' : '暂无描述';
              
              // 如果有任务ID，获取任务人员配置
              if (this.taskData.id) {
                this.taskId = this.taskData.id;
                this.fetchMissionMembers();
              }
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
 
    // 完成任务
    completeTask() {
      // this.settlementDialogVisible = true;
      // 可以在正式实现中取消注释，使用下面的代码
     
     
      
      this.$confirm('确认完成此任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用完成任务API
        const params = {
          MissionId: this.taskData.id,  // 使用任务ID
          Status: 2                    // 状态为2表示任务已完成
        };
        
        getMissionProcess(params)
          .then(response => {
            console.log('完成任务响应:', response);
            if (response && response.success) {
              this.$message.success('任务已完成');
              this.taskData.status = 'completed';
              // 显示任务完成结算对话框
              this.showSettlementDialog();
              // 触发任务完成事件
              this.$emit('task-completed');
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
    
    // 显示任务完成结算对话框
    showSettlementDialog() {
      this.settlementDialogVisible = true;
    },
    
    // 关闭任务完成结算对话框
    handleSettlementDialogClose() {
      this.settlementDialogVisible = false;
    },
    
    // 最终完成任务并上传
    finalizeTask() {
      this.$message.success('任务结算数据已上传');
      this.settlementDialogVisible = false;
      // 可以在此处添加其他逻辑，如跳转到任务列表页面
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
        'heavyRain': '大雨',
        'rainy': '雨天',
        'fog': '雾天',
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
        'ready': 'info',
        'in_progress': 'warning',
        'completed': 'success',
        'failed': 'danger',
        '0': 'info',
        '1': 'warning',
        '2': 'success',
        '3': 'danger',
        'active': 'success',
        'inactive': 'danger',
        'pending': 'info'
      };
      
      return typeMap[status] || 'info';
    },
    
    // 格式化参与人员状态
    formatParticipantStatus(status) {
      const statusMap = {
        'ready': '准备就绪',
        'in_progress': '进行中',
        'completed': '已完成',
        'failed': '失败',
        '0': '准备就绪',
        '1': '进行中',
        '2': '已完成',
        '3': '失败',
        'active': '在线',
        'inactive': '离线',
        'pending': '待加入'
      };
      
      return statusMap[status] || '未知状态';
    },
    
    // 获取进度条状态
    getProgressStatus(percentage) {
      if (percentage < 30) {
        return 'exception';
      } else if (percentage < 70) {
        return '';
      } else {
        return 'success';
      }
    },
    
    // 获取任务人员配置
    fetchMissionMembers() {
      if (!this.taskId) {
        console.error('任务ID不存在，无法获取任务人员配置');
        return;
      }
      
      this.membersLoading = true;
      console.log('获取任务人员Id:',this.taskId)
      localStorage.setItem('MissionId',this.taskId)
      getMissionMembers(this.taskId)
        .then(response => {
          console.log('任务人员配置响应:', response);
          if (response && response.success) {
            // 处理人员数据
            if (response.data && Array.isArray(response.data)) {
              // 将API返回的人员数据映射到组件所需的格式
              this.taskData.participants = response.data.map(member => ({
                id: member.RoleId || '',
                SolidName: member.SolidName || '',
                TeamTypeEnName: member.TeamTypeEnName || '',
                RoleName: member.RoleName || '',
                status: 0, // 默认状态值
                joinTime: new Date().toISOString(),
                completionPercentage: 0 // 默认完成百分比
              }));
              
              // 更新参与人数
              this.taskData.participantsCount = this.taskData.participants.length;
            } else {
              this.taskData.participants = [];
              console.warn('任务人员数据格式不正确或为空');
            }
          } else {
            console.error('获取任务人员配置失败:', response?.msg || '未知错误');
          }
          this.membersLoading = false;
        })
        .catch(error => {
          console.error('获取任务人员配置请求失败:', error);
          this.membersLoading = false;
        });
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

/* 任务完成结算对话框样式 */
.settlement-dialog-content {
  padding: 20px;
  color: #fff;
}

.charts-container {
  margin-bottom: 30px;
}

.charts-container h3,
.team-comments-container h3,
.expert-comment-container h3,
.overall-score-container h3 {
  font-size: 18px;
  color: #c1ffff;
  margin-bottom: 15px;
  border-bottom: 1px solid #c1ffff;
  padding-bottom: 10px;
}

.charts-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.chart-item {
  width: 48%;
  background-color: #383D44;
  border-radius: 4px;
  padding: 15px;
}

.chart-item h4 {
  text-align: center;
  margin-bottom: 15px;
  color: #c1ffff;
}

.chart-placeholder {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie-chart {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: conic-gradient(#4CAF50 0% 30%, #2196F3 30% 55%, #FFC107 55% 75%, #F44336 75% 100%);
  position: relative;
}

.pie-chart::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background-color: #383D44;
  border-radius: 50%;
}

.line-chart {
  width: 100%;
  height: 180px;
  background-image: linear-gradient(to right, transparent 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  position: relative;
}

.line-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(45deg, transparent 49%, #c1ffff 49%, #c1ffff 51%, transparent 51%);
  background-size: 20px 20px;
}

.team-comments-container {
  margin-bottom: 30px;
}

.team-comments {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.team-comment-item {
  background-color: #383D44;
  border-radius: 4px;
  padding: 15px;
}

.team-comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.team-name {
  font-weight: bold;
  color: #c1ffff;
}

.team-score {
  color: #aaa;
  display: flex;
  align-items: center;
}

.team-score .el-input-number {
  margin-left: 8px;
}

::v-deep .el-input-number__decrease,
::v-deep .el-input-number__increase {
  background-color: #2c3e50;
  color: #c1ffff;
  border-color: #4e6e8e;
}

::v-deep .el-input-number__decrease:hover,
::v-deep .el-input-number__increase:hover {
  color: #fff;
}

::v-deep .el-input .el-input__inner,
::v-deep .el-input-number .el-input__inner {
  background-color: #383D44 !important;
  border-color: #4e6e8e !important;
  color: #FFC107 !important;
  font-weight: bold !important;
  text-align: center !important;
}

.team-comment-content {
  line-height: 1.5;
}

.team-comment-content ::v-deep .el-textarea__inner {
  background-color: #383D44 !important;
  border-color: #4e6e8e !important;
  color: #ddd !important;
}

.team-comment-content ::v-deep .el-textarea__inner:focus {
  border-color: #66b1ff !important;
}

.expert-comment-container {
  margin-bottom: 30px;
}

.expert-comment {
  background-color: #383D44;
  border-radius: 4px;
  padding: 15px;
}

.expert-comment ::v-deep .el-textarea__inner {
  background-color: #383D44 !important;
  border-color: #4e6e8e !important;
  color: #ddd !important;
}

.expert-comment ::v-deep .el-textarea__inner:focus {
  border-color: #66b1ff !important;
}

.overall-score-container {
  margin-bottom: 30px;
  text-align: center;
}

.overall-score {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.overall-score .el-input-number {
  width: 150px;
}

.overall-score ::v-deep .el-input-number .el-input__inner {
  background-color: #383D44;
  border-color: #4e6e8e;
  color: #4CAF50;
  font-weight: bold;
  font-size: 48px;
  text-align: center;
  height: 70px;
}

.score-max {
  font-size: 24px;
  color: #aaa;
  margin-left: 5px;
}

.settlement-footer {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.finalize-btn {
  padding: 12px 30px;
  font-size: 16px;
}

/* 按钮样式 */
::v-deep .el-button--primary {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
  color: #000!important;
}

::v-deep .el-button--primary:hover {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
}

::v-deep .el-button--primary:disabled {
  background-color: #a0cfff !important;
  border-color: #a0cfff !important;
  color: #fff !important;
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
::v-deep .el-textarea__inner {
  background-color: #383D44 !important;
  border-color: #4e6e8e !important;
  color: #ddd !important;
}
</style>
