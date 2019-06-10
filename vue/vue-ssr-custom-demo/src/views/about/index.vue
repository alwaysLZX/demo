<template>
    <div>
        <h1>这是about页面 {{ item }}</h1>
        <router-link to="/">Home</router-link>
        <router-link to="/help">help</router-link>
        <router-link to="/about">about</router-link>
    </div>
</template>
<script>
import util from "@/utils/util";
export default {
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch("fetchItem", route.params.id || "about");
    },
    name: "about",
    computed: {
        // 从 store 的 state 对象中的获取 item。
        item() {
            return this.$store.state.items[this.$route.params.id || "about"];
        }
    },
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
