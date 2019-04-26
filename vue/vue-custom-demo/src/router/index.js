import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/index/index";
import About from "@/views/about/about";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: Index
        },
        {
            path: "/about",
            name: "about",
            component: About
        }
    ]
});

router.beforeEach((to, from, next) => {
    next();
});

router.afterEach((to, from, next) => {});

export default router;
