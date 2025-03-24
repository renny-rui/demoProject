import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/dashboard.vue";
import Roles from "@/views/user/Roles.vue"; // 导入正确的权限管理页面
import UserInfo from "@/views/user/UserInfo.vue"; // 导入用户信息页面
import Organization from "@/views/user/Organization.vue"; // 导入组织架构页面
import OperationLogs from "@/views/user/OperationLogs.vue"; // 导入操作日志页面
import MainLayout from "@/layouts/MainLayout.vue"; // 正确引用布局组件
import ForgotPassword from "@/views/ForgotPassword.vue"; // 导入忘记密码页面
import BattleSimulation from "@/views/dashboard/BattleSimulation.vue"; // 导入战场模拟页面

// 导入管理页面
import Personnel from "@/views/management/Personnel.vue";
import Equipment from "@/views/management/Equipment.vue";
import Courses from "@/views/management/Courses.vue";
import Grades from "@/views/management/Grades.vue";
import Content from "@/views/management/Content.vue";
import Tasks from "@/views/management/Tasks.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // 需要后端支持
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/",
      redirect: "/dashboard",
      component: MainLayout, // 使用MainLayout组件
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "battle-simulation",
          name: "BattleSimulation",
          component: BattleSimulation,
        },
        // 用户相关路由
        {
          path: "user/info",
          name: "UserInfo",
          component: UserInfo,
        },
        {
          path: "user/organization",
          name: "Organization",
          component: Organization,
          meta: { 
            requiresAdmin: true // 标记该路由需要管理员权限
          }
        },
        {
          path: "user/roles",
          name: "Roles",
          component: Roles,
          meta: { 
            title: '权限管理',
            requiresAdmin: true // 标记该路由需要管理员权限
          }
        },
        {
          path: "user/logs",
          name: "OperationLogs",
          component: OperationLogs,
          meta: { 
            requiresAdmin: true // 标记该路由需要管理员权限
          }
        },
        // 管理页面路由
        {
          path: "management/personnel",
          name: "Personnel",
          component: Personnel
        },
        {
          path: "management/equipment",
          name: "Equipment",
          component: Equipment
        },
        {
          path: "management/courses",
          name: "Courses",
          component: Courses
        },
        {
          path: "management/grades",
          name: "Grades",
          component: Grades
        },
        {
          path: "management/content",
          name: "Content",
          component: Content
        },
        {
          path: "management/tasks",
          name: "Tasks",
          component: Tasks
        }
      ],
    },
    {
      path: "*",
      redirect: "/login",
    },
  ],
});
