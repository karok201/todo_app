<template>
 <div>
   <div class="pl-3 pt-1 flex justify-between">
     <div class="flex">
       <slot></slot>
       <span class="pl-3 mb-2">{{ title }}</span>
     </div>
     <div class="pr-4">
       {{ tip }}
     </div>
   </div>
   <div v-if="bottomLine" class="h-px bg-gray-200"></div>
 </div>
</template>

<script>
export default {
  name: "DropDownMenuItem",
  props: {
    title: String,
    tip: String,
    bottomLine: false,
    svg: String
  }
}
</script>
