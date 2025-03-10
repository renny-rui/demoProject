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
              <span v-for="(digit, index) in captchaText" :key="index" :style="{ color: getRandomColor() }">{{ digit }}</span>
            </div>
          </div>
        </div>
        
        <el-button type="primary" class="login-button" @click="handleLogin">登录</el-button>
        
        <div class="login-options">
          <span class="option-text">忘记密码？</span>
          <span class="divider">|</span>
          <span class="option-text">注册新账号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserLogin',
  data() {
    return {
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      captchaText: '',
      captchaColors: []
    }
  },
  mounted() {
    this.generateCaptcha()
  },
  methods: {
    generateCaptcha() {
      const chars = '0123456789'
      let captcha = ''
      for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      this.captchaText = captcha
      
      // Generate colors for each digit
      this.captchaColors = Array(4).fill().map(() => this.getRandomColor())
    },
    getRandomColor() {
      const colors = ['#f00', '#00f', '#080', '#f0f', '#f80', '#0ff']
      return colors[Math.floor(Math.random() * colors.length)]
    },
    handleLogin() {
      if (this.form.username === 'admin' && this.form.password === '123456') {
        if (this.form.captcha !== this.captchaText) {
          this.$message.error('验证码错误，请重新输入！')
          this.generateCaptcha()
          return
        }
        this.$message.success('登录成功！')
        this.$router.push('/dashboard')
      } else {
        this.$message.error('用户名或密码错误！')
      }
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
  width: 100px;
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
