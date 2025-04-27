<template>
  <div class="rules-management">
    <div class="page-header">
      <!-- <h2>规则体系管理</h2> -->
    </div>

    <div class="rules-container">
      <el-card class="rules-card">
        <div slot="header" class="card-header">
          
          <el-button 
            type="primary" 
            size="small" 
            @click="saveRules" 
            :loading="saveLoading"
            style="margin-left: 20px; color: #000;">
            保存修改
          </el-button>
        </div>
        
        <div class="rules-content">
          <el-tabs v-model="activeTab" type="card">
            <el-tab-pane label="二级权限" name="level2">
              <div class="permission-list">
                <div v-for="(value, key) in level2Rules" :key="key" class="permission-item">
                  <span class="permission-label">{{ getPermissionLabel(key) }}:</span>
                  <el-switch
                    v-model="level2Rules[key]"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="三级权限" name="level3">
              <div class="permission-list">
                <div v-for="(value, key) in level3Rules" :key="key" class="permission-item">
                  <span class="permission-label">{{ getPermissionLabel(key) }}:</span>
                  <el-switch
                    v-model="level3Rules[key]"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRuleDetail, updateRule } from '@/api/rules';

export default {
  name: 'RulesManagement',
  data() {
    return {
      activeTab: 'level2',
      ruleId: 99, // 默认规则ID
      level2Rules: {
        modifyUserInfo: false,
        modifyOrganization: false,
        modifyRoleInfo: false,
        modifyDeviceList: false,
        modifyDeviceCategoryList: false,
        modifyFuelOperationsManual: false,
        modifySupplyManual: false,
        modifyMedicalManual: false,
        modifyRepairManual: false,
        modifyCourseList: false,
        viewPersonalScore: false,
        modifyPersonalScore: false,
        modifyTeachingContent: false,
        modifyLogInfo: false
      },
      level3Rules: {
        modifyUserInfo: false,
        modifyOrganization: false,
        modifyRoleInfo: false,
        modifyDeviceList: false,
        modifyDeviceCategoryList: false,
        modifyFuelOperationsManual: false,
        modifySupplyManual: false,
        modifyMedicalManual: false,
        modifyRepairManual: false,
        modifyCourseList: false,
        viewPersonalScore: false,
        modifyPersonalScore: false,
        modifyTeachingContent: false,
        modifyLogInfo: false
      },
      loading: false,
      saveLoading: false
    };
  },
  created() {
    this.fetchRuleDetail();
  },
  methods: {
    // 获取权限标签
    getPermissionLabel(key) {
      const labels = {
        modifyUserInfo: '允许二级权限修改用户信息',
        modifyOrganization: '允许二级权限修改组织机构',
        modifyRoleInfo: '允许二级权限修改角色信息',
        modifyDeviceList: '允许二级权限修改设备列表',
        modifyDeviceCategoryList: '允许二级权限修改设备分类列表',
        modifyFuelOperationsManual: '允许二级权限修改油料作业手册',
        modifySupplyManual: '允许二级权限修改补给勤务手册',
        modifyMedicalManual: '允许二级权限修改卫生勤务手册',
        modifyRepairManual: '允许二级权限修改装备抢修手册',
        modifyCourseList: '允许二级权限修改课程列表',
        viewPersonalScore: '允许二级权限查看个人成绩',
        modifyPersonalScore: '允许二级权限修改个人成绩',
        modifyTeachingContent: '允许二级权限修改示教内容',
        modifyLogInfo: '允许二级权限修改日志信息'
      };
      
      // 如果是三级权限，替换标签中的"二级"为"三级"
      if (this.activeTab === 'level3') {
        return labels[key].replace('二级', '三级');
      }
      
      return labels[key];
    },
    
    // 获取规则详情
    fetchRuleDetail() {
      this.loading = true;
      getRuleDetail({Num:this.ruleId})
        .then(response => {
          console.log('--规则详情--',response)
          if (response && response.success && response.data && response.data.length > 0) {
            try {
              // 检查是否有Content字段
              if (response.data[0].Content) {
                const content = JSON.parse(response.data[0].Content);
                if (content.level2) {
                  this.level2Rules = content.level2;
                }
                if (content.level3) {
                  this.level3Rules = content.level3;
                }
              } else {
                console.warn('规则内容为空，使用默认值');
                // 使用默认值
                this.loadMockData();
              }
            } catch (error) {
              console.error('解析规则内容失败:', error);
              this.$message.error('解析规则内容失败');
              // 解析失败时使用默认值
              this.loadMockData();
            }
          } else {
            this.$message.error(response?.msg || '获取规则详情失败');
            // 失败时使用默认值
            this.loadMockData();
          }
        })
        .catch(error => {
          console.error('获取规则详情失败:', error);
          this.$message.error('获取规则详情失败');
          
          // 使用模拟数据进行展示
          this.loadMockData();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 加载模拟数据
    loadMockData() {
      // 创建默认规则数据
      this.level2Rules = {
        modifyUserInfo: false,
        modifyOrganization: false,
        modifyRoleInfo: false,
        modifyDeviceList: false,
        modifyDeviceCategoryList: false,
        modifyFuelOperationsManual: false,
        modifySupplyManual: false,
        modifyMedicalManual: false,
        modifyRepairManual: false,
        modifyCourseList: false,
        viewPersonalScore: false,
        modifyPersonalScore: false,
        modifyTeachingContent: false,
        modifyLogInfo: false
      };
      
      this.level3Rules = {
        modifyUserInfo: false,
        modifyOrganization: false,
        modifyRoleInfo: false,
        modifyDeviceList: false,
        modifyDeviceCategoryList: false,
        modifyFuelOperationsManual: false,
        modifySupplyManual: false,
        modifyMedicalManual: false,
        modifyRepairManual: false,
        modifyCourseList: false,
        viewPersonalScore: false,
        modifyPersonalScore: false,
        modifyTeachingContent: false,
        modifyLogInfo: false
      };
    //   const mockData = {
    //     "data": {
    //       "success": true,
    //       "msg": "",
    //       "data": {
    //         "Id": 11,
    //         "UserId": 1,
    //         "Num": "99",
    //         "Content": "{\"level2\":{\"modifyUserInfo\":true,\"modifyOrganization\":true,\"modifyRoleInfo\":true,\"modifyDeviceList\":true,\"modifyDeviceCategoryList\":true,\"modifyFuelOperationsManual\":false,\"modifySupplyManual\":false,\"modifyMedicalManual\":false,\"modifyRepairManual\":false,\"modifyCourseList\":false,\"viewPersonalScore\":true,\"modifyPersonalScore\":false,\"modifyTeachingContent\":false,\"modifyLogInfo\":false},\"level3\":{\"modifyUserInfo\":false,\"modifyOrganization\":false,\"modifyRoleInfo\":false,\"modifyDeviceList\":false,\"modifyDeviceCategoryList\":false,\"modifyFuelOperationsManual\":false,\"modifySupplyManual\":false,\"modifyMedicalManual\":false,\"modifyRepairManual\":false,\"modifyCourseList\":false,\"viewPersonalScore\":false,\"modifyPersonalScore\":false,\"modifyTeachingContent\":false,\"modifyLogInfo\":false}}",
    //         "CreateTime": 1745479113,
    //         "Status": 0,
    //         "FidNum": "",
    //         "Index": 1,
    //         "Type": 1
    //       }
    //     }
    //   };
      
    //   try {
    //     const content = JSON.parse(mockData.data.data.Content);
    //     if (content.level2) {
    //       this.level2Rules = content.level2;
    //     }
    //     if (content.level3) {
    //       this.level3Rules = content.level3;
    //     }
    //   } catch (error) {
    //     console.error('解析模拟数据失败:', error);
    //   }
    },
    
    // 保存规则修改
    saveRules() {
      this.saveLoading = true;
      
      const ruleContent = {
        level2: this.level2Rules,
        level3: this.level3Rules
      };
      
      const data = {
        Num: this.ruleId.toString(),
        Content: JSON.stringify(ruleContent),
        Index: 1,  // 使用默认用户ID
        Type: 1     // 使用默认类型
      };
      console.log('--更新数据--',data)
      updateRule(data)
        .then(response => {
          console.log('--保存规则响应--', response);
          if (response && response.success) {
            this.$message.success('保存成功');
          } else {
            this.$message.error(response?.msg || '保存失败');
          }
        })
        .catch(error => {
          console.error('保存规则失败:', error);
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
.rules-management {
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

.rules-container {
  background-color: #2c3e50;
  border-radius: 8px;
  padding: 0;
  overflow: hidden;
}

.rules-card {
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

.permission-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

.permission-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #3a4b5c;
  border-radius: 6px;
}

.permission-label {
  font-size: 14px;
  color: #fff;
}

/* 覆盖Element UI样式 */
:deep(.el-tabs__item) {
  color: #fff;
}

:deep(.el-tabs__item.is-active) {
  color: #409EFF;
}

:deep(.el-tabs__nav-wrap::after) {
  background-color: #505962;
}

:deep(.el-card__body) {
  padding: 0;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
  background-color: #505962;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
  background-color: #2c3e50;
  border-bottom-color: #2c3e50;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border-color: transparent;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border-color: transparent;
  margin-right: 5px;
}
</style>
