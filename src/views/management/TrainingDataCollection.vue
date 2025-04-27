<template>
  <div class="training-data-management">
    <div class="page-header">
      <!-- <h2>训练数据采集与存储</h2> -->
    </div>

    <div class="training-container">
      <el-card class="training-card">
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
        
        <div class="training-content">
          <div class="settings-list">
            <!-- 总任务计时器 -->
            <div class="setting-item">
              <div class="setting-label">总任务计时器：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.totalTaskTimer"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.totalTaskTimer ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 小组任务计时器 -->
            <div class="setting-item">
              <div class="setting-label">小组任务计时器：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.groupTaskTimer"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.groupTaskTimer ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 个人任务计时器 -->
            <div class="setting-item">
              <div class="setting-label">个人任务计时器：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.individualTaskTimer"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.individualTaskTimer ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 全身姿态采集 -->
            <div class="setting-item">
              <div class="setting-label">全身姿态采集：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.fullBodyPostureCollection"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.fullBodyPostureCollection ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 独立追踪采集 -->
            <div class="setting-item">
              <div class="setting-label">独立追踪采集：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.independentTrackingCollection"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.independentTrackingCollection ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 个人步骤计时器 -->
            <div class="setting-item">
              <div class="setting-label">个人步骤计时器：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.individualStepwiseTimer"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.individualStepwiseTimer ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 个人步骤准确度 -->
            <div class="setting-item">
              <div class="setting-label">个人步骤准确度：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.individualStepwiseAccuracy"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.individualStepwiseAccuracy ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 个人步骤路径偏差 -->
            <div class="setting-item">
              <div class="setting-label">个人步骤路径偏差：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.individualStepwisePathDeviation"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.individualStepwisePathDeviation ? '开启' : '关闭' }}</span>
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
  name: 'TrainingDataCollection',
  data() {
    return {
      configId: 95, // 训练数据采集配置ID
      settings: {
        totalTaskTimer: true,
        groupTaskTimer: true,
        individualTaskTimer: true,
        fullBodyPostureCollection: true,
        independentTrackingCollection: true,
        individualStepwiseTimer: true,
        individualStepwiseAccuracy: true,
        individualStepwisePathDeviation: true
      },
      loading: false,
      saveLoading: false
    };
  },
  created() {
    this.fetchSettings();
  },
  methods: {
    // 获取训练数据采集设置
    fetchSettings() {
      this.loading = true;
      getRuleDetail({Num: this.configId})
        .then(response => {
          console.log('--训练数据采集设置--', response);
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
                console.warn('训练数据采集设置为空，使用默认值');
              }
            } catch (error) {
              console.error('解析训练数据采集设置失败:', error);
              this.$message.error('解析训练数据采集设置失败');
            }
          } else {
            this.$message.error(response?.msg || '获取训练数据采集设置失败');
          }
        })
        .catch(error => {
          console.error('获取训练数据采集设置失败:', error);
          this.$message.error('获取训练数据采集设置失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 保存训练数据采集设置
    saveSettings() {
      this.saveLoading = true;
      
      const data = {
        Num: this.configId.toString(),
        Content: JSON.stringify(this.settings),
        Index: 5,  // 使用默认索引
        Type: 1    // 使用默认类型
      };
      
      console.log('--更新训练数据采集设置--', data);
      updateRule(data)
        .then(response => {
          console.log('--保存训练数据采集设置响应--', response);
          if (response && response.success) {
            this.$message.success('保存成功');
            // 重新获取最新设置，确保数据同步
            this.fetchSettings();
          } else {
            this.$message.error(response?.msg || '保存失败');
          }
        })
        .catch(error => {
          console.error('保存训练数据采集设置失败:', error);
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
.training-data-management {
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

.training-container {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

.training-card {
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
