<template>
    <div>User-Profile</div>
</template>
<script>
export default {
    name: "User",
    data() {
        return {};
    },
    watch: {
        '$route'(to, from) {
            // 对路由变化作出响应...
            debugger
        }
    },
    created() {
        debugger
        let params = this.$route.params;
    }
}
</script>
<style scoped>
</style>
