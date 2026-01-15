<template>
  <DocPage
    title="Installation"
    description="Installation guide for FNE Client for Laravel, Symfony and native PHP"
    sub-description="FNE Client can be installed in your PHP project in just a few minutes, regardless of your framework."
    section="Getting Started"
    heading-id="installation"
  >

    <DocHeading :level="2" id="prerequisites">Prerequisites</DocHeading>

    <DocList>
      <DocListItem>PHP 8.2 or higher</DocListItem>
      <DocListItem>Composer 2.0 or higher</DocListItem>
      <DocListItem>Laravel 11+ (if using Laravel)</DocListItem>
      <DocListItem>Symfony 7.4+ (if using Symfony)</DocListItem>
    </DocList>

    <DocHeading :level="2" id="install">Installation</DocHeading>

    <DocHeading :level="3" id="install-laravel">Laravel 11+</DocHeading>

    <DocCode
      language="bash"
      :code="`composer require neocode/fne-client
php artisan fne:install`"
      :show-line-numbers="true"
    />

    <DocParagraph>
      The <DocInlineCode>fne:install</DocInlineCode> command launches an interactive wizard that:
    </DocParagraph>

    <DocList>
      <DocListItem>Automatically detects your Laravel environment</DocListItem>
      <DocListItem>Configures settings via interactive prompts</DocListItem>
      <DocListItem>Publishes configuration files</DocListItem>
      <DocListItem>Offers to install migrations (optional)</DocListItem>
    </DocList>

    <DocHeading :level="3" id="install-symfony">Symfony 7.4+</DocHeading>

    <DocCode
      language="bash"
      :code="`composer require neocode/fne-client
php bin/console fne:install`"
      :show-line-numbers="false"
    />

    <DocParagraph>
      The <DocInlineCode>fne:install</DocInlineCode> command automatically configures:
    </DocParagraph>

    <DocList>
      <DocListItem>Services in <DocInlineCode>config/services.yaml</DocInlineCode></DocListItem>
      <DocListItem>Parameters in <DocInlineCode>.env</DocInlineCode></DocListItem>
      <DocListItem>Migrations (optional)</DocListItem>
    </DocList>

    <DocHeading :level="3" id="install-php">Native PHP</DocHeading>

    <DocCode
      language="bash"
      :code="`composer require neocode/fne-client
php vendor/bin/fne-install`"
      :show-line-numbers="false"
    />

    <DocParagraph>
      The installation creates a configuration file <DocInlineCode>fne.php</DocInlineCode> at the root of your project.
    </DocParagraph>

    <DocHeading :level="2" id="config">Configuration</DocHeading>

    <DocHeading :level="3" id="config-env">Environment Variables</DocHeading>

    <DocParagraph>
      Add these variables to your <DocInlineCode>.env</DocInlineCode> file:
    </DocParagraph>

    <DocCode
      language="env"
      :code="`FNE_API_KEY=your-api-key
FNE_BASE_URL=https://fne-api-mock.test
FNE_MODE=test
FNE_TIMEOUT=30
FNE_CACHE_ENABLED=true
FNE_CACHE_TTL=3600
FNE_LOCALE=en`"
      :show-line-numbers="false"
    />

    <DocHeading :level="3" id="config-file-laravel">Configuration File (Laravel)</DocHeading>

    <DocParagraph>
      The <DocInlineCode>config/fne.php</DocInlineCode> file is published during installation:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`return [
    'api_key' => env('FNE_API_KEY'),
    'base_url' => env('FNE_BASE_URL', 'https://fne-api-mock.test'),
    'mode' => env('FNE_MODE', 'test'),
    'timeout' => env('FNE_TIMEOUT', 30),
    
    'cache_enabled' => env('FNE_CACHE_ENABLED', true),
    'cache_ttl' => env('FNE_CACHE_TTL', 3600),
    
    'locale' => env('FNE_LOCALE', 'en'),
];`"
    />

    <DocHeading :level="2" id="verification">Verifying Installation</DocHeading>

    <DocHeading :level="3" id="verification-laravel">Laravel</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

// Verify that the client is available
$config = FNE::getConfig();
echo $config->getApiKey(); // Displays your API key`"
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

    <DocHeading :level="3" id="verification-php">Native PHP</DocHeading>

    <DocCode
      language="php"
      :code="`require_once 'vendor/autoload.php';

use Neocode\\FNE\\FNEClient;
use Neocode\\FNE\\Config\\FNEConfig;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'https://fne-api-mock.test',
    'mode' => 'test',
]);

$fne = new FNEClient(/* ... */);`"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocParagraph>
      Once installation is complete:
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <NuxtLink to="/docs/getting-started/configuration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Configuration
        </NuxtLink> - Configure the SDK for your environment
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/getting-started/quick-start" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Quick Start
        </NuxtLink> - Create your first certified invoice
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
  { id: 'installation', text: 'Installation', depth: 1 },
  { id: 'prerequisites', text: 'Prerequisites', depth: 2 },
  { id: 'install', text: 'Installation', depth: 2 },
  { id: 'install-laravel', text: 'Laravel 11+', depth: 3 },
  { id: 'install-symfony', text: 'Symfony 7.4+', depth: 3 },
  { id: 'install-php', text: 'Native PHP', depth: 3 },
  { id: 'config', text: 'Configuration', depth: 2 },
  { id: 'config-env', text: 'Environment Variables', depth: 3 },
  { id: 'config-file-laravel', text: 'Configuration File (Laravel)', depth: 3 },
  { id: 'verification', text: 'Verifying Installation', depth: 2 },
  { id: 'verification-laravel', text: 'Laravel', depth: 3 },
  { id: 'verification-symfony', text: 'Symfony', depth: 3 },
  { id: 'verification-php', text: 'Native PHP', depth: 3 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const prevPage = { title: 'Introduction', path: '/docs/getting-started/introduction' }
const nextPage = { title: 'Configuration', path: '/docs/getting-started/configuration' }

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(prevPage)
setNextPage(nextPage)
setHeadings(headings)
</script>



