<template>
  <DocPage
    title="Internationalization (i18n)"
    description="Guide for using internationalization with FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="i18n">Internationalization (i18n)</DocHeading>
    
    <DocParagraph>
      This guide shows you how to use internationalization with FNE Client for error messages and translations.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      FNE Client supports internationalization for error messages and translations. Supported languages are French (fr) and English (en).
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration</DocHeading>

    <DocParagraph>
      For Laravel / Symfony / Native PHP:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
return [
    'locale' => env('FNE_LOCALE', 'en'), // 'fr' or 'en'
];`"
    />

    <DocHeading :level="2" id="usage">Usage</DocHeading>

    <DocParagraph>
      Error messages are automatically translated according to the configured locale:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Locale = 'en'
try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    echo $e->getMessage(); // Message in English
}

// Locale = 'fr'
// Messages will be in French`"
    />

    <DocHeading :level="2" id="change-locale">Change Locale</DocHeading>

    <DocHeading :level="3" id="change-global">Globally</DocHeading>

    <DocCode
      language="php"
      :code="`// config/fne.php
'locale' => 'fr', // Change global locale`"
    />

    <DocHeading :level="3" id="change-per-call">Per Call</DocHeading>

    <DocParagraph>
      Locale is determined by global configuration. To change locale per call, you must configure the translator:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\i18n\\Translator;

$translator = new Translator('fr'); // French locale
// Use the translator in your code`"
    />

    <DocHeading :level="2" id="translated-messages">Translated Messages</DocHeading>

    <DocParagraph>
      All error messages are translated:
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>Validation</strong>: Field validation messages
      </DocListItem>
      <DocListItem>
        <strong>API</strong>: API error messages
      </DocListItem>
      <DocListItem>
        <strong>Exceptions</strong>: Exception messages
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Error Handling
        </NuxtLink> - Handle errors with translated messages
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/getting-started/configuration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Configuration
        </NuxtLink> - Configure locale
      </DocListItem>
    </DocList>

    <DocAlert type="info">
      <strong>Need help?</strong> Check out the 
      <NuxtLink to="/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
        complete documentation
      </NuxtLink> 
      or 
      <a href="https://github.com/neocodesupport/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
        open an issue
      </a> 
      on GitHub.
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
  { id: 'i18n', text: 'Internationalization (i18n)', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'configuration', text: 'Configuration', depth: 2 },
  { id: 'usage', text: 'Usage', depth: 2 },
  { id: 'change-locale', text: 'Change Locale', depth: 2 },
  { id: 'change-global', text: 'Globally', depth: 3 },
  { id: 'change-per-call', text: 'Per Call', depth: 3 },
  { id: 'translated-messages', text: 'Translated Messages', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>



