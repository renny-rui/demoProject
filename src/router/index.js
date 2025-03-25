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
          title: '权限管理',
          roles: [0] // 只有管理员可访问
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

  if (to.path === '/login' && token) {
    console.log('[守卫] 已登录，跳转登录页，重定向到 /battle-simulation');
    return next('/battle-simulation');
  }

  // 免登录页面
  if (to.matched.some(record => record.meta.requiresAuth === false)) {
    return next();
  }

  // 未登录
  if (!token) {
    console.log('[守卫] 未登录，跳转登录');
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }

  // token 有，但 userInfo 还没写完
  if (!userInfoStr) {
    console.warn('[守卫] token 有但 userInfo 暂未写入，先进入当前页等待写入');
    return next(); // ✅ 放行！否则页面会空白
  }

  const userInfo = JSON.parse(userInfoStr);
  const userRole = userInfo.role;

  if (!to.meta.roles || to.meta.roles.includes(userRole)) {
    return next();
  } else {
    console.warn('[守卫] 无权限访问，跳默认页');
    return next('/battle-simulation');
  }
});



export default router
