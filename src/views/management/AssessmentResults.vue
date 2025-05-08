<template>
  <div class="assessment-results-container">
   

    <!-- 搜索区域 -->
    <div class="search-container" style="background-color:#505962; border-radius: 4px; padding: 20px; margin-bottom: 20px;">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="任务ID" label-width="70px">
          <el-input v-model="searchForm.missionId" placeholder="请输入任务ID" clearable></el-input>
        </el-form-item>
        <el-form-item label="任务名称" label-width="70px">
          <el-input v-model="searchForm.missionName" placeholder="请输入任务名称" clearable></el-input>
        </el-form-item>
      
        <el-form-item>
          <el-button type="primary" @click="handleSearch" style="color: #000;">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格区域 -->
    <div style="background-color:#505962; border-radius: 4px;">
      <div style="padding: 20px 20px 0 20px;">
        <el-table :data="tableData" style="width: 100%" border >
          <el-table-column prop="MissionId" label="任务ID" align="center" />
          <el-table-column prop="Name" label="任务名称" align="center" />
          <el-table-column prop="CreateTime" label="创建时间" align="center" />
          
          <el-table-column label="操作" align="center" >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleDetail(scope.row)" class="detail-btn">
                <i class="el-icon-document"></i> 查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination @current-change="handleCurrentChange"
            :current-page="CurrentPage" :page-size="PerPageCount"
            layout="prev, pager, next" :total="total"
            class="custom-pagination">
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- 详情对话框 -->
    <el-dialog title="考核详情" :visible.sync="detailDialogVisible" width="90%" class="detail-dialog" :modal="false" :before-close="closeDialog">
      <div class="detail-header-info">
        <div class="detail-item">
          <span class="label">任务ID：</span>
          <span class="value">{{ currentDetail.MissionId }}</span>
        </div>
        <div class="detail-item">
          <span class="label">任务名称：</span>
          <span class="value">{{ currentDetail.Name }}</span>
        </div>
        <div class="detail-item">
          <span class="label">创建时间：</span>
          <span class="value">{{ currentDetail.CreateTime }}</span>
        </div>
        <div class="detail-item">
          <span class="label">任务状态：</span>
          <span class="value">
            <el-tag :type="getStatusType(currentDetail.status)">{{ getStatusText(currentDetail.status) }}</el-tag>
          </span>
        </div>
      </div>
      <!-- 基本信息部分 -->
      <div class="detail-content-layout">
        <!-- 左侧小组人员详情 -->
        <div class="team-members-container">
          <h4 style="color: #fff;">小组人员详情</h4>
          <el-table :data="teamMembers" border style="width: 100%">
            <el-table-column prop="SolidName" label="成员名称" align="center" width="80" />
            <el-table-column prop="DeviceNum" label="设备编号" align="center" width="100" />
            <el-table-column prop="DeviceIP" label="设备IP" align="center" width="120" />
            <el-table-column prop="RoleName" label="角色" align="center">
              <template slot-scope="scope">
                {{ getRoleName(scope.row.RoleName) }}
              </template>
            </el-table-column>
            <el-table-column prop="Host" label="主机状态" align="center">
              <template slot-scope="scope">
                <el-tag :type="scope.row.Host ? 'success' : 'info'">{{ scope.row.Host ? '主机' : '从机' }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="得分" align="center" />
            
            <el-table-column label="操作" align="center" width="120">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="showMemberDetail(scope.row)" class="detail-btn">
                  <i class="el-icon-view"></i> 详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <!-- 评价部分 -->
          <div class="assessment-evaluation">
            <h4>评价意见</h4>
            <div class="evaluation-content">
              {{ currentDetail.evaluation || '本次任务完成情况良好，团队协作能力突出，但在个人耗时方面还有提升空间。建议加强个人技能训练，提高任务执行效率。' }}
            </div>
          </div>
        </div>

        <!-- 右侧图表展示 -->
        <div class="charts-container">
          <!-- 折线图 -->
          <div class="chart-wrapper">
            <h4>任务耗时趋势</h4>
            <div id="lineChart" class="chart" ref="lineChart"></div>
          </div>
          
          <!-- 柱状图 -->
          <div class="chart-wrapper">
            <h4>团队成员得分对比</h4>
            <div id="barChart" class="chart" ref="barChart"></div>
          </div>
          
          <!-- 饼图 -->
          <div class="chart-wrapper">
            <h4>任务完成度分布</h4>
            <div id="pieChart" class="chart" ref="pieChart"></div>
          </div>
        </div>
      </div>
    </el-dialog>
    
    <!-- 人员详情对话框 -->
    <el-dialog
      :visible.sync="memberDetailVisible"
      width="60%"
      :before-close="closeMemberDialog"
      custom-class="member-detail-dialog"
      :append-to-body="true" :modal="false">
      <span slot="title">成员考核详情</span>
      <div class="member-detail-container" v-if="selectedMember">
        <div class="member-header">
          <h3>{{ getRoleName(selectedMember.Role) }} (ID: {{ selectedMember.MemberId }})</h3>
          <div class="device-info">
            <p><strong>设备编号:</strong> {{ selectedMember.DeviceNum }}</p>
            <p><strong>设备IP:</strong> {{ selectedMember.DeviceHMDIp }}</p>
            <p><strong>主机状态:</strong> <el-tag size="small" :type="selectedMember.Host ? 'success' : 'info'">{{ selectedMember.Host ? '主机' : '从机' }}</el-tag></p>
          </div>
        </div>
        
        <div class="member-scores">
          <h4 style="color: #fff;">考核详情</h4>
          <el-table :data="selectedMember.scoreDetails || []" border style="width: 100%">
            <el-table-column prop="item" label="考核项目" align="center" />
            <el-table-column prop="score" label="得分" align="center" />
            <el-table-column prop="weight" label="权重" align="center" />
            <el-table-column label="完成度" align="center">
              <template slot-scope="scope">
                <el-progress :percentage="getPercentage(scope.row.score, scope.row.maxScore)" :color="getProgressColor(scope.row.score, scope.row.maxScore)"></el-progress>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
        <div class="member-evaluation">
          <h4>评价意见</h4>
          <div class="evaluation-content">
            {{ content}}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMissionList, getMissionDetail, getMissionMembers } from '@/api/mission';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册ECharts组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer
]);

