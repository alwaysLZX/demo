<template>
    <Cascader 
        :data="dateData" 
        :load-data="loadData" 
        :render-format="format" 
        :placeholder="placeholder" 
        v-model="currentValue" 
    />
</template>
<script>

const util = {
    getWeekList(year, month) {
        let result = [],
            date = [year, month, "01"].join('/'),
            weekNumber = 1,
            thanMonth = month;

        let beginDate = this.getCurrentMonthFirstWeekBegin(date, month);
        let endDate = this.getCurrentMonthFirstWeekEnd(date, month);

        while (thanMonth === month) {
            result.push(this.getWeekItem(beginDate, endDate, weekNumber));
            weekNumber++;
            beginDate.setDate(beginDate.getDate() + 7);
            endDate.setDate(endDate.getDate() + 7);
            thanMonth = beginDate.getMonth() + 1;
        }
        return result;
    },
    getWeekItem(beginDate, endDate, weekNumber) {
        let result = {
            value: this.formatDate(beginDate, endDate),
            label: "第" + weekNumber + "周（" + this.formatShortDate(beginDate, endDate) + "）"
        };
        return result;
    },
    formatDate(beginDate, endDate) {
        return this.format(beginDate) + " - " + this.format(endDate)
    },
    formatShortDate(beginDate, endDate) {
        return this.format(beginDate, true) + " - " + this.format(endDate, true)
    },
    format(date, isShort = false, separator = '-') {
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let result = [month, day];
        if (!isShort) {
            result.unshift(date.getFullYear());
        }
        return result.join(separator);
    },
    getCurrentMonthFirstWeekBegin(date, month) {
        let result = this.getWeekBegin(date);
        if (!this.isFromMonthFirstDayStart(date, month)) {
            result.setDate(result.getDate() + 7);
        }
        return result;
    },
    getCurrentMonthFirstWeekEnd(date, month) {
        let result = this.getWeekEnd(date);
        if (!this.isFromMonthFirstDayStart(date, month)) {
            result.setDate(result.getDate() + 7);
        }
        return result;
    },
    isFromMonthFirstDayStart(date, month) {
        let result = true;
        if ((this.getWeekBegin(date).getMonth() + 1) !== month) {
            result = false;
        }
        return result;
    },
    getWeekBegin(date) {
        let result = new Date(date);
        let lessDay = result.getDay() - 1;
        lessDay = lessDay < 0 ? 6 : lessDay;
        result.setDate(result.getDate() - lessDay);
        return result;
    },
    getWeekEnd(date) {
        let result = new Date(date);
        let addDay = 7 - result.getDay();
        addDay = addDay === 7 ? 0 : addDay;
        result.setDate(result.getDate() + addDay);
        return result;
    }
};

export default {
    name: "WeekPicker",
    components: {},
    inheritAttrs: true,
    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        },
        startYear: {
            type: Number,
            default: 2010
        },
        endYear: {
            type: Number,
            default: (new Date()).getFullYear() + 3
        },
        placeholder: String
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    computed: {
        dateData() {
            let result = [];
            this.years().forEach(element => {
                element.children = this.months(element.value);
                result.push(element);
            });
            return result;
        }
    },
    watch: {
        currentValue() {
            this.$emit("input", this.currentValue);
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
        loadData(item, callback) {
            item.loading = true;
            item.children = util.getWeekList(item.parent * 1, item.value * 1);
            item.loading = false;
            callback();
        },
        format(labels, selectedData) {
            let result = "";
            if (selectedData.length > 0) {
                result = selectedData[selectedData.length - 1].value;
            }
            return result;
        }
    }
}
</script>