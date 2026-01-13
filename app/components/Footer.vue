<template>
  <footer class="footer bg-base-200/80 backdrop-blur-sm border-t border-base-300 p-8 mt-20">
    <div class="footer-content grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
      <div>
        <div class="flex items-center gap-2 mb-4">
          <img
              src="/logo.png"
              alt="FNE Client Logo"
              class="h-10 object-contain"
          />
        </div>
        <p class="text-sm text-base-content/70 max-w-xs">
          {{ t('footer.description') }}
        </p>
      </div>
      <div>
        <h3 class="footer-title text-base font-semibold mb-4">{{ t('footer.learn') }}</h3>
        <ul class="space-y-2">
          <li><NuxtLink :to="getLocalizedPath(locale, '/docs/getting-started/introduction')" class="link link-hover text-sm">{{ t('footer.quickstart') }}</NuxtLink></li>
          <li><NuxtLink :to="getLocalizedPath(locale, '/docs/guides')" class="link link-hover text-sm">{{ t('footer.guides') }}</NuxtLink></li>
          <li><NuxtLink :to="getLocalizedPath(locale, '/docs/api-reference')" class="link link-hover text-sm">{{ t('footer.api') }}</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h3 class="footer-title text-base font-semibold mb-4">{{ t('footer.support') }}</h3>
        <ul class="space-y-2">
          <li><a href="https://github.com/neocodesupport/fne-client" target="_blank" rel="noopener noreferrer" class="link link-hover text-sm">{{ t('footer.github') }}</a></li>
          <li><a href="https://github.com/neocodesupport/fne-client/issues" target="_blank" rel="noopener noreferrer" class="link link-hover text-sm">{{ t('footer.issues') }}</a></li>
          <li><a href="https://github.com/neocodesupport/fne-client/discussions" target="_blank" rel="noopener noreferrer" class="link link-hover text-sm">{{ t('footer.discussions') }}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-center mt-8 pt-8 border-t border-base-300/50 max-w-6xl mx-auto w-full">
      <p class="text-sm text-base-content/60 text-center">
        {{ t('footer.copyright') }} 
        <span class="text-primary font-semibold">Armel Meledje</span> (Développeur) & 
        <a href="https://neocode.ci/" target="_blank" rel="noopener noreferrer" class="text-secondary font-semibold hover:underline">Neocode</a>.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t, locale, getLocalizedPath } = useAppI18n()
</script>



