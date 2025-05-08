<template>
  <div class="assessment-replay">
    <!-- 视频列表页面 -->
    <div v-if="!showVideoPlayer">
      
      <!-- 操作栏 -->
      <div class="action-bar">
        <div class="search-box">
          <el-input
          style="color: #c1ffff;"
            v-model="searchQuery"
            placeholder="搜索考核记录"
            prefix-icon="el-icon-search"
            clearable
            @input="handleSearch"
          ></el-input>
        </div>
        <div class="action-buttons">
          <el-button type="primary" @click="showUploadDialog" style="color: #000;">
            <i class="el-icon-upload"></i> 上传考核记录
          </el-button>
        </div>
      </div>
      
      <div class="content-box">
        <el-empty v-if="filteredVideos.length === 0" description="暂无考核记录"></el-empty>
        <div v-else class="video-grid">
          <div 
            v-for="video in filteredVideos" 
            :key="video.Id" 
            class="video-card"
          >
            <div class="video-thumbnail" @click="playVideo(video)">
              <!-- 使用视频的第一帧作为封面 -->
              <video :src="video.Url" preload="metadata"></video>
              <div class="play-icon">
                <i class="el-icon-video-play"></i>
              </div>
            </div>
            <div class="video-info">
              <div class="video-title">{{ video.OrgName }}</div>
              <div class="video-date">{{ formatDate(video.CreateTime) }}</div>
              <div class="video-actions">
                <el-button 
                  type="danger" 
                  size="mini" 
                  icon="el-icon-delete" 
                  circle
                  @click.stop="confirmDelete(video)"
                ></el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 视频播放页面 -->
    <div v-else class="video-player-container">
      <div class="player-header">
        <button class="back-button" @click="backToList">
          <i class="el-icon-arrow-left"></i> 返回
        </button>
        <h2>{{ currentVideo.OrgName }}</h2>
      </div>
      <div class="video-player">
        <video 
          ref="videoPlayer" 
          :src="currentVideo.Url" 
          controls 
          autoplay
          @ended="videoEnded"
        ></video>
      </div>
      <div class="assessment-data" v-if="currentVideo.assessmentData">
        <h3>考核数据分析</h3>
        <div class="data-grid">
          <div class="data-item">
            <div class="data-label">总体评分</div>
            <div class="data-value">{{ currentVideo.assessmentData.score || '暂无数据' }}</div>
          </div>
          <div class="data-item">
            <div class="data-label">完成时间</div>
            <div class="data-value">{{ currentVideo.assessmentData.completionTime || '暂无数据' }}</div>
          </div>
          <div class="data-item">
            <div class="data-label">操作准确率</div>
            <div class="data-value">{{ currentVideo.assessmentData.accuracy || '暂无数据' }}</div>
          </div>
          <div class="data-item">
            <div class="data-label">团队协作评分</div>
            <div class="data-value">{{ currentVideo.assessmentData.teamwork || '暂无数据' }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 上传视频对话框 -->
    <el-dialog
      title="上传考核记录"
      :visible.sync="uploadDialogVisible"
      width="500px"
      custom-class="upload-dialog"
      :modal="false">
      <!-- 自定义Num输入字段 -->
      <div class="custom-num-input">
        <el-form :model="uploadForm" label-width="100px">
          <el-form-item label="考核编号" required>
            <el-input 
              v-model="uploadForm.customNum" 
              placeholder="请输入考核编号"
              clearable
            ></el-input>
            <div class="el-form-item__tip">请输入唯一的考核编号</div>
          </el-form-item>
          
        </el-form>
      </div>
      
      <el-upload
        class="upload-container"
        drag
        action="#"
        :http-request="handleFileUpload"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :limit="1"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        accept=".mp4,.webm,.ogg"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传mp4/webm/ogg视频文件</div>
      </el-upload>
      <div class="upload-progress" v-if="uploading">
        <el-progress :percentage="uploadProgress" :stroke-width="15"></el-progress>
        <div class="progress-text">{{ uploadProgressText }}</div>
      </div>
      <span slot="footer" class="dialog-footer" style="    display: flex; justify-content: center;">
        <el-button @click="uploadDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload" :disabled="!hasFile || uploading" style="color: #000;">上传</el-button>
      </span>
    </el-dialog>
    
    <!-- 删除确认对话框 -->
    <el-dialog
      title="确认删除"
      :visible.sync="deleteDialogVisible"
      width="400px"
      custom-class="delete-dialog"
      :modal="false"
    >
      <div class="delete-confirm-content">
        <i class="el-icon-warning warning-icon"></i>
        <p>确定要删除考核记录 <span class="delete-filename">{{ deleteTarget ? deleteTarget.OrgName : '' }}</span> 吗？</p>
        <p class="delete-warning">此操作不可逆，请谨慎操作！</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="danger" @click="confirmDeleteFile">确认删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getFileList, uploadFile, deleteFile } from '@/api/file';

