<template>
  <div class="register-container">
    <div class="logo-container">
      <img src="../assets/logo.png" alt="Logo" class="logo">
    </div>
    
    <div class="register-card">
      <img src="../assets/cardTop.png" class="camouflage-header" alt="Card Top">
      <h2 class="system-title">后勤业务能力智能化考核评估系统</h2>
      
      <div class="register-content">
        <div class="info-icon">
          <i class="el-icon-info"></i>
        </div>
        
        <h3 class="title">注册账号</h3>
        
        <div class="message">
          <p>请联系管理员创建您的账号</p>
        </div>
        
        <div class="contact-info">
          <div class="contact-item">
            <i class="el-icon-phone"></i>
            <span>电话：400-123-4567</span>
          </div>
          <div class="contact-item">
            <i class="el-icon-message"></i>
            <span>邮箱：admin@example.com</span>
          </div>
        </div>
        
        <div class="tips">
          <p>温馨提示：</p>
          <p>1. 请联系管理员申请创建新账号</p>
          <p>2. 管理员将在核实您的身份后为您创建账号</p>
          <p>3. 账号信息将通过电话或邮件方式告知您</p>
        </div>
        
        <el-button type="primary" class="back-button" @click="goToLogin">返回登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.register-container {
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

.register-card {
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

.register-content {
  width: 100%;
  padding: 0 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-icon {
  font-size: 48px;
  color: white;
  margin: 10px 0;
}

.title {
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
}

.message {
  color: white;
  font-size: 16px;
  text-align: center;
  margin-bottom: 20px;
}

.contact-info {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.contact-item {
  color: white;
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.contact-item i {
  margin-right: 10px;
  font-size: 18px;
}

.tips {
  width: 100%;
  color: #e6e6e6;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 20px;
}

.back-button {
  width: 100%;
  height: 45px;
  background-color: #5a6b3a;
  border-color: #5a6b3a;
  font-size: 16px;
}

.back-button:hover {
  background-color: #4a5b2a;
  border-color: #4a5b2a;
}
</style>
