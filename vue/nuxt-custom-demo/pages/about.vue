<template>
    <div>
        <h2>这里是about页面</h2>
        <h4>page from {{ name }}</h4>
    </div>
</template>
<script>
export default {
    data() {
        return { name: "default" };
    },
    asyncData(context) {
        return { name: "asyncData" };
    },
    loading: false,
    middleware: "log"
};
</script>

