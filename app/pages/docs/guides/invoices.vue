<template>
  <DocPage
    title="Sales Invoices"
    description="Complete guide for certifying sales invoices with FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="invoices">Sales Invoices</DocHeading>
    
    <DocParagraph>
      This guide shows you how to certify sales invoices with FNE Client.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      A sales invoice is a commercial document issued by a company for a sales transaction. FNE Client allows you to certify these invoices with the FNE API.
    </DocParagraph>

    <DocHeading :level="2" id="template-types">Template Types</DocHeading>

    <DocParagraph>
      FNE Client supports 4 types of invoice templates:
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>B2C</strong> (Business to Consumer): Invoice for an individual client
      </DocListItem>
      <DocListItem>
        <strong>B2B</strong> (Business to Business): Invoice for a business (requires <DocInlineCode>clientNcc</DocInlineCode>)
      </DocListItem>
      <DocListItem>
        <strong>B2F</strong> (Business to Foreign): Invoice for an international client (may require foreign currency)
      </DocListItem>
      <DocListItem>
        <strong>B2G</strong> (Business to Government): Invoice for a government institution
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="basic-structure">Basic Structure</DocHeading>

    <DocHeading :level="3" id="example-b2c">B2C Example</DocHeading>

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
    'clientCompanyName' => 'Individual Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Product 1',
            'quantity' => 2,
            'amount' => 5000.0, // Unit price excluding tax in cents
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`"
    />

    <DocHeading :level="3" id="example-b2b">B2B Example</DocHeading>

    <DocParagraph>
      For a B2B invoice, <DocInlineCode>clientNcc</DocInlineCode> is required:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value,
    'isRne' => false,
    'clientNcc' => '123456789', // Required for B2B
    'clientCompanyName' => 'Business Client',
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
]);`"
    />

    <DocHeading :level="3" id="example-b2f">B2F Example with Foreign Currency</DocHeading>

    <DocParagraph>
      For a B2F invoice with foreign currency:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\ForeignCurrency;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::TRANSFER->value,
    'template' => InvoiceTemplate::B2F->value,
    'isRne' => false,
    'clientCompanyName' => 'International Client',
    'clientPhone' => '+33123456789',
    'clientEmail' => 'client@international.com',
    'foreignCurrency' => ForeignCurrency::EUR->value,
    'foreignCurrencyRate' => 655.0, // Exchange rate
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'International Service',
            'quantity' => 1,
            'amount' => 100000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`"
    />

    <DocHeading :level="2" id="payment-methods">Payment Methods</DocHeading>

    <DocParagraph>
      FNE Client supports the following payment methods:
    </DocParagraph>

    <DocList>
      <DocListItem><DocInlineCode>cash</DocInlineCode>: Cash payment</DocListItem>
      <DocListItem><DocInlineCode>card</DocInlineCode>: Bank card payment</DocListItem>
      <DocListItem><DocInlineCode>check</DocInlineCode>: Check payment</DocListItem>
      <DocListItem><DocInlineCode>mobile-money</DocInlineCode>: Mobile money payment</DocListItem>
      <DocListItem><DocInlineCode>transfer</DocInlineCode>: Bank transfer payment</DocListItem>
      <DocListItem><DocInlineCode>deferred</DocInlineCode>: Deferred payment</DocListItem>
    </DocList>

    <DocHeading :level="2" id="tax-types">Tax Types</DocHeading>

    <DocParagraph>
      Supported tax types:
    </DocParagraph>

    <DocList>
      <DocListItem><DocInlineCode>TVA</DocInlineCode>: Standard VAT of 18%</DocListItem>
      <DocListItem><DocInlineCode>TVAB</DocInlineCode>: Reduced VAT of 9%</DocListItem>
      <DocListItem><DocInlineCode>TVAC</DocInlineCode>: Exempt VAT (conv) of 0%</DocListItem>
      <DocListItem><DocInlineCode>TVAD</DocInlineCode>: Exempt VAT (leg) of 0% for TEE and RME</DocListItem>
    </DocList>

    <DocHeading :level="2" id="custom-taxes">Custom Taxes</DocHeading>

    <DocParagraph>
      You can add custom taxes at the invoice or item level:
    </DocParagraph>

    <DocHeading :level="3" id="custom-taxes-invoice">Custom Taxes at Invoice Level</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... other fields ...
    'customTaxes' => [
        [
            'name' => 'DTD',
            'amount' => 5.0, // 5%
        ],
    ],
]);`"
    />

    <DocHeading :level="3" id="custom-taxes-item">Custom Taxes at Item Level</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... other fields ...
    'items' => [
        [
            'description' => 'Product with custom taxes',
            'quantity' => 1,
            'amount' => 10000.0,
            'taxes' => [TaxType::TVA->value],
            'customTaxes' => [
                [
                    'name' => 'GRA',
                    'amount' => 2.5, // 2.5%
                ],
                [
                    'name' => 'AIRSI',
                    'amount' => 1.0, // 1%
                ],
            ],
        ],
    ],
]);`"
    />

    <DocHeading :level="2" id="discounts">Discounts</DocHeading>

    <DocHeading :level="3" id="global-discount">Global Discount</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... other fields ...
    'discount' => 10.0, // Global discount of 10%
]);`"
    />

    <DocHeading :level="3" id="item-discount">Item Discount</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... other fields ...
    'items' => [
        [
            'description' => 'Product with discount',
            'quantity' => 2,
            'amount' => 5000.0,
            'discount' => 15.0, // 15% discount on this item
            'taxes' => [TaxType::TVA->value],
        ],
    ],
]);`"
    />

    <DocHeading :level="2" id="rne">RNE (Normal Business Regime)</DocHeading>

    <DocParagraph>
      If your company is in RNE, you must provide the RNE number:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... other fields ...
    'isRne' => true,
    'rne' => 'RNE123456789', // Required if isRne = true
]);`"
    />

    <DocHeading :level="2" id="response-handling">Response Handling</DocHeading>

    <DocParagraph>
      The response contains all information about the certified invoice:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign($data);

