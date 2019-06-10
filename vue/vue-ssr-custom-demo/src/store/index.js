import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        mutations: {
            setItem(state, { id, item }) {
                Vue.set(state.items, id, item);
            }
        },
        actions: {
            fetchItem({ commit }, id) {
                return new Promise((resolve, reject) => {
                    resolve({ name: "蟹钳" });
                }).then(item => {
                    commit("setItem", { id: id, item: item });
                });
            }
        }
    });
}
