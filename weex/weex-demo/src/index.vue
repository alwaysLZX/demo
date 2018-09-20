<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script>
import Util from '@/utils/util'

export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    Util.initIconFont()
  },
  methods: {
    update (e) {
      this.target = 'weex'
    }
  }
}
</script>
<style scoped>
.iconfont {
    font-family: iconfont;
}
.wrapper {
    flex-direction: column;
}
</style>
