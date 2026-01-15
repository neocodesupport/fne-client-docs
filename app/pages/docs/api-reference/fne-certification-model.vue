<template>
  <DocPage
    title="FNECertification Model"
    description="Eloquent Model for the fne_certifications table"
    sub-description="The FNECertification model represents the fne_certifications table in Laravel."
    section="API Reference"
    heading-id="fne-certification-model"
  >

    <DocHeading :level="2" id="usage">Usage</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Models\\FNECertification;

// Find a certification by reference
\$certification = FNECertification::where('reference', '9606123E25000000019')->first();

// Find all certifications for a client
\$certifications = FNECertification::where('client_ncc', '123456789')->get();

// Find pending payment certifications
\$pending = FNECertification::where('status', 'pending')->get();`"
    />

    <DocHeading :level="2" id="main-properties">Main Properties</DocHeading>

    <DocHeading :level="3" id="identifiers">Identifiers</DocHeading>

    <DocList>
      <DocListItem>
        <DocInlineCode>id</DocInlineCode> : Internal ID (auto-increment)
      </DocListItem>
      <DocListItem>
        <DocInlineCode>fne_invoice_id</DocInlineCode> : FNE invoice UUID (⚠️ IMPORTANT for refunds)
      </DocListItem>
      <DocListItem>
        <DocInlineCode>reference</DocInlineCode> : Unique FNE reference
      </DocListItem>
      <DocListItem>
        <DocInlineCode>ncc</DocInlineCode> : Taxpayer number
      </DocListItem>
      <DocListItem>
        <DocInlineCode>token</DocInlineCode> : QR code verification token
      </DocListItem>
    </DocList>

    <DocHeading :level="3" id="amounts">Amounts (in cents)</DocHeading>

    <DocList>
      <DocListItem>
        <DocInlineCode>amount</DocInlineCode> : Total amount including tax in cents
      </DocListItem>
      <DocListItem>
        <DocInlineCode>vat_amount</DocInlineCode> : VAT amount in cents
      </DocListItem>
      <DocListItem>
        <DocInlineCode>fiscal_stamp</DocInlineCode> : Fiscal stamp in cents
      </DocListItem>
      <DocListItem>
        <DocInlineCode>discount</DocInlineCode> : Global discount in %
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="examples">Usage Examples</DocHeading>

    <DocHeading :level="3" id="retrieve-uuid">Retrieve UUID to Create Refund</DocHeading>

    <DocCode
      language="php"
      :code="`\$certification = FNECertification::where('reference', \$reference)->first();

if (\$certification) {
    \$fneInvoiceId = \$certification->fne_invoice_id; // UUID to create refund
}`"
    />

    <DocHeading :level="3" id="calculate-amounts">Calculate Amounts in FCFA</DocHeading>

    <DocCode
      language="php"
      :code="`\$certification = FNECertification::find(1);

\$amountFCFA = \$certification->amount / 100;        // Total amount including tax in FCFA
\$vatAmountFCFA = \$certification->vat_amount / 100;  // VAT in FCFA
\$stampFCFA = \$certification->fiscal_stamp / 100;   // Fiscal stamp in FCFA`"
    />

    <DocHeading :level="3" id="statistics">Statistics</DocHeading>

    <DocCode
      language="php"
      :code="`// Total number of certifications
\$total = FNECertification::count();

// Total certified amount
\$totalAmount = FNECertification::sum('amount') / 100; // In FCFA

// Pending payment certifications
\$pendingCount = FNECertification::where('status', 'pending')->count();`"
    />

    <DocHeading :level="2" id="see-also">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Automatic Certification Storage
        </NuxtLink> - Complete guide
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/api-reference/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">
          CertificationStorage
        </NuxtLink> - Storage class
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
  { id: 'fne-certification-model', text: 'FNECertification Model', depth: 1 },
  { id: 'usage', text: 'Usage', depth: 2 },
  { id: 'main-properties', text: 'Main Properties', depth: 2 },
  { id: 'identifiers', text: 'Identifiers', depth: 3 },
  { id: 'amounts', text: 'Amounts (in cents)', depth: 3 },
  { id: 'examples', text: 'Usage Examples', depth: 2 },
  { id: 'retrieve-uuid', text: 'Retrieve UUID to Create Refund', depth: 3 },
  { id: 'calculate-amounts', text: 'Calculate Amounts in FCFA', depth: 3 },
  { id: 'statistics', text: 'Statistics', depth: 3 },
  { id: 'see-also', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage({ title: 'CertificationStorage', path: '/docs/api-reference/certification-storage' })
setNextPage(null)
setHeadings(headings)
</script>
