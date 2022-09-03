import {createStore} from "vuex";

const store = createStore({
  state: {
    user: {
      data: {},
      token: true,
    }
  },
  getters: {},
  actions: {
    register({commit}, user) {
      return fetch(`http://localhost:8080/api/register`, {
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((res) => {
          commit("setUser", res);
          return res;
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
      state.user.data = userData.data;

      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}
})

export default store
