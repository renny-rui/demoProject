<template>
  <div class="task-config">

    <div class="page-header">
      <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">任务基本设置</h2>
      </div>
    </div>

    <!-- 任务设置 -->
    <el-card class="box-card">

      <el-divider content-position="left">
        <h3>任务设置</h3>
      </el-divider>
      <el-form :model="taskForm.gameConfig" label-width="100px">

        <el-row :gutter="20">

          <h4>基本设置：</h4>
          <el-col :span="8">
            <el-form-item label="最大人数">
              <el-input v-model="taskForm.gameConfig.baseSetting.maxPlayers" placeholder="请输入最大人数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最长时间">
              <el-input v-model="taskForm.gameConfig.baseSetting.maxDuration" placeholder="请输入最长时间"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="房主IP">
              <el-input v-model="taskForm.gameConfig.baseSetting.hostIP" placeholder="请输入房主IP"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 战场配置 -->
        <h4>战场配置：</h4>

        <!-- 地形选择 -->
        <div class="map-selection">
          <h5>地形选择</h5>
          <div class="map-cards">
            <div class="map-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.terrain === 'rainforest' }"
              @click="taskForm.gameConfig.warfareSetting.terrain = 'rainforest'">
              <div class="map-image" :style="{ backgroundImage: 'url(' + require('../../assets/images1.jpg') + ')' }">
              </div>
              <div class="map-name">丛林</div>
            </div>
            <div class="map-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.terrain === 'beach' }"
              @click="taskForm.gameConfig.warfareSetting.terrain = 'beach'">
              <div class="map-image" :style="{ backgroundImage: 'url(' + require('../../assets/images2.jpg') + ')' }">
              </div>
              <div class="map-name">岸滩</div>
            </div>
            <div class="map-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.terrain === 'ship' }"
              @click="taskForm.gameConfig.warfareSetting.terrain = 'ship'">
              <div class="map-image" :style="{ backgroundImage: 'url(' + require('../../assets/images3.jpg') + ')' }">
              </div>
              <div class="map-name">海上</div>
            </div>
          </div>
        </div>

        <!-- 时间选择 -->
        <div class="time-selection">
          <h5>时间选择</h5>
          <div class="time-cards">
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'dawn' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'dawn'">
              <div class="time-image" style="background-color: #f08080;"></div>
              <div class="time-name">黎明</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'morning' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'morning'">
              <div class="time-image" style="background-color: #87ceeb;"></div>
              <div class="time-name">早晨</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'noon' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'noon'">
              <div class="time-image" style="background-color: #ffd700;"></div>
              <div class="time-name">正午</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'afternoon' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'afternoon'">
              <div class="time-image" style="background-color: #ffa500;"></div>
              <div class="time-name">下午</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'dusk' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'dusk'">
              <div class="time-image" style="background-color: #ff4500;"></div>
              <div class="time-name">黄昏</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'night' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'night'">
              <div class="time-image" style="background-color: #191970;"></div>
              <div class="time-name">夜间</div>
            </div>
          </div>
        </div>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="炮火间隔">
              <el-input v-model="taskForm.gameConfig.warfareSetting.artilleryStrategy.averageInterval"
                placeholder="请输入间隔时间(秒)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最小波动">
              <el-input v-model="taskForm.gameConfig.warfareSetting.artilleryStrategy.minRandomInterval"
                placeholder="请输入最小波动值"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最大波动">
              <el-input v-model="taskForm.gameConfig.warfareSetting.artilleryStrategy.maxRandomInterval"
                placeholder="请输入最大波动值"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 天气配置 -->
        <h4>天气配置：</h4>
        <el-row>
          <el-col :span="24">
            <el-button type="primary" icon="el-icon-plus" @click="addWeather" style="margin-bottom: 15px;"
              class="add-button">新增天气</el-button>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-for="(weather, index) in taskForm.gameConfig.warfareSetting.weather" :key="weather.index"
          style="margin-bottom: 15px;">
          <el-col :span="8">
            <el-form-item :label="'天气类型 ' + (index + 1)">
              <el-select v-model="weather.type" placeholder="选择天气类型">
                <el-option label="晴天" value="sunny"></el-option>
                <el-option label="雨天" value="rainy"></el-option>
                <el-option label="雾天" value="foggy"></el-option>
                <el-option label="雪天" value="snowy"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'持续时间 ' + (index + 1)">
              <el-input v-model="weather.duration" placeholder="请输入持续时间"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label=" ">
              <el-button type="danger" icon="el-icon-delete" @click="removeWeather(index)" circle></el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="display: flex;justify-content: center;">
          <el-button type="primary" @click="submitForm" class="submit-button">下一步</el-button>
        </el-form-item>

      </el-form>
    </el-card>





  </div>
</template>

<script>
export default {
  data() {
    return {
      taskForm: {
        gameConfig: {
          baseSetting: {
            maxPlayers: '',
            maxDuration: '',
            hostIP: ''
          },
          warfareSetting: {
            terrain: '',
            time: '',
            artilleryStrategy: {
              averageInterval: '',
              minRandomInterval: '',
              maxRandomInterval: ''
            },
            weather: [
              {
                index: 0,
                type: '',
                duration: ''
              }
            ]
          }
        }
      }
    };
  },
  methods: {
    addWeather() {
      const newIndex = this.taskForm.gameConfig.warfareSetting.weather.length;
      this.taskForm.gameConfig.warfareSetting.weather.push({
        index: newIndex,
        type: '',
        duration: ''
      });
    },
    removeWeather(index) {
      this.taskForm.gameConfig.warfareSetting.weather.splice(index, 1);
      // Update indexes after removal
      this.taskForm.gameConfig.warfareSetting.weather.forEach((item, idx) => {
        item.index = idx;
      });
    },
    submitForm() {
      // Store form data in localStorage for access in TaskAssignment
      localStorage.setItem('taskFormData', JSON.stringify(this.taskForm));
      
      // Navigate to the TaskAssignment page
      this.$router.push('/tasks/task-assignment');
    },
    goBack() {
      this.$router.go(-1); // Navigate back to previous page
    }
  }
};
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}

.add-button {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}

.map-selection,
.time-selection {
  margin-bottom: 20px;
}

.map-cards,
.time-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.map-card,
.time-card {
  margin: 10px;
  width: calc(33.33% - 20px);
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.time-card {
  width: calc(33.33% - 20px);
}

.map-card.active,
.time-card.active {
  border-color: #409EFF;
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.3);
  transform: translateY(-2px);
}

.map-image,
.time-image {
  width: 100%;
  height: 150px;
  background-size: cover;
  background-position: center;
}

.map-name,
.time-name {
  text-align: center;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  background-color: #f9f9f9;
  border-top: 1px solid #eee;
}

.day-image {
  background-color: #87ceeb;
}

.night-image {
  background-color: #191970;
}

h4 {
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

h5 {
  margin-top: 15px;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #444;
}

.el-form-item__label {
  font-size: 15px !important;
  font-weight: 500 !important;
}

.add-button {
  background-color: #409EFF !important;
}

.submit-button {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}
</style>
