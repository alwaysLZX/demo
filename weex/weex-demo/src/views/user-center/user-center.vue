<template>
  <div class="wrapper">
    <div class="header">
      <text class="header-title white">个人中心</text>
    </div>
    <div class="body">
        <image class="user-img" src='http://www.thanksmoney.cn/Images/xq.png'></image>
        <text class="user-name white">蟹钳</text>
    </div>
    <div class="func-item">
        <text class="iconfont font38">&#xe612;</text>
        <text class="font38">个人资料</text>
        <text class="iconfont font38">&#xe60e;</text>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UserCenter'
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
  position: relative;
}
.header-title{
  flex: 1;
  font-size: 42px;
  text-align: center;
}
.body{
    height: 400px;
    background-color: #35478F;
    justify-content: center;
    align-items: center;
}
.user-img{
    height: 180px;
    width: 180px;
    background-color: #6451F8;
    border-radius: 200px;
    border-style: solid;
    border-width: 5px;
    border-color: #fff;
}
.user-name{
    font-size: 38px;
    margin-top: 20px;
}

.func-item{
    flex-direction: row;
}

.white{
  color: #fff;
}
.font38{
    font-size: 38px;
}
.font40{
  font-size: 40px;
}
.font50{
  font-size: 50px;
}
</style>
