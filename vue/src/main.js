import { createApp } from 'vue'
import store from "./store"
import router from "./router";
import './index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import App from './App.vue'
import { VueQuillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

const options = {
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
  newestOnTop: true
};

createApp(App)
  .use(store)
  .use(router)
  .use(Toast, options)
  .use(VueQuillEditor)
  .mount('#app')
