<template>
  <div class="wrapper" @click="update">
    <image :src="logoUrl" class="logo" />
    <text class="title">Hello {{target}}</text>
    <text class="desc">Now, let's use vue to build your weex app.</text>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      logoUrl: 'http://img1.vued.vanthink.cn/vued08aa73a9ab65dcbd360ec54659ada97c.png',
      target: 'world'
    }
  },
  methods: {
    update (e) {
      this.target = 'weex'
    }
  }
}
</script>

<style scoped>
  .wrapper {
    align-items: center;
    margin-top: 120px;
  }
  .title{
    padding-top:40px;
    padding-bottom:48px;
    font-size: 48px;
  }
  .logo {
    width: 360px;
    height: 156px;
  }
  .desc {
    padding-top: 20px;
    color:#888;
    font-size: 24px;
  }
</style>
