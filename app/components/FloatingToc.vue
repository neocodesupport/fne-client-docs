<template>
  <!-- Bouton flottant pour ouvrir le TOC -->
  <button
    v-if="headings && headings.length > 0"
    @click="toggleToc"
    class="fixed bottom-6 right-6 z-[140] xl:hidden btn btn-primary !rounded-full h-10 w-10 p-0 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
    :aria-label="t('docs.on-this-page')"
  >
    <Icon name="heroicons:bars-3-bottom-left" class="w-5 h-5" />
  </button>

  <!-- Modal TOC -->
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen"
        class="fixed inset-0 bg-base-content/50 backdrop-blur-sm z-[150] xl:hidden"
        @click="closeToc"
      ></div>
    </Transition>
    
    <Transition name="slide-up">
      <div 
        v-if="isOpen"
        class="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 shadow-2xl z-[200] xl:hidden max-h-[80vh] flex flex-col"
      >
        <!-- Header du TOC -->
        <div class="flex items-center justify-between p-4 border-b border-base-300">
          <h3 class="text-lg font-bold text-base-content flex items-center gap-2">
            <Icon name="heroicons:bars-3" class="w-5 h-5" />
            {{ t('docs.on-this-page') }}
          </h3>
          <button 
            @click="closeToc"
            class="btn btn-ghost btn-sm btn-circle"
            :aria-label="t('header.close-menu')"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>
        
        <!-- Contenu du TOC -->
        <div class="flex-1 overflow-y-auto p-4">
          <TableOfContents v-if="headings" :headings="headings" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import TableOfContents from '~/components/TableOfContents.vue'

const props = defineProps<{
  headings: Array<{ id: string; text: string; depth: number }> | null
}>()

const route = useRoute()
const { t } = useAppI18n()
const isOpen = ref(false)

const toggleToc = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeToc = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

// Fermer le TOC quand la route change
watch(() => route.path, () => {
  closeToc()
})

// Fermer avec ESC
if (import.meta.client) {
  watch(() => isOpen.value, (open) => {
    if (open) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeToc()
        }
      }
      document.addEventListener('keydown', handleEsc)
      
      return () => {
        document.removeEventListener('keydown', handleEsc)
      }
    }
  })
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: transform 0.3s ease;
}

.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
