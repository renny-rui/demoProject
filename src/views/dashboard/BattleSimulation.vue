<template>
  <div class="container" @click.self="handleContainerClick">
    <div class="full-container">
      <div class="top-border">
        <div class="logo-container">
          <img src="../../assets/logo.png" alt="Logo" class="center-logo">
          <h4 class="system-title">后勤业务能力智能化考核评估软件系统</h4>
        </div>
        <div class="logout-container">
          <el-button type="danger" size="small" icon="el-icon-switch-button" @click="logout" class="logout-button">退出登录</el-button>
        </div>
      </div>
      <div class="between-side left-side">
        <div class="side-inner"></div>
      </div>
      <div class="between-side right-side">
        <div class="side-inner"></div>
      </div>
      <div class="bottom-border">
        <img src="../../assets/down.png" alt="Bottom Border" width="100%">
      </div>

      <!-- Three.js容器 -->
      <div ref="threeContainer" class="three-container">
      </div>
      <!-- <div class="right-top">
        <div class="frame-box">

          <div class="frame-content">

            <img src="../../assets/snow.gif" alt="task1" style="width: 100%;height: 130%; object-fit: cover;">
          </div>
        </div>
        <div class="frame-box">
          <div class="frame-content" style="margin-top: 14px; height: 172px;">
            <img src="../../assets/mapPic1.png" alt="task2" style="width: 100%;height: 100%; object-fit: cover;">
          </div>
        </div>
        <div class="frame-box">
          <div class="frame-content">
            <img src="../../assets/mapPic2.png" alt="task3" style="width: 100%;height: 130%; object-fit: cover;">
          </div>
        </div>
      </div> -->
      <!-- <div class="middle-top">
        <div class="middle-content">
          <img src="@/assets/map.png" alt="Map" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
        <div class="middle-bottom">
          <table cellspacing="0" cellpadding="0" border="0" width="100%" height="100%" style="margin-top: 10px;">
            <tr height="50%">
              <td width="50%"><img src="@/assets/xk01.png" alt="Image 1" width="100%"></td>
              <td width="50%"><img src="@/assets/xk01.png" alt="Image 2" width="100%"></td>
            </tr>
            <tr height="50%">
              <td width="50%"><img src="@/assets/xk03.png" alt="Image 3" width="100%"></td>
              <td width="50%"><img src="@/assets/xk04.png" alt="Image 4" width="100%"></td>
            </tr>
          </table>
        </div>
      </div> -->

      <div class="right-top">
        <template v-if="hasMissionGroups">
          <div class="frame-box" style="padding-top: 1px;">
            <div class="frame-top">
              <h4 style="font-family: 'SourceHanSerifSC', serif;">任务行动</h4>
            </div>
            <div class="frame-content">
              <div style="width: 100%;">
                <el-row :gutter="16" v-for="(item, index) in taskItems" :key="index" style="margin-bottom: 8px;">
                  <el-col :span="10">
                    <div style="color: #C1FFFF;font-size: 12px;font-family: 'SourceHanSerifSC', serif;">【{{ item.name }}】</div>
                  </el-col>
                  <el-col :span="8">
                    <div style="color: #fff;font-size: 12px;font-family: 'SourceHanSerifSC', serif;">团队人数{{ item.teamCount }}</div>
                  </el-col>
                  <el-col :span="6">
                    <div style="color: #fff;font-size: 12px;font-family: 'SourceHanSerifSC', serif;">{{ item.personCount }}人</div>
                  </el-col>
                </el-row>
              </div>

            </div>
          </div>
          <el-button type="primary" @click="taskDetail" class="detail-button">
            <i class="el-icon-s-operation" style="font-family: 'SourceHanSerifSC', serif;">任务详情</i>
           
          </el-button>
          <el-button type="primary" @click="startMission" class="start-button">
            <i class="el-icon-s-operation" style="font-family: 'SourceHanSerifSC', serif;">任务开始</i>
           
          </el-button>
          <div class="frame-box" style="margin-top: 60px;">
            <div class="frame-content">
              <img src="../../assets/taskPic/3.png" alt="task1" style="width: 100%;height: 130%; object-fit: cover;">
            </div>
          </div>
          <!-- <div class="frame-box" style="margin-top: 40px;">
            <div class="frame-content">
              <img src="../../assets/snow.gif" alt="task1" style="width: 100%;height: 130%; object-fit: cover;">
            </div>
          </div> -->
          <!-- 添加地图框 -->
          <div class="frame-box" style="margin-top: 40px;">
            <div class="frame-content map-container" @click.stop="showBattlefieldSituation">
              <div class="map-title" style="font-family: 'SourceHanSerifSC', serif;">战场态势</div>
              <svg width="100%" height="100%" viewBox="0 0 300 150">
                <!-- 不规则多边形区域 -->
                <path d="M50,20 L150,10 L220,30 L250,70 L200,110 L100,120 L40,80 Z" 
                      fill="rgba(193, 255, 255, 0.2)" 
                      stroke="#C1FFFF" 
                      stroke-width="2"/>
                <!-- 添加一些点表示位置 -->
                <circle cx="100" cy="50" r="3" fill="#C1FFFF"/>
                <circle cx="220" cy="60" r="3" fill="#FFC1C1"/>
                <!-- 添加一些虚线表示路径 -->
                <path d="M100,50 Q150,40 220,60" 
                      stroke="#666" 
                      stroke-width="1" 
                      stroke-dasharray="4,4" 
                      fill="none"/>
              </svg>
              <!-- 添加提示文本 -->
              <div class="click-hint">点击查看详情</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="frame-box" style="padding-top: 1px;">
            <div class="frame-top">
              <h4 class="task-title" style="font-family: 'SourceHanSerifSC', serif;">任务行动</h4>
            </div>
            <div class="frame-content" style="display: flex;flex-direction: column;">
              <span style="color: #C1FFFF;font-family: 'SourceHanSerifSC', serif;">【请发布新任务】</span>

            </div>
          </div>
          <el-button type="primary" @click="startTask" class="add-button">
            <i class="el-icon-circle-plus-outline" style="font-family: 'SourceHanSerifSC', serif;">发布任务</i>
          </el-button>
        </template>
      </div>

      <!-- 底部卡片区域 -->
      <div class="bottom-cards">
        <div class="card-item" ref="chart1" @click="showFuelDialog()">
          <div class="card-header">油料前送</div>
          <div class="card-content-wrapper">
            <div class="card-data">
              <div class="data-item">
                <span class="data-label">进度</span>
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 75%"></div>
                </div>
                <span class="data-value">75%</span>
              </div>
              <div class="data-item">
                <span class="data-label">车辆</span>
                <span class="data-value">12台</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card-item" ref="chart2" @click="showFuelDialog()">
          <div class="card-header">油料加注</div>
          <div class="card-content-wrapper">
            <div class="card-data">
              <div class="data-item">
                <span class="data-label">完成量</span>
                <span class="data-value">4.2吨</span>
              </div>
              <div class="data-item">
                <span class="data-label">效率</span>
                <span class="data-value highlight">+12%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item" ref="timerCard" @click="showSupplyDialog()">
          <div class="card-header">热食制作</div>
          <div class="card-content-wrapper">
            <div class="card-data">
              <div class="data-item">
                <span class="data-label">当前批次</span>
                <span class="data-value">3/5</span>
              </div>
              <div class="data-item">
                <span class="data-label">剩余时间</span>
                <span class="data-value timer">01:45:22</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item" ref="weatherCard" @click="showSupplyDialog()">
          <div class="card-header">热食前送</div>
          <div class="card-content-wrapper">
            <div class="card-data">
              <div class="data-item">
                <span class="data-label">路线</span>
                <span class="data-value">A-3区域</span>
              </div>
              <div class="data-item">
                <span class="data-label">状态</span>
                <span class="data-value status-active">进行中</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item" ref="chart3" @click="showSanitationDialog()">
          <div class="card-header">卫勤救护</div>
          <div class="card-content-wrapper">
            <div class="card-data">
              <div class="data-item">
                <span class="data-label">待转运</span>
                <span class="data-value highlight">3人</span>
              </div>
              <div class="data-item">
                <span class="data-label">医护人员</span>
                <span class="data-value">8人</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item" ref="chart4" @click="showEquipmentRepairDialog()">
          <div class="card-header">装备抢修</div>
          <div class="card-content-wrapper">
            <div class="card-data">
              <div class="data-item">
                <span class="data-label">待修复</span>
                <span class="data-value">5台</span>
              </div>
              <div class="data-item">
                <span class="data-label">完成率</span>
                <span class="data-value">68%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 左侧悬浮菜单栏 -->
      <!-- 菜单内容 -->
      <div class="floating-menu">
        <!-- 左侧一级菜单栏，仅展示图标，hover 只显示tooltip不展开二级菜单 -->
        <div class="menu-primary">
          <el-tooltip v-for="item in primaryMenus" :key="item.key" :content="item.name" placement="right" effect="dark">
            <div class="menu-item" :class="{ active: activeMenuItem === item.key }"
              @click="handlePrimaryClick(item.key)">
              <img v-if="item.iconImage" :src="require(`../../assets/icons/${item.iconImage}`)" class="menu-icon-img" />
              <i v-else :class="item.icon" class="menu-icon"></i>
            </div>
          </el-tooltip>
        </div>

        <!-- 右侧二级菜单栏：只有点击一级菜单才显示，鼠标移走不会收起 -->
        <transition name="slide-fade">
          <div class="menu-secondary" v-if="activeMenuItem && showSecondaryMenu">
            <div class="submenu-title">{{ menuTitle }}</div>
            <div class="submenu-item" v-for="sub in secondaryMenus[activeMenuItem]" :key="sub.key"
              :class="{ 'active-submenu': activeSubmenuItem === sub.key }" @click="handleSubmenuClick(sub.key)">
              {{ sub.name }}
            </div>
          </div>
        </transition>
        <!-- 右侧三级菜单栏：只有点击二级菜单才显示，鼠标移走不会收起 -->
        <transition name="slide-fade">
          <div class="menu-tertiary" v-if="activeThirdMenuItem && tertiaryMenus[activeThirdMenuItem]">
            <div class="submenu-title">
              {{
                activeThirdMenuItem
                  ? secondaryMenus[activeMenuItem].find(
                    (item) => item.key === activeThirdMenuItem
                  )?.name
                  : ''
              }}
            </div>
            <div class="submenu-item" v-for="item in tertiaryMenus[activeThirdMenuItem]" :key="item.key"
              :class="{ 'active-submenu': activeThirdMenuSelection === item.key }"
              @click="handleTertiaryClick(item.key)">
              {{ item.name }}
            </div>
          </div>
        </transition>
      </div>


    </div>
    <!-- 门动画区域 -->
    <!-- <div v-if="showDoors" class="door-container">
      <div class="door-wrapper">
        <div class="door" :class="{ open: doorsOpening }">
          <div class="door-image" :style="{ backgroundImage: 'url(' + require('../../assets/loginaction.png') + ')' }">
          </div>
          <div v-if="!doorsOpening" class="start-button-container">
            <el-button type="primary" class="start-button" @click="startSimulation">开始</el-button>
          </div>
        </div>
      </div>
    </div> -->


    <!-- 用户信息对话框 -->
    <el-dialog ref="userInfoDialog" title="用户信息" :visible.sync="userInfoDialogVisible" width="70%"
      :before-close="closeUserInfoDialog" custom-class="user-info-dialog" :append-to-body="true"
      :lock-scroll="false" :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true"
      :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">用户信息</span>
        <el-button class="header-close-btn" size="small" @click="userInfoDialogVisible = false">关闭</el-button>
      </div>
      <UserInfo />
    </el-dialog>

    <el-dialog title="任务配置" :visible.sync="taskDialogVisible" width="70%" :before-close="closeTaskDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">任务配置</span>
        <el-button class="header-close-btn" size="small" @click="closeDialogWithoutCollapseMenu($event, null, closeTaskDialog)">关闭</el-button>
      </div>
      <mixTask @submit-success="getLastList" />
    </el-dialog>

    <el-dialog title="任务详情" :visible.sync="taskDetailDialogVisible" width="70%" :before-close="closeTaskDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">任务详情</span>
        <el-button class="header-close-btn" size="small" @click="closeDialogWithoutCollapseMenu($event, null, closeTaskDialog)">关闭</el-button>
      </div>
      <TaskDetail @task-completed="getLastList" />
    </el-dialog>
    <!-- 任务基本设置对话框 -->
    <el-dialog title="任务基本设置" :visible.sync="taskSettingsDialogVisible" width="70%"
      :before-close="closeTaskSettingsDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">任务基本设置</span>
        <el-button class="header-close-btn" size="small" @click="closeDialogWithoutCollapseMenu($event, null, closeTaskSettingsDialog)">关闭</el-button>
      </div>
      <DeviceBinding @next-step="showTaskAssignmentDialog" />
    </el-dialog>
    <!-- 小队任务分配对话框 -->
    <el-dialog title="小队任务分配" :visible.sync="taskAssignmentDialogVisible" width="70%"
      :before-close="closeTaskAssignmentDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">小队任务分配</span>
        <el-button class="header-close-btn" size="small" @click="closeDialogWithoutCollapseMenu($event, null, closeTaskAssignmentDialog)">关闭</el-button>
      </div>
      <TaskAssignment />
    </el-dialog>

    <!-- 设备信息对话框 -->
    <el-dialog title="设备信息" :visible.sync="equipmentDialogVisible" width="70%" :before-close="closeEquipmentDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">设备信息</span>
        <el-button class="header-close-btn" size="small" @click="closeDialogWithoutCollapseMenu($event, 'equipmentDialogVisible')">关闭</el-button>
      </div>
      <EquipmentInfo />
    </el-dialog>

    <!-- 设备分类对话框 -->
    <el-dialog title="设备分类" :visible.sync="deviceCategoryDialogVisible" width="70%"
      :before-close="closeDeviceCategoryDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">设备分类</span>
        <el-button class="header-close-btn" size="small" @click="closeDialogWithoutCollapseMenu($event, null, closeDeviceCategoryDialog)">关闭</el-button>
      </div>
      <DeviceCategory />
    </el-dialog>

    <el-dialog title="组织机构" :visible.sync="organizationDialogVisible" width="70%"
      :before-close="closeOrganizationDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">组织机构</span>
        <el-button class="header-close-btn" size="small" @click="organizationDialogVisible = false">关闭</el-button>
      </div>
      <Organization />
    </el-dialog>
    <el-dialog title="角色管理" :visible.sync="roleManagementDialogVisible" width="70%"
      :before-close="closeRoleManagementDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">角色管理</span>
        <el-button class="header-close-btn" size="small" @click="roleManagementDialogVisible = false">关闭</el-button>
      </div>
      <Roles />
    </el-dialog>
    <el-dialog title="权限管理" :visible.sync="permissionsDialogVisible" width="70%" :before-close="closePermissionsDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">权限管理</span>
        <el-button class="header-close-btn" size="small" @click="permissionsDialogVisible = false">关闭</el-button>
      </div>
      <Permission />
    </el-dialog>
    <el-dialog title="油料作业" :visible.sync="fuelDialogVisible" width="70%" :before-close="closeEquipmentDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">油料作业</span>
        <el-button class="header-close-btn" size="small" @click="fuelDialogVisible = false">关闭</el-button>
      </div>
      <OilDelivery />
    </el-dialog>
    <el-dialog title="补给勤务" :visible.sync="supplyDialogVisible" width="70%" :before-close="closeEquipmentDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">补给勤务</span>
        <el-button class="header-close-btn" size="small" @click="supplyDialogVisible = false">关闭</el-button>
      </div>
      <SupplyService />
    </el-dialog>
    <el-dialog title="卫生勤务" :visible.sync="sanitationDialogVisible" width="70%" :before-close="closeEquipmentDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">卫生勤务</span>
        <el-button class="header-close-btn" size="small" @click="sanitationDialogVisible = false">关闭</el-button>
      </div>
      <SanitationService />
    </el-dialog>
    <el-dialog title="设备抢修" :visible.sync="equipmentRepairDialogVisible" width="70%"
      :before-close="closeEquipmentDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">设备抢修</span>
        <el-button class="header-close-btn" size="small" @click="equipmentRepairDialogVisible = false">关闭</el-button>
      </div>
      <EquipmentRepair />
    </el-dialog>
    <el-dialog title="课程管理与发布" :visible.sync="courseManagementDialogVisible" width="70%"
      :before-close="closeCourseManagementDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">课程管理与发布</span>
        <el-button class="header-close-btn" size="small" @click="courseManagementDialogVisible = false">关闭</el-button>
      </div>
      <CourseManagement />
    </el-dialog>
    <el-dialog title="成绩管理" :visible.sync="gradeManagementDialogVisible" width="70%"
      :before-close="closeGradeManagementDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">成绩管理</span>
        <el-button class="header-close-btn" size="small" @click="gradeManagementDialogVisible = false">关闭</el-button>
      </div>
      <GradesManagement />
    </el-dialog>
    <el-dialog title="示教内容管理" :visible.sync="teachingContentDialogVisible" width="70%"
      :before-close="closeTeachingContentDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">示教内容管理</span>
        <el-button class="header-close-btn" size="small" @click="teachingContentDialogVisible = false">关闭</el-button>
      </div>
      <ContentManagement />
    </el-dialog>
    <el-dialog title="规则体系管理" :visible.sync="rulesSystemDialogVisible" width="70%"
      :before-close="closeRulesSystemDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">规则体系管理</span>
        <el-button class="header-close-btn" size="small" @click="rulesSystemDialogVisible = false">关闭</el-button>
      </div>
      <RulesManagement />
    </el-dialog>
    <el-dialog title="日志管理" :visible.sync="logManagementDialogVisible" width="70%"
      :before-close="closeLogManagementDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">日志管理</span>
        <el-button class="header-close-btn" size="small" @click="logManagementDialogVisible = false">关闭</el-button>
      </div>
      <LogManagement />
    </el-dialog>
    <el-dialog title="科目设置与选择" :visible.sync="subjectSettingsDialogVisible" width="70%"
      :before-close="closeSubjectSettingsDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">科目设置与选择</span>
        <el-button class="header-close-btn" size="small" @click="subjectSettingsDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="场景实操" :visible.sync="sceneOperationDialogVisible" width="70%"
      :before-close="closeSceneOperationDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">场景实操</span>
        <el-button class="header-close-btn" size="small" @click="sceneOperationDialogVisible = false">关闭</el-button>
      </div>
      <ScenePractical/>
    </el-dialog>
    <el-dialog title="任务编组" :visible.sync="taskGroupingDialogVisible" width="70%"
      :before-close="closeTaskGroupingDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">任务编组</span>
        <el-button class="header-close-btn" size="small" @click="taskGroupingDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="动作捕捉与感应反馈" :visible.sync="motionCaptureDialogVisible" width="70%"
      :before-close="closeMotionCaptureDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">动作捕捉与感应反馈</span>
        <el-button class="header-close-btn" size="small" @click="motionCaptureDialogVisible = false">关闭</el-button>
      </div>
      <MotionCapture />
    </el-dialog>
    <el-dialog title="伴随指导" :visible.sync="guidanceDialogVisible" width="70%" :before-close="closeGuidanceDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">伴随指导</span>
        <el-button class="header-close-btn" size="small" @click="guidanceDialogVisible = false">关闭</el-button>
      </div>
      <GuidanceSystem />
    </el-dialog>
    <el-dialog title="智能指导" :visible.sync="intelligentGuidanceDialogVisible" width="70%"
      :before-close="closeIntelligentGuidanceDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">智能指导</span>
        <el-button class="header-close-btn" size="small"
          @click="intelligentGuidanceDialogVisible = false">关闭</el-button>
      </div>
      <IntelligentGuidance />
    </el-dialog>
    <el-dialog title="训练数据采集与存储" :visible.sync="trainingDataDialogVisible" width="70%"
      :before-close="closeTrainingDataDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">训练数据采集与存储</span>
        <el-button class="header-close-btn" size="small" @click="trainingDataDialogVisible = false">关闭</el-button>
      </div>
      <TrainingDataCollection />
    </el-dialog>
    <el-dialog title="智能辅助认知算法管理" :visible.sync="algorithmManagementDialogVisible" width="70%"
      :before-close="closeAlgorithmManagementDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">智能辅助认知算法管理</span>
        <el-button class="header-close-btn" size="small"
          @click="algorithmManagementDialogVisible = false">关闭</el-button>
      </div>
      <AlgorithmManagement />
    </el-dialog>
    <el-dialog title="考核评估配置" :visible.sync="assessmentConfigDialogVisible" width="70%"
      :before-close="closeAssessmentConfigDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="false" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle" @open="handleAssessmentConfigOpen">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">考核评估配置</span>
        <el-button class="header-close-btn" size="small" @click="assessmentConfigDialogVisible = false">关闭</el-button>
      </div>
      <AssessmentConfig ref="assessmentConfig" />
    </el-dialog>
    <el-dialog title="考核成绩及评价" :visible.sync="assessmentResultDialogVisible" width="70%"
      :before-close="closeAssessmentResultDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">考核成绩及评价</span>
        <el-button class="header-close-btn" size="small" @click="assessmentResultDialogVisible = false">关闭</el-button>
      </div>
      <AssessmentResults/>
    </el-dialog>
    <el-dialog title="实操考核过程回放" :visible.sync="assessmentReplayDialogVisible" width="70%"
      :before-close="closeAssessmentReplayDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">实操考核过程回放</span>
        <el-button class="header-close-btn" size="small" @click="assessmentReplayDialogVisible = false">关闭</el-button>
      </div>
      <AssessmentReplay />
    </el-dialog>
    <el-dialog title="智能系统分析及展示" :visible.sync="intelligentAnalysisDialogVisible" width="70%"
      :before-close="closeIntelligentAnalysisDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">智能系统分析及展示</span>
        <el-button class="header-close-btn" size="small"
          @click="intelligentAnalysisDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="考核评估指标管理" :visible.sync="assessmentIndexDialogVisible" width="70%"
      :before-close="closeAssessmentIndexDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">考核评估指标管理</span>
        <el-button class="header-close-btn" size="small" @click="assessmentIndexDialogVisible = false">关闭</el-button>
      </div>
      <AssessmentIndex ref="assessmentIndex" />
    </el-dialog>
    <el-dialog title="考核评估算法管理" :visible.sync="assessmentAlgorithmDialogVisible" width="70%"
      :before-close="closeAssessmentAlgorithmDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">考核评估算法管理</span>
        <el-button class="header-close-btn" size="small"
          @click="assessmentAlgorithmDialogVisible = false">关闭</el-button>
      </div>
      <AssessmentAlgorithm ref="assessmentAlgorithm" />
    </el-dialog>
    <el-dialog title="智能化知识库与知识图谱" :visible.sync="searchDialogVisible" width="70%" :before-close="closeSearchDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">智能化知识库与知识图谱</span>
        <el-button class="header-close-btn" size="small" @click="searchDialogVisible = false">关闭</el-button>
      </div>
      <div class="container-search" style="width: 100%;overflow-y: auto;">
        <div class="search-box">
          <el-input v-model="searchQuery" placeholder="搜索内容" prefix-icon="el-icon-search" clearable
            @input="handleSearch"></el-input>
          <el-button type="primary" class="search-btn">2D可视化</el-button>
          <el-button type="primary" class="search-btn">3D可视化</el-button>
        </div>
        
        <div class="knowledge-grid">
          <!-- 第一行图片 -->
          <div class="knowledge-item" v-for="(item, index) in knowledgeItems.slice(0, 5)" :key="'row1-' + index">
            <div class="image-container">
              <img :src="item.image" :alt="item.title" class="knowledge-image" />
              <div class="image-title">{{ item.title }}</div>
            </div>
          </div>
          
          <!-- 第二行图片 -->
          <div class="knowledge-item" v-for="(item, index) in knowledgeItems.slice(5, 10)" :key="'row2-' + index">
            <div class="image-container">
              <img :src="item.image" :alt="item.title" class="knowledge-image" />
              <div class="image-title">{{ item.title }}</div>
            </div>
          </div>
          
          <!-- 第三行图片 -->
          <div class="knowledge-item" v-for="(item, index) in knowledgeItems.slice(10, 15)" :key="'row3-' + index">
            <div class="image-container">
              <img :src="item.image" :alt="item.title" class="knowledge-image" />
              <div class="image-title">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>

    </el-dialog>
    <!-- 战场态势放大展示弹窗 -->
    <transition name="fade">
      <div class="battlefield-modal-container" v-if="showBattlefieldModal">
       
        <div class="battlefield-content" :class="{ 'battlefield-content-active': battlefieldContentActive }">
          <div class="battlefield-header">
            <h3 style="color: #000;">战场态势详情</h3>
            <button class="close-btn" @click.stop="closeBattlefieldModal">×</button>
          </div>
        <div class="battlefield-body">
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            <!-- 更详细的战场态势图 - 扩展版本 -->
            <defs>
              <radialGradient id="area-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="rgba(193, 255, 255, 0.4)" />
                <stop offset="100%" stop-color="rgba(193, 255, 255, 0.1)" />
              </radialGradient>
              <!-- 添加箭头标记 -->
              <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#C1FFFF" />
              </marker>
            </defs>
            
            <!-- 主战区域 -->
            <path d="M150,100 L350,80 L550,120 L650,250 L600,400 L350,450 L150,380 L100,250 Z" 
                  fill="url(#area-gradient)" 
                  stroke="#C1FFFF" 
                  stroke-width="3"/>
            
            <!-- 添加更多详细的点位和路径 -->
            <!-- 友方单位 -->
            <circle cx="200" cy="200" r="8" fill="#C1FFFF" />
            <circle cx="250" cy="180" r="8" fill="#C1FFFF" />
            <circle cx="180" cy="250" r="8" fill="#C1FFFF" />
            <circle cx="300" cy="220" r="8" fill="#C1FFFF" />
            
            <!-- 敌方单位 -->
            <circle cx="500" cy="200" r="8" fill="#FFC1C1" />
            <circle cx="550" cy="250" r="8" fill="#FFC1C1" />
            <circle cx="480" cy="300" r="8" fill="#FFC1C1" />
            
            <!-- 移动路径和战术箭头 -->
            <path d="M200,200 Q300,180 500,200" 
                  stroke="#C1FFFF" 
                  stroke-width="2" 
                  stroke-dasharray="6,3" 
                  fill="none"
                  marker-end="url(#arrow)" />
                  
            <path d="M250,180 Q350,150 550,250" 
                  stroke="#C1FFFF" 
                  stroke-width="2" 
                  stroke-dasharray="6,3" 
                  fill="none"
                  marker-end="url(#arrow)" />
                  
            <!-- 添加地形标记 -->
            <text x="400" y="150" fill="#C1FFFF" font-size="14" text-anchor="middle">高地</text>
            <text x="200" y="350" fill="#C1FFFF" font-size="14" text-anchor="middle">补给区</text>
            <text x="600" y="350" fill="#C1FFFF" font-size="14" text-anchor="middle">敌方阵地</text>
            
            <!-- 添加坐标网格 -->
            <g opacity="0.3">
              <!-- 水平网格线 -->
              <line x1="100" y1="100" x2="700" y2="100" stroke="#C1FFFF" stroke-width="1" />
              <line x1="100" y1="200" x2="700" y2="200" stroke="#C1FFFF" stroke-width="1" />
              <line x1="100" y1="300" x2="700" y2="300" stroke="#C1FFFF" stroke-width="1" />
              <line x1="100" y1="400" x2="700" y2="400" stroke="#C1FFFF" stroke-width="1" />
              <line x1="100" y1="500" x2="700" y2="500" stroke="#C1FFFF" stroke-width="1" />
              
              <!-- 垂直网格线 -->
              <line x1="100" y1="100" x2="100" y2="500" stroke="#C1FFFF" stroke-width="1" />
              <line x1="200" y1="100" x2="200" y2="500" stroke="#C1FFFF" stroke-width="1" />
              <line x1="300" y1="100" x2="300" y2="500" stroke="#C1FFFF" stroke-width="1" />
              <line x1="400" y1="100" x2="400" y2="500" stroke="#C1FFFF" stroke-width="1" />
              <line x1="500" y1="100" x2="500" y2="500" stroke="#C1FFFF" stroke-width="1" />
              <line x1="600" y1="100" x2="600" y2="500" stroke="#C1FFFF" stroke-width="1" />
              <line x1="700" y1="100" x2="700" y2="500" stroke="#C1FFFF" stroke-width="1" />
            </g>
          </svg>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import UserInfo from '@/views/user/UserInfo.vue'; // Import UserInfo component
