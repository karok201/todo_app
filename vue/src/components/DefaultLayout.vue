<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-screen">
    <div class="h-14 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-[12.5px]">
      <div class="container mx-auto" style="max-width: 1750px;">
        <div class="flex justify-between items-center h-14 text-white">

          <div class="flex items-center">
            <div class="flex items-center">
              <!-- Main -->
              <router-link :to="{name: 'Posts'}" class="group" @mouseover="menuTip = true" @mouseleave="menuTip = false">
                <div class="text-lg bg-gradient-to-r from-pink-800 via-purple-800 to-pink-800 rounded-md px-3 py-[1px]
                cursor-pointer group-hover:from-pink-900 group-hover:via-purple-900 group-hover:to-pink-900">
                  <span class="group-hover:text-gray-50">
                    Cinemacult
                  </span>
                </div>
              </router-link>

              <!-- Top films -->
              <div class="group px-4" @mouseover="homeTip = true" @mouseleave="homeTip = false">
                <div class="py-[3.5px] cursor-pointer">
                  <span class="text-[16px] group-hover:text-gray-400">
                    Top films
                  </span>
                </div>
              </div>

              <!-- Categories -->
              <div class="group" @mouseover="homeTip = true" @mouseleave="homeTip = false">
                <div class="py-[3.5px] cursor-pointer">
                  <span class="text-[16px] group-hover:text-gray-400">
                    Categories
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="mr-56 group text-black">
            <div class="font-light relative">
              <input class="transition group-hover:placeholder-gray-500 h-7 bg-red-400 group-hover:bg-red-50 w-48
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 focus:from-indigo-300 focus:via-purple-300 focus:to-pink-300
              placeholder-amber-50 pl-9 rounded focus:outline-none focus:w-[450px] focus:bg-red-50 focus:placeholder-gray-50" placeholder="Search">
              <div class="absolute top-0 left-0 h-full flex justify-center items-center">
                <svg class="transition text-amber-50 group-hover:text-gray-300 pl-2 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </div>
            </div>
          </div>

          <div class="flex items-center font-light">
            <!-- Add task -->
            <router-link :to="{name: 'PostCreate'}" class="group" @mouseover="addTip = true" @mouseleave="addTip = false">
              <div class="py-1 px-1 group-hover:bg-pink-700 rounded mr-2 cursor-pointer">
                <svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m7-7H5" /></svg>
              </div>
              <div v-if="addTip" class="absolute top-0 right-24 h-6 px-2 rounded-md ml-2 mt-12 flex justify-center items-center bg-gray-900">
                Create new post
              </div>
            </router-link>
            <!-- User -->
            <div class="group"
                 @click="profileDropdown = !profileDropdown">
              <div class="py-[5px] px-1 rounded mr-2 cursor-pointer flex">
                <svg class="h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
            </div>
            <div v-if="profileDropdown" class="absolute top-10 right-12">
              <div class="shadow rounded-lg bg-white border w-72 text-gray-400">
                <!-- User -->
                <div class="hover:bg-gray-200 mx-1 my-1 pb-px rounded-md">
                  <a href="#" class="pl-2 flex items-center">
                    <div>
                      <svg class="h-14 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div class="pl-3 text-black">
                      <div class="font-bold">
                        {{ user.name }}
                      </div>
                      <div>
                        {{ user.email }}
                      </div>
                    </div>
                  </a>
                  <!-- Settings -->
                  <div class="pl-2 pt-1 flex justify-between my-1 mx-1 cursor-pointer rounded-md">
                    <div class="flex">
                      <span class="pl-2 pt-px text-black">Settings</span>
                    </div>
                    <div class="pr-4">
                      O then S
                    </div>
                  </div>
                </div>

                <div class="h-px bg-gray-200"></div>

                <div class="pl-3 pt-1 flex justify-between my-1 mx-1 hover:bg-gray-200 cursor-pointer rounded-md">
                  <div class="flex">
                    <span class="pl-2 pt-px text-black">Theme</span>
                  </div>
                  <div class="pr-4">
                    O then T
                  </div>
                </div>

                <div class="pl-3 pt-1 flex justify-between my-1 mx-1 hover:bg-gray-200 cursor-pointer rounded-md">
                  <div class="flex">
                    <span class="pl-2 pt-px text-black">Activity log</span>
                  </div>
                  <div class="pr-4">
                    O then S
                  </div>
                </div>

                <div class="pl-3 pt-1 flex justify-between my-1 mx-1 hover:bg-gray-200 cursor-pointer rounded-md">
                  <div class="flex">
                    <span class="pl-2 pt-px text-black">Print</span>
                  </div>
                  <div class="pr-4">
                    Ctrl P
                  </div>
                </div>

                <div class="pl-3 pt-1 flex justify-between my-1 mx-1 hover:bg-gray-200 cursor-pointer rounded-md">
                  <div class="flex">
                    <span class="pl-2 pt-px text-black">Integrations</span>
                  </div>
                </div>

                <div class="h-px bg-gray-200"></div>

                <div class="pl-3 pt-1 flex justify-between my-1 mx-1 hover:bg-gray-200 cursor-pointer rounded-md">
                  <div class="flex">
                    <span class="pl-2 pt-px text-black">Upgrade to Pro</span>
                  </div>
                </div>

                <div class="pl-3 pt-1 flex justify-between my-1 mx-1 hover:bg-gray-200 cursor-pointer rounded-md">
                  <div class="flex">
                    <span class="pl-2 pt-px text-black">Upgrade to Business</span>
                  </div>
                </div>

                <div class="pl-3 pt-1 flex justify-between my-1 mx-1 hover:bg-gray-200 cursor-pointer rounded-md">
                  <div class="flex">
                    <span class="pl-2 pt-px text-black">Download apps</span>
                  </div>
                </div>

                <div class="h-px bg-gray-200"></div>

                <div @click="logout" class="pl-3 pt-1 flex justify-between my-1 mx-1 hover:bg-gray-200 cursor-pointer rounded-md">
                  <div class="flex">
                    <span class="pl-2 pt-px text-black">Log out</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import NProgress from "nprogress/nprogress.js";
import 'nprogress/nprogress.css'
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import store from "../store/index.js";

const navigation = [
  { name: 'Dashboard', to: {name: 'Dashboard' }},
  { name: 'Posts', to: { name: 'Posts' }}
]

export default {
  components: {

  },
  computed: {
    user () {
      return store.state.user.data;
    }
  },
  data() {
    return {
      addTip: false,
      profileDropdown: false,
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter()

    function logout() {
      NProgress.start();
      store.commit('logout');
      router.push({
        name: 'Login'
      })
      NProgress.done();
    }

    return {
      navigation,
      logout
    }
  }
}
</script>
