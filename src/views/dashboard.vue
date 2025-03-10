<template>
  <div class="dashboardContainer">
    <div>
      <img class="logo" src="../assets/logo.png" />
    </div>
    <div class="topCard">
      <h2 class="substitle">基础信息管理</h2>
      <img src="../assets/titlePic.png" style="height: 30%; width: 100%" />
      <div class="cards">
        <div class="cardItem">
          <el-card :body-style="{padding:'20px'}" class="module" @click="handleCardClick('user')">
            <img src="../assets/Component 2.png" class="image" />
            <div style="padding: 14px">
              <span>用户管理</span>
            </div>
          </el-card>
        </div>
        <div class="cardItem" v-for="(item, index) in otherBasicCards" :key="index">
          <el-card :body-style="{padding:'20px'}" class="module">
            <img src="../assets/Component 2.png" class="image" />
            <div style="padding: 14px">
              <span>{{ item.name }}</span>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div class="topCard">
      <h2 class="substitle">应用场景构建</h2>
      <img src="../assets/titlePic.png" style="height: 30%; width: 100%" />
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
      <h2 class="substitle">智能考核评估</h2>
      <img src="../assets/titlePic.png" style="height: 30%; width: 100%" />
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
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      otherBasicCards: [
        { name: '设备管理' },
        { name: '课程管理' },
        { name: '成绩管理' },
        { name: '示教管理' }
      ]
    }
  },
  methods: {
    handleCardClick(type) {
      if (type === 'user') {
        this.$router.push('/user/info')
      }
    }
  }
}
</script>

<style scoped>
.dashboardContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #444;
  justify-content: center;
}

.logo {
  box-sizing: border-box;
  position: absolute;
  left: 2.69%;
  right: 92.62%;
  top: 2.2%;
  bottom: 91.5%;
  border: 1.1px solid rgba(0, 0, 0, 0.35);
  border-radius: 38.5px;
  width: 60px;
  height: 60px;
}

.topCard {
  width: 80%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #4d5d38;
  border: 2px solid #999999;
  position: relative;
  margin-bottom: 20px;
}

.substitle {
  position: absolute;
  color: #ffffff;
  top: 0%;
  left: 2%;
}

.image {
  width: 50%;
  display: block;
  margin-left: 20px;
}

.cards {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: wrap;
  justify-content: start;
}

.cardItem {
  margin: 20px;
}

.module {
  background-color: #E3E3E3;
  opacity: 0.9;
  cursor: pointer;
  transition: all 0.3s ease;
}

.module:hover {
  transform: translateY(-5px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