export default {
  name: "AssessmentReplay",
  data() {
    return {
      videoList: [],
      loading: false,
      showVideoPlayer: false,
      currentVideo: null,
      searchQuery: '',
      uploadDialogVisible: false,
      fileList: [],
      uploading: false,
      uploadProgress: 0,
      uploadProgressText: '',
      deleteDialogVisible: false,
      deleteTarget: null,
      uploadForm: {
        customNum: '', // 自定义Num值
      }
    };
  },
  computed: {
    filteredVideos() {
      if (!this.searchQuery) {
        return this.videoList;
      }
      const query = this.searchQuery.toLowerCase();
      return this.videoList.filter(video => {
        return video.OrgName.toLowerCase().includes(query);
      });
    },
    hasFile() {
      return this.fileList.length > 0;
    }
  },
  created() {
    this.fetchVideoList();
  },
  methods: {
    // 获取视频列表
    fetchVideoList() {
      this.loading = true;
      getFileList({ FileType: 5 }) // 使用FileType 5表示考核记录视频
        .then(response => {
          console.log('考核记录列表响应:', response);
          if (response && response.success) {
            // 如果返回的是单个对象，转换为数组
            if (response.data && !Array.isArray(response.data)) {
              this.videoList = [response.data];
            } else {
              this.videoList = response.data || [];
            }
            
            // 为每个视频添加模拟的考核数据
            this.videoList.forEach(video => {
              // 添加模拟的考核数据
              video.assessmentData = {
                score: Math.floor(Math.random() * 30) + 70, // 70-100之间的随机分数
                completionTime: `${Math.floor(Math.random() * 30) + 10}分钟`, // 10-40分钟的随机完成时间
                accuracy: `${Math.floor(Math.random() * 20) + 80}%`, // 80%-100%的随机准确率
                teamwork: Math.floor(Math.random() * 30) + 70 // 70-100之间的随机团队协作分数
              };
            });
          } else {
            this.$message.error(response?.msg || '获取考核记录列表失败');
          }
        })
        .catch(error => {
          console.error('获取考核记录列表失败:', error);
          this.$message.error('获取考核记录列表失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 播放视频
    playVideo(video) {
      this.currentVideo = video;
      this.showVideoPlayer = true;
    },
    
    // 返回列表
    backToList() {
      this.showVideoPlayer = false;
      this.currentVideo = null;
      // 如果有视频正在播放，停止它
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.pause();
      }
    },
    
    // 视频播放结束
    videoEnded() {
      console.log('视频播放结束');
      // 可以在这里添加视频结束后的逻辑
    },
    
    // 搜索处理
    handleSearch() {
      // 搜索逻辑已通过计算属性 filteredVideos 实现
    },
    
    // 显示上传对话框
    showUploadDialog() {
      this.uploadDialogVisible = true;
      this.fileList = [];
      this.uploading = false;
      this.uploadProgress = 0;
      this.uploadProgressText = '';
      this.uploadForm.customNum = ''; // 重置自定义Num值
    },
    
    // 上传前验证
    beforeUpload(file) {
      const isVideo = file.type.indexOf('video/') !== -1;
      const isLt500M = file.size / 1024 / 1024 < 500;
      
      if (!isVideo) {
        this.$message.error('只能上传视频文件!');
        return false;
      }
      if (!isLt500M) {
        this.$message.error('视频大小不能超过 500MB!');
        return false;
      }
      return true;
    },
    
    // 处理文件上传
    handleFileUpload({ file }) {
      // 将文件添加到列表中，但不立即上传
      this.fileList = [{ name: file.name, raw: file }];
      return false; // 阻止默认上传行为
    },
    
    // 处理超出文件数量限制
    handleExceed() {
      this.$message.warning('只能上传一个文件!');
    },
    
    // 处理移除文件
    handleRemove() {
      this.fileList = [];
    },
    
    // 提交上传
    submitUpload() {
      if (!this.fileList.length) {
        this.$message.warning('请选择要上传的文件!');
        return;
      }
      
      if (!this.uploadForm.customNum) {
        this.$message.warning('请输入考核编号!');
        return;
      }
      
      if (!this.uploadForm.name) {
        this.$message.warning('请输入考核名称!');
        return;
      }
      
      const file = this.fileList[0].raw;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('FileType', 5); // 使用FileType 5表示考核记录视频
      formData.append('Num', this.uploadForm.customNum); // 添加自定义Num值
      
      this.uploading = true;
      this.uploadProgress = 0;
      this.uploadProgressText = '准备上传...';
      
      // 模拟上传进度
      const progressInterval = setInterval(() => {
        if (this.uploadProgress < 90) {
          this.uploadProgress += Math.floor(Math.random() * 10) + 1;
          this.uploadProgressText = `上传中... ${this.uploadProgress}%`;
        }
      }, 300);
      
      uploadFile(formData)
        .then(response => {
          clearInterval(progressInterval);
          this.uploadProgress = 100;
          this.uploadProgressText = '上传完成!';
          
          if (response && response.success) {
            this.$message.success('考核记录上传成功!');
            this.uploadDialogVisible = false;
            this.fetchVideoList(); // 刷新视频列表
          } else {
            this.$message.error(response?.msg || '考核记录上传失败!');
          }
        })
        .catch(error => {
          clearInterval(progressInterval);
          console.error('考核记录上传失败:', error);
          this.$message.error('考核记录上传失败!');
        })
        .finally(() => {
          this.uploading = false;
        });
    },
    
    // 确认删除对话框
    confirmDelete(video) {
      this.deleteTarget = video;
      this.deleteDialogVisible = true;
    },
    
    // 确认删除文件
    confirmDeleteFile() {
      if (!this.deleteTarget) return;
      
      deleteFile({ Id: this.deleteTarget.Id })
        .then(response => {
          if (response && response.success) {
            this.$message.success('考核记录删除成功!');
            this.videoList = this.videoList.filter(v => v.Id !== this.deleteTarget.Id);
            this.deleteDialogVisible = false;
            this.deleteTarget = null;
          } else {
            this.$message.error(response?.msg || '考核记录删除失败!');
          }
        })
        .catch(error => {
          console.error('考核记录删除失败:', error);
          this.$message.error('考核记录删除失败!');
        });
    },
    
    // 格式化日期
    formatDate(dateString) {
      if (!dateString) return '';
      
      const date = new Date(dateString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
  }
};
</script>

<style scoped>
.assessment-replay {
  padding: 20px;
  height: 100%;
  background-color: #2e2e3a;
  color: #fff;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-box {
  width: 300px;
}

.content-box {
  background-color: #3a3a48;
  border-radius: 4px;
  padding: 20px;
  min-height: 500px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.video-card {
  background-color: #2e2e3a;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.2);
}

.video-thumbnail {
  position: relative;
  height: 150px;
  cursor: pointer;
  overflow: hidden;
}

.video-thumbnail video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.video-thumbnail:hover .play-icon {
  opacity: 1;
}

.video-info {
  padding: 10px;
}

.video-title {
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-date {
  font-size: 12px;
  color: #aaa;
  margin-bottom: 10px;
}

.video-actions {
  display: flex;
  justify-content: flex-end;
}

.video-player-container {
  height: 100%;
}

.player-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.back-button:hover {
  color: #409EFF;
}

.video-player {
  width: 100%;
  max-height: 70vh;
  background-color: #000;
  border-radius: 4px;
  overflow: hidden;
}

.video-player video {
  width: 100%;
  height: 100%;
  max-height: 70vh;
}

.assessment-data {
  margin-top: 20px;
  background-color: #3a3a48;
  border-radius: 4px;
  padding: 20px;
}

.assessment-data h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #c1ffff;
  border-left: 4px solid #c1ffff;
  padding-left: 10px;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
}

.data-item {
  background-color: #2e2e3a;
  padding: 15px;
  border-radius: 4px;
}

.data-label {
  font-size: 14px;
  color: #aaa;
  margin-bottom: 5px;
}

.data-value {
  font-size: 18px;
  font-weight: bold;
  color: #c1ffff;
}

/* 上传对话框样式 */
.upload-dialog {
  background-color: #505962;
  color: #fff;
}

.upload-dialog .el-dialog__title {
  color: #fff;
}

.upload-dialog .el-dialog__body {
  padding: 20px;
}

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-progress {
  margin-top: 20px;
}

.progress-text {
  text-align: center;
  margin-top: 10px;
  color: #c1ffff;
}


.delete-dialog {
  background-color: #3a3a48;
  color: #fff;
}

.delete-dialog .el-dialog__title {
  color: #fff;
}

.delete-confirm-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.warning-icon {
  font-size: 48px;
  color: #E6A23C;
  margin-bottom: 20px;
}

.delete-filename {
  font-weight: bold;
  color: #F56C6C;
}

.delete-warning {
  color: #F56C6C;
  margin-top: 10px;
}

/* 自定义Element UI样式 */
::v-deep .el-input__inner {
  background-color: #2e2e3a;
  border-color: #4a4a5a;
  color: #fff;
}

::v-deep .el-input__inner:focus {
  border-color: #c1ffff;
}

::v-deep .el-form-item__label {
  color: #fff;
}

::v-deep .el-upload-dragger {
  background-color: #2e2e3a;
  border-color: #4a4a5a;
}

::v-deep .el-upload-dragger:hover {
  border-color: #c1ffff;
}

::v-deep .el-upload__text {
  color: #fff;
}

::v-deep .el-upload__tip {
  color: #aaa;
}
.action-buttons{
  color: #000;
}
::v-deep .el-input__icon {
  color: #c1ffff;
}
</style>
