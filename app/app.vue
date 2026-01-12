<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Initialiser le thème au chargement de l'application (priorité: préférence système par défaut)
onMounted(() => {
  if (import.meta.client) {
    // D'abord, détecter la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const systemTheme = prefersDark ? 'dim' : 'nord'
    
    // Vérifier s'il y a un thème sauvegardé, sinon utiliser la préférence système
    const savedTheme = localStorage.getItem('theme')
    const theme = savedTheme || systemTheme
    
    document.documentElement.setAttribute('data-theme', theme)
    
    // Si aucun thème n'est sauvegardé, utiliser la préférence système comme valeur par défaut
    if (!savedTheme) {
      localStorage.setItem('theme', systemTheme)
    }
  } else {
    // SSR: utiliser le thème par défaut (nord/light)
    document.documentElement.setAttribute('data-theme', 'nord')
  }
})
</script>
