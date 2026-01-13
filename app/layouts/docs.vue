<template>
  <div class="min-h-screen flex flex-col bg-base-100 w-full overflow-x-hidden">
    <!-- Header component avec menu hamburger -->
    <Header ref="headerRef" :show-mobile-menu="true" />

    <!-- Menu mobile hamburger -->
    <ClientOnly>
      <MobileMenu v-model:is-open="mobileMenuOpen" />
    </ClientOnly>

    <!-- Contenu avec sidebar (structure 3 colonnes style Laravel Zap) -->
    <div class="flex flex-1 w-full max-w-[var(--ui-container)] mx-auto mt-8 px-4 lg:px-8 xl:px-0">
      <!-- Colonne 1 : Sidebar navigation (gauche) - Masquée sur mobile/tablette -->
      <aside class="hidden lg:block w-64 border-r border-base-300 sticky top-24">
        <nav class="menu p-4">
          <DocsNavigation />
        </nav>
      </aside>

      <!-- Colonne 2 : Contenu principal (centre) - 100% largeur sur mobile -->
      <main class="flex-1 w-full md:p-8">
        <div class="max-w-4xl mx-auto w-full">
          <!-- Contenu markdown avec font-size réduite pour mobile -->
          <article class="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-headings:text-base-content prose-p:text-base-content/80 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-base-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-base-300">
            <slot />
          </article>

          <!-- Séparateur et liens édition (style Laravel Zap) -->
          <div class="flex flex-col sm:flex-row items-center justify-center my-8 gap-2">
            <div class="border-t border-base-300 w-full"></div>
            <div class="flex flex-wrap items-center justify-center gap-2 px-3 text-xs sm:text-sm text-base-content/60">
              <a 
                :href="editPageUrl" 
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-sm btn-ghost gap-1.5 text-base-content/60 hover:text-base-content whitespace-nowrap"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4" />
                <span class="hidden sm:inline">{{ t('docs.edit-page') }}</span>
                <span class="sm:hidden">{{ t('docs.edit-page').split(' ')[0] }}</span>
              </a>
              <span class="hidden sm:inline">or</span>
              <a 
                :href="reportIssueUrl" 
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-sm btn-ghost gap-1.5 text-base-content/60 hover:text-base-content whitespace-nowrap"
              >
                <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
                <span class="hidden sm:inline">{{ t('docs.report-issue') }}</span>
                <span class="sm:hidden">{{ t('docs.report-issue').split(' ')[0] }}</span>
              </a>
            </div>
            <div class="border-t border-base-300 w-full"></div>
          </div>

          <!-- Navigation bas de page -->
          <div v-if="prevPage || nextPage" class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-8 pt-8 border-t border-base-300">
            <NuxtLink 
              v-if="prevPage" 
              :to="prevPage.path" 
              class="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-base-300 hover:bg-base-200/50 hover:border-primary/50 transition-colors flex-1 sm:flex-none"
            >
              <Icon name="heroicons:arrow-left" class="w-4 h-4 text-base-content/70 group-hover:text-primary transition-colors flex-shrink-0" />
              <div class="flex flex-col min-w-0">
                <span class="text-xs text-base-content/50 group-hover:text-base-content/70 transition-colors">{{ t('docs.previous') }}</span>
                <span class="text-xs sm:text-sm font-medium text-base-content/70 group-hover:text-primary transition-colors truncate">{{ prevPage.title }}</span>
              </div>
            </NuxtLink>
            <div v-else class="flex-1 sm:flex-none"></div>
            
            <NuxtLink 
              v-if="nextPage" 
              :to="nextPage.path" 
              class="group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-base-300 hover:bg-base-200/50 hover:border-primary/50 transition-colors sm:ml-auto flex-1 sm:flex-none"
            >
              <div class="flex flex-col text-right min-w-0 flex-1">
                <span class="text-xs text-base-content/50 group-hover:text-base-content/70 transition-colors">{{ t('docs.next') }}</span>
                <span class="text-xs sm:text-sm font-medium text-base-content/70 group-hover:text-primary transition-colors truncate">{{ nextPage.title }}</span>
              </div>
              <Icon name="heroicons:arrow-right" class="w-4 h-4 text-base-content/70 group-hover:text-primary transition-colors flex-shrink-0" />
            </NuxtLink>
            <div v-else class="flex-1 sm:flex-none"></div>
          </div>
        </div>
      </main>

      <!-- Colonne 3 : TOC flottant (droite, desktop uniquement) -->
      <aside class="hidden xl:block w-64 p-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto">
        <div class="text-sm">
          <button 
            @click="toggleToc"
            class="font-bold mb-4 text-base-content/80 hover:text-primary transition-colors flex items-center gap-2"
          >
            <Icon name="heroicons:bars-3" class="w-4 h-4" />
              {{ t('docs.on-this-page') }}
          </button>
          <div v-if="showToc && headings && headings.length > 0" class="space-y-1">
            <TableOfContents :headings="headings" />
          </div>
          <div v-else-if="showToc" class="text-sm text-base-content/60">
            <p class="text-xs">{{ t('docs.no-headings') }}</p>
          </div>
        </div>
      </aside>
    </div>

    <!-- Footer -->
    <Footer />

    <!-- Bouton flottant TOC pour mobile/tablette -->
    <ClientOnly>
      <FloatingToc :headings="headings" />
    </ClientOnly>

    <!-- Bouton flottant recherche -->
    <ClientOnly>
      <FloatingSearchButton @open-search="handleOpenSearch" />
    </ClientOnly>

    <!-- Search Modal -->
    <ClientOnly>
      <SearchModal v-if="headerRef" v-model:is-open="headerRef.searchOpen" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
