<template>
  <div class="container" @click.self="handleContainerClick">
    <!-- 背景图片 -->
    <div class="background-image"></div>

    <!-- 战场信息展示区域 - 始终存在但可能被门遮挡 -->
    <div class="full-container">
      <div class="top-border">
        <div class="logo-container">
          <img src="../../assets/logo.png" alt="Logo" class="center-logo">
          <h4 class="system-title">后勤业务能力智能化考核评估软件系统</h4>
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
      <div class="right-top">
        <div class="frame-box">

          <div class="frame-content">

            <!-- <img src="../../assets/mapPic.png" alt="task1" style="width: 100%;height: 130%; object-fit: cover;"> -->
            <img src="../../assets/snow.gif" alt="task1" style="width: 100%;height: 130%; object-fit: cover;">
          </div>
        </div>
        <div class="frame-box">
          <div class="frame-content" style="margin-top: 14px; height: 172px;">
            <!-- <video ref="frameVideo" class="frame-video" autoplay muted playsinline loop preload="auto" :src="videoSrc"
              style="width: 100%; height: 100%; object-fit: cover;" /> -->
            <img src="../../assets/mapPic1.png" alt="task2" style="width: 100%;height: 100%; object-fit: cover;">
          </div>
        </div>
        <div class="frame-box">
          <!-- <div class="frame-top">
          </div> -->
          <div class="frame-content">
            <img src="../../assets/mapPic2.png" alt="task3" style="width: 100%;height: 130%; object-fit: cover;">
          </div>
        </div>
      </div>
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

      <div class="left-top">
        <template v-if="hasMissionGroups">
          <div class="frame-box" style="padding-top: 1px;">
            <div class="frame-top">
              <h4>任务行动</h4>
            </div>
            <div class="frame-content">
              <div style="width: 100%;">
                <el-row :gutter="16" v-for="(item, index) in taskItems" :key="index" style="margin-bottom: 8px;">
                  <el-col :span="10">
                    <div style="color: #C1FFFF;font-size: 12px;">【{{ item.name }}】</div>
                  </el-col>
                  <el-col :span="8">
                    <div style="color: #fff;font-size: 12px;">团队人数{{ item.teamCount }}</div>
                  </el-col>
                  <el-col :span="6">
                    <div style="color: #fff;font-size: 12px;">{{ item.personCount }}人</div>
                  </el-col>
                </el-row>
              </div>

            </div>
          </div>
          <el-button type="primary" @click="startTask" class="detail-button">
            <i class="el-icon-s-operation">任务详情</i>
          </el-button>
        </template>
        <template v-else>
          <div class="frame-box" style="padding-top: 1px;">
            <div class="frame-top">
              <!-- <h4>未开始</h4> -->
              <h4 class="task-title">任务行动</h4>
            </div>
            <div class="frame-content" style="display: flex;flex-direction: column;">
              <span style="color: #C1FFFF;">【请发布新任务】</span>

              <!-- <div style="color: #C1FFFF;font-size: 16px;">【抢滩登陆】</div>
              <div style="color: #fff;font-size: 15px; margin-left: 10px;">油料小组4人</div>
              <div style="color: #fff;font-size: 15px;margin-left: 10px;">给养小组4人</div>
              <div style="color: #fff;font-size: 15px;margin-left: 10px;">卫勤小组4人</div>
              <div style="color: #fff;font-size: 15px;margin-left: 10px;">维修小组4人</div> -->

            </div>
          </div>
          <el-button type="primary" @click="startTask" class="add-button">
            <i class="el-icon-circle-plus-outline">发布任务</i>
          </el-button>
        </template>

      </div>

      <!-- 底部卡片区域 -->
      <div class="bottom-cards">
        <div class="card-item" ref="chart1">
          <div class="card-header">油料前送</div>
        </div>

        <div class="card-item" ref="chart2">
          <div class="card-header">油料加注</div>
        </div>
        <div class="card-item" ref="timerCard">
          <div class="card-header">热食制作</div>
          <!-- <div class="timer-display">{{ formatTime }}</div> -->
        </div>
        <div class="card-item" ref="weatherCard">
          <div class="card-header">热食前送</div>
          <!-- <div class="weather-info">
            <div class="weather-icon"><i class="el-icon-sunny"></i></div>
            <div class="weather-text">{{ currentWeather }}</div>
            <div class="temperature">{{ temperature }}°C</div>
          </div> -->
        </div>
        <div class="card-item" ref="chart3">
          <div class="card-header">卫勤救护</div>
        </div>
        <div class="card-item" ref="chart4">
          <div class="card-header">装备抢修</div>
        </div>
      </div>

      <!-- 左侧悬浮菜单栏 -->
      <!-- 菜单内容 -->
      <div class="floating-menu">
        <!-- 左侧一级菜单栏，仅展示图标，hover 只显示tooltip不展开二级菜单 -->
        <div class="menu-primary">
              <el-tooltip v-for="item in primaryMenus" :key="item.key" :content="item.name" placement="right"
                effect="dark">
                <div class="menu-item" :class="{ active: activeMenuItem === item.key }"
                  @click="handlePrimaryClick(item.key)">
                  <img v-if="item.iconImage" :src="require(`../../assets/icons/${item.iconImage}`)" class="menu-icon-img"/>
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
    <transition name="el-fade-in-linear" @before-leave="beforeLeaveHandler" @leave="leaveHandler">
      <div v-if="userInfoDialogVisible" class="fade-wrapper">
        <el-dialog ref="userInfoDialog" title="用户信息" :visible.sync="userInfoDialogVisible" width="70%"
          :before-close="closeUserInfoDialog" custom-class="user-info-dialog" :append-to-body="false"
          lock-scroll="false" :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true"
          :modal="false" :show-close="false" :style="dialogStyle">
          <div slot="title" class="custom-dialog-title">
            <span style="color: #fff;">用户信息</span>
            <el-button class="header-close-btn" size="small" @click="userInfoDialogVisible = false">关闭</el-button>
          </div>
          <UserInfo />
        </el-dialog>
      </div>
    </transition>
   
    <el-dialog title="任务配置" :visible.sync="taskDialogVisible" width="70%"
      :before-close="closeTaskDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">任务配置</span>
        <el-button class="header-close-btn" size="small" @click="closeTaskDialog">关闭</el-button>
      </div>
      <mixTask/>
    </el-dialog>

    <!-- 任务基本设置对话框 -->
    <el-dialog title="任务基本设置" :visible.sync="taskSettingsDialogVisible" width="70%"
      :before-close="closeTaskSettingsDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">任务基本设置</span>
        <el-button class="header-close-btn" size="small" @click="closeTaskSettingsDialog">关闭</el-button>
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
        <el-button class="header-close-btn" size="small" @click="closeTaskAssignmentDialog">关闭</el-button>
      </div>
      <TaskAssignment />
    </el-dialog>

    <!-- 设备信息对话框 -->
    <el-dialog title="设备信息" :visible.sync="equipmentDialogVisible" width="70%" :before-close="closeEquipmentDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">设备信息</span>
        <el-button class="header-close-btn" size="small" @click="equipmentDialogVisible = false">关闭</el-button>
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
        <el-button class="header-close-btn" size="small" @click="closeDeviceCategoryDialog">关闭</el-button>
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
    <el-dialog title="角色管理" :visible.sync="roleManagementDialogVisible" width="70%" :before-close="closeEquipmentDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">角色管理</span>
        <el-button class="header-close-btn" size="small" @click="roleManagementDialogVisible = false">关闭</el-button>
      </div>
      <Roles/>
    </el-dialog>
    <el-dialog title="权限管理" :visible.sync="permissionsDialogVisible" width="70%" :before-close="closeEquipmentDialog"
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
      <OilDelivery/>
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
    </el-dialog>
    <el-dialog title="示教内容管理" :visible.sync="teachingContentDialogVisible" width="70%"
      :before-close="closeTeachingContentDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">示教内容管理</span>
        <el-button class="header-close-btn" size="small" @click="teachingContentDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="规则体系管理" :visible.sync="rulesSystemDialogVisible" width="70%"
      :before-close="closeRulesSystemDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">规则体系管理</span>
        <el-button class="header-close-btn" size="small" @click="rulesSystemDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="日志管理" :visible.sync="logManagementDialogVisible" width="70%"
      :before-close="closeLogManagementDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">日志管理</span>
        <el-button class="header-close-btn" size="small" @click="logManagementDialogVisible = false">关闭</el-button>
      </div>
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
    </el-dialog>
    <el-dialog title="伴随指导" :visible.sync="guidanceDialogVisible" width="70%" :before-close="closeGuidanceDialog"
      custom-class="user-info-dialog" :append-to-body="true" :destroy-on-close="true" :close-on-click-modal="false"
      :close-on-press-escape="true" :modal="false" :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">伴随指导</span>
        <el-button class="header-close-btn" size="small" @click="guidanceDialogVisible = false">关闭</el-button>
      </div>
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
    </el-dialog>
    <el-dialog title="训练数据采集与存储" :visible.sync="trainingDataDialogVisible" width="70%"
      :before-close="closeTrainingDataDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">训练数据采集与存储</span>
        <el-button class="header-close-btn" size="small" @click="trainingDataDialogVisible = false">关闭</el-button>
      </div>
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
    </el-dialog>
    <el-dialog title="考核评估配置" :visible.sync="assessmentConfigDialogVisible" width="70%"
      :before-close="closeAssessmentConfigDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">考核评估配置</span>
        <el-button class="header-close-btn" size="small" @click="assessmentConfigDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="考核成绩及评价" :visible.sync="assessmentResultDialogVisible" width="70%"
      :before-close="closeAssessmentResultDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">考核成绩及评价</span>
        <el-button class="header-close-btn" size="small" @click="assessmentResultDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog title="实操考核过程回放" :visible.sync="assessmentReplayDialogVisible" width="70%"
      :before-close="closeAssessmentReplayDialog" custom-class="user-info-dialog" :append-to-body="true"
      :destroy-on-close="true" :close-on-click-modal="false" :close-on-press-escape="true" :modal="false"
      :show-close="false" :style="dialogStyle">
      <div slot="title" class="custom-dialog-title">
        <span style="color: #fff;">实操考核过程回放</span>
        <el-button class="header-close-btn" size="small" @click="assessmentReplayDialogVisible = false">关闭</el-button>
      </div>
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
    </el-dialog>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import UserInfo from '@/views/user/UserInfo.vue'; // Import UserInfo component
