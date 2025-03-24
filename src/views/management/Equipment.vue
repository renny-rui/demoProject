<template>
  <div class="equipment-management">
    <h1>设备管理</h1>
    <div class="content-box">
      <p>这里是设备管理页面的内容</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EquipmentManagement",
  data() {
    return {
      // 数据
    };
  },
  methods: {
    // 方法
  }
};
</script>

<style scoped>
.equipment-management {
  padding: 20px;
}

.content-box {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
