<template>
  <div class="task-config">


    <!-- 任务设置 -->
    <el-card class="box-card">
      <div  style="width: 100%;
    height: 46px; background-color: #CCD1D7;">
        <div style="padding:1px 0">
          <el-divider content-position="left">
            <h3 style="background-color:#CCD1D7 ;">任务设置</h3>
          </el-divider>
        </div>
       
     
      </div>
     
      <el-form :model="taskForm.gameConfig" label-width="100px">

        <el-row :gutter="20">

          <h4 style="color:#fff">基本设置：</h4>
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
        <h4 style="color:#fff">战场配置：</h4>

        <!-- 地形选择 -->
        <div class="map-selection">
          <h5 style="color:#fff">地形选择</h5>
          <div class="map-cards">
            <div class="map-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.terrain === 'rainforest' }"
              @click="taskForm.gameConfig.warfareSetting.terrain = 'rainforest'">
              <div class="map-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/3.png') + ')' }">
              </div>
              <div class="map-name">雨林</div>
            </div>
            <div class="map-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.terrain === 'beach' }"
              @click="taskForm.gameConfig.warfareSetting.terrain = 'beach'">
              <div class="map-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/2.png') + ')' }">
              </div>
              <div class="map-name">岸滩</div>
            </div>
            <div class="map-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.terrain === 'ship' }"
              @click="taskForm.gameConfig.warfareSetting.terrain = 'ship'">
              <div class="map-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/1.png') + ')' }">
              </div>
              <div class="map-name">乌舱</div>
            </div>
          </div>
        </div>

        <!-- 时间选择 -->
        <div class="time-selection">
          <h5 style="color:#fff">时间选择</h5>
          <div class="time-cards">
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'dawn' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'dawn'">
              <div class="time-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/9.png') + ')' }"></div>
              <div class="time-name">黎明</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'morning' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'morning'">
              <div class="time-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/6.png') + ')' }"></div>
              <div class="time-name">早晨</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'noon' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'noon'">
              <div class="time-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/7.png') + ')' }"></div>
              <div class="time-name">正午</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'afternoon' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'afternoon'">
              <div class="time-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/4.png') + ')' }"></div>
              <div class="time-name">下午</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'dusk' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'dusk'">
              <div class="time-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/8.png') + ')' }"></div>
              <div class="time-name">黄昏</div>
            </div>
            <div class="time-card" :class="{ 'active': taskForm.gameConfig.warfareSetting.time === 'night' }"
              @click="taskForm.gameConfig.warfareSetting.time = 'night'">
              <div class="time-image" :style="{ backgroundImage: 'url(' + require('../../assets/taskPic/5.png') + ')' }"></div>
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
        <div class="weather-config-section">
          <h4 style="color:#fff">天气配置：</h4>
          <!-- 新增天气按钮 -->
           <div style="margin: 10px 0 15px 0; height: 30px;">
           
              <el-button type="primary" icon="el-icon-plus" @click="addWeather" class="add-weather" >新增天气</el-button>
           
           </div>
          
          <!-- 天气列表 -->
          <div class="weather-list">
            <el-row :gutter="20" v-for="(weather, index) in taskForm.gameConfig.warfareSetting.weather" :key="index">
              <el-col :span="8">
                <el-form-item :label="'天气类型 ' + (index + 1)">
                  <el-select v-model="weather.type" placeholder="选择天气类型" style="width: 100%;">
                    <el-option label="晴天" value="sunny"></el-option>
                    <el-option label="雨天" value="rainy"></el-option>
                    <el-option label="雾天" value="foggy"></el-option>
                    <el-option label="雪天" value="snowy"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="'持续时间 ' + (index + 1)">
                  <el-input v-model="weather.duration" placeholder="请输入持续时间（分钟）"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label=" ">
                  <el-button type="danger" icon="el-icon-delete" @click="removeWeather(index)" circle></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          
          
        </div>

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
            maxPlayers: 0,
            maxDuration: 0,
            hostIP: ''
          },
          warfareSetting: {
            terrain: '',
            time: '',
            artilleryStrategy: {
              averageInterval: 0,
              minRandomInterval: 0,
              maxRandomInterval: 0
            },
            weather: []
          }
        }
      }
    };
  },
  created() {
    // Initialize with one empty weather item
    this.addWeather();
  },
  methods: {
    addWeather() {
      const newIndex = this.taskForm.gameConfig.warfareSetting.weather.length;
      // Use Vue.set to ensure reactivity
      this.taskForm.gameConfig.warfareSetting.weather.push({
        id: Date.now(), // Add a unique ID for better tracking
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
      
      // Emit an event to show the task assignment dialog
      this.$emit('next-step');
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
  background-color: #383D44;
}
.el-card {
    border-radius: 4px !important;
    overflow: hidden !important;
    color: #303133 !important;
    transition: .3s !important;
}

/* 设置所有表单标签为白色 */
::v-deep .el-form-item__label {
  color: #fff !important;
}

/* 设置输入框的背景颜色 */
::v-deep .el-input__inner {
  background-color: #2e2e3a !important;
  border-color: #383D44 !important;
  color: #fff !important;
}


.add-button {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}

.map-selection,
.time-selection {
  margin-bottom: 20px;
  padding-left: 0;
  padding-right: 0;
}

.map-cards,
.time-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 0;
  padding-right: 0;
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
    text-align: right !important;
    vertical-align: middle !important;
    float: left !important;
    font-size: 14px !important;
    color: black !important;
    line-height: 40px !important;
    padding: 0 12px 0 0 !important;
    box-sizing: border-box !important;
}

.add-button {
  background-color: #409EFF !important;
}

.submit-button {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
  color:#383D44 !important;
}

.task-title-bar {
  background: url('../../assets/title.png') no-repeat;
  background-size: 100% 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
}

.task-title-text {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding-left: 20px;
}
.task-config{
  background-color: #383D44 !important;
}
.el-divider__text {
    position: absolute !important;
    background-color: #FFF !important;
     padding: 0 !important; 
    font-weight: 500 !important;
    color: #303133 !important;
}
.el-card__body, .el-main {
  padding: 0 !important;
}

.weather-config-section {
  margin-bottom: 20px;
}

.weather-list {
  margin-bottom: 20px;
}
.add-weather{
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
  color:#383D44 !important
}
</style>
