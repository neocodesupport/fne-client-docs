<template>
  <div>
    <!-- Header de page style Laravel Zap -->
    <div class="relative border-b border-base-300 pb-8 mb-8">
      <!-- Breadcrumb -->
      <div v-if="section" class="mb-2.5 text-sm font-semibold text-primary flex items-center gap-1.5">
        <Icon name="heroicons:folder" class="w-4 h-4" />
        {{ section }}
      </div>
      
      <!-- Titre et actions -->
      <div class="flex flex-row items-center gap-3 flex-wrap">
        <h1 class="text-3xl sm:text-4xl font-bold text-base-content flex-1 min-w-0" :level="1" :id="headingId">
          {{ title }}
        </h1>
        
        <!-- Page Actions Dropdown -->
        <PageActionsDropdown />
      </div>
      
      <!-- Description -->
      <p v-if="description" class="text-lg text-base-content/70 mt-4">
        {{ description }}
      </p>
      <!-- DocParagraph avec subDescription généré automatiquement -->
      <p v-if="subDescription" class="my-5 leading-7 text-pretty" v-html="subDescription" />
    </div>
    
    <!-- Contenu -->
    <div class="mt-8 pb-24 space-y-12">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import DocHeading from './DocHeading.vue'
import DocParagraph from './DocParagraph.vue'
import PageActionsDropdown from '~/components/PageActionsDropdown.vue'

interface Props {
  title: string
  description?: string
  subDescription?: string
  section?: string
  headingId?: string
}

const props = defineProps<Props>()

const route = useRoute()
const { t } = useAppI18n()

// Générer l'id du heading à partir du titre si non fourni
const headingId = computed(() => {
  if (props.headingId) {
    return props.headingId
  }
  // Convertir le titre en slug pour l'id
  return props.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
})
</script>



