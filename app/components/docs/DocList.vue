<template>
  <component :is="ordered ? 'ol' : 'ul'" :class="listClass">
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  ordered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  ordered: false
})

const listClass = computed(() => {
  const base = 'my-5 marker:text-primary'
  return props.ordered 
    ? `list-decimal ps-6 ${base}`
    : `list-disc ps-6 ${base}`
})
</script>