import DeviceBinding from '../tasks/DeviceBinding.vue';
import TaskAssignment from '../tasks/TaskAssignment.vue';
import EquipmentInfo from '@/views/management/Equipment.vue'; // Import EquipmentInfo component
import * as echarts from 'echarts';
import { getMissionLastList, getMissionProcess } from '@/api/mission';
import DeviceCategory from '../management/DeviceCategory.vue';
import Organization from '../user/Organization.vue';
import Roles from '../user/Roles.vue';
import mixTask from '@/views/tasks/mixTask.vue';
import Permission from '../user/Permission.vue';
import OilDelivery from '../training/OilDelivery.vue';
import SupplyService from '../training/SupplyService.vue';
import SanitationService from '../training/SanitationService.vue';
import EquipmentRepair from '../training/EquipmentRepair.vue';
import CourseManagement from '../training/CourseManagement.vue';
import GradesManagement from '../management/Grades.vue';
import RulesManagement from '../management/Rules.vue';
import MotionCapture from '../management/MotionCapture.vue'
import GuidanceSystem from '../management/GuidanceSystem.vue'
import IntelligentGuidance from '../management/IntelligentGuidance.vue'
import TrainingDataCollection from '../management/TrainingDataCollection.vue'
import AlgorithmManagement from '../management/AlgorithmManagement.vue'
import AssessmentConfig from '../management/AssessmentConfig.vue'
import AssessmentIndex from '../management/AssessmentIndex.vue'
import AssessmentAlgorithm from '../management/AssessmentAlgorithm.vue'
import LogManagement from '../management/LogManagement.vue'
import TaskDetail from '../tasks/TaskDetail.vue'
import ContentManagement from '../management/Content.vue'
import ScenePractical from '../management/ScenePractical.vue'
import AssessmentResults from '../management/AssessmentResults.vue'
import AssessmentReplay from '../management/AssessmentReplay.vue'
export default {
  name: 'BattleSimulation',
  components: {
    UserInfo,
    DeviceBinding,
    TaskAssignment,
    EquipmentInfo,
    DeviceCategory,
    Organization,
    Roles,
    mixTask,
    Permission,
    OilDelivery,
    SupplyService,
    SanitationService,
    EquipmentRepair,
    CourseManagement,
    GradesManagement,
    RulesManagement,
    MotionCapture,
    GuidanceSystem,
    IntelligentGuidance,
    TrainingDataCollection,
    AlgorithmManagement,
    AssessmentConfig,
    AssessmentIndex,
    AssessmentAlgorithm,
    LogManagement,
    TaskDetail,
    ContentManagement,
    ScenePractical,
    AssessmentResults,
    AssessmentReplay
  },
  data() {
    return {
      // 3D地球相关数据
      renderer: null,
      scene: null,
      camera: null,
      earthMesh: null,
      cloudMesh: null,
      gridMesh: null,
      animationId: null,
      searchQuery:'',
      isMenuCollapsed: false, // 添加菜单折叠状态变量，默认为展开状态
      activeMenuItem: null,
      hoveredItem: null,
      showSecondaryMenu: true,
      // 战场态势相关状态
      showBattlefieldModal: false,
      battlefieldContentActive: false,
      primaryMenus: [
        { key: "user", iconImage: "userInfo.png", name: "基础信息管理" },
        { key: "applicationScenario", iconImage: "task.png", name: "应用场景构建管理" },
        { key: "simulate", iconImage: "algorithm.png", name: "智能模拟认知管理" },
        { key: "score", iconImage: "Vector.png", name: "智能考核评估管理" },
        { key: "search", iconImage: "Search.png", name: "智能化知识库与知识图谱" },
      ],
      secondaryMenus: {
        user: [
          { key: "userInfo", name: "用户管理" },
          { key: "device", name: "设备管理" },
          { key: "course", name: "课程管理" },
          { key: "grade", name: "成绩管理" },
          { key: "teaching", name: "示教内容管理" },
          { key: "regular", name: "规则体系管理" },
          { key: "log", name: "日志管理" },
        ],
        applicationScenario: [

        ],
        search: [],
        simulate: [
          { key: "subject", name: "科目设置与选择" },
          { key: "scene", name: "场景实操" },
          { key: "task", name: "任务编组" },
          { key: "action", name: "动作捕捉与感应反馈" },
          { key: "guidance", name: "伴随指导" },
          { key: "cognition", name: "智能指导" },
          { key: "data", name: "训练数据采集与存储" },
          { key: "algorithm", name: "智能辅助认知算法管理" },

        ],
        score: [
          { key: "config", name: "考核评估配置" },
          { key: "result", name: "考核成绩及评价" },
          { key: "replay", name: "实操考核过程回放" },
          { key: "analysis", name: "智能系统分析与展示" },
          { key: "index", name: "考核评估指标管理" },
          { key: "examination", name: "考核评估算法管理" },
        ],
      },
      tertiaryMenus: {
        userInfo: [
          { key: "personal", name: "用户信息" },
          { key: "organization", name: "组织机构" },
          { key: "roles", name: "角色管理" },
          { key: "permissions", name: "权限管理" }
        ],
        device: [
          { key: "deviceCategory", name: "设备分类" },
          { key: "equipment", name: "设备信息" }
        ],
        course: [
          { key: "fuel", name: "油料作业" },
          { key: "supply", name: "补给勤务" },
          { key: "san", name: "卫生勤务" },
          { key: "repair", name: "装备抢修" },
          { key: "course", name: "课程管理与发布" },
        ]
      },
      // 当前激活的菜单项
      activeThirdMenuItem: null, // 二级菜单
      activeThirdMenuSelection: null, // 三级菜单选择
      // 二级菜单
      activeSecondMenuItem: null,

      // 三级菜单（如：userInfo、organization）
      activeSubmenuItem: null,
      maskProgress: 0,
      // 对话框相关
      userInfoDialogVisible: false, // 用户信息弹窗可见性
      organizationDialogVisible: false, // 组织机构弹窗可见性
      roleManagementDialogVisible: false, // 角色管理弹窗可见性
      permissionsDialogVisible: false, // 权限管理弹窗可见性
      fuelDialogVisible: false, // 油料作业弹窗可见性
      supplyDialogVisible: false, // 补给勤务弹窗可见性
      sanitationDialogVisible: false, // 卫生勤务弹窗可见性
      equipmentRepairDialogVisible: false, // 设备抢修弹窗可见性
      courseManagementDialogVisible: false, // 课程管理与发布弹窗可见性
      gradeManagementDialogVisible: false, // 成绩管理弹窗可见性
      teachingContentDialogVisible: false, // 示教内容管理弹窗可见性
      rulesSystemDialogVisible: false, // 规则体系管理弹窗可见性
      logManagementDialogVisible: false, // 日志管理弹窗可见性
      subjectSettingsDialogVisible: false, // 科目设置与选择弹窗可见性
      sceneOperationDialogVisible: false, // 场景实操弹窗可见性
      taskGroupingDialogVisible: false, // 任务编组弹窗可见性
      motionCaptureDialogVisible: false, // 动作捕捉与感应反馈弹窗可见性
      guidanceDialogVisible: false, // 伴随指导弹窗可见性
      intelligentGuidanceDialogVisible: false, // 智能指导弹窗可见性
      trainingDataDialogVisible: false, // 训练数据采集与存储弹窗可见性
      algorithmManagementDialogVisible: false, // 智能辅助认知算法管理弹窗可见性
      assessmentConfigDialogVisible: false, // 考核评估配置弹窗可见性
      assessmentResultDialogVisible: false, // 考核成绩及评价弹窗可见性
      assessmentReplayDialogVisible: false, // 实操考核过程回放弹窗可见性
      intelligentAnalysisDialogVisible: false, // 智能系统分析及展示弹窗可见性
      assessmentIndexDialogVisible: false, // 考核评估指标管理弹窗可见性
      assessmentAlgorithmDialogVisible: false, // 考核评估算法管理弹窗可见性
      searchDialogVisible: false,
      isClosingDialog: false, // 标记对话框是否正在关闭中
      taskDetailDialogVisible: false,

      // 视频相关
      showHelpPanel: false,
      showDoors: true,


      // 控制选项
      isAnimating: true,
      showWireframe: false,
      showLabels: false,
      nightMode: false,
      skipVideoOnAutoplayFail: false,
      containerWidth: 0,
      containerHeight: 0,
      equipmentDialogVisible: false,
      deviceCategoryDialogVisible: false,

      // 计时器相关数据
      elapsedTime: 0,
      timerInterval: null,

      // 天气相关数据
      currentWeather: '晴朗',
      temperature: 28,

      videoSrc: require('@/assets/videos/mv1.mp4'), // Add video source data property

      // 任务基本设置对话框
      taskSettingsDialogVisible: false,
      taskDialogVisible: false,
      taskSettings: {
        name: '',
        description: '',
        type: 'training',
        terrain: 'rainforest',
        time: 'morning',
        forces: {
          red: {
            tanks: 10,
            infantry: 100,
            artillery: 5
          },
          blue: {
            tanks: 8,
            infantry: 80,
            artillery: 4
          }
        }
      },

      taskAssignmentDialogVisible: false,
      doorsOpening: false,
      taskItems: [],
      hasMissionGroups: false, // Add a flag to track if mission groups exist
      missionName: '',
      knowledgeItems: [
        { 
          image: require('@/assets/images/equipment-1.png'),
          title: '单兵单兵人员装备检查'
        },
        { 
          image: require('@/assets/images/oil-delivery-1.png'),
          title: '实施油料加注操作'
        },
        { 
          image: require('@/assets/images/sanitation-1.png'),
          title: '单兵单兵人员装备检查'
        },
        { 
          image: require('@/assets/images/equipment-2.png'),
          title: '坦克人员入车操作步骤'
        },
        { 
          image: require('@/assets/images/supply-1.png'),
          title: '多名伤员在战场上实施底部救护'
        },
        { 
          image: require('@/assets/images/equipment-3.png'),
          title: '单兵单兵人员装备检查'
        },
        { 
          image: require('@/assets/images/oil-delivery-2.png'),
          title: '柱塔式发动机结构'
        },
        { 
          image: require('@/assets/images/sanitation-2.png'),
          title: '润滑油压力表检查'
        },
        { 
          image: require('@/assets/images/equipment-4.png'),
          title: '伤口处理方法步骤'
        },
        { 
          image: require('@/assets/images/supply-2.png'),
          title: '武装人员在战场中穿越障碍物'
        },
        { 
          image: require('@/assets/images/equipment-5.png'),
          title: '单兵单兵人员装备检查'
        },
        { 
          image: require('@/assets/images/oil-delivery-3.png'),
          title: '实施油料加注操作'
        },
        { 
          image: require('@/assets/images/sanitation-3.png'),
          title: '单兵单兵人员装备检查'
        },
        { 
          image: require('@/assets/images/equipment-6.png'),
          title: '坦克人员入车操作步骤'
        },
        { 
          image: require('@/assets/images/supply-3.png'),
          title: '多名伤员在战场上实施底部救护'
        }
      ]
    };
  },
  computed: {
    menuTitle() {
      const current = this.primaryMenus.find(m => m.key === this.activeMenuItem);
      return current ? current.name : '';
    },
    // 计算弹窗的样式，根据三级菜单的显示状态动态调整
    dialogStyle() {
      // 如果三级菜单显示，则向右移动弹窗
      if (this.activeThirdMenuItem && this.tertiaryMenus[this.activeThirdMenuItem]) {
        return {
          marginLeft: '340px', // 一级菜单(80px) + 二级菜单(130px) + 三级菜单(130px)
          transform: 'none' // 覆盖默认的居中transform
        };
      } else if (this.activeMenuItem && this.showSecondaryMenu) {
        // 如果只有二级菜单显示，则稍微向右移动
        return {
          marginLeft: '210px', // 一级菜单(80px) + 二级菜单(130px)
          transform: 'none' // 覆盖默认的居中transform
        };
      } else {
        // 默认位置
        return {
          marginLeft: '80px', // 只有一级菜单(80px)
          transform: 'none' // 覆盖默认的居中transform
        };
      }
    },
    maskStyle() {
      const percent = this.maskProgress * 100;
      return {
        maskImage: `linear-gradient(to bottom, transparent ${50 - percent / 2}%, black ${50 - percent / 2}%, black ${50 + percent / 2}%, transparent ${50 + percent / 2}%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent ${50 - percent / 2}%, black ${50 - percent / 2}%, black ${50 + percent / 2}%, transparent ${50 + percent / 2}%)`,
        transition: 'mask-image 0.1s ease-out, -webkit-mask-image 0.1s ease-out',
      };
    },
    // 格式化时间显示
    formatTime() {
      const hours = Math.floor(this.elapsedTime / 3600);
      const minutes = Math.floor((this.elapsedTime % 3600) / 60);
      const seconds = this.elapsedTime % 60;

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleContainerClick);
    // 初始化echarts图表
    this.initCharts();

    // 设置定时器，每秒更新一次计时器
    this.startTimer();
    
    // 初始化3D地球
    this.initEarth();

    // 随机变化天气
    // this.randomizeWeather();

    // 设置容器尺寸
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;

    // 添加窗口大小变化监听器
    window.addEventListener('resize', this.onWindowResize);

    // 触发门动画
    // setTimeout(() => {
    //   this.doorsOpening = true;

    //   // 门完全打开后初始化3D场景
    //   setTimeout(() => {
    //     this.showDoors = false;
    //     this.initThree();
    //   }, 1000); // 2秒后门完全打开
    // }, 500); // 延迟500ms开始动画




    // Call the API to get mission groups
    this.getLastList();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleContainerClick);
    // 清除定时器
    if (this.explosionInterval) {
      clearInterval(this.explosionInterval);
    }

    // 停止动画循环
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // 移除窗口大小变化监听器
    window.removeEventListener('resize', this.onWindowResize);

    // 移除键盘事件监听器
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);

    // 移除容器点击事件监听器
    document.removeEventListener('click', this.handleContainerClick);


    // 清除计时器
    clearInterval(this.timerInterval);
  },
  methods: {
    // 初始化3D地球
    initEarth() {
      const container = this.$refs.threeContainer;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;

      // 创建场景
      const scene = new THREE.Scene();
      this.scene = scene;
      
      // 创建星空背景，这比纯黑色背景更美观
      this.createStarfield(scene);

      // 创建相机 - 调整FOV和位置使全部地球可见
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 2.9; // 增加相机距离，使整个地球可见
      this.camera = camera;

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
      this.renderer = renderer;

      // 控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // 光源
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      // 贴图加载
      const textureLoader = new THREE.TextureLoader();
      
      // 地球材质
      const earthMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load(require('@/assets/earth.jpg')),
      });

      // 地球模型 - 调整地球半径为适当大小
      const earthGeometry = new THREE.SphereGeometry(1.2, 64, 64);
      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      scene.add(earthMesh);
      this.earthMesh = earthMesh;

      // 云层 - 同比例调整半径
      const cloudGeometry = new THREE.SphereGeometry(1.212, 64, 64);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load(require('@/assets/clouds.png')),
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
      });
      const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
      scene.add(cloudMesh);
      this.cloudMesh = cloudMesh;

      // 水平网格动态Shader
      const gridVertexShader = `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normal;

          // 增强Y轴（纬线方向）的扰动效果
          vec3 newPosition = position;
          // 增加波浪振幅和频率
          newPosition.y += sin(uTime + position.y * 15.0) * 0.025;
          // 添加X轴扰动，形成交叉波纹效果
          newPosition.x += cos(uTime * 0.8 + position.x * 12.0) * 0.015;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `;

      const gridFragmentShader = `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          // 增加线宽使网格更明显
          float lineWidth = 0.015;
          float alpha = smoothstep(lineWidth, lineWidth + 0.008, abs(vUv.y - 0.5));

          // 增强科技感的脉冲效果
          float primaryPulse = sin(uTime * 0.8) * 0.6 + 0.4; // 主脉冲，增加振幅
          float secondaryPulse = sin(uTime * 1.5 + vUv.y * 40.0) * 0.4 + 0.6; // 二级脉冲，增加频率
          float wavePulse = sin(uTime * 2.0 + vUv.x * 50.0) * 0.3 + 0.7; // 添加水平方向的波动
          float combinedFlow = primaryPulse * secondaryPulse * wavePulse;
          
          // 更鲜明的颜色对比
          vec3 baseColor = vec3(0.1, 0.5, 1.0); // 深蓝基础色
          vec3 pulseColor = vec3(0.3, 0.9, 1.0); // 更亮的高亮颜色
          vec3 finalColor = mix(baseColor, pulseColor, primaryPulse * 0.8);
          
          // 增加整体亮度
          gl_FragColor = vec4(finalColor, alpha * combinedFlow * 1.3);
        }
      `;

      const gridUniforms = {
        uTime: { value: 0 },
      };

      const gridMaterial = new THREE.ShaderMaterial({
        uniforms: gridUniforms,
        vertexShader: gridVertexShader,
        fragmentShader: gridFragmentShader,
        transparent: true,
        wireframe: true,
        wireframeLinewidth: 2, // 增加线宽
      });

      // 网格线模型（仅水平线） - 同比例调整半径
      const gridGeometry = new THREE.SphereGeometry(1.224, 64, 64);
      const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
      scene.add(gridMesh);
      this.gridMesh = gridMesh;

      // 动画循环
      const animate = () => {
        this.animationId = requestAnimationFrame(animate);
        const elapsedTime = performance.now() / 1000;
        gridUniforms.uTime.value = elapsedTime;

        earthMesh.rotation.y += 0.001;
        cloudMesh.rotation.y += 0.0005;
        gridMesh.rotation.y += 0.001;
        
        // 让星空背景缓慢旋转，增强沉浸感
        if (this.stars) {
          this.stars.rotation.y -= 0.0001; // 比地球旋转更缓慢，并且方向相反
        }

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // 窗口大小变化时调整
      window.addEventListener('resize', this.onWindowResize);
    },

    // 创建星空背景
    createStarfield(scene) {
      // 创建星星粒子
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });
      
      // 生成大量星星的位置
      const starsCount = 10000;
      const positions = new Float32Array(starsCount * 3);
      
      for (let i = 0; i < starsCount; i++) {
        // 生成处于随机位置的星星，将其分布在一个大球体内
        const radius = 50 + Math.random() * 100; // 激光混合分布，为星空盯深度
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        // 将球坐标转换为笼坐标
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
      }
      
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      // 创建星系
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);
      this.stars = stars; // 存储引用以便后续操作
    },
    
    // 处理窗口大小变化
    onWindowResize() {
      const container = this.$refs.threeContainer;
      if (!container || !this.camera || !this.renderer) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },

    // 切换菜单折叠状态

    handlePrimaryClick(key) {
      if (this.activeMenuItem === key) {
        // 如果点击的是当前激活的菜单项，则关闭它
        this.activeMenuItem = null;
        this.activeSubmenuItem = null;
        this.showSecondaryMenu = false;
      } else {
        // 否则激活点击的菜单项
        this.activeMenuItem = key;
        this.activeSubmenuItem = null;

        // 如果点击的是应用场景构建管理，直接显示任务配置弹窗，不显示二级菜单
        if (key === 'applicationScenario' || key === 'search') {
          this.showSecondaryMenu = false; // 不显示二级菜单
          if (key === 'applicationScenario') {
            this.taskDialogVisible = true; // 弹出任务配置弹窗
          } else if (key === 'search') {
            this.searchDialogVisible = true; // 弹出智能知识库搜索弹窗
          }
        } else {
          this.showSecondaryMenu = true; // 其他菜单正常展开二级菜单
        }
      }
    },

    handleSubmenuClick(key) {
      console.log("子菜单栏：", key);
      this.activeSubmenuItem = key;

      // 检查是否有对应的三级菜单
      if (this.tertiaryMenus[key] && this.tertiaryMenus[key].length > 0) {
        // 有三级菜单，设置显示三级菜单
        this.activeThirdMenuItem = key;

      } else {
        // 没有三级菜单，直接打开对应的弹窗
        this.activeThirdMenuItem = null
        this.closeAllDialogs();
        switch (key) {
          case 'grade':
            this.gradeManagementDialogVisible = true;
            break;
          case 'teaching':
            this.teachingContentDialogVisible = true;
            break;
          case 'regular':
            this.rulesSystemDialogVisible = true;
            break;
          case 'log':
            this.logManagementDialogVisible = true;
            break;
          case 'subject':
            this.subjectSettingsDialogVisible = true;
            break;
          case 'scene':
            this.sceneOperationDialogVisible = true;
            break;
          case 'task':
            this.taskGroupingDialogVisible = true;
            break;
          case 'action':
            this.motionCaptureDialogVisible = true;
            break;
          case 'guidance':
            this.guidanceDialogVisible = true;
            break;
          case 'cognition':
            this.intelligentGuidanceDialogVisible = true;
            break;
          case 'data':
            this.trainingDataDialogVisible = true;
            break;
          case 'algorithm':
            this.algorithmManagementDialogVisible = true;
            break;
          case 'config':
            this.assessmentConfigDialogVisible = true;
            break;
          case 'result':
            this.assessmentResultDialogVisible = true;
            break;
          case 'replay':
            this.assessmentReplayDialogVisible = true;
            break;
          case 'analysis':
            this.intelligentAnalysisDialogVisible = true;
            break;
          case 'index':
            this.assessmentIndexDialogVisible = true;
            break;
          case 'examination':
            this.assessmentAlgorithmDialogVisible = true;
            break;
        }
      }
    },

    // 处理三级菜单点击事件
    handleTertiaryClick(key) {
      console.log("三级菜单栏：", key);
      this.activeThirdMenuSelection = key;
      this.closeAllDialogs();
      switch (key) {
        case 'personal':
          this.showUserInfoDialog();
          break;
        case 'organization':
          this.organizationDialogVisible = true;
          break;
        case 'equipment':
          this.showEquipmentDialog();
          break;
        case 'deviceCategory':
          this.showDeviceCategoryDialog();
          break;
        case 'taskSettings':
          this.showTaskSettingsDialog();
          break;
        case 'taskAssignment':
          this.showTaskAssignmentDialog();
          break;
        case 'roles':
          this.roleManagementDialogVisible = true;
          break;
        case 'permissions':
          this.permissionsDialogVisible = true;
          break;
        case 'fuel':
          this.fuelDialogVisible = true;
          break;
        case 'supply':
          this.supplyDialogVisible = true;
          break;
        case 'san':
          this.sanitationDialogVisible = true;
          break;
        case 'repair':
          this.equipmentRepairDialogVisible = true;
          break;
        case 'course':
          this.courseManagementDialogVisible = true;
          break;
        case 'subject':
          this.subjectSettingsDialogVisible = true;
          break;
      }
    },

    // 处理子菜单项点击事件
    handleSubmenuItemClick(item) {
      console.log("子菜单栏：", item);
      this.activeSubmenuItem = item;

      // 检查是否有对应的三级菜单
      if (this.tertiaryMenus[item] && this.tertiaryMenus[item].length > 0) {
        console.log('有三级菜单：', item)
        // 有三级菜单，设置显示三级菜单
        this.activeThirdMenuItem = item;

      } else {
        // 没有三级菜单，直接打开对应的弹窗
        // 清除之前的三级菜单选择状态
        this.activeThirdMenuItem = null;

        switch (item) {
          case 'grade':
            this.gradeManagementDialogVisible = true;
            break;
          case 'teaching':
            this.teachingContentDialogVisible = true;
            break;
          case 'regular':
            this.rulesSystemDialogVisible = true;
            break;
          case 'log':
            this.logManagementDialogVisible = true;
            break;
          case 'subject':
            this.subjectSettingsDialogVisible = true;
            break;
          case 'scene':
            this.sceneOperationDialogVisible = true;
            break;
          case 'task':
            this.taskGroupingDialogVisible = true;
            break;
          case 'action':
            this.motionCaptureDialogVisible = true;
            break;
          case 'guidance':
            this.guidanceDialogVisible = true;
            break;
          case 'cognition':
            this.intelligentGuidanceDialogVisible = true;
            break;
          case 'data':
            this.trainingDataDialogVisible = true;
            break;
          case 'algorithm':
            this.algorithmManagementDialogVisible = true;
            break;
          case 'config':
            this.assessmentConfigDialogVisible = true;
            break;
          case 'result':
            this.assessmentResultDialogVisible = true;
            break;
          case 'replay':
            this.assessmentReplayDialogVisible = true;
            break;
          case 'analysis':
            this.intelligentAnalysisDialogVisible = true;
            break;
          case 'index':
            this.assessmentIndexDialogVisible = true;
            break;
          case 'examination':
            this.assessmentAlgorithmDialogVisible = true;
            break;
        }
      }
    },

    closeAllDialogs() {
  this.userInfoDialogVisible = false;
  this.organizationDialogVisible = false;
  this.roleManagementDialogVisible = false;
  this.permissionsDialogVisible = false;
  this.fuelDialogVisible = false;
  this.supplyDialogVisible = false;
  this.sanitationDialogVisible = false;
  this.equipmentRepairDialogVisible = false;
  this.courseManagementDialogVisible = false;
  this.gradeManagementDialogVisible = false;
  this.teachingContentDialogVisible = false;
  this.rulesSystemDialogVisible = false;
  this.logManagementDialogVisible = false;
  this.subjectSettingsDialogVisible = false;
  this.sceneOperationDialogVisible = false;
  this.taskGroupingDialogVisible = false;
  this.motionCaptureDialogVisible = false;
  this.guidanceDialogVisible = false;
  this.intelligentGuidanceDialogVisible = false;
  this.trainingDataDialogVisible = false;
  this.algorithmManagementDialogVisible = false;
  this.assessmentConfigDialogVisible = false;
  this.assessmentResultDialogVisible = false;
  this.assessmentReplayDialogVisible = false;
  this.intelligentAnalysisDialogVisible = false;
  this.assessmentIndexDialogVisible = false;
  this.assessmentAlgorithmDialogVisible = false;
  this.deviceCategoryDialogVisible=false;
  this.equipmentDialogVisible=false
},

    // 页面导航
    navigateTo(route) {
      this.$router.push(route);
    },

    handleContainerClick(event) {
      // 检查点击是否在菜单区域外
      const floatingMenu = document.querySelector('.floating-menu');
      const dialogs = document.querySelectorAll('.el-dialog');

      // 检查点击是否在任何弹窗内
      let isClickInDialog = false;
      dialogs.forEach(dialog => {
        if (dialog.contains(event.target)) {
          isClickInDialog = true;
        }
      });

      // 如果点击在菜单区域外且不在任何弹窗内，则收起菜单
      if (floatingMenu && !floatingMenu.contains(event.target) && !isClickInDialog) {
        // 收起所有菜单
        this.activeMenuItem = null;
        this.activeSubmenuItem = null;
        this.activeThirdMenuItem = null;
        this.activeThirdMenuSelection = null;
        this.showSecondaryMenu = false;
      }
    },
    showUserInfoDialog() {
      this.userInfoDialogVisible = true;
    },


    // echarts图表初始化方法
    initCharts() {
      // this.initChart1();
      // this.initChart2();
      // this.initChart3();
      // this.initChart4();
    },

    // 初始化第一个图表 - 空气质量指数时间序列图
    initChart1() {
      if (!this.$refs.chart1) return;

      const chart = echarts.init(this.$refs.chart1);

      const option = {
        title: {
          text: '坦克数量对比',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          left: 'center',
          top: '5%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '25%',
          left: '10%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,

          axisLabel: {
            color: '#fff',
            formatter: function (value) {
              const date = new Date(value);
              return `${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 400,
          splitNumber: 4,
          axisLabel: {
            color: '#fff',
          }
        },
        visualMap: {
          show: false,
          top: 60,
          right: 10,
          pieces: [
            { gt: 300, color: '#D3EBEB', label: '> 300' },
            { gt: 200, lte: 300, color: '#D3EBEB', label: '200 - 300' },
            { gt: 150, lte: 200, color: '#D3EBEB', label: '150 - 200' },
            { gt: 100, lte: 150, color: '#D3EBEB', label: '100 - 150' },
            { gt: 50, lte: 100, color: '#D3EBEB', label: '50 - 100' },
            { lte: 50, color: '#D3EBEB', label: '0 - 50' }
          ],
          outOfRange: { color: '#999' }
        },
        series: [{
          name: '坦克数量对比',
          type: 'line',
          showSymbol: false,
          data: [
            // 示例数据格式 [时间戳, AQI]
            ['2014/06/20', 80],
            ['2014/07/05', 220],
            ['2014-08-01', 140],
            ['2014-09-10', 620],
            ['2014-09-13', 420],
            ['2014-09-15', 820],
          ],
          lineStyle: {
            width: 2
          }
        }]
      };


      chart.setOption(option);

      // 自适应窗口大小变化
      window.addEventListener('resize', () => {
        chart.resize();
      });
    },

    // 初始化第二个柱状图 - 红蓝方步兵对比
    initChart2() {
      if (!this.$refs.chart2) return;

      const chart = echarts.init(this.$refs.chart2);

      const option = {
        title: {
          text: '步兵数量对比',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          left: 'center',
          top: '5%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '25%',
          left: '10%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['红方', '蓝方'],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#ddd',
            fontSize: 10
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#ddd',
            fontSize: 10
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          }
        },
        series: [
          {
            name: '步兵数量',
            type: 'bar',
            data: [
              { value: 30, itemStyle: { color: '#D3EBEB' } },
              { value: 25, itemStyle: { color: '#D3EBEB' } }
            ],
            barWidth: '40%',
            label: {
              show: true,
              position: 'top',
              color: '#fff'
            }
          }
        ]
      };

      chart.setOption(option);

      // 自适应窗口大小变化
      window.addEventListener('resize', () => {
        chart.resize();
      });
    },

    // 初始化第三个柱状图 - 作战效能评估
    initChart3() {
      if (!this.$refs.chart3) return;

      const chart = echarts.init(this.$refs.chart3);

      const option = {
        title: {
          text: '作战效能评估',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          left: 'center',
          top: '5%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '25%',
          left: '10%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['火力', '机动', '防护'],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#ddd',
            fontSize: 10
          }
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#ddd',
            fontSize: 10
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          }
        },
        series: [
          {
            name: '效能值',
            type: 'bar',
            data: [
              { value: 85, itemStyle: { color: '#D3EBEB' } },
              { value: 76, itemStyle: { color: '#D3EBEB' } },
              { value: 92, itemStyle: { color: '#D3EBEB' } }
            ],
            barWidth: '40%',
            label: {
              show: true,
              position: 'top',
              color: '#fff'
            }
          }
        ]
      };

      chart.setOption(option);

      // 自适应窗口大小变化
      window.addEventListener('resize', () => {
        chart.resize();
      });
    },

    // 初始化第四个柱状图 - 战损比例
    initChart4() {
      if (!this.$refs.chart4) return;

      const chart = echarts.init(this.$refs.chart4);

      const option = {
        title: {
          text: '战损比例',
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          left: 'center',
          top: '5%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '25%',
          left: '10%',
          right: '10%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ['红方', '蓝方'],
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#ddd',
            fontSize: 10
          }
        },
        yAxis: {
          type: 'value',
          max: 100,
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisLabel: {
            color: '#ddd',
            fontSize: 10,
            formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          }
        },
        series: [
          {
            name: '战损比例',
            type: 'bar',
            data: [
              { value: 32, itemStyle: { color: '#D3EBEB' } },
              { value: 65, itemStyle: { color: '#D3EBEB' } }
            ],
            barWidth: '40%',
            label: {
              show: true,
              position: 'top',
              color: '#fff',
              formatter: '{c}%'
            }
          }
        ]
      };

      chart.setOption(option);

      // 自适应窗口大小变化
      window.addEventListener('resize', () => {
        chart.resize();
      });
    },
    // 启动计时器
    startTimer() {
      this.timerInterval = setInterval(() => {
        this.elapsedTime++;
      }, 1000);
    },

    // 暂停计时器
    pauseTimer() {
      clearInterval(this.timerInterval);
    },

    // 重置计时器
    resetTimer() {
      this.elapsedTime = 0;
    },


    handleVideoEnded() {
      console.log('视频播放结束');
      this.$refs.frameVideo.play();
    },
    videoLoaded() {
      console.log('视频加载完成');
      // 设置视频的播放速度为正常速度
      this.$refs.frameVideo.playbackRate = 1.0;

      // 设置视频的缓冲模式
      if (this.$refs.frameVideo) {
        // 尝试预加载整个视频
        try {
          this.$refs.frameVideo.load();
        } catch (error) {
          console.error('视频预加载失败:', error);
        }
      }
    },
    handleSearch(){
    console.log('搜索内容')
    },
    closeSearchDialog(){
      this.searchDialogVisible = false
    },
    closeUserInfoDialog() {
      this.userInfoDialogVisible = false
    },
    showTaskSettingsDialog() {
      this.taskSettingsDialogVisible = true;
    },
    closeTaskSettingsDialog() {
      this.taskSettingsDialogVisible = false;
    },
    closeTaskDialog() {
      this.taskDialogVisible = false;
      this.taskDetailDialogVisible = false
    },
    showTaskAssignmentDialog() {
      this.taskSettingsDialogVisible = false;
      this.taskAssignmentDialogVisible = true;
    },
    closeTaskAssignmentDialog() {
      this.taskAssignmentDialogVisible = false;
    },
    showEquipmentDialog() {
      this.equipmentDialogVisible = true;
    },
    closeEquipmentDialog() {
      this.equipmentDialogVisible = false
    },
    closeRoleManagementDialog() {
      this.roleManagementDialogVisible = false;
    },
    showDeviceCategoryDialog() {
      this.deviceCategoryDialogVisible = true
    },
    closeDeviceCategoryDialog() {
      this.deviceCategoryDialogVisible = false;
    },
    closeOrganizationDialog() {
      this.organizationDialogVisible = false;
    },
    closeCourseManagementDialog() {
      this.courseManagementDialogVisible = false;
    },
    closeGradeManagementDialog() {
      this.gradeManagementDialogVisible = false;
    },
    closeTeachingContentDialog() {
      this.teachingContentDialogVisible = false;
    },
    closeRulesSystemDialog() {
      this.rulesSystemDialogVisible = false;
    },
    closeLogManagementDialog() {
      this.logManagementDialogVisible = false;
    },
    closeSubjectSettingsDialog() {
      this.subjectSettingsDialogVisible = false;
    },
    closeSceneOperationDialog() {
      this.sceneOperationDialogVisible = false;
    },
    closeTaskGroupingDialog() {
      this.taskGroupingDialogVisible = false;
    },
    closeMotionCaptureDialog() {
      this.motionCaptureDialogVisible = false;
    },
    closeGuidanceDialog() {
      this.guidanceSystemDialogVisible = false;
    },
    closeIntelligentGuidanceDialog() {
      this.intelligentGuidanceDialogVisible = false;
    },
    closeTrainingDataDialog() {
      this.trainingDataDialogVisible = false;
    },
    closeAlgorithmManagementDialog() {
      this.algorithmManagementDialogVisible = false;
    },
    closeAssessmentConfigDialog() {
      this.assessmentConfigDialogVisible = false;
    },
    closeAssessmentResultDialog() {
      this.assessmentResultDialogVisible = false;
    },
    closeAssessmentReplayDialog() {
      this.assessmentReplayDialogVisible = false;
    },
    closeIntelligentAnalysisDialog() {
      this.intelligentAnalysisDialogVisible = false;
    },
    closeAssessmentIndexDialog() {
      this.assessmentIndexDialogVisible = false;
    },
    closeAssessmentAlgorithmDialog() {
      this.assessmentAlgorithmDialogVisible = false;
    },
    closePermissionsDialog() {
      this.permissionsDialogVisible = false;
    },
    // 关闭对话框而不收起左侧菜单
    closeDialogWithoutCollapseMenu(event, dialogVisibleProp, closeMethod) {
      // 阻止事件冒泡到容器
      event.stopPropagation();
      
      if (dialogVisibleProp) {
        // 如果提供了对话框可见性属性名，直接设置为false
        this[dialogVisibleProp] = false;
      } else if (closeMethod && typeof closeMethod === 'function') {
        // 如果提供了关闭方法，调用该方法
        closeMethod.call(this);
      }
    },
    // 处理考核评估配置对话框打开事件
    handleAssessmentConfigOpen() {
      console.log('考核评估配置对话框已打开，刷新数据');
      // 如果引用存在，调用组件的fetchSettings方法刷新数据
      if (this.$refs.assessmentConfig) {
        this.$refs.assessmentConfig.fetchSettings();
      }
    },

    // 处理考核评估指标管理对话框打开事件
    handleAssessmentIndexOpen() {
      console.log('考核评估指标管理对话框已打开，刷新数据');
      // 如果引用存在，调用组件的fetchSettings方法刷新数据
      if (this.$refs.assessmentIndex) {
        this.$refs.assessmentIndex.fetchSettings();
      }
    },

    // 处理考核评估算法管理对话框打开事件
    handleAssessmentAlgorithmOpen() {
      console.log('考核评估算法管理对话框已打开，刷新数据');
      // 如果引用存在，调用组件的fetchSettings方法刷新数据
      if (this.$refs.assessmentAlgorithm) {
        this.$refs.assessmentAlgorithm.fetchSettings();
      }
    },
    showMixTaskDialog() {
      this.taskDialogVisible = true
    },
    //新增发布任务
    startTask() {
      // this.showTaskSettingsDialog();
      this.showMixTaskDialog();
    },
    taskDetail() {
      this.taskDetailDialogVisible = true
    },
    
    /**
     * 任务开始方法，调用更新任务进度API
     */
    startMission() {
      console.log('开始任务...')
      
      // 先调用getMissionLastList获取最新的任务ID
      getMissionLastList()
        .then(response => {
          console.log('获取最新任务成功:', response);
          
          if (response ) {
            // 从响应中提取MissionId
            const missionId = response.data.MissionLib.MissionId;
            console.log('获取到的任务ID:', missionId);
            
            if (missionId) {
              // 如果成功获取到ID，则调用更新任务进度API
              this.updateMissionProcess(missionId);
            } else {
              this.$message({
                type: 'warning',
                message: '未找到有效的任务ID'
              });
            }
          } else {
            this.$message({
              type: 'warning',
              message: '获取任务数据失败'
            });
          }
        })
        .catch(error => {
          console.error('获取最新任务失败:', error);
          this.$message({
            type: 'error',
            message: '获取任务数据失败，请重试'
          });
        });
    },
    
    /**
     * 更新任务进度
     * @param {String|Number} missionId 任务ID
     */
    updateMissionProcess(missionId) {
      // 调用更新任务进度API
      const params = {
        MissionId: missionId,  // 使用任务ID
        Status: 1              // 状态为1表示任务开始
      };
      
      console.log('调用更新任务进度API，参数:', params);
      
      getMissionProcess(params)
        .then(response => {
          console.log('任务开始成功:', response);
          // 显示成功提示
          this.$message({
            type: 'success',
            message: `任务 ${missionId} 已开始`
          });
        })
        .catch(error => {
          console.error('任务开始失败:', error);
          // 显示错误提示
          this.$message({
            type: 'error',
            message: `任务 ${missionId} 开始失败，请重试`
          });
        });
    },
    //获取任务列表
    getLastList() {

      // 检查 localStorage 中的 token
      const token = localStorage.getItem('token');
      console.log('当前 token:', token);

      getMissionLastList().then(response => {
        console.log('任务列表获取成功:', response);
        // 确保数据存在后再处理
        if (response) {
          const missionData = response.data.MissionLib;

          // 如果请求成功，则显示任务行动
          if (response.success === true && missionData) {
            this.hasMissionGroups = true;

            // 设置任务名称为后端返回的name字段
            this.missionName = missionData.Name || '未命名任务';

            // 更新任务项
            this.taskItems = [
              {
                name: this.missionName,
                teamCount: 1,
                personCount: 1
              }
            ];

            console.log('更新后的任务项:', this.taskItems);
          } else {
            console.log('任务数据不完整或请求不成功');
            this.hasMissionGroups = false;
          }
        } else {
          console.log('响应中没有有效数据');
          this.hasMissionGroups = false;
        }
      }).catch(error => {
        console.error('获取任务列表失败:', error);
        this.hasMissionGroups = false;
      });
    },
    startSimulation() {
      this.doorsOpening = true;

      const duration = 1500;
      const start = performance.now();

      const animate = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        this.maskProgress = progress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // 动画结束后隐藏门
          setTimeout(() => {
            this.showDoors = false;
          }, 500);
        }
      };

      // 初始化3D场景
      // this.initThree();

      // 开始动画
      requestAnimationFrame(animate);
    },

    // 获取最近的任务列表
    beforeLeaveHandler() {
      // 关闭动画开始时的钩子
      console.log("动画开始关闭");
    },

    leaveHandler() {
      // 关闭动画结束时的钩子
      console.log("动画关闭完成");
    },
    
    /**
     * 显示战场态势弹窗
     */
    showBattlefieldSituation() {
      // 先关闭所有其他对话框
      this.closeAllDialogs();
      
      // 显示战场态势弹窗
      this.showBattlefieldModal = true;
      
      // 使用setTimeout来确保DOM更新后再添加动画类
      setTimeout(() => {
        this.battlefieldContentActive = true;
      }, 10);
    },
    
    /**
     * 关闭战场态势弹窗
     */
    closeBattlefieldModal() {
      this.battlefieldContentActive = false;
      // 等待动画完成后再隐藏弹窗
      setTimeout(() => {
        this.showBattlefieldModal = false;
      }, 300); // 300ms与CSS动画时长匹配
    },
    
    /**
     * 显示油料作业弹窗
     */
    showFuelDialog() {
      // 关闭其他所有弹窗
      this.closeAllDialogs();
      
      // 显示油料作业弹窗
      this.fuelDialogVisible = true;
    },
    
    /**
     * 显示补给勤务弹窗
     */
    showSupplyDialog() {
      // 关闭其他所有弹窗
      this.closeAllDialogs();
      
      // 显示补给勤务弹窗
      this.supplyDialogVisible = true;
    },
    
    /**
     * 显示卫生勤务弹窗
     */
    showSanitationDialog() {
      // 关闭其他所有弹窗
      this.closeAllDialogs();
      
      // 显示卫生勤务弹窗
      this.sanitationDialogVisible = true;
    },
    
    /**
     * 显示装备抢修弹窗
     */
    showEquipmentRepairDialog() {
      // 关闭其他所有弹窗
      this.closeAllDialogs();
      
      // 显示装备抢修弹窗
      this.equipmentRepairDialogVisible = true;
    },
    
    /**
     * 退出登录
     */
    logout() {
      // 显示确认对话框
      this.$confirm('确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除本地存储的用户信息
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        
        // 跳转到登录页面
        this.$router.push('/login');
        
        // 显示成功提示
        this.$message({
          type: 'success',
          message: '退出登录成功'
        });
      }).catch(() => {
        // 取消操作
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
  },
}
</script>

<style scoped>
/* 退出登录按钮样式 */
.logout-container {
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 1001;
}

.logout-button {
  font-weight: bold;
  transition: all 0.3s;
}

.logout-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

/* 战场态势弹窗样式 */
.battlefield-modal-container {
  position: fixed;
  top: 26%;
  left: 24%;
  right: 0;
  bottom: 0;
  width: 60%;
  height: 60%;
  z-index: 9999; /* 最高层级 */
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto; /* 确保可以接收点击事件 */
}

/* 添加淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.battlefield-modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  pointer-events: auto; /* 遮罩层可以接收点击事件 */
}

.battlefield-content {
  position: relative;
  /* transform: scale(0.5); */
  width: 80%;
  height: 80%;
  max-width: 1200px;
  max-height: 800px;
  margin: 0 auto;
  background: url('../../assets/00_小框.png') no-repeat center;
  background-size: 100% 100%;
  border-radius: 8px;
  overflow: hidden;
  opacity: 0;
  transition: all 0.1s ease-out;
  z-index: 10000; /* 确保内容在遮罩之上 */
  pointer-events: auto; /* 内容可以接收点击事件 */
}

/* 玩家标记样式 */
.player-marker {
  cursor: pointer;
  transition: all 0.3s ease;
}

.player-marker:hover {
  transform: scale(1.2);
}

.player-marker:hover circle:first-child {
  filter: drop-shadow(0 0 5px currentColor);
}

.player-marker.friendly:hover circle:first-child {
  filter: drop-shadow(0 0 8px #00BFFF);
}

.player-marker.enemy:hover circle:first-child {
  filter: drop-shadow(0 0 8px #FF4500);
}

.player-marker text {
  transition: all 0.3s ease;
  opacity: 0.8;
}

.player-marker:hover text {
  opacity: 1;
  font-weight: bold;
}

.battlefield-content-active {
  transform: scale(1);
  opacity: 1;
}

.battlefield-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: url('../../assets/buttonback.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
  width: 90%;
}

.battlefield-header h3 {
  color: #C1FFFF;
  margin: 0;
  font-size: 18px;
  text-align: center;
  width: 100%;
}

.close-btn {
  background: none;
  border: none;
  color: #C1FFFF;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  right: 40px;
  top: 25px;
  z-index: 2002;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  transform: scale(1.2);
  color: white;
}

.battlefield-body {
  padding: 20px;
  height: calc(100% - 80px);
  background: url('../../assets/cardground.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
  width: 92%;
}

/* 点击提示文本 */
.click-hint {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  color: #C1FFFF;
  font-size: 12px;
  opacity: 0.8;
}

/* 添加悬停效果 */
.map-container {
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.map-container:hover {
  transform: scale(1.02);
  box-shadow: 0 0 15px rgba(193, 255, 255, 0.5);
}

.map-title {
  text-align: center;
  color: #C1FFFF;
  margin-bottom: 10px;
  font-size: 14px;
}

/* Three.js容器样式 */
.three-container {
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 60px);
  z-index: 1;
  overflow: hidden;
}

/* 知识库样式 */
.search-box {
  display: flex;
  margin: 20px auto;
  align-items: center;
  width: 50%;
  justify-content: center;
}

.search-btn {
  margin-left: 10px;
  background-color: #409EFF;
  color: white;
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
}

.knowledge-item {
  cursor: pointer;
  transition: transform 0.3s;
}

.knowledge-item:hover {
  transform: scale(1.05);
}

.image-container {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 4px;
}

.knowledge-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px;
  font-size: 12px;
  text-align: center;
}

.container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
}

@font-face {
  font-family: 'SourceHanSerifSC';
  src: url('../../assets/fonts/NotoSerifCJKSC-Black.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}

.search-box {
  width: 507px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-icon-img {
  /* width: 30px;
  height: 30px; */
}

.door-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: transparent;
  overflow: hidden;
  perspective: 1200px;
}

.door-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.door {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.door-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 1.2s ease;
}

.start-button {
  position: absolute;
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  position: absolute;
  left: 1px;
  top: 209px;
  color: #333 !important;
  /* Adding darker text color for better contrast */
}

.start-button:hover,
.start-button:focus,
.start-button:active {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}

.door::before,
.door::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 50%;
  left: 0;
  background-image: url('../../assets/loginaction.png');
  background-size: 100% 200%;
  background-repeat: no-repeat;
  transition: transform 1.5s cubic-bezier(0.77, 0, 0.175, 1), opacity 1.2s ease;
  z-index: 10;
  /* Increased z-index to be above the three-container */
  transform-style: preserve-3d;
}

.door::before {
  top: 0;
  background-position: top center;
  transform-origin: bottom center;
}

.door::after {
  bottom: 0;
  background-position: bottom center;
  transform-origin: top center;
}

.door.open::before {
  transform: translateY(-100%) rotateX(-45deg);
  opacity: 0;
}

.door.open::after {
  transform: translateY(100%) rotateX(45deg);
  opacity: 0;
}

.door.open .door-image {
  opacity: 0;
}

.battlefield-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #000;
}

.three-container {
  position: absolute;
  top: 57px;
  /* Allows space for top border */
  left: 11px;
  /* Space from left side */
  right: 8px;
  /* More space from right side to avoid menu overlap */
  bottom: 20px;
  /* Increased bottom space to ensure border visibility in fullscreen */
  border: 2px solid rgba(255, 255, 255, 1);
  /* Solid bright white for visibility */
  box-sizing: border-box;
  z-index: 8;
  /* Adjusted to be below borders but visible */
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.7);
  /* Stronger glow effect */
  overflow: hidden;
  /* Prevent canvas overflow */
  max-height: calc(100vh - 100px);
  /* Prevent stretching too far in fullscreen */
  /* background-image: url('../../assets/taskPic/2.png'); */
  background-image: url('../../assets/background.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}






.menu-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2001 !important;
}


.help-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
}

.help-panel {
  position: absolute;
  top: 70px;
  right: 20px;
  width: 300px;
  background-color: rgba(0, 20, 40, 0.8);
  color: white;
  border-radius: 5px;
  padding: 15px;
  z-index: 1000;
  border: 1px solid #00a8ff;
  box-shadow: 0 0 15px rgba(0, 168, 255, 0.3);
}

.help-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.help-panel-content {
  font-size: 14px;
  line-height: 1.5;
}

.help-panel-content ul {
  padding-left: 20px;
  margin-top: 5px;
}

.help-panel-content li {
  margin-bottom: 5px;
}

/* 子菜单样式 */
.submenu {
  background-color: rgba(30, 40, 50, 0.9);
  margin-left: 20px;
  border-left: 1px solid rgba(58, 68, 82, 0.8);
}

.submenu-item {
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #ccc;
  font-size: 13px;
  border-bottom: 1px solid rgba(58, 68, 82, 0.5);
}

.submenu-item:hover {
  background-color: rgba(58, 68, 82, 0.8);
  color: #fff;
}

/* 标签样式 */
.label-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.model-label {
  position: absolute;
  background-color: rgba(0, 20, 40, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  border: 1px solid #00a8ff;
  transform: translate(-50%, -100%);
  margin-top: -10px;
}

.card-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  width: 80%;
  max-width: 1200px;
}

.card-content {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

.top-border {
  width: 100%;
  height: 60px;
  background: url('../../assets/top.png') no-repeat center;
  background-size: 100% 60px;
  background-color: #3a4452;
}

.header-image {
  max-width: 100vw;
  /* 宽度自适应 */
  height: auto;
  /* 高度按比例缩放 */
}

.between-side {
  position: absolute;
  height: 100%;
  width: 1px;
  z-index: 10;
  background-color: #3a4452;
}

.side-inner {
  height: 100%;
  width: 8px;
  background: url('../../assets/bian.png') no-repeat center;
  background-color: #3a4452;
}

/* .left-side {
  left: 6px;
} */
.right-side {
  right: 6px;
}

.full-container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #3a4452;
  overflow: hidden;
}

.bottom-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 11;
  /* Increased z-index to be above the three-container */
  background-color: #3a4452;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bottom-border img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

/* 底部卡片区域 */
.bottom-cards {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 15px;
  z-index: 50;
  width: auto;
  max-width: 90%;
}

.card-item {
  width: 160px;
  height: 120px;
  background: url(../../assets/cardground.png) no-repeat center;
  background-size: 100% 100%;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.card-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.card-item i {
  font-size: 24px;
}

.card-header {
  font-size: 13px;
  color: white;
  margin-bottom: 10px;
  font-weight: 300;
  text-align: center;
  margin-top: 6px;
  font-family: 'SourceHanSerifSC', serif;

}

.timer-display {
  font-size: 24px;
  color: #D3EBEB;
  font-family: 'digital', monospace;
  text-shadow: 0 0 5px rgba(211, 235, 235, 0.7);
  letter-spacing: 2px;
  margin-left: 28px;
}

.card-content-wrapper {
  padding: 5px 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-data {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.data-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
}

.data-label {
  color: rgba(193, 255, 255, 0.7);
  font-size: 11px;
}

.data-value {
  color: #C1FFFF;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(193, 255, 255, 0.5);
}

.data-value.highlight {
  color: #FFD700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}

.data-value.timer {
  font-family: 'digital', monospace;
  letter-spacing: 1px;
}

.status-active {
  color: #00FF7F;
  text-shadow: 0 0 5px rgba(0, 255, 127, 0.5);
}

.progress-bar {
  height: 4px;
  width: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin: 0 5px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00A8FF, #00FFD1);
  border-radius: 2px;
}

.weather-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.weather-icon {
  font-size: 28px;
  color: #D3EBEB;
  margin-bottom: 5px;
}

.weather-text {
  font-size: 16px;
  color: #D3EBEB;
  margin-bottom: 5px;
}

.temperature {
  font-size: 18px;
  color: #D3EBEB;
}

.middle-top {
  position: absolute;
  right: 297px;
  width: 280px;
  background: url('../../assets/hybird.png') no-repeat center;
  background-size: 100% 100%;
  height: 650px;
  z-index: 10;
}

.frame-box {
  width: 100%;
  height: 200px;
  background: url('../../assets/00_小框.png') no-repeat center;
  background-size: 100% 100%;
}

.frame-top {
  width: 90%;
  height: 26px;
  background: url('../../assets/buttonback.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.frame-content {
  width: 92%;
  height: 140px;
  background: url('../../assets/cardground.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
  display: flex;
  /* justify-content: center;
  align-items: center; */
}

.middle-content {
  width: 95%;
  height: 180px;
  background: url('../../assets/mapBorder.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
}

.center-logo {
  position: absolute;
  width: 26px;
  border-radius: 50px;
  left: 40%;
  top: 10px;
}

.system-title {
  position: absolute;
  left: 42%;
  top: 10px;
  color: #fff;
  font-family: 'SourceHanSerifSC', serif;
}

.task-title {
  font-family: 'SourceHanSerifSC', serif;
}

.map-container {
  position: relative;
  padding: 20px;
  overflow: hidden;
}

.map-title {
  position: absolute;
  top: 5px;
  left: 10px;
  color: #C1FFFF;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(193, 255, 255, 0.5);
  z-index: 1;
}

.earth-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.earth-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

<style>
/* Login form styles */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-label {
  color: #fff;
  font-size: 14px;
}

.login-input {
  width: 100%;
}

.login-button {
  width: 100% !important;
  margin-top: 10px !important;
  position: relative !important;
  transform: none !important;
  left: auto !important;
  top: auto !important;
}

.submenu.nested-submenu {
  padding-left: 20px;
  background-color: rgba(30, 40, 50, 0.8);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  cursor: pointer;
  position: relative;
  transition: background 0.3s;
  border-radius: 0;
  margin: 0;
  border-bottom: 1px solid rgba(58, 68, 82, 0.5);
}

.menu-item i,
.menu-item .menu-icon {
  margin-right: 0;
  /* 初始不显示文字 */
  width: 24px;
  text-align: center;
}

.menu-text {
  margin-left: 8px;
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
  transition: opacity 0.3s ease;
}



.menu-wrapper {
  display: none;
  width: 0;
  /* height: 32vh; */
}

/* 左侧一级菜单 */
.menu-primary {
  width: 80px;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.menu-item {
  width: 100%;
  height: 60px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.menu-icon {
  font-size: 20px;
}

/* 鼠标悬浮显示文字 */
.menu-text {
  font-size: 12px;
  color: #fff;
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.5);
  padding: 3px 8px;
  border-radius: 4px;
}

/* 右侧二级菜单 */
.menu-secondary {
  background-color: #34495e;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 130px;
}

.menu-tertiary {
  background-color: #34495e;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  width: 130px;
  z-index: 10;
}

.menu-secondary,
.menu-tertiary {
  background-color: #34495e;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}





/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.01s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.01s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}


/* User Info Dialog Styles */
.user-info-dialog {
  margin-right: 150px;
  /* 添加左边距，确保不会遮挡菜单栏 */
  height: 720px;
  width: 1280px;
  background-color: #383D44;
  border: 2px solid #c1ffff;
  border-radius: 4px !important;
  /* Move dialog to the left by adding margin on the right */
  /* margin-top: 5vh; */
}

.user-info-dialog .el-dialog__header {
  background-color: #61646A;
  padding: 15px 20px;
  height: 45px;
}

.user-info-dialog .el-dialog__title {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.user-info-dialog .el-dialog__body {
  padding: 0;
  max-height: 70vh;
  overflow-y: auto;
}

.user-info-dialog .el-dialog__headerbtn .el-dialog__close {
  color: white;
}

.user-info-dialog .el-dialog__headerbtn .el-dialog__close:hover {
  color: #c1ffff;
}

.custom-dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-close-btn {
  background-color: red;
  color: white;
  padding: 5px 15px;
  font-size: 14px;
  margin-right: 10px;
}

.header-close-btn:hover {
  background-color: rgba(236, 22, 22, 0.753);
  color: white;
}

.middle-content {
  width: 95%;
  height: 180px;
  background: url('../../assets/mapBorder.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
}

.left-top {
  position: absolute;
  width: 280px;
  left: 16px;
  top: 62px;
  z-index: 10;
}

.add-button {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  position: absolute;
  left: 168px;
  top: 209px;
  color: #333 !important;
}

.add-button:hover,
.add-button:focus,
.add-button:active {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}

.detail-button {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  position: absolute;
  left: 168px;
  top: 209px;
  color: #333 !important;
  /* Adding darker text color for better contrast */
}

.detail-button:hover,
.detail-button:focus,
.detail-button:active {
  background-color: #C1FFFF !important;
  border-color: #C1FFFF !important;
  color: #333 !important;
}

/* 激活的子菜单项样式 */
.active-submenu {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05)) !important;
  color: white !important;
  font-weight: bold;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

/* 自定义过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: all 10s ease !important;
}

.fade-enter,
.fade-leave-to {
  transform: scale(0.9) !important;
  /* 缩小 */
  opacity: 0 !important;
  /* 淡出 */
}

/* 让 dialog 背景以外的区域不阻塞事件 */
.el-dialog__wrapper {
  pointer-events: none !important;
  /* 默认不响应事件 */
  z-index: 1000 !important;
}

.el-dialog {
  pointer-events: auto !important;
  /* 仅 dialog 内容可点 */
}

/* 外层容器样式 */
.fade-wrapper {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 2000 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>

<style>
/* 菜单容器 */
.menu-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2001 !important;
}

/* 左侧悬浮菜单栏样式 */
.floating-menu {
  position: absolute;
  left: 0;
  display: flex;
  flex-direction: column;
  width: fit-content;
  z-index: 12;
  flex-direction: row;
  /* position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 12; */
  /* background-color: rgba(44, 52, 60, 0.9);
  border: 1px solid #3a4452;
  border-radius: 0 8px 8px 0;
  color: white;
  z-index: 12;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  overflow: hidden; */
}


.menu-content-wrapper {
  opacity: 1;
  visibility: visible;
  width: 100%;
}

.menu-header {
  padding: 10px 15px;
  background-color: rgba(44, 52, 60, 1);
  border-bottom: 1px solid #3a4452;
  text-align: center;
  position: relative;
}

.menu-header h3 {
  margin: 0;
  font-size: 16px;
  color: #fff;
  font-weight: normal;
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  cursor: pointer;
  color: #fff;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
}

.menu-content {
  padding: 10px 0;
}

.menu-item {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s;
  border-radius: 0;
  margin: 0;
  border-bottom: 1px solid rgba(58, 68, 82, 0.5);
}

.menu-item:hover,
.menu-item.active {
  background-color: rgba(58, 68, 82, 0.8);
}

.menu-item.active {
  position: relative;
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: #00a8ff;
}

.menu-item i,
.menu-item .menu-icon {
  margin-right: 0;
  /* 初始不显示文字 */
  width: 24px;
  text-align: center;
}

.menu-item span {
  color: #fff;
  font-size: 14px;
}

.right-top {
  position: absolute;
  right: 11px;
  width: 280px;
  height: auto;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.frame-box {
  width: 100%;
  height: 200px;
  background: url('../../assets/00_小框.png') no-repeat center;
  background-size: 100% 100%;
}

.middle-top {
  position: absolute;
  right: 297px;
  width: 320px;
  background: url('../../assets/hybird.png') no-repeat center;
  background-size: 100% 100%;
  height: 650px;
  z-index: 10;
}

.frame-top {
  width: 90%;
  height: 26px;
  background: url('../../assets/buttonback.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.frame-content {
  width: 92%;
  height: 140px;
  background: url('../../assets/cardground.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
  display: flex;
  /* justify-content: center;
  align-items: center; */
}

.middle-content {
  width: 95%;
  height: 180px;
  background: url('../../assets/mapBorder.png') no-repeat center;
  background-size: 100% 100%;
  margin: 10px auto 0;
}
</style>

<style>
/* 自定义对话框样式 */
/* .custom-dialog-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
} */

/* .custom-dialog {
  width: 70%;
  height: 720px;
  background-color: #383D44;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  pointer-events: auto;
  margin-left: 300px;
} */

.custom-dialog-header {
  background-color: #61646A;
  padding: 15px 20px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3a4452;
}

.custom-dialog-body {
  padding: 0;
  max-height: calc(100% - 45px);
  overflow-y: auto;
}
</style>
