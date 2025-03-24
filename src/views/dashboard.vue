<template>
  <div class="dashboardContainer">
    <div class="header">
      <img class="logo" src="../assets/logo.png" />
      <img class="back" src="../assets/back.png" @click="goToLogin" />
    </div>
    <div class="content-wrapper">
      <div class="topCard">
        <div class="title-container">
          <h2 class="substitle">基础信息管理</h2>
          <img src="../assets/titlePic.png" class="title-image" />
        </div>
        <div class="cards">
          <div class="cardItem" v-for="(item, index) in otherBasicCards" :key="index">
            <el-card :body-style="{padding:'20px'}" class="module" >
              <img src="../assets/Component 2.png" class="image" />
              <div style="padding: 14px">
                <span @click="handleCardClick(item.name)">{{ item.name }}</span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div class="topCard">
        <div class="title-container">
          <h2 class="substitle">应用场景构建</h2>
          <img src="../assets/titlePic.png" class="title-image" />
        </div>
        <div class="cards">
          <div class="cardItem" v-for="o in 2" :key="o">
            <el-card :body-style="{padding:'20px'}" class="module">
              <img src="../assets/Component 2.png" class="image" />
              <div style="padding: 14px">
                <span>用户管理</span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
      <div class="topCard">
        <div class="title-container">
          <h2 class="substitle">智能考核评估</h2>
          <img src="../assets/titlePic.png" class="title-image" />
        </div>
        <div class="cards">
          <div class="cardItem">
            <el-card :body-style="{padding:'20px'}" class="module">
              <img src="../assets/Component 2.png" class="image" />
              <div style="padding: 14px">
                <span>考核评估</span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      otherBasicCards: [
        { name:'用户管理'},
        { name: '设备管理' },
        { name: '课程管理' },
        { name: '成绩管理' },
        { name: '示教管理' }
      ]
    }
  },
  methods: {
    handleCardClick(type) {
      console.log('2323232',type)
      if (type === '用户管理') {
        this.$router.push('/user/info')
      }
    },
    goToLogin() {
      // 清除登录信息
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      // 返回登录页
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.dashboardContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: #444;
  overflow-x: hidden;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px 20px;
  box-sizing: border-box;
}

.header {
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  z-index: 10;
  box-sizing: border-box;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.35);
}

.back {
  width: 5%;
  height: 30px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.back:hover {
  transform: scale(1.1);
}

.topCard {
  width: 100%;
  max-width: 1200px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #4d5d38;
  border: 2px solid #999999;
  position: relative;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-sizing: border-box;
}

.title-container {
  position: relative;
  width: 100%;
}

.substitle {
  position: absolute;
  top: 15px;
  left: 20px;
  color: #ffffff;
  margin: 0;
  font-size: 1.5rem;
  z-index: 2;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.title-image {
  width: 100%;
  height: 80px;
  object-fit: cover;
}

.image {
  width: 50%;
  max-width: 100px;
  display: block;
  margin: 0 auto;
}

.cards {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
}

.cardItem {
  margin: 10px;
  width: calc(20% - 20px);
  min-width: 150px;
  transition: all 0.3s ease;
}

.module {
  background-color: #E3E3E3;
  opacity: 0.9;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;
}

.module:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

/* 响应式设计 */
@media screen and (max-width: 1200px) {
  .cardItem {
    width: calc(25% - 20px);
  }
}

@media screen and (max-width: 992px) {
  .cardItem {
    width: calc(33.333% - 20px);
  }
}

@media screen and (max-width: 768px) {
  .cardItem {
    width: calc(50% - 20px);
  }
  
  .topCard {
    min-height: 180px;
  }
  
  .substitle {
    font-size: 1.3rem;
    top: 12px;
    left: 15px;
  }
  
  .title-image {
    height: 60px;
  }
}

@media screen and (max-width: 576px) {
  .cardItem {
    width: 100%;
    margin: 10px 0;
  }
  
  .content-wrapper {
    padding: 0 10px 10px;
  }
  
  .header {
    padding: 10px;
  }
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .back {
    width: 30px;
    height: 30px;
  }
  
  .substitle {
    font-size: 1.1rem;
    top: 10px;
    left: 10px;
  }
  
  .title-image {
    height: 50px;
  }
}
</style>
