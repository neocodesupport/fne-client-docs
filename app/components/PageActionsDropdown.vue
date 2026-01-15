<template>
  <div class="relative inline-flex -space-x-px">
    <!-- Button Group: Copy Page (default) -->
    <button
      type="button"
      @click="copyPageHtml"
      :class="[
        'rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1] px-2.5 py-1.5 text-xs gap-1.5 text-base-content/60 bg-base-200 hover:bg-base-300 active:bg-base-300 focus:outline-none focus-visible:bg-base-300 disabled:bg-base-200 aria-disabled:bg-base-200',
        copiedHtml && 'bg-success/20 text-success'
      ]"
    >
      <Icon 
        :name="copiedHtml ? 'heroicons:check' : 'heroicons:clipboard-document'" 
        class="w-3.5 h-3.5 shrink-0" 
      />
      <span class="hidden sm:inline truncate">{{ t('docs.copy-page') }}</span>
      <span class="sm:hidden">{{ t('docs.copy-page').split(' ')[0] }}</span>
    </button>

    <!-- Dropdown Trigger -->
    <div ref="dropdownRef" class="dropdown dropdown-end" :class="{ 'dropdown-open': isOpen }">
      <button
        type="button"
        @click.stop="toggleDropdown"
        tabindex="0"
        class="rounded-r-md h-full font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors focus-visible:z-[1] text-xs gap-1.5 text-base-content/60 bg-base-200 hover:bg-base-300 active:bg-base-300 focus:outline-none focus-visible:bg-base-300 disabled:bg-base-200 aria-disabled:bg-base-200 p-1.5 border-l border-base-300"
        :aria-expanded="isOpen"
        aria-haspopup="menu"
      >
        <Icon name="heroicons:chevron-down" class="w-4 h-4 shrink-0" />
      </button>

      <!-- Dropdown Menu -->
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-100 shadow-lg rounded-md ring-1 ring-base-300 overflow-hidden min-w-32 mt-1 z-50"
        role="menu"
        aria-orientation="vertical"
        @click.stop
      >
        <li role="none">
          <button
            type="button"
            @click="handleCopyMarkdown"
            role="menuitem"
            :class="[
              'group relative w-full flex items-start select-none outline-none p-1.5 text-xs gap-1.5 text-base-content/80 hover:text-base-content hover:bg-base-200 transition-colors',
              copiedMarkdown && 'bg-success/10 text-success'
            ]"
          >
            <Icon 
              name="heroicons:link" 
              class="w-4 h-4 shrink-0 text-base-content/50 group-hover:text-base-content transition-colors" 
            />
            <span class="flex-1 flex flex-col text-start min-w-0 truncate">
              {{ t('docs.copy-markdown-page') }}
            </span>
          </button>
        </li>
        <li role="none">
          <a
            :href="markdownUrl"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            class="group relative w-full flex items-start select-none outline-none p-1.5 text-xs gap-1.5 text-base-content/80 hover:text-base-content hover:bg-base-200 transition-colors"
          >
            <Icon 
              name="simple-icons:markdown" 
              class="w-4 h-4 shrink-0 text-base-content/50 group-hover:text-base-content transition-colors" 
            />
            <span class="flex-1 flex justify-between text-start min-w-0 truncate">
              {{ t('docs.view-as-markdown') }}
              <Icon 
                name="heroicons:arrow-up-right" 
                class="inline-block w-3 h-3 align-top text-base-content/50" 
              />
            </span>
          </a>
        </li>
        <li role="none">
          <a
            :href="chatGptUrl"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            class="group relative w-full flex items-start select-none outline-none p-1.5 text-xs gap-1.5 text-base-content/80 hover:text-base-content hover:bg-base-200 transition-colors"
          >
            <Icon 
              name="simple-icons:openai" 
              class="w-4 h-4 shrink-0 text-base-content/50 group-hover:text-base-content transition-colors" 
            />
            <span class="flex-1 flex justify-between text-start min-w-0 truncate">
              {{ t('docs.open-in-chatgpt') }}
              <Icon 
                name="heroicons:arrow-up-right" 
                class="inline-block w-3 h-3 align-top text-base-content/50" 
              />
            </span>
          </a>
        </li>
        <li role="none">
          <a
            :href="claudeUrl"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            class="group relative w-full flex items-start select-none outline-none p-1.5 text-xs gap-1.5 text-base-content/80 hover:text-base-content hover:bg-base-200 transition-colors"
          >
            <Icon 
              name="simple-icons:anthropic" 
              class="w-4 h-4 shrink-0 text-base-content/50 group-hover:text-base-content transition-colors" 
            />
            <span class="flex-1 flex justify-between text-start min-w-0 truncate">
              {{ t('docs.open-in-claude') }}
              <Icon 
                name="heroicons:arrow-up-right" 
                class="inline-block w-3 h-3 align-top text-base-content/50" 
              />
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t, locale } = useAppI18n()
const isOpen = ref(false)
const copiedHtml = ref(false)
const copiedMarkdown = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// Computed URLs
const markdownUrl = computed(() => {
  let path = route.path.replace('/docs', '').replace('/fr/docs', '')
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  const currentLocale = route.path.startsWith('/fr') ? '' : 'en'
  // GitHub raw URL for markdown file (using refs/heads/main structure)
  return `https://raw.githubusercontent.com/neocodesupport/fne-client-docs/refs/heads/main/content/${currentLocale}${path}.md`
})