export default {
  name: "AssessmentResults",
  data() {
    return {
      // 搜索表单
      searchForm: {
        MissionId: '',
        Name: ''
      },
      // 表格数据
      tableData: [],
      // 分页
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      content:'',
      // 详情对话框
      detailDialogVisible: false,
      currentDetail: {},
      // 图表实例
      lineChart: null,
      barChart: null,
      pieChart: null,
      // 小组成员数据
      teamMembers: [],
      // 人员详情对话框
      memberDetailVisible: false,
      selectedMember: null,
      chartData: {
        line: [],
        bar: [],
        pie: []
      },
      // 评估算法配置 - 从记忆中提取的信息
      assessmentAlgorithms: [
        { name: '多变量主成分动态压缩分析模型', enabled: true, chartType: '折线图' },
        { name: '高维聚类态势识别网络', enabled: true, chartType: '柱状图' },
        { name: '时序傅里叶绩效模式识别系统', enabled: true, chartType: '饼图' },
        { name: '非线性相关性映射模型', enabled: false, chartType: '雷达图' }
      ],
      // 评估指标配置 - 从记忆中提取的信息
      assessmentIndices: [
        { name: '任务总队耗时', enabled: true },
        { name: '任务小队耗时', enabled: true },
        { name: '任务个人耗时', enabled: true },
        { name: '任务个人分步耗时', enabled: true },
        { name: '炮火波及计数', enabled: true }
      ]
    };
  },
  created() {
    this.fetchMissionList();
  },
  methods: {
    // 获取任务列表
    fetchMissionList() {
      this.loading = true;
      const params = {
        page: this.currentPage,
        pageSize: this.pageSize,
        MissionId: this.searchForm.MissionId,
        Name: this.searchForm.Name,
        startDate: this.searchForm.dateRange && this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : '',
        endDate: this.searchForm.dateRange && this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[1] : ''
      };

      getMissionList(params)
        .then(response => {
          console.log(response)
          if (response && response.success) {

            this.tableData = response.data || [];
            this.total = response.TotalPage || 0;
          } else {
            this.$message.error(response?.msg || '获取任务列表失败');
          }
        })
        .catch(error => {
          console.error('获取任务列表请求失败:', error);
          this.$message.error('获取任务列表失败');
          this.loading = false;
        });
    },

    // 查看详情
    handleDetail(row) {
      console.log('查看详情:', row);
      this.currentDetail = { ...row };
      this.detailDialogVisible = true;
      
      // 获取任务人员数据
      this.fetchMissionMembers(row.MissionId);
      
      // 在对话框打开后初始化图表
      this.$nextTick(() => {
        console.log('初始化图表');
        // 确保DOM已经更新
        setTimeout(() => {
          this.initCharts();
        }, 300);
      });
    },

    // 获取任务人员数据
    fetchMissionMembers(MissionId) {
      console.log('获取任务人员数据:', MissionId);
      this.loading = true;
      
      getMissionMembers(MissionId)
        .then(response => {
          console.log('任务人员数据响应:', response);
          if (response && response.success) {
            this.teamMembers = response.data || [];
            this.content = response.data[0].TeamComment
            // 如果需要，可以在这里添加额外的数据处理逻辑
          } else {
            console.error('获取任务人员数据失败:', response?.msg);
            this.$message.error(response?.msg || '获取任务人员数据失败');
            // 如果API调用失败，使用模拟数据作为备份
            this.teamMembers = this.generateTeamMembersData();
          }
        })
        .catch(error => {
          console.error('获取任务人员数据请求失败:', error);
          this.$message.error('获取任务人员数据失败');
          // 如果API调用出错，使用模拟数据作为备份
          this.teamMembers = this.generateTeamMembersData();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    // 获取任务详情
    getMissionDetail(row) {
      getMissionDetail(row.MissionId)
        .then(response => {
          if (response && response.success) {
            this.currentDetail = { ...this.currentDetail, ...response.data };
            // 生成模拟小组成员数据
            this.generateTeamMembersData();
            // 模拟评价数据
            // this.currentDetail.evaluation = '本次任务完成情况良好，团队协作能力突出，但在个人耗时方面还有提升空间。建议加强个人技能训练，提高任务执行效率。';
            
            // 在对话框显示后初始化图表
            this.$nextTick(() => {
              this.initCharts();
            });
          } else {
            this.$message.error(response?.msg || '获取任务详情失败');
          }
        })
        .catch(error => {
          console.error('获取任务详情请求失败:', error);
          this.$message.error('获取任务详情失败');
        });
    },
    
   
    
    // 显示成员详情
    showMemberDetail(member) {
      console.log('显示成员详情:', member);
      this.selectedMember = { ...member };
      
      // 生成详细的评分数据
      if (!this.selectedMember.scoreDetails) {
        this.selectedMember.scoreDetails = [
          { 
            item: '任务总队耗时', 
            score: Math.floor(Math.random() * 30) + 70, 
            maxScore: 100, 
            weight: '30%' 
          },
          { 
            item: '任务小队耗时', 
            score: Math.floor(Math.random() * 30) + 70, 
            maxScore: 100, 
            weight: '25%' 
          },
          { 
            item: '任务个人耗时', 
            score: Math.floor(Math.random() * 30) + 70, 
            maxScore: 100, 
            weight: '20%' 
          },
          { 
            item: '任务个人分步耗时', 
            score: Math.floor(Math.random() * 30) + 70, 
            maxScore: 100, 
            weight: '15%' 
          },
          { 
            item: '炮火波及计数', 
            score: Math.floor(Math.random() * 30) + 70, 
            maxScore: 100, 
            weight: '10%' 
          }
        ];
      }
      
      // 根据评估指标配置过滤显示的评分项
      this.selectedMember.scoreDetails = this.selectedMember.scoreDetails.filter(item => {
        const matchingIndex = this.assessmentIndices.find(index => index.name === item.item);
        return !matchingIndex || matchingIndex.enabled;
      });
      
      this.memberDetailVisible = true;
    },

    // 关闭成员详情对话框
    closeMemberDialog() {
      this.memberDetailVisible = false;
      this.selectedMember = null;
    },
    
    // 初始化图表
    initCharts() {
      // 销毁之前的图表实例，避免重复创建
      if (this.lineChart) {
        this.lineChart.dispose();
      }
      if (this.barChart) {
        this.barChart.dispose();
      }
      if (this.pieChart) {
        this.pieChart.dispose();
      }
      
      // 初始化各种图表
      this.initLineChart();
      this.initBarChart();
      this.initPieChart();
      
      // 添加窗口大小变化时重新调整图表大小的监听器
      window.addEventListener('resize', this.resizeCharts);
    },
    
    // 调整图表大小
    resizeCharts() {
      if (this.lineChart) this.lineChart.resize();
      if (this.barChart) this.barChart.resize();
      if (this.pieChart) this.pieChart.resize();
    },
    
    // 初始化折线图
    initLineChart() {
      // 如果已经存在实例，先销毁
      if (this.lineChart) {
        this.lineChart.dispose();
      }
      
      // 创建新实例
      this.lineChart = echarts.init(this.$refs.lineChart);
      
      // 模拟数据 - 任务进度趋势
      const days = ['第1天', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天'];
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['计划进度', '实际进度'],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: days,
          axisLabel: {
            color: '#fff'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}%',
            color: '#fff'
          }
        },
        series: [
          {
            name: '计划进度',
            type: 'line',
            data: [15, 30, 45, 60, 75, 90, 100],
            lineStyle: {
              color: '#409EFF'
            },
            itemStyle: {
              color: '#409EFF'
            }
          },
          {
            name: '实际进度',
            type: 'line',
            data: [10, 25, 35, 55, 70, 85, 95],
            lineStyle: {
              color: '#67C23A'
            },
            itemStyle: {
              color: '#67C23A'
            }
          }
        ]
      };
      
      this.lineChart.setOption(option);
    },
    
    // 初始化柱状图
    initBarChart() {
      // 如果已经存在实例，先销毁
      if (this.barChart) {
        this.barChart.dispose();
      }
      
      // 创建新实例
      this.barChart = echarts.init(this.$refs.barChart);
      
      // 模拟数据 - 各项评分对比
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['得分', '满分'],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['任务总队耗时', '任务小队耗时', '任务个人耗时', '团队协作评估', '任务准确率'],
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: '#fff'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '得分',
            type: 'bar',
            data: [85, 90, 75, 95, 88],
            itemStyle: {
              color: '#409EFF'
            }
          },
          {
            name: '满分',
            type: 'bar',
            data: [100, 100, 100, 100, 100],
            itemStyle: {
              color: '#E6A23C',
              opacity: 0.5
            }
          }
        ]
      };
      
      this.barChart.setOption(option);
    },
    
    // 初始化饼状图
    initPieChart() {
      // 如果已经存在实例，先销毁
      if (this.pieChart) {
        this.pieChart.dispose();
      }
      
      // 创建新实例
      this.pieChart = echarts.init(this.$refs.pieChart);
      
      // 模拟数据 - 任务完成占比
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['已完成', '进行中', '未开始', '延期', '取消'],
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '任务状态',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 65, name: '已完成', itemStyle: { color: '#67C23A' } },
              { value: 20, name: '进行中', itemStyle: { color: '#409EFF' } },
              { value: 10, name: '未开始', itemStyle: { color: '#909399' } },
              { value: 3, name: '延期', itemStyle: { color: '#E6A23C' } },
              { value: 2, name: '取消', itemStyle: { color: '#F56C6C' } }
            ]
          }
        ]
      };
      
      this.pieChart.setOption(option);
    },

    // 关闭详情对话框
    closeDialog() {
      // 移除窗口大小变化监听器
      window.removeEventListener('resize', this.resizeCharts);
      
      // 销毁图表实例
      if (this.lineChart) {
        this.lineChart.dispose();
        this.lineChart = null;
      }
      if (this.barChart) {
        this.barChart.dispose();
        this.barChart = null;
      }
      if (this.pieChart) {
        this.pieChart.dispose();
        this.pieChart = null;
      }
      
      // 关闭对话框并清空数据
      this.detailDialogVisible = false;
      this.currentDetail = {};
    },

    // 搜索
    handleSearch() {
      this.currentPage = 1;
      this.fetchMissionList();
    },

    // 重置搜索
    resetSearch() {
      this.searchForm = {
        missionId: '',
        missionName: '',
        dateRange: []
      };
      this.currentPage = 1;
      this.fetchMissionList();
    },

    // 分页相关
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchMissionList();
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.fetchMissionList();
    },

    // 状态相关
    getStatusType(status) {
      const statusMap = {
        0: 'info',    // 未开始
        1: 'warning', // 进行中
        2: 'success', // 已完成
        3: 'danger'   // 已取消
      };
      return statusMap[status] || 'info';
    },

    getStatusText(status) {
      const statusMap = {
        0: '未开始',
        1: '进行中',
        2: '已完成',
        3: '已取消'
      };
      return statusMap[status] || '未知';
    },

    // 计算百分比
    getPercentage(score, maxScore) {
      if (!maxScore) return 0;
      return Math.round((score / maxScore) * 100);
    },

    // 获取进度条颜色
    getProgressColor(score, maxScore) {
      const percentage = this.getPercentage(score, maxScore);
      if (percentage < 60) {
        return '#F56C6C'; // 红色
      } else if (percentage < 80) {
        return '#E6A23C'; // 黄色
      } else {
        return '#67C23A'; // 绿色
      }
    },
    
    // 根据角色ID获取角色名称
    getRoleName(roleId) {
      const roleMap = {
        1: '炊事员',
        2: '反击步兵',
        3: '热食前送员',
        4: '油料前送员',
        5: '加注员',
        6: '控制员'
      };
      return roleMap[roleId] || `角色${roleId}`;
    }
  }
};
</script>

