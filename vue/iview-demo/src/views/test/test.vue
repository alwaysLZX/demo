<template>
    <div :class="[$style.test]">
        <WeekPicker
            :start-year="2016"
            v-model="week"
            v-bind="{id:110,'class-name':'120'}"
        />
    </div>
</template>
<script>
import Util from '@/libs/util.js'
import WeekPicker from '@/views/components/week-picker.vue'

export default {
    name: "test",
    components:{
        WeekPicker
    },
    data() {
        return {
            week:[]
        }
    },
    created(){
    }
}
</script>
<style module>
.test{
    width: 100%;
}
</style>


