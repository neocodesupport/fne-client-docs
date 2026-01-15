<template>
  <DocPage
    title="Features (Laravel Pennant)"
    description="Guide for using Laravel Pennant features with FNE Client"
    sub-description="FNE Client uses Laravel Pennant to manage modules in a modular way."
    section="Advanced"
    heading-id="features"
  >

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      The features system allows enabling/disabling functionality flexibly.
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration</DocHeading>

    <DocCode
      language="php"
      :code="`// config/fne.php
'features' => [
    'enabled' => true,
    'advanced_mapping' => true,
    'batch_processing' => false,
    'webhooks' => false,
],`"
    />

    <DocHeading :level="2" id="usage">Usage</DocHeading>

    <DocCode
      language="php"
      :code="`use Laravel\\Pennant\\Feature;

if (Feature::active('fne:advanced-mapping')) {
    // Use advanced mapping
}`"
    />

    <DocHeading :level="2" id="next-steps">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/getting-started/configuration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Advanced Configuration
        </NuxtLink> - Detailed configuration
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
  { id: 'features', text: 'Features (Laravel Pennant)', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'configuration', text: 'Configuration', depth: 2 },
  { id: 'usage', text: 'Usage', depth: 2 },
  { id: 'next-steps', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>



