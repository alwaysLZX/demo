<template>
    <div>
        <h1 class="main-title">{{ msg }}</h1>
        <h2>{{ count }}</h2>
        <router-view />
    </div>
</template>
<script>
import test from "./test.ts";

export default {
    name: "app",
    data() {
        return {
            msg: "知否？知否？应是绿肥红瘦！" + test
        };
    },
    computed: {
        count() {
            return this.$store.state.count;
        }
    },
    created() {
        this.$store.commit({
            type: "increment",
            amount: 10
        });
    }
};
</script>
<style module>
.main-title {
    margin: 0;
    background-image: url(./images/xq.png);
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
