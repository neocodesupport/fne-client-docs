<template>
  <div class="dropdown dropdown-end" :class="{ 'dropdown-open': isOpen }">
    <div 
      tabindex="0" 
      role="button" 
      class="btn btn-ghost btn-sm gap-2"
      @click="toggleDropdown"
    >
      <Icon name="heroicons:language" class="w-5 h-5" />
      <span class="hidden sm:inline">{{ currentLocale.toUpperCase() }}</span>
      <Icon 
        name="heroicons:chevron-down" 
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </div>
    <ul 
      tabindex="0" 
      class="dropdown-content menu bg-base-100 rounded-box z-[200] w-36 p-2 gap-2 shadow-lg border border-base-300 mt-2"
    >
      <li>
        <NuxtLink 
          :to="getLocalizedPath('en')"
          class="flex items-center gap-2 rounded-lg"
          :class="{ 'bg-primary text-primary-content': currentLocale === 'en', 'hover:bg-base-200': currentLocale !== 'en' }"
          @click="selectLanguage('en')"
        >
          <span class="text-lg">🇬🇧</span>
          <span class="font-medium">English</span>
          <Icon v-if="currentLocale === 'en'" name="heroicons:check" class="w-4 h-4 ml-auto" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink 
          :to="getLocalizedPath('fr')"
          class="flex items-center gap-2 rounded-lg"
          :class="{ 'bg-primary text-primary-content': currentLocale === 'fr', 'hover:bg-base-200': currentLocale !== 'fr' }"
          @click="selectLanguage('fr')"
        >
          <span class="text-lg">🇫🇷</span>
          <span class="font-medium">Français</span>
          <Icon v-if="currentLocale === 'fr'" name="heroicons:check" class="w-4 h-4 ml-auto" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// useAppI18n est auto-importé par Nuxt depuis app/composables/

const route = useRoute()
const router = useRouter()
const isOpen = ref(false)
const { locale: currentLocale, getLocalizedPath } = useAppI18n()

const toggleDropdown = (e: MouseEvent) => {
  e.stopPropagation()
  isOpen.value = !isOpen.value
}

const selectLanguage = (targetLocale: string) => {
  const newPath = getLocalizedPath(targetLocale)
  
  // Fermer le dropdown
  isOpen.value = false
  
  // Naviguer vers le nouveau chemin si différent
  if (newPath !== route.path) {
    router.push(newPath)
  }
}

// Fermer le dropdown quand on clique en dehors
onMounted(() => {
  if (import.meta.client) {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen.value && !target.closest('.dropdown')) {
        isOpen.value = false
      }
    }
    
    // Utiliser setTimeout pour éviter que le clic sur le bouton ne ferme immédiatement
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
  }
})

// Fermer le dropdown quand la route change
watch(() => route.path, () => {
  isOpen.value = false
})

// Fermer avec ESC
onMounted(() => {
  if (import.meta.client) {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen.value) {
        isOpen.value = false
      }
    }
    document.addEventListener('keydown', handleEsc)
    onUnmounted(() => {
      document.removeEventListener('keydown', handleEsc)
    })
  }
})
</script>
