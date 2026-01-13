<template>
  <DocPage
    title="Configuration"
    description="Configuration guide for FNE Client for your environment"
    section="Getting Started"
  >
    <DocHeading :level="1" id="configuration">Configuration</DocHeading>
    
    <DocParagraph>
      Once FNE Client is installed, you need to configure it for your environment. Configuration can be done via environment variables or a configuration file.
    </DocParagraph>

    <DocHeading :level="2" id="environment-variables">Environment Variables</DocHeading>

    <DocHeading :level="3" id="main-variables">Main Variables</DocHeading>

    <DocCode
      language="env"
      :code="`# FNE API Key (required)
FNE_API_KEY=your-api-key-here

# FNE API base URL
FNE_BASE_URL=http://54.247.95.108/ws

# Execution mode (test or production)
FNE_MODE=test

# HTTP request timeout (in seconds)
FNE_TIMEOUT=30

# Cache
FNE_CACHE_ENABLED=true
FNE_CACHE_TTL=3600

# Locale for error messages (fr, en)
FNE_LOCALE=en`"
      :show-line-numbers="false"
    />

    <DocHeading :level="3" id="optional-variables">Optional Variables</DocHeading>

    <DocCode
      language="env"
      :code="`# Custom mapping (see Mapping section)
FNE_MAPPING_ENABLED=true

# Laravel Pennant features (Laravel only)
FNE_FEATURES_ENABLED=true
FNE_FEATURE_ADVANCED_MAPPING=true
FNE_FEATURE_BATCH_PROCESSING=false
FNE_FEATURE_WEBHOOKS=false`"
      :show-line-numbers="false"
    />

    <DocHeading :level="2" id="config-file">Configuration File</DocHeading>

    <DocHeading :level="3" id="config-laravel">Laravel</DocHeading>

    <DocParagraph>
      The <DocInlineCode>config/fne.php</DocInlineCode> file is published during installation:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`return [
    // API Configuration
    'api_key' => env('FNE_API_KEY'),
    'base_url' => env('FNE_BASE_URL', 'http://54.247.95.108/ws'),
    'mode' => env('FNE_MODE', 'test'),
    'timeout' => env('FNE_TIMEOUT', 30),
    
    // Cache
    'cache' => [
        'enabled' => env('FNE_CACHE_ENABLED', true),
        'ttl' => env('FNE_CACHE_TTL', 3600),
    ],
    
    // Locale
    'locale' => env('FNE_LOCALE', 'en'),
    
    // Custom ERP → FNE mapping
    'mapping' => [
        'invoice' => [
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone',
            'clientEmail' => 'customer.email',
            'pointOfSale' => 'pos.code',
            'establishment' => 'establishment.code',
        ],
        'purchase' => [
            'clientCompanyName' => 'supplier.name',
            'clientPhone' => 'supplier.phone',
        ],
    ],
    
    // Laravel Pennant features (Laravel only)
    'features' => [
        'enabled' => env('FNE_FEATURES_ENABLED', true),
        'advanced_mapping' => env('FNE_FEATURE_ADVANCED_MAPPING', true),
        'batch_processing' => env('FNE_FEATURE_BATCH_PROCESSING', false),
        'webhooks' => env('FNE_FEATURE_WEBHOOKS', false),
    ],
];`"
    />

    <DocHeading :level="3" id="config-symfony">Symfony</DocHeading>

    <DocParagraph>
      For Symfony, configuration is done in <DocInlineCode>config/packages/fne.yaml</DocInlineCode>:
    </DocParagraph>

    <DocCode
      language="yaml"
      :code="`fne:
    api_key: '%env(FNE_API_KEY)%'
    base_url: '%env(default:FNE_BASE_URL:http://54.247.95.108/ws)%'
    mode: '%env(default:FNE_MODE:test)%'
    timeout: '%env(int:default:FNE_TIMEOUT:30)%'
    
    cache:
        enabled: '%env(bool:default:FNE_CACHE_ENABLED:true)%'
        ttl: '%env(int:default:FNE_CACHE_TTL:3600)%'
    
    locale: '%env(default:FNE_LOCALE:en)%'
    
    mapping:
        invoice:
            clientCompanyName: 'customer.name'
            clientPhone: 'customer.phone'`"
    />

    <DocHeading :level="3" id="config-php">Native PHP</DocHeading>

    <DocParagraph>
      For native PHP, create a <DocInlineCode>fne.php</DocInlineCode> file at the root:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`<?php

