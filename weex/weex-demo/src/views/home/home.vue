<template>
  <div class="wrapper">
    <div class="header">
      <text class="header-title white">问题智慧大脑</text>
      <div class="message">
        <text class="iconfont white font50">&#xe61f;</text>
      </div>
    </div>
    <div >

    </div>
  </div>
</template>
<script>
export default {
  name: 'Home'
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}
.wrapper {
  font-size: 100px;
}
.header{
  flex-direction: row;
  align-items: center;
  background-color: #35478F;
  height: 100px;
  font-size: 50px;
  position: relative;
}
.header-title{
  flex: 1;
  font-size: 46px;
  text-align: center;
}
.message{
  height: 100px;
  position: absolute;
  right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
}
.white{
  color: #fff;
}
.font40{
  font-size: 40px;
}
.font50{
  font-size: 50px;
}
</style>
