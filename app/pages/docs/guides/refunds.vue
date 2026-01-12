<template>
  <DocPage
    title="Refunds"
    description="Complete guide for creating refunds with FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="refunds">Refunds</DocHeading>
    
    <DocParagraph>
      This guide shows you how to create refunds for your certified invoices with FNE Client.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      A refund is a document that cancels or reduces the amount of a previously certified invoice. To create a refund, you must have the UUID of the original invoice and the UUIDs of the items to refund.
    </DocParagraph>

    <DocAlert type="warning">
      <strong>Important: Save UUIDs</strong><br>
      To create a refund, you must have saved:
      <DocList>
        <DocListItem><strong>Invoice UUID</strong> (<DocInlineCode>invoice.id</DocInlineCode>) from the original invoice</DocListItem>
        <DocListItem><strong>Item UUIDs</strong> (<DocInlineCode>item.id</DocInlineCode>) of the items to refund</DocListItem>
      </DocList>
      These UUIDs are returned in the response when certifying the original invoice.
    </DocAlert>

    <DocHeading :level="3" id="save-example">Save Example</DocHeading>

    <DocCode
      language="php"
      :code="saveExampleCode"
    />

    <DocHeading :level="2" id="full-refund">Create a Full Refund</DocHeading>

    <DocParagraph>
      A full refund refunds the entire invoice:
    </DocParagraph>

    <DocCode
      language="php"
      :code="fullRefundCode"
    />

    <DocHeading :level="2" id="partial-refund">Create a Partial Refund</DocHeading>

    <DocParagraph>
      A partial refund refunds only certain items or a partial quantity:
    </DocParagraph>

    <DocCode
      language="php"
      :code="partialRefundCode"
    />

    <DocHeading :level="2" id="response-structure">Response Structure</DocHeading>

    <DocParagraph>
      A refund response has a different structure from an invoice:
    </DocParagraph>

    <DocCode
      language="php"
      :code="responseStructureCode"
    />

    <DocHeading :level="2" id="check-refund">Check if it's a Refund</DocHeading>

    <DocCode
      language="php"
      :code="checkRefundCode"
    />

    <DocHeading :level="2" id="model-integration">Model Integration</DocHeading>

    <DocParagraph>
      Use the <DocInlineCode>CertifiableRefund</DocInlineCode> trait:
    </DocParagraph>

    <DocCode
      language="php"
      :code="modelIntegrationCode"
    />

    <DocHeading :level="2" id="error-handling">Error Handling</DocHeading>

    <DocCode
      language="php"
      :code="errorHandlingCode"
    />

    <DocHeading :level="2" id="best-practices">Best Practices</DocHeading>

    <DocList ordered>
      <DocListItem>
        <strong>Always save UUIDs</strong>: When certifying an invoice, always save the invoice UUID and item UUIDs
      </DocListItem>
      <DocListItem>
        <strong>Check quantities</strong>: Ensure the refunded quantity does not exceed the original quantity
      </DocListItem>
      <DocListItem>
        <strong>Handle partial refunds</strong>: You can create multiple refunds for the same invoice
      </DocListItem>
      <DocListItem>
        <strong>Store references</strong>: Save the refund reference (starts with "A") for traceability
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="complete-example">Complete Example</DocHeading>

    <DocCode
      language="php"
      :code="completeExampleCode"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Error Handling
        </NuxtLink> - Handle errors efficiently
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/mapping" class="text-primary border-b border-transparent hover:border-primary font-medium">
          ERP → FNE Mapping
        </NuxtLink> - Transform your ERP data to FNE
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Examples
        </NuxtLink> - Check out more code examples
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

// Code blocks
const saveExampleCode = `// When certifying the original invoice
$result = FNE::invoice()->sign($data);

if ($result->invoice) {
    $invoice = $result->invoice;
    
    // Save the invoice UUID
    DB::table('fne_certifications')->insert([
        'fne_invoice_id' => $invoice->id, // FNE UUID
        'reference' => $invoice->reference,
        'amount' => $invoice->amount / 100,
        'created_at' => now(),
    ]);
    
    // Save item UUIDs
    foreach ($invoice->items as $item) {
        DB::table('fne_invoice_items')->insert([
            'fne_item_id' => $item->id, // Item UUID
            'fne_invoice_id' => $invoice->id,
            'description' => $item->description,
            'quantity' => $item->quantity,
            'amount' => $item->amount / 100,
            'created_at' => now(),
        ]);
    }
}`

