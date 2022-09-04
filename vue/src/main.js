import { createApp } from 'vue'
import store from "./store"
import router from "./router";
import './index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true
};

createApp(App)
  .use(store)
  .use(router)
  .use(Toast, options)
  .mount('#app')
