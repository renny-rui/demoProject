<template>
  <div class="task-assignment-container">
    <div class="page-header">
      <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">小队任务分配</h2>
      </div>
    </div>
<!-- 任务配置 -->
<el-card class="box-card">
      <el-divider content-position="left">
        <h3>任务配置</h3>
      </el-divider>

      <el-form :model="taskForm" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="ID">
              <el-input v-model="taskForm.missionLib.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="行动名称">
              <el-input v-model="taskForm.missionLib.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-date-picker v-model="taskForm.missionLib.startTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div style="padding-left: 75px;">
        <h4>任务类型选择</h4>
        <div class="task-type-cards">
          <div 
            class="task-card" 
            :class="{ 'active': selectedTaskType === 'oilDrumDelivery' }" 
            @click="selectTaskType('oilDrumDelivery')"
          >
            <div class="task-image" style="background-color: #87CEFA;">
              <i class="el-icon-oil-cup" style="font-size: 40px;"></i>
            </div>
            <div class="task-name">油料前送</div>
          </div>
          <div 
            class="task-card" 
            :class="{ 'active': selectedTaskType === 'combatVehicleRefueling' }" 
            @click="selectTaskType('combatVehicleRefueling')"
          >
            <div class="task-image" style="background-color: #90EE90;">
              <i class="el-icon-box" style="font-size: 40px;"></i>
            </div>
            <div class="task-name">燃料加注</div>
          </div>
          <div 
            class="task-card" 
            :class="{ 'active': selectedTaskType === 'hotMealPreparation' }" 
            @click="selectTaskType('hotMealPreparation')"
          >
            <div class="task-image" style="background-color: #FFA07A;">
              <i class="el-icon-dish" style="font-size: 40px;"></i>
            </div>
            <div class="task-name">热食制作</div>
          </div>
          <div 
            class="task-card" 
            :class="{ 'active': selectedTaskType === 'hotMealDelivery' }" 
            @click="selectTaskType('hotMealDelivery')"
          >
            <div class="task-image" style="background-color: #FFD700;">
              <i class="el-icon-food" style="font-size: 40px;"></i>
            </div>
            <div class="task-name">热食前送</div>
          </div>
          <div 
            class="task-card" 
            :class="{ 'active': selectedTaskType === 'combatVehicleMaintenance' }" 
            @click="selectTaskType('combatVehicleMaintenance')"
          >
            <div class="task-image" style="background-color: #A9A9A9;">
              <i class="el-icon-setting" style="font-size: 40px;"></i>
            </div>
            <div class="task-name">装备抢修</div>
          </div>
          <div 
            class="task-card" 
            :class="{ 'active': selectedTaskType === 'medicalEvacuation' }" 
            @click="selectTaskType('medicalEvacuation')"
          >
            <div class="task-image" style="background-color: #FF6B6B;">
              <i class="el-icon-first-aid-kit" style="font-size: 40px;"></i>
            </div>
            <div class="task-name">卫勤救护</div>
          </div>
        </div>

        <!-- 团队配置表单 - 只在选择了任务类型后显示 -->
        <div v-if="selectedTaskType" class="team-config">
          <el-divider content-position="left">
            <h4>{{ getTaskTypeName(selectedTaskType) }} - 团队配置</h4>
          </el-divider>
          
          <el-button type="primary" icon="el-icon-plus" @click="addTeam" class="add-button">新增团队</el-button>
          
          <el-collapse v-model="activeTeam">
            <el-collapse-item v-for="(team, index) in taskForm.missionLib.teams[selectedTaskType].groups" :key="index" :name="index">
              <template slot="title">
                <span>团队 ID: {{ team.id }}</span>
              </template>
              <el-form label-width="100px">
                <el-form-item label="团队 ID">
                  <el-input v-model="team.id"></el-input>
                </el-form-item>

                <!-- 成员配置 -->
                <el-button type="primary" icon="el-icon-plus" @click="addMember(index)"
                  class="add-button">新增成员</el-button>
                <el-card v-for="(member, idx) in team.members" :key="idx" shadow="always">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="成员ID">
                        <el-input v-model="member.memberId"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="设备IP">
                        <el-input v-model="member.deviceHMDIp"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="设备编号">
                        <el-input v-model="member.deviceNum"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="成员身份">
                        <el-select v-model="member.role">
                          <el-option label="燃料前送员" :value="0"></el-option>
                          <el-option label="燃料加注加油枪控制员" :value="1"></el-option>
                          <el-option label="燃料加注仪表控制员" :value="2"></el-option>
                          <el-option label="热食制作炊事员" :value="3"></el-option>
                          <el-option label="热食前送战斗人员" :value="4"></el-option>
                          <el-option label="热食前送" :value="5"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否为主机">
                        <el-switch v-model="member.host"></el-switch>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <div style="padding-left: 10px;">
                      <el-form-item label="是否追踪">
                        <div class="custom-radio-group">
                          <label class="custom-radio">
                            <input type="radio" v-model="member.useTracker" :value="true">
                            <span class="radio-label">是</span>
                          </label>
                          <label class="custom-radio">
                            <input type="radio" v-model="member.useTracker" :value="false">
                            <span class="radio-label">否</span>
                          </label>
                        </div>
                      </el-form-item>
                    </div>
                    <!-- 只有选择"是"才显示追踪模式 -->
                    <div v-if="member.useTracker" style="padding-left: 10px;">
                      <el-form-item label="追踪模式">
                        <div class="custom-radio-group">
                          <label class="custom-radio">
                            <input type="radio" v-model="member.trackerMode" :value="0">
                            <span class="radio-label">全身追踪</span>
                          </label>
                          <label class="custom-radio">
                            <input type="radio" v-model="member.trackerMode" :value="1">
                            <span class="radio-label">独立追踪</span>
                          </label>
                        </div>
                      </el-form-item>
                    </div>
                    <!-- 只有选择"独立追踪"才显示追踪设备 -->
                    <div v-if="member.useTracker && member.trackerMode === 1" style="padding-left: 10px;">
                      <div v-for="(device, deviceIndex) in member.tracker" :key="deviceIndex">
                        <el-row :gutter="20" style="margin-top: 10px;">
                          <el-col :span="10">
                            <el-form-item label="追踪设备macID">
                              <el-input v-model="device.macId" placeholder="请输入追踪设备macID"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="10">
                            <el-form-item label="用途">
                              <el-select v-model="device.useType" placeholder="请选择用途">
                                <el-option label="手切面伤" :value="1"></el-option>
                                <el-option label="掌骨粉碎性骨折" :value="2"></el-option>
                                <el-option label="大腿动脉伤" :value="3"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="4" style="display: flex; align-items: center; padding-top: 10px;">
                            <el-button 
                              type="danger" 
                              icon="el-icon-delete" 
                              size="mini" 
                              circle
                              @click="removeTrackingDevice(index, idx, deviceIndex)"
                              v-if="member.tracker.length > 1"
                            ></el-button>
                          </el-col>
                        </el-row>
                      </div>
                      <el-row style="margin-top: 10px;">
                        <el-col :span="10" :offset="10">
                          <el-form-item>
                            <el-button type="primary" size="small" icon="el-icon-plus" @click="addTrackingDevice(index, idx)" class="add-button">
                              添加追踪设备
                            </el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-row>

                  <el-button type="danger" icon="el-icon-delete" @click="removeMember(index, idx)">删除成员</el-button>
                  
                </el-card>
              </el-form>
            </el-collapse-item>
          </el-collapse>
          
          <!-- 提交按钮 -->
          <div style="display: flex; justify-content: center; margin-top: 20px;">
            <el-button type="primary" @click="submitTaskForm" class="submit-button" size="large">提交</el-button>
          </div>
        </div>
      </div>
    </el-card>
   
  </div>
