<template>
  <div class="supply-service-container">
    <div class="section-header">
      <h2 style="color: #fff;">热食制作训练</h2>
    </div>

    <!-- 课程简介部分 -->
    <div class="section">
      <div class="section-title">
        <h3>课程简介</h3>
        <div class="arrow-down">↓</div>
      </div>
      <div class="section-content">
        <p class="course-intro">
          热食制作任务考核内容：主要为隐蔽性考核，考核热食制作过程中产生的烟量、红外、声光等隐蔽性指标进行评估并得出考核成绩，过高则会产生作业暴漏风险。
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
              <img src="../../assets/images/supply-1.png" alt="热食制作训练图片1">
              <div class="image-caption">
                <p>炊事班到达指定战位，从野战给养器材单元箱取出折叠支架和行军锅展开</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/supply-2.png" alt="热食制作训练图片2">
              <div class="image-caption">
                <p>取出燃烧器并组装完成</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/supply-3.png" alt="热食制作训练图片3">
              <div class="image-caption">
                <p>向燃料罐中添加燃料至标线</p>
              </div>
            </div>
          </div>
          
        </div>
        <div class="image-explanation">
          <h4 style="color: #fff;">操作流程说明：</h4>
          <p>炊事班到达指定战位，从野战给养器材单元箱取出折叠支架和行军锅展开。引燃燃烧器操作过程：</p>
          <ol>
            <li>取出燃烧器并组装完成。</li>
            <li>向燃料罐中添加燃料至标线。</li>
            <li>连接好燃料罐与燃烧器之间的输油胶管。</li>
            <li>使用打气筒向燃料罐中打气加压。</li>
            <li>打开燃料罐上的出油阀旋钮，引燃燃烧器内的传火布。</li>
            <li>将燃烧器放入灶内。</li>
            <li>调整出油阀旋钮调节火焰大小。</li>
          </ol>
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
      <h2 style="color: #fff;">热食前送训练</h2>
    </div>

    <!-- 课程简介部分 -->
    <div class="section">
      <div class="section-title">
        <h3>课程简介</h3>
        <div class="arrow-down">↓</div>
      </div>
      <div class="section-content">
        <p class="course-intro">
          热食前送任务考核内容：模拟战时环境条件如爆炸、地形地貌、不同障碍物等情况，进行模拟保障运送，单兵负重热食穿越模拟的战时火力封锁区环境，达到指定的配送地点，对参训人员任务进行中的提握动作、躬腰动作、跨步动作进行评估并得出训练成绩。
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
              <img src="../../assets/images/supply-4.png" alt="热食制作训练图片1">
              <div class="image-caption">
                <p>单兵提握/背负动作姿态
                </p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/supply-5.png" alt="热食制作训练图片2">
              <div class="image-caption">
                <p>单兵躬腰动作姿态
                </p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/supply-6.png" alt="热食制作训练图片3">
              <div class="image-caption">
                <p>单兵跨步动作姿态
                </p>
              </div>
            </div>
          </div>
          
        </div>
        <div class="image-explanation">
          <h4 style="color: #fff;">操作流程说明：</h4>
          <p>热食前送训练要求单兵在模拟战时环境下完成热食配送任务，需掌握以下关键动作姿态：</p>
          <ol>
            <li>提握/背负动作姿态：保持上身挺直，双手平稳提握保温食品箱，或使用背带正确背负，确保热食容器稳固不晃动。</li>
            <li>躬腰动作姿态：通过降低身体重心，减小暴露面积，同时保持热食容器平稳，避免内容物溢出。</li>
            <li>跨步动作姿态：迈步时保持重心稳定，跨越障碍物时注意保持平衡，确保热食安全送达。</li>
          </ol>
          <p>训练评估重点关注单兵在各类复杂地形和模拟战时环境下的机动性、稳定性和任务完成效率。</p>
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
  name: 'SupplyService',
  data() {
    return {
      isPlaying: false,
      assessmentCriteria: [
        { item: '烟量控制', standard: '制作过程中产生的烟量应控制在最小范围内，避免暴露位置', score: '25分' },
        { item: '红外特征', standard: '热源产生的红外特征应尽量降低，使用遮挡措施减少热辐射', score: '25分' },
        { item: '声音控制', standard: '操作过程中应尽量减少噪音，避免引起敌方注意', score: '20分' },
        { item: '光源控制', standard: '夜间作业时应严格控制光源泄露，使用遮光设备', score: '20分' },
        { item: '作业效率', standard: '在保证隐蔽性的前提下，尽可能高效完成热食制作任务', score: '10分' }
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
.supply-service-container {
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
  color: #fff;
  font-weight: bold;
}

.section {
  margin-bottom: 40px;
  background-color: #383d44;
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
  border: 1px solid #505962;
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
  color: #fff;
}

.image-explanation p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.image-explanation ol {
  padding-left: 20px;
}

.image-explanation li {
  margin-bottom: 10px;
  line-height: 1.6;
}

.assessment-criteria h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #fff;
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
