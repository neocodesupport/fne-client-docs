<template>
  <DocPage
    title="Cache"
    description="Guide pour utiliser le cache avec FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="cache">Cache</DocHeading>
    
    <DocParagraph>
      Ce guide vous montre comment utiliser le cache avec FNE Client pour améliorer les performances.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      FNE Client supporte le cache via l'interface PSR-16. Le cache permet de stocker les réponses de l'API pour éviter des appels répétés.
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration</DocHeading>

    <DocHeading :level="3" id="config-laravel">Laravel</DocHeading>

    <DocParagraph>
      Le cache utilise automatiquement le système de cache Laravel :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
return [
    'cache' => [
        'enabled' => true,
        'ttl' => 3600, // Durée de vie en secondes (1 heure)
    ],
];`"
    />

    <DocHeading :level="3" id="config-symfony">Symfony</DocHeading>

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

    <DocHeading :level="3" id="config-php">PHP Natif</DocHeading>

    <DocParagraph>
      Pour PHP natif, un cache en mémoire est utilisé par défaut. Vous pouvez implémenter votre propre cache en implémentant <DocInlineCode>CacheInterface</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="2" id="usage">Utilisation</DocHeading>

    <DocParagraph>
      Le cache est automatiquement utilisé lors des appels API :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Premier appel - requête API
$result1 = FNE::invoice()->sign($data);

// Deuxième appel avec les mêmes données - utilise le cache
$result2 = FNE::invoice()->sign($data); // Plus rapide, utilise le cache`"
    />

    <DocHeading :level="2" id="cache-keys">Clés de cache</DocHeading>

    <DocParagraph>
      Les clés de cache sont générées automatiquement à partir de l'endpoint et du payload :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Clé générée : 'fne:invoice:' . md5($endpoint . serialize($payload))`"
    />

    <DocHeading :level="2" id="ttl">Durée de vie (TTL)</DocHeading>

    <DocParagraph>
      La durée de vie du cache est configurable :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // 1 heure
],`"
    />

    <DocHeading :level="2" id="disable-cache">Désactiver le cache</DocHeading>

    <DocHeading :level="3" id="disable-global">Globalement</DocHeading>

    <DocCode
      language="php"
      :code="`// config/fne.php
'cache' => [
    'enabled' => false,
],`"
    />

    <DocHeading :level="3" id="disable-specific">Pour un appel spécifique</DocHeading>

    <DocParagraph>
      Le cache n'est pas utilisé pour les avoirs (refunds) par défaut, car ils modifient l'état.
    </DocParagraph>

    <DocHeading :level="2" id="custom-cache">Cache personnalisé</DocHeading>

    <DocParagraph>
      Vous pouvez implémenter votre propre cache en implémentant <DocInlineCode>CacheInterface</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Contracts\\CacheInterface;

class CustomCache implements CacheInterface
{
    public function get(string $key, mixed $default = null): mixed
    {
        // Votre logique de récupération
    }
    
    public function set(string $key, mixed $value, \\DateInterval|int|null $ttl = null): bool
    {
        // Votre logique de stockage
    }
    
    // ... autres méthodes ...
}`"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/logging" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Logging
        </NuxtLink> - Configurez le logging
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/advanced/features" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Performance
        </NuxtLink> - Optimisez les performances
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
  { id: 'cache', text: 'Cache', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'configuration', text: 'Configuration', depth: 2 },
  { id: 'config-laravel', text: 'Laravel', depth: 3 },
  { id: 'config-symfony', text: 'Symfony', depth: 3 },
  { id: 'config-php', text: 'PHP Natif', depth: 3 },
  { id: 'usage', text: 'Utilisation', depth: 2 },
  { id: 'cache-keys', text: 'Clés de cache', depth: 2 },
  { id: 'ttl', text: 'Durée de vie (TTL)', depth: 2 },
  { id: 'disable-cache', text: 'Désactiver le cache', depth: 2 },
  { id: 'disable-global', text: 'Globalement', depth: 3 },
  { id: 'disable-specific', text: 'Pour un appel spécifique', depth: 3 },
  { id: 'custom-cache', text: 'Cache personnalisé', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>

