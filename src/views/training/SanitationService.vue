<template>
  <div class="sanitation-service-container">
    <div class="section-header">
      <h2 style="color: #fff;">卫生勤务训练</h2>
    </div>

    <!-- 课程简介部分 -->
    <div class="section">
      <div class="section-title">
        <h3>课程简介</h3>
        <div class="arrow-down">↓</div>
      </div>
      <div class="section-content">
        <p class="course-intro">
          卫生勤务模块包括：战位急救和转运后送两部分
        </p>
      </div>
    </div>

    <!-- 图片讲解部分 - 战位急救 -->
    <div class="section">
      <div class="section-title">
        <div class="new-tag">🆕</div>
        <h3>图片讲解（图文并茂）- 战位急救</h3>
      </div>
      <div class="section-content">
        <div class="image-gallery">
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/sanitation-1.png" alt="战位急救训练图片1">
              <div class="image-caption">
                <p>伤员头部受伤流血、伤口皮肤外翻血淋淋效果</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/sanitation-2.png" alt="战位急救训练图片2">
              <div class="image-caption">
                <p>救护人员对伤员进行伤情评估和初步救治</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/sanitation-3.png" alt="战位急救训练图片3">
              <div class="image-caption">
                <p>多名救护人员协同对伤员进行战场急救</p>
              </div>
            </div>
          </div>
        </div>
        <div class="image-explanation">
          <h4 style="color: #fff;">战位急救科目：</h4>
          <p>在虚拟战场环境下，对伤员颅部、胸部、腹部、四肢的战创伤伤情模拟，以及对不同伤情下伤员的姿态和状态模拟。</p>
          <h5 style="color: #e0e0e0;">伤情模拟：</h5>
          <ul>
            <li>模拟伤员伤情种类渲染（颅部、胸腹部、肢体）</li>
            <li>伤员姿态渲染（动作、言语、体表）</li>
            <li>伤员头部受伤流血、伤口皮肤外翻血淋淋效果</li>
            <li>四肢有断肢大量出血等伤情</li>
            <li>伤员动作与体表伤情渲染</li>
            <li>伤员不同动作姿态、疼痛微弱呻吟、痛苦面部表情等</li>
          </ul>
          <h5 style="color: #e0e0e0;">战位急救操作流程：</h5>
          <ol>
            <li>救护人员通过询问、触摸、观察发现伤口伤情</li>
            <li>迅速采取止血措施</li>
            <li>完成伤口创面的包扎</li>
            <li>断裂肢体的固定捆扎</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- 图片讲解部分 - 转运后送 -->
    <div class="section">
      <div class="section-title">
        <div class="new-tag">🆕</div>
        <h3>图片讲解（图文并茂）- 转运后送</h3>
      </div>
      <div class="section-content">
        <div class="image-gallery">
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/sanitation-4.png" alt="转运后送训练图片1">
              <div class="image-caption">
                <p>救护人员在战场环境中搬运伤员</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/sanitation-5.png" alt="转运后送训练图片2">
              <div class="image-caption">
                <p>救护人员使用担架转运伤员</p>
              </div>
            </div>
          </div>
        </div>
        <div class="image-explanation">
          <h4 style="color: #fff;">转运后送科目：</h4>
          <p>模拟战时环境条件如爆炸、地形地貌、不同障碍物等情况，进行模拟伤员转运后送任务，参训人员担架抬运穿越模拟的战时火力封锁区环境，达到指定的运送地点。</p>
          <h5 style="color: #e0e0e0;">考核内容：</h5>
          <ul>
            <li>对参训人员担架抬运的平衡度指标进行考核</li>
            <li>评估训练人员在转运后送任务中的训练成绩</li>
          </ul>
          <h5 style="color: #e0e0e0;">转运后送操作流程：</h5>
          <ol>
            <li>救护人员取出担架并展开</li>
            <li>将担架放在伤员的伤侧</li>
            <li>救护人员手臂托起伤员的头、肩部、腰臀、下肢</li>
            <li>将伤员轻放于担架上固定好伤员</li>
            <li>然后抬担架转运后送，注意单兵姿态（提握动作、躬腰动作、跨步动作）</li>
            <li>两人协同抬担架保持平稳性</li>
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
  </div>
</template>

<script>
export default {
  name: 'SanitationService',
  data() {
    return {
      assessmentCriteria: [
        {
          item: '伤情判断准确性',
          standard: '正确识别伤员伤情类型和严重程度',
          score: '20分'
        },
        {
          item: '急救操作规范性',
          standard: '按照标准流程进行止血、包扎和固定',
          score: '25分'
        },
        {
          item: '急救操作时效性',
          standard: '在规定时间内完成急救操作',
          score: '15分'
        },
        {
          item: '转运动作协调性',
          standard: '担架抬运平稳，伤员固定牢固',
          score: '20分'
        },
        {
          item: '转运路线选择',
          standard: '选择合适路线，避开危险区域',
          score: '10分'
        },
        {
          item: '团队协作能力',
          standard: '团队成员配合默契，指令传达清晰',
          score: '10分'
        }
      ]
    };
  }
};
</script>

<style scoped>
.sanitation-service-container {
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


.el-table {
  margin-top: 15px;
  background-color: #2c3e50;
  color: #e0e0e0;
}

.el-table th {
  background-color: #505962;
  color: white;
}

.el-table td, .el-table th {
  padding: 12px 0;
}
@keyframes pulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
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