<style scoped>
.assessment-results-container {
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.page-header h2 {
  color: #c1ffff;
  font-size: 22px;
  margin: 0;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
}

/* 自定义日期选择器样式 */
::v-deep .el-date-editor {
  background-color: #2e2e3a !important;
}

::v-deep .el-date-editor .el-input__inner {
  background-color: #2e2e3a !important;
  color: #fff;
  border-color: #2e2e3a !important;
}

::v-deep .el-date-editor .el-input__icon {
  color: #c1ffff;
}
::v-deep .el-range-editor.el-input__inner {
  border: 1px solid #2e2e3a !important;
}

::v-deep .el-range-editor .el-range-input {
  line-height: 1;
  background-color: #2e2e3a !important;
  border: none !important;
  color: #fff;
}

::v-deep .el-range-editor .el-range-separator {
  color: #c1ffff;
  background-color: #2e2e3a !important;
}

::v-deep .el-range-editor .el-range__close-icon {
  color: #c1ffff;
  background-color: #2e2e3a !important;
}

.search-form .el-form-item {
  margin-right: 20px;
  margin-bottom: 10px;
}

.search-form .el-form-item__label {
  color: #c1ffff;
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

.pagination-container {
  padding: 15px 0;
  text-align: right;
}

.detail-btn {
  color: #c1ffff;
}

.detail-btn:hover {
  color: #c1ffff;
}

/* 详情对话框样式 */
::v-deep .assessment-detail-dialog {
  margin: 5vh auto !important;
  height: 70vh;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

::v-deep .assessment-detail-dialog .el-dialog__header {
  background-color: #61646A;
  padding: 15px 20px;
}

::v-deep .assessment-detail-dialog .el-dialog__title {
  color: #c1ffff;
  font-size: 18px;
}

::v-deep .assessment-detail-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #c1ffff;
}

::v-deep .assessment-detail-dialog .el-dialog__body {
  padding: 20px;
  flex: 1;
  overflow: auto;
  background-color: #7B8B9B;
  color: #f0f0f0;
}

.detail-container {
  color: #f0f0f0;
}

.detail-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #606266;
  padding-bottom: 10px;
}

.detail-header h3 {
  margin: 0;
  color: #c1ffff;
}

.detail-header-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
  margin: 15px;
}