// Base properties
echo $result->ncc;              // Taxpayer identifier
echo $result->reference;         // FNE reference number
echo $result->token;             // Complete QR code verification URL
echo $result->warning;           // Alert if sticker stock is low
echo $result->balanceSticker;    // Number of remaining stickers

// Invoice information
if ($result->invoice) {
    $invoice = $result->invoice;
    
    // FNE UUID (IMPORTANT for future refunds)
    echo $invoice->id;           // UUID to save in database
    
    // Amounts (in cents, divide by 100 for FCFA)
    $totalTTC = $invoice->amount / 100;
    $totalTVA = $invoice->vatAmount / 100;
    
    // Client information
    echo $invoice->clientCompanyName;
    echo $invoice->clientNcc; // null for B2C
    
    // Items
    foreach ($invoice->items as $item) {
        echo $item->id;          // Item UUID (IMPORTANT for refunds)
        echo $item->description;
        echo $item->quantity;
        echo $item->amount / 100; // Unit price excluding tax in FCFA
    }
}`"
    />

    <DocHeading :level="2" id="model-integration">Model Integration</DocHeading>

    <DocParagraph>
      You can use the <DocInlineCode>CertifiableInvoice</DocInlineCode> trait to directly integrate certification into your models:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiableInvoice;
use Illuminate\\Database\\Eloquent\\Model;

class Invoice extends Model
{
    use CertifiableInvoice;
    
    // The trait automatically extracts data from the model
}

// Usage
$invoice = Invoice::find(1);
$result = $invoice->certify(); // Automatically extracts data

// Or with custom data
$result = $invoice->certify([
    'items' => [...], // Custom data
]);`"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/purchases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Purchase Slips
        </NuxtLink> - Certify purchase slips
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Refunds
        </NuxtLink> - Create refunds for your invoices
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/mapping" class="text-primary border-b border-transparent hover:border-primary font-medium">
          ERP → FNE Mapping
        </NuxtLink> - Transform your ERP data to FNE
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
  { id: 'invoices', text: 'Sales Invoices', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'template-types', text: 'Template Types', depth: 2 },
  { id: 'basic-structure', text: 'Basic Structure', depth: 2 },
  { id: 'example-b2c', text: 'B2C Example', depth: 3 },
  { id: 'example-b2b', text: 'B2B Example', depth: 3 },
  { id: 'example-b2f', text: 'B2F Example with Foreign Currency', depth: 3 },
  { id: 'payment-methods', text: 'Payment Methods', depth: 2 },
  { id: 'tax-types', text: 'Tax Types', depth: 2 },
  { id: 'custom-taxes', text: 'Custom Taxes', depth: 2 },
  { id: 'custom-taxes-invoice', text: 'Custom Taxes at Invoice Level', depth: 3 },
  { id: 'custom-taxes-item', text: 'Custom Taxes at Item Level', depth: 3 },
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



