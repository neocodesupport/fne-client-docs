<template>
  <!-- Fallback pour les pages markdown sans fichier Vue spécifique -->
  <div>
    <!-- Header de page style Laravel Zap -->
    <div v-if="page" class="relative border-b border-base-300 pb-8 mb-8">
      <!-- Breadcrumb -->
      <div v-if="sectionName" class="mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5">
        <Icon name="heroicons:folder" class="w-4 h-4" />
        {{ sectionName }}
      </div>
      
      <!-- Titre et actions -->
      <div class="flex flex-row items-center gap-3 flex-wrap">
        <h1 class="text-3xl sm:text-4xl font-bold text-base-content flex-1 min-w-0">
          {{ page.title }}
        </h1>
        
        <!-- Page Actions Dropdown -->
        <PageActionsDropdown />
      </div>
      
      <!-- Description -->
      <p v-if="page.description" class="text-lg text-base-content/70 mt-4">
        {{ page.description }}
      </p>
    </div>
    
    <!-- Contenu markdown stylisé -->
    <div v-if="page" class="mt-8 pb-24 space-y-12">
      <div 
        ref="contentRef"
        class="prose prose-lg max-w-none 
               prose-headings:font-bold prose-headings:text-base-content
               prose-headings:scroll-mt-[calc(45px+var(--ui-header-height))]
               prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:mt-0
               prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:relative
               prose-h2:group prose-h2:lg:ps-2 prose-h2:lg:-ms-2
               prose-h3:text-xl prose-h3:font-bold prose-h3:mt-8 prose-h3:mb-4 prose-h3:relative
               prose-h3:group prose-h3:lg:ps-2 prose-h3:lg:-ms-2
               prose-h4:text-lg prose-h4:font-bold prose-h4:mt-6 prose-h4:mb-3 prose-h4:relative
               prose-h4:group prose-h4:lg:ps-2 prose-h4:lg:-ms-2
               prose-p:text-base-content/80 prose-p:leading-7 prose-p:my-5
               prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:border-b prose-a:border-transparent hover:prose-a:border-primary
               prose-strong:text-base-content prose-strong:font-bold
               prose-code:text-primary prose-code:bg-base-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:font-medium
               prose-pre:bg-base-200 prose-pre:rounded-md prose-pre:px-4 prose-pre:py-3 prose-pre:overflow-x-auto prose-pre:my-5 prose-pre:border prose-pre:border-base-300 prose-pre:font-mono prose-pre:text-sm/6
               prose-pre:group prose-pre:relative
               prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-base-content/70
               prose-ul:list-disc prose-ul:ml-6 prose-ul:my-5 prose-ul:marker:text-primary
               prose-ol:list-decimal prose-ol:ml-6 prose-ol:my-5
               prose-li:my-1.5 prose-li:ps-1.5 prose-li:leading-7 prose-li:text-base-content/80
               prose-table:w-full prose-table:border-collapse prose-table:my-5
               prose-th:border prose-th:border-base-300 prose-th:bg-base-200 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-bold
               prose-td:border prose-td:border-base-300 prose-td:px-4 prose-td:py-2
               prose-img:rounded-lg prose-img:shadow-lg prose-img:my-4
               prose-hr:border-base-300"
      >
        <ContentRenderer :value="page" />
      </div>
    </div>
    
    <div v-else-if="pending" class="text-center py-20">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
    
    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold mb-4">Page non trouvée</h1>
      <p class="text-base-content/60 mb-2">Route: {{ route.path }}</p>
      <p class="text-base-content/60 mb-2">Slug: {{ slug }}</p>
      <NuxtLink to="/docs/getting-started/introduction" class="btn btn-primary">
        Retour à la documentation
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
// Utiliser useI18n de @nuxtjs/i18n
const { locale } = useI18n()
// Utiliser useAppI18n pour les traductions
const { t } = useAppI18n()
const contentRef = ref<HTMLElement | null>(null)

