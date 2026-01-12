<template>
  <DocPage
    title="PurchaseService"
    description="API reference for the purchase slip service"
    section="API Reference"
  >
    <DocHeading :level="1" id="purchase-service">PurchaseService</DocHeading>
    
    <DocParagraph>
      The <DocInlineCode>PurchaseService</DocInlineCode> service handles purchase slip certification.
    </DocParagraph>

    <DocHeading :level="2" id="methods">Methods</DocHeading>

    <DocHeading :level="3" id="submit-method">submit()</DocHeading>

    <DocParagraph>
      Certifies a purchase slip.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`public function submit(?array $data = null): ResponseDTO`"
    />

    <DocParagraph>
      <strong>Parameters:</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>
        <DocInlineCode>$data</DocInlineCode> (array|null): Purchase slip data (optional if data is defined via context)
      </DocListItem>
    </DocList>

    <DocParagraph>
      <strong>Returns:</strong> <DocInlineCode>ResponseDTO</DocInlineCode>
    </DocParagraph>

    <DocHeading :level="3" id="example">Example:</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;
use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;

$result = FNE::purchase()->submit([
    'invoiceType' => InvoiceType::PURCHASE->value,
    'paymentMethod' => PaymentMethod::CASH->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Supplier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'supplier@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Rice 50kg',
            'quantity' => 10,
            'amount' => 50000.0,
            'measurementUnit' => 'kg',
        ],
    ],
]);`"
    />

    <DocHeading :level="2" id="see-also">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/purchases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guide - Purchase Slips
        </NuxtLink>
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
  { id: 'purchase-service', text: 'PurchaseService', depth: 1 },
  { id: 'methods', text: 'Methods', depth: 2 },
  { id: 'submit-method', text: 'submit()', depth: 3 },
  { id: 'example', text: 'Example', depth: 3 },
  { id: 'see-also', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


