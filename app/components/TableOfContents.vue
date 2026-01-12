<template>
  <nav class="toc">
    <ul class="space-y-1.5">
      <li 
        v-for="heading in headings" 
        :key="heading.id" 
        :class="getHeadingClass(heading.depth)"
      >
        <a 
          :href="`#${heading.id}`" 
          class="block py-1 px-2 rounded-md transition-colors duration-200 text-sm"
          :class="getLinkClass(heading.depth)"
          @click="scrollToHeading(heading.id)"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  headings: Array<{ id: string; text: string; depth: number }>
}>()

const getHeadingClass = (depth: number) => {
  const baseClass = 'toc-item'
  const indentClass = {
    2: 'ml-0',
    3: 'ml-4',
    4: 'ml-8',
    5: 'ml-12',
    6: 'ml-16'
  }[depth] || 'ml-0'
  
  return `${baseClass} ${indentClass}`
}

const getLinkClass = (depth: number) => {
  const baseClass = 'text-base-content/70 hover:text-primary hover:bg-base-200'
  const depthClass = depth === 2 
    ? 'font-semibold text-base-content' 
    : 'font-normal'
  
  return `${baseClass} ${depthClass}`
}

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    // Calculer l'offset pour positionner l'élément sous le header fixe
    // Header: h-16 (64px) + mt-4 (16px) + py-2 (16px) = ~96px
    // Ajouter un peu de marge supplémentaire pour un meilleur espacement
    const headerHeight = 96 // Hauteur totale du header avec marges
    const extraOffset = 16 // Marge supplémentaire
    const totalOffset = headerHeight + extraOffset
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - totalOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    
    // Mettre à jour l'URL sans recharger la page
    history.pushState(null, '', `#${id}`)
  }
}
</script>
