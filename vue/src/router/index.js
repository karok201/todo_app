import {createRouter, createWebHistory} from "vue-router";
import store from "../store/index.js";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Posts from "../views/Posts.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import CreatePost from "../views/CreatePost.vue";
import QuillEditor2 from "../views/QuillEditor2.vue";
import NProgress from "nprogress/nprogress.js";
import 'nprogress/nprogress.css'

const routes = [
  {
    path: '/',
    redirect: '/posts',
    component: DefaultLayout,
    meta: {requiresAuth: true},
    children: [
      {path: '/posts', name: 'Posts', component: Posts},
      {path: '/posts/create', name: 'PostCreate', component: CreatePost},
      {path: '/posts/:slug', name: 'PostUpdate', component: CreatePost},
      {path: '/editor', name: 'Editor', component: QuillEditor2}
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: {isGuest: true},
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'Login'})
  } else if (store.state.user.token && to.meta.isGuest) {
    next({name: 'Posts'});
  } else {
    next();
  }
})

router.afterEach(() => {
  NProgress.done();
});

export default router;
