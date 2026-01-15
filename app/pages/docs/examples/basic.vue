<template>
  <DocPage
    title="Basic Examples"
    description="Basic code examples to get started with FNE Client"
    sub-description="This page contains basic code examples to get started with FNE Client."
    section="Examples"
    heading-id="basic-examples"
  >

    <DocHeading :level="2" id="b2c-invoice">Simple B2C Invoice</DocHeading>

    <DocCode
      language="php"
      :code="b2cInvoiceCode"
    />

    <DocHeading :level="2" id="b2b-invoice">B2B Invoice with clientNcc</DocHeading>

    <DocCode
      language="php"
      :code="b2bInvoiceCode"
    />

    <DocHeading :level="2" id="purchase">Purchase Slip</DocHeading>

    <DocCode
      language="php"
      :code="purchaseCode"
    />

    <DocHeading :level="2" id="refund">Refund</DocHeading>

    <DocCode
      language="php"
      :code="refundCode"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/examples/advanced" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Advanced Examples
        </NuxtLink> - Check out more complex examples
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/examples/use-cases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Real Use Cases
        </NuxtLink> - See real-world use case examples
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides
        </NuxtLink> - Learn advanced features
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

// Code blocks
const b2cInvoiceCode = `use Neocode\\FNE\\Facades\\FNE;
use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Individual Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Product 1',
            'quantity' => 2,
            'amount' => 5000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`

const b2bInvoiceCode = `$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value,
    'isRne' => false,
    'clientNcc' => '123456789', // Required for B2B
    'clientCompanyName' => 'Client Company',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Professional Service',
            'quantity' => 1,
            'amount' => 100000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`

const purchaseCode = `$result = FNE::purchase()->submit([
    'invoiceType' => InvoiceType::PURCHASE->value,
    'paymentMethod' => PaymentMethod::CASH->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Agricultural Supplier',
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
]);`

const refundCode = `$invoiceId = 'e2b2d8da-a532-4c08-9182-f5b428ca468d';
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e',
        'quantity' => 10.0,
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);`

const headings = ref([
  { id: 'basic-examples', text: 'Basic Examples', depth: 1 },
  { id: 'b2c-invoice', text: 'Simple B2C Invoice', depth: 2 },
  { id: 'b2b-invoice', text: 'B2B Invoice with clientNcc', depth: 2 },
  { id: 'purchase', text: 'Purchase Slip', depth: 2 },
  { id: 'refund', text: 'Refund', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>



