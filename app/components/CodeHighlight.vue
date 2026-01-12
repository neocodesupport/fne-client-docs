<template>
  <component
    :is="componentName"
    :code="code"
    :show-line-numbers="showLineNumbers"
    :highlight-lines="highlightLines"
    :typewriter="typewriter"
    :class="customClass"
    :style="customStyle"
  />
</template>

<script setup lang="ts">
import CodeBash from './code/CodeBash.vue'
import CodePHP from './code/CodePHP.vue'
import CodeEnv from './code/CodeEnv.vue'
import CodeJSON from './code/CodeJSON.vue'
import CodeHTML from './code/CodeHTML.vue'
import CodeYAML from './code/CodeYAML.vue'

interface Props {
  code: string
  language?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  typewriter?: boolean
  class?: string | string[] | Record<string, boolean>
  style?: string | Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  language: 'php',
  showLineNumbers: true,
  highlightLines: () => [],
  typewriter: false,
  class: undefined,
  style: undefined
})

const customClass = computed(() => props.class)
const customStyle = computed(() => props.style)

// Mapping des langages vers les composants spécialisés
const componentMap: Record<string, any> = {
  'bash': CodeBash,
  'sh': CodeBash,
  'shell': CodeBash,
  'php': CodePHP,
  'env': CodeEnv,
  '.env': CodeEnv,
  'properties': CodeEnv,
  'json': CodeJSON,
  'html': CodeHTML,
  'xml': CodeHTML,
  'yaml': CodeYAML,
  'yml': CodeYAML,
}

const componentName = computed(() => {
  const lang = props.language.toLowerCase()
  return componentMap[lang] || CodePHP // Fallback vers PHP par défaut
})
</script>

