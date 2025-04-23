<template>
  <div class="equipment-repair-container">
    <div class="section-header">
      <h2 style="color: #fff;">装备抢修训练</h2>
    </div>

    <!-- 课程简介部分 -->
    <div class="section">
      <div class="section-title">
        <h3>课程简介</h3>
        <div class="arrow-down">↓</div>
      </div>
      <div class="section-content">
        <p class="course-intro">
          装备抢修业务主要基于05式两栖装甲车进行业务抢修。
        </p>
      </div>
    </div>

    <!-- 图片讲解部分 - 装备故障 -->
    <div class="section">
      <div class="section-title">
        <div class="new-tag">🆕</div>
        <h3>图片讲解（图文并茂）</h3>
      </div>
      <div class="section-content">
        <div class="image-gallery">
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/equipment-1.png" alt="装备抢修训练图片1">
              <div class="image-caption">
                <p>发动机舱内部结构</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/equipment-2.png" alt="装备抢修训练图片2">
              <div class="image-caption">
                <p>散热器及冷却系统</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/equipment-3.png" alt="装备抢修训练图片3">
              <div class="image-caption">
                <p>燃油喷射系统</p>
              </div>
            </div>
          </div>
        </div>

        <div class="image-explanation">
          <h4 style="color: #fff;">主要故障类型：</h4>
          <p>装甲车辆和轮式车辆主要故障包括蓄电池电量不足的故障、油路进气的故障、供油不足的故障、供气不足的故障、蓄电池到辅助蓄电池连线断路的故障等装备抢修。</p>
          
          <h5 style="color: #e0e0e0;">1. 蓄电池电量不足的故障检查及维修处理</h5>
          <p><strong>故障现象：</strong>按下起动开关，只听到起动电机继电器吸合的"啪"的一声，发动机不转或转速很低，不能起动。</p>
          <p><strong>检查方法：</strong>通过主仪表板上的电压表检查蓄电池电压是否达到17伏以上。</p>
          <p><strong>维修处理：</strong>如果达不到则需要更换蓄电池解决故障。</p>
          
          <h5 style="color: #e0e0e0;">2. 油路进气的故障检查及维修处理</h5>
          <p><strong>故障现象：</strong>按下起动开关发动机能达到起动转速，但发动机排烟口有排烟但只有断续爆发声，发动机不能起动。</p>
          <p><strong>检查方法：</strong>经检查发现在柴油冒出的同时带有气泡，说明是油路进气导致的发动机启动转速不足。</p>
          <p><strong>维修处理：</strong>需要接通电动燃油泵开关，观察排气孔无气泡冒出后，拧紧排气螺栓解决故障。</p>
        </div>
      </div>
    </div>

    <!-- 图片讲解部分 - 更多故障 -->
    <div class="section">
      <div class="section-title">
        <div class="new-tag">🆕</div>
        <h3>更多故障类型及处理方法</h3>
      </div>
      <div class="section-content">
        <div class="image-gallery">
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/equipment-4.png" alt="装备抢修训练图片4">
              <div class="image-caption">
                <p>军人检修装甲车发动机</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/equipment-5.png" alt="装备抢修训练图片5">
              <div class="image-caption">
                <p>检修装甲车底盘</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/equipment-6.png" alt="装备抢修训练图片6">
              <div class="image-caption">
                <p>装甲车维修作业</p>
              </div>
            </div>
          </div>
        </div>

        <div class="image-explanation">
          <h5 style="color: #e0e0e0;">3. 供油不足的故障检查及维修处理</h5>
          <p><strong>故障现象：</strong>发动机启动后功率不足达不到最高空转转速（2350转/分）。</p>
          <p><strong>检查方法：</strong>经检查发现发动机工作时无明显排黑烟且通过摇手摇泵或接通电动燃油泵开关，功率不足的现象有所改善。</p>
          <p><strong>维修处理：</strong>需更换燃油滤芯解决故障。</p>
          
          <h5 style="color: #e0e0e0;">4. 供气不足的故障检查及维修处理</h5>
          <p><strong>故障现象：</strong>发动机启动后功率不足达不到最高空转转速（2350转/分）。</p>
          <p><strong>检查方法：</strong>经检查发现发动机起动初期排白烟，之后排黑烟。</p>
          <p><strong>维修处理：</strong>需要更换空气滤清器解决故障。</p>
          
          <h5 style="color: #e0e0e0;">5. 蓄电池到辅助蓄电池连线断路的故障检查及维修处理</h5>
          <p><strong>故障现象：</strong>发动机工作过程中，在油门踏板位置及负荷不变的情况下，发动机转速忽高忽低，发动机转速不稳。</p>
          <p><strong>检查方法：</strong>经检查蓄电池到辅助蓄电池连线断路。</p>
          <p><strong>维修处理：</strong>需重新连接蓄电池到辅助蓄电池的连线来解决故障。</p>
        </div>
      </div>
    </div>

    <!-- 图片讲解部分 - 更多故障 -->
    <div class="section">
      <div class="section-title">
        <h3>维修工具及设备</h3>
      </div>
      <div class="section-content">
        <div class="image-gallery">
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/equipment-7.png" alt="装备抢修训练图片7">
              <div class="image-caption">
                <p>燃油箱及相关部件</p>
              </div>
            </div>
          </div>
          <div class="image-item">
            <div class="image-container">
              <img src="../../assets/images/equipment-8.png" alt="装备抢修训练图片8">
              <div class="image-caption">
                <p>发动机舱及电池系统</p>
              </div>
            </div>
          </div>
        </div>

        <div class="image-explanation">
          <h4 style="color: #fff;">维修工具及注意事项：</h4>
          <p>05式两栖装甲车维修需要特定的专业工具和设备，维修人员需熟悉各系统的结构和工作原理，严格按照维修手册进行操作。在进行维修作业时，需注意安全，确保车辆处于静止状态，并断开主电源。</p>
          
          <p>维修完成后，需进行全面检查和测试，确保所有系统正常工作，特别是与行驶安全相关的系统，如制动系统、转向系统等。</p>
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
  name: 'EquipmentRepair',
  data() {
    return {
      assessmentCriteria: [
        {
          item: '故障判断准确性',
          standard: '正确识别故障类型和原因',
          score: '25分'
        },
        {
          item: '维修操作规范性',
          standard: '按照标准流程进行维修操作',
          score: '25分'
        },
        {
          item: '维修操作时效性',
          standard: '在规定时间内完成维修操作',
          score: '20分'
        },
        {
          item: '工具使用熟练度',
          standard: '正确选择和使用维修工具',
          score: '15分'
        },
        {
          item: '维修后检测',
          standard: '维修后进行全面检测，确保故障排除',
          score: '15分'
        }
      ]
    };
  }
};
</script>

<style scoped>
.equipment-repair-container {
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

.image-explanation h5 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: #e0e0e0;
}

.image-explanation p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.image-explanation ul, .image-explanation ol {
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
