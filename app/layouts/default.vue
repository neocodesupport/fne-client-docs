<template>
  <div class="min-h-screen flex flex-col bg-base-100">
    <!-- Header component -->
    <Header ref="headerRef" :show-mobile-menu="true" />

    <!-- Search Modal -->
    <ClientOnly>
      <SearchModal v-if="headerRef" v-model:is-open="headerRef.searchOpen" />
    </ClientOnly>

    <!-- Contenu principal avec sidebar -->
    <div class="flex flex-1 w-full max-w-[var(--ui-container)] mx-auto px-4 lg:px-8 xl:px-0">
      <!-- Sidebar fixe (visible sur desktop, masquée sur mobile) -->
      <aside 
        class="hidden lg:block w-64 bg-base-200 border-r border-base-300 overflow-y-auto sticky top-24 h-[calc(100vh-6rem)]"
      >
        <nav class="menu p-4">
          <DocsNavigation />
        </nav>
      </aside>

      <!-- Contenu principal -->
      <main class="flex-1 p-8 max-w-4xl mx-auto">
        <slot />
      </main>
    </div>

    <!-- Footer -->
    <Footer />

      </div>
    </template>

<script setup lang="ts">
import { ref } from 'vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

const headerRef = ref<InstanceType<typeof Header> | null>(null)
</script>
