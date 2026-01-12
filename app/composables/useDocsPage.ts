export const useDocsPage = () => {
  const route = useRoute()
  const pageKey = `docs-${route.path}`
  
  // Utiliser le même état global que useDocsPageState
  const docsPagesState = useState<Record<string, {
    prevPage: { title: string; path: string } | null
    nextPage: { title: string; path: string } | null
    headings: Array<{ id: string; text: string; depth: number }>
  }>>('docs-pages-state', () => ({}))
  
  const setPrevPage = (prevPage: { title: string; path: string } | null) => {
    if (!docsPagesState.value[pageKey]) {
      docsPagesState.value[pageKey] = {
        prevPage: null,
        nextPage: null,
        headings: []
      }
    }
    docsPagesState.value[pageKey].prevPage = prevPage
  }
  
  const setNextPage = (nextPage: { title: string; path: string } | null) => {
    if (!docsPagesState.value[pageKey]) {
      docsPagesState.value[pageKey] = {
        prevPage: null,
        nextPage: null,
        headings: []
      }
    }
    docsPagesState.value[pageKey].nextPage = nextPage
  }
  
  const setHeadings = (headings: Ref<Array<{ id: string; text: string; depth: number }>> | Array<{ id: string; text: string; depth: number }>) => {
    const headingsValue = headings instanceof Array ? headings : headings.value
    if (!docsPagesState.value[pageKey]) {
      docsPagesState.value[pageKey] = {
        prevPage: null,
        nextPage: null,
        headings: []
      }
    }
    docsPagesState.value[pageKey].headings = headingsValue
  }
  
  return {
    setPrevPage,
    setNextPage,
    setHeadings
  }
}

// Composable pour lire les états de manière synchrone (pour les layouts)
// Utilise un état global qui mappe les chemins aux valeurs
export const useDocsPageState = () => {
  const route = useRoute()
  
  // État global qui stocke toutes les données pour toutes les pages
  // Clé fixe pour éviter les problèmes de contexte
  const docsPagesState = useState<Record<string, {
    prevPage: { title: string; path: string } | null
    nextPage: { title: string; path: string } | null
    headings: Array<{ id: string; text: string; depth: number }>
  }>>('docs-pages-state', () => ({}))
  
  // Utiliser computed pour accéder aux valeurs basées sur la route actuelle
  const pageKey = computed(() => `docs-${route.path}`)
  
  const prevPage = computed(() => docsPagesState.value[pageKey.value]?.prevPage ?? null)
  const nextPage = computed(() => docsPagesState.value[pageKey.value]?.nextPage ?? null)
  const headings = computed(() => docsPagesState.value[pageKey.value]?.headings ?? [])
  
  return {
    prevPage,
    nextPage,
    headings,
    docsPagesState
  }
}