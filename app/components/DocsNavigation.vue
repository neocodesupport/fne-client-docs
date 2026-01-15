<template>
  <nav class="menu">
    <template v-for="section in navigation" :key="section.titleKey">
      <li class="menu-title">
        <span>{{ t(section.titleKey) }}</span>
      </li>
      <li v-for="item in section.items" :key="item.path">
        <NuxtLink 
          :to="getLocalizedPath(locale, item.path)" 
          :class="{
            'active': isActive(item.path),
            'bg-primary/10 text-primary font-semibold border-l-4 border-primary': isActive(item.path)
          }"
          class="transition-colors duration-200 hover:bg-base-200 rounded-md px-3 py-2 mb-1 md:min-w-48"
        >
          {{ t(item.titleKey) }}
        </NuxtLink>
      </li>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t, locale, getLocalizedPath } = useAppI18n()

const navigation = computed(() => [
  {
    titleKey: 'nav.getting-started',
    items: [
      { titleKey: 'nav.getting-started.introduction', path: '/docs/getting-started/introduction' },
      { titleKey: 'nav.getting-started.installation', path: '/docs/getting-started/installation' },
      { titleKey: 'nav.getting-started.configuration', path: '/docs/getting-started/configuration' },
      { titleKey: 'nav.getting-started.quick-start', path: '/docs/getting-started/quick-start' }
    ]
  },
  {
    titleKey: 'nav.guides',
    items: [
      { titleKey: 'nav.guides.invoices', path: '/docs/guides/invoices' },
      { titleKey: 'nav.guides.purchases', path: '/docs/guides/purchases' },
      { titleKey: 'nav.guides.refunds', path: '/docs/guides/refunds' },
      { titleKey: 'nav.guides.mapping', path: '/docs/guides/mapping' },
      { titleKey: 'nav.guides.error-handling', path: '/docs/guides/error-handling' },
      { titleKey: 'nav.guides.cache', path: '/docs/guides/cache' },
      { titleKey: 'nav.guides.logging', path: '/docs/guides/logging' },
      { titleKey: 'nav.guides.i18n', path: '/docs/guides/i18n' },
      { titleKey: 'nav.guides.certification-storage', path: '/docs/guides/certification-storage' }
    ]
  },
  {
    titleKey: 'nav.api-reference',
    items: [
      { titleKey: 'nav.api.fne-client', path: '/docs/api-reference/fne-client' },
      { titleKey: 'nav.api.invoice-service', path: '/docs/api-reference/invoice-service' },
      { titleKey: 'nav.api.purchase-service', path: '/docs/api-reference/purchase-service' },
      { titleKey: 'nav.api.refund-service', path: '/docs/api-reference/refund-service' },
      { titleKey: 'nav.api.dtos', path: '/docs/api-reference/dtos' },
      { titleKey: 'nav.api.enums', path: '/docs/api-reference/enums' },
      { titleKey: 'nav.api.certification-storage', path: '/docs/api-reference/certification-storage' },
      { titleKey: 'nav.api.fne-certification-model', path: '/docs/api-reference/fne-certification-model' }
    ]
  },
  {
    titleKey: 'nav.examples',
    items: [
      { titleKey: 'nav.examples.basic', path: '/docs/examples/basic' },
      { titleKey: 'nav.examples.advanced', path: '/docs/examples/advanced' },
      { titleKey: 'nav.examples.use-cases', path: '/docs/examples/use-cases' }
    ]
  },
  {
    titleKey: 'nav.advanced',
    items: [
      { titleKey: 'nav.advanced.features', path: '/docs/advanced/features' },
      { titleKey: 'nav.advanced.troubleshooting', path: '/docs/advanced/troubleshooting' }
    ]
  }
])

const isActive = (path: string) => {
  const currentPath = route.path
  const currentLocale = locale.value
  
  // Obtenir le chemin localisé pour l'item avec la locale actuelle
  const localizedItemPath = getLocalizedPath(currentLocale, path)
  
  // Normaliser les chemins pour la comparaison (enlever les trailing slashes)
  const normalizePath = (p: string) => {
    return p.replace(/\/$/, '') || '/'
  }
  
  const normalizedCurrentPath = normalizePath(currentPath)
  const normalizedItemPath = normalizePath(localizedItemPath)
  
  // Comparer les chemins normalisés exactement
  if (normalizedCurrentPath === normalizedItemPath) {
    return true
  }
  
  // Vérifier si le chemin actuel est un sous-chemin de l'item (pour les pages imbriquées)
  // Mais seulement si ce n'est pas la racine
  if (normalizedItemPath !== '/' && normalizedCurrentPath.startsWith(normalizedItemPath + '/')) {
    return true
  }
  
  return false
}
</script>
