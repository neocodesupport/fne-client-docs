<template>
  <component
    :is="tag"
    :id="id"
    :class="headingClass"
  >
    <a 
      v-if="id"
      :href="`#${id}`" 
      class="heading-anchor group-hover:opacity-100 group-focus:opacity-100 opacity-0 absolute -left-8 top-1 p-1 bg-base-200 hover:text-primary rounded-md hidden lg:flex text-base-content/60 transition"
      @click.prevent="scrollToHeading"
    >
      <Icon name="heroicons:hashtag" class="w-4 h-4 shrink-0" />
    </a>
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  level?: 1 | 2 | 3 | 4
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  level: 2
})

const tag = computed(() => `h${props.level}`)

const headingClass = computed(() => {
  const base = 'relative group lg:ps-2 lg:-ms-2 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))]'
  const levelClasses = {
    1: 'text-4xl font-bold mb-8 mt-0',
    2: 'text-2xl font-bold mt-12 mb-6',
    3: 'text-xl font-bold mt-8 mb-4',
    4: 'text-lg font-bold mt-6 mb-3'
  }
  return `${base} ${levelClasses[props.level]}`
})

const scrollToHeading = () => {
  if (props.id) {
    const element = document.getElementById(props.id)
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
      history.pushState(null, '', `#${props.id}`)
    }
  }
}
</script>



