<template>
  <h4 
    :id="id" 
    class="relative text-lg text-base-content font-bold mt-6 mb-3 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))] group"
  >
    <a 
      :href="`#${id}`" 
      class="group-hover:opacity-100 group-focus:opacity-100 opacity-0 absolute -left-8 top-1 p-1 bg-base-200 hover:text-primary rounded-md hidden lg:flex text-base-content/60 transition"
      @click.prevent="scrollToHeading"
    >
      <Icon name="heroicons:hashtag" class="w-4 h-4 shrink-0" />
    </a>
    <slot />
  </h4>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string
}>()

const id = computed(() => props.id || '')

const scrollToHeading = () => {
  if (id.value) {
    const element = document.getElementById(id.value)
    if (element) {
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
      
      history.pushState(null, '', `#${id.value}`)
    }
  }
}
</script>