// Construire le slug à partir de la route
const slug = computed(() => {
  let path = route.path
  
  // Si on est sur /fr/docs/*, retirer /fr/docs
  if (path.startsWith('/fr/docs')) {
    path = path.replace('/fr/docs', '')
  }
  // Si on est sur /docs/*, retirer /docs
  else if (path.startsWith('/docs')) {
    path = path.replace('/docs', '')
  }
  // Si on est sur /fr/*, retirer /fr
  else if (path.startsWith('/fr')) {
    path = path.replace('/fr', '')
  }
  
  // S'assurer qu'on a un slash initial
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  
  return path || '/'
})

// Récupérer le contenu avec queryCollection selon la locale
const { data: page, pending } = await useAsyncData(`content-${route.path}`, async () => {
  const currentLocale = locale.value || 'fr' // Utiliser 'fr' comme défaut puisque defaultLocale est 'fr'
  const contentSlug = slug.value
  
  if (import.meta.dev) {
    console.log('[Content] Locale:', currentLocale)
    console.log('[Content] Slug:', contentSlug)
    console.log('[Content] Route path:', route.path)
  }
  
  try {
    // Construire le nom de la collection basé sur la locale
    const collectionName = `content_${currentLocale}` as keyof Collections
    
    if (import.meta.dev) {
      console.log('[Content] Collection name:', collectionName)
    }
    
    // Lister tous les fichiers pour debug (une seule fois)
    if (import.meta.dev) {
      try {
        const allFiles = await queryCollection(collectionName).all()
        console.log('[Content] All files in collection:', allFiles.length)
        if (allFiles.length > 0) {
          const paths = allFiles.slice(0, 10).map((f: any) => {
            const path = f._path || f.path || 'unknown'
            return path
          })
          console.log('[Content] Sample file paths:', paths)
          console.log('[Content] Looking for slug:', contentSlug)
          console.log('[Content] Looking for slug (no slash):', contentSlug.startsWith('/') ? contentSlug.slice(1) : contentSlug)
        }
      } catch (e) {
        console.log('[Content] Could not list all files:', e)
      }
    }
    
    // Essayer différentes variantes du chemin
    let result = null
    
    // Les chemins dans la collection incluent le préfixe de locale (ex: /fr/guides/invoices)
    // Il faut donc ajouter le préfixe de locale au slug
    const slugWithLocale = `/${currentLocale}${contentSlug}`
    const slugWithLocaleNoSlash = `${currentLocale}${contentSlug}`
    
    // Essayer 1: avec préfixe de locale et slash initial
    try {
      result = await queryCollection(collectionName).path(slugWithLocale).first()
      if (import.meta.dev && result) {
        console.log('[Content] ✅ Found with .path() (with locale prefix):', slugWithLocale)
      }
    } catch (e) {
      if (import.meta.dev) {
        console.log('[Content] ❌ .path() (with locale prefix) failed')
      }
    }
    
    // Essayer 2: avec préfixe de locale sans slash initial
    if (!result) {
      try {
        result = await queryCollection(collectionName).path(slugWithLocaleNoSlash).first()
        if (import.meta.dev && result) {
          console.log('[Content] ✅ Found with .path() (with locale, no leading slash):', slugWithLocaleNoSlash)
        }
      } catch (e) {
        if (import.meta.dev) {
          console.log('[Content] ❌ .path() (with locale, no leading slash) failed')
        }
      }
    }
    
    // Essayer 3: sans préfixe de locale (fallback)
    if (!result) {
      try {
        result = await queryCollection(collectionName).path(contentSlug).first()
        if (import.meta.dev && result) {
          console.log('[Content] ✅ Found with .path() (no locale prefix):', contentSlug)
        }
      } catch (e) {
        if (import.meta.dev) {
          console.log('[Content] ❌ .path() (no locale prefix) failed')
        }
      }
    }
    
    // Essayer 4: sans préfixe de locale et sans slash initial
    if (!result && contentSlug.startsWith('/')) {
      const slugWithoutSlash = contentSlug.slice(1)
      try {
        result = await queryCollection(collectionName).path(slugWithoutSlash).first()
        if (import.meta.dev && result) {
          console.log('[Content] ✅ Found with .path() (no slash):', slugWithoutSlash)
        }
      } catch (e) {
        if (import.meta.dev) {
          console.log('[Content] ❌ .path() (no slash) failed')
        }
      }
    }
    
    if (import.meta.dev) {
      console.log('[Content] Final result:', result ? '✅ Found' : '❌ Not found')
      if (result) {
        console.log('[Content] Found page:', (result as any)._path || (result as any).path)
      }
    }
    
    // Fallback vers l'anglais si pas trouvé et qu'on n'est pas déjà en anglais
    if (!result && currentLocale !== 'en') {
      if (import.meta.dev) {
        console.log('[Content] Fallback to content_en')
      }
      try {
        const slugWithoutSlash = contentSlug.startsWith('/') ? contentSlug.slice(1) : contentSlug
        result = await queryCollection('content_en').path(slugWithoutSlash).first() ||
                 await queryCollection('content_en').path(contentSlug).first()
      } catch (e) {
        // Ignore fallback errors
      }
    }
    
    // Fallback vers le français si pas trouvé et qu'on est en anglais
    if (!result && currentLocale === 'en') {
      if (import.meta.dev) {
        console.log('[Content] Fallback to content_fr')
      }
      try {
        const slugWithoutSlash = contentSlug.startsWith('/') ? contentSlug.slice(1) : contentSlug
        result = await queryCollection('content_fr').path(slugWithoutSlash).first() ||
                 await queryCollection('content_fr').path(contentSlug).first()
      } catch (e) {
        // Ignore fallback errors
      }
    }
    
    return result || null
  } catch (err) {
    console.error('[Content] Error fetching content:', err)
    if (import.meta.dev) {
      console.error('[Content] Error details:', err)
      console.error('[Content] Error stack:', err instanceof Error ? err.stack : 'No stack')
    }
    return null
  }
}, {
  watch: [locale, () => route.path], // Refetch quand la locale ou la route change
})

