<template>
  <div class="min-h-screen flex flex-col bg-base-100">
    <!-- Header component -->
    <Header ref="headerRef" />

    <!-- Contenu avec sidebar (structure 3 colonnes style Laravel Zap) -->
    <div class="flex flex-1 w-full max-w-[var(--ui-container)] mx-auto mt-8 px-4 lg:px-8 xl:px-0">
      <!-- Colonne 1 : Sidebar navigation (gauche) -->
      <aside class="lg:block w-64 border-r border-base-300 sticky top-24">
        <nav class="menu p-4">
          <DocsNavigation />
        </nav>
      </aside>

      <!-- Colonne 2 : Contenu principal (centre) -->
      <main class="flex-1 p-8">
        <div class="max-w-4xl mx-auto">
          <!-- Contenu markdown -->
          <article class="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-base-content prose-p:text-base-content/80 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-base-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-base-300">
            <slot />
          </article>

          <!-- Séparateur et liens édition (style Laravel Zap) -->
          <div class="flex items-center justify-center my-8">
            <div class="border-t border-base-300 w-full"></div>
            <div class="flex items-center gap-2 px-3 text-sm text-base-content/60 whitespace-nowrap">
              <a 
                :href="editPageUrl" 
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-sm btn-ghost gap-1.5 text-base-content/60 hover:text-base-content"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4" />
                {{ t('docs.edit-page') }}
              </a>
              <span>or</span>
              <a 
                :href="reportIssueUrl" 
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-sm btn-ghost gap-1.5 text-base-content/60 hover:text-base-content"
              >
                <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
                {{ t('docs.report-issue') }}
              </a>
            </div>
            <div class="border-t border-base-300 w-full"></div>
          </div>

          <!-- Navigation bas de page (style Laravel Zap) -->
          <div v-if="prevPage || nextPage" class="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
            <NuxtLink 
              v-if="prevPage" 
              :to="prevPage.path" 
              class="group block px-6 py-8 rounded-lg border border-base-300 hover:bg-base-200/50 transition-colors"
            >
              <div class="inline-flex items-center rounded-full p-1.5 bg-base-200 group-hover:bg-primary/10 ring ring-base-300 group-hover:ring-primary/50 transition mb-4">
                <Icon name="heroicons:arrow-left" class="w-5 h-5 text-base-content group-hover:text-primary transition-[color,transform] group-active:-translate-x-0.5" />
              </div>
              <p class="font-medium text-[15px] text-base-content mb-1 truncate">{{ prevPage.title }}</p>
              <p class="text-sm text-base-content/60 line-clamp-2">{{ t('docs.previous') }}</p>
            </NuxtLink>
            <div v-else></div>
            
            <NuxtLink 
              v-if="nextPage" 
              :to="nextPage.path" 
              class="group block px-6 py-8 rounded-lg border border-base-300 hover:bg-base-200/50 transition-colors text-right sm:ml-auto"
            >
              <div class="inline-flex items-center rounded-full p-1.5 bg-base-200 group-hover:bg-primary/10 ring ring-base-300 group-hover:ring-primary/50 transition mb-4 ml-auto">
                <Icon name="heroicons:arrow-right" class="w-5 h-5 text-base-content group-hover:text-primary transition-[color,transform] group-active:translate-x-0.5" />
              </div>
              <p class="font-medium text-[15px] text-base-content mb-1 truncate">{{ nextPage.title }}</p>
              <p class="text-sm text-base-content/60 line-clamp-2">{{ t('docs.next') }}</p>
            </NuxtLink>
            <div v-else></div>
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

    <!-- Search Modal -->
    <ClientOnly>
      <SearchModal v-if="headerRef" v-model:is-open="headerRef.searchOpen" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
// useAppI18n est auto-importé par Nuxt depuis app/composables/
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import TableOfContents from '~/components/TableOfContents.vue'

const route = useRoute()
const { t, locale, getLocalizedPath } = useAppI18n()
const showToc = ref(true)
const headerRef = ref<InstanceType<typeof Header> | null>(null)

// Utiliser useDocsPageState pour accéder aux états de manière synchrone
// useState est appelé de manière synchrone au niveau du setup dans useDocsPageState
// Les valeurs retournées sont déjà des computed réactifs
const { prevPage, nextPage, headings } = useDocsPageState()

const toggleToc = () => {
  showToc.value = !showToc.value
}

const copyPageUrl = () => {
  const url = window.location.href
  navigator.clipboard.writeText(url)
  // TODO: Afficher une notification de succès
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