// useAppI18n est auto-importé par Nuxt depuis app/composables/
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import TableOfContents from '~/components/TableOfContents.vue'
import MobileMenu from '~/components/MobileMenu.vue'
import FloatingToc from '~/components/FloatingToc.vue'
import FloatingSearchButton from '~/components/FloatingSearchButton.vue'

const route = useRoute()
const { t, locale, getLocalizedPath } = useAppI18n()
const showToc = ref(true)
const headerRef = ref<InstanceType<typeof Header> | null>(null)
const mobileMenuOpen = ref(false)

// Synchroniser le menu mobile avec le Header
watch(() => headerRef.value?.mobileMenuOpen, (isOpen) => {
  if (isOpen !== undefined && headerRef.value) {
    mobileMenuOpen.value = isOpen
  }
}, { immediate: true })

// Synchroniser dans l'autre sens - mettre à jour le Header quand le menu change
watch(mobileMenuOpen, (isOpen) => {
  if (headerRef.value) {
    // Utiliser nextTick pour s'assurer que la référence est mise à jour
    nextTick(() => {
      if (headerRef.value) {
        headerRef.value.mobileMenuOpen = isOpen
      }
    })
  }
})

// Utiliser useDocsPageState pour accéder aux états de manière synchrone
// useState est appelé de manière synchrone au niveau du setup dans useDocsPageState
// Les valeurs retournées sont déjà des computed réactifs
const { prevPage, nextPage, headings } = useDocsPageState()

const toggleToc = () => {
  showToc.value = !showToc.value
}

const handleOpenSearch = () => {
  if (headerRef.value) {
    headerRef.value.openSearch()
  }
}

const editPageUrl = computed(() => {
  // Générer l'URL GitHub pour éditer la page
  let path = route.path.replace('/docs', '').replace('/fr/docs', '')
  if (!path.startsWith('/')) {
    path = '/' + path
  }
  const locale = route.path.startsWith('/fr') ? 'fr' : 'en'
  // Le repository de la documentation est fne-client-docs
  return `https://github.com/neocodesupport/fne-client-docs/edit/main/content/${locale}${path}.md`
})

const reportIssueUrl = computed(() => {
  // Générer l'URL GitHub Issues pour le repository du package (fne-client)
  return `https://github.com/neocodesupport/fne-client/issues/new`
})
</script>