return [
    'api_key' => getenv('FNE_API_KEY') ?: 'your-api-key',
    'base_url' => getenv('FNE_BASE_URL') ?: 'http://54.247.95.108/ws',
    'mode' => getenv('FNE_MODE') ?: 'test',
    'timeout' => (int) (getenv('FNE_TIMEOUT') ?: 30),
    
    'cache' => [
        'enabled' => filter_var(getenv('FNE_CACHE_ENABLED') ?: true, FILTER_VALIDATE_BOOLEAN),
        'ttl' => (int) (getenv('FNE_CACHE_TTL') ?: 3600),
    ],
    
    'locale' => getenv('FNE_LOCALE') ?: 'en',
];`"
    />

    <DocHeading :level="2" id="mapping-config">Custom Mapping Configuration</DocHeading>

    <DocParagraph>
      Custom mapping allows you to transform your ERP data structures to FNE format. See the <NuxtLink to="/docs/guides/mapping" class="text-primary border-b border-transparent hover:border-primary font-medium">ERP → FNE Mapping</NuxtLink> section for more details.
    </DocParagraph>

    <DocHeading :level="2" id="cache-config">Cache Configuration</DocHeading>

    <DocHeading :level="3" id="cache-laravel">Laravel</DocHeading>

    <DocParagraph>
      Cache automatically uses the Laravel cache system:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // 1 hour
],`"
    />

    <DocHeading :level="3" id="cache-symfony">Symfony</DocHeading>

    <DocParagraph>
      For Symfony, you can use the Symfony cache:
    </DocParagraph>

    <DocCode
      language="yaml"
      :code="`# config/packages/fne.yaml
fne:
    cache:
        enabled: true
        ttl: 3600`"
    />

    <DocHeading :level="3" id="cache-php">Native PHP</DocHeading>

    <DocParagraph>
      For native PHP, an in-memory cache is used by default. You can implement your own cache by implementing <DocInlineCode>CacheInterface</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="2" id="logging-config">Logging Configuration</DocHeading>

    <DocHeading :level="3" id="logging-laravel">Laravel</DocHeading>

    <DocParagraph>
      Logging automatically uses the Laravel logging system:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Logs are automatically recorded via Log::info(), Log::error(), etc.`"
    />

    <DocHeading :level="3" id="logging-symfony">Symfony</DocHeading>

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

    <DocHeading :level="3" id="logging-php">Native PHP</DocHeading>

    <DocParagraph>
      For native PHP, you can implement your own logger by implementing <DocInlineCode>LoggerInterface</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="2" id="verification">Configuration Verification</DocHeading>

    <DocHeading :level="3" id="verification-laravel">Laravel</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

$config = FNE::getConfig();
echo $config->getApiKey(); // Displays your API key
echo $config->getBaseUrl(); // Displays the base URL
echo $config->getMode(); // Displays the mode (test/production)`"
    />

    <DocHeading :level="3" id="verification-symfony">Symfony</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\FNEClient;

class TestController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}
    
    public function test()
    {
        $config = $this->fneClient->getConfig();
        // ...
    }
}`"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocParagraph>
      Once configuration is complete:
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <NuxtLink to="/docs/getting-started/quick-start" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Quick Start
        </NuxtLink> - Create your first certified invoice
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides
        </NuxtLink> - Learn how to use the different features
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
  { id: 'configuration', text: 'Configuration', depth: 1 },
  { id: 'environment-variables', text: 'Environment Variables', depth: 2 },
  { id: 'main-variables', text: 'Main Variables', depth: 3 },
  { id: 'optional-variables', text: 'Optional Variables', depth: 3 },
  { id: 'config-file', text: 'Configuration File', depth: 2 },
  { id: 'config-laravel', text: 'Laravel', depth: 3 },
  { id: 'config-symfony', text: 'Symfony', depth: 3 },
  { id: 'config-php', text: 'Native PHP', depth: 3 },
  { id: 'mapping-config', text: 'Custom Mapping Configuration', depth: 2 },
  { id: 'cache-config', text: 'Cache Configuration', depth: 2 },
  { id: 'cache-laravel', text: 'Laravel', depth: 3 },
  { id: 'cache-symfony', text: 'Symfony', depth: 3 },
  { id: 'cache-php', text: 'Native PHP', depth: 3 },
  { id: 'logging-config', text: 'Logging Configuration', depth: 2 },
  { id: 'logging-laravel', text: 'Laravel', depth: 3 },
  { id: 'logging-symfony', text: 'Symfony', depth: 3 },
  { id: 'logging-php', text: 'Native PHP', depth: 3 },
  { id: 'verification', text: 'Configuration Verification', depth: 2 },
  { id: 'verification-laravel', text: 'Laravel', depth: 3 },
  { id: 'verification-symfony', text: 'Symfony', depth: 3 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const prevPage = { title: 'Installation', path: '/docs/getting-started/installation' }
const nextPage = { title: 'Quick Start', path: '/docs/getting-started/quick-start' }

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(prevPage)
setNextPage(nextPage)
setHeadings(headings)
</script>



