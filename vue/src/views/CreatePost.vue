<template>
  <PageComponent title="Create post">
    <template v-slot:header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl tracking-tight font-bold text-gray-900">
          {{ post.id ? post.title : 'Create post' }}
        </h1>
      </div>
    </template>
    <form @submit.prevent="savePost">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">

          <!-- Image -->
          <div>
            <label for="" class="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div class="mt-1 flex items-center">
              <img v-if="post.image_url"
                   :src="post.image_url"
                   :alt="post.title"
                   class="w-64 h-48 object-cover"
              />
              <span v-else class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
              </span>

              <button type="button" class="relative overflow-hidden ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <input type="file"
                       @change="onImageChoose"
                       class="absolute right-0 left-0 top-0 bottom-0 opacity-0">
                Change
              </button>
            </div>
          </div>
          <!-- /Image -->

          <!-- Title -->
          <div>
            <lable for="title" class="block text-sm font-medium text-gray-700">
              Title
            </lable>
            <input type="text"
                   name="title"
                   id="title"
                   v-model="post.title"
                   autocomplete="post_title"
                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
          </div>
          <!-- /Title -->

          <!-- Short text -->
          <div>
            <lable for="title" class="block text-sm font-medium text-gray-700">
              Short text
            </lable>
            <div class="mt-1">
              <textarea
                id="short_text"
                name="short_text"
                rows="3"
                v-model="post.short_text"
                autocomplete="short_text"
                class="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Describe post"
              />
            </div>
          </div>
          <!-- /Short text -->

          <!-- Long text -->
          <div>
            <lable for="title" class="block text-sm font-medium text-gray-700">
              Long text
            </lable>
            <div class="mt-1">
              <editor v-model="post.long_text" />
            </div>
          </div>
          <!-- /Long text -->

          <!-- Status -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="status"
                name="status"
                type="checkbox"
                v-model="post.status"
                class=""
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700">
                Active
              </label>
            </div>
          </div>
          <!-- /Status -->

          <div class="px-4 py-3 bg-gray-50 rounded-md text-right sm:px-6">
            <button type="submit"
                    @submit="savePost"
                    class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script>
import NProgress from "nprogress/nprogress.js";
import 'nprogress/nprogress.css'
import { useToast } from "vue-toastification";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import router from "../router/index.js";
import {ref} from "vue";
import StarterKit from '@tiptap/starter-kit'
import Editor from "../components/Editor.vue";

export default {
  components: {
    Editor,
    PageComponent
  },

  computed: {
    post: {
      get() {
        return this.$store.state.currentPost.data;
      }
    }
  },

  watch: {
    post (newVal, oldVal) {
      this.post = {
        ...JSON.parse(JSON.stringify(newVal)),
        status: newVal.status !== 'draft',
      }
    }
  },

  setup() {
    const toast = useToast();
    const initialData = ref("hello world!");

    if (router.currentRoute.value.params.slug) {
      store.dispatch('getPost', router.currentRoute.value.params.slug);
    } else {
      store.dispatch('clearCurrentPost');
    }

    return { toast, initialData };
  },

  methods: {
    onImageChoose(ev) {
      const file = ev.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.post.image = reader.result;

        this.post.image_url = reader.result;
      };
      reader.readAsDataURL(file);
    },
    savePost() {
      NProgress.start();
      store.dispatch('savePost', this.post)
        .then(() => {
          if (router.currentRoute.value.params.slug) {
            this.toast.success('Post successfully updated!');
          } else {
            this.toast.success('Post successfully created!');
          }
        })
        .catch(err => {
          this.toast.error(err.response.data.message);
        });
      NProgress.done();
    },
  }
}
</script>

