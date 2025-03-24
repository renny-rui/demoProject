<template>
  <div class="card-container">
    <!-- 顶部标题栏 -->
    <div class="header-bar">
      <div class="title">DUTY TRAINING SUPER SYSTEM</div>
    </div>

    <!-- 左侧信息面板 -->
    <div class="left-panel">
      <div class="panel-title">PERSONAL INFORMATION</div>
      <div class="info-box">
        <div class="info-row">
          <div class="info-label">.38</div>
        </div>
        <div class="info-row">
          <div class="info-value">22.338</div>
        </div>
      </div>
      <!-- 地图区域 -->
      <div class="map-container">
        <div class="map-overlay"></div>
      </div>
      <!-- 圆形仪表盘 -->
      <div class="gauges-container">
        <div class="gauge"></div>
        <div class="gauge"></div>
        <div class="gauge"></div>
      </div>
    </div>

    <!-- 中央显示区域 -->
    <div class="center-panel">
      <div class="center-image">
        <div class="image-title">BEACH LANDINGS</div>
      </div>
    </div>

    <!-- 右侧信息面板 -->
    <div class="right-panel">
      <div class="panel-title">MISSION PARAMETERS</div>
      <div class="stats-container">
        <div class="stat-row">
          <div class="stat-label">ALTITUDE</div>
          <div class="stat-value">10.6 m</div>
        </div>
        <div class="stat-row">
          <div class="stat-label">SPEED</div>
          <div class="stat-value">13.9 m/s</div>
        </div>
        <div class="stat-row">
          <div class="stat-label">DISTANCE</div>
          <div class="stat-value">28.8 km</div>
        </div>
      </div>
      <!-- 进度条区域 -->
      <div class="progress-bars">
        <div class="progress-item">
          <div class="progress-label">FUEL</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 75%"></div>
          </div>
        </div>
        <div class="progress-item">
          <div class="progress-label">AMMO</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 60%"></div>
          </div>
        </div>
      </div>
      <!-- 飞机图标区域 -->
      <div class="aircraft-icons">
        <div class="aircraft-icon"></div>
        <div class="aircraft-icon"></div>
      </div>
    </div>

    <!-- 底部信息栏 -->
    <div class="footer-bar">
      <div class="footer-title">CALL OF DUTY</div>
      <div class="footer-stats">
        <div class="stat-box">2.9</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDisplay',
};
</script>

<style scoped>
.card-container {
  width: 800px;
  height: 500px;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid #30b5ff;
  color: #30b5ff;
  display: flex;
  flex-direction: column;
  font-family: 'Arial', sans-serif;
  position: relative;
  box-shadow: 0 0 15px rgba(48, 181, 255, 0.5);
}

.header-bar {
  height: 40px;
  background-color: rgba(48, 181, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #30b5ff;
}

.title {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
}

.left-panel, .center-panel, .right-panel {
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 1px solid #30b5ff;
  margin: 5px;
}

.panel-title {
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  background-color: rgba(48, 181, 255, 0.2);
  padding: 5px;
}

.info-box, .stats-container {
  background-color: rgba(48, 181, 255, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(48, 181, 255, 0.5);
}

.info-row, .stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.info-label, .stat-label {
  font-size: 12px;
}

.info-value, .stat-value {
  font-size: 12px;
  color: white;
}

.map-container {
  height: 120px;
  background-color: #1a3a4a;
  margin-bottom: 10px;
  position: relative;
  border: 1px solid rgba(48, 181, 255, 0.5);
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, rgba(48, 181, 255, 0.2) 0%, rgba(48, 181, 255, 0.1) 70%);
}

.gauges-container {
  display: flex;
  justify-content: space-around;
}

.gauge {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #30b5ff;
  background: radial-gradient(circle, rgba(48, 181, 255, 0.3) 0%, rgba(0, 0, 0, 0.5) 70%);
}

.center-panel {
  flex: 2;
  display: flex;
  flex-direction: column;
}

.center-image {
  flex: 1;
  background-image: url('/images/battlefield.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  border: 2px solid rgba(48, 181, 255, 0.7);
}

.image-title {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  font-size: 14px;
}

.progress-bars {
  margin-top: 10px;
}

.progress-item {
  margin-bottom: 10px;
}

.progress-label {
  font-size: 12px;
  margin-bottom: 5px;
}

.progress-bar {
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(48, 181, 255, 0.5);
}

.progress-fill {
  height: 100%;
  background-color: #30b5ff;
}

.aircraft-icons {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.aircraft-icon {
  width: 40px;
  height: 30px;
  background-image: url('/images/aircraft-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 10px;
}

.footer-bar {
  height: 60px;
  background-color: rgba(48, 181, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-top: 1px solid #30b5ff;
}

.footer-title {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

.footer-stats {
  display: flex;
}

.stat-box {
  background-color: rgba(48, 181, 255, 0.3);
  padding: 5px 15px;
  margin-left: 10px;
  border: 1px solid #30b5ff;
  font-size: 18px;
  font-weight: bold;
}
</style>
