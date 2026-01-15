<template>
  <DocPage
    title="Logging"
    description="Guide for configuring logging with FNE Client"
    sub-description="This guide shows you how to configure logging with FNE Client for debugging and monitoring."
    section="Guides"
    heading-id="logging"
  >

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      FNE Client supports logging via the PSR-3 interface. Logs allow tracking API calls and debugging issues.
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration</DocHeading>

    <DocHeading :level="3" id="config-laravel">Laravel</DocHeading>

    <DocParagraph>
      Logging automatically uses the Laravel logging system:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Logs are automatically recorded via Log::info(), Log::error(), etc.`"
    />

    <DocHeading :level="3" id="config-symfony">Symfony</DocHeading>

    <DocParagraph>
      For Symfony, use Monolog:
    </DocParagraph>

    <DocCode
      language="yaml"
      :code="`# config/packages/fne.yaml
services:
    Neocode\\FNE\\Contracts\\LoggerInterface:
        alias: logger`"
    />

    <DocHeading :level="3" id="config-php">Native PHP</DocHeading>

    <DocParagraph>
      For native PHP, you can implement your own logger by implementing <DocInlineCode>LoggerInterface</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="2" id="log-levels">Log Levels</DocHeading>

    <DocParagraph>
      FNE Client uses the following log levels:
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>debug</strong>: Detailed debugging information
      </DocListItem>
      <DocListItem>
        <strong>info</strong>: General information (successful API calls)
      </DocListItem>
      <DocListItem>
        <strong>warning</strong>: Warnings (low sticker stock)
      </DocListItem>
      <DocListItem>
        <strong>error</strong>: Errors (exceptions, failed API calls)
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="log-examples">Log Examples</DocHeading>

    <DocHeading :level="3" id="successful-api">Successful API Call</DocHeading>

    <DocCode
      language="text"
      code="[INFO] Sending request to: /external/invoices/sign
[INFO] Request successful: {&quot;reference&quot;: &quot;9606123E25000000019&quot;, ...}"
      :show-line-numbers="false"
    />

    <DocHeading :level="3" id="api-error">API Error</DocHeading>

    <DocCode
      language="text"
      code="[ERROR] FNE Error: Validation failed
[ERROR] Endpoint: /external/invoices/sign
[ERROR] Exception: ValidationException"
      :show-line-numbers="false"
    />

    <DocHeading :level="2" id="custom-logger">Custom Logger</DocHeading>

    <DocParagraph>
      You can implement your own logger:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Contracts\\LoggerInterface;
use Psr\\Log\\LoggerInterface as PsrLoggerInterface;

class CustomLogger implements LoggerInterface
{
    public function emergency(string $message, array $context = []): void
    {
        // Your logic
    }
    
    // ... other methods ...
}`"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Error Handling
        </NuxtLink> - Handle errors efficiently
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/advanced/troubleshooting" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Troubleshooting
        </NuxtLink> - Resolve issues
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
  { id: 'logging', text: 'Logging', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'configuration', text: 'Configuration', depth: 2 },
  { id: 'config-laravel', text: 'Laravel', depth: 3 },
  { id: 'config-symfony', text: 'Symfony', depth: 3 },
  { id: 'config-php', text: 'Native PHP', depth: 3 },
  { id: 'log-levels', text: 'Log Levels', depth: 2 },
  { id: 'log-examples', text: 'Log Examples', depth: 2 },
  { id: 'successful-api', text: 'Successful API Call', depth: 3 },
  { id: 'api-error', text: 'API Error', depth: 3 },
  { id: 'custom-logger', text: 'Custom Logger', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