// Définir le layout docs pour toutes les pages de documentation
definePageMeta({
  layout: 'docs'
})

// Calculer les pages précédente et suivante
const prevPage = computed(() => {
  if (route.path === '/docs/getting-started/installation') {
    return { title: 'Introduction', path: '/docs/getting-started/introduction' }
  }
  return null
})

const nextPage = computed(() => {
  if (route.path === '/docs/getting-started/introduction') {
    return { title: 'Installation', path: '/docs/getting-started/installation' }
  }
  return null
})

// Extraire les headings pour la table des matières
const headings = ref<Array<{ id: string; text: string; depth: number }>>([])

// Fonction pour remplacer les blocs de code Shiki par CodeHighlight
const enrichCodeBlocks = () => {
  if (!contentRef.value || !import.meta.client) return
  
  // Chercher tous les blocs pre avec des classes Shiki ou language-*
  const codeBlocks = contentRef.value.querySelectorAll('pre.shiki, pre[class*="language-"]:not([data-replaced])')
  
  codeBlocks.forEach((pre) => {
    // Marquer comme remplacé
    pre.setAttribute('data-replaced', 'true')
    
    // Extraire le code et le langage
    const codeElement = pre.querySelector('code')
    if (!codeElement) return
    
    const codeText = codeElement.textContent || ''
    
    // Détecter le langage depuis les classes (enlever les classes Shiki)
    let language = 'php'
    const classList = Array.from(pre.classList)
    const codeClassList = Array.from(codeElement.classList)
    
    // Filtrer les classes Shiki et garder seulement language-*
    const allClasses = [...classList, ...codeClassList]
      .filter(cls => !cls.includes('shiki') && !cls.includes('github') && !cls.includes('material-theme'))
      .join(' ')
    
    const langMatch = allClasses.match(/language-(\w+)/)
    if (langMatch && langMatch[1]) {
      language = langMatch[1].toLowerCase()
    }
    
    // Créer un wrapper pour CodeHighlight
    const wrapper = document.createElement('div')
    wrapper.className = 'my-5'
    
    // Remplacer le pre par le wrapper
    const parent = pre.parentNode
    if (!parent) return
    
    parent.replaceChild(wrapper, pre)
    
    // Créer une instance Vue de CodeHighlight
    import('vue').then(({ createApp }) => {
      import('~/components/CodeHighlight.vue').then((CodeHighlightModule) => {
        const CodeHighlight = CodeHighlightModule.default
        
        const app = createApp(CodeHighlight, {
          code: codeText,
          language: language,
          showLineNumbers: !['bash', 'sh', 'shell', 'env'].includes(language)
        })
        
        app.mount(wrapper)
      })
    })
  })
}

