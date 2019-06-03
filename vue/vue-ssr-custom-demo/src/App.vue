<template>
    <div id="app">
        <router-view class="router-view"/>
    </div>
</template>
<script>
export default {
    name: "app"
};
</script>
<style>
#app {
    width: 100%;
}
</style>
<style lang="scss">
#app {
    background-color: red;
    background-image: url(./assets/images/404.jpg);
    h1 {
        color: #999;
        background-image: url(./assets/images/lxj2.jpg);
    }
}
</style>

