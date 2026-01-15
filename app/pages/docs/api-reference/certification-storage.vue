<template>
  <DocPage
    title="CertificationStorage"
    description="Class for managing automatic certification storage"
    sub-description="The CertificationStorage class manages automatic storage of certifications in the fne_certifications table."
    section="API Reference"
    heading-id="certification-storage"
  >

    <DocHeading :level="2" id="methods">Methods</DocHeading>

    <DocHeading :level="3" id="save">save()</DocHeading>

    <DocParagraph>
      Stores a certification in the <DocInlineCode>fne_certifications</DocInlineCode> table.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Storage\\CertificationStorage;
use Neocode\\FNE\\DTOs\\ResponseDTO;

\$success = CertificationStorage::save(\$response, \$invoiceData);`"
    />

    <DocParagraph>
      <strong>Parameters:</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>
        <DocInlineCode>ResponseDTO $response</DocInlineCode> : Certification response
      </DocListItem>
      <DocListItem>
        <DocInlineCode>array $invoiceData</DocInlineCode> : Original invoice data
      </DocListItem>
    </DocList>

    <DocParagraph>
      <strong>Returns:</strong> <DocInlineCode>bool</DocInlineCode> - <DocInlineCode>true</DocInlineCode> if stored successfully, <DocInlineCode>false</DocInlineCode> otherwise
    </DocParagraph>

    <DocHeading :level="2" id="compatibility">Compatibility</DocHeading>

    <DocList>
      <DocListItem>
        <strong>Laravel</strong> : Uses Eloquent Model
      </DocListItem>
      <DocListItem>
        <strong>Symfony</strong> : Uses Doctrine EntityManager or DBAL Connection
      </DocListItem>
      <DocListItem>
        <strong>Native PHP</strong> : Uses PDO directly
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="automatic-detection">Automatic Detection</DocHeading>

    <DocParagraph>
      The class automatically detects the framework used and uses the appropriate method:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Laravel
if (self::isLaravel()) {
    return self::saveLaravel(\$response, \$invoiceData);
}

// Symfony
if (self::isSymfony()) {
    return self::saveSymfony(\$response, \$invoiceData);
}

// Native PHP
return self::saveNativePHP(\$response, \$invoiceData);`"
    />

    <DocHeading :level="2" id="error-handling">Error Handling</DocHeading>

    <DocParagraph>
      If storage fails, the method returns <DocInlineCode>false</DocInlineCode> and the error is logged. Certification continues normally.
    </DocParagraph>

    <DocHeading :level="2" id="see-also">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Automatic Certification Storage
        </NuxtLink> - Complete guide
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/api-reference/fne-certification-model" class="text-primary border-b border-transparent hover:border-primary font-medium">
          FNECertification Model
        </NuxtLink> - Eloquent Model
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
  { id: 'certification-storage', text: 'CertificationStorage', depth: 1 },
  { id: 'methods', text: 'Methods', depth: 2 },
  { id: 'save', text: 'save()', depth: 3 },
  { id: 'compatibility', text: 'Compatibility', depth: 2 },
  { id: 'automatic-detection', text: 'Automatic Detection', depth: 2 },
  { id: 'error-handling', text: 'Error Handling', depth: 2 },
  { id: 'see-also', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage({ title: 'FNECertification Model', path: '/docs/api-reference/fne-certification-model' })
setHeadings(headings)
</script>
