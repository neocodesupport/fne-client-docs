<template>
  <DocPage
    title="Purchase Slips"
    description="Complete guide for certifying purchase slips with FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="purchases">Purchase Slips</DocHeading>
    
    <DocParagraph>
      This guide shows you how to certify purchase slips (agricultural product purchase invoices) with FNE Client.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      A purchase slip is a document issued when purchasing agricultural products. Unlike sales invoices, purchase slips do not require taxes.
    </DocParagraph>

    <DocHeading :level="2" id="basic-structure">Basic Structure</DocHeading>

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
    'clientCompanyName' => 'Agricultural Supplier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'supplier@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Rice 50kg',
            'quantity' => 10,
            'amount' => 50000.0, // Unit price excluding tax in cents (500.00 FCFA)
            'measurementUnit' => 'kg',
        ],
        [
            'description' => 'Corn 25kg',
            'quantity' => 20,
            'amount' => 25000.0, // Unit price excluding tax in cents (250.00 FCFA)
            'measurementUnit' => 'kg',
        ],
    ],
]);`"
    />

    <DocHeading :level="2" id="differences">Differences from Sales Invoices</DocHeading>

    <DocParagraph>
      Purchase slips have several important differences:
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <strong>No taxes</strong>: Purchase slips do not require taxes (<DocInlineCode>taxes</DocInlineCode> is not required)
      </DocListItem>
      <DocListItem>
        <strong>Invoice type</strong>: Use <DocInlineCode>InvoiceType::PURCHASE->value</DocInlineCode> instead of <DocInlineCode>InvoiceType::SALE->value</DocInlineCode>
      </DocListItem>
      <DocListItem>
        <strong>Service</strong>: Use <DocInlineCode>FNE::purchase()->submit()</DocInlineCode> instead of <DocInlineCode>FNE::invoice()->sign()</DocInlineCode>
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="measurement-units">Measurement Units</DocHeading>

    <DocParagraph>
      You can specify the measurement unit for each item:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`'items' => [
    [
        'description' => 'Rice',
        'quantity' => 10,
        'amount' => 50000.0,
        'measurementUnit' => 'kg', // Measurement unit
    ],
    [
        'description' => 'Oil bottles',
        'quantity' => 50,
        'amount' => 2000.0,
        'measurementUnit' => 'pcs', // Pieces
    ],
],`"
    />

    <DocHeading :level="2" id="discounts">Discounts</DocHeading>

    <DocParagraph>
      As with sales invoices, you can apply discounts:
    </DocParagraph>

    <DocHeading :level="3" id="global-discount">Global Discount</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::purchase()->submit([
    // ... other fields ...
    'discount' => 5.0, // Global discount of 5%
]);`"
    />

    <DocHeading :level="3" id="item-discount">Item Discount</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::purchase()->submit([
    // ... other fields ...
    'items' => [
        [
            'description' => 'Rice',
            'quantity' => 10,
            'amount' => 50000.0,
            'discount' => 10.0, // 10% discount on this item
            'measurementUnit' => 'kg',
        ],
    ],
]);`"
    />

    <DocHeading :level="2" id="rne">RNE (Normal Business Regime)</DocHeading>

    <DocParagraph>
      If your company is in RNE:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::purchase()->submit([
    // ... other fields ...
    'isRne' => true,
    'rne' => 'RNE123456789', // Required if isRne = true
]);`"
    />

    <DocHeading :level="2" id="response-handling">Response Handling</DocHeading>

    <DocParagraph>
      The response has the same structure as sales invoices:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::purchase()->submit($data);

// Base properties
echo $result->ncc;
echo $result->reference;
echo $result->token;
echo $result->balanceSticker;

// Purchase slip information
if ($result->invoice) {
    $purchase = $result->invoice;
    
    // FNE UUID (IMPORTANT for future refunds)
    echo $purchase->id;
    
    // Total amount (in cents)
    $total = $purchase->amount / 100;
    
    // Items
    foreach ($purchase->items as $item) {
        echo $item->id;          // Item UUID
        echo $item->description;
        echo $item->quantity;
        echo $item->measurementUnit;
    }
}`"
    />

    <DocHeading :level="2" id="model-integration">Model Integration</DocHeading>

    <DocParagraph>
      Use the <DocInlineCode>CertifiablePurchase</DocInlineCode> trait:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiablePurchase;
use Illuminate\\Database\\Eloquent\\Model;

class Purchase extends Model
{
    use CertifiablePurchase;
}

// Usage
$purchase = Purchase::find(1);
$result = $purchase->submit(); // Automatically extracts data`"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Refunds
        </NuxtLink> - Create refunds for your purchase slips
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/mapping" class="text-primary border-b border-transparent hover:border-primary font-medium">
          ERP → FNE Mapping
        </NuxtLink> - Transform your ERP data to FNE
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Error Handling
        </NuxtLink> - Handle errors efficiently
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
  { id: 'purchases', text: 'Purchase Slips', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'basic-structure', text: 'Basic Structure', depth: 2 },
  { id: 'differences', text: 'Differences from Sales Invoices', depth: 2 },
  { id: 'measurement-units', text: 'Measurement Units', depth: 2 },
  { id: 'discounts', text: 'Discounts', depth: 2 },
  { id: 'global-discount', text: 'Global Discount', depth: 3 },
  { id: 'item-discount', text: 'Item Discount', depth: 3 },
  { id: 'rne', text: 'RNE (Normal Business Regime)', depth: 2 },
  { id: 'response-handling', text: 'Response Handling', depth: 2 },
  { id: 'model-integration', text: 'Model Integration', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


