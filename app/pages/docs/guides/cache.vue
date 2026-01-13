<template>
  <DocPage
    title="Cache"
    description="Guide for using cache with FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="cache">Cache</DocHeading>
    
    <DocParagraph>
      This guide shows you how to use cache with FNE Client to improve performance.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      FNE Client supports cache via the PSR-16 interface. Cache allows storing API responses to avoid repeated calls.
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration</DocHeading>

    <DocHeading :level="3" id="config-laravel">Laravel</DocHeading>

    <DocParagraph>
      Cache automatically uses the Laravel cache system:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
return [
    'cache' => [
        'enabled' => true,
        'ttl' => 3600, // Time to live in seconds (1 hour)
    ],
];`"
    />

    <DocHeading :level="3" id="config-symfony">Symfony</DocHeading>

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

    <DocHeading :level="3" id="config-php">Native PHP</DocHeading>

    <DocParagraph>
      For native PHP, an in-memory cache is used by default. You can implement your own cache by implementing <DocInlineCode>CacheInterface</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="2" id="usage">Usage</DocHeading>

    <DocParagraph>
      Cache is automatically used during API calls:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// First call - API request
$result1 = FNE::invoice()->sign($data);

// Second call with same data - uses cache
$result2 = FNE::invoice()->sign($data); // Faster, uses cache`"
    />

    <DocHeading :level="2" id="cache-keys">Cache Keys</DocHeading>

    <DocParagraph>
      Cache keys are automatically generated from the endpoint and payload:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Generated key: 'fne:invoice:' . md5($endpoint . serialize($payload))`"
    />

    <DocHeading :level="2" id="ttl">Time to Live (TTL)</DocHeading>

    <DocParagraph>
      Cache time to live is configurable:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // 1 hour
],`"
    />

    <DocHeading :level="2" id="disable-cache">Disable Cache</DocHeading>

    <DocHeading :level="3" id="disable-global">Globally</DocHeading>

    <DocCode
      language="php"
      :code="`// config/fne.php
'cache' => [
    'enabled' => false,
],`"
    />

    <DocHeading :level="3" id="disable-specific">For a Specific Call</DocHeading>

    <DocParagraph>
      Cache is not used for refunds by default, as they modify state.
    </DocParagraph>

    <DocHeading :level="2" id="custom-cache">Custom Cache</DocHeading>

    <DocParagraph>
      You can implement your own cache by implementing <DocInlineCode>CacheInterface</DocInlineCode>:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Contracts\\CacheInterface;

class CustomCache implements CacheInterface
{
    public function get(string $key, mixed $default = null): mixed
    {
        // Your retrieval logic
    }
    
    public function set(string $key, mixed $value, \\DateInterval|int|null $ttl = null): bool
    {
        // Your storage logic
    }
    
    // ... other methods ...
}`"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/logging" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Logging
        </NuxtLink> - Configure logging
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/advanced/features" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Performance
        </NuxtLink> - Optimize performance
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
  { id: 'cache', text: 'Cache', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'configuration', text: 'Configuration', depth: 2 },
  { id: 'config-laravel', text: 'Laravel', depth: 3 },
  { id: 'config-symfony', text: 'Symfony', depth: 3 },
  { id: 'config-php', text: 'Native PHP', depth: 3 },
  { id: 'usage', text: 'Usage', depth: 2 },
  { id: 'cache-keys', text: 'Cache Keys', depth: 2 },
  { id: 'ttl', text: 'Time to Live (TTL)', depth: 2 },
  { id: 'disable-cache', text: 'Disable Cache', depth: 2 },
  { id: 'disable-global', text: 'Globally', depth: 3 },
  { id: 'disable-specific', text: 'For a Specific Call', depth: 3 },
  { id: 'custom-cache', text: 'Custom Cache', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>



