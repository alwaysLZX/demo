import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: "history",
        routes: [
            {
                path: "/",
                name: "home",
                component: () => import("@/views/home")
            },
            {
                path: "/about",
                name: "about",
                component: () => import("@/views/about")
            },
            {
                path: "/help",
                name: "help",
                component: () => import("@/views/help")
            }
        ]
    });
}
