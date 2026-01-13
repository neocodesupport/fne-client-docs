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
        <h1 class="text-3xl sm:text-4xl font-bold text-base-content flex-1 min-w-0">
          {{ title }}
        </h1>
        
        <!-- Bouton copy -->
        <button
          @click="copyPageUrl"
          class="btn btn-sm btn-ghost gap-1.5 flex-shrink-0"
          :class="{ 'btn-success': copied }"
          :title="copied ? t('code.copied') : t('docs.copy-page-title')"
        >
          <Icon 
            :name="copied ? 'heroicons:check' : 'heroicons:clipboard'" 
            class="w-4 h-4" 
          />
          <span class="hidden sm:inline">{{ copied ? t('code.copied') : t('docs.copy-page') }}</span>
          <span class="sm:hidden">{{ copied ? t('code.copied') : t('docs.copy-page').split(' ')[0] }}</span>
        </button>
      </div>
      
      <!-- Description -->
      <p v-if="description" class="text-lg text-base-content/70 mt-4">
        {{ description }}
      </p>
    </div>
    
    <!-- Contenu -->
    <div class="mt-8 pb-24 space-y-12">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description?: string
  section?: string
}

defineProps<Props>()

const route = useRoute()
const { t } = useAppI18n()
const copied = ref(false)

const copyPageUrl = () => {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}
</script>



