<template>
  <div class="intelligent-guidance-management">
    <div class="page-header">
      <!-- <h2>智能指导</h2> -->
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
            <!-- 任务开始提示 -->
            <div class="setting-item">
              <div class="setting-label">任务开始提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.taskStartPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.taskStartPrompt ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 油料前送智能指导提示 -->
            <div class="setting-item">
              <div class="setting-label">油料前送智能指导提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.oilDeliveryGuide"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.oilDeliveryGuide ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 油料加注智能指导提示 -->
            <div class="setting-item">
              <div class="setting-label">油料加注智能指导提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.fuelInjectionGuide"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.fuelInjectionGuide ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食制作智能指导提示 -->
            <div class="setting-item">
              <div class="setting-label">热食制作智能指导提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.foodPreparationGuide"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.foodPreparationGuide ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 热食前送智能指导提示 -->
            <div class="setting-item">
              <div class="setting-label">热食前送智能指导提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.foodDeliveryGuide"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.foodDeliveryGuide ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 医疗救护智能指导提示 -->
            <div class="setting-item">
              <div class="setting-label">医疗救护智能指导提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.medicalRescueGuide"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.medicalRescueGuide ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 装备抢修智能指导提示 -->
            <div class="setting-item">
              <div class="setting-label">装备抢修智能指导提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.equipmentRepairGuide"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.equipmentRepairGuide ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 任务完成提示 -->
            <div class="setting-item">
              <div class="setting-label">任务完成提示：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.taskCompletionPrompt"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.taskCompletionPrompt ? '开启' : '关闭' }}</span>
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
  name: 'IntelligentGuidance',
  data() {
    return {
      configId: 96, // 智能指导配置ID
      settings: {
        taskStartPrompt: false,
        oilDeliveryGuide: false,
        fuelInjectionGuide: false,
        foodPreparationGuide: false,
        foodDeliveryGuide: false,
        medicalRescueGuide: false,
        equipmentRepairGuide: false,
        taskCompletionPrompt: false
      },
      loading: false,
      saveLoading: false
    };
  },
  created() {
    this.fetchSettings();
  },
  methods: {
    // 获取智能指导设置
    fetchSettings() {
      this.loading = true;
      getRuleDetail({Num: this.configId})
        .then(response => {
          console.log('--智能指导设置--', response);
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
                console.warn('智能指导设置为空，使用默认值');
              }
            } catch (error) {
              console.error('解析智能指导设置失败:', error);
              this.$message.error('解析智能指导设置失败');
            }
          } else {
            this.$message.error(response?.msg || '获取智能指导设置失败');
          }
        })
        .catch(error => {
          console.error('获取智能指导设置失败:', error);
          this.$message.error('获取智能指导设置失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 保存智能指导设置
    saveSettings() {
      this.saveLoading = true;
      
      const data = {
        Num: this.configId.toString(),
        Content: JSON.stringify(this.settings),
        Index: 4,  // 使用默认索引
        Type: 1    // 使用默认类型
      };
      
      console.log('--更新智能指导设置--', data);
      updateRule(data)
        .then(response => {
          console.log('--保存智能指导设置响应--', response);
          if (response && response.success) {
            this.$message.success('保存成功');
            // 重新获取最新设置，确保数据同步
            this.fetchSettings();
          } else {
            this.$message.error(response?.msg || '保存失败');
          }
        })
        .catch(error => {
          console.error('保存智能指导设置失败:', error);
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
.intelligent-guidance-management {
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
