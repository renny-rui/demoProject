<template>
  <div class="content-management">
    <!-- 视频列表页面 -->
    <div v-if="!showVideoPlayer">
      
      <!-- 操作栏 -->
      <div class="action-bar">
        <div class="search-box">
          <el-input
            v-model="searchQuery"
            placeholder="搜索视频名称"
            prefix-icon="el-icon-search"
            clearable
            @input="handleSearch"
          ></el-input>
        </div>
        <div class="action-buttons">
          <el-button type="primary" @click="showUploadDialog">
            <i class="el-icon-upload"></i> 上传视频
          </el-button>
        </div>
      </div>
      
      <div class="content-box">
        <el-empty v-if="filteredVideos.length === 0" description="暂无视频"></el-empty>
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
    </div>
    
    <!-- 上传视频对话框 -->
    <el-dialog
      title="上传视频"
      :visible.sync="uploadDialogVisible"
      width="500px"
      custom-class="upload-dialog"
     :modal="false">
      <!-- 自定义Num输入字段 -->
      <div class="custom-num-input">
        <el-form :model="uploadForm" label-width="100px">
          <el-form-item label="自定义编号" required>
            <el-input 
              v-model="uploadForm.customNum" 
              placeholder="请输入自定义编号"
              clearable
            ></el-input>
            <div class="el-form-item__tip">请输入唯一的自定义编号</div>
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload" :disabled="!hasFile || uploading">上传</el-button>
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
        <p>确定要删除视频 <span class="delete-filename">{{ deleteTarget ? deleteTarget.OrgName : '' }}</span> 吗？</p>
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
  name: "ContentManagement",
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
        customNum: '' // 自定义Num值
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
      getFileList({ FileType: 4 })
        .then(response => {
          console.log('视频列表响应:', response);
          if (response && response.success) {
            // 如果返回的是单个对象，转换为数组
            if (response.data && !Array.isArray(response.data)) {
              this.videoList = [response.data];
            } else {
              this.videoList = response.data || [];
            }
          } else {
            this.$message.error(response?.msg || '获取视频列表失败');
          }
        })
        .catch(error => {
          console.error('获取视频列表失败:', error);
          this.$message.error('获取视频列表失败');
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
      // 这里只是将文件添加到fileList，不实际上传
      // 实际上传在点击上传按钮时进行
      this.fileList = [{ name: file.name, raw: file }];
      return false; // 阻止默认上传行为
    },
    
    // 处理超出文件数限制
    handleExceed() {
      this.$message.warning('只能上传一个视频文件');
    },
    
    // 处理移除文件
    handleRemove() {
      this.fileList = [];
    },
    
    // 提交上传
    submitUpload() {
      if (this.fileList.length === 0) {
        this.$message.warning('请先选择要上传的视频文件');
        return;
      }
      
      // 验证自定义Num是否填写
      if (!this.uploadForm.customNum) {
        this.$message.warning('请输入自定义编号');
        return;
      }
      
      const file = this.fileList[0].raw;
      this.uploading = true;
      this.uploadProgress = 0;
      this.uploadProgressText = '准备上传...';
      
      // 模拟上传进度
      const progressInterval = setInterval(() => {
        if (this.uploadProgress < 90) {
          this.uploadProgress += Math.floor(Math.random() * 10);
          if (this.uploadProgress > 90) this.uploadProgress = 90;
          this.uploadProgressText = `上传中 ${this.uploadProgress}%`;
        }
      }, 500);
      
      // 调用上传API
      // 确保将Num参数作为字符串传递
      const numValue = String(this.uploadForm.customNum);
      console.log('上传参数:', { file: file.name, Num: numValue, type: typeof numValue });
      uploadFile(file, numValue) // 传递自定义Num值
        .then(response => {
          clearInterval(progressInterval);
          this.uploadProgress = 100;
          this.uploadProgressText = '上传完成';
          
          if (response && response.success) {
            this.$message.success('视频上传成功');
            // 重新获取视频列表
            this.fetchVideoList();
            // 关闭对话框
            setTimeout(() => {
              this.uploadDialogVisible = false;
              this.uploading = false;
              this.fileList = [];
            }, 1000);
          } else {
            this.$message.error(response?.msg || '视频上传失败');
            this.uploading = false;
          }
        })
        .catch(error => {
          clearInterval(progressInterval);
          console.error('视频上传失败:', error);
          this.$message.error('视频上传失败');
          this.uploading = false;
          this.uploadProgress = 0;
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

      console.log('删除视频：',this.deleteTarget)
      
      deleteFile(this.deleteTarget.Num)
        .then(response => {
          if (response && response.success) {
            this.$message.success('视频删除成功');
            // 从列表中移除该视频
            this.videoList = this.videoList.filter(v => v.Num !== this.deleteTarget.Num);
            this.deleteDialogVisible = false;
            this.deleteTarget = null;
          } else {
            this.$message.error(response?.msg || '视频删除失败');
          }
        })
        .catch(error => {
          console.error('视频删除失败:', error);
          this.$message.error('视频删除失败');
        });
    }
  }
};
</script>

<style scoped>
.content-management {
  padding: 20px;
  background-color: #7B8B9B;
  min-height: 100vh;
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
  background-color: #505962;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

/* 视频网格样式 */
.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
}

.video-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #fff;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.video-thumbnail {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
  background-color: #000;
  overflow: hidden;
}

.video-thumbnail video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none; /* 防止在缩略图上点击视频 */
}

.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.video-card:hover .play-icon {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1.1);
}

.video-info {
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-title {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 10px;
}

.video-actions {
  display: flex;
  gap: 5px;
}

/* 视频播放器样式 */
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

h1 {
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
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

/* 删除对话框样式 */
.delete-dialog {
  background-color: #505962;
  color: #fff;
}

.delete-dialog .el-dialog__title {
  color: #fff;
}

.delete-confirm-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.warning-icon {
  font-size: 48px;
  color: #E6A23C;
  margin-bottom: 20px;
}

.delete-filename {
  font-weight: bold;
  color: #c1ffff;
}

.delete-warning {
  color: #F56C6C;
  margin-top: 10px;
}

/* 覆盖Element UI样式 */
::v-deep .el-upload-dragger {
  background-color: #383D44;
  border: 1px dashed #c1ffff;
}

::v-deep .el-upload-dragger:hover {
  border-color: #409EFF;
}

::v-deep .el-upload__text {
  color: #ddd;
}

::v-deep .el-upload__tip {
  color: #aaa;
}

::v-deep .el-button--danger {
  background-color: #F56C6C;
  border-color: #F56C6C;
}

::v-deep .el-button--primary {
  background-color: #c1ffff;
  border-color: #c1ffff;
  color: #000;
}

::v-deep .el-button--primary:hover {
  background-color: #a0e0e0;
  border-color: #a0e0e0;
}

::v-deep .el-input__inner {
  background-color: #383D44;
  border-color: #4e6e8e;
  color: #fff;
}

::v-deep .el-input__inner:focus {
  border-color: #c1ffff;
}

::v-deep .el-input__icon {
  color: #c1ffff;
}
</style>
