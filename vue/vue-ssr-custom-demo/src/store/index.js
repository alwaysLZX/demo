import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem({ commit }, id) {
                setTimeout(() => {
                    commit("setItem", { id: "1", item: { name: "蟹钳" } });
                }, 1000);
            }
        },
        mutations: {
            setItem(state, { id, item }) {
                Vue.set(state.items, id, item);
            }
        }
    });
}
