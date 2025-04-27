<template>
  <div class="guidance-system-management">
    <div class="page-header">
      <!-- <h2>伴随指导</h2> -->
    </div>

    <div class="guidance-container">
      <el-card class="guidance-card">
        <div slot="header" class="card-header">
          <el-button 
            type="primary" 
            size="small" 
            @click="saveSettings" 
            :loading="saveLoading"
            style="margin-left: 20px; color: #000;">
            保存修改
          </el-button>
        </div>
        
        <div class="guidance-content">
          <div class="settings-list">
            <!-- 岸滩冲刺计时提示 -->
            <div class="setting-item">
              <div class="setting-label">岸滩冲刺计时提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.beachSprintTimerPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.beachSprintTimerPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 油料前送油桶平衡提示 -->
            <div class="setting-item">
              <div class="setting-label">油料前送油桶平衡提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.fuelForwardBarrelBalancePrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.fuelForwardBarrelBalancePrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 油料前送运动姿态提示 -->
            <div class="setting-item">
              <div class="setting-label">油料前送运动姿态提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.fuelForwardPosturePrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.fuelForwardPosturePrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 油料前送标准路线偏差提示 -->
            <div class="setting-item">
              <div class="setting-label">油料前送标准路线偏差提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.fuelForwardRouteDeviationPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.fuelForwardRouteDeviationPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 油料加注计时提示 -->
            <div class="setting-item">
              <div class="setting-label">油料加注计时提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.fuelRefuelingTimerPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.fuelRefuelingTimerPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 油料加注控制提示 -->
            <div class="setting-item">
              <div class="setting-label">油料加注控制提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.fuelRefuelingControlPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.fuelRefuelingControlPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食制作计时提示 -->
            <div class="setting-item">
              <div class="setting-label">热食制作计时提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.hotMealPreparationTimerPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.hotMealPreparationTimerPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食制作热敏感提示 -->
            <div class="setting-item">
              <div class="setting-label">热食制作热敏感提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.hotMealThermalSensitivityPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.hotMealThermalSensitivityPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食制作烟敏感提示 -->
            <div class="setting-item">
              <div class="setting-label">热食制作烟敏感提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.hotMealSmokeSensitivityPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.hotMealSmokeSensitivityPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食制作红外提示 -->
            <div class="setting-item">
              <div class="setting-label">热食制作红外提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.hotMealInfraredPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.hotMealInfraredPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食前送计时提示 -->
            <div class="setting-item">
              <div class="setting-label">热食前送计时提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.hotMealDeliveryTimerPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.hotMealDeliveryTimerPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食前送运动姿态提示 -->
            <div class="setting-item">
              <div class="setting-label">热食前送运动姿态提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.hotMealDeliveryPosturePrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.hotMealDeliveryPosturePrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食前送标准路线偏差提示 -->
            <div class="setting-item">
              <div class="setting-label">热食前送标准路线偏差提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.hotMealDeliveryRouteDeviationPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.hotMealDeliveryRouteDeviationPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食前送火力覆盖提示 -->
            <div class="setting-item">
              <div class="setting-label">热食前送火力覆盖提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.hotMealDeliveryFireCoveragePrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.hotMealDeliveryFireCoveragePrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 医疗救护担架计时提示 -->
            <div class="setting-item">
              <div class="setting-label">医疗救护担架计时提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.medicalRescueTimerPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.medicalRescueTimerPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 医疗救护急救提示 -->
            <div class="setting-item">
              <div class="setting-label">医疗救护急救提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.medicalRescueAidPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.medicalRescueAidPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 医疗救护担架平衡度提示 -->
            <div class="setting-item">
              <div class="setting-label">医疗救护担架平衡度提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.medicalRescueStretcherBalancePrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.medicalRescueStretcherBalancePrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 医疗救护担架计时提示 -->
            <div class="setting-item">
              <div class="setting-label">医疗救护担架计时提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.medicalRescueStretcherTimerPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.medicalRescueStretcherTimerPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 医疗救护转运协作提示 -->
            <div class="setting-item">
              <div class="setting-label">医疗救护转运协作提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.medicalRescueTransferCoopPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.medicalRescueTransferCoopPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 装备抢修计时提示 -->
            <div class="setting-item">
              <div class="setting-label">装备抢修计时提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.equipmentRepairTimerPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.equipmentRepairTimerPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 装备抢修流程提示 -->
            <div class="setting-item">
              <div class="setting-label">装备抢修流程提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.equipmentRepairProcedurePrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.equipmentRepairProcedurePrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 装备抢修定位提示 -->
            <div class="setting-item">
              <div class="setting-label">装备抢修定位提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.equipmentRepairPositionPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.equipmentRepairPositionPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 装备抢修协作提示 -->
            <div class="setting-item">
              <div class="setting-label">装备抢修协作提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.equipmentRepairCoopPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.equipmentRepairCoopPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 装备抢修进度提示 -->
            <div class="setting-item">
              <div class="setting-label">装备抢修进度提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.equipmentRepairProgressPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.equipmentRepairProgressPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRuleDetail, updateRule } from '@/api/rules';

