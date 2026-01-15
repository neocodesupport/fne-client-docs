<template>
  <DocPage
    title="DTOs"
    description="Complete reference for DTOs (Data Transfer Objects)"
    sub-description="DTOs (Data Transfer Objects) allow manipulating data in a type-safe way."
    section="API Reference"
    heading-id="dtos"
  >

    <DocHeading :level="2" id="response-dto">ResponseDTO</DocHeading>

    <DocParagraph>
      Complete FNE API response.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\DTOs\\ResponseDTO;

$result = FNE::invoice()->sign($data);

// Properties
$result->ncc              // string - Taxpayer identifier
$result->reference        // string - FNE reference number
$result->token            // string - QR code verification URL
$result->warning          // bool - Alert if low stock
$result->balanceSticker   // int - Remaining stickers count
$result->invoice          // ?InvoiceResponseDTO - Invoice information (null for refunds)

// Methods
$result->isInvoice()      // bool - Checks if it's an invoice
$result->isRefund()       // bool - Checks if it's a refund
$result->toArray()        // array - Converts to array`"
    />

    <DocHeading :level="2" id="invoice-response-dto">InvoiceResponseDTO</DocHeading>

    <DocParagraph>
      Invoice information in the response.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`if ($result->invoice) {
    $invoice = $result->invoice;
    
    // Main properties
    $invoice->id                    // string - FNE UUID (IMPORTANT for refunds)
    $invoice->amount                // int - Total amount including tax in cents
    $invoice->vatAmount            // int - VAT amount in cents
    $invoice->clientCompanyName    // string
    $invoice->items                // array<InvoiceItemResponseDTO>
    
    // Methods
    $invoice->getAmountInFCFA()    // float - Amount in FCFA
    $invoice->getVatAmountInFCFA()  // float - VAT in FCFA
}`"
    />

    <DocHeading :level="2" id="invoice-item-response-dto">InvoiceItemResponseDTO</DocHeading>

    <DocParagraph>
      Invoice item information.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`foreach ($result->invoice->items as $item) {
    $item->id              // string - Item UUID (IMPORTANT for refunds)
    $item->description     // string
    $item->quantity        // float
    $item->amount          // int - Unit price excluding tax in cents
    $item->taxes           // array<TaxResponseDTO>
    
    // Methods
    $item->getAmountInFCFA() // float - Unit price excluding tax in FCFA
}`"
    />

    <DocHeading :level="2" id="array-conversion">Array Conversion</DocHeading>

    <DocParagraph>
      All DTOs can be converted to arrays:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$array = $result->toArray();
$json = json_encode($result); // Implements JsonSerializable`"
    />

    <DocHeading :level="2" id="next-steps">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/api-reference/enums" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Enums
        </NuxtLink> - Reference for available enums
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
  { id: 'dtos', text: 'DTOs', depth: 1 },
  { id: 'response-dto', text: 'ResponseDTO', depth: 2 },
  { id: 'invoice-response-dto', text: 'InvoiceResponseDTO', depth: 2 },
  { id: 'invoice-item-response-dto', text: 'InvoiceItemResponseDTO', depth: 2 },
  { id: 'array-conversion', text: 'Array Conversion', depth: 2 },
  { id: 'next-steps', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>



