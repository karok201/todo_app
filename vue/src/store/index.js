import {createStore} from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: JSON.parse(sessionStorage.USER),
      token: sessionStorage.TOKEN,
    }
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return axiosClient.post('register', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('login', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    }
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.clear();
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;

      sessionStorage.setItem('USER', JSON.stringify(userData.user));
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}
})

export default store
