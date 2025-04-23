<template>
  <div class="task-assignment-container">

    <!-- 任务配置 -->
    <el-card class="box-card">



      <div>
        <h4 style="color: #fff;">作业科目</h4>
        <div class="task-type-cards">
          <div v-for="taskType in taskTypes" :key="taskType.id" class="task-card"
            :class="{ 'active': selectedTaskType === taskType.id }" @click="selectTaskType(taskType.id)">
            <div class="task-image" style="background-color: #C4C4C4;">
              <i :class="taskType.icon" style="font-size: 40px;"></i>
            </div>
            <div class="task-name">{{ taskType.name }}</div>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 任务定制弹窗 -->
    <el-dialog :visible.sync="taskDialogVisible" width="1280px" custom-class="task-dialog"
      :modal="false" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">{{ dialogTitle }}</span>
      </div>
      <div class="task-config">
        <div class="delivery-method">
          <h3>方案选择</h3>
          <el-select v-model="selectedPlan" placeholder="请选择方案" class="plan-select" popper-append-to-body>
            <el-option v-for="item in deliveryPlans" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

          <div class="method-cards">
            <div class="method-card">
              <div class="method-image"
                :style="{ 'background-image': getTerrainImage, 'background-size': 'cover', 'background-position': 'center' }">
              </div>
              <span>地形</span>
              <span class="subtitle">{{ getTerrainName }}</span>
            </div>
            <div class="method-card">
              <div class="method-image"
                :style="{ 'background-image': getTimeImage, 'background-size': 'cover', 'background-position': 'center' }">
              </div>
              <span>时间</span>
              <span class="subtitle">{{ getTimeName }}</span>
            </div>
            <div class="method-card">
              <div class="method-image"
                :style="{ 'background-image': getWeatherImage, 'background-size': 'cover', 'background-position': 'center' }">
              </div>
              <span>天气</span>
              <span class="note">雨天</span>
            </div>
            <div class="method-card">
              <span>最大人数：{{ maxPlayers }}</span>
              <span>最长时间：{{ maxDuration }}</span>
              <span>炮火间隔：{{ averageInterval }}</span>
              <span>最小波动：{{ minRandomInterval }}</span>
              <span>最大波动：{{ maxRandomInterval }}</span>
            </div>
          </div>
        </div>

        <div class="member-list">
          <div style="display: flex;">
            <el-button class="add-member-btn" @click="showManageDialog">管理战士列表</el-button>
            <el-form :model="taskForm" label-width="100px" class="task-form">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item label="ID" label-width="100px" class="white-label">
                    <el-input v-model="taskForm.missionLib.id" placeholder="请输入ID"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="任务名称" label-width="100px" class="white-label">
                    <el-input v-model="taskForm.missionLib.name" placeholder="请输入任务名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开始时间" label-width="100px" class="white-label">
                    <el-date-picker ref="startTimePicker" v-model="taskForm.missionLib.startTime" @focus="adjustZIndex" type="datetime"
                      placeholder="请选择开始时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                      append-to-body popper-class="task-date-picker" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>

          <el-table :data="selectedMembers" style="width: 100%" border v-loading="loading">
            <el-table-column label="战士姓名" prop="Name" width="150"></el-table-column>
            <el-table-column label="科目角色">
              <template slot-scope="scope">
                <el-select v-model="scope.row.role" placeholder="请选择角色"
                  @change="(value) => handleRoleChange(value, scope.$index)">
                  <el-option v-for="role in roleOptions" :key="role.value" :label="role.label" :value="role.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="所属小队" prop="teamName" width="150"></el-table-column>
            <el-table-column label="适配头盔编号" prop="deviceNum"></el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="deleteMember(scope.row)" class="delete-btn">
                  <i class="el-icon-delete"></i> 删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="dialog-footer">
          <el-button type="primary" @click="publishTask" class="sure-btn">任务发布</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 管理列表弹窗 -->
    <el-dialog title="管理列表" :visible.sync="manageDialogVisible" width="800px" custom-class="manage-dialog"
      :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false" :modal="false">
      <div class="search-form">
        <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="searchQuery.allContent" placeholder="请输入查询内容" size="medium" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="manage-content">
        <el-table ref="manageTable" :data="tableData" style="width: 100%" :header-cell-style="headerStyle"
          @selection-change="handleSelectionChange" :row-key="row => row.Num" :reserve-selection="true">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="GroupName" label="组织架构"></el-table-column>
          <el-table-column prop="Name" label="战士姓名"></el-table-column>
          <el-table-column prop="Num" label="编号"></el-table-column>

        </el-table>
        <div class="pagination-container">
          <el-pagination class="custom-pagination" @current-change="handleCurrentChange" v-model="CurrentPage"
            :page-size="PerPageCount" layout="total, prev, pager, next" :total="total">
          </el-pagination>

        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmManage" class="sure-btn">确定</el-button>
      </div>
    </el-dialog>


    <!-- 任务基本设置对话框 -->
    <el-dialog title="任务基本设置" :visible.sync="taskSettingsDialogVisible" width="1280px"
      :before-close="closeTaskSettingsDialog" custom-class="task-dialog" :append-to-body="true" :destroy-on-close="true"
      :close-on-click-modal="false" :close-on-press-escape="true" :modal="false" :show-close="false">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">任务基本设置</span>
        <el-button class="header-close-btn" size="small" @click="closeTaskSettingsDialog">关闭</el-button>
      </div>
      <DeviceBinding @next-step="showTaskAssignmentDialog" />
    </el-dialog>
    <!-- 小队任务分配对话框 -->
    <el-dialog title="小队任务分配" :visible.sync="taskAssignmentDialogVisible" width="1280px"
      :before-close="closeTaskAssignmentDialog" custom-class="task-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">小队任务分配</span>
        <el-button class="header-close-btn" size="small" @click="closeTaskAssignmentDialog">关闭</el-button>
      </div>
      <TaskAssignment />
    </el-dialog>
  </div>
