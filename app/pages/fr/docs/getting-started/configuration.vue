<template>
  <DocPage
    title="Configuration"
    description="Guide de configuration de FNE Client pour votre environnement"
    section="Démarrage"
  >
    <DocHeading :level="1" id="configuration">Configuration</DocHeading>
    
    <DocParagraph>
      Une fois FNE Client installé, vous devez le configurer pour votre environnement. La configuration peut se faire via des variables d'environnement ou un fichier de configuration.
    </DocParagraph>

    <DocHeading :level="2" id="environment-variables">Variables d'environnement</DocHeading>

    <DocHeading :level="3" id="main-variables">Variables principales</DocHeading>

    <DocCode
      language="env"
      :code="`# Clé API FNE (obligatoire)
FNE_API_KEY=your-api-key-here

# URL de base de l'API FNE
FNE_BASE_URL=http://54.247.95.108/ws

# Mode d'exécution (test ou production)
FNE_MODE=test

# Timeout des requêtes HTTP (en secondes)
FNE_TIMEOUT=30

# Cache
FNE_CACHE_ENABLED=true
FNE_CACHE_TTL=3600

# Locale pour les messages d'erreur (fr, en)
FNE_LOCALE=fr`"
      :show-line-numbers="false"
    />

    <DocHeading :level="3" id="optional-variables">Variables optionnelles</DocHeading>

    <DocCode
      language="env"
      :code="`# Mapping personnalisé (voir section Mapping)
FNE_MAPPING_ENABLED=true

# Features Laravel Pennant (Laravel uniquement)
FNE_FEATURES_ENABLED=true
FNE_FEATURE_ADVANCED_MAPPING=true
FNE_FEATURE_BATCH_PROCESSING=false
FNE_FEATURE_WEBHOOKS=false`"
      :show-line-numbers="false"
    />

    <DocHeading :level="2" id="config-file">Fichier de configuration</DocHeading>

    <DocHeading :level="3" id="config-laravel">Laravel</DocHeading>

    <DocParagraph>
      Le fichier <DocInlineCode>config/fne.php</DocInlineCode> est publié lors de l'installation :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`return [
    // Configuration API
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
    'locale' => env('FNE_LOCALE', 'fr'),
    
    // Mapping personnalisé ERP → FNE
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
    
    // Features Laravel Pennant (Laravel uniquement)
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
      Pour Symfony, la configuration se fait dans <DocInlineCode>config/packages/fne.yaml</DocInlineCode> :
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
    
    locale: '%env(default:FNE_LOCALE:fr)%'
    
    mapping:
        invoice:
            clientCompanyName: 'customer.name'
            clientPhone: 'customer.phone'`"
    />

    <DocHeading :level="3" id="config-php">PHP Natif</DocHeading>

    <DocParagraph>
      Pour PHP natif, créez un fichier <DocInlineCode>fne.php</DocInlineCode> à la racine :
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
    
    'locale' => getenv('FNE_LOCALE') ?: 'fr',
];`"
    />

    <DocHeading :level="2" id="mapping-config">Configuration du mapping personnalisé</DocHeading>

    <DocParagraph>
      Le mapping personnalisé permet de transformer vos structures de données ERP vers le format FNE. Voir la section <NuxtLink to="/fr/docs/guides/mapping" class="text-primary border-b border-transparent hover:border-primary font-medium">Mapping ERP → FNE</NuxtLink> pour plus de détails.
    </DocParagraph>

    <DocHeading :level="2" id="cache-config">Configuration du cache</DocHeading>

    <DocHeading :level="3" id="cache-laravel">Laravel</DocHeading>

    <DocParagraph>
      Le cache utilise automatiquement le système de cache Laravel :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // 1 heure
],`"
    />

    <DocHeading :level="3" id="cache-symfony">Symfony</DocHeading>

    <DocParagraph>
      Pour Symfony, vous pouvez utiliser le cache Symfony :
    </DocParagraph>

    <DocCode
      language="yaml"
      :code="`# config/packages/fne.yaml
fne:
    cache:
        enabled: true
        ttl: 3600`"
    />

    <DocHeading :level="3" id="cache-php">PHP Natif</DocHeading>

    <DocParagraph>
      Pour PHP natif, un cache en mémoire est utilisé par défaut. Vous pouvez implémenter votre propre cache en implémentant <DocInlineCode>CacheInterface</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="2" id="logging-config">Configuration du logging</DocHeading>

    <DocHeading :level="3" id="logging-laravel">Laravel</DocHeading>

    <DocParagraph>
      Le logging utilise automatiquement le système de logging Laravel :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Les logs sont automatiquement enregistrés via Log::info(), Log::error(), etc.`"
    />

    <DocHeading :level="3" id="logging-symfony">Symfony</DocHeading>

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

    <DocHeading :level="3" id="logging-php">PHP Natif</DocHeading>

    <DocParagraph>
      Pour PHP natif, vous pouvez implémenter votre propre logger en implémentant <DocInlineCode>LoggerInterface</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="2" id="verification">Vérification de la configuration</DocHeading>

    <DocHeading :level="3" id="verification-laravel">Laravel</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

$config = FNE::getConfig();
echo $config->getApiKey(); // Affiche votre clé API
echo $config->getBaseUrl(); // Affiche l'URL de base
echo $config->getMode(); // Affiche le mode (test/production)`"
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

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocParagraph>
      Une fois la configuration terminée :
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <NuxtLink to="/fr/docs/getting-started/quick-start" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Démarrage rapide
        </NuxtLink> - Créez votre première facture certifiée
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides
        </NuxtLink> - Apprenez à utiliser les différentes fonctionnalités
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
  { id: 'configuration', text: 'Configuration', depth: 1 },
  { id: 'environment-variables', text: 'Variables d\'environnement', depth: 2 },
  { id: 'main-variables', text: 'Variables principales', depth: 3 },
  { id: 'optional-variables', text: 'Variables optionnelles', depth: 3 },
  { id: 'config-file', text: 'Fichier de configuration', depth: 2 },
  { id: 'config-laravel', text: 'Laravel', depth: 3 },
  { id: 'config-symfony', text: 'Symfony', depth: 3 },
  { id: 'config-php', text: 'PHP Natif', depth: 3 },
  { id: 'mapping-config', text: 'Configuration du mapping personnalisé', depth: 2 },
  { id: 'cache-config', text: 'Configuration du cache', depth: 2 },
  { id: 'cache-laravel', text: 'Laravel', depth: 3 },
  { id: 'cache-symfony', text: 'Symfony', depth: 3 },
  { id: 'cache-php', text: 'PHP Natif', depth: 3 },
  { id: 'logging-config', text: 'Configuration du logging', depth: 2 },
  { id: 'logging-laravel', text: 'Laravel', depth: 3 },
  { id: 'logging-symfony', text: 'Symfony', depth: 3 },
  { id: 'logging-php', text: 'PHP Natif', depth: 3 },
  { id: 'verification', text: 'Vérification de la configuration', depth: 2 },
  { id: 'verification-laravel', text: 'Laravel', depth: 3 },
  { id: 'verification-symfony', text: 'Symfony', depth: 3 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const prevPage = { title: 'Installation', path: '/fr/docs/getting-started/installation' }
const nextPage = { title: 'Démarrage rapide', path: '/fr/docs/getting-started/quick-start' }

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(prevPage)
setNextPage(nextPage)
setHeadings(headings)
</script>


