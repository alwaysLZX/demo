import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home";
import About from "@/views/about";
import Help from "@/views/help";

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