</template>

<script>

import { getConfig, getMissionTypeRole, addMission } from '@/api/mission';
import { getPeopleList } from '@/api/user';
import { getDeviceList } from '@/api/device';
import TaskAssignment from './TaskAssignment.vue';
import DeviceBinding from './DeviceBinding.vue';

export default {
  name: 'mixTask',
  components: {
    DeviceBinding,
    TaskAssignment
  },
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
          startTime: new Date(),
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
      },
      maxPlayers: 0, // 最大玩家数
      maxDuration: 0, // 最大持续时间
      averageInterval: 0, // 平均间隔
      minRandomInterval: 0, // 最小随机间隔
      maxRandomInterval: 0, // 最大随机间隔
      schemeNames: [], // 存储方案名称列表
      searchQuery: {
        allContent: ''
      },
      roleOptions: [],
      taskTypeRoles: [], // 存储原始的任务类型角色数据
      selectedRows: [],
      manageDialogVisible: false,
      loading: false,
      CurrentPage: 1,
      PerPageCount: 10,
      total: 0,
      tableData: [],
      headerStyle: {
        background: '#383D44',
        color: '#fff',
        borderColor: '#505962'
      },
      dialogTitle: '任务定制',
      taskSettingsDialogVisible: false,
      taskAssignmentDialogVisible: false,
      selectedTaskType: '',

      taskTypes: [
        { id: 'oilDrumDelivery', name: '任务定制', icon: 'el-icon-goods' },
        { id: 'combatVehicleRefueling', name: '自动构建', icon: 'el-icon-box' },
        { id: 'hotMealPreparation', name: '手动构建', icon: 'el-icon-dish' }
      ],
      taskDialogVisible: false,
      selectedPlan: '',
      deliveryPlans: [

      ],
      selectedMembers: [],
      deviceList: [], // 设备列表
      deviceLoading: false, // 设备加载状态
      allSelectedRows: [], // 存储所有页的选中数据
      roleDeviceMap: [], // 角色与设备的映射
    }
  },
  computed: {
    getTerrainImage() {
      // 只有选择了方案才显示图片
      return this.selectedPlan ? 'url(' + require('@/assets/taskPic/3.png') + ')' : '';
    },
    getTimeImage() {
      // 只有选择了方案才显示图片
      return this.selectedPlan ? 'url(' + require('@/assets/taskPic/5.png') + ')' : '';
    },
    getTerrainName() {
      // 只有选择了方案才显示文本
      return this.selectedPlan ? '丛林' : '';
    },
    getTimeName() {
      // 只有选择了方案才显示文本
      return this.selectedPlan ? '夜晚' : '';
    },
    getWeatherImage() {
      return this.selectedPlan ? 'url(' + require('@/assets/snow.gif') + ')' : '';
    }
  },
  watch: {
    selectedPlan(newValue) {
      if (newValue) {
        // 找到选中的方案
        const selectedPlanData = this.deliveryPlans.find(plan => plan.value === newValue);
        if (selectedPlanData && selectedPlanData.config) {
          // 更新配置参数
          this.maxPlayers = selectedPlanData.config.baseSetting.maxPlayers || 0;
          this.maxDuration = selectedPlanData.config.baseSetting.maxDuration || 0;
          this.averageInterval = selectedPlanData.config.warfareSetting.artilleryStrategy.averageInterval || 0;
          this.minRandomInterval = selectedPlanData.config.warfareSetting.artilleryStrategy.minRandomInterval || 0;
          this.maxRandomInterval = selectedPlanData.config.warfareSetting.artilleryStrategy.maxRandomInterval || 0;
        } else {
          // 重置参数
          this.maxPlayers = 0;
          this.maxDuration = 0;
          this.averageInterval = 0;
          this.minRandomInterval = 0;
          this.maxRandomInterval = 0;
        }
      } else {
        // 重置参数
        this.maxPlayers = 0;
        this.maxDuration = 0;
        this.averageInterval = 0;
        this.minRandomInterval = 0;
        this.maxRandomInterval = 0;
      }
    }
  },
  created() {
    this.getPlans();
    this.fetchMissionTypeRoles();
    this.fetchDeviceList(); // 添加获取设备列表
  },
  mounted() {
   
  },
  methods: {
    adjustZIndex() {
      this.$nextTick(() => {
    setTimeout(() => {
      const popper = document.querySelector('.el-picker__popper');
      if (popper) {
        popper.style.zIndex = '21000'; // 一定要比 20000 高！
      }
    }, 200); // 等待DOM渲染完成
  });
  },
    getPlans() {
      const params = {
        Num: '012'
      }
      getConfig(params).then(res => {
        console.log('获取方案:', res)
        if (res.success && Array.isArray(res.data)) {
          // 创建一个新数组来存储所有方案
          const plans = [];

          // 遍历每个配置项
          res.data.forEach(item => {
            try {
              // 解析 Content 字符串
              const content = JSON.parse(item.Content);
              if (content) {
                if (content.schemeName) {
                  plans.push({
                    value: content.schemeName,
                    label: content.schemeName,
                    config: content // 存储完整的配置信息
                  });
                }
              }
            } catch (parseError) {
              console.error('解析方案内容失败:', parseError);
            }
          });

          // 更新 deliveryPlans
          this.deliveryPlans = plans;
          console.log('方案列表:', this.deliveryPlans);
        }
      }).catch(error => {
        console.error('获取配置失败:', error);
        this.$message.error('获取配置失败');
      });
    },


    showManageDialog() {
      this.manageDialogVisible = true;
      this.loading = true;
      this.CurrentPage = 1; // 重置页码为第一页
      const params = {
        CurrentPage: 1,
        PerPageCount: this.PerPageCount
      };
      getPeopleList(params)
        .then(response => {
          console.log('获取士兵列表：', response)
          if (response.success) {
            this.tableData = response.data.map(item => ({
              GroupName: item.GroupName,
              Name: item.Name,
              Num: item.Num
            }));
            this.total = response.ToalCount; // 使用正确的属性名
            console.log('总数：', this.total);
          }
          console.log('士兵列表：', this.tableData)
        })
        .catch(error => {
          console.error('获取人员列表失败:', error);
          this.$message.error('获取人员列表失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 处理页码变化
    handleCurrentChange(val) {
      console.log('当前第几页：', val);

      // 如果页码相同，不重新加载
      if (val === this.CurrentPage) {
        return;
      }


      this.loading = true;
      const params = {
        CurrentPage: val,
        PerPageCount: this.PerPageCount
      };
      console.log('请求参数:', params);

      getPeopleList(params)
        .then(response => {
          console.log('获取士兵列表：', response);
          if (response.success) {
            // 更新数据
            this.tableData = response.data.map(item => ({
              GroupName: item.GroupName,
              Name: item.Name,
              Num: item.Num
            }));

            // 更新页码和总数
            this.CurrentPage = val;
            this.total = response.ToalCount;

            // 更新选中状态
            this.$nextTick(() => {
              this.tableData.forEach(row => {
                if (this.allSelectedRows.some(selected => selected.Num === row.Num)) {
                  this.$refs.manageTable.toggleRowSelection(row, true);
                }
              });
            });

            console.log('当前页码:', this.CurrentPage);
            console.log('总数:', this.total);
            console.log('选中状态:', this.allSelectedRows);
          }
        })
        .catch(error => {
          console.error('获取人员列表失败:', error);
          this.$message.error('获取人员列表失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },

    // 处理每页显示条数变化
    handleSizeChange(val) {
      console.log('每页条数：', val)
      this.PerPageCount = val; // 正确设置每页条数
      this.CurrentPage = 1; // 重置到第一页
    },
    handleSelectionChange(selection) {
      // 当前页的选中状态
      this.selectedRows = selection;

      // 更新总的选中数据
      // 先移除当前页的旧数据
      this.allSelectedRows = this.allSelectedRows.filter(row => {
        return !this.tableData.some(currentRow => currentRow.Num === row.Num);
      });

      // 添加当前页的新选中数据
      this.allSelectedRows = [...this.allSelectedRows, ...selection];

      console.log('当前页选中的行:', selection);
      console.log('所有选中的行:', this.allSelectedRows);
    },

    handleSearch() {
      const searchText = this.searchQuery.allContent.toLowerCase();
      this.loading = true;

      getPeopleList().then(response => {
        if (response.data && Array.isArray(response.data)) {
          const allData = response.data.map(item => ({
            GroupName: item.GroupName,
            Name: item.Name,
            Num: item.Num
          }));

          // 如果搜索框为空，显示全部数据
          if (!searchText) {
            this.tableData = allData;
          } else {
            // 对所有字段进行模糊搜索
            this.tableData = allData.filter(item => {
              return (
                (item.GroupName && item.GroupName.toLowerCase().includes(searchText)) ||
                (item.Name && item.Name.toLowerCase().includes(searchText)) ||
                (item.Num && item.Num.toString().toLowerCase().includes(searchText))
              );
            });
          }
        }
      }).catch(error => {
        console.error('获取人员列表失败:', error);
        this.$message.error('获取人员列表失败');
      }).finally(() => {
        this.loading = false;
      });
    },

    confirmManage() {
      if (this.allSelectedRows.length === 0) {
        this.$message.warning('请选择人员');
        return;
      }

      // 添加新选中的数据
      this.allSelectedRows.forEach(row => {
        // 检查是否已经存在
        const exists = this.selectedMembers.some(member => member.Name === row.Name);
        if (!exists) {
          const member = {
            Name: row.Name,
            Num: row.Num,  // 添加 Num 属性
            role: '',
            teamName: '',
            deviceNum: ''
          };
          this.selectedMembers.push(member);
        }
      });

      // 重置选中状态
      this.selectedRows = [];
      this.allSelectedRows = [];

      this.manageDialogVisible = false;
      console.log('添加的成员:', this.selectedMembers);
    },

    // 获取设备列表
    async fetchDeviceList() {
      const params = {
        CurrentPage: 1,
        PerPageCount: 1000
      }
      try {
        this.deviceLoading = true;
        const response = await getDeviceList(params);
        console.log('获取设备列表：', response);

        if (response.success && response.data && Array.isArray(response.data)) {
          // 直接使用原始设备数据
          this.deviceList = response.data;
          console.log('设备列表:', this.deviceList);
        }
      } catch (error) {
        console.error('获取设备列表失败:', error);
        this.$message.error(`获取设备列表失败: ${error.message}`);
        this.deviceList = [];
      } finally {
        this.deviceLoading = false;
      }
    },

    // 获取任务类型对应的角色列表
    async fetchMissionTypeRoles() {
      try {
        const response = await getMissionTypeRole();
        console.log('获取角色列表：', response)
        if (response.data && Array.isArray(response.data)) {
          // 保存原始的角色数据以便后续匹配
          this.taskTypeRoles = response.data;

          // 将所有角色数组合并成一个数组
          const allRoles = response.data.reduce((acc, item) => {
            console.log('item:', item);

            if (item.roles && Array.isArray(item.roles) && item.type) {
              // 为每个角色添加任务类型信息
              const rolesWithTaskType = item.roles.map(role => ({
                ...role,
                taskType: item.taskType,
                teamName: item.type.EnName || '',  // 使用 type.EnName 作为小队名称
                deviceNum: item.type.Num || ''     // 使用 type.Num 作为头盔编号
              }));
              acc.push(...rolesWithTaskType);
            }
            console.log('acc:', acc);
            return acc;
          }, []);

          console.log('合并后的角色:', allRoles);
          // 映射角色数据到下拉选项格式
          this.roleOptions = allRoles.map(role => ({
            value: role.Name,
            label: role.Name,
            taskType: role.taskType,
            teamName: role.teamName,
            deviceNum: role.deviceNum
          }));
        }
      } catch (error) {
        console.error('获取角色列表失败:', error);
        this.$message.error('获取角色列表失败');
      }
    },
    handleRoleChange(roleValue, index) {
      console.log('选择角色:', roleValue, '成员索引:', index);
      // 查找选中的角色信息
      const selectedRole = this.roleOptions.find(role => role.value === roleValue);
      console.log('选中的角色信息:', selectedRole);

      if (selectedRole) {
        // 设置角色
        this.selectedMembers[index].role = selectedRole.label;

        // 根据角色名称查找对应的task_type_id
        const roleMapping = {
          '炊事员': 1,
          '反击步兵': 2,
          '热食前送员': 3,
          '油料前送员': 4,
          '加油员': 5,
          '控制员': 6,
          '维修员':7,
          '伤员': 8,
          '医疗员':9
        };

        // 设置角色对应的task_type_id作为Role字段值
        this.selectedMembers[index].roleValue = roleMapping[selectedRole.label] !== undefined
          ? roleMapping[selectedRole.label]
          : 0;

        console.log('设置角色ID:', this.selectedMembers[index].roleValue);

        // 确保设备列表已加载
        if (!this.deviceList || this.deviceList.length === 0) {
          console.warn('设备列表为空，立即获取设备列表');
          this.fetchDeviceList().then(() => {
            // 设备列表加载完成后，重新调用此方法
            this.handleRoleChange(roleValue, index);
          });
          return;
        }

        console.log('设备列表数量:', this.deviceList.length);

        // 查找与当前角色匹配的设备
        // 将科目角色字段与deviceList里的TaskTypeRole的value去匹配
        const matchedDevices = this.deviceList.filter(device =>
          device.TaskTypeRole === selectedRole.label
        );

        console.log('匹配的设备数量:', matchedDevices.length);
        if (matchedDevices.length > 0) {
          console.log('匹配的设备:', matchedDevices.map(d => ({
            taskType: d.TaskType,
            taskTypeRole: d.TaskTypeRole,
            num: d.Num,
            ip: d.Ip
          })));
        }

        // 获取已分配的设备编号
        const usedDeviceNums = this.selectedMembers
          .filter((member, i) => i !== index && member.deviceNum) // 排除当前成员和没有设备编号的成员
          .map(member => member.deviceNum);
        console.log('已使用的设备编号:', usedDeviceNums);

        // 按编号排序匹配的设备
        const sortedMatchedDevices = [...matchedDevices].sort((a, b) => {
          const numA = a.Num ? parseInt(a.Num) : 999999;
          const numB = b.Num ? parseInt(b.Num) : 999999;
          return numA - numB;
        });

        // 找到第一个未使用的匹配设备
        const unusedMatchedDevice = sortedMatchedDevices.find(device =>
          device.Num && !usedDeviceNums.includes(device.Num)
        );

        if (unusedMatchedDevice) {
          // 找到匹配的未使用设备
          console.log('找到匹配的未使用设备:', unusedMatchedDevice);
          // 设置所属小队为设备的TaskType
          this.selectedMembers[index].teamName = unusedMatchedDevice.TaskType || '';
          // 设置适配头盔编号为设备的Num
          this.selectedMembers[index].deviceNum = unusedMatchedDevice.Num || '';
          this.selectedMembers[index].deviceHMDIp = unusedMatchedDevice.Ip || '';
          console.log('设置所属小队:', unusedMatchedDevice.TaskType);
          console.log('设置设备编号:', unusedMatchedDevice.Num);
        } else if (sortedMatchedDevices.length > 0) {
          // 如果所有匹配设备都已使用，则使用第一个匹配设备
          console.log('所有匹配设备已使用，使用第一个匹配设备');
          this.selectedMembers[index].teamName = sortedMatchedDevices[0].TaskType || '';
          this.selectedMembers[index].deviceNum = sortedMatchedDevices[0].Num || '';
          this.selectedMembers[index].deviceHMDIp = sortedMatchedDevices[0].Ip || '';
        } else {
          // 如果没有匹配的设备，则根据角色名称推断小队名称
          console.warn('没有匹配的设备，根据角色名称推断小队名称');
          const teamMapping = {
            '炊事员': '热食制作',
            '反击步兵': '热食前送',
            '热食前送员': '热食前送',
            '油料前送员': '油料前送',
            '加油员': '燃料加注',
            '控制员': '燃料加注',
            '维修员': '战车抢修',
            '伤员': '卫勤救护',
            '医疗员': '卫勤救护'
          };
          this.selectedMembers[index].teamName = teamMapping[selectedRole.label] || '未知小队';
          this.selectedMembers[index].deviceNum = '未找到适配头盔编号';
          this.selectedMembers[index].deviceHMDIp = '';
        }

        console.log('更新后的成员信息:', this.selectedMembers[index]);

        // 强制更新视图
        this.$forceUpdate();
      }
    },
    selectTaskType(type) {
      this.selectedTaskType = type;
      if (type === 'oilDrumDelivery') {
        this.dialogTitle = '任务定制';
        this.taskDialogVisible = true;
        this.selectedPlan = ''; // 重置选中的方案
      } else if (type === 'combatVehicleRefueling') {
        this.dialogTitle = '自动构建';
        this.taskDialogVisible = true;
        
        // 确保方案列表已加载
        if (this.deliveryPlans.length === 0) {
          this.getPlans().then(() => {
            this.selectRandomPlan();
          });
        } else {
          this.selectRandomPlan();
        }
        
        // 清空战士列表和输入框
        this.clearMemberData();
      } else if (type === 'hotMealPreparation') {
        // 打开任务基本设置弹窗
        this.taskSettingsDialogVisible = true;
      }
      this.$emit('task-type-selected', type);
    },

    deleteMember(member) {
      // 查找成员在数组中的索引
      const index = this.selectedMembers.findIndex(item => item === member);
      if (index !== -1) {
        this.selectedMembers.splice(index, 1);
      }
    },
    async publishTask() {
      // 任务发布逻辑
      try {
        // 深拷贝表单数据
        const formData = JSON.parse(JSON.stringify(this.taskForm));

        // 处理开始时间
        if (formData.missionLib && formData.missionLib.startTime) {
          const dateObj = new Date(formData.missionLib.startTime);
          formData.missionLib.startTime = Math.floor(dateObj.getTime() / 1000); // 转换为秒级时间戳
        }

        // 处理选中的方案内容
        if (this.selectedPlan) {
          const selectedPlan = this.deliveryPlans.find(plan => plan.value === this.selectedPlan);
          if (selectedPlan && selectedPlan.config) {
            formData.gameConfig = selectedPlan.config;
          }
        }

        // 1. 清空所有组
        const taskTypes = [
          'hotMealPreparation',
          'hotMealDelivery',
          'oilDrumDelivery',
          'combatVehicleRefueling',
          'combatVehicleMaintenance',
          'medicalEvacuation'
        ];

        // 确保每个科目都有 groups 数组
        taskTypes.forEach(type => {
          if (formData.missionLib[type]) {
            formData.missionLib[type].groups = [];
          }
        });

        // 2. 遍历所有已分配成员
        if (this.selectedMembers && this.selectedMembers.length > 0) {
          console.log('处理选中成员:', this.selectedMembers);

          this.selectedMembers.forEach(member => {
            // 获取成员所属的科目类型
            const teamName = member.teamName;
            if (!teamName) {
              console.warn('成员没有指定小队:', member);
              return;
            }

            // 将小队名称转换为对应的科目key
            let taskType = '';
            switch (teamName) {
              case '热食制作':
                taskType = 'hotMealPreparation';
                break;
              case '热食前送':
                taskType = 'hotMealDelivery';
                break;
              case '油料前送':
                taskType = 'oilDrumDelivery';
                break;
              case '燃料加注':
                taskType = 'combatVehicleRefueling';
                break;
              case '装备抢修':
              case '战车抢修':
                taskType = 'combatVehicleMaintenance';
                break;
              case '卫勤救护':
                taskType = 'medicalEvacuation';
                break;
              default:
                console.warn('未知小队名称:', teamName);
                return;
            }

            if (!formData.missionLib[taskType]) {
              console.warn('未找到对应的科目:', taskType);
              return;
            }

            // 确保科目有groups数组
            if (!formData.missionLib[taskType].groups) {
              formData.missionLib[taskType].groups = [];
            }

            // 获取或创建小组
            const groupId = member.groupId || 1;
            let group = formData.missionLib[taskType].groups.find(g => g.groupId === groupId);
            if (!group) {
              group = {
                groupId: groupId,
                members: []
              };
              formData.missionLib[taskType].groups.push(group);
            }

            // 查找成员ID
            let memberId = '';
            console.log('成员ID：',memberId)
            if (member.Num) {
              memberId = member.Num;
            } else if (member.Name && this.tableData) {
              const person = this.tableData.find(p => p.Name === member.Name);
              if (person) {
                memberId = person.Num;
              }
            }

            if (!memberId) {
              console.warn('未找到成员ID:', member);
              return;
            }

            // 组装成员信息
            const memberInfo = {
              memberId: memberId,
              deviceHMDIp: member.deviceHMDIp || "", // 使用成员的deviceHMDIp字段
              deviceNum: member.deviceNum || "01", // 设备编号
              role: Number(member.roleValue || 0), // 使用roleValue作为Role字段值
              host: member.host === true, // 是否为主机
              useTracker: member.useTracker === true, // 是否追踪
              trackerMode: Number(member.trackerMode || 0) // 追踪模式
            };

            // 如果有追踪设备，添加追踪设备
            if (member.tracker && member.tracker.length > 0) {
              memberInfo.tracker = member.tracker.map(t => ({
                macId: t.macId || "",
                useType: Number(t.useType || 0)
              }));
            }

            // 添加成员到小组
            group.members.push(memberInfo);
          });
        }

        // 确保字段名称符合后端要求（首字母大写）
        const finalData = {
          GameConfig: formData.gameConfig,
          MissionLib: {
            Id: formData.missionLib.id,
            Name: formData.missionLib.name,
            StartTime: formData.missionLib.startTime,
            HotMealPreparation: {
              Name: formData.missionLib.hotMealPreparation.name,
              Groups: formData.missionLib.hotMealPreparation.groups
            },
            HotMealDelivery: {
              Name: formData.missionLib.hotMealDelivery.name,
              Groups: formData.missionLib.hotMealDelivery.groups
            },
            OilDrumDelivery: {
              Name: formData.missionLib.oilDrumDelivery.name,
              Groups: formData.missionLib.oilDrumDelivery.groups
            },
            CombatVehicleRefueling: {
              Name: formData.missionLib.combatVehicleRefueling.name,
              Groups: formData.missionLib.combatVehicleRefueling.groups
            },
            CombatVehicleMaintenance: {
              Name: formData.missionLib.combatVehicleMaintenance.name,
              VehicleType: formData.missionLib.combatVehicleMaintenance.vehicleType || 1,
              Groups: formData.missionLib.combatVehicleMaintenance.groups
            },
            MedicalEvacuation: {
              Name: formData.missionLib.medicalEvacuation.name,
              Groups: formData.missionLib.medicalEvacuation.groups
            }
          },
          Mission_Id_Db: 0 // 服务端返回的ID
        };

        // 确保每个小组成员的字段名称符合后端要求（首字母大写）
        const capitalizeGroups = (groups) => {
          return groups.map(group => ({
            GroupId: group.groupId,
            Members: (group.members || []).map(member => ({
              MemberId: member.memberId,
              DeviceHMDIp: member.deviceHMDIp,
              DeviceNum: member.deviceNum,
              Role: member.role,
              Host: member.host,
              UseTracker: member.useTracker,
              TrackerMode: member.trackerMode,
              Tracker: member.tracker ? member.tracker.map(t => ({
                MacId: t.macId,
                UseType: t.useType
              })) : undefined
            }))
          }));
        };

        // 应用字段名称转换
        taskTypes.forEach(type => {
          const capitalType = type.charAt(0).toUpperCase() + type.slice(1);
          if (finalData.MissionLib[capitalType] && finalData.MissionLib[capitalType].Groups) {
            finalData.MissionLib[capitalType].Groups = capitalizeGroups(finalData.MissionLib[capitalType].Groups);
          }
        });

        // 确保GameConfig字段名称符合要求
        if (finalData.GameConfig) {
          finalData.GameConfig = {
            BaseSetting: {
              MaxPlayers: finalData.GameConfig.baseSetting.maxPlayers,
              MaxDuration: finalData.GameConfig.baseSetting.maxDuration,
              HostIP: finalData.GameConfig.baseSetting.hostIP
            },
            WarfareSetting: {
              Terrain: finalData.GameConfig.warfareSetting.terrain,
              ArtilleryStrategy: {
                AverageInterval: finalData.GameConfig.warfareSetting.artilleryStrategy.averageInterval,
                MinRandomInterval: finalData.GameConfig.warfareSetting.artilleryStrategy.minRandomInterval,
                MaxRandomInterval: finalData.GameConfig.warfareSetting.artilleryStrategy.maxRandomInterval
              },
              Time: finalData.GameConfig.warfareSetting.time,
              Weather: (finalData.GameConfig.warfareSetting.weather || []).map(w => ({
                Index: w.index,
                Type: w.type,
                Duration: w.duration
              }))
            }
          };
        }

        // 使用设备ID作为memberId
        taskTypes.forEach(type => {
          const capitalType = type.charAt(0).toUpperCase() + type.slice(1);
          if (finalData.MissionLib[capitalType] && finalData.MissionLib[capitalType].Groups) {
            finalData.MissionLib[capitalType].Groups.forEach(group => {
              group.Members.forEach(member => {
                // 查找对应的设备，使用设备ID作为memberId
                if (member.deviceNum) {
                  const matchedDevice = this.deviceList.find(device => device.Num === member.deviceNum);
                  if (matchedDevice && matchedDevice.Id) {
                    // 使用设备的Id作为memberId
                    member.MemberId = String(matchedDevice.Id);
                    console.log('使用设备ID作为memberId:', member.deviceNum, '->', member.MemberId);
                  } else {
                    // 如果找不到匹配的设备，保持原有的memberId
                    member.MemberId = String(member.MemberId || '0');
                    console.warn('未找到匹配的设备ID，使用原有memberId:', member.MemberId);
                  }
                } else {
                  // 如果没有设备编号，保持原有的memberId
                  member.MemberId = String(member.MemberId || '0');
                  console.warn('成员没有设备编号，使用原有memberId:', member.MemberId);
                }
                
                // 转换其他数字字段
                member.Role = Number(member.Role || 0);
                member.TrackerMode = Number(member.TrackerMode || 0);

                // 处理设备数据
              });
            });
          }
        });

        console.log('最终任务数据:', finalData);

        // 调用添加任务接口
        const response = await addMission(finalData);

        if (response.success) {
          this.$message.success('任务发布成功');
          this.dialogVisible = false;
          this.$emit('submit-success'); // 触发成功事件，父组件可以刷新列表
        } else {
          this.$message.error(response.message || '任务发布失败');
        }
      } catch (error) {
        console.error('Error submitting task:', error);
        this.$message.error('发生错误，请重试');
      }
    },

    closeTaskSettingsDialog() {
      this.taskSettingsDialogVisible = false;
    },

    closeTaskAssignmentDialog() {
      this.taskAssignmentDialogVisible = false;
    },



    showTaskAssignmentDialog() {
      this.taskSettingsDialogVisible = false;
      this.taskAssignmentDialogVisible = true;
    },

    // 随机选择一个方案
    selectRandomPlan() {
      if (this.deliveryPlans.length > 0) {
        // 随机选择一个方案
        const randomIndex = Math.floor(Math.random() * this.deliveryPlans.length);
        const randomPlan = this.deliveryPlans[randomIndex];
        this.selectedPlan = randomPlan.value;
        
        // 更新任务表单数据
        if (randomPlan.config) {
          this.taskForm.gameConfig = randomPlan.config;
          
          // 更新最大玩家数显示
          this.maxPlayers = randomPlan.config.baseSetting?.maxPlayers || 0;
          
          // 记录日志
          console.log('随机选择方案:', randomPlan.label);
          console.log('方案配置:', randomPlan.config);
        }
      } else {
        console.warn('没有可用的方案');
        this.$message.warning('没有可用的方案');
      }
    },
    
    // 清空成员数据
    clearMemberData() {
      // 清空所有任务类型的组成员
      const taskTypes = [
        'hotMealPreparation',
        'hotMealDelivery',
        'oilDrumDelivery',
        'combatVehicleRefueling',
        'combatVehicleMaintenance',
        'medicalEvacuation'
      ];
      
      taskTypes.forEach(taskType => {
        if (this.taskForm.missionLib[taskType]) {
          this.taskForm.missionLib[taskType].groups = [];
        }
      });
      
      // 清空选中的成员列表
      this.selectedMembers = [];
      
      // 重置任务ID和名称
      this.taskForm.missionLib.id = 0;
      this.taskForm.missionLib.name = '';
      
      console.log('已清空任务ID、名称和战士列表');
    },
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'SourceHanSerifSC';
  src: url('../../assets/fonts/NotoSerifCJKSC-Black.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

.task-assignment-container {
  position: relative;
  z-index: 10000;
  background-color: #2C3E50;
  color: #fff;
}

.box-card {
  background-color: #383D44;
  /* Dark card background */
  border-radius: 8px;
  /* Round edges for cards */
  border: 1px solid #505962;
  /* Light border color */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  /* Soft shadow */
}

.task-type-cards {
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.task-card {
  width: 180px;
  height: 180px;
  background: linear-gradient(180deg, #2C3E50 0%, #1E2A3A 100%);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  width: 80px;
  height: 80px;
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
  font-size: 18px;
  color: #fff;
  text-align: center;
  font-family: 'SourceHanSerifSC', serif;
  font-weight: 500;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(193, 255, 255, 0.3);
}

.task-card:hover .task-name,
.task-card.active .task-name {
  color: #C1FFFF;
}

/* Dialog styles */
.task-dialog {
  background-color: #383D44;
  color: #fff !important;

}

.task-dialog :deep(.el-dialog) {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  background: #383D44;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 30000;
  /* 增加 z-index，确保弹窗处于最上层 */
  box-sizing: border-box;
}

.task-dialog :deep(.el-dialog__header) {
  background-color: #2C3E50;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color:#fff !important;
}

.task-dialog :deep(.el-dialog__title) {
  color: #fff !important;
  font-size: 20px;
}

.task-dialog :deep(.el-dialog__body) {
  padding: 30px;
}

.delivery-method {}

.delivery-method h3 {
  color: #fff;
  margin-bottom: 20px;


}

.method-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  /* justify-content: center; */
}

.method-card {
  width: calc(23.33%- 20px);
  min-width: 260px;
  height: 200px;
  background: #2C3E50;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.method-card .method-image {
  width: 160px;
  height: 120px;
  background: #1E2A3A;
  border-radius: 4px;
  margin-bottom: 10px;
}

.method-card span {
  color: #fff;
  text-align: center;
}

.method-card .subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 5px;
}

.method-card .note {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  margin-top: 5px;
  line-height: 1.2;
}

.member-list {
  margin-top: 30px;
}

.add-member-btn {
  margin-bottom: 20px;
  background-color: #c1ffff;
  border-color: #c1ffff
}

.dialog-footer {
  text-align: center;
  margin-top: 30px;
}

/* Element UI table overrides */
.el-table {
  background-color: transparent;
  color: #fff;
}

.el-table th,
.el-table tr {
  background-color: transparent;
  color: #fff;
}

.el-table td,
.el-table th.is-leaf {
  background-color: #2C3E50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #1E2A3A;
}

.plan-select {
  margin-bottom: 20px;
  width: 100%;
  z-index: 9999;
  /* 增加 z-index 确保下拉框显示在顶部 */
  background-color: #383D44 !important;
  /* 确保下拉框背景颜色一致 */
  border-radius: 8px;
  /* 保持与页面一致的圆角效果 */
  color: #fff;
  /* 设置字体颜色 */
}

:deep(.el-select-dropdown) {
  background-color: #2e2e3a !important;
  border: 1px solid #383D44 !important;
  z-index: 30000 !important;
}

:deep(.el-select-dropdown__item) {
  color: #f0f0f0 !important;
}

:deep(.el-select-dropdown__item.hover),
:deep(.el-select-dropdown__item:hover) {
  background-color: #383D44 !important;
}

:deep(.el-select-dropdown__item.selected) {
  color: #C1FFFF !important;
  background-color: #383D44 !important;
}

/* 管理列表弹窗样式 */
.manage-dialog {
  position: relative;
  z-index: 3001 !important;
}

:deep(.manage-dialog) {
  background: #383D44;
  border: none;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

:deep(.el-dialog__wrapper) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 3000 !important;
}

:deep(.el-overlay) {
  display: none !important;
}

:deep(.manage-dialog .el-dialog__header) {
  background: #383D44;
  padding: 15px 20px;
  margin: 0;
  border-bottom: 1px solid #505962;
}

:deep(.manage-dialog .el-dialog__title) {
  color: #fff;
  font-size: 16px;
}

:deep(.manage-dialog .el-dialog__body) {
  background: #383D44;
  padding: 20px;
}

:deep(.manage-dialog .el-dialog__footer) {
  background: #383D44;
  padding: 10px 20px;
  border-top: 1px solid #505962;
}

:deep(.manage-dialog .el-table) {
  background-color: transparent;
  color: #fff;
}

:deep(.manage-dialog .el-table::before) {
  display: none;
}

:deep(.manage-dialog .el-table th) {
  background-color: #383D44;
  border-bottom: 1px solid #505962;
  color: #fff;
}

:deep(.manage-dialog .el-table td) {
  background-color: transparent;
  border-bottom: 1px solid #505962;
}

:deep(.manage-dialog .el-button--text) {
  color: #c1ffff;
}

:deep(.manage-dialog .el-checkbox__inner) {
  background-color: transparent;
  border-color: #505962;
}

:deep(.manage-dialog .el-checkbox__input.is-checked .el-checkbox__inner) {
  background-color: #c1ffff;
  border-color: #c1ffff;
}

.el-table .cell {
  white-space: nowrap !important;
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

::v-deep .el-table__body tr:hover>td {
  background-color: #7B8B9B !important;
}

::v-deep .el-table .el-table__header th {
  background-color: #6C767F !important;
  color: #f0f0f0 !important;
}

.sure-btn {
  color: #000;
}

:deep(.task-dialog) {
  width: 90vw !important;
  max-width: 1280px !important;
  height: 90vh !important;
  max-height: 720px !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  margin: 0 !important;
}

:deep(.task-dialog .el-dialog__wrapper) {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  background-color: #383D44;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 30000;
}

:deep(.task-dialog .el-dialog__header) {
  background-color: #61646A;
  color: #fff;
}

:deep(.task-dialog .el-dialog__body) {
  height: calc(90vh - 120px);
  max-height: calc(720px - 120px);
  overflow-y: auto;
  background-color: #383D44;
  padding: 30px;
}

.task-form :deep(.el-input__inner) {
  color: #fff !important;
}
:deep(.el-select .el-input__inner) {
  color: #fff !important;
}
.task-form :deep(.el-form-item__label) {
  color: #fff !important;
}

.white-label :deep(.el-form-item__label) {
  color: #fff !important;
}

/* 确保时间选择器的下拉框显示在对话框上方 */
/* 设置日期选择器弹出层样式 */
.task-date-picker {
  z-index: 30000 !important;
}

:deep(.el-dialog) {
  z-index: 2001;
}

:deep(.el-dialog__wrapper) {
  z-index: 2001;
}

:deep(.el-overlay) {
  z-index: 2000;
}

:deep(.el-date-editor) {
  position: relative;
}

:deep(.el-input__wrapper) {
  position: relative;
}

:deep(.el-popper.task-date-picker) {
  position: fixed !important;
  z-index: 30000 !important;
}

:deep(.el-picker__popper) {
  z-index: 30000 !important;
}
</style>
<style>
.el-picker__popper,
.el-popover,
.el-select-dropdown {
  z-index: 30000 !important;  /* 要比 dialog 最大值高 */
  position: absolute !important;
}

/* 修复被遮挡的关键 dialog 样式，避免 overflow hidden */
.el-dialog__wrapper {
  overflow: visible !important;
}
</style>