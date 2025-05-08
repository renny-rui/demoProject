<template>
  <div class="task-assignment-container">

    <!-- 任务配置 -->
    <div style="height: 50px;
    background-color: #D9D9D9;
    margin-bottom: 10px;">
        <h3 style="padding: 11px;">任务配置</h3>
      </div>
    <el-card class="box-card">
      


      <el-form :model="taskForm" label-width="100px" class="task-form">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="ID" label-width="100px" class="white-label">
              <el-input v-model="taskForm.missionLib.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任务名称" label-width="100px" class="white-label">
              <el-input v-model="taskForm.missionLib.name" placeholder="请输入任务名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间" label-width="100px" class="white-label">
              <el-date-picker v-model="taskForm.missionLib.startTime" type="datetime" placeholder="选择日期和时间"
                format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div>
        <h4 style="color: #fff;">作业科目</h4>
        <div class="task-type-cards">
          <div class="task-card" :class="{ 'active': selectedTaskType === 'oilDrumDelivery' }"
            @click="selectTaskType('oilDrumDelivery')">
            <div class="task-image" style="background-color: #7B8B9B; border-radius: 10px 10px 0 0;">
              <img src="../../assets/icons/777油料前送.png" >
              <!-- <i class="el-icon-goods" style="font-size: 40px;"></i> -->
            </div>
            <div class="task-name">油料前送</div>
          </div>
          <div class="task-card" :class="{ 'active': selectedTaskType === 'combatVehicleRefueling' }"
            @click="selectTaskType('combatVehicleRefueling')">
            <div class="task-image" style="background-color: #7B8B9B; border-radius: 10px 10px 0 0;">
              <!-- <i class="el-icon-box" style="font-size: 40px;"></i> -->
              <img src="../../assets/icons/777油料加注.png" >
            </div>
            <div class="task-name">油料加注</div>
          </div>
          <div class="task-card" :class="{ 'active': selectedTaskType === 'hotMealPreparation' }"
            @click="selectTaskType('hotMealPreparation')">
            <div class="task-image" style="background-color: #7B8B9B; border-radius: 10px 10px 0 0;">
              <!-- <i class="el-icon-dish" style="font-size: 40px;"></i> -->
              <img src="../../assets/icons/777热食制作1.png" >
            </div>
            <div class="task-name">热食制作</div>
          </div>
          <div class="task-card" :class="{ 'active': selectedTaskType === 'hotMealDelivery' }"
            @click="selectTaskType('hotMealDelivery')">
            <div class="task-image" style="background-color: #7B8B9B; border-radius: 10px 10px 0 0;">
              <!-- <i class="el-icon-food" style="font-size: 40px;"></i> -->
              <img src="../../assets/icons/777热食前送.png" >
            </div>
            <div class="task-name">热食前送</div>
          </div>
          <div class="task-card" :class="{ 'active': selectedTaskType === 'combatVehicleMaintenance' }"
            @click="selectTaskType('combatVehicleMaintenance')">
            <div class="task-image" style="background-color: #7B8B9B; border-radius: 10px 10px 0 0;">
              <!-- <i class="el-icon-setting" style="font-size: 40px;"></i> -->
              <img src="../../assets/icons/777装备抢修.png" >
            </div>
            <div class="task-name">装备抢修</div>
          </div>
          <div class="task-card" :class="{ 'active': selectedTaskType === 'medicalEvacuation' }"
            @click="selectTaskType('medicalEvacuation')">
            <div class="task-image" style="background-color: #7B8B9B; border-radius: 10px 10px 0 0;">
              <!-- <i class="el-icon-first-aid-kit" style="font-size: 40px;"></i> -->
              <img src="../../assets/icons/777卫勤救护.png" >
            </div>
            <div class="task-name">卫勤救护</div>
          </div>
        </div>

        <!-- 团队配置表单 - 只在选择了任务类型后显示 -->
        <div v-if="selectedTaskType" class="team-config">
          <el-divider content-position="left">
            <h4 style="background-color: #383D44; color: #fff;">{{ getTaskTypeName(selectedTaskType) }} - 团队配置</h4>
          </el-divider>

          <el-card class="box-card" style="margin-bottom: 20px;">
            <div slot="header" class="clearfix"
              style="display: flex; align-items: center; justify-content: space-between; background-color:#7B8B9B; border:1px solid #7B8B9B; padding: 10px;">
              <span style="font-size: 14px; font-weight: bold;">团队管理</span>
              <el-button type="primary" icon="el-icon-plus" @click="addTeam" size="small"
                class="team-button">新增团队</el-button>
            </div>

            <el-collapse v-model="activeTeam">
              <el-collapse-item v-for="(team, index) in taskForm.missionLib[selectedTaskType].groups" :key="index"
                :name="index">
                <template slot="title">
                  <span>团队 ID: {{ team.id }}</span>
                </template>
                <el-form label-width="100px">
                  <el-form-item label="团队 ID">
                    <el-input v-model="team.id" style="width: 200px;"></el-input>
                  </el-form-item>

                  <!-- 成员配置 -->
                  <div style="margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; background-color: #737E89; border:1px solid #737E89; padding: 10px;">
                    <span style="font-weight: bold;">成员管理</span>
                    <el-button type="primary" icon="el-icon-plus" @click="addMember(index)" size="small"
                      class="team-button">新增成员</el-button>
                  </div>
                  <el-card v-for="(member, idx) in team.members" :key="idx" shadow="always"
                    style="background-color:#7B8B9B;border:1px solid #737E89; z-index:2">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="成员姓名">
                          <el-select v-model="member.memberId" placeholder="请选择成员姓名" popper-append-to-body
                            popper-class="member-select">
                            <el-option v-for="option in memberOptions" :key="option.key" :label="option.label"
                              :value="option.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备IP">
                          <el-select v-model="member.deviceHMDIp" placeholder="请选择设备IP" popper-append-to-body
                            popper-class="device-ip-select">
                            <el-option v-for="option in deviceIpOptions" :key="option.key" :label="option.label"
                              :value="option.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="设备编号">
                          <el-select v-model="member.deviceNum" placeholder="请选择设备编号" popper-append-to-body
                            popper-class="device-num-select">
                            <el-option v-for="option in deviceNumOptions" :key="option.key" :label="option.label"
                              :value="option.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="成员角色">
                          <el-select v-model="member.role" popper-append-to-body popper-class="member-role-select">
                            <el-option label="燃料前送员" :value="0"></el-option>
                            <el-option label="燃料加注加油枪控制员" :value="1"></el-option>
                            <el-option label="燃料加注仪表控制员" :value="2"></el-option>
                            <el-option label="热食制作炊事员" :value="3"></el-option>
                            <el-option label="热食前送战斗人员" :value="4"></el-option>
                            <el-option label="热食前送" :value="5"></el-option>
                          </el-select>
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
                                <el-select v-model="device.useType" placeholder="请选择用途" popper-append-to-body
                                  popper-class="device-use-select">
                                  <el-option label="手切面伤" :value="1"></el-option>
                                  <el-option label="掌骨粉碎性骨折" :value="2"></el-option>
                                  <el-option label="大腿动脉伤" :value="3"></el-option>
                                </el-select>
                              </el-form-item>
                            </el-col>
                            <el-col :span="4" style="display: flex; align-items: center; padding-top: 10px;">
                              <el-button type="danger" icon="el-icon-delete" size="mini" circle
                                @click="removeTrackingDevice(index, idx, deviceIndex)"
                                v-if="member.tracker.length > 1"></el-button>
                            </el-col>
                          </el-row>
                        </div>
                        <el-row style="margin-top: 10px;">
                          <el-col :span="10" :offset="10">
                            <el-form-item>
                              <el-button type="primary" size="small" icon="el-icon-plus"
                                @click="addTrackingDevice(index, idx)" class="add-device-button">
                                添加追踪设备
                              </el-button>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                    </el-row>

                    <el-button type="danger" icon="el-icon-delete" @click="removeMember(index, idx)"
                      size="small">删除成员</el-button>

                  </el-card>
                </el-form>
              </el-collapse-item>
            </el-collapse>

            <!-- 提交按钮 -->
            <div style="display: flex; justify-content: center; margin-top: 20px;">
              <el-button type="primary" @click="submitTaskForm" class="submit-button" size="large">提交</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import { addMission, getDeviceList, getPeopleList } from '@/api/mission';

