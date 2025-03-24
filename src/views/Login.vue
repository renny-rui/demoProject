<template>
  <div class="login-container">
    <div class="logo-container">
      <img class="logo" src="../assets/logo.png" alt="Logo">
    </div>
    
    <div class="login-card">
      <img src="../assets/cardTop.png" class="camouflage-header" alt="Card Top">
      <h2 class="system-title">后勤业务能力智能化考核评估系统</h2>
      <div class="login-form">
        <div class="form-item">
          <div class="form-label">用户名/账号：</div>
          <el-input
            v-model="form.username"
            placeholder="请输入用户名/账号"
            class="login-input"
          />
        </div>
        
        <div class="form-item">
          <div class="form-label">密码：</div>
          <el-input 
            v-model="form.password" 
            type="password"
            placeholder="请输入密码"
            class="login-input"
          />
        </div>
        
        <div class="form-item">
          <div class="form-label">验证码：</div>
          <div class="captcha-box">
            <el-input 
              v-model="form.captcha" 
              placeholder="请输入验证码" 
              class="captcha-input" 
            />
            <div class="captcha-display" @click="generateCaptcha">
              <canvas ref="captchaCanvas" width="120" height="40"></canvas>
            </div>
          </div>
        </div>
        
        <el-button 
          type="primary" 
          class="login-button" 
          @click="handleLogin"
          :loading="loading"
        >{{ loading ? '登录中...' : '登录' }}</el-button>
        
        <div class="login-options">
          <span class="option-text" @click="goToForgotPassword">忘记密码？</span>
          <span class="divider">|</span>
          <span class="option-text" @click="goToRegister">注册新账号</span>
        </div>
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
    this.generateCaptcha()
  },
  methods: {
    generateCaptcha() {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let captcha = ''
      for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.captchaText = captcha
      
      // Draw captcha on canvas
      this.$nextTick(() => {
        this.drawCaptcha()
      })
    },
    drawCaptcha() {
      const canvas = this.$refs.captchaCanvas
      const ctx = canvas.getContext('2d')
      const width = canvas.width
      const height = canvas.height
      
      // Clear canvas
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, width, height)
      
      // Draw random dots
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = this.getRandomColor(0.5)
        ctx.beginPath()
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 2,
          0,
          Math.PI * 2
        )
        ctx.fill()
      }
      
      // Draw random lines
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = this.getRandomColor(0.5)
        ctx.beginPath()
        ctx.moveTo(Math.random() * width, Math.random() * height)
        ctx.lineTo(Math.random() * width, Math.random() * height)
        ctx.lineWidth = 1
        ctx.stroke()
      }
      
      // Draw captcha text
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Draw each character with rotation and different colors
      for (let i = 0; i < this.captchaText.length; i++) {
        ctx.fillStyle = this.getRandomColor(1)
        ctx.save()
        ctx.translate(20 + i * 25, height / 2)
        ctx.rotate((Math.random() - 0.5) * 0.4)
        ctx.fillText(this.captchaText[i], 0, 0)
        ctx.restore()
      }
    },
    getRandomColor(alpha = 1) {
      const r = Math.floor(Math.random() * 200)
      const g = Math.floor(Math.random() * 200)
      const b = Math.floor(Math.random() * 200)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    },
    validateForm() {
      if (!this.form.username) {
        this.$message.error('请输入用户名');
        return false;
      }
      if (!this.form.password) {
        this.$message.error('请输入密码');
        return false;
      }
      if (!this.form.captcha) {
        this.$message.error('请输入验证码');
        return false;
      }
      if (this.form.captcha.toUpperCase() !== this.captchaText) {
        this.$message.error('验证码错误，请重新输入！');
        this.generateCaptcha();
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
        
        if (response && response.tokencontent) {
          // 保存token到 localStorage
          localStorage.setItem('token', response.tokencontent);
          
          // 构造基本用户信息并保存
          const userInfo = {
            username: this.form.username,
            role: 1, // 默认为普通用户角色
          };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          
          // 保存到 cookie
          Cookies.set('Authorization', `Bearer ${response.tokencontent}`, { 
            expires: 1,
            path: '/',
            sameSite: 'Lax'
          });
          
          this.$message.success('登录成功');
          
          // 直接跳转到作战态势分析页面
          this.$router.replace('/battle-simulation');
        } else {
          throw new Error('登录失败：未收到有效的token');
        }
      } catch (error) {
        console.error('登录失败:', error);
        this.$message.error(error.message || '登录失败，请稍后重试');
        this.generateCaptcha();
      } finally {
        this.loading = false;
      }
    },
    goToRegister() {
      this.$router.push('/register')
    },
    goToForgotPassword() {
      // 显示忘记密码提示，不需要手机验证，而是提示联系管理员
      this.$alert(
        `<div>
          <p>请联系管理员重置您的密码</p>
          <p>管理员联系方式：</p>
          <p>电话：400-123-4567</p>
          <p>邮箱：admin@example.com</p>
        </div>`,
        '忘记密码',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定'
        }
      );
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #444;
  position: relative;
}

.logo-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.35);
}

.login-card {
  width: 480px;
  background-color: #74884b;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.camouflage-header {
  width: 100%;
  height: 45px;
  object-fit: cover;
}

.system-title {
  color: white;
  font-size: 20px;
  margin: 20px 0;
  text-align: center;
}

.login-form {
  width: 100%;
  padding: 0 40px 30px;
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  color: white;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: left;
}

.login-input {
  width: 100%;
}

.captcha-box {
  display: flex;
  align-items: center;
}

.captcha-input {
  flex: 1;
}

.captcha-display {
  width: 120px;
  height: 40px;
  margin-left: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 5px;
  user-select: none;
  cursor: pointer;
}

.login-button {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  background-color: #5a6b3a;
  border-color: #5a6b3a;
  font-size: 18px;
}

.login-button:hover {
  background-color: #4a5b2a;
  border-color: #4a5b2a;
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
</style>

<style>
/* Global styles to override Element UI */
.el-input__inner {
  height: 40px !important;
}

.el-button--primary {
  background-color: #5a6b3a !important;
  border-color: #5a6b3a !important;
}

.el-button--primary:hover,
.el-button--primary:focus {
  background-color: #4a5b2a !important;
  border-color: #4a5b2a !important;
}
</style>
