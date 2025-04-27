<template>
  <div class="user-info-container">
    <div class="page-header">
      <!-- <div class="header-left">
        <div class="back-button" @click="goBack">
          <i class="el-icon-arrow-left"></i> 返回
        </div>
        <h2 class="page-title">人员信息</h2>
      </div> -->
    </div>

    <div class="search-form">
      <el-form :inline="true" :model="searchQuery" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchQuery.Num" placeholder="请输入人员编号" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchQuery.Name" placeholder="请输入人员姓名" size="medium" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch" size="medium" class="search-btn">查询</el-button>
          <el-button @click="handleReset" size="medium" style="background-color: #a6b5bb;color:#333">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div  style="background-color:#505962 ;">
      <div class="toolbar">
        <el-button type="primary" class="action-btn" icon="el-icon-plus" @click="handleAdd" size="small">新增</el-button>

        <el-button type="danger" class="action-btn" icon="el-icon-delete" @click="handleDelete" size="small"
          style="background-color:#C1FFFF; color:#333; border-color:#C1FFFF">删除</el-button>
        
      </div>
      <div style="padding: 0 20px 0 20px;">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border
          v-loading="loading">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column prop="Num" label="人员编号" width="120" sortable align="center" />
          <el-table-column prop="Name" label="姓名" width="100" sortable align="center" />
          <el-table-column label="性别" width="80" sortable align="center">
            <template slot-scope="scope">
              {{ scope.row.Sex === 0 ? '男' : (scope.row.Sex === 1 ? '女' : '未知') }}
            </template>
          </el-table-column>
          <el-table-column prop="GroupId" label="组织架构ID" width="120" align="center" />
          <el-table-column label="状态" width="100" align="center">
            <template slot-scope="scope">
              <span >
                {{ scope.row.Status === 0 ? '正常' : (scope.row.Status === 1 ? '删除' : '未知') }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180" sortable align="center">
            <template slot-scope="scope">
              {{ formatTimestamp(scope.row.CreateTime) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)" class="edit-btn">
                <i class="el-icon-document"></i> 详情
              </el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)" class="delete-btn">
                <i class="el-icon-delete"></i> 删除
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

    <!-- 用户表单对话框 -->
    <el-dialog ref="dialog" :title="dialogTitle" :visible.sync="dialogVisible" width="100%" @close="resetForm" style="height: 720px;"
      custom-class="user-form-dialog-top" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false" :modal="false">
      <div class="grades-container">
        <div class="grades-cards">
          <div class="section-title">
            <h3>个人成绩</h3>
          </div>
          <div class="grades-card-list">
            <el-card v-for="(item, index) in gradesList" :key="index" class="grade-card" shadow="hover" @click.native="handleGradeCardClick(item, index)" :class="{ 'active-card': selectedGradeIndex === index }" ref="gradeCards">
              <div class="card-header">
                <span class="mission-name">{{ item.MissionName }}</span>
                <span class="task-type">{{ getTaskTypeName(item.TaskType) }}</span>
              </div>
              <div class="card-content">
                <div class="info-item">
                  <span class="label">人员ID:</span>
                  <span class="value">{{ item.PeopleId }}</span>
                </div>
                <div class="info-item">
                  <span class="label">姓名:</span>
                  <span class="value">{{ item.PeopleName }}</span>
                </div>
                <div class="info-item">
                  <span class="label">分组ID:</span>
                  <span class="value">{{ item.TeamPeopleId }}</span>
                </div>
                <div class="info-item">
                  <span class="label">开始时间:</span>
                  <span class="value">{{ formatTimestamp(item.TaskStartTime) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">结束时间:</span>
                  <span class="value">{{ formatTimestamp(item.TaskEndTime) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">爆击次数:</span>
                  <span class="value highlight">{{ item.NumberOfBlastHits }}</span>
                </div>
                <div class="info-item">
                  <span class="label">子弹击中次数:</span>
                  <span class="value highlight">{{ item.NumberOfBulletHits }}</span>
                </div>
              </div>
            </el-card>
          </div>
        </div>
        <div class="grades-charts" v-show="showCharts" ref="chartsContainer">
          <div class="chart-container">
            <div class="section-title">
              <h3>任务类型分布</h3>
            </div>
            <div ref="pieChart" class="chart"></div>
          </div>
          <div class="chart-container">
            <div class="section-title">
              <h3>爆击次数趋势</h3>
            </div>
            <div ref="lineChart" class="chart"></div>
          </div>
          <div class="chart-container">
            <div class="section-title">
              <h3>子弹击中次数统计</h3>
            </div>
            <div ref="barChart" class="chart"></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPeopleList, addPeople, updatePeople, deletePeople } from '@/api/user';
import { getScoreList } from '@/api/score';
import * as echarts from 'echarts/core';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';

echarts.use([
  PieChart,
  LineChart,
  BarChart,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
  name: "GradesManagement",
  data() {
    return {
      searchQuery: {
        Num: '',
        Name: '',
        startDate: '',
        endDate: ''
      },
      CurrentPage: 1,
      PerPageCount: 10,
      total: 0,
      selectedRows: [],
      dialogVisible: false,
      dialogTitle: '新增人员',
      showCharts: false,
      selectedGradeIndex: -1,
      selectedGradeItem: null,
      chartsInitialized: false,
      userForm: {
        Id: '',
        Num: '',
        Name: '',
        Sex: 0,
        GroupId: 1,
        Status: 0,
        CreateTime: ''
      },
      rules: {
        Num: [
          { required: true, message: '请输入人员编号', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        Name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        GroupId: [
          { required: true, message: '请输入组织架构ID', trigger: 'blur' }
        ]
      },
      tableData: [],
      loading: false,
      gradesList: [],
      pieChart: null,
      lineChart: null,
      barChart: null
    }
  },
  created() {
    // 组件创建时加载人员列表数据
    this.fetchPeopleList();
    
    // 修复元素UI对话框z-index问题
    this.fixDialogZIndex();
  },
  mounted() {
    // 加载人员列表数据
    this.fetchPeopleList();
    
    // 添加窗口大小变化事件监听
    window.addEventListener('resize', this.handleResize);
    
    // 修复对话框z-index问题
    this.$nextTick(() => {
      this.fixDialogZIndex();
    });
    
    // 监听对话框打开事件
    this.$watch('dialogVisible', (newVal) => {
      if (newVal) {
        // 对话框打开后添加卡片点击事件
        this.$nextTick(() => {
          this.addCardClickEvents();
        });
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    // 销毁图表实例
    this.destroyCharts();
  },
  methods: {
    // 获取任务类型名称
    getTaskTypeName(type) {
      const taskTypes = {
        0: '热食制作',
        1: '热食遣送',
        2: '油桶遣送任务',
        3: '油料加注',
        4: '战车抢修',
        5: '卫勤救护'
      };
      return taskTypes[type] || '未知任务';
    },

    // 初始化所有图表 - 不再使用这个方法，改为直接在handleGradeCardClick中初始化
    initCharts() {
      console.log('开始初始化图表');
      this.destroyCharts(); // 先销毁旧的图表实例
      
      // 等待DOM完全渲染
      setTimeout(() => {
        if (!this.$refs.pieChart || !this.$refs.lineChart || !this.$refs.barChart) {
          console.error('图表容器元素不存在');
          return;
        }
        
        console.log('图表DOM元素存在，开始初始化');
        this.initPieChart();
        this.initLineChart();
        this.initBarChart();
        this.chartsInitialized = true;
      }, 300);
    },

    // 初始化饼图
    initPieChart() {
      if (!this.$refs.pieChart) {
        console.error('找不到pieChart元素');
        return;
      }
      
      this.pieChart = echarts.init(this.$refs.pieChart);
      this.updatePieChartData();
    },
    
    // 更新饼图数据
    updatePieChartData() {
      if (!this.pieChart) return;
      
      // 统计各任务类型数量
      const taskTypeCounts = {};
      this.gradesList.forEach(item => {
        const typeName = this.getTaskTypeName(item.TaskType);
        taskTypeCounts[typeName] = (taskTypeCounts[typeName] || 0) + 1;
      });
      
      const pieData = Object.keys(taskTypeCounts).map(key => ({
        name: key,
        value: taskTypeCounts[key]
      }));
      
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '任务类型',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '14',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: pieData
          }
        ]
      };
      
      this.pieChart.setOption(option);
    },

    // 初始化折线图
    initLineChart() {
      if (!this.$refs.lineChart) {
        console.error('找不到lineChart元素');
        return;
      }
      
      this.lineChart = echarts.init(this.$refs.lineChart);
      this.updateLineChartData();
    },
    
    // 更新折线图数据
    updateLineChartData() {
      if (!this.lineChart) return;
      
      // 按日期排序
      const sortedData = [...this.gradesList].sort((a, b) => a.TaskStartTime - b.TaskStartTime);
      
      const xData = sortedData.map(item => this.formatTimestamp(item.TaskStartTime));
      const yData = sortedData.map(item => item.NumberOfBlastHits);
      
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLabel: {
            color: '#fff',
            rotate: 45
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
            data: yData,
            type: 'line',
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3
            },
            itemStyle: {
              color: '#409EFF'
            }
          }
        ],
        textStyle: {
          color: '#fff'
        },
        backgroundColor: 'transparent'
      };
      
      this.lineChart.setOption(option);
    },

    // 初始化柱状图
    initBarChart() {
      if (!this.$refs.barChart) {
        console.error('找不到barChart元素');
        return;
      }
      
      this.barChart = echarts.init(this.$refs.barChart);
      this.updateBarChartData();
    },
    
    // 更新柱状图数据
    updateBarChartData() {
      if (!this.barChart) return;
      
      // 按任务类型分组统计子弹击中次数
      const taskTypeData = {};
      this.gradesList.forEach(item => {
        const typeName = this.getTaskTypeName(item.TaskType);
        if (!taskTypeData[typeName]) {
          taskTypeData[typeName] = {
            count: 0,
            total: 0
          };
        }
        taskTypeData[typeName].count++;
        taskTypeData[typeName].total += item.NumberOfBulletHits;
      });
      
      const xData = Object.keys(taskTypeData);
      const yData = xData.map(key => Math.round(taskTypeData[key].total / taskTypeData[key].count));
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: xData,
          axisLabel: {
            color: '#fff',
            rotate: 45
          }
        },
        yAxis: {
          type: 'value',
          name: '平均击中次数',
          nameTextStyle: {
            color: '#fff'
          },
          axisLabel: {
            color: '#fff'
          }
        },
        series: [
          {
            data: yData,
            type: 'bar',
            barWidth: '60%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            }
          }
        ]
      };
      
      this.barChart.setOption(option);
    },
    
    handleBeforeClose(done) {
      // 先检查对话框引用是否存在
      if (this.$refs.dialog && this.$refs.dialog.$el) {
        // 获取对话框元素
        const dialogEl = this.$refs.dialog.$el.querySelector('.el-dialog');
        
        // 添加动画类
        if (dialogEl) {
          dialogEl.classList.add('dialog-closing');
          
          // 使用setTimeout来延迟关闭弹窗，确保动画执行完毕
          setTimeout(() => {
            done(); // 关闭弹窗
          }, 300); // 动画时间（300ms）
        } else {
          done();
        }
      } else {
        // 如果引用不存在，直接关闭
        done();
      }
    },
  
    // 格式化时间戳为 YY-MM-DD HH:MM:SS 格式
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      
      // 检查是否已经是格式化的日期字符串
      if (typeof timestamp === 'string' && timestamp.includes('-')) {
        return timestamp;
      }
      
      const date = new Date(Number(timestamp) * 1000);
      
      // 如果日期无效，尝试不乘以1000（可能已经是毫秒）
      if (isNaN(date.getTime())) {
        const directDate = new Date(Number(timestamp));
        if (!isNaN(directDate.getTime())) {
          return this.formatDate(directDate);
        }
        return timestamp; // 如果仍然无效，返回原始值
      }
      
      return this.formatDate(date);
    },
    
    // 辅助函数：将Date对象格式化为YY-MM-DD HH:MM:SS
    formatDate(date) {
      const year = date.getFullYear().toString().substr(2); // 获取年份后两位
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    
    // 获取人员列表数据
    fetchPeopleList() {
      this.loading = true;

      const params = {
        CurrentPage: this.CurrentPage,
        PerPageCount: this.PerPageCount,
        GroupId: 0,
        Status: 0
      };

      // 添加搜索条件
      if (this.searchQuery.Num) {
        params.Num = this.searchQuery.Num;
      }
      if (this.searchQuery.Name) {
        params.Name = this.searchQuery.Name;
      }

      getPeopleList(params)
        .then(response => {
          console.log('获取人员列表成功:', response);
          if (response && response.success === true && response.data) {
            // 处理每条记录的时间戳
            const processedData = (response.data || []).map(item => {
              // 创建一个新对象，避免修改原始数据
              return { ...item };
            });
            
            this.tableData = processedData;
            
            this.total = response.ToalCount
          } else {
            this.$message.error('获取人员列表失败: ' + (response.message || '未知错误'));
            this.tableData = [];
            this.total = 0;
          }
        })
        .catch(error => {
          console.error('获取人员列表失败:', error);
          this.$message.error('获取人员列表失败: ' + (error.message || '未知错误'));
          this.tableData = [];
          this.total = 0;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goBack() {
      this.$router.push('/battle-simulation')
    },
    handleSearch() {
      this.CurrentPage = 1; // 重置为第一页
      this.fetchPeopleList(); // 调用API获取数据
    },
    
    // 重置搜索表单
    handleReset() {
      this.searchQuery = {
        Num: '',
        Name: '',
        startDate: '',
        endDate: ''
      };
      this.CurrentPage = 1;
      this.fetchPeopleList();
    },
    
    handleAdd() {
      const formData = {
        Id: '',
        Num: '',
        Name: '',
        Sex: 0,
        GroupId: 1,
        Status: 0,
        CreateTime: ''
      };
      this.openDialogWithoutModal('新增人员', formData);
    },
    handleEdit(row) {
      if (row) {
        this.openDialogWithoutModal('人员成绩详情', JSON.parse(JSON.stringify(row)));
        // 加载该人员的成绩数据
        this.fetchUserGrades(row.Id);
      } else if (this.selectedRows.length === 1) {
        this.openDialogWithoutModal('人员成绩详情', JSON.parse(JSON.stringify(this.selectedRows[0])));
        // 加载该人员的成绩数据
        this.fetchUserGrades(this.selectedRows[0].Id);
      } else {
        this.$message.warning('请选择一条记录进行查看');
      }
    },
    handleDelete(row) {
      if (!row && this.selectedRows.length === 0) {
        this.$message.warning('请先选择要删除的人员');
        return;
      }

      const id = row ? row.Id : this.selectedRows[0].Id;
      
      this.$confirm('确认删除该人员信息吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        deletePeople(id).then(response => {
          if (response) {
            this.$message.success('删除成功');
            // 刷新列表数据
            this.fetchPeopleList();
          } else {
            this.$message.error(response.data.message || '删除失败');
          }
        }).catch(error => {
          console.error('删除人员失败:', error);
          this.$message.error('删除失败: ' + (error.message || '未知错误'));
        }).finally(() => {
          this.loading = false;
        });
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },

    handleSizeChange(val) {
      this.CurrentPage = val;
      this.fetchPeopleList();
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.fetchPeopleList();
    },
    handleSelectionChange(selection) {
      this.selectedRows = selection
      console.log('Selection changed:', selection)
    },
    submitForm() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          if (this.dialogTitle === '新增人员') {
            // 调用新增人员接口
            this.loading = true;

            // 按照后端要求的格式准备数据
            const formData = new FormData();
            formData.append('Num', this.userForm.Num);
            formData.append('Name', this.userForm.Name);
            formData.append('Sex', Number(this.userForm.Sex));
            formData.append('GroupId', Number(this.userForm.GroupId));
            formData.append('Status', Number(this.userForm.Status));

            console.log('提交的表单数据:', {
              Num: formData.get('Num'),
              Name: formData.get('Name'),
              Sex: Number(formData.get('Sex')),
              GroupId: Number(formData.get('GroupId')),
              Status: Number(formData.get('Status'))
            });

            addPeople(formData)
              .then(response => {
                console.log('新增人员成功，完整响应:', response);
                console.log('响应数据:', response.data);

                // 更灵活的成功判断
                if (response && response.success === true) {
                  this.$message.success('新增成功');
                  this.dialogVisible = false;
                  // 重新获取列表数据
                  this.fetchPeopleList();
                } else {
                  console.error('新增失败详情:', response);
                  let errorMsg = '未知错误';
                  if (response.data) {
                    if (typeof response.data === 'string') {
                      errorMsg = response.data;
                    } else if (response.data.message) {
                      errorMsg = response.data.message;
                    } else if (response.data.error) {
                      errorMsg = response.data.error;
                    }
                  }
                  this.$message.error('新增失败: ' + errorMsg);
                }
              })
              .catch(error => {
                console.error('新增人员失败详情:', error);
                console.error('错误响应:', error.response);
                this.$message.error('新增失败: ' + (error.message || '未知错误'));
              })
              .finally(() => {
                this.loading = false;
              });
          } else {
            // 调用更新人员接口
            this.loading = true;

            // 按照后端要求的格式准备数据
            const formData = new FormData();
            formData.append('Id', Number(this.userForm.Id));
            formData.append('Num', this.userForm.Num);
            formData.append('Name', this.userForm.Name);
            formData.append('Sex', Number(this.userForm.Sex));
            formData.append('GroupId', Number(this.userForm.GroupId));
            formData.append('Status', Number(this.userForm.Status));
            
            console.log('编辑提交的表单数据:', {
              Id: Number(formData.get('Id')),
              Num: formData.get('Num'),
              Name: formData.get('Name'),
              Sex: Number(formData.get('Sex')),
              GroupId: Number(formData.get('GroupId')),
              Status: Number(formData.get('Status'))
            });

            updatePeople(formData)
              .then(response => {
                console.log('更新人员成功，完整响应:', response);
                console.log('响应数据:', response.data);

                // 更灵活的成功判断
                if (response) {
                  this.$message.success('更新成功');
                  this.dialogVisible = false;
                  // 重新获取列表数据
                  this.fetchPeopleList();
                } else {
                  console.error('更新失败详情:', response);
                  let errorMsg = '未知错误';
                  if (response.data) {
                    if (typeof response.data === 'string') {
                      errorMsg = response.data;
                    } else if (response.data.message) {
                      errorMsg = response.data.message;
                    } else if (response.data.error) {
                      errorMsg = response.data.error;
                    }
                  }
                  this.$message.error('更新失败: ' + errorMsg);
                }
              })
              .catch(error => {
                console.error('更新人员失败详情:', error);
                console.error('错误响应:', error.response);
                this.$message.error('更新失败: ' + (error.message || '未知错误'));
              })
              .finally(() => {
                this.loading = false;
              });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.userForm = {
        Id: '',
        Num: '',
        Name: '',
        Sex: 0,
        GroupId: 1,
        Status: 0,
        CreateTime: ''
      };
      this.gradesList = [];
      this.showCharts = false;
      this.selectedGradeIndex = -1;
      this.selectedGradeItem = null;
      this.chartsInitialized = false;
      this.destroyCharts();
    },
    // 修复Element UI对话框z-index问题
    fixDialogZIndex() {
      // 创建一个样式元素
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `
        .el-dialog__wrapper {
          z-index: 3000 !important;
        }
        .v-modal {
          display: none !important; /* 完全隐藏遮罩层 */
          opacity: 0 !important;
          z-index: -1 !important;
        }
        .el-dialog {
          z-index: 3001 !important;
        }
        .user-form-dialog-top {
          z-index: 3002 !important;
        }
      `;
      // 将样式添加到文档头部
      document.head.appendChild(style);
    },
    // 新增方法：处理对话框打开并移除遮罩层
    openDialogWithoutModal(title, formData) {
      this.dialogTitle = title;
      this.userForm = formData;
      this.dialogVisible = true;
      
      // 使用setTimeout确保在对话框完全渲染后移除遮罩层
      setTimeout(() => {
        const modals = document.querySelectorAll('.v-modal');
        modals.forEach(modal => {
          modal.parentNode.removeChild(modal);
        });
      }, 50);
    },
    // 获取用户成绩数据
    fetchUserGrades(peopleId) {
      console.log('--11---',peopleId)
      this.loading = true;
      this.showCharts = false;
      this.selectedGradeIndex = -1;
      this.selectedGradeItem = null;
      this.chartsInitialized = false;
      
      // 这里应该调用API获取成绩数据，现在使用模拟数据
      // 实际项目中应该替换为真实API调用
      setTimeout(() => {
        // 模拟数据
        const params = {
          CurrentPage:1,
          PerPageCount:10,
          PeopleId:peopleId
        }
        getScoreList(params).then(res => {
          console.log('--获取成绩列表：',res)
          if(res.data.length>0){
            this.gradesList = res.data;
          }else{
            this.gradesList = [];
            this.$message.warning('该战士还未参加过任何考核')
          }
        })
        // this.gradesList = [
        //   {
        //     "Id": 1,
        //     "TeamPeopleId": 12,
        //     "PeopleId": peopleId,
        //     "MissionId": 1,
        //     "TaskType": 2,
        //     "TaskStartTime": 1713920400,
        //     "TaskEndTime": 1713927600,
        //     "NumberOfBlastHits": 8,
        //     "NumberOfBulletHits": 10,
        //     "CreateTime": 1713928000,
        //     "PeopleName": this.userForm.Name,
        //     "MissionName": '油桶遣送训练'
        //   },
        //   {
        //     "Id": 2,
        //     "TeamPeopleId": 12,
        //     "PeopleId": peopleId,
        //     "MissionId": 2,
        //     "TaskType": 3,
        //     "TaskStartTime": 1714006800,
        //     "TaskEndTime": 1714014000,
        //     "NumberOfBlastHits": 5,
        //     "NumberOfBulletHits": 12,
        //     "CreateTime": 1714014400,
        //     "PeopleName": this.userForm.Name,
        //     "MissionName": '油料加注训练'
        //   },
        //   {
        //     "Id": 3,
        //     "TeamPeopleId": 12,
        //     "PeopleId": peopleId,
        //     "MissionId": 3,
        //     "TaskType": 4,
        //     "TaskStartTime": 1714093200,
        //     "TaskEndTime": 1714100400,
        //     "NumberOfBlastHits": 12,
        //     "NumberOfBulletHits": 15,
        //     "CreateTime": 1714100800,
        //     "PeopleName": this.userForm.Name,
        //     "MissionName": '战车抢修训练'
        //   },
        //   {
        //     "Id": 4,
        //     "TeamPeopleId": 12,
        //     "PeopleId": peopleId,
        //     "MissionId": 4,
        //     "TaskType": 5,
        //     "TaskStartTime": 1714179600,
        //     "TaskEndTime": 1714186800,
        //     "NumberOfBlastHits": 3,
        //     "NumberOfBulletHits": 8,
        //     "CreateTime": 1714187200,
        //     "PeopleName": this.userForm.Name,
        //     "MissionName": '卫勤救护训练'
        //   },
        //   {
        //     "Id": 5,
        //     "TeamPeopleId": 12,
        //     "PeopleId": peopleId,
        //     "MissionId": 5,
        //     "TaskType": 0,
        //     "TaskStartTime": 1714266000,
        //     "TaskEndTime": 1714273200,
        //     "NumberOfBlastHits": 0,
        //     "NumberOfBulletHits": 0,
        //     "CreateTime": 1714273600,
        //     "PeopleName": this.userForm.Name,
        //     "MissionName": '热食制作训练'
        //   }
        // ];
        
        this.loading = false;
        
        // 数据加载完成后添加卡片点击事件
        this.$nextTick(() => {
          this.addCardClickEvents();
        });
      }, 500);
    },
    // 处理窗口大小变化
    handleResize() {
      if (this.pieChart) this.pieChart.resize();
      if (this.lineChart) this.lineChart.resize();
      if (this.barChart) this.barChart.resize();
    },
    
    // 销毁图表实例
    destroyCharts() {
      try {
        if (this.pieChart) {
          this.pieChart.dispose();
          this.pieChart = null;
        }
        if (this.lineChart) {
          this.lineChart.dispose();
          this.lineChart = null;
        }
        if (this.barChart) {
          this.barChart.dispose();
          this.barChart = null;
        }
      } catch (error) {
        console.error('销毁图表时出错', error);
      }
    },
    
    // 添加卡片点击事件
    addCardClickEvents() {
      // 获取所有卡片元素
      const cardElements = document.querySelectorAll('.grade-card');
      console.log('找到卡片元素数量:', cardElements.length);
      
      // 为每个卡片添加点击事件
      cardElements.forEach((card, index) => {
        card.addEventListener('click', () => {
          console.log('直接点击事件触发:', index);
          this.handleCardClick(index);
        });
      });
    },
    
    // 处理卡片点击
    handleCardClick(index) {
      const item = this.gradesList[index];
      if (!item) return;
      
      console.log('点击卡片', index, item.MissionName);
      this.selectedGradeIndex = index;
      this.selectedGradeItem = item;
      this.showCharts = true;
      
      // 强制重新渲染图表容器
      this.$forceUpdate();
      
      // 使用延时确保 DOM 已更新
      setTimeout(() => {
        if (this.$refs.pieChart && this.$refs.lineChart && this.$refs.barChart) {
          console.log('图表容器已就绪，开始初始化图表');
          this.destroyCharts(); // 先销毁旧的图表实例
          
          // 直接初始化各个图表
          this.pieChart = echarts.init(this.$refs.pieChart);
          this.lineChart = echarts.init(this.$refs.lineChart);
          this.barChart = echarts.init(this.$refs.barChart);
          
          // 设置图表数据
          this.updatePieChartData();
          this.updateLineChartData();
          this.updateBarChartData();
          
          this.chartsInitialized = true;
        } else {
          console.error('图表容器元素仍然不存在');
        }
      }, 300);
    },
    
    // 原来的处理方法，保留作为兼容
    handleGradeCardClick(item, index) {
      console.log('原来的点击方法触发');
      this.handleCardClick(index);
    },
  }
};
</script>

<style scoped>
.grades-management {
  padding: 20px;
}

.content-box {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
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

::v-deep .el-table__body tr:hover > td {
  background-color: #7B8B9B !important;
}

::v-deep .el-table .el-table__header th {
  background-color: #6C767F !important;
  color: #f0f0f0 !important;
}
.section-header {
  margin-bottom: 30px;
  text-align: center;
}

.section-header h2 {
  font-size: 28px;
  color: #fff;
  font-weight: bold;
}

.grades-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
}

.grades-cards {
  width: 60%;
  height: 90%;
  padding: 20px;
  background-color: #383d44;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: calc(90vh - 120px);
}

.grades-card-list {
  margin-top: 20px;
}

.grade-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #505962;
  color: #fff;
}

.card-content {
  padding: 20px;
}

.info-item {
  margin-bottom: 10px;
}

.label {
  color: #fff;
}

.value {
  color: #fff;
  margin-left: 10px;
}

.highlight {
  color: #fff;
}

.grades-charts {
  width: 40%;
  padding: 20px;
  overflow-y: auto;
  max-height: calc(90vh - 120px);
  background-color: #383d44;
  border-radius: 8px;
  margin-left: 20px;
}

.chart-container {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #383d44;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart {
  width: 100%;
  height: 200px;
}

.grade-card {
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #2c3e50;
  color: #fff;
  transition: all 0.3s ease;
  cursor: pointer !important;
  position: relative;
  z-index: 10;
}

.grade-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.active-card {
  border: 2px solid #409EFF;
  box-shadow: 0 0 15px rgba(64, 158, 255, 0.5);
  transform: translateY(-5px);
  background-color: #3a4b5c;
}
.chart {
  width: 100%;
  height: 250px;
  min-height: 200px;
}
</style>

<style>
/* 全局样式，不使用scoped */
.user-form-dialog-top .el-dialog {
  margin-top: 5vh !important;
  margin-bottom: 5vh !important;
  height: 90vh !important;
  display: flex;
  flex-direction: column;
  background-color: #2c3e50;
  color: #fff;
}

.user-form-dialog-top .el-dialog__body {
  flex: 1;
  overflow: hidden;
  padding: 0;
  background-color: #2c3e50;
}

.user-form-dialog-top .el-dialog__header {
  background-color: #505962;
  padding: 15px 20px;
}

.user-form-dialog-top .el-dialog__title {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.user-form-dialog-top .el-card {
  background-color: #505962;
  color: #fff;
  border: none;
  margin-bottom: 15px;
}

.user-form-dialog-top .el-card__body {
  padding: 15px;
}

.user-form-dialog-top .section-title h3 {
  color: #fff;
  font-size: 18px;
  margin: 0 0 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #606f7b;
}

.user-form-dialog-top .chart {
  height: 250px;
}
</style>
