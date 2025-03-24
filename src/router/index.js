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
  },
  {
    path: '/',
    redirect: '/battle-simulation'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('路由守卫检查 - 目标路由:', to.path);
  
  // 不需要登录权限的路由直接放行
  if (to.matched.some(record => record.meta.requiresAuth === false)) {
    // 如果已登录且要跳转登录页，则重定向到作战态势分析页面
    if (to.path === '/login' && localStorage.getItem('token')) {
      console.log('已登录，重定向到作战态势分析页面');
      next('/battle-simulation');
    } else {
      next();
    }
    return;
  }
  
  // 获取token和用户信息
  const token = localStorage.getItem('token');
  console.log('路由守卫检查 - token:', token);
  
  // 需要登录权限但没有token
  if (!token) {
    console.log('未登录，重定向到登录页');
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
    return;
  }
  
  // 有token，检查用户信息
  try {
    const userInfoStr = localStorage.getItem('userInfo');
    const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
    
    if (!userInfo) {
      console.log('没有用户信息，重定向到登录页');
      localStorage.removeItem('token'); // 清除无效token
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }
    
    // 检查用户角色是否有权限访问该路由
    const userRole = userInfo.role;
    console.log('用户角色:', userRole, '目标路由角色要求:', to.meta.roles);
    
    // 如果路由没有指定roles，或者用户角色在允许的roles中，则允许访问
    if (!to.meta.roles || to.meta.roles.includes(userRole)) {
      console.log('用户有权限访问该路由');
      next();
    } else {
      console.log('用户无权限访问该路由，重定向到作战态势分析页面');
      next('/battle-simulation');
    }
  } catch (error) {
    console.error('解析用户信息失败:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
});

export default router