import DeviceBinding from '../tasks/DeviceBinding.vue';
import TaskAssignment from '../tasks/TaskAssignment.vue';
import EquipmentInfo from '@/views/management/Equipment.vue'; // Import EquipmentInfo component
import * as echarts from 'echarts';
import { getMissionLastList } from '@/api/mission';
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
    CourseManagement
  },
  data() {
    return {
      isMenuCollapsed: false, // 添加菜单折叠状态变量，默认为展开状态
      activeMenuItem: null,
      hoveredItem: null,
      showSecondaryMenu: true,
      primaryMenus: [
        { key: "user", iconImage: "userInfo.png", name: "基础信息管理" },
        { key: "applicationScenario", iconImage: "task.png", name: "应用场景构建管理" },
        { key: "simulate", iconImage: "algorithm.png", name: "智能模拟认知管理" },
        { key: "score", iconImage: "Vector.png", name: "智能考核评估管理" },

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
      isClosingDialog: false, // 标记对话框是否正在关闭中

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
      taskDialogVisible:false,
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
      missionName: ''
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
        this.showSecondaryMenu = true; // 显示二级菜单

        // 如果点击的是应用场景构建管理，直接显示任务基本设置弹窗
        if (key === 'applicationScenario') {
          this.showTaskSettingsDialog();
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
    closeUserInfoDialog() {
      this.userInfoDialogVisible = false
    },
    showTaskSettingsDialog() {
      this.taskSettingsDialogVisible = true;
    },
    closeTaskSettingsDialog() {
      this.taskSettingsDialogVisible = false;
    },
    closeTaskDialog(){
       this.taskDialogVisible = false;
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
    showDeviceCategoryDialog() {
      this.deviceCategoryDialogVisible = true
    },
    closeDeviceCategoryDialog() {
      this.deviceCategoryDialogVisible = false
    },
    showMixTaskDialog(){
      this.taskDialogVisible = true
    },
    //新增发布任务
    startTask() {
      // this.showTaskSettingsDialog();
      this.showMixTaskDialog();
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
    beforeLeaveHandler(el) {
      // 关闭动画开始时的钩子
      console.log("动画开始关闭", el);
    },

    leaveHandler(el) {
      // 关闭动画结束时的钩子
      console.log("动画关闭完成");
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
    },
  },
}
</script>

<style scoped>
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

.start-button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 14px 36px;
  font-size: 20px;
  color: #00f6ff;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid #00f6ff;
  border-radius: 12px;
  text-shadow: 0 0 8px #00f6ff;
  box-shadow: 0 0 20px rgba(0, 246, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  letter-spacing: 2px;
}

.start-button:hover {
  background-color: rgba(0, 0, 0, 0.6);
  box-shadow: 0 0 40px #00f6ff, 0 0 10px #00f6ff inset;
  transform: translate(-50%, -50%) scale(1.05);
}

.start-button:active {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 60px #00f6ff inset;
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
  background-image: url('../../assets/taskPic/2.png');
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

}

.timer-display {
  font-size: 24px;
  color: #D3EBEB;
  font-family: 'digital', monospace;
  text-shadow: 0 0 5px rgba(211, 235, 235, 0.7);
  letter-spacing: 2px;
  margin-left: 28px;
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
.task-title{
  font-family: 'SourceHanSerifSC', serif;
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
  border:2px solid #c1ffff;
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
