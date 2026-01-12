<template>
  <div class="mockup-code w-full" :class="bgClass">
    <pre
      v-for="(line, index) in lines"
      :key="index"
      :data-prefix="line.prefix || undefined"
      :class="line.class"
    >
<code>{{ line.code }}</code>
    </pre>
  </div>
</template>

<script setup lang="ts">
interface CodeLine {
  code: string
  prefix?: string
  class?: string
}

interface Props {
  lines: CodeLine[]
  bgClass?: string
}

withDefaults(defineProps<Props>(), {
  bgClass: ''
})
</script>

