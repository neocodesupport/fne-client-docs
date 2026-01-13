<template>
  <!-- Overlay backdrop -->
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen"
        class="fixed inset-0 bg-base-content/50 backdrop-blur-sm z-[150] lg:hidden"
        @click="close"
      ></div>
    </Transition>
    
    <!-- Menu drawer -->
    <Transition name="slide">
      <aside 
        v-if="isOpen"
        class="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-base-100 border-r border-base-300 shadow-2xl z-[200] lg:hidden overflow-y-auto"
      >
        <div class="flex flex-col h-full">
          <!-- Header du menu -->
          <div class="flex items-center justify-between p-4 border-b border-base-300 sticky top-0 bg-base-100 z-10">
            <h2 class="text-lg font-bold text-base-content">{{ t('nav.menu-title') }}</h2>
            <button 
              @click="close"
              class="btn btn-ghost btn-sm btn-circle"
              :aria-label="t('header.close-menu')"
            >
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <!-- Navigation -->
          <nav class="flex-1 p-4 overflow-y-auto">
            <DocsNavigation />
          </nav>
          
          <!-- Footer du menu avec sélection de langue -->
          <div class="p-4 border-t border-base-300 sticky bottom-0 bg-base-100">
            <div class="flex items-center justify-between">
              <span class="text-sm text-base-content/70">{{ t('nav.select-language') }}</span>
              <LanguageToggle :open-up="true" />
            </div>
          </div>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import DocsNavigation from '~/components/DocsNavigation.vue'
import LanguageToggle from '~/components/LanguageToggle.vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

const route = useRoute()
const { t } = useAppI18n()

const close = () => {
  emit('update:isOpen', false)
}

// Fermer le menu quand la route change
watch(() => route.path, () => {
  close()
})

// Fermer avec ESC et empêcher le scroll
if (import.meta.client) {
  watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
      // Empêcher le scroll du body quand le menu est ouvert
      document.body.style.overflow = 'hidden'
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close()
        }
      }
      document.addEventListener('keydown', handleEsc)
      
      return () => {
        document.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = ''
      }
    } else {
      document.body.style.overflow = ''
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

.slide-enter-active {
  transition: transform 0.3s ease;
}

.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
