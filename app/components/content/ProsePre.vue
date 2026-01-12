<template>
  <CodeHighlight
    v-if="codeText"
    :code="codeText"
    :language="detectedLanguage"
    :show-line-numbers="showLineNumbers"
    class="my-5"
  />
  <pre
    v-else
    v-bind="cleanAttrs"
    class="group font-mono text-sm/6 border border-base-300 bg-base-200 rounded-md px-4 py-3 whitespace-pre-wrap break-words overflow-x-auto focus:outline-none my-5"
  >
    <slot />
  </pre>
</template>

<script setup lang="ts">
import CodeHighlight from '~/components/CodeHighlight.vue'

const props = defineProps<{
  code?: string
  language?: string
}>()

const slots = useSlots()
const attrs = useAttrs()

// Extraire le code texte depuis le slot ou le DOM
const codeText = ref('')
const detectedLanguage = ref('php')
const containerRef = ref<HTMLElement | null>(null)

// Nettoyer les attrs pour enlever les classes Shiki
const cleanAttrs = computed(() => {
  const cleaned = { ...attrs }
  if (cleaned.class) {
    const classArray = Array.isArray(cleaned.class) ? cleaned.class : [cleaned.class]
    const classStr = Array.isArray(classArray) ? classArray.join(' ') : String(classArray)
    const cleanedClasses = classStr
      .split(' ')
      .filter(cls => 
        cls && 
        !cls.includes('shiki') && 
        !cls.includes('github-dark') && 
        !cls.includes('github-light') &&
        !cls.includes('shiki-themes') &&
        !cls.includes('material-theme')
      )
      .join(' ')
    cleaned.class = cleanedClasses || undefined
  }
  return cleaned
})

// Détecter le langage depuis les props ou attrs
const detectLanguage = () => {
  // Priorité 1: prop language
  if (props.language && props.language !== 'text') {
    detectedLanguage.value = props.language.toLowerCase()
    return
  }
  
  // Priorité 2: classe CSS (ex: language-php) - extraire depuis les classes nettoyées
  const classValue = cleanAttrs.value.class
  if (classValue) {
    const classStr = Array.isArray(classValue) ? classValue.join(' ') : String(classValue)
    const langMatch = classStr.match(/language-(\w+)/)
    if (langMatch && langMatch[1]) {
      let lang = langMatch[1].toLowerCase()
      // Normaliser les langages (sh, shell, zsh -> bash)
      if (lang === 'sh' || lang === 'shell' || lang === 'zsh') {
        lang = 'bash'
      }
      detectedLanguage.value = lang
      return
    }
  }
  
  // Priorité 3: détection depuis le code
  if (codeText.value) {
    const lines = codeText.value.split('\n').filter(line => line.trim())
    const firstLine = lines[0]
    if (firstLine) {
      // Détection PHP
      if (firstLine.includes('<?php') || firstLine.includes('use ') || firstLine.includes('namespace ')) {
        detectedLanguage.value = 'php'
      }
      // Détection Bash/Shell (composer, npm, yarn, git, etc.)
      else if (
        firstLine.startsWith('composer ') ||
        firstLine.startsWith('npm ') ||
        firstLine.startsWith('yarn ') ||
        firstLine.startsWith('php ') ||
        firstLine.startsWith('php artisan') ||
        firstLine.startsWith('php bin/console') ||
        firstLine.startsWith('git ') ||
        firstLine.startsWith('curl ') ||
        firstLine.startsWith('wget ') ||
        firstLine.startsWith('$') ||
        firstLine.startsWith('#') ||
        firstLine.startsWith('export ') ||
        firstLine.startsWith('./') ||
        firstLine.match(/^[a-z]+\s+(install|require|add|run|build|dev|start|stop)/i)
      ) {
        detectedLanguage.value = 'bash'
      }
      // Détection JSON
      else if (firstLine.startsWith('{') || firstLine.startsWith('[')) {
        detectedLanguage.value = 'json'
      }
      // Détection YAML
      else if (firstLine.includes(':') && (firstLine.startsWith('  ') || firstLine.startsWith('- '))) {
        detectedLanguage.value = 'yaml'
      }
    }
  }
}

onMounted(() => {
  if (!import.meta.client) return
  
  // Essayer d'extraire depuis le slot
  if (slots.default) {
    const slotContent = slots.default()
    if (slotContent && slotContent.length > 0) {
      // Extraire le texte depuis les VNodes
      const extractText = (node: any): string => {
        if (typeof node === 'string') return node
        if (node && typeof node === 'object') {
          if (node.children) {
            if (typeof node.children === 'string') return node.children
            if (Array.isArray(node.children)) {
              return node.children.map(extractText).join('')
            }
          }
          if (node.text) return node.text
          if (node.props?.innerHTML) {
            // Extraire le texte depuis le HTML Shiki
            const div = document.createElement('div')
            div.innerHTML = node.props.innerHTML
            return div.textContent || ''
          }
        }
        return ''
      }
      
      codeText.value = extractText(slotContent[0])
      detectLanguage()
    }
  }
  
  // Si pas de texte extrait, essayer depuis le DOM après le rendu
  if (!codeText.value) {
    nextTick(() => {
      // Chercher le pre dans le conteneur parent
      const preElement = containerRef.value?.querySelector('pre.shiki, pre[class*="language-"]') ||
                        document.querySelector('pre.shiki, pre[class*="language-"]')
      
      if (preElement) {
        const codeElement = preElement.querySelector('code')
        if (codeElement) {
          codeText.value = codeElement.textContent || ''
          
          // Détecter le langage depuis les classes du DOM
          const allClasses = [
            ...Array.from(preElement.classList),
            ...Array.from(codeElement.classList)
          ].join(' ')
          
          const langMatch = allClasses.match(/language-(\w+)/)
          if (langMatch && langMatch[1]) {
            let lang = langMatch[1].toLowerCase()
            // Normaliser les langages (sh, shell, zsh -> bash)
            if (lang === 'sh' || lang === 'shell' || lang === 'zsh') {
              lang = 'bash'
            }
            detectedLanguage.value = lang
          } else {
            detectLanguage()
          }
        }
      }
    })
  }
})

const showLineNumbers = computed(() => {
  return !['bash', 'sh', 'shell', 'env'].includes(detectedLanguage.value)
})
</script>

