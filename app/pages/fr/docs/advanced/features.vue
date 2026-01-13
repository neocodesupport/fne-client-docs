<template>
  <DocPage
    title="Fonctionnalités (Laravel Pennant)"
    description="Guide pour utiliser les features Laravel Pennant avec FNE Client"
    section="Avancé"
  >
    <DocHeading :level="1" id="features">Fonctionnalités (Laravel Pennant)</DocHeading>
    
    <DocParagraph>
      FNE Client utilise Laravel Pennant pour gérer les modules de manière modulaire.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      Le système de features permet d'activer/désactiver des fonctionnalités de manière flexible.
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration</DocHeading>

    <DocCode
      language="php"
      :code="`// config/fne.php
'features' => [
    'enabled' => true,
    'advanced_mapping' => true,
    'batch_processing' => false,
    'webhooks' => false,
],`"
    />

    <DocHeading :level="2" id="usage">Utilisation</DocHeading>

    <DocCode
      language="php"
      :code="`use Laravel\\Pennant\\Feature;

if (Feature::active('fne:advanced-mapping')) {
    // Utiliser le mapping avancé
}`"
    />

    <DocHeading :level="2" id="next-steps">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/getting-started/configuration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Configuration avancée
        </NuxtLink> - Configuration détaillée
      </DocListItem>
    </DocList>

    <DocAlert type="info">
      <strong>Besoin d'aide ?</strong> Consultez la 
      <NuxtLink to="/fr/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
        documentation complète
      </NuxtLink> 
      ou 
      <a href="https://github.com/neocodesupport/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
        ouvrez une issue
      </a> 
      sur GitHub.
    </DocAlert>
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '~/components/docs/DocPage.vue'
import DocHeading from '~/components/docs/DocHeading.vue'
import DocCode from '~/components/docs/DocCode.vue'
import DocParagraph from '~/components/docs/DocParagraph.vue'
import DocList from '~/components/docs/DocList.vue'
import DocListItem from '~/components/docs/DocListItem.vue'
import DocInlineCode from '~/components/docs/DocInlineCode.vue'
import DocAlert from '~/components/docs/DocAlert.vue'

definePageMeta({
  layout: 'docs'
})

const headings = ref([
  { id: 'features', text: 'Fonctionnalités (Laravel Pennant)', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'configuration', text: 'Configuration', depth: 2 },
  { id: 'usage', text: 'Utilisation', depth: 2 },
  { id: 'next-steps', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


