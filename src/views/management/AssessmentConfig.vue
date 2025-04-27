<template>
  <div class="assessment-management">
    <div class="page-header">
      <!-- <h2>考核评估配置</h2> -->
    </div>

    <div class="assessment-container">
      <el-card class="assessment-card">
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
        
        <div class="assessment-content">
          <div class="settings-list">
            <!-- 任务总队耗时 -->
            <div class="setting-item">
              <div class="setting-label">任务总队耗时：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.taskTotalDuration"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.taskTotalDuration ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 任务小队耗时 -->
            <div class="setting-item">
              <div class="setting-label">任务小队耗时：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.taskGroupDuration"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.taskGroupDuration ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 任务个人耗时 -->
            <div class="setting-item">
              <div class="setting-label">任务个人耗时：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.taskPersonalDuration"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.taskPersonalDuration ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 任务个人分步耗时 -->
            <div class="setting-item">
              <div class="setting-label">任务个人分步耗时：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.taskPersonalStepDuration"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.taskPersonalStepDuration ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 炮火波及计数 -->
            <div class="setting-item">
              <div class="setting-label">炮火波及计数：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.artilleryImpactCount"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.artilleryImpactCount ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 火力波及计数 -->
            <div class="setting-item">
              <div class="setting-label">火力波及计数：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.firepowerImpactCount"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.firepowerImpactCount ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 团队协作评估 -->
            <div class="setting-item">
              <div class="setting-label">团队协作评估：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.teamworkEvaluation"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.teamworkEvaluation ? '开启' : '关闭' }}</span>
              </div>
            </div>
            
            <!-- 任务准确率评估 -->
            <div class="setting-item">
              <div class="setting-label">任务准确率评估：</div>
              <div class="setting-control">
                <el-switch
                  v-model="settings.taskAccuracyEvaluation"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
                <span class="setting-status">{{ settings.taskAccuracyEvaluation ? '开启' : '关闭' }}</span>
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
  name: 'AssessmentConfig',
  data() {
    return {
      configId: 93, // 考核评估配置ID
      settings: {
        taskTotalDuration: true,
        taskGroupDuration: true,
        taskPersonalDuration: true,
        taskPersonalStepDuration: true,
        artilleryImpactCount: true,
        firepowerImpactCount: true,
        teamworkEvaluation: true,
        taskAccuracyEvaluation: true
      },
      loading: false,
      saveLoading: false,
      // 添加对话框可见性监听
      dialogVisible: false
    };
  },
  created() {
    this.fetchSettings();
  },
  methods: {
    // 获取考核评估配置
    fetchSettings() {
      this.loading = true;
      console.log('开始获取考核评估配置，Num:', this.configId);
      
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
                console.warn('考核评估配置为空或Content字段不存在，使用默认值');
                console.log('数据项详情:', dataItem);
              }
            } catch (error) {
              console.error('解析考核评估配置失败:', error);
              this.$message.error('解析考核评估配置失败');
            }
          } else {
            console.error('响应中没有有效数据:', response);
            this.$message.error(response?.msg || '获取考核评估配置失败');
          }
        })
        .catch(error => {
          console.error('获取考核评估配置失败:', error);
          this.$message.error('获取考核评估配置失败');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 保存考核评估配置
    saveSettings() {
      this.saveLoading = true;
      
      // 保存前记录当前设置状态
      console.log('保存前的设置状态:', this.settings);
      
      const data = {
        Num: this.configId.toString(),
        Content: JSON.stringify(this.settings),
        Index: 7,  // 使用默认索引
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
          console.error('保存考核评估配置失败:', error);
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
.assessment-management {
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

.assessment-container {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

.assessment-card {
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
  flex: 0 0 300px;
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
