import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        data: [],
        isInit: false
    },
    getters: {
        getData(state){
            return state.data;
        }
    },
    mutations: {
        UPLOAD(state) {
            localStorage.setItem("data",JSON.stringify(state.data));
        },
        LOAD(state) {
            let res = JSON.parse(localStorage.getItem("data"));
            if(res !== null) {
                state.data = res;
            }
        },
        TOOGLE_INIT(state) {
            if(state.isInit) {
                state.isInit = false;
            } else {
                state.isInit = true;
            }
        },
        SET(state, { type, items }) {
            state[type] = items;
        },
        ADD_USER(state, item) {
            state.data.push(item);
        },
        DELETE_USER(state, index) {
            state.data.splice(index,1);
        },
        SET_USER(state, data) {
            state.data[data.index] = data.user;
        }
    },
    actions: {
        setNewData({ commit }, payload) {
            commit('SET', { type: 'data', items: payload });
            commit('UPLOAD');
        },
        load({ commit }) {
            commit('LOAD');
        },
        upload({ commit }) {
            commit('UPLOAD');
        },
        addUser({ commit, state }, payload) {
            if(!state.isInit){
                commit('LOAD');
                commit('TOOGLE_INIT');
            }
            commit('ADD_USER', payload);
            commit('UPLOAD');
        },
        deleteUser({commit,state},index) {
            if(!state.isInit){
                commit('LOAD');
                commit('TOOGLE_INIT');
            }
            commit('DELETE_USER',index);
            commit('UPLOAD');
        },
        setUser({commit,state}, data) {
            if(!state.isInit){
                commit('LOAD');
                commit('TOOGLE_INIT');
            }
            commit('SET_USER', data);
            commit('UPLOAD');
        }
    }
})

export default store