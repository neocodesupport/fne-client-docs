<template>
  <div class="mockup-code w-full">
    <pre
      v-for="(line, index) in codeLines"
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
  prefix?: string | number
  class?: string
}

interface Props {
  code: string
  language?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  language: 'php',
  showLineNumbers: true,
  highlightLines: () => []
})

const codeLines = computed(() => {
  const lines = props.code.split('\n')
  return lines.map((line, index) => {
    const lineNumber = index + 1
    const isHighlighted = props.highlightLines.includes(lineNumber)
    
    return {
      code: line,
      prefix: props.showLineNumbers ? lineNumber : undefined,
      class: isHighlighted ? 'bg-warning text-warning-content' : ''
    }
  })
})
</script>

