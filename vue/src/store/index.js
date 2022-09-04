import {createStore} from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: sessionStorage.USER,
      token: sessionStorage.TOKEN,
    },
    currentPost: {
      data: {},
    },
    posts: [],
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
    },
    getPost({commit}, slug) {
      commit("setCurrentPostLoading", true);
      return axiosClient
        .get(`/post/${slug}`)
        .then((res) => {
          commit("setCurrentPost", res.data);
          commit("setCurrentPostLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentPostLoading", false);
          throw err;
        });
    },
    savePost({commit}, post) {
      delete post.image_url;
      let response;

      if (post.slug) {
        response = axiosClient
          .put(`/post/${post.slug}`, post)
          .then((res) => {
            commit("setCurrentPost", res.data);
            return res
          });
      } else {
        response = axiosClient
          .post("/post", post)
          .then((res) => {
            commit("setCurrentPost", res.data);
            return res
          });
      }

      return response;
    },
    clearCurrentPost({commit}) {
      commit("clearCurrentPost");
      return true;
    }
  },
  mutations: {
    setCurrentPostLoading: (state, loading) => {
      state.currentPost.loading = loading;
    },
    setCurrentPost: (state, post) => {
      state.currentPost.data = post.data;
    },
    clearCurrentPost: (state) => {
      state.currentPost.data = {};
    },
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
