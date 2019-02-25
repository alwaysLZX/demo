<template>
    <div :class="$style.red">这是index页面 {{ this.count3 }}</div>
</template>
<script>
import { mapState } from "vuex";

export default {
    name: "index",
    data() {
        return {
            msg: "msg"
        };
    },
    computed: {
        localCount() {
            return 101;
        },
        ...mapState({
            count1: state => state.count,
            count2: "count",
            count3(state) {
                return state.count + this.localCount;
            }
        })
    },
    created() {
        let obj = { name: "谢乾" };
        let newObj = { age: 18, ...obj };
    }
};
</script>
<style module>
.red {
    color: red;
}

.red .aa {
    text-decoration: none;
}
</style>
