import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/global.css'
import '@/assets/css/dialog-fix.css' // 引入对话框修复样式
import './assets/css/date-picker-fix.css' // 引入日期选择器修复样式
import dataV from '@jiaminghi/data-view'
import { login } from './api/auth'
import router from './router'
import "./assets/fonts/NotoSerifCJKSC-Black.otf"

Vue.use(ElementUI)
Vue.use(dataV)
Vue.config.productionTip = false
Vue.use(ElementUI, { zIndex: 99999 }) // 设置Element UI组件的基础z-index为99999
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// async function autoLogin() {
//   console.log('[自动登录] 准备执行 login 接口...');

//   const hasToken = localStorage.getItem('token');
//   if (hasToken) {
//     console.log('[自动登录] 已有 token，跳过登录');
//     return;
//   }

//   const defaultUsername = 'admin';
//   const defaultPassword = 'admin';

//   try {
//     const response = await login(defaultUsername, defaultPassword);
//     console.log('[自动登录] login 接口响应:', response);
    
//     if (response && response.token) {
//       localStorage.setItem('token', response.token);
//       localStorage.setItem('userInfo', JSON.stringify(response.userInfo));
//       router.replace('/battle-simulation').catch(() => {});
//       console.log('[自动登录] 成功，已跳转');
//     } else {
//       console.warn('[自动登录] 登录接口未返回 token');
//     }
//   } catch (err) {
//     console.error('[自动登录] 登录失败:', err.message || err);
//   }
// }


// // 调用自动登录函数
// autoLogin().then(() =>{
//   new Vue({
//     router,
//     render:h => h(App)
//   }).$mount('#app')
// });