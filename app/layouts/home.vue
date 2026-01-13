<template>
  <div class="min-h-screen flex flex-col bg-base-100">
    <!-- Header component -->
    <Header 
      ref="headerRef"
      :showCTA="true"
      :show-mobile-menu="true"
      :mobileMenuItems="mobileMenuItems"
    />

    <!-- Menu mobile overlay -->
    <ClientOnly>
      <Transition
        v-if="headerRef && headerRef.mobileMenuOpen"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="headerRef && headerRef.mobileMenuOpen"
          class="fixed inset-0 bg-base-100/95 backdrop-blur-lg z-40 md:hidden"
          @click="headerRef?.toggleMobileMenu"
        >
          <div 
            class="flex flex-col items-center justify-center gap-8 h-full px-4 pb-20"
            @click.stop
          >
            <NuxtLink 
              v-for="(item, index) in mobileMenuItems"
              :key="index"
              :to="getLocalizedPath(locale, item.path)" 
              class="text-xl font-medium text-base-content/70 hover:text-primary transition-colors" 
              @click="headerRef?.toggleMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
            <NuxtLink 
              :to="getLocalizedPath(locale, '/docs/getting-started/quick-start')" 
              class="inline-flex items-center gap-2 px-6 py-3 text-base font-bold text-center no-underline border-2 border-base-content rounded-[0.625rem] shadow-[5px_5px_0px_0px] shadow-base-content bg-primary text-base-100 transition-all duration-300 cursor-pointer hover:bg-base-100 hover:text-primary hover:border-primary hover:shadow-[5px_5px_0px_0px] hover:shadow-primary active:bg-primary/80 active:text-base-100 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
              @click="headerRef?.toggleMobileMenu"
            >
              {{ t('home.cta.start') }}
            </NuxtLink>
            
            <!-- Sélection de langue dans le menu mobile -->
            <div class="flex flex-col items-center gap-4 pt-4 border-t border-base-300 w-full max-w-xs">
              <span class="text-sm text-base-content/70">{{ t('nav.select-language') }}</span>
              <LanguageToggle :open-up="true" />
            </div>
          </div>
        </div>
      </Transition>
    </ClientOnly>
    
    <!-- Bouton flottant pour la recherche (mobile uniquement) -->
    <ClientOnly>
      <FloatingSearchButton 
        v-if="headerRef"
        @open-search="handleOpenSearch"
      />
    </ClientOnly>

    <!-- Search Modal -->
    <ClientOnly>
      <SearchModal v-if="headerRef" v-model:is-open="headerRef.searchOpen" />
    </ClientOnly>

    <!-- Contenu principal (sans sidebar pour la page d'accueil) -->
    <main class="flex-1">
      <slot />
    </main>

        <!-- Footer -->
        <Footer />

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
// useAppI18n est auto-importé par Nuxt depuis app/composables/
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import LanguageToggle from '~/components/LanguageToggle.vue'
import FloatingSearchButton from '~/components/FloatingSearchButton.vue'

const { t, locale, getLocalizedPath } = useAppI18n()
const headerRef = ref<InstanceType<typeof Header> | null>(null)

const mobileMenuItems = computed(() => [
  { label: t('nav.features'), path: '/#features' },
  { label: t('nav.documentation'), path: '/docs' },
  { label: t('nav.examples'), path: '/docs/examples' }
])

const handleOpenSearch = () => {
  if (headerRef.value) {
    headerRef.value.openSearch()
  }
}
</script>
