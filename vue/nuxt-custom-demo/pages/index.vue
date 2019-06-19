<template>
    <section class="container">
        <div>
            <logo/>
            <h1>{{ name }}</h1>
            <h1 class="title">nuxt-custom-demo</h1>
            <router-link to="/about">about 页面</router-link>
            <h2 class="subtitle">My cat&#39;s pajamas Nuxt.js project</h2>
            <div class="links">
                <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    class="button--grey"
                >GitHub</a>
            </div>
        </div>
    </section>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
    components: {
        Logo
    },
    data() {
        return {
            name: "这是data的内容"
        };
    },
    asyncData(context) {
        return {
            name: "这是asyncData的内容"
        };
    },
    fetch(context) {
        // return axios.get("http://my-api/stars").then(res => {
        //     store.commit("setStars", res.data);
        // });
    },
    head() {
        return {
            title: "首页",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "My custom description"
                }
            ]
        };
    },
    layout: "home"
};
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