// Fonction pour extraire et enrichir les headings
const extractHeadings = () => {
  if (!contentRef.value) {
    headings.value = []
    return
  }
  
  // Enrichir les blocs de code
  enrichCodeBlocks()
  
  // Extraire les headings depuis le DOM rendu
  const headingElements = contentRef.value.querySelectorAll('h2, h3, h4')
  
  headings.value = Array.from(headingElements).map((element, index) => {
    // Générer un ID si absent
    let id = element.id
    if (!id) {
      const text = element.textContent?.trim() || ''
      id = text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || `heading-${index}`
      element.id = id
    }
    
    // Ajouter la classe group pour le hover
    if (!element.classList.contains('group')) {
      element.classList.add('group')
    }
    
    // Ajouter le padding pour le lien d'ancrage
    if (!element.classList.contains('lg:ps-2')) {
      element.classList.add('lg:ps-2', 'lg:-ms-2')
    }
    
    // Ajouter le lien d'ancrage si absent
    if (!element.querySelector('a.heading-anchor')) {
      const link = document.createElement('a')
      link.href = `#${id}`
      link.className = 'heading-anchor group-hover:opacity-100 group-focus:opacity-100 opacity-0 absolute -left-8 top-1 p-1 bg-base-200 hover:text-primary rounded-md hidden lg:flex text-base-content/60 transition'
      link.setAttribute('aria-label', `Lien vers ${element.textContent?.trim()}`)
      link.innerHTML = '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>'
      link.onclick = (e) => {
        e.preventDefault()
        // Calculer l'offset pour positionner l'élément sous le header fixe
        const headerHeight = 96 // Hauteur totale du header avec marges
        const extraOffset = 16 // Marge supplémentaire
        const totalOffset = headerHeight + extraOffset
        
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - totalOffset
        
        window.scrollTo({ 
          top: offsetPosition, 
          behavior: 'smooth' 
        })
        history.pushState(null, '', `#${id}`)
      }
      const htmlElement = element as HTMLElement
      htmlElement.style.position = 'relative'
      element.appendChild(link)
    }
    
    return {
      id,
      text: element.textContent?.trim() || '',
      depth: parseInt(element.tagName.charAt(1))
    }
  }).filter(h => h.text.length > 0)
}

// Observer les changements du contenu
watch(() => page.value, () => {
  nextTick(() => {
    extractHeadings()
  })
}, { immediate: true })

// Observer aussi les changements du DOM
watch(() => contentRef.value, () => {
  nextTick(() => {
    extractHeadings()
  })
}, { immediate: true })

// Calculer le nom de la section depuis le chemin
const sectionName = computed(() => {
  const path = route.path
  if (path.includes('/getting-started')) return 'Getting Started'
  if (path.includes('/guides')) return 'Guides'
  if (path.includes('/api-reference')) return 'API Reference'
  if (path.includes('/examples')) return 'Examples'
  if (path.includes('/advanced')) return 'Advanced'
  return null
})

// Note: copyPageUrl supprimé, maintenant géré par PageActionsDropdown

// Fournir les données aux composants enfants via useDocsPage
const { setPrevPage, setNextPage, setHeadings } = useDocsPage()

// Mettre à jour les valeurs quand elles changent
watch(() => prevPage.value, (value) => {
  setPrevPage(value)
}, { immediate: true })

watch(() => nextPage.value, (value) => {
  setNextPage(value)
}, { immediate: true })

watch(() => headings.value, (value) => {
  setHeadings(headings)
}, { immediate: true })
</script>
