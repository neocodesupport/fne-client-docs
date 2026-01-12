<template>
  <DocPage
    title="Troubleshooting"
    description="Troubleshooting guide to resolve common issues"
    section="Advanced"
  >
    <DocHeading :level="1" id="troubleshooting">Troubleshooting</DocHeading>
    
    <DocParagraph>
      This guide helps you resolve common issues with FNE Client.
    </DocParagraph>

    <DocHeading :level="2" id="common-problems">Common Problems</DocHeading>

    <DocHeading :level="3" id="authentication-error">Authentication Error</DocHeading>

    <DocParagraph>
      <strong>Symptom:</strong> <DocInlineCode>AuthenticationException</DocInlineCode> thrown
    </DocParagraph>

    <DocParagraph>
      <strong>Solutions:</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>Verify that your API key is correct</DocListItem>
      <DocListItem>Verify that the API key is properly set in <DocInlineCode>.env</DocInlineCode></DocListItem>
      <DocListItem>Verify that the mode (test/production) matches your environment</DocListItem>
    </DocList>

    <DocHeading :level="3" id="validation-error">Validation Error</DocHeading>

    <DocParagraph>
      <strong>Symptom:</strong> <DocInlineCode>ValidationException</DocInlineCode> thrown
    </DocParagraph>

    <DocParagraph>
      <strong>Solutions:</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>Verify that all required fields are provided</DocListItem>
      <DocListItem>Verify that data types are correct</DocListItem>
      <DocListItem>Verify that enums use the correct values</DocListItem>
    </DocList>

    <DocHeading :level="3" id="mapping-error">Mapping Error</DocHeading>

    <DocParagraph>
      <strong>Symptom:</strong> <DocInlineCode>MappingException</DocInlineCode> thrown
    </DocParagraph>

    <DocParagraph>
      <strong>Solutions:</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>Verify the mapping configuration in <DocInlineCode>config/fne.php</DocInlineCode></DocListItem>
      <DocListItem>Verify that dot notation paths are correct</DocListItem>
      <DocListItem>Verify that ERP data matches the mapping</DocListItem>
    </DocList>

    <DocHeading :level="2" id="see-also">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Error Handling
        </NuxtLink> - Complete guide on error handling
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/logging" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Logging
        </NuxtLink> - Configure logging for debugging
      </DocListItem>
    </DocList>

    <DocAlert type="info">
      <strong>Need help?</strong> Check out the 
      <NuxtLink to="/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
        complete documentation
      </NuxtLink> 
      or 
      <a href="https://github.com/neocode/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
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
  { id: 'troubleshooting', text: 'Troubleshooting', depth: 1 },
  { id: 'common-problems', text: 'Common Problems', depth: 2 },
  { id: 'authentication-error', text: 'Authentication Error', depth: 3 },
  { id: 'validation-error', text: 'Validation Error', depth: 3 },
  { id: 'mapping-error', text: 'Mapping Error', depth: 3 },
  { id: 'see-also', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