const fullRefundCode = `use Neocode\\FNE\\Facades\\FNE;

// Original invoice UUID (retrieved from your database)
$invoiceId = 'e2b2d8da-a532-4c08-9182-f5b428ca468d';

// UUIDs of all items (retrieved from your database)
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e', // Item UUID
        'quantity' => 30.0, // Quantity to refund
    ],
    [
        'id' => 'another-item-uuid',
        'quantity' => 10.0,
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);

// Response for a refund
echo $result->ncc;              // Taxpayer identifier
echo $result->reference;         // Reference starting with "A" (Refund)
echo $result->token;             // QR code verification URL
echo $result->balanceSticker;    // Number of remaining stickers

// ⚠️ IMPORTANT: invoice is always null for refunds
// Only the reference starts with "A"`

const partialRefundCode = `// Refund only certain items
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e',
        'quantity' => 10.0, // Refund only 10 out of 30
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);`

const responseStructureCode = `$result = FNE::refund()->issue($invoiceId, $items);

// Base properties (identical to invoices)
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "A9606123E2500000006" (starts with "A")
echo $result->token;             // Complete verification URL
echo $result->warning;           // false
echo $result->balanceSticker;    // 178

// ⚠️ IMPORTANT: invoice is ALWAYS null for refunds
// Unlike invoices, there is no invoice object in the response
if ($result->invoice === null) {
    echo "This is a refund"; // Always true for refunds
}`

const checkRefundCode = `if ($result->isRefund()) {
    echo "This is a refund";
    echo "Reference: " . $result->reference; // Starts with "A"
}

// Or check manually
if (str_starts_with($result->reference, 'A')) {
    echo "This is a refund";
}`

const modelIntegrationCode = `use Neocode\\FNE\\Concerns\\CertifiableRefund;
use Illuminate\\Database\\Eloquent\\Model;

class Invoice extends Model
{
    use CertifiableRefund;
    
    // The trait automatically detects the FNE UUID from:
    // - fne_id
    // - fne_invoice_id
    // - getFneInvoiceId()
}

// Usage
$invoice = Invoice::find(1);
$items = [
    [
        'id' => 'item-uuid-1',
        'quantity' => 10.0,
    ],
];

$result = $invoice->issueRefund($items);`

const errorHandlingCode = `use Neocode\\FNE\\Exceptions\\ValidationException;
use Neocode\\FNE\\Exceptions\\NotFoundException;

try {
    $result = FNE::refund()->issue($invoiceId, $items);
} catch (ValidationException $e) {
    // Validation error (invalid UUID, invalid quantity, etc.)
    echo "Validation error: " . $e->getMessage();
} catch (NotFoundException $e) {
    // Original invoice not found
    echo "Invoice not found: " . $e->getMessage();
} catch (\\Exception $e) {
    // Other error
    echo "Error: " . $e->getMessage();
}`

const completeExampleCode = `// 1. Certify an original invoice
$invoiceResult = FNE::invoice()->sign($invoiceData);

// 2. Save UUIDs
$invoiceId = $invoiceResult->invoice->id;
$itemIds = array_map(fn($item) => $item->id, $invoiceResult->invoice->items);

DB::table('fne_certifications')->insert([
    'fne_invoice_id' => $invoiceId,
    'reference' => $invoiceResult->reference,
    'created_at' => now(),
]);

// 3. Later, create a refund
$refundItems = [
    [
        'id' => $itemIds[0], // First item
        'quantity' => 5.0, // Refund 5 units
    ],
];

$refundResult = FNE::refund()->issue($invoiceId, $refundItems);

// 4. Save the refund
DB::table('fne_refunds')->insert([
    'fne_invoice_id' => $invoiceId,
    'reference' => $refundResult->reference, // Starts with "A"
    'created_at' => now(),
]);`

const headings = ref([
  { id: 'refunds', text: 'Refunds', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'save-example', text: 'Save Example', depth: 3 },
  { id: 'full-refund', text: 'Create a Full Refund', depth: 2 },
  { id: 'partial-refund', text: 'Create a Partial Refund', depth: 2 },
  { id: 'response-structure', text: 'Response Structure', depth: 2 },
  { id: 'check-refund', text: 'Check if it\'s a Refund', depth: 2 },
  { id: 'model-integration', text: 'Model Integration', depth: 2 },
  { id: 'error-handling', text: 'Error Handling', depth: 2 },
  { id: 'best-practices', text: 'Best Practices', depth: 2 },
  { id: 'complete-example', text: 'Complete Example', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>

