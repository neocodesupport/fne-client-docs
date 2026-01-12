<template>
  <button 
    type="button"
    class="btn btn-ghost btn-sm h-10 w-10 p-0"
    aria-label="Toggle dark mode"
    @click="toggleDarkMode"
  >
    <Icon 
      v-if="isDark" 
      name="heroicons:sun" 
      class="w-5 h-5 transition-all duration-300 hover:rotate-180" 
    />
    <Icon 
      v-else 
      name="heroicons:moon" 
      class="w-5 h-5 transition-all duration-300 hover:rotate-12" 
    />
  </button>
</template>

<script setup lang="ts">
const isDark = ref(false)

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dim' : 'nord'
  document.documentElement.setAttribute('data-theme', theme)
  if (import.meta.client) {
    localStorage.setItem('theme', theme)
  }
}

// Vérifier le thème au chargement (priorité: préférence système par défaut)
onMounted(() => {
  if (import.meta.client) {
    // D'abord, détecter la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const systemTheme = prefersDark ? 'dim' : 'nord'
    
    // Vérifier s'il y a un thème sauvegardé, sinon utiliser la préférence système
    const savedTheme = localStorage.getItem('theme')
    const theme = savedTheme || systemTheme
    
    isDark.value = theme === 'dim'
    document.documentElement.setAttribute('data-theme', theme)
    
    // Si aucun thème n'est sauvegardé, utiliser la préférence système comme valeur par défaut
    if (!savedTheme) {
      localStorage.setItem('theme', systemTheme)
    }
    
    // Écouter les changements de préférence système (seulement si l'utilisateur n'a pas choisi manuellement)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // Ne mettre à jour que si l'utilisateur n'a pas explicitement choisi un thème
      // (c'est-à-dire si le thème actuel correspond toujours à la préférence système)
      const currentTheme = document.documentElement.getAttribute('data-theme')
      const expectedSystemTheme = e.matches ? 'dim' : 'nord'
      
      if (currentTheme === expectedSystemTheme || !savedTheme) {
        isDark.value = e.matches
        document.documentElement.setAttribute('data-theme', expectedSystemTheme)
        localStorage.setItem('theme', expectedSystemTheme)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    
    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  }
})
</script>