export default {
  name: 'TaskAssignment',
  data() {
    return {
      activeTeam: [0],
      selectedTaskType: '',
      memberOptions: [],
      deviceIpOptions: [],
      deviceNumOptions: [],
      taskForm: {
        gameConfig: {
          baseSetting: {
            maxPlayers: 0,
            maxDuration: 0,
            hostIP: ''
          },
          warfareSetting: {
            terrain: '',
            artilleryStrategy: {
              averageInterval: 0,
              minRandomInterval: 0,
              maxRandomInterval: 0
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
          id: 0,
          name: '',
          startTime: null,
          oilDrumDelivery: {
            name: "油料前送",
            groups: [
              // {
              //   memberId:0,
              //   deviceHMDIp:'',
              //   deviceNum:'',
              //   role:0,
              //   host:false,
              //   useTracker:true,
              //   trackerMode:1,
              //   tracker:[
              //     {
              //       macId:'',
              //       userType:1
              //     }
              //   ]
              // }

            ]
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
    this.getDeviceList();
    this.getPeopleList();
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
      this.taskForm.missionLib[this.selectedTaskType].groups.push({
        id: Number(this.taskForm.missionLib[this.selectedTaskType].groups.length + 1),
        members: []
      });
    },
    addMember(teamIndex) {
      this.taskForm.missionLib[this.selectedTaskType].groups[teamIndex].members.push({
        memberId: '',
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
      this.taskForm.missionLib[this.selectedTaskType].groups[teamIndex].members.splice(memberIndex, 1);
    },
    addTrackingDevice(teamIndex, memberIndex) {
      this.taskForm.missionLib[this.selectedTaskType].groups[teamIndex].members[memberIndex].tracker.push({
        macId: '',
        useType: ''
      });
    },
    removeTrackingDevice(teamIndex, memberIndex, deviceIndex) {
      this.taskForm.missionLib[this.selectedTaskType].groups[teamIndex].members[memberIndex].tracker.splice(deviceIndex, 1);
    },
    getDeviceList() {
      // Set default parameters as specified in the API URL
      const params = { currentPage: 1, perPageCount: 10 };

      getDeviceList(params).then(response => {
        console.log('getDeviceList:', response)
        if (response && response.data) {
          const deviceList = response.data || [];

          // Map device IPs to options with unique keys
          this.deviceIpOptions = deviceList.map((device, index) => ({
            value: device.Ip || '',
            label: device.Ip || '',
            key: `ip-${index}-${device.Ip || ''}`  // Add a unique key
          }));

          // Map device numbers to options with unique keys
          this.deviceNumOptions = deviceList.map((device, index) => ({
            value: device.Num || '',
            label: `设备${device.Num}` || '',
            key: `num-${index}-${device.Num || ''}` // Add a unique key
          }));
          console.log('------', this.deviceNumOptions)
        } else {
          console.error('Failed to get device list or invalid response format');
          // Fallback to default options if API fails
          this.deviceIpOptions = [];
          this.deviceNumOptions = [];
        }

      }).catch(error => {
        console.error('Error fetching device list:', error);

      });
    },
    getPeopleList() {
      getPeopleList().then(response => {
        console.log('getPeopleList:', response)
        if (response && response.data) {
          const peopleList = response.data || [];
          this.memberOptions = peopleList.map((person, index) => ({
            value: person.Num || '',
            label: person.Name || '',
            key: `person-${index}-${person.Num || ''}` // Add a unique key
          }));
        } else {
          console.error('Failed to get people list or invalid response format');
          // Fallback to default options if API fails
          this.memberOptions = [];
        }
      }).catch(error => {
        console.error('Error fetching people list:', error);
      });
    },
    submitTaskForm() {
      // No need to format the date as it's already in the correct format from the datetime picker
      // The value-format="yyyy-MM-dd HH:mm:ss" attribute handles this for us

      // Deep clone the form data to avoid modifying the original
      const formData = JSON.parse(JSON.stringify(this.taskForm));

      // Convert start time to timestamp if it exists
      if (formData.missionLib && formData.missionLib.startTime) {
        // Convert date string to timestamp (milliseconds since epoch)
        const dateObj = new Date(formData.missionLib.startTime);
        formData.missionLib.startTime = Math.floor(dateObj.getTime());
        console.log('Start time converted to timestamp:', formData.missionLib.startTime);
      }

      // Process the form data for submission
      if (formData.missionLib.teams && formData.missionLib.teams[this.selectedTaskType]) {
        const groups = formData.missionLib.teams[this.selectedTaskType].groups;
        if (groups && groups.length > 0) {
          groups.forEach(group => {
            // Convert team.vehicleType to number if it exists
            if (group.vehicleType !== undefined) {
              group.vehicleType = Number(group.vehicleType);
            }

            // Process members if they exist
            if (group.members && group.members.length > 0) {
              group.members.forEach(member => {
                // Convert numeric fields to numbers
                member.memberId = String(member.memberId);
                member.role = Number(member.role || 0);
                member.trackerMode = Number(member.trackerMode || 0);

                // Process tracker devices if they exist
                if (member.tracker && member.tracker.length > 0) {
                  member.tracker.forEach(device => {
                    // Convert useType to number
                    if (device.useType !== undefined) {
                      device.useType = Number(device.useType);
                    }
                  });
                }
              });
            }
          });
        }
      }

      // Submit the form data
      addMission(formData).then(response => {
        if (response.success) {
          this.$message({
            message: '任务提交成功！',
            type: 'success'
          });
          // Only reset form or close dialog on success
          this.$emit('submit-success');
          this.$emit('close');
        } else {
          // Show error message but keep the form data
          this.$message({
            message: `提交失败: ${response.msg || '未知错误'}`,
            type: 'error'
          });
          // Don't reset form or close dialog on error
        }
      }).catch(error => {
        console.error('Error submitting form:', error);
        this.$message({
          message: `提交失败: ${error.message || '网络错误'}`,
          type: 'error'
        });
        // Don't reset form or close dialog on error
      });
    },

  }
}
</script>

<style>
/* 全局弹窗和下拉菜单样式 */
.el-select-dropdown.el-popper {
  z-index: 20000 !important;
}

/* 隐藏下拉框的三角形指示器 */
.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  display: none !important;
}

.el-select-dropdown.el-popper[x-placement^=bottom] {
  margin-top: 5px;
}

.el-select-dropdown__item {
  color: #fff !important;
}

.el-select-dropdown__item.selected,
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #383D44 !important;
}

/* 确保 select 和 popper 总是在最上层 */
body > .el-select-dropdown.el-popper,
body > .el-select__popper.el-popper[role=tooltip] {
  position: fixed !important;
  z-index: 20000 !important;
  background-color: #2e2e3a !important;
  border-color: #383D44 !important;
}
</style>

<style scoped>
.box-card {
  background-color: #383D44;
  border: 1px solid #383D44 !important;
}

.el-select .el-input__inner {
  background-color: #2e2e3a !important;
  border-color: #383D44 !important;
  color: #fff !important;
}

.el-form-item__label {
  color: #fff !important;
}

.box-card {
  /* margin-bottom: 20px; */
  background-color: #383D44;
  border:1px solid #383D44
}

.add-button {
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}

.submit-button {
  background-color: #c1ffff!important;
  border-color: #c1ffff !important;
  color:#000 !important;
}

.submit-button:hover,
.submit-button:focus,
.submit-button:active {
  color: #000 !important;
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

.custom-radio input[type="radio"]+.radio-label {
  padding-left: 20px;
  position: relative;
}

.custom-radio input[type="radio"]+.radio-label::before {
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

.custom-radio input[type="radio"]:checked+.radio-label::before {
  background-color: #c1ffff;
  border-color: #c1ffff;
}

.custom-radio input[type="radio"]:checked+.radio-label::after {
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}



.task-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #C1FFFF, transparent);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.task-card:hover::before {
  transform: translateX(100%);
}

.task-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(193, 255, 255, 0.3);
  border-color: #C1FFFF;
}

.task-card.active {
  border: 2px solid #C1FFFF;
  box-shadow: 0 0 20px rgba(193, 255, 255, 0.3);
  background: linear-gradient(180deg, #2C3E50 0%, #243342 100%);
}

.task-image {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  border-radius: 50%;
  background: rgba(193, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.task-card:hover .task-image,
.task-card.active .task-image {
  background: rgba(193, 255, 255, 0.2);
  transform: scale(1.1);
}

.task-image i {
  font-size: 36px !important;
  color: #C1FFFF;
  transition: all 0.3s ease;
}

.task-card:hover .task-image i,
.task-card.active .task-image i {
  transform: scale(1.1);
}


.task-name {
  text-align: center;
  margin-top: 10px;
  color: #fff;
}

.task-assignment-container {
  background-color: #383D44 !important;
}

.el-card__body,
.el-main {
  padding: 0 !important;
}

.team-button {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
  color:#000 !important;
}

/* 确保按钮在点击和悬停时文字颜色不变 */
.team-button:hover,
.team-button:focus,
.team-button:active {
  color: #000 !important;
}

/* 确保卡片内部的卡片有不同的背景色以区分 */
.el-card .el-card {
  background-color: #7B8B9B;
}

/* 确保折叠面板的所有部分都是灰色背景 */
::v-deep .el-collapse-item__wrap {
  background-color: #737E89 !important;
}

::v-deep .el-collapse-item__content {
  background-color: #737E89 !important;
}

::v-deep .el-collapse {
  border-top: 1px solid #737E89;
  border-bottom: 1px solid #737E89;
  background-color: #737E89 !important;
}

::v-deep .el-collapse-item__header {
  background-color: #737E89 !important;
}
.add-device-button{
  background-color:#c1ffff !important;
  border-color: #c1ffff !important;
  color:#000 !important;
}

.add-device-button:hover,
.add-device-button:focus,
.add-device-button:active {
  color: #000 !important;
}

/* 设置输入框的背景颜色 */
::v-deep .el-input__inner {
  background-color: #2e2e3a !important;
  border-color: #505962 !important;
  color: #fff !important;
}

 /* 设置全局层级管理 */
:deep(.el-dialog__wrapper) {
  position: fixed;
  z-index: 2000;
}

:deep(.el-dialog) {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90vh;
  overflow-y: auto;
}





/* 设置表单标签文字颜色 */
::v-deep .task-form .el-form-item__label {
  color: #fff !important;
}

.el-divider__text {
    position: absolute;
    background-color: #383D44 !important; 
    padding: 0 20px;
    font-weight: 500;
    color: #303133;
}
.white-label {
  color: #fff !important;
}

</style>
