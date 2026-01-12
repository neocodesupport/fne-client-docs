<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] px-4"
        @click.self="close"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-base-content/20 backdrop-blur-sm" @click="close"></div>
        
        <!-- Modal -->
        <div class="relative w-full max-w-2xl bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden">
          <!-- Search Input -->
          <div class="p-4 border-b border-base-300">
            <div class="flex items-center gap-3">
              <Icon name="heroicons:magnifying-glass" class="w-5 h-5 text-base-content/60 flex-shrink-0" />
              <input
                ref="searchInput"
                v-model="query"
                type="text"
                :placeholder="t('search.placeholder')"
                class="flex-1 bg-transparent border-none outline-none text-base-content placeholder:text-base-content/50"
                @keydown.esc="close"
                @keydown.down.prevent="selectNext"
                @keydown.up.prevent="selectPrevious"
                @keydown.enter.prevent="navigateToSelected"
              />
              <kbd class="kbd kbd-sm hidden sm:inline-flex">ESC</kbd>
            </div>
          </div>

          <!-- Results -->
          <div class="max-h-[60vh] overflow-y-auto">
            <div v-if="query.length < 2" class="p-8 text-center text-base-content/60">
              <Icon name="heroicons:magnifying-glass" class="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p class="text-sm">{{ t('search.type-minimum') }}</p>
            </div>
            
            <div v-else-if="isSearching" class="p-8 text-center">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>
            
            <div v-else-if="results.length === 0" class="p-8 text-center text-base-content/60">
              <Icon name="heroicons:document-magnifying-glass" class="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p class="text-sm">{{ t('search.no-results') }} "{{ query }}"</p>
            </div>
            
            <div v-else class="divide-y divide-base-300">
              <button
                v-for="(result, index) in results"
                :key="result._path"
                :class="[
                  'w-full text-left p-4 hover:bg-base-200 transition-colors',
                  { 'bg-base-200': selectedIndex === index }
                ]"
                @click="goToResult(result._path)"
                @mouseenter="selectedIndex = index"
              >
                <div class="flex items-start gap-3">
                  <Icon 
                    :name="getIconForPath(result._path)" 
                    class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" 
                  />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <span class="font-semibold text-base-content">{{ result.title || t('search.no-title') }}</span>
                      <span 
                        v-if="result.category"
                        class="badge badge-sm badge-primary/20 text-primary"
                      >
                        {{ result.category }}
                      </span>
                    </div>
                    <p 
                      v-if="result.description"
                      class="text-sm text-base-content/70 line-clamp-2"
                    >
                      {{ result.description }}
                    </p>
                    <div class="text-xs text-base-content/50 mt-1">
                      {{ formatPath(result._path) }}
                    </div>
                  </div>
                  <Icon name="heroicons:arrow-right" class="w-4 h-4 text-base-content/30 flex-shrink-0" />
                </div>
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-3 border-t border-base-300 bg-base-200/50 flex items-center justify-between text-xs text-base-content/60">
            <div class="flex items-center gap-4">
              <span class="flex items-center gap-1">
                <kbd class="kbd kbd-xs">↑</kbd>
                <kbd class="kbd kbd-xs">↓</kbd>
                <span>{{ t('search.navigate') }}</span>
              </span>
              <span class="flex items-center gap-1">
                <kbd class="kbd kbd-xs">Enter</kbd>
                <span>{{ t('search.open') }}</span>
              </span>
            </div>
            <span class="flex items-center gap-1">
              <kbd class="kbd kbd-xs">ESC</kbd>
              <span>{{ t('search.close') }}</span>
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface SearchResult {
  _path: string
  title?: string
  description?: string
  category?: string
  body?: any
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const { t } = useAppI18n()
const query = ref('')
const results = ref<SearchResult[]>([])
const isSearching = ref(false)
const selectedIndex = ref(-1)
const searchInput = ref<HTMLInputElement | null>(null)

const close = () => {
  emit('update:isOpen', false)
  query.value = ''
  results.value = []
  selectedIndex.value = -1
}

const search = async (searchQuery: string) => {
  if (searchQuery.length < 2) {
    results.value = []
    return
  }

  isSearching.value = true
  selectedIndex.value = -1

  try {
    // Utiliser l'index de recherche basé sur les pages Vue
    const { locale } = useAppI18n()
    const currentLocale = locale.value || 'en'
    const { search: searchIndex } = useSearchIndex()
    
    // Rechercher uniquement dans la locale actuelle
    const searchResults = searchIndex(searchQuery, currentLocale)
    
    // Mapper vers le format attendu
    results.value = searchResults.map((item) => ({
      _path: item._path,
      title: item.title,
      description: item.description,
      category: item.category
    }))
  } catch (error) {
    console.error('Search error:', error)
    results.value = []
  } finally {
    isSearching.value = false
  }
}

// Fonction extractTextFromBody supprimée car on n'utilise plus queryCollection

const getCategoryFromPath = (path: string): string => {
  const { locale } = useAppI18n()
  const isFrench = locale.value === 'fr'
  
  if (path.includes('/getting-started')) return isFrench ? 'Démarrage' : 'Getting Started'
  if (path.includes('/guides')) return 'Guides'
  if (path.includes('/api-reference')) return isFrench ? 'Référence API' : 'API Reference'
  if (path.includes('/examples')) return isFrench ? 'Exemples' : 'Examples'
  if (path.includes('/advanced')) return isFrench ? 'Avancé' : 'Advanced'
  return isFrench ? 'Documentation' : 'Documentation'
}

const getIconForPath = (path: string): string => {
  if (path.includes('/getting-started')) return 'heroicons:rocket-launch'
  if (path.includes('/guides')) return 'heroicons:book-open'
  if (path.includes('/api-reference')) return 'heroicons:code-bracket'
  if (path.includes('/examples')) return 'heroicons:sparkles'
  return 'heroicons:document-text'
}

const formatPath = (path: string): string => {
  // Le chemin est déjà formaté dans search(), juste nettoyer si nécessaire
  return path.replace(/\.md$/, '')
}

const selectNext = () => {
  if (selectedIndex.value < results.value.length - 1) {
    selectedIndex.value++
  }
}

const selectPrevious = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const navigateToSelected = () => {
  if (selectedIndex.value >= 0 && results.value[selectedIndex.value]) {
    goToResult(results.value[selectedIndex.value]._path)
  }
}

const goToResult = (path: string) => {
  const formattedPath = formatPath(path)
  navigateTo(formattedPath)
  close()
}

// Watch query changes
watch(query, (newQuery) => {
  search(newQuery)
})

// Focus input when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen && import.meta.client) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// Keyboard shortcut CTRL+K
onMounted(() => {
  if (import.meta.client) {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        emit('update:isOpen', !props.isOpen)
      }
      if (e.key === 'Escape' && props.isOpen) {
        close()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }
})
</script>

