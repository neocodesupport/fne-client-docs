<template>
  <!-- Pour les codes inline, on garde le rendu par défaut -->
  <code v-bind="$attrs">
    <slot />
  </code>
</template>

<script setup lang="ts">
// Ce composant est pour les codes inline, pas les blocs
// Les blocs de code sont gérés par ProsePre.vue
</script>

