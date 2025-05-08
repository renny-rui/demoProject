<template>
  <div class="user-info-container">
    <div class="page-header">
    </div>

    <div style="background-color:#505962 ; border-radius: 4px;">

      <div style="padding: 20px 20px 0 20px;">
        <el-table :data="tableData" style="width: 100%" border >
          <el-table-column prop="SolidName" label="战士姓名" align="center" />
          <el-table-column prop="TeamTypeEnName" label="分组" align="center" />

          <el-table-column prop="RoleName" label="科目角色" align="center" />


          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDetail(scope.row)" class="edit-btn">
                <i class="el-icon-document"></i> 场景实操
              </el-button>

            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination @current-change="handleCurrentChange" :current-page="CurrentPage" :page-size="PerPageCount"
            layout="prev, pager, next" :total="total" class="custom-pagination">
          </el-pagination>
        </div>

      </div>



    </div>
    
    <el-dialog title="场景实操" :visible.sync="scenePracticalDialogVisible" width="70%" :modal="false" :before-close="closeDialog" custom-class="scene-practical-dialog">
      <div  class="video-player-container">
      <div class="player-header">
        <button class="back-button" @click="backToList">
          <i class="el-icon-arrow-left"></i> 返回
        </button>
      </div>
      <div class="video-player">
        <video 
          ref="videoPlayer" 
          controls 
          autoplay
        ></video>
      </div>
    </div>
    </el-dialog>

  </div>
</template>

<script>

import { getMissionMembers, getMissionLastList } from '@/api/mission';
export default {
  name: "ScenePracticalManagement",
  data() {
    return {
      CurrentPage: 1,
      PerPageCount: 10,
      total: 0,
      selectedRows: [],
      dialogVisible: false,
      dialogTitle: '新增人员',
      showCharts: false,
      selectedGradeIndex: -1,
      selectedGradeItem: null,
      chartsInitialized: false,

      tableData: [],
      loading: false,
      MissionId: null,
      // 确保初始值为false
      scenePracticalDialogVisible: false,
      // 添加当前选中的行数据
      currentRow: null
    }
  },
  created() {



  },
  mounted() {
    // 加载人员列表数据 - 先获取最新任务ID，然后再获取任务人员列表
    this.fetchMissionLastList();
    // 不再直接调用getMissionList，而是在fetchMissionLastList成功后调用
  },

  methods: {
    // 获取最新任务列表
  async fetchMissionLastList() {
      getMissionLastList()
        .then(response => {
          if (response && response.success) {
            this.MissionId = response.data.MissionLib.MissionId
            
            // 获取到MissionId后，调用getMissionList获取任务人员列表
            this.getMissionList();
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

    async  getMissionList() {
      getMissionMembers(this.MissionId)
        .then(response => {
          console.log('任务人员配置响应:', response);
          if (response && response.success) {
            // 处理人员数据
            if (response.data && Array.isArray(response.data)) {
              // 将API返回的人员数据映射到组件所需的格式
              this.tableData = response.data.map(member => ({
                id: member.RoleId || '',
                SolidName: member.SolidName || '',
                TeamTypeEnName: member.TeamTypeEnName || '',
                RoleName: member.RoleName || '',
               
              }));

            } else {
              this.taskData.participants = [];
              console.warn('任务人员数据格式不正确或为空');
            }
          } else {
            console.error('获取任务人员配置失败:', response?.msg || '未知错误');
          }
        })
        .catch(error => {
          console.error('获取任务人员配置请求失败:', error);
        });
    },
    handleDetail(row) {
      // 存储当前选中的行
      this.currentRow = row;
      console.log('点击场景实操按钮', row);
      
      // 重置对话框状态并打开
      this.$nextTick(() => {
        // 先确保对话框是关闭的，然后再打开
        this.scenePracticalDialogVisible = false;
        
        // 使用setTimeout确保在下一个事件循环中打开对话框
        setTimeout(() => {
          this.scenePracticalDialogVisible = true;
          console.log('对话框已打开:', this.scenePracticalDialogVisible);
        }, 0);
      });
    },
    
    // 关闭对话框
    closeDialog() {
      console.log('关闭对话框');
      this.scenePracticalDialogVisible = false;
      
      // 重置视频播放器状态 - 使用nextTick确保在DOM更新后操作
      this.$nextTick(() => {
        if (this.$refs.videoPlayer) {
          this.$refs.videoPlayer.pause();
          this.$refs.videoPlayer.currentTime = 0;
        }
      });
    },
    
    // 返回列表
    backToList() {
      this.closeDialog(); // 复用closeDialog方法确保一致的关闭行为
    },
    handleSizeChange(val) {
      this.CurrentPage = val;
      this.fetchMissionLastList();
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.fetchMissionLastList();
    },





  }
};
</script>

<style scoped>
.grades-management {
  padding: 20px;
}

.content-box {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
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

.video-player-container {
  background-color: #505962;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.player-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: #505962;
  border-bottom: 1px solid #e6e6e6;
}

.back-button {
  background: none;
  border: none;
  color: #c1ffff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-right: 15px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: rgba(64, 158, 255, 0.1);
}

.back-button i {
  margin-right: 5px;
}

.player-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
  flex: 1;
}

.video-player {
  width: 100%;
  background-color: #000;
}

.video-player video {
  width: 100%;
  max-height: calc(100vh - 150px);
  display: block;
}

/* 场景实操对话框样式 */
::v-deep .scene-practical-dialog {
  margin: 5vh auto !important;
  height: 60vh;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

::v-deep .scene-practical-dialog .el-dialog__header {
  background-color: #505962;
  padding: 15px 20px;
}

::v-deep .scene-practical-dialog .el-dialog__title {
  color: #c1ffff;
  font-size: 18px;
}

::v-deep .scene-practical-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #c1ffff;
}

::v-deep .scene-practical-dialog .el-dialog__body {
  padding: 0;
  flex: 1;
  overflow: auto;
  background-color: #505962;
}
</style>

<style>
/* 全局样式，不使用scoped */
.user-form-dialog-top .el-dialog {
  margin-top: 5vh !important;
  margin-bottom: 5vh !important;
  height: 90vh !important;
  display: flex;
  flex-direction: column;
  background-color: #2c3e50;
  color: #fff;
}

.user-form-dialog-top .el-dialog__body {
  flex: 1;
  overflow: hidden;
  padding: 0;
  background-color: #2c3e50;
}

.user-form-dialog-top .el-dialog__header {
  background-color: #505962;
  padding: 15px 20px;
}

.user-form-dialog-top .el-dialog__title {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.user-form-dialog-top .el-card {
  background-color: #505962;
  color: #fff;
  border: none;
  margin-bottom: 15px;
}

.user-form-dialog-top .el-card__body {
  padding: 15px;
}

.user-form-dialog-top .section-title h3 {
  color: #fff;
  font-size: 18px;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #606f7b;
}

.user-form-dialog-top .chart {
  height: 250px;
}
</style>