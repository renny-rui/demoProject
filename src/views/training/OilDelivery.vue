<template>
  <div class="oil-delivery-container">
    <div class="section-header">
      <h2 style="color: #fff;">油料前送训练</h2>
    </div>

    <!-- 课程简介部分 -->
    <div class="section">
      <div class="section-title">
        <h3>课程简介</h3>
        <div class="arrow-down">↓</div>
      </div>
      <div class="section-content">
        <p class="course-intro">
          野战油料前送考核内容：参训人员在虚拟的战场环境穿越不同障碍物、利用虚拟战场中的地形地貌躲避如炮弹爆炸、敌人射击等危险，进行交替掩护前进，到达指定任务地点。在执行任务的过程中考核单兵的提握动作、躬腰动作、跨步动作等运动姿态，同时考核所提油料扁桶的离地高度等平衡性指标，最终评估出油料前送任务完成的训练成绩。
        </p>
      </div>
    </div>

    <!-- 视频播放部分 -->
    <!-- <div class="section">
      <div class="section-title">
        <h3>视频播放</h3>
        <div class="arrow-down">↓</div>
      </div>
      <div class="section-content">
        <div class="video-container">
          <video 
            ref="videoPlayer" 
            class="video-player" 
            controls 
            @ended="videoEnded"
            poster="/static/images/video-poster.jpg">
            <source src="/static/videos/oil-delivery-training.mp4" type="video/mp4">
            您的浏览器不支持视频播放
          </video>
          <div class="video-controls">
            <el-button type="primary" @click="playVideo" :disabled="isPlaying">播放</el-button>
            <el-button type="info" @click="pauseVideo" :disabled="!isPlaying">暂停</el-button>
            <el-button type="warning" @click="restartVideo">重新播放</el-button>
          </div>
        </div>
      </div>
    </div> -->

    <!-- 图片讲解部分 -->
    <div class="section">
      <div class="section-title">
        <div class="new-tag">🆕</div>
        <h3>图片讲解（图文并茂）</h3>
      </div>
      <div class="section-content">
        <div class="image-gallery">
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-1.png" alt="油料前送训练图片1">
              <div class="image-caption">
                <p>单兵运动姿态-提握动作</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-2.png" alt="油料前送训练图片2">
              <div class="image-caption">
                <p>单兵运动姿态-躬腰动作</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-3.png" alt="油料前送训练图片3">
              <div class="image-caption">
                <p>单兵运动姿态-跨步动作</p>
              </div>
            </div>
          </div>
        </div>
        <div class="image-explanation">
          <h4 style="color: #fff;">训练要点说明：</h4>
          <ul>
            <li><strong>提握动作：</strong> 双手握住油桶把手，手臂自然下垂，保持上身挺直</li>
            <li><strong>躬腰动作：</strong> 适当弯曲腰部，降低重心，提高稳定性</li>
            <li><strong>跨步动作：</strong> 步伐稳健，保持油桶平衡，避免剧烈晃动</li>
            <li><strong>平衡控制：</strong> 油桶离地高度保持在20-30厘米，避免拖地或过高</li>
            <li><strong>战术移动：</strong> 根据地形选择合适路线，利用掩体，交替掩护前进</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 训练评估部分 -->
    <div class="section">
      <div class="section-title">
        <h3 style="color: #fff;">训练评估</h3>
      </div>
      <div class="section-content">
        <div class="assessment-criteria">
          <h4 style="color: #fff;">评估标准：</h4>
          <el-table :data="assessmentCriteria" border style="width: 100%">
            <el-table-column prop="item" label="评估项目" width="180"></el-table-column>
            <el-table-column prop="standard" label="标准要求"></el-table-column>
            <el-table-column prop="score" label="分值" width="100"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="section-header">
      <h2 style="color: #fff;">油料加注训练</h2>
    </div>

    <!-- 课程简介部分 -->
    <div class="section">
      <div class="section-title">
        <h3>课程简介</h3>
        <div class="arrow-down">↓</div>
      </div>
      <div class="section-content">
        <p class="course-intro">
          油罐车加油考核内容：考核单兵在虚拟战场环境中进行油管的拉管动作、插管动作、收管动作等运动姿态，评估是否快速准确的完成任务，最终得出训练成绩。
