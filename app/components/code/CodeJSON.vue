<template>
  <div 
    class="relative mockup-code w-full code-highlight"
    :class="customClass"
    :style="customStyle"
  >
    <!-- Copy Button -->
    <button
      @click="copyToClipboard"
      class="absolute top-2 right-2 btn btn-sm btn-ghost opacity-70 hover:opacity-100 z-10"
      :class="{ 'btn-success': copied }"
      :title="copied ? t('code.copied') : t('code.copy')"
    >
      <Icon
        v-if="!copied"
        name="heroicons:clipboard-document"
        class="w-4 h-4"
      />
      <Icon
        v-else
        name="heroicons:check"
        class="w-4 h-4"
      />
    </button>
    
    <pre
      v-for="(line, index) in highlightedLines"
      :key="index"
      :data-prefix="getPrefix(index)"
      :class="line.class"
    >
<code v-html="line.html"></code>
    </pre>
  </div>
</template>

<script setup lang="ts">
interface Props {
  code: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  typewriter?: boolean
  class?: string | string[] | Record<string, boolean>
  style?: string | Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  showLineNumbers: true,
  highlightLines: () => [],
  typewriter: false,
  class: undefined,
  style: undefined
})

const customClass = computed(() => props.class)
const customStyle = computed(() => props.style)
const { t } = useAppI18n()

const highlightedLines = ref<Array<{ code: string; html: string; class: string }>>([])
const copied = ref(false)

// Fonction pour obtenir le préfixe approprié
const getPrefix = (index: number): string | number | undefined => {
  return props.showLineNumbers ? (index + 1) : undefined
}

onMounted(async () => {
  if (import.meta.client) {
    try {
      const hljs = await import('highlight.js/lib/core')
      const json = await import('highlight.js/lib/languages/json')
      const hljsCore = hljs.default || hljs
      const jsonModule = json.default || json
      hljsCore.registerLanguage('json', jsonModule)
      
      const lines = props.code.split('\n')
      const highlighted = hljsCore.highlight(props.code, { language: 'json' }).value
      const highlightedLinesArray = highlighted.split('\n')
      
      highlightedLines.value = lines.map((line, index) => {
        const lineNumber = index + 1
        const isHighlighted = props.highlightLines.includes(lineNumber)
        const highlightedHtml = highlightedLinesArray[index] || escapeHtml(line)
        
        return {
          code: line,
          html: highlightedHtml || escapeHtml(line),
          class: isHighlighted ? 'bg-warning text-warning-content' : ''
        }
      })
    } catch (e) {
      console.error('Error highlighting JSON code:', e)
      // Fallback
      const lines = props.code.split('\n')
      highlightedLines.value = lines.map((line, index) => ({
        code: line,
        html: escapeHtml(line),
        class: props.highlightLines.includes(index + 1) ? 'bg-warning text-warning-content' : ''
      }))
    }
  } else {
    // SSR
    const lines = props.code.split('\n')
    highlightedLines.value = lines.map((line, index) => ({
      code: line,
      html: escapeHtml(line),
      class: props.highlightLines.includes(index + 1) ? 'bg-warning text-warning-content' : ''
    }))
  }
})

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
    const textArea = document.createElement('textarea')
    textArea.value = props.code
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr)
    }
    document.body.removeChild(textArea)
  }
}

function escapeHtml(text: string): string {
  if (!import.meta.client) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
</script>

