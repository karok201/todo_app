<template>
  <editor v-model="content" />

  <div class="content">
    <h3>Content</h3>
    <pre><code>{{ content }}</code></pre>
  </div>
</template>

<script>
import Editor from '../components/Editor.vue'

export default {
  components: {
    Editor,
  },

  data() {
    return {
      content: '<p>A Vue.js wrapper component for tiptap to use <code>v-model</code>.</p>',
    }
  },
}
</script>
