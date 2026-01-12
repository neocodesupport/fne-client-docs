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
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 class="text-3xl sm:text-4xl font-bold text-base-content">
          {{ title }}
        </h1>
        
        <!-- Boutons actions -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button
            @click="copyPageUrl"
            class="btn btn-sm btn-ghost gap-1.5"
            :class="{ 'btn-success': copied }"
            :title="copied ? 'Copié !' : 'Copier la page'"
          >
            <Icon 
              :name="copied ? 'heroicons:check' : 'heroicons:clipboard-document'" 
              class="w-4 h-4" 
            />
            <span class="hidden sm:inline">Copier la page</span>
          </button>
        </div>
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



