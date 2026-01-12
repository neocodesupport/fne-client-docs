<template>
  <DocPage
    title="InvoiceService"
    description="API reference for the sales invoice service"
    section="API Reference"
  >
    <DocHeading :level="1" id="invoice-service">InvoiceService</DocHeading>
    
    <DocParagraph>
      The <DocInlineCode>InvoiceService</DocInlineCode> service handles sales invoice certification.
    </DocParagraph>

    <DocHeading :level="2" id="methods">Methods</DocHeading>

    <DocHeading :level="3" id="sign-method">sign()</DocHeading>

    <DocParagraph>
      Certifies a sales invoice.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`public function sign(?array $data = null): ResponseDTO`"
    />

    <DocParagraph>
      <strong>Parameters:</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>
        <DocInlineCode>$data</DocInlineCode> (array|null): Invoice data (optional if data is defined via context)
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
use Neocode\\FNE\\Enums\\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Product',
            'quantity' => 1,
            'amount' => 10000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`"
    />

    <DocHeading :level="2" id="see-also">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/invoices" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guide - Sales Invoices
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
  { id: 'invoice-service', text: 'InvoiceService', depth: 1 },
  { id: 'methods', text: 'Methods', depth: 2 },
  { id: 'sign-method', text: 'sign()', depth: 3 },
  { id: 'example', text: 'Example', depth: 3 },
  { id: 'see-also', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


