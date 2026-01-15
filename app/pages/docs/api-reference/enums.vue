<template>
  <DocPage
    title="Enums"
    description="Complete reference for available enums in FNE Client"
    sub-description="FNE Client uses PHP 8.2+ enums to ensure type safety."
    section="API Reference"
    heading-id="enums"
  >

    <DocHeading :level="2" id="invoice-type">InvoiceType</DocHeading>

    <DocParagraph>
      Invoice types.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\InvoiceType;

InvoiceType::SALE->value      // 'sale' - Sales invoice
InvoiceType::PURCHASE->value  // 'purchase' - Purchase slip`"
    />

    <DocHeading :level="2" id="payment-method">PaymentMethod</DocHeading>

    <DocParagraph>
      Payment methods.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\PaymentMethod;

PaymentMethod::CASH->value           // 'cash'
PaymentMethod::CARD->value           // 'card'
PaymentMethod::CHECK->value          // 'check'
PaymentMethod::MOBILE_MONEY->value  // 'mobile-money'
PaymentMethod::TRANSFER->value       // 'transfer'
PaymentMethod::DEFERRED->value       // 'deferred'`"
    />

    <DocHeading :level="2" id="invoice-template">InvoiceTemplate</DocHeading>

    <DocParagraph>
      Invoice templates.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\InvoiceTemplate;

InvoiceTemplate::B2C->value  // 'B2C' - Business to Consumer
InvoiceTemplate::B2B->value  // 'B2B' - Business to Business
InvoiceTemplate::B2F->value  // 'B2F' - Business to Foreign
InvoiceTemplate::B2G->value  // 'B2G' - Business to Government`"
    />

    <DocHeading :level="2" id="tax-type">TaxType</DocHeading>

    <DocParagraph>
      Tax types.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\TaxType;

TaxType::TVA->value   // 'TVA' - Standard VAT 18%
TaxType::TVAB->value  // 'TVAB' - Reduced VAT 9%
TaxType::TVAC->value  // 'TVAC' - Exempt VAT (convention) 0%
TaxType::TVAD->value  // 'TVAD' - Exempt VAT (legal) 0%`"
    />

    <DocHeading :level="2" id="foreign-currency">ForeignCurrency</DocHeading>

    <DocParagraph>
      Supported foreign currencies.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\ForeignCurrency;

ForeignCurrency::XOF->value  // 'XOF' - CFA Franc
ForeignCurrency::USD->value  // 'USD' - US Dollar
ForeignCurrency::EUR->value  // 'EUR' - Euro
// ... other currencies`"
    />

    <DocHeading :level="2" id="usage">Usage</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'taxes' => TaxType::TVA->value,
]);`"
    />

    <DocHeading :level="2" id="next-steps">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/api-reference/dtos" class="text-primary border-b border-transparent hover:border-primary font-medium">
          DTOs
        </NuxtLink> - DTOs reference
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
  { id: 'enums', text: 'Enums', depth: 1 },
  { id: 'invoice-type', text: 'InvoiceType', depth: 2 },
  { id: 'payment-method', text: 'PaymentMethod', depth: 2 },
  { id: 'invoice-template', text: 'InvoiceTemplate', depth: 2 },
  { id: 'tax-type', text: 'TaxType', depth: 2 },
  { id: 'foreign-currency', text: 'ForeignCurrency', depth: 2 },
  { id: 'usage', text: 'Usage', depth: 2 },
  { id: 'next-steps', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>



