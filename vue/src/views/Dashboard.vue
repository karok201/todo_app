<template>
  <PageComponent title="Dashboard">
    <QuillEditor
      v-model="content"
      ref="myQuillEditor"
      :options="options"/>
  </PageComponent>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import PageComponent from "../components/PageComponent.vue";

export default {
  components: {
    QuillEditor,
    PageComponent
  },
  data() {
    return {
      content: '',
      yep: '',
      options: {
        debug: 'info',
        modules: {
        },
        placeholder: 'Compose an epic...',
        theme: 'snow'
      },
      delta: undefined
    }
  },
  watch: {
    content (val) {
      console.log(1)
    }
  },
  methods: {
    showText() {
      console.log(this.yep = this.$refs.myQuillEditor.getHTML())
    }
  }
}
</script>

