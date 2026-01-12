<template>
  <div class="my-5 group relative">
    <CodeHighlight
      :code="code"
      :language="language"
      :show-line-numbers="showLineNumbers"
    />
  </div>
</template>

<script setup lang="ts">
import CodeHighlight from '~/components/CodeHighlight.vue'

interface Props {
  code: string
  language?: string
  showLineNumbers?: boolean
}

withDefaults(defineProps<Props>(), {
  language: 'php',
  showLineNumbers: true
})
</script>



