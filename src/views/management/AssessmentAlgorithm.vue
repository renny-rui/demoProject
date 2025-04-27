<template>
  <div class="assessment-algorithm-management">
    <div class="page-header">
      <!-- <h2>考核评估算法管理</h2> -->
    </div>

    <div class="assessment-algorithm-container">
      <el-card class="assessment-algorithm-card">
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
        
        <div class="assessment-algorithm-content">
          <div class="settings-list">
            <!-- 多变量主成分动态压缩分析模型 -->
            <div class="algorithm-item">
              <div class="algorithm-header">
                <div class="algorithm-title">多变量主成分动态压缩分析模型（MV-PCA-DynNet）：</div>
                <div class="algorithm-control">
                  <el-switch
                    v-model="settings.mvPcaDynNet.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                  <span class="setting-status">{{ settings.mvPcaDynNet.enabled ? '开启' : '关闭' }}</span>
                </div>
              </div>
              <div class="algorithm-details">
                <div class="algorithm-description">
                  <span class="label">描述：</span>
                  <span>{{ settings.mvPcaDynNet.description }}</span>
                </div>
                <div class="algorithm-charts">
                  <span class="label">生成图表形式：</span>
                  <span>{{ formatCharts(settings.mvPcaDynNet.charts) }}</span>
                </div>
              </div>
            </div>
            
            <!-- 高维聚类态势识别网络 -->
            <div class="algorithm-item">
              <div class="algorithm-header">
                <div class="algorithm-title">高维聚类态势识别网络（HD-ClusterSituNet）：</div>
                <div class="algorithm-control">
                  <el-switch
                    v-model="settings.hdClusterSituNet.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                  <span class="setting-status">{{ settings.hdClusterSituNet.enabled ? '开启' : '关闭' }}</span>
                </div>
              </div>
              <div class="algorithm-details">
                <div class="algorithm-description">
                  <span class="label">描述：</span>
                  <span>{{ settings.hdClusterSituNet.description }}</span>
                </div>
                <div class="algorithm-charts">
                  <span class="label">生成图表形式：</span>
                  <span>{{ formatCharts(settings.hdClusterSituNet.charts) }}</span>
                </div>
              </div>
            </div>
            
            <!-- 时序傅里叶绩效模式识别系统 -->
            <div class="algorithm-item">
              <div class="algorithm-header">
                <div class="algorithm-title">时序傅里叶绩效模式识别系统（FFT-PerfTrendNet）：</div>
                <div class="algorithm-control">
                  <el-switch
                    v-model="settings.fftPerfTrendNet.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                  <span class="setting-status">{{ settings.fftPerfTrendNet.enabled ? '开启' : '关闭' }}</span>
                </div>
              </div>
              <div class="algorithm-details">
                <div class="algorithm-description">
                  <span class="label">描述：</span>
                  <span>{{ settings.fftPerfTrendNet.description }}</span>
                </div>
                <div class="algorithm-charts">
                  <span class="label">生成图表形式：</span>
                  <span>{{ formatCharts(settings.fftPerfTrendNet.charts) }}</span>
                </div>
              </div>
            </div>
            
            <!-- 非线性相关性映射模型 -->
            <div class="algorithm-item">
              <div class="algorithm-header">
                <div class="algorithm-title">非线性相关性映射模型（NLCorrMap）：</div>
                <div class="algorithm-control">
                  <el-switch
                    v-model="settings.nlCorrMap.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                  <span class="setting-status">{{ settings.nlCorrMap.enabled ? '开启' : '关闭' }}</span>
                </div>
              </div>
              <div class="algorithm-details">
                <div class="algorithm-description">
                  <span class="label">描述：</span>
                  <span>{{ settings.nlCorrMap.description }}</span>
                </div>
                <div class="algorithm-charts">
                  <span class="label">生成图表形式：</span>
                  <span>{{ formatCharts(settings.nlCorrMap.charts) }}</span>
                </div>
              </div>
            </div>
            
            <!-- 多指标模糊权重评分系统 -->
            <div class="algorithm-item">
              <div class="algorithm-header">
                <div class="algorithm-title">多指标模糊权重评分系统（FuzzyWeightedScorer）：</div>
                <div class="algorithm-control">
                  <el-switch
                    v-model="settings.fuzzyWeightedScorer.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                  <span class="setting-status">{{ settings.fuzzyWeightedScorer.enabled ? '开启' : '关闭' }}</span>
                </div>
              </div>
              <div class="algorithm-details">
                <div class="algorithm-description">
                  <span class="label">描述：</span>
                  <span>{{ settings.fuzzyWeightedScorer.description }}</span>
                </div>
                <div class="algorithm-charts">
                  <span class="label">生成图表形式：</span>
                  <span>{{ formatCharts(settings.fuzzyWeightedScorer.charts) }}</span>
                </div>
              </div>
            </div>
            
            <!-- RBF 核归因反演网络 -->
            <div class="algorithm-item">
              <div class="algorithm-header">
                <div class="algorithm-title">RBF 核归因反演网络（RBF-AttributionInverter）：</div>
                <div class="algorithm-control">
                  <el-switch
                    v-model="settings.rbfAttributionInverter.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                  <span class="setting-status">{{ settings.rbfAttributionInverter.enabled ? '开启' : '关闭' }}</span>
                </div>
              </div>
              <div class="algorithm-details">
                <div class="algorithm-description">
                  <span class="label">描述：</span>
                  <span>{{ settings.rbfAttributionInverter.description }}</span>
                </div>
                <div class="algorithm-charts">
                  <span class="label">生成图表形式：</span>
                  <span>{{ formatCharts(settings.rbfAttributionInverter.charts) }}</span>
                </div>
              </div>
            </div>
            
            <!-- 最大变化率自动检测系统 -->
            <div class="algorithm-item">
              <div class="algorithm-header">
                <div class="algorithm-title">最大变化率自动检测系统（MaxDeltaDetector）：</div>
                <div class="algorithm-control">
                  <el-switch
                    v-model="settings.maxDeltaDetector.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                  <span class="setting-status">{{ settings.maxDeltaDetector.enabled ? '开启' : '关闭' }}</span>
                </div>
              </div>
              <div class="algorithm-details">
                <div class="algorithm-description">
                  <span class="label">描述：</span>
                  <span>{{ settings.maxDeltaDetector.description }}</span>
                </div>
                <div class="algorithm-charts">
                  <span class="label">生成图表形式：</span>
                  <span>{{ formatCharts(settings.maxDeltaDetector.charts) }}</span>
                </div>
              </div>
            </div>
            
            <!-- 行为模式自相似性分析系统 -->
            <div class="algorithm-item">
              <div class="algorithm-header">
                <div class="algorithm-title">行为模式自相似性分析系统（AutoSimEval）：</div>
                <div class="algorithm-control">
                  <el-switch
                    v-model="settings.autoSimEval.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                  <span class="setting-status">{{ settings.autoSimEval.enabled ? '开启' : '关闭' }}</span>
                </div>
              </div>
              <div class="algorithm-details">
                <div class="algorithm-description">
                  <span class="label">描述：</span>
                  <span>{{ settings.autoSimEval.description }}</span>
                </div>
                <div class="algorithm-charts">
                  <span class="label">生成图表形式：</span>
                  <span>{{ formatCharts(settings.autoSimEval.charts) }}</span>
                </div>
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
  name: 'AssessmentAlgorithm',
  data() {
    return {
      configId: 91, // 考核评估算法管理配置ID
      settings: {
        mvPcaDynNet: {
          enabled: true,
          description: "Extracts main features from multiple metrics to identify key ability drivers.",
          charts: ["pieChart", "radarChart", "pca2DChart"]
        },
        hdClusterSituNet: {
          enabled: true,
          description: "Categorizes distributed data points to identify ability types.",
          charts: ["gaussianMixtureChart", "scatterPlot"]
        },
        fftPerfTrendNet: {
          enabled: true,
          description: "Uses Fourier transform to identify cyclic patterns and stability.",
          charts: ["frequencySpectrum", "heatmap"]
        },
        nlCorrMap: {
          enabled: true,
          description: "Extracts nonlinear correlations using kernel functions.",
          charts: ["heatmap", "correlationMatrix"]
        },
        fuzzyWeightedScorer: {
          enabled: true,
          description: "Fuses multiple scoring factors using fuzzy logic and weighted rules.",
          charts: ["barChart", "scoreIntervalChart"]
        },
        rbfAttributionInverter: {
          enabled: true,
          description: "Backtracks performance trends to critical inflection points using RBF.",
          charts: ["pathChart", "curveTrendChart"]
        },
        maxDeltaDetector: {
          enabled: true,
          description: "Detects sudden changes in evaluation data.",
          charts: ["anomalyDetectionChart"]
        },
        autoSimEval: {
          enabled: true,
          description: "Evaluates behavioral stability by analyzing self-similarity.",
          charts: ["autoSimilarityMatrix"]
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
    // 格式化图表数组为中文显示
    formatCharts(charts) {
      if (!charts || !Array.isArray(charts)) return '';
      
      const chartMap = {
        'pieChart': '饼图',
        'radarChart': '雷达图',
        'pca2DChart': 'PCA 二维图',
        'gaussianMixtureChart': '高斯混合图',
        'scatterPlot': '散点图',
        'frequencySpectrum': '频谱图',
        'heatmap': '热力图',
        'correlationMatrix': '相关系数矩阵图',
        'barChart': '柱状图',
        'scoreIntervalChart': '评分区间图',
        'pathChart': '路径图',
        'curveTrendChart': '曲线变化图',
        'anomalyDetectionChart': '异常点检测图',
        'autoSimilarityMatrix': '自相似矩阵图'
      };
      
      return charts.map(chart => chartMap[chart] || chart).join('、');
    },
    
    // 获取考核评估算法配置
    fetchSettings() {
      this.loading = true;
      console.log('开始获取考核评估算法配置，Num:', this.configId);
      
      getRuleDetail({Num: this.configId})
        .then(response => {
          console.log('原始返回数据:', JSON.stringify(response));
          
          // 检查数据结构，根据提供的数据结构调整
          if (response && response.data) {
            try {
              // 使用返回的数据对象
              let dataItem = response.data;
              
              // 检查数据是否为数组，如果是则取第一个元素
              if (Array.isArray(dataItem) && dataItem.length > 0) {
                console.log('数据是数组形式，取第一个元素');
                dataItem = dataItem[0];
              }
              
              console.log('处理后的数据项:', dataItem);
              
              if (dataItem && dataItem.Content) {
                const contentStr = dataItem.Content;
                console.log('原始 Content 字符串:', contentStr);
                
                const content = JSON.parse(contentStr);
                console.log('解析后的设置数据:', content);
                
                // 在更新前记录当前设置
                console.log('更新前的设置:', this.settings);
                
                // 更新设置，确保完全替换而不是合并
                this.settings = JSON.parse(JSON.stringify(content));
                
                // 在更新后记录新设置
                console.log('更新后的设置:', this.settings);
              } else {
                console.warn('考核评估算法配置为空或Content字段不存在，使用默认值');
                console.log('数据项详情:', dataItem);
              }
            } catch (error) {
              console.error('解析考核评估算法配置失败:', error);
              this.$message.error('解析考核评估算法配置失败');
            }
          } else {
            console.error('响应中没有有效数据:', response);
            this.$message.error(response?.msg || '获取考核评估算法配置失败');
          }
        })
        .catch(error => {
          console.error('获取考核评估算法配置失败:', error);
          this.$message.error('获取考核评估算法配置失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 保存考核评估算法配置
    saveSettings() {
      this.saveLoading = true;
      
      // 保存前记录当前设置状态
      console.log('保存前的设置状态:', this.settings);
      
      const data = {
        Num: this.configId.toString(),
        Content: JSON.stringify(this.settings),
        Index: 9,  // 使用默认索引
        Type: 1    // 使用默认类型
      };
      
      console.log('发送的更新请求数据:', data);
      console.log('发送的Content内容:', data.Content);
      
      updateRule(data)
        .then(response => {
          console.log('保存响应完整数据:', JSON.stringify(response));
          
          if (response && response.success) {
            this.$message.success('保存成功');
            console.log('保存成功，将在延时后重新获取数据');
            
            // 强制等待一小段时间后再获取，确保后端数据已更新
            setTimeout(() => {
              console.log('延时结束，开始重新获取数据');
              // 重新获取最新设置，确保数据同步
              this.fetchSettings();
            }, 1000); // 增加延时时间到 1 秒
          } else {
            console.error('保存失败响应:', response);
            this.$message.error(response?.msg || '保存失败');
          }
        })
        .catch(error => {
          console.error('保存考核评估算法配置失败:', error);
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
.assessment-algorithm-management {
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

.assessment-algorithm-container {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

.assessment-algorithm-card {
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

.algorithm-item {
  background-color: #3a4b5c;
  border-radius: 6px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.algorithm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.algorithm-title {
  font-size: 16px;
  font-weight: bold;
  color: #409EFF;
}

.algorithm-control {
  display: flex;
  align-items: center;
}

.setting-status {
  margin-left: 10px;
  color: #fff;
}

.algorithm-details {
  margin-top: 10px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
}

.algorithm-description, .algorithm-charts {
  display: flex;
  align-items: flex-start;
}

.label {
  color: #8492a6;
  margin-right: 5px;
  min-width: 100px;
}

/* 覆盖Element UI样式 */
:deep(.el-card__body) {
  padding: 0;
}
</style>