export default {
  name: 'GuidanceSystem',
  data() {
    return {
      configId: 97, // 伴随指导配置ID
      settings: {
        beachSprintTimerPrompt: false,
        fuelForwardBarrelBalancePrompt: false,
        fuelForwardPosturePrompt: false,
        fuelForwardRouteDeviationPrompt: false,
        fuelRefuelingTimerPrompt: false,
        fuelRefuelingControlPrompt: false,
        hotMealPreparationTimerPrompt: false,
        hotMealThermalSensitivityPrompt: false,
        hotMealSmokeSensitivityPrompt: false,
        hotMealInfraredPrompt: false,
        hotMealDeliveryTimerPrompt: false,
        hotMealDeliveryPosturePrompt: false,
        hotMealDeliveryRouteDeviationPrompt: false,
        hotMealDeliveryFireCoveragePrompt: false,
        medicalRescueTimerPrompt: false,
        medicalRescueAidPrompt: false,
        medicalRescueStretcherBalancePrompt: false,
        medicalRescueStretcherTimerPrompt: false,
        medicalRescueTransferCoopPrompt: false,
        equipmentRepairTimerPrompt: false,
        equipmentRepairProcedurePrompt: false,
        equipmentRepairPositionPrompt: false,
        equipmentRepairCoopPrompt: false,
        equipmentRepairProgressPrompt: false
      },
      loading: false,
      saveLoading: false
    };
  },
  created() {
    this.fetchSettings();
  },
  methods: {
    // 获取伴随指导设置
    fetchSettings() {
      this.loading = true;
      getRuleDetail({Num: this.configId})
        .then(response => {
          console.log('--伴随指导设置--', response);
          // 检查数据结构，根据截图中的数据结构调整
          if (response && response.data && Array.isArray(response.data)) {
            try {
              // 使用数组中的第一个元素
              const dataItem = response.data[0];
              if (dataItem && dataItem.Content) {
                const content = JSON.parse(dataItem.Content);
                console.log('解析后的设置数据:', content);
                // 更新设置
                this.settings = { ...this.settings, ...content };
              } else {
                console.warn('伴随指导设置为空，使用默认值');
              }
            } catch (error) {
              console.error('解析伴随指导设置失败:', error);
              this.$message.error('解析伴随指导设置失败');
            }
          } else {
            this.$message.error(response?.msg || '获取伴随指导设置失败');
          }
        })
        .catch(error => {
          console.error('获取伴随指导设置失败:', error);
          this.$message.error('获取伴随指导设置失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 保存伴随指导设置
    saveSettings() {
      this.saveLoading = true;
      
      const data = {
        Num: this.configId.toString(),
        Content: JSON.stringify(this.settings),
        Index: 3,  // 使用默认索引
        Type: 1    // 使用默认类型
      };
      
      console.log('--更新伴随指导设置--', data);
      updateRule(data)
        .then(response => {
          console.log('--保存伴随指导设置响应--', response);
          if (response && response.success) {
            this.$message.success('保存成功');
            // 重新获取最新设置，确保数据同步
            this.fetchSettings();
          } else {
            this.$message.error(response?.msg || '保存失败');
          }
        })
        .catch(error => {
          console.error('保存伴随指导设置失败:', error);
          this.$message.error('保存失败');
        })
        .finally(() => {
          this.saveLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.guidance-system-management {
  padding: 20px;
  background-color: #383d44;
  min-height: 100vh;
  color: #fff;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  font-size: 24px;
  color: #fff;
  margin: 0;
}

.guidance-container {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

.guidance-card {
  background-color: #2c3e50;
  border: none;
  color: #fff;
}

.card-header {
  display: flex;
  align-items: center;
}

.card-header span {
  font-size: 18px;
  font-weight: bold;
}

.settings-list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #3a4b5c;
  border-radius: 6px;
}

.setting-label {
  flex: 0 0 220px;
  font-size: 14px;
  color: #fff;
}

.setting-control {
  flex: 1;
  display: flex;
  align-items: center;
}

.setting-status {
  margin-left: 10px;
  color: #fff;
}

/* 覆盖Element UI样式 */
:deep(.el-card__body) {
  padding: 0;
}
</style>
