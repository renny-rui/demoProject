<template>
  <div class="login-container">
    <!-- <div class="logo-container">
      <img class="logo" src="../assets/logo.png" alt="Logo">
    </div> -->

    <div class="login-card">
      <!-- <img src="../assets/cardTop.png" class="camouflage-header" alt="Card Top"> -->
     
      <div class="login-form">
        <div class="card-header">
         
          <h2 class="cardTitle" style="color: #c1ffff;text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px #ffffff;">后勤业务能力智能化考核评估软件系统</h2>
        </div>
        <div class="form-content">
          <div style="margin-right: 30px;">
            <img class="logo" src="../assets/logo.png" alt="Logo">
          </div>
          
          <div>
            <div class="form-item">
          <div class="form-label">用户名/账号：</div>
          <el-input v-model="form.username" placeholder="请输入用户名/账号" class="login-input custom-input" />
        </div>
        <div class="custom-divider"></div>
        <div class="form-item">
          <div class="form-label">密码：</div>
          <el-input v-model="form.password" type="password" placeholder="请输入密码" class="login-input custom-input" />
        </div>
          </div>
        </div>
       
        


        <el-button type="primary" class="login-button" @click="handleLogin" :loading="loading">{{ loading ? '登录中...' :
          '登录' }}</el-button>

       
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '../api/auth';
import Cookies from 'js-cookie';

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      captchaText: '',
      captchaColors: [],
      loading: false
    }
  },
  mounted() {

  },
  methods: {
   
    validateForm() {
      if (!this.form.username) {
        this.$message.error('请输入用户名');
        return false;
      }
      if (!this.form.password) {
        this.$message.error('请输入密码');
        return false;
      }
      
     
      return true;
    },
    async handleLogin() {
      if (!this.validateForm()) {
        return;
      }

      this.loading = true;
      try {
        const response = await login(this.form.username, this.form.password);
        console.log('登录响应:', response);

        if (response) {
          localStorage.setItem('token', response.token);
          Cookies.set('Authorization', response.token, {
            expires: 1,
            path: '/',
            sameSite: 'Lax'
          });
          this.$message.success('登录成功');
          this.$nextTick(() => {
  // 防止重复跳转加 try-catch
  try {
    this.$router.replace('/battle-simulation');
  } catch (err) {
    console.warn('跳转失败:', err);
  }
});
          console.log('当前路由实例:', this.$router)
        } else {
          throw new Error('登录失败：未收到有效的token');
        }

      } catch (error) {
        console.error('登录失败:', error);
        this.$message.error(error.message || '登录失败，请稍后重试');
      } finally {
        this.loading = false;
      }
    },
  
  }
}
</script>

<style scoped>
.login-container {
  background-image: url(../assets/loginaction.png);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: relative;
}

.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.logo {
  width: 90px;
  height:90px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.35);
}


.login-card {
  width: 500px;
  height: 480px;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}




.login-form {
  width: 100%;
  padding: 20px 40px 30px;
  border: 3px solid #c1ffff;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.7);  /* 设置背景色透明度，而不是 opacity */
  position: relative; /* 确保子元素可以正常显示 */
  z-index: 1; /* 让登录框保持在顶部 */
}
.card-header {
  position: relative;
  z-index: 2; /* 使标题在更高层级，避免被遮住 */
}

.cardTitle {
  color: #c1ffff;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px #ffffff;
  z-index: 3; /* 使标题在最上层，避免被遮挡 */
}
.form-content{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.form-item {
  margin-bottom: 20px;
  width: 280px !important;
}

.form-label {
  color: #c1ffff; /* 亮蓝色字体 */
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px #c1ffff, 0 0 30px #c1ffff;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: left;
}

.login-input {
  width: 100%;
}

.login-button {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background-color: #c1ffff;
  border-color: #c1ffff;
  font-size: 18px;
  color:#333
}

.login-button:hover {
  background-color: #c1ffff;
  border-color: #c1ffff;
}

.login-options {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.option-text {
  color: white;
  cursor: pointer;
}

.divider {
  color: white;
  margin: 0 10px;
}

.custom-divider {
  height: 1px;
  width: 100%;
  margin: 15px 0;
  background-color: #c1ffff;
  box-shadow: 0 0 10px rgba(193, 255, 255, 0.8), 0 0 20px rgba(193, 255, 255, 0.5), 0 0 30px rgba(193, 255, 255, 0.3);
}
</style>

<style>
/* 仅在登录页面中应用的样式 */
.login-container .el-input__inner {
  border: 1px solid #c1ffff !important;
  color: #c1ffff !important;
  background-color: transparent !important;
}

.login-container .el-input__inner::placeholder {
  color: #c1ffff !important;
  opacity: 0.7 !important;
}

.login-container .el-divider {
  background-color: transparent;
  display: block;
  height: 1px;
  width: 100%;
  margin: 15px 0;
  border-top: 1px solid #c1ffff;
  box-shadow: 0 0 10px rgba(193, 255, 255, 0.8), 0 0 20px rgba(193, 255, 255, 0.5);
}
.login-container .login-button{
  background-color: transparent;
  border: 2px solid #c1ffff;  /* 设置边框为亮蓝色 */
  border-radius: 50px;  /* 圆角 */
  font-size: 18px;
  padding: 10px 40px;  /* 按钮内边距 */
  text-align: center;
  display: inline-block;
  position: relative;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px #c1ffff;  /* 给文字添加光晕效果，缩小光晕范围 */
  box-shadow: 0 0 10px #c1ffff, 0 0 20px #c1ffff;  /* 按钮本身的光晕效果，缩小光晕范围 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
  color:#333;
}
.login-container .login-button:hover {
  background-color: #c1ffff;  /* 鼠标悬停时改变背景颜色 */
  color: #333;  /* 鼠标悬停时文字颜色变为深色 */
  border-color: #c1ffff;  /* 鼠标悬停时边框颜色保持不变 */
  box-shadow: 0 0 20px #c1ffff, 0 0 30px #c1ffff;  /* 增加发光效果 */
}

/* Global styles to override Element UI */
.el-input__inner {
  height: 40px !important;
}

.el-button--primary {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
}

.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #c1ffff !important;
  border-color: #c1ffff !important;
}
</style>