</template>

<script>
import { addMission } from '@/api/mission';

export default {
  name: 'TaskAssignment',
  data() {
    return {
      selectedTaskType: '',
      activeTeam: [],
      taskForm: {
        gameConfig: {
          baseSetting: {
            maxPlayers: '',
            maxDuration: '',
            hostIP: ''
          },
          warfareSetting: {
            terrain: '',
            artilleryStrategy: {
              averageInterval: '',
              minRandomInterval: '',
              maxRandomInterval: ''
            },
            time: '',
            weather: [
              {
                index: 0,
                type: 'heavyRain',
                duration: ''
              },
              {
                index: 1,
                type: 'sunny',
                duration: ''
              }
            ]
          }
        },
        missionLib: {
          id: '',
          name: '',
          startTime: null,
          teams: {
            oilDrumDelivery: {
              name: "油料前送",
              groups: []
            },
            combatVehicleRefueling: {
              name: "燃料加注",
              groups: []
            },
            hotMealPreparation: {
              name: "热食制作",
              groups: []
            },
            hotMealDelivery: {
              name: "热食前送",
              groups: []
            },
            combatVehicleMaintenance: {
              name: "装备抢修",
              vehicleType: 1,
              groups: []
            },
            medicalEvacuation: {
              name: "卫勤救护",
              groups: []
            }
          }
        }
      }
    }
  },
  mounted() {
    // Retrieve stored form data from localStorage
    const storedData = localStorage.getItem('taskFormData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      
      // Update relevant fields in the taskForm
      if (parsedData.gameConfig) {
        // Map the data from DeviceBinding to TaskAssignment format
        this.taskForm.gameConfig.baseSetting.maxPlayers = parsedData.gameConfig.baseSetting.maxPlayers;
        this.taskForm.gameConfig.baseSetting.maxDuration = parsedData.gameConfig.baseSetting.maxDuration;
        this.taskForm.gameConfig.baseSetting.hostIP = parsedData.gameConfig.baseSetting.hostIP;
        this.taskForm.gameConfig.warfareSetting.terrain = parsedData.gameConfig.warfareSetting.terrain;
        this.taskForm.gameConfig.warfareSetting.artilleryStrategy.averageInterval = parsedData.gameConfig.warfareSetting.artilleryStrategy.averageInterval;
        this.taskForm.gameConfig.warfareSetting.artilleryStrategy.minRandomInterval = parsedData.gameConfig.warfareSetting.artilleryStrategy.minRandomInterval;
        this.taskForm.gameConfig.warfareSetting.artilleryStrategy.maxRandomInterval = parsedData.gameConfig.warfareSetting.artilleryStrategy.maxRandomInterval;
        this.taskForm.gameConfig.warfareSetting.time = parsedData.gameConfig.warfareSetting.time;
        this.taskForm.gameConfig.warfareSetting.weather = parsedData.gameConfig.warfareSetting.weather;
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push('/battle-simulation')
    },
    
    selectTaskType(taskType) {
      this.selectedTaskType = taskType;
    },
    
    getTaskTypeName(taskType) {
      switch (taskType) {
        case 'oilDrumDelivery':
          return '油料前送';
        case 'combatVehicleRefueling':
          return '燃料加注';
        case 'hotMealPreparation':
          return '热食制作';
        case 'hotMealDelivery':
          return '热食前送';
        case 'combatVehicleMaintenance':
          return '装备抢修';
        case 'medicalEvacuation':
          return '卫勤救护';
        default:
          return '';
      }
    },
    
    addTeam() {
      this.taskForm.missionLib.teams[this.selectedTaskType].groups.push({
        id: Number(this.taskForm.missionLib.teams[this.selectedTaskType].groups.length + 1),
        members: []
      });
    },
    addMember(teamIndex) {
      this.taskForm.missionLib.teams[this.selectedTaskType].groups[teamIndex].members.push({
        memberId: String(this.taskForm.missionLib.teams[this.selectedTaskType].groups[teamIndex].members.length + 1).padStart(4, "0"),
        deviceHMDIp: '',
        deviceNum: '',
        role: '',
        host: false,
        useTracker: false,
        trackerMode: '',
        tracker: [
          {
            macId: '',
            useType: ''
          }
        ]
      });
    },
    removeMember(teamIndex, memberIndex) {
      this.taskForm.missionLib.teams[this.selectedTaskType].groups[teamIndex].members.splice(memberIndex, 1);
    },
    addTrackingDevice(teamIndex, memberIndex) {
      this.taskForm.missionLib.teams[this.selectedTaskType].groups[teamIndex].members[memberIndex].tracker.push({
        macId: '',
        useType: ''
      });
    },
    removeTrackingDevice(teamIndex, memberIndex, deviceIndex) {
      this.taskForm.missionLib.teams[this.selectedTaskType].groups[teamIndex].members[memberIndex].tracker.splice(deviceIndex, 1);
    },
    submitTaskForm() {
      // Format the date as YYYY-MM-DD HH:MM:SS
      if (this.taskForm.missionLib.startTime) {
        const date = new Date(this.taskForm.missionLib.startTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        this.taskForm.missionLib.startTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
      
      // Convert string IDs to numbers if needed
      if (this.taskForm.missionLib.id && typeof this.taskForm.missionLib.id === 'string') {
        this.taskForm.missionLib.id = parseInt(this.taskForm.missionLib.id) || 1;
      }
      
      // Ensure all groups have groupId
      Object.keys(this.taskForm.missionLib.teams).forEach(teamKey => {
        const team = this.taskForm.missionLib.teams[teamKey];
        if (team.groups) {
          team.groups.forEach((group, index) => {
            if (!group.groupId) {
              group.groupId = index + 1;
            } else if (typeof group.groupId === 'string') {
              group.groupId = parseInt(group.groupId) || index + 1;
            }
            
            // Ensure all members have proper data types
            if (group.members) {
              group.members.forEach(member => {
                // Convert memberId to number if it's a string
                if (member.memberId && typeof member.memberId === 'string') {
                  member.memberId = parseInt(member.memberId) || 0;
                }
                
                // Ensure boolean values are actually booleans
                member.host = !!member.host;
                member.useTracker = !!member.useTracker;
                
                // Ensure tracker devices have proper data types
                if (member.tracker) {
                  member.tracker.forEach(device => {
                    if (device.useType && typeof device.useType === 'string') {
                      device.useType = parseInt(device.useType) || 1;
                    }
                  });
                }
              });
            }
          });
        }
      });
      
      // Create the final payload structure
      const payload = {
        gameConfig: this.taskForm.gameConfig,
        missionLib: this.taskForm.missionLib
      };
      
      // 确保所有团队ID都是数字类型
      Object.keys(payload.missionLib.teams).forEach(teamKey => {
        const team = payload.missionLib.teams[teamKey];
        if (team.groups && team.groups.length > 0) {
          team.groups.forEach(group => {
            // 确保团队ID是数字类型
            if (group.id !== undefined) {
              group.id = Number(group.id);
            }
          });
        }
      });
      
      // Log the final payload
      console.log('Submitting task form with payload:', payload);
      
      // 从localStorage获取登录接口返回的token
      const token = localStorage.getItem('token');
      console.log('Using token for API call:', token);
      
      // 调用mission.js中的addMission方法
      addMission(payload)
        .then(data => {
          console.log('Response from server:', data);
          
          if (data && data.success) {
            // Show success message
            this.$message({
              message: '任务创建成功',
              type: 'success',
              duration: 3000
            });
            
        
          } else {
            // Show error message if success is false
            this.$message({
              message: data.msg || '提交失败，请检查表单数据',
              type: 'error',
              duration: 5000
            });
          }
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          
          // Show error message
          this.$message({
            message: '提交失败: ' + (error.message || '网络错误'),
            type: 'error',
            duration: 5000
          });
        });
    }
  
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}

.add-button {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}

.submit-button {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}

.custom-radio-group {
  display: flex;
  align-items: center;
}

.custom-radio {
  margin-right: 20px;
}

.custom-radio input[type="radio"] {
  display: none;
}

.custom-radio input[type="radio"] + .radio-label {
  padding-left: 20px;
  position: relative;
}

.custom-radio input[type="radio"] + .radio-label::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  border-radius: 50%;
}

.custom-radio input[type="radio"]:checked + .radio-label::before {
  background-color: #409EFF;
  border-color: #409EFF;
}

.custom-radio input[type="radio"]:checked + .radio-label::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: #fff;
  border-radius: 50%;
}

/* Fix for aria-hidden accessibility issues */
::v-deep .el-radio__input input[type="radio"] {
  position: absolute;
  opacity: 0;
  margin: 0;
  z-index: -1;
  width: 0;
  height: 0;
  overflow: hidden;
}

::v-deep .el-radio__input input[type="radio"]:focus + .el-radio__inner {
  box-shadow: 0 0 2px 2px rgba(64, 158, 255, 0.6);
  border-color: #409EFF;
}

::v-deep .el-radio__original {
  opacity: 0 !important;
  outline: none !important;
  position: absolute !important;
  z-index: -1 !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  margin: 0 !important;
}

.task-type-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.task-card {
  margin: 10px;
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
}

.task-card.active {
  border-color: #409EFF;
  box-shadow: 0 0 10px rgba(64, 158, 255, 0.5);
}

.task-image {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-name {
  text-align: center;
  margin-top: 10px;
}
</style>