.detail-content-layout {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.team-members-container {
  flex: 1;
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
  margin: 0 0 0 15px;
}

.charts-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 15px 0 0;
}

.chart-wrapper {
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
}

.chart-wrapper h4 {
  color: #c1ffff;
  margin-bottom: 15px;
  font-size: 16px;
  border-left: 4px solid #c1ffff;
  padding-left: 10px;
}

.chart {
  height: 300px;
  width: 100%;
}

/* 人员详情对话框样式 */
::v-deep .member-detail-dialog {
  margin: 5vh auto !important;
  height: 60vh;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

::v-deep .member-detail-dialog .el-dialog__header {
  background-color: #61646A;
  padding: 15px 20px;
}

::v-deep .member-detail-dialog .el-dialog__title {
  color: #c1ffff;
  font-size: 18px;
}

::v-deep .member-detail-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #c1ffff;
}

::v-deep .member-detail-dialog .el-dialog__body {
  padding: 20px;
  flex: 1;
  overflow: auto;
  background-color: #7B8B9B;
  color: #f0f0f0;
}

.member-detail-container {
  color: #f0f0f0;
}

.member-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #606266;
  padding-bottom: 10px;
}

.member-header h3 {
  margin: 0;
  color: #c1ffff;
}

.device-info {
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.device-info p {
  margin: 0;
  padding: 5px 10px;
  background-color: #3e4249;
  border-radius: 4px;
  color: #f0f0f0;
}

.member-scores,
.member-evaluation {
  margin-top: 30px;
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
}

.detail-item {
  display: flex;
  align-items: center;
}

.detail-item .label {
  font-weight: bold;
  min-width: 100px;
  color: #fff;
}
.detail-item .value {
  color: #fff;
}

.assessment-scores,
.assessment-evaluation {
  margin-top: 30px;
  background-color: #505962;
    padding: 15px;
    border-radius: 4px;
}

.assessment-scores h4,
.assessment-evaluation {
  margin-top: 20px;
  background-color: #505962;
  padding: 15px;
  border-radius: 4px;
  color: #fff;
}

.assessment-evaluation h4 {
  color: #c1ffff;
  margin-bottom: 15px;
  font-size: 16px;
  border-left: 4px solid #c1ffff;
  padding-left: 10px;
  padding-left: 10px;
}

.evaluation-content {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 4px;
  line-height: 1.6;
}
</style>
