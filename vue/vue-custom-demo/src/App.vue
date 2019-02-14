<template>
    <div>
        <h1 class="main-title">{{ msg }}</h1>
        <router-view />
    </div>
</template>
<script>
export default {
    name: "app",
    data() {
        return {
            msg: "知否？知否？应是绿肥红瘦！"
        };
    },
    created() {
    }
};
</script>
<style module>
.sss {
    margin: 0;
}
</style>

<style scoped>
.test {
    padding: 0;
}

.test >>> span {
    margin: 0;
}
</style>
