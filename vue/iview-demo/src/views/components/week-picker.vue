<template>
    <Cascader 
        :data="data" 
        :load-data="loadData" 
        :render-format="format" 
        :placeholder="placeholder" 
        v-model="currentValue"
    />
</template>
<script>

const weekPickerUtil = {
    getWeekList(year, month) {
        let result = [],
            number = 1,
            date = [year, month, "01"].join('/'),
            thanMonth = month = month * 1;

        let beginDate = this.getWeekBegin(date);
        let endDate = this.getWeekEnd(date);

        if((beginDate.getMonth() + 1)!==month){
            beginDate.setDate(beginDate.getDate() + 7);
            endDate.setDate(endDate.getDate() + 7);
        }

        result.push(this.pushObj(beginDate,endDate,number));
        number++;

        while(thanMonth === month)
        {
            beginDate.setDate(beginDate.getDate() + 7);
            thanMonth = beginDate.getMonth() + 1;

            if (thanMonth === month) {
                endDate.setDate(endDate.getDate() + 7);
                result.push(this.pushObj(beginDate,endDate,number));
                number++;
            }
        }

        return result;
    },
    pushObj(beginDate,endDate,number){
        return { value: this.beginDateAndEndDate(beginDate,endDate), label: "第" + number + "周（"+this.beginDateAndEndDateSort(beginDate,endDate)+"）" };
    },
    beginDateAndEndDate(beginDate,endDate){
        return this.formatDate(beginDate) + " - " + this.formatDate(endDate)
    },
    beginDateAndEndDateSort(beginDate,endDate){
        return this.formatDateSort(beginDate) + " - " + this.formatDateSort(endDate)
    },
    // 获取周开始的日期
    getWeekBegin(date) {
        let _date = new Date(date);
        let weekIndex = _date.getDay();
        let lessDay = weekIndex - 1;
        lessDay = lessDay < 0 ? 6 : lessDay;
        _date.setDate(_date.getDate() - lessDay);
        return _date;
    },
    // 获取周结束的日期
    getWeekEnd(date) {
        let _date = new Date(date);
        let weekIndex = _date.getDay();
        let addDay = 7 - weekIndex;
        addDay = addDay === 7 ? 0 : addDay;
        _date.setDate(_date.getDate() + addDay);
        return _date;
    },
    // 格式化日期
    formatDate(date, separator) {
        separator = separator || "-";
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear().toString(), month, day].join(separator);
    },
    // 格式化日期
    formatDateSort(date, separator) {
        separator = separator || "-";
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return [month, day].join(separator);
    }
};

export default {
    name: "WeekPicker",
    props:{
        value:{
            type:Array,
            default(){
                return [];
            }
        },
        startYear:{
            type:Number,
            default:2010
        },
        endYear:{
            type:Number,
            default:(new Date()).getFullYear() + 3
        },
        placeholder:{
            type:String,
            default:"请选择时间"
        }
    },
    data() {
        return {
            currentValue:this.value
        }
    },
    computed: {
        data() {
            let result = [];

            this.years().forEach(element => {
                element.children = this.months(element.value);
                result.push(element);
            });
            return result;
        }
    },
    watch:{
        currentValue(){
            this.$emit("input",this.currentValue);
        }
    },
    methods: {
        years() {
            let result = [];
            let start = this.startYear, end = this.endYear;
            for (let i = end; i >= start; i--) {
                result.push({ value: i.toString(), label: i + "年", children: [] });
            }
            return result;
        },
        months(year) {
            let result = [];
            let start = 1, end = 12;
            for (let i = start; i <= end; i++) {
                let value = ("0" + i).slice(-2);
                result.push({ value: value, label: value + "月", children: [], loading: false, parent: year });
            }
            return result;
        },
        // 动态加载子项
        loadData(item, callback) {
            item.loading = true;
            item.children = weekPickerUtil.getWeekList(item.parent, item.value);
            item.loading = false;
            callback();
        },
        format(labels, selectedData) {
            if (selectedData.length > 0) {
                return selectedData[selectedData.length - 1].value;
            } else {
                return "";
            }
        }
    },
    created(){
    }
}
</script>


