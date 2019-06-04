<template>
    <h1>这是about页面</h1>
</template>
<script>
import util from "@/utils/util";
export default {
    name: "about",
    created() {
        console.log(util.isProduction());
    }
}
</script>
<style>
#about {
    width: 100%;
}
</style>
<style lang="scss">
#about {
    background-color: red;
    h1 {
        color: #999;
    }
}
</style>
