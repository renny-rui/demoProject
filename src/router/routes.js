import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/dashboard.vue";
import UserManage from "@/views/UserManage.vue";
import Settings from "@/views/Settings.vue";
import Layout from "@/layouts/Layout.vue"; // 后台管理布局

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
      path: "/",
      redirect: "/dashboard",
      component: Layout,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
        },
      
      ],
    },
    {
      path: "*",
      redirect: "/login",
    },
  ],
});
