<template>
  <div v-if="editor" class="flex space-x-2 py-2">
    <div @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" class="px-3 rounded-md border-indigo-800 border-2 cursor-pointer" :class="{ 'bg-indigo-900 text-white': editor.isActive('heading', { level: 1 }) }">
      h1
    </div>
    <div @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" class="px-3 rounded-md border-indigo-800 border-2 cursor-pointer" :class="{ 'bg-indigo-900 text-white': editor.isActive('heading', { level: 2 }) }">
      h2
    </div>
    <div @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" class="px-3 rounded-md border-indigo-800 border-2 cursor-pointer" :class="{ 'bg-indigo-900 text-white': editor.isActive('heading', { level: 3 }) }">
      h3
    </div>
    <div @click="editor.chain().focus().setParagraph().run()" class="px-3 rounded-md border-indigo-800 border-2 cursor-pointer" :class="{ 'bg-indigo-900 text-white': editor.isActive('paragraph') }">
      Paragraph
    </div>
    <div @click="editor.chain().focus().toggleBold().run()" class="px-3 rounded-md border-indigo-800 border-2 cursor-pointer" :class="{ 'bg-indigo-900 text-white': editor.isActive('bold') }">
      Bold
    </div>
    <div @click="editor.chain().focus().toggleItalic().run()" class="px-3 rounded-md border-indigo-800 border-2 cursor-pointer" :class="{ 'bg-indigo-900 text-white': editor.isActive('italic') }">
      Italic
    </div>
    <div @click="editor.chain().focus().toggleStrike().run()" class="px-3 rounded-md border-indigo-800 border-2 cursor-pointer" :class="{ 'bg-indigo-900 text-white': editor.isActive('strike') }">
      Strike
    </div>
  </div>
  <editor-content class="border-[1px] px-3 py-3 shadow-sm sm:text-sm border-gray-300 rounded-md" :editor="editor" />
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit('update:modelValue', this.editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style>
.ProseMirror:focus {
  outline: none;
}
</style>
