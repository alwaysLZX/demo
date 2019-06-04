<template>
    <div>home</div>
</template>

<script>
import util from "@/utils/util";
export default {
    name: "home",
    created() {
        console.log(util.isProduction());
    }
};
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
