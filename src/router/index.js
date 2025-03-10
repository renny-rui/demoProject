import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/dashboard.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import UserInfo from '@/views/user/UserInfo.vue'
import Organization from '@/views/user/Organization.vue'
import Roles from '@/views/user/Roles.vue'
import OperationLogs from '@/views/user/OperationLogs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: Dashboard
  },
  {
    path: '/user',
    component: MainLayout,
    children: [
      {
        path: 'info',
        name: 'UserInfo',
        component: UserInfo
      },
      {
        path: 'organization',
        name: 'Organization',
        component: Organization
      },
      {
        path: 'roles',
        name: 'Roles',
        component: Roles
      },
      {
        path: 'logs',
        name: 'OperationLogs',
        component: OperationLogs
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
