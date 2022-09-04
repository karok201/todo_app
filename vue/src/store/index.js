import {createStore} from "vuex";
import axiosClient from "../axios.js";

const store = createStore({
  state: {
    user: {
      data: sessionStorage.USER,
      token: sessionStorage.TOKEN,
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
    savePost({commit}, post) {
      let response;

      if (post.id) {
        response = axiosClient
          .put(`/post/${post.id}`, post)
          .then((res) => {
            commit("updatePost", res.data);
            return res
          });
      } else {
        response = axiosClient
          .post("/post", post)
          .then((res) => {
            commit("createPost", res.data);
            return res
          });
      }

      return response;
    }
  },
  mutations: {
    createPost: (state, post) => {
      state.posts = [...state.posts, post.data];
    },
    update: (state, post) => {
      state.posts = state.posts.map((p) => {
        if (p.id === post.data.id) {
          return post.data
        }
        return p;
      });
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
