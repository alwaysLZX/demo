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
                component: () => import("../components/home")
            },
            {
                path: "/",
                name: "about",
                component: () => import("../components/about")
            },
            {
                path: "/",
                name: "help",
                component: () => import("../components/help")
            }
        ]
    });
}
