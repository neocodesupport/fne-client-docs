<template>
  <DocPage
    title="Installation"
    description="Guide d'installation de FNE Client pour Laravel, Symfony et PHP natif"
    sub-description="FNE Client peut être installé dans votre projet PHP en quelques minutes, quel que soit votre framework."
    section="Démarrage"
    heading-id="installation"
  >

    <DocHeading :level="2" id="prerequisites">Prérequis</DocHeading>

    <DocList>
      <DocListItem>PHP 8.2 ou supérieur</DocListItem>
      <DocListItem>Composer 2.0 ou supérieur</DocListItem>
      <DocListItem>Laravel 11+ (si vous utilisez Laravel)</DocListItem>
      <DocListItem>Symfony 7.4+ (si vous utilisez Symfony)</DocListItem>
    </DocList>

    <DocHeading :level="2" id="install">Installation</DocHeading>

    <DocHeading :level="3" id="install-laravel">Laravel 11+</DocHeading>

    <DocCode
      language="bash"
      :code="`composer require neocode/fne-client
php artisan fne:install`"
      :show-line-numbers="false"
    />

    <DocParagraph>
      La commande <DocInlineCode>fne:install</DocInlineCode> lance un assistant interactif qui :
    </DocParagraph>

    <DocList>
      <DocListItem>Détecte automatiquement votre environnement Laravel</DocListItem>
      <DocListItem>Configure les paramètres via des prompts interactifs</DocListItem>
      <DocListItem>Publie les fichiers de configuration</DocListItem>
      <DocListItem>Propose l'installation des migrations (optionnel)</DocListItem>
    </DocList>

    <DocHeading :level="3" id="install-symfony">Symfony 7.4+</DocHeading>

    <DocCode
      language="bash"
      :code="`composer require neocode/fne-client
php bin/console fne:install`"
      :show-line-numbers="false"
    />

    <DocParagraph>
      La commande <DocInlineCode>fne:install</DocInlineCode> configure automatiquement :
    </DocParagraph>

    <DocList>
      <DocListItem>Les services dans <DocInlineCode>config/services.yaml</DocInlineCode></DocListItem>
      <DocListItem>Les paramètres dans <DocInlineCode>.env</DocInlineCode></DocListItem>
      <DocListItem>Les migrations (optionnel)</DocListItem>
    </DocList>

    <DocHeading :level="3" id="install-php">PHP Natif</DocHeading>

    <DocCode
      language="bash"
      :code="`composer require neocode/fne-client
php vendor/bin/fne-install`"
      :show-line-numbers="false"
    />

    <DocParagraph>
      L'installation crée un fichier de configuration <DocInlineCode>fne.php</DocInlineCode> à la racine de votre projet.
    </DocParagraph>

    <DocHeading :level="2" id="config">Configuration</DocHeading>

    <DocHeading :level="3" id="config-env">Variables d'environnement</DocHeading>

    <DocParagraph>
      Ajoutez ces variables dans votre fichier <DocInlineCode>.env</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="env"
      :code="`FNE_API_KEY=your-api-key
FNE_BASE_URL=https://fne-api-mock.test
FNE_MODE=test
FNE_TIMEOUT=30
FNE_CACHE_ENABLED=true
FNE_CACHE_TTL=3600
FNE_LOCALE=fr`"
      :show-line-numbers="false"
    />

    <DocHeading :level="3" id="config-file-laravel">Fichier de configuration (Laravel)</DocHeading>

    <DocParagraph>
      Le fichier <DocInlineCode>config/fne.php</DocInlineCode> est publié lors de l'installation :
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
    
    'locale' => env('FNE_LOCALE', 'fr'),
];`"
    />

    <DocHeading :level="2" id="verification">Vérification de l'installation</DocHeading>

    <DocHeading :level="3" id="verification-laravel">Laravel</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

// Vérifier que le client est disponible
$config = FNE::getConfig();
echo $config->getApiKey(); // Affiche votre clé API`"
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

    <DocHeading :level="3" id="verification-php">PHP Natif</DocHeading>

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

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocParagraph>
      Une fois l'installation terminée :
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <NuxtLink to="/fr/docs/getting-started/configuration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Configuration
        </NuxtLink> - Configurez le SDK pour votre environnement
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/getting-started/quick-start" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Démarrage rapide
        </NuxtLink> - Créez votre première facture certifiée
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
  { id: 'installation', text: 'Installation', depth: 1 },
  { id: 'prerequisites', text: 'Prérequis', depth: 2 },
  { id: 'install', text: 'Installation', depth: 2 },
  { id: 'install-laravel', text: 'Laravel 11+', depth: 3 },
  { id: 'install-symfony', text: 'Symfony 7.4+', depth: 3 },
  { id: 'install-php', text: 'PHP Natif', depth: 3 },
  { id: 'config', text: 'Configuration', depth: 2 },
  { id: 'config-env', text: 'Variables d\'environnement', depth: 3 },
  { id: 'config-file-laravel', text: 'Fichier de configuration (Laravel)', depth: 3 },
  { id: 'verification', text: 'Vérification de l\'installation', depth: 2 },
  { id: 'verification-laravel', text: 'Laravel', depth: 3 },
  { id: 'verification-symfony', text: 'Symfony', depth: 3 },
  { id: 'verification-php', text: 'PHP Natif', depth: 3 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const prevPage = { title: 'Introduction', path: '/fr/docs/getting-started/introduction' }
const nextPage = { title: 'Configuration', path: '/fr/docs/getting-started/configuration' }

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(prevPage)
setNextPage(nextPage)
setHeadings(headings)
</script>