协同操作考核：模拟在战场环境中的协同加油作业，当加油员完成拉管和插管动作后加油观察员给出开始加油的指令，此时负责开关油泵的训练人员应立即开启油泵；当车辆油箱即将加满，加油观察员给出停止加油的指令时，负责开关油泵的训练人员应立即关闭油泵，同时加油员负责收管。在以上的协同任务中考核参训人员接收指令的响应速度并评估出训练成绩。

        </p>
      </div>
    </div>

    <!-- 图片讲解部分 -->
    <div class="section">
      <div class="section-title">
        <div class="new-tag">🆕</div>
        <h3>图片讲解（图文并茂）</h3>
      </div>
      <div class="section-content">
        <div class="image-gallery">
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-4.png" alt="油料前送训练图片1">
              <div class="image-caption">
                <p>拉管作业人员取下加油枪，拉动加油管跑步到达战车指定地点</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-5.png" alt="油料前送训练图片2">
              <div class="image-caption">
                <p>拉管作业人员取下加油枪，拉动加油管跑步到达战车指定地点</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-6.png" alt="油料前送训练图片3">
              <div class="image-caption">
                <p>战车士兵打开加油盖，将加油枪插入加油口</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-7.png" alt="油料前送训练图片3">
              <div class="image-caption">
                <p>油泵作业人员启泵，打开油路阀门</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-8.png" alt="油料前送训练图片3">
              <div class="image-caption">
                <p>战车士兵收到启泵完成指令，按动加油枪加油并观察，给出“油已加满”或“停止加油”指令
                </p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-9.png" alt="油料前送训练图片3">
              <div class="image-caption">
                <p>油泵作业人员收到“油已加满”或“停止加油”指令，进行关泵操作（关闭阀门动作）
                </p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/oil-delivery-10.png" alt="油料前送训练图片3">
              <div class="image-caption">
                <p>拉管作业人员收管操作
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="image-explanation">
          <h4 style="color: #fff;">训练要点说明：</h4>
          <ul>
            <li><strong>拉管动作：</strong> 双手握住油管，保持适当张力，避免油管扭曲或折叠</li>
            <li><strong>插管动作：</strong> 对准油箱口，稳定插入，确保密封良好，防止漏油</li>
            <li><strong>收管动作：</strong> 关闭油泵后，轻柔拔出油管，避免残油滴漏</li>
            <li><strong>协同配合：</strong> 加油员与油泵操作员保持良好沟通，确保指令传达清晰</li>
            <li><strong>安全防护：</strong> 全程注意周围环境，保持警惕，防止意外发生</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 训练评估部分 -->
    <div class="section">
      <div class="section-title">
        <h3 style="color: #fff;">训练评估</h3>
      </div>
      <div class="section-content">
        <div class="assessment-criteria">
          <h4 style="color: #fff;">评估标准：</h4>
          <el-table :data="assessmentCriteria" border style="width: 100%">
            <el-table-column prop="item" label="评估项目" width="180"></el-table-column>
            <el-table-column prop="standard" label="标准要求"></el-table-column>
            <el-table-column prop="score" label="分值" width="100"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'OilDelivery',
  data() {
    return {
      isPlaying: false,
      assessmentCriteria: [
        { item: '提握动作', standard: '双手握住油桶把手，手臂自然下垂，保持上身挺直', score: '20分' },
        { item: '躬腰动作', standard: '适当弯曲腰部，降低重心，提高稳定性', score: '20分' },
        { item: '跨步动作', standard: '步伐稳健，保持油桶平衡，避免剧烈晃动', score: '20分' },
        { item: '平衡控制', standard: '油桶离地高度保持在20-30厘米，避免拖地或过高', score: '20分' },
        { item: '任务完成时间', standard: '在规定时间内完成任务，到达指定地点', score: '20分' }
      ]
    };
  },
  methods: {
    playVideo() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.play();
        this.isPlaying = true;
      }
    },
    pauseVideo() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.pause();
        this.isPlaying = false;
      }
    },
    restartVideo() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.currentTime = 0;
        this.$refs.videoPlayer.play();
        this.isPlaying = true;
      }
    },
    videoEnded() {
      this.isPlaying = false;
    }
  }
};
</script>

<style scoped>
.oil-delivery-container {
  padding: 20px;
  background-color: #7B8B9B;
  color: #fff;
}

.section-header {
  margin-bottom: 30px;
  text-align: center;
}

.section-header h2 {
  font-size: 28px;
  color: #303133;
  font-weight: bold;
}

.section {
  margin-bottom: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-title {
  position: relative;
  padding: 15px 20px;
  background-color: #505962;
  color: #fff;
  display: flex;
  align-items: center;
}

.section-title h3 {
  margin: 0;
  font-size: 20px;
}

.arrow-down {
  margin-left: 15px;
  font-size: 24px;
  font-weight: bold;
}

.new-tag {
  margin-right: 10px;
  font-size: 20px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

.section-content {
  padding: 20px;
  background-color: #383d44;
}

.course-intro {
  font-size: 16px;
  line-height: 1.8;
  text-indent: 2em;
}

.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-player {
  width: 100%;
  max-width: 800px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.video-controls {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.image-item {
  flex: 1;
  min-width: 300px;
}

.image-container {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
}

.image-caption {
  padding: 10px;
  background-color: #505962;
  font-size: 14px;
}

.image-explanation {
  margin-top: 20px;
  padding: 15px;
  background-color: #505962;
  border-radius: 4px;
}

.image-explanation h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
}

.image-explanation ul {
  padding-left: 20px;
}

.image-explanation li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.assessment-criteria h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #303133;
}

@media (max-width: 768px) {
  .image-gallery {
    flex-direction: column;
  }
  
  .image-item {
    min-width: 100%;
  }
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
</style>
