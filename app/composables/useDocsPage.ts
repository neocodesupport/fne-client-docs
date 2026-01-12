export const useDocsPage = () => {
  const route = useRoute()
  const pageKey = `docs-${route.path}`
  
  const setPrevPage = (prevPage: { title: string; path: string } | null) => {
    const state = useState(`${pageKey}-prevPage`, () => prevPage)
    state.value = prevPage
    return state
  }
  
  const setNextPage = (nextPage: { title: string; path: string } | null) => {
    const state = useState(`${pageKey}-nextPage`, () => nextPage)
    state.value = nextPage
    return state
  }
  
  const setHeadings = (headings: Ref<Array<{ id: string; text: string; depth: number }>> | Array<{ id: string; text: string; depth: number }>) => {
    const headingsValue = headings instanceof Array ? headings : headings.value
    const state = useState(`${pageKey}-headings`, () => headingsValue)
    state.value = headingsValue
    return state
  }
  
  return {
    setPrevPage,
    setNextPage,
    setHeadings
  }
}
