<template>
  <div class="algorithm-management">
    <div class="page-header">
      <!-- <h2>智能辅助认知算法管理</h2> -->
    </div>

    <div class="algorithm-container">
      <el-card class="algorithm-card">
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
        
        <div class="algorithm-content">
          <div class="settings-list">
            <!-- 热建模与物理仿真类 -->
            <div class="category-title">热建模与物理仿真类</div>
            
            <div class="setting-item">
              <div class="setting-label">热响应多维拟合仿生模型（TRM-FitNet）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.thermalSimulation.trmFitNet"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.thermalSimulation.trmFitNet ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">基于环境辐射感知的热场映射算法（EnvHeatMapNet）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.thermalSimulation.envHeatMapNet"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.thermalSimulation.envHeatMapNet ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">动态热通量回归解耦模型（DHF-DRM）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.thermalSimulation.dhfDrm"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.thermalSimulation.dhfDrm ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">MR场景中的体感热映射重建算法（MR-ThermoRebuilder）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.thermalSimulation.mrThermoRebuilder"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.thermalSimulation.mrThermoRebuilder ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 手部识别与动作捕捉类 -->
            <div class="category-title">手部识别与动作捕捉类</div>
            
            <div class="setting-item">
              <div class="setting-label">高精度五指动态轮廓跟踪算法（Hi5-FingerTrack）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.handTracking.hi5FingerTrack"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.handTracking.hi5FingerTrack ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">神经型手部动作拟合网络（NeuroPalmPose）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.handTracking.neuroPalmPose"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.handTracking.neuroPalmPose ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">基于混合感知的意图识别与动作映射算法（IntentMotionFusion）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.handTracking.intentMotionFusion"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.handTracking.intentMotionFusion ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 大空间定位与姿态识别类 -->
            <div class="category-title">大空间定位与姿态识别类</div>
            
            <div class="setting-item">
              <div class="setting-label">大空间多模态协同定位网络（LargeSpace-FusionLoc）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.spatialTracking.largeSpaceFusionLoc"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.spatialTracking.largeSpaceFusionLoc ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">IMU-视觉融合姿态解耦算法（IMU-VisionPoseFusion）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.spatialTracking.imuVisionPoseFusion"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.spatialTracking.imuVisionPoseFusion ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">全身骨架状态映射与多体预测系统（BodyPosePredictor-X）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.spatialTracking.bodyPosePredictorX"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.spatialTracking.bodyPosePredictorX ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">多轨迹自监督动作识别网络（MultiPath-SelfLearnNet）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.spatialTracking.multiPathSelfLearnNet"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.spatialTracking.multiPathSelfLearnNet ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 图像识别与SLAM增强类 -->
            <div class="category-title">图像识别与SLAM增强类</div>
            
            <div class="setting-item">
              <div class="setting-label">图神经视觉特征SLAM优化引擎（GraphVision-SLAMPlus）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.slamEnhancement.graphVisionSlamPlus"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.slamEnhancement.graphVisionSlamPlus ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">基于场景语义分割的动态SLAM系统（SceneSeg-DynaSLAM）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.slamEnhancement.sceneSegDynaSlam"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.slamEnhancement.sceneSegDynaSlam ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">基于RGB-D数据的三维场景神经渲染网络（NeuralDepthSceneNet）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.slamEnhancement.neuralDepthSceneNet"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.slamEnhancement.neuralDepthSceneNet ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 混合现实交互感知类 -->
            <div class="category-title">混合现实交互感知类</div>
            
            <div class="setting-item">
              <div class="setting-label">认知驱动式混合现实交互引擎（Cog-Driven MR-X）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.mixedRealityInteraction.cogDrivenMrX"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.mixedRealityInteraction.cogDrivenMrX ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <div class="setting-item">
              <div class="setting-label">虚实融合感知补全与遮挡消融算法（VirtualRealFusionNet）：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.mixedRealityInteraction.virtualRealFusionNet"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.mixedRealityInteraction.virtualRealFusionNet ? '开启' : '关闭' }}</span>
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
  name: 'AlgorithmManagement',
  data() {
    return {
      configId: 94, // 智能辅助认知算法管理配置ID
      settings: {
        thermalSimulation: {
          trmFitNet: true,
          envHeatMapNet: true,
          dhfDrm: true,
          mrThermoRebuilder: true
        },
        handTracking: {
          hi5FingerTrack: true,
          neuroPalmPose: true,
          intentMotionFusion: true
        },
        spatialTracking: {
          largeSpaceFusionLoc: true,
          imuVisionPoseFusion: true,
          bodyPosePredictorX: true,
          multiPathSelfLearnNet: true
        },
        slamEnhancement: {
          graphVisionSlamPlus: true,
          sceneSegDynaSlam: true,
          neuralDepthSceneNet: true
        },
        mixedRealityInteraction: {
          cogDrivenMrX: true,
          virtualRealFusionNet: true
        }
      },
      loading: false,
      saveLoading: false
    };
  },
  created() {
    this.fetchSettings();
  },
  methods: {
    // 获取算法管理设置
    fetchSettings() {
      this.loading = true;
      getRuleDetail({Num: this.configId})
        .then(response => {
          console.log('--算法管理设置--', response);
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
                console.warn('算法管理设置为空，使用默认值');
              }
            } catch (error) {
              console.error('解析算法管理设置失败:', error);
              this.$message.error('解析算法管理设置失败');
            }
          } else {
            this.$message.error(response?.msg || '获取算法管理设置失败');
          }
        })
        .catch(error => {
          console.error('获取算法管理设置失败:', error);
          this.$message.error('获取算法管理设置失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 保存算法管理设置
    saveSettings() {
      this.saveLoading = true;
      
      const data = {
        Num: this.configId.toString(),
        Content: JSON.stringify(this.settings),
        Index: 6,  // 使用默认索引
        Type: 1    // 使用默认类型
      };
      
      console.log('--更新算法管理设置--', data);
      updateRule(data)
        .then(response => {
          console.log('--保存算法管理设置响应--', response);
          if (response && response.success) {
            this.$message.success('保存成功');
            // 重新获取最新设置，确保数据同步
            this.fetchSettings();
          } else {
            this.$message.error(response?.msg || '保存失败');
          }
        })
        .catch(error => {
          console.error('保存算法管理设置失败:', error);
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
.algorithm-management {
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

.algorithm-container {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

.algorithm-card {
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

.category-title {
  font-size: 18px;
  font-weight: bold;
  color: #409EFF;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #4c5a67;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #3a4b5c;
  border-radius: 6px;
}

.setting-label {
  flex: 0 0 450px;
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
