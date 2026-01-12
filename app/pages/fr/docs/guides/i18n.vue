<template>
  <DocPage
    title="Internationalisation (i18n)"
    description="Guide pour utiliser l'internationalisation avec FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="i18n">Internationalisation (i18n)</DocHeading>
    
    <DocParagraph>
      Ce guide vous montre comment utiliser l'internationalisation avec FNE Client pour les messages d'erreur et les traductions.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      FNE Client supporte l'internationalisation pour les messages d'erreur et les traductions. Les langues supportées sont le français (fr) et l'anglais (en).
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration</DocHeading>

    <DocParagraph>
      Pour Laravel / Symfony / PHP Natif :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
return [
    'locale' => env('FNE_LOCALE', 'fr'), // 'fr' ou 'en'
];`"
    />

    <DocHeading :level="2" id="usage">Utilisation</DocHeading>

    <DocParagraph>
      Les messages d'erreur sont automatiquement traduits selon la locale configurée :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Locale = 'fr'
try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    echo $e->getMessage(); // Message en français
}

// Locale = 'en'
// Les messages seront en anglais`"
    />

    <DocHeading :level="2" id="change-locale">Changer la locale</DocHeading>

    <DocHeading :level="3" id="change-global">Globalement</DocHeading>

    <DocCode
      language="php"
      :code="`// config/fne.php
'locale' => 'en', // Changer la locale globale`"
    />

    <DocHeading :level="3" id="change-per-call">Par appel</DocHeading>

    <DocParagraph>
      La locale est déterminée par la configuration globale. Pour changer la locale par appel, vous devez configurer le translator :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\i18n\\Translator;

$translator = new Translator('en'); // Locale anglaise
// Utiliser le translator dans votre code`"
    />

    <DocHeading :level="2" id="translated-messages">Messages traduits</DocHeading>

    <DocParagraph>
      Tous les messages d'erreur sont traduits :
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>Validation</strong> : Messages de validation des champs
      </DocListItem>
      <DocListItem>
        <strong>API</strong> : Messages d'erreur de l'API
      </DocListItem>
      <DocListItem>
        <strong>Exceptions</strong> : Messages d'exception
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Gestion des erreurs
        </NuxtLink> - Gérez les erreurs avec messages traduits
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/getting-started/configuration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Configuration
        </NuxtLink> - Configurez la locale
      </DocListItem>
    </DocList>

    <DocAlert type="info">
      <strong>Besoin d'aide ?</strong> Consultez la 
      <NuxtLink to="/fr/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
        documentation complète
      </NuxtLink> 
      ou 
      <a href="https://github.com/neocode/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
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
  { id: 'i18n', text: 'Internationalisation (i18n)', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'configuration', text: 'Configuration', depth: 2 },
  { id: 'usage', text: 'Utilisation', depth: 2 },
  { id: 'change-locale', text: 'Changer la locale', depth: 2 },
  { id: 'change-global', text: 'Globalement', depth: 3 },
  { id: 'change-per-call', text: 'Par appel', depth: 3 },
  { id: 'translated-messages', text: 'Messages traduits', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>

