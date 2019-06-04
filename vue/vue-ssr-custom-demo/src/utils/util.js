const util = {
    // 对象转数组格式
    objectToList(obj = {}) {
        let arr = [];
        Object.keys(obj).forEach(key => {
            arr.push({ key: key, value: obj[key] });
        });
        return arr;
    },
    // 对象转FormData格式
    objectToFormData(obj) {
        let fd = new FormData();
        Object.keys(obj).forEach(key => {
            if (Object(obj[key]) === obj[key]) {
                fd.append(key, JSON.stringify(obj[key]));
            } else {
                fd.append(key, obj[key]);
            }
        });
        return fd;
    },
    // 是否是生产环境
    isProduction() {
        return process.env.NODE_ENV.toLocaleUpperCase() === "production".toLocaleUpperCase();
    },
    // 获取元素的滚动高度
    getEleScrollHeight(ele) {
        let parentEle = ele.parentElement;
        let children = parentEle.children;
        let index = Array.prototype.indexOf.call(children, ele);
        let result = 0;
        for (let i = 0; i < index; i++) {
            result += children[i].scrollHeight;
        }
        return result;
    },
    // 是否是生日
    isBirthday(val) {
        return /[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(val);
    },
    // 获取年龄
    getAge(birthday) {
        let start = new Date(birthday);
        let now = new Date();
        return Math.floor((now - start) / 1000 / (3600 * 24 * 365));
    }
};
export default util;
