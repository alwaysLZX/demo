<template>
    <div>
        <WeekPicker
            :start-year="2016"
            v-model="week"
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
    }
}
</script>
<style scoped>
</style>


