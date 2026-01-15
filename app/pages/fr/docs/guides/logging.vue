<template>
  <DocPage
    title="Journalisation"
    description="Guide pour configurer le logging avec FNE Client"
    sub-description="Ce guide vous montre comment configurer le logging avec FNE Client pour le débogage et le suivi."
    section="Guides"
    heading-id="logging"
  >

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      FNE Client supporte le logging via l'interface PSR-3. Les logs permettent de suivre les appels API et de déboguer les problèmes.
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration</DocHeading>

    <DocHeading :level="3" id="config-laravel">Laravel</DocHeading>

    <DocParagraph>
      Le logging utilise automatiquement le système de logging Laravel :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Les logs sont automatiquement enregistrés via Log::info(), Log::error(), etc.`"
    />

    <DocHeading :level="3" id="config-symfony">Symfony</DocHeading>

    <DocParagraph>
      Pour Symfony, utilisez Monolog :
    </DocParagraph>

    <DocCode
      language="yaml"
      :code="`# config/packages/fne.yaml
services:
    Neocode\\FNE\\Contracts\\LoggerInterface:
        alias: logger`"
    />

    <DocHeading :level="3" id="config-php">PHP Natif</DocHeading>

    <DocParagraph>
      Pour PHP natif, vous pouvez implémenter votre propre logger en implémentant <DocInlineCode>LoggerInterface</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="2" id="log-levels">Niveaux de log</DocHeading>

    <DocParagraph>
      FNE Client utilise les niveaux de log suivants :
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>debug</strong> : Informations de débogage détaillées
      </DocListItem>
      <DocListItem>
        <strong>info</strong> : Informations générales (appels API réussis)
      </DocListItem>
      <DocListItem>
        <strong>warning</strong> : Avertissements (stock de stickers faible)
      </DocListItem>
      <DocListItem>
        <strong>error</strong> : Erreurs (exceptions, échecs d'appels API)
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="log-examples">Exemples de logs</DocHeading>

    <DocHeading :level="3" id="successful-api">Appel API réussi</DocHeading>

    <DocCode
      language="text"
      code="[INFO] Sending request to: /external/invoices/sign
[INFO] Request successful: {&quot;reference&quot;: &quot;9606123E25000000019&quot;, ...}"
      :show-line-numbers="false"
    />

    <DocHeading :level="3" id="api-error">Erreur API</DocHeading>

    <DocCode
      language="text"
      code="[ERROR] FNE Error: Validation failed
[ERROR] Endpoint: /external/invoices/sign
[ERROR] Exception: ValidationException"
      :show-line-numbers="false"
    />

    <DocHeading :level="2" id="custom-logger">Logger personnalisé</DocHeading>

    <DocParagraph>
      Vous pouvez implémenter votre propre logger :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Contracts\\LoggerInterface;
use Psr\\Log\\LoggerInterface as PsrLoggerInterface;

class CustomLogger implements LoggerInterface
{
    public function emergency(string $message, array $context = []): void
    {
        // Votre logique
    }
    
    // ... autres méthodes ...
}`"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Gestion des erreurs
        </NuxtLink> - Gérez les erreurs efficacement
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/advanced/troubleshooting" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Troubleshooting
        </NuxtLink> - Résolvez les problèmes
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
  { id: 'logging', text: 'Journalisation', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'configuration', text: 'Configuration', depth: 2 },
  { id: 'config-laravel', text: 'Laravel', depth: 3 },
  { id: 'config-symfony', text: 'Symfony', depth: 3 },
  { id: 'config-php', text: 'PHP Natif', depth: 3 },
  { id: 'log-levels', text: 'Niveaux de log', depth: 2 },
  { id: 'log-examples', text: 'Exemples de logs', depth: 2 },
  { id: 'successful-api', text: 'Appel API réussi', depth: 3 },
  { id: 'api-error', text: 'Erreur API', depth: 3 },
  { id: 'custom-logger', text: 'Logger personnalisé', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


