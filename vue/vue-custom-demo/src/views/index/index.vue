<template>
    <div :class="$style.red">这是index页面</div>
</template>
<script>
export default {
    name: "index",
    data() {
        return {
            msg: "msg"
        };
    },
    created() {
        console.log("这是index页面");
        debugger

    }
}
</script>
<style module>
.red {
    color: red;
}

.red .aa {
    text-decoration: none;
}
</style>