const chatGptUrl = computed(() => {
  const encodedUrl = encodeURIComponent(markdownUrl.value)
  const query = encodeURIComponent(`Read ${markdownUrl.value} so I can ask questions about it.`)
  return `https://chatgpt.com/?hints=search&q=${query}`
})

const claudeUrl = computed(() => {
  const query = encodeURIComponent(`Read ${markdownUrl.value} so I can ask questions about it.`)
  return `https://claude.ai/new?q=${query}`
})

// Toggle dropdown
const toggleDropdown = (event: MouseEvent) => {
  event.stopPropagation()
  isOpen.value = !isOpen.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (!import.meta.client) return
  
  const target = event.target as HTMLElement
  if (dropdownRef.value && !dropdownRef.value.contains(target) && isOpen.value) {
    isOpen.value = false
  }
}

// Close dropdown on escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscape)
  }
})

// Copy page HTML
const copyPageHtml = async () => {
  try {
    const article = document.querySelector('article.prose')
    if (!article) {
      console.error('Article element not found')
      return
    }
    
    const html = article.innerHTML
    await navigator.clipboard.writeText(html)
    copiedHtml.value = true
    setTimeout(() => {
      copiedHtml.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy HTML:', err)
  }
}

// Handle copy markdown and close dropdown
const handleCopyMarkdown = async () => {
  await copyMarkdown()
  isOpen.value = false
}

// Copy markdown content
const copyMarkdown = async () => {
  try {
    const currentLocale = route.path.startsWith('/fr') ? '' : 'en'
    let path = route.path.replace('/docs', '').replace('/fr/docs', '')
    if (!path.startsWith('/')) {
      path = '/' + path
    }
    
    // Fetch markdown from GitHub raw (using refs/heads/main structure)
    const rawUrl = `https://raw.githubusercontent.com/neocodesupport/fne-client-docs/refs/heads/main/content/${currentLocale}${path}.md`
    
    try {
      const response = await fetch(rawUrl)
      if (response.ok) {
        const text = await response.text()
        await navigator.clipboard.writeText(text)
        copiedMarkdown.value = true
        setTimeout(() => {
          copiedMarkdown.value = false
        }, 2000)
      } else {
        // Fallback: copy the URL if fetch fails
        await navigator.clipboard.writeText(markdownUrl.value)
        copiedMarkdown.value = true
        setTimeout(() => {
          copiedMarkdown.value = false
        }, 2000)
      }
    } catch (err) {
      console.error('Failed to copy markdown:', err)
      // Final fallback: copy the URL
      try {
        await navigator.clipboard.writeText(markdownUrl.value)
        copiedMarkdown.value = true
        setTimeout(() => {
          copiedMarkdown.value = false
        }, 2000)
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError)
      }
    }
  } catch (err) {
    console.error('Failed to copy markdown:', err)
    // Fallback: copy the markdown URL
    await navigator.clipboard.writeText(markdownUrl.value)
    copiedMarkdown.value = true
    setTimeout(() => {
      copiedMarkdown.value = false
    }, 2000)
  }
}
</script>
