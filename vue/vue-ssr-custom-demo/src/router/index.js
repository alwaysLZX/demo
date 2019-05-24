import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home";
import About from "@/views/home";
import Help from "@/views/home";

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: "history",
        routes: [
            {
                path: "/",
                name: "home",
                component: Home
            },
            {
                path: "/about",
                name: "about",
                component: About
            },
            {
                path: "/help",
                name: "help",
                component: Help
            }
        ]
    });
}
