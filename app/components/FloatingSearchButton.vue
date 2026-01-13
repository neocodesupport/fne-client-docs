<template>
  <button
    @click="openSearch"
    class="fixed bottom-20 right-6 z-[140] xl:hidden btn btn-primary !rounded-full !h-10 !w-10 p-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
    :aria-label="t('header.search-aria')"
  >
    <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
const { t } = useAppI18n()

const emit = defineEmits<{
  'open-search': []
}>()

const openSearch = () => {
  emit('open-search')
}
</script>
