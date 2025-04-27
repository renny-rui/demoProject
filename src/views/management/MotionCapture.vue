<template>
  <div class="motion-capture-management">
    <div class="page-header">
      <!-- <h2>动作捕捉与感应反馈</h2> -->
    </div>

    <div class="motion-container">
      <el-card class="motion-card">
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
        
        <div class="motion-content">
          <div class="settings-list">
            <!-- 全身姿态捕捉 -->
            <div class="setting-item">
              <div class="setting-label">全身姿态捕捉：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.fullBodyPoseCaptureEnabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.fullBodyPoseCaptureEnabled ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 全身姿态捕捉敏感度 -->
            <div class="setting-item">
              <div class="setting-label">全身姿态捕捉敏感度：</div>
              <div class="setting-control">
                <el-radio-group v-model="settings.fullBodyPoseCaptureSensitivity">
                  <el-radio label="level1">一级</el-radio>
                  <el-radio label="level2">二级</el-radio>
                  <el-radio label="level3">三级</el-radio>
                </el-radio-group>
              </div>
            </div>
            
            <!-- 独立追踪捕捉 -->
            <div class="setting-item">
              <div class="setting-label">独立追踪捕捉：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.independentTrackingEnabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.independentTrackingEnabled ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 独立追踪捕捉敏感度 -->
            <div class="setting-item">
              <div class="setting-label">独立追踪捕捉敏感度：</div>
              <div class="setting-control">
                <el-radio-group v-model="settings.independentTrackingSensitivity">
                  <el-radio label="level1">一级</el-radio>
                  <el-radio label="level2">二级</el-radio>
                  <el-radio label="level3">三级</el-radio>
                </el-radio-group>
              </div>
            </div>
            
            <!-- 头部深度精确捕捉 -->
            <div class="setting-item">
              <div class="setting-label">头部深度精确捕捉：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.headDepthPrecisionEnabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.headDepthPrecisionEnabled ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 头部深度精确敏感度 -->
            <div class="setting-item">
              <div class="setting-label">头部深度精确敏感度：</div>
              <div class="setting-control">
                <el-radio-group v-model="settings.headDepthPrecisionSensitivity">
                  <el-radio label="level1">一级</el-radio>
                  <el-radio label="level2">二级</el-radio>
                  <el-radio label="level3">三级</el-radio>
                </el-radio-group>
              </div>
            </div>
            
            <!-- 腿部深度精确捕捉 -->
            <div class="setting-item">
              <div class="setting-label">腿部深度精确捕捉：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.legDepthPrecisionEnabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.legDepthPrecisionEnabled ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 腿部深度精确捕捉敏感度 -->
            <div class="setting-item">
              <div class="setting-label">腿部深度精确捕捉敏感度：</div>
              <div class="setting-control">
                <el-radio-group v-model="settings.legDepthPrecisionSensitivity">
                  <el-radio label="level1">一级</el-radio>
                  <el-radio label="level2">二级</el-radio>
                  <el-radio label="level3">三级</el-radio>
                </el-radio-group>
              </div>
            </div>
            
            <!-- 手部深度精确捕捉 -->
            <div class="setting-item">
              <div class="setting-label">手部深度精确捕捉：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.handDepthPrecisionEnabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.handDepthPrecisionEnabled ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 手部深度精确捕捉敏感度 -->
            <div class="setting-item">
              <div class="setting-label">手部深度精确捕捉敏感度：</div>
              <div class="setting-control">
                <el-radio-group v-model="settings.handDepthPrecisionSensitivity">
                  <el-radio label="level1">一级</el-radio>
                  <el-radio label="level2">二级</el-radio>
                  <el-radio label="level3">三级</el-radio>
                </el-radio-group>
              </div>
            </div>
            
            <!-- 战术背心全局震动 -->
            <div class="setting-item">
              <div class="setting-label">战术背心全局震动：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.vestGlobalVibrationEnabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.vestGlobalVibrationEnabled ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 战术背心局部震动 -->
            <div class="setting-item">
              <div class="setting-label">战术背心局部震动：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.vestLocalVibrationEnabled"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.vestLocalVibrationEnabled ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 战术背心震动级数 -->
            <div class="setting-item">
              <div class="setting-label">战术背心震动级数：</div>
              <div class="setting-control">
                <el-radio-group v-model="settings.vestVibrationLevel">
                  <el-radio label="level1">一级</el-radio>
                  <el-radio label="level2">二级</el-radio>
                  <el-radio label="level3">三级</el-radio>
                </el-radio-group>
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
  name: 'MotionCapture',
  data() {
    return {
      configId: 98, // 动作捕捉配置ID
      settings: {
        fullBodyPoseCaptureEnabled: true,
        fullBodyPoseCaptureSensitivity: 'level3',
        independentTrackingEnabled: true,
        independentTrackingSensitivity: 'level3',
        headDepthPrecisionEnabled: true,
        headDepthPrecisionSensitivity: 'level3',
        legDepthPrecisionEnabled: true,
        legDepthPrecisionSensitivity: 'level3',
        handDepthPrecisionEnabled: true,
        handDepthPrecisionSensitivity: 'level3',
        vestGlobalVibrationEnabled: true,
        vestLocalVibrationEnabled: false,
        vestVibrationLevel: 'level2'
      },
      loading: false,
      saveLoading: false
    };
  },
  created() {
    this.fetchSettings();
  },
  methods: {
    // 获取动作捕捉设置
    fetchSettings() {
      this.loading = true;
      getRuleDetail({Num: this.configId})
        .then(response => {
          console.log('--动作捕捉设置--', response);
          if (response && response.success && response.data && response.data.length > 0) {
            try {
              // 检查是否有Content字段
              if (response.data[0].Content) {
                const content = JSON.parse(response.data[0].Content);
                // 更新设置
                this.settings = { ...this.settings, ...content };
              } else {
                console.warn('动作捕捉设置为空，使用默认值');
              }
            } catch (error) {
              console.error('解析动作捕捉设置失败:', error);
              this.$message.error('解析动作捕捉设置失败');
            }
          } else {
            this.$message.error(response?.msg || '获取动作捕捉设置失败');
          }
        })
        .catch(error => {
          console.error('获取动作捕捉设置失败:', error);
          this.$message.error('获取动作捕捉设置失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 保存动作捕捉设置
    saveSettings() {
      this.saveLoading = true;
      
      const data = {
        Num: this.configId.toString(),
        Content: JSON.stringify(this.settings),
        Index: 2,  // 使用默认索引
        Type: 1    // 使用默认类型
      };
      
      console.log('--更新动作捕捉设置--', data);
      updateRule(data)
        .then(response => {
          console.log('--保存动作捕捉设置响应--', response);
          if (response && response.success) {
            this.$message.success('保存成功');
          } else {
            this.$message.error(response?.msg || '保存失败');
          }
        })
        .catch(error => {
          console.error('保存动作捕捉设置失败:', error);
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
.motion-capture-management {
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

.motion-container {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

.motion-card {
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
  gap: 20px;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #3a4b5c;
  border-radius: 6px;
}

.setting-label {
  flex: 0 0 200px;
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
:deep(.el-radio) {
  margin-right: 20px;
  color: #fff;
}

:deep(.el-radio__label) {
  color: #fff;
}

:deep(.el-radio__input.is-checked + .el-radio__label) {
  color: #409EFF;
}

:deep(.el-card__body) {
  padding: 0;
}
</style>
