import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Dashboard from '@/views/dashboard.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import Organization from '@/views/user/Organization.vue'
import Roles from '@/views/user/Roles.vue'
import OperationLogs from '@/views/user/OperationLogs.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import BattleSimulation from '@/views/dashboard/BattleSimulation.vue'
import DeviceBinding from '@/views/tasks/DeviceBinding.vue'
import TaskAssignment from '@/views/tasks/TaskAssignment.vue'

// 导入管理页面组件
import Equipment from '@/views/management/Equipment.vue'
import DeviceCategory from '@/views/management/DeviceCategory.vue'
import Grades from '@/views/management/Grades.vue'
import Content from '@/views/management/Content.vue'
import Courses from '@/views/management/Courses.vue'
import Permission from '@/views/user/Permission.vue'

// Clear any existing token to ensure login page is shown
localStorage.removeItem('token');
localStorage.removeItem('userInfo');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false,
      title: '注册'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      requiresAuth: false,
      title: '忘记密码'
    }
  },
  
  {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title: '首页',
      roles: [0, 1] // 0-管理员, 1-普通用户
    }
  },
  {
    path: '/battle-simulation',
    name: 'BattleSimulation',
    component: BattleSimulation,
    meta: {
      requiresAuth: true,
      title: '作战态势分析',
      roles: [0, 1] // 允许管理员和普通用户访问
    }
  },
  {
    path: '/user',
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'info',
        name: 'UserInfo',
        component: UserInfo,
        meta: {
          requiresAuth: true,
          title: '人员信息',
          roles: [0, 1] // 0-管理员, 1-普通用户
        }
      },
      {
        path: 'organization',
        name: 'Organization',
        component: Organization,
        meta: {
          requiresAuth: true,
          title: '组织架构',
          roles: [0] // 只有管理员可访问
        }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: Roles,
        meta: {
          requiresAuth: true,
          title: '角色管理',
          roles: [0,1] // 只有管理员可访问
        }
      },
      {
        path: 'Permission',
        name: 'Permission',
        component: Permission,
        meta: {
          requiresAuth: true,
          title: '权限管理',
          roles: [0,1] // 只有管理员可访问
        }
      },
      {
        path: 'logs',
        name: 'OperationLogs',
        component: OperationLogs,
        meta: {
          requiresAuth: true,
          title: '操作日志',
          roles: [0] // 只有管理员可访问
        }
      }
    ]
  },
  {
    path: '/management',
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'equipment',
        name: 'Equipment',
        component: Equipment,
        meta: {
          requiresAuth: true,
          title: '设备管理',
          roles: [0, 1] // 0-管理员, 1-普通用户
        }
      },
      {
        path: 'device-category',
        name: 'DeviceCategory',
        component: DeviceCategory,
        meta: {
          requiresAuth: true,
          title: '设备分类管理',
          roles: [0, 1] // 0-管理员, 1-普通用户
        }
      },
      
      {
        path: 'grades',
        name: 'Grades',
        component: Grades,
        meta: {
          requiresAuth: true,
          title: '成绩管理',
          roles: [0, 1]
        }
      },
      {
        path: 'content',
        name: 'Content',
        component: Content,
        meta: {
          requiresAuth: true,
          title: '内容管理',
          roles: [0, 1]
        }
      },
      {
        path: 'courses',
        name: 'Courses',
        component: Courses,
        meta: {
          requiresAuth: true,
          title: '课程管理',
          roles: [0, 1]
        }
      }
    ]
  },
  {
    path: '/device',
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'info',
        name: 'DeviceInfo',
        redirect: '/management/equipment',
        meta: {
          requiresAuth: true,
          title: '设备信息',
          roles: [0, 1]
        }
      }
    ]
  },
  {
    path: '/tasks',
    component: MainLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'device-binding',
        name: 'DeviceBinding',
        component: DeviceBinding,
        meta: {
          requiresAuth: true,
          title: '设备绑定',
          roles: [0, 1] // 0-管理员, 1-普通用户
        }
      },
      {
        path: 'task-assignment',
        name: 'TaskAssignment',
        component: TaskAssignment,
        meta: {
          requiresAuth: true,
          title: '任务分配',
          roles: [0, 1] // 0-管理员, 1-普通用户
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('[守卫] 路由跳转:', from.fullPath, '→', to.fullPath);

  const token = localStorage.getItem('token');
  const userInfoStr = localStorage.getItem('userInfo');

  // 免登录页面
  if (to.path === '/login') {
    return next();
  }

  // 未登录
  if (!token) {
    console.log('[守卫] 未登录，跳转登录');
    return next({
      path: '/login'
    });
  }

  // token 有，但 userInfo 还没写完
  if (!userInfoStr) {
    console.warn('[守卫] token 有但 userInfo 暂未写入，先进入当前页等待写入');
    return next(); // 放行！否则页面会空白
  }

  const userInfo = JSON.parse(userInfoStr);
  const userRole = userInfo.role;

  if (!to.meta.roles || to.meta.roles.includes(userRole)) {
    return next();
  } else {
    console.warn('[守卫] 无权限访问，跳默认页');
    return next('/login');
  }
});

export default router
