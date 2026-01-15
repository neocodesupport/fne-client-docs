<template>
  <header class="sticky top-4 z-[100] mt-4 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-base-100/70 backdrop-blur-sm border border-base-300/30 rounded-2xl shadow-xl shadow-base-content/5 px-6 py-2 ring-1 ring-base-300/20">
          <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <div class="flex-shrink-0">
              <NuxtLink 
                to="/" 
                class="flex items-center gap-2 group transition-all duration-300"
              >
                <img 
                  src="/logo.png" 
                  alt="FNE Client Logo" 
                  class="h-10 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </NuxtLink>
            </div>

            <!-- Search (centré) - Visible sur tablette et desktop -->
            <div class="hidden md:flex flex-1 max-w-md mx-8">
              <button 
                @click="openSearch"
                class="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-base-200/50 hover:bg-base-200 border border-base-300/50 hover:border-primary/50 transition-all duration-200 text-left text-sm text-base-content/70 hover:text-base-content"
              >
                <Icon name="heroicons:magnifying-glass" class="w-5 h-5 flex-shrink-0" />
                <span class="flex-1">{{ t('header.search') }}</span>
                <kbd class="kbd kbd-sm hidden lg:inline-flex">CTRL K</kbd>
              </button>
            </div>

            <!-- Actions droite -->
            <div class="flex items-center gap-2">
              <!-- Toggle Dark Mode -->
              <ThemeToggle />
              
              <!-- GitHub Link -->
              <a 
                href="https://github.com/neocodesupport/fne-client" 
                target="_blank"
                rel="noopener noreferrer"
                class="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg text-base-content/60 hover:text-base-content hover:bg-base-200/50 transition-all duration-200"
                :aria-label="t('header.github-aria')"
              >
                <Icon name="simple-icons:github" class="w-5 h-5" />
              </a>

              <!-- Language Toggle - Visible sur tablette et desktop -->
              <div class="hidden md:block">
              <LanguageToggle />
              </div>

              <!-- CTA Button (optionnel) -->
              <NuxtLink 
                v-if="props.showCTA"
                :to="getLocalizedPath(locale, '/docs/getting-started/introduction')" 
                class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-center no-underline border-2 border-base-content rounded-[0.625rem] shadow-[5px_5px_0px_0px] shadow-base-content bg-primary text-base-100 transition-all duration-300 cursor-pointer hover:bg-base-100 hover:text-primary hover:border-primary hover:shadow-[5px_5px_0px_0px] hover:shadow-primary active:bg-primary/80 active:text-base-100 active:shadow-none active:translate-x-[5px] active:translate-y-[5px]"
              >
                {{ t('home.cta.start') }}
              </NuxtLink>

              <!-- Menu mobile hamburger (pour pages docs) -->
              <button 
                v-if="props.showMobileMenu"
                class="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-base-content/70 hover:text-base-content hover:bg-base-200/50 transition-all duration-200" 
                @click="toggleMobileMenu"
                :aria-label="t('header.menu-aria')"
              >
                <Icon 
                  v-if="!mobileMenuOpen"
                  name="heroicons:bars-3" 
                  class="w-6 h-6" 
                />
                <Icon 
                  v-else
                  name="heroicons:x-mark" 
                  class="w-6 h-6" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// useAppI18n est auto-importé par Nuxt depuis app/composables/

interface MobileMenuItem {
  label: string
  path: string
}

interface Props {
  showCTA?: boolean
  showMobileMenu?: boolean
  mobileMenuItems?: MobileMenuItem[]
}

const props = withDefaults(defineProps<Props>(), {
  showCTA: false,
  showMobileMenu: false,
  mobileMenuItems: () => []
})

const { t, locale, getLocalizedPath } = useAppI18n()
const mobileMenuOpen = ref(false)
const searchOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const openSearch = () => {
  searchOpen.value = true
}

// Fermer le menu mobile au scroll
onMounted(() => {
  if (props.showMobileMenu) {
    const handleScroll = () => {
      if (mobileMenuOpen.value) {
        mobileMenuOpen.value = false
      }
    }
    window.addEventListener('scroll', handleScroll)
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }
})

// Exposer les fonctions et états pour utilisation dans les layouts
defineExpose({
  openSearch,
  toggleMobileMenu,
  mobileMenuOpen,
  searchOpen
})
</script>

