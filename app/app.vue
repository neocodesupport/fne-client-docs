<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Initialiser le thème et la langue au chargement de l'application
onMounted(() => {
  if (import.meta.client) {
    // === Gestion du thème ===
    // D'abord, détecter la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const systemTheme = prefersDark ? 'dim' : 'bumblebee'
    
    // Vérifier s'il y a un thème sauvegardé, sinon utiliser la préférence système
    const savedTheme = localStorage.getItem('theme')
    const theme = savedTheme || systemTheme
    
    document.documentElement.setAttribute('data-theme', theme)
    
    // Si aucun thème n'est sauvegardé, utiliser la préférence système comme valeur par défaut
    if (!savedTheme) {
      localStorage.setItem('theme', systemTheme)
    }
    
    // === Gestion de la langue ===
    // Détecter la langue depuis l'URL actuelle
    const currentPath = window.location.pathname
    const currentLocaleFromUrl = currentPath.startsWith('/fr') ? 'fr' : 'en'
    
    // Vérifier s'il y a une langue sauvegardée
    const savedLocale = localStorage.getItem('locale')
    
    // Si une langue est sauvegardée et différente de l'URL, rediriger
    if (savedLocale && savedLocale !== currentLocaleFromUrl) {
      // Construire le nouveau chemin avec la langue sauvegardée
      let newPath = currentPath
      
      if (savedLocale === 'fr') {
        // Rediriger vers la version française
        if (currentPath === '/') {
          newPath = '/fr'
        } else if (currentPath.startsWith('/docs')) {
          newPath = currentPath.replace('/docs', '/fr/docs')
        } else if (!currentPath.startsWith('/fr')) {
          newPath = `/fr${currentPath}`
        }
      } else {
        // Rediriger vers la version anglaise
        if (currentPath === '/fr') {
          newPath = '/'
        } else if (currentPath.startsWith('/fr/docs')) {
          newPath = currentPath.replace('/fr/docs', '/docs')
        } else if (currentPath.startsWith('/fr')) {
          newPath = currentPath.replace('/fr', '') || '/'
        }
      }
      
      // Rediriger seulement si le chemin est différent
      if (newPath !== currentPath) {
        router.push(newPath)
      }
    } else if (!savedLocale) {
      // Si aucune langue n'est sauvegardée, sauvegarder la langue actuelle de l'URL
      localStorage.setItem('locale', currentLocaleFromUrl)
    }
  } else {
    // SSR: utiliser le thème par défaut (bumblebee/light)
    document.documentElement.setAttribute('data-theme', 'bumblebee')
  }
})
</script>
