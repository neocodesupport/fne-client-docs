<template>
  <DocPage
    title="Advanced Examples"
    description="Advanced code examples with FNE Client"
    sub-description="This page contains advanced code examples for complex use cases."
    section="Examples"
    heading-id="advanced-examples"
  >

    <DocHeading :level="2" id="custom-taxes">Invoice with Custom Taxes</DocHeading>

    <DocCode
      language="php"
      :code="customTaxesCode"
    />

    <DocHeading :level="2" id="b2f-foreign-currency">B2F Invoice with Foreign Currency</DocHeading>

    <DocCode
      language="php"
      :code="b2fForeignCurrencyCode"
    />

    <DocHeading :level="2" id="discounts">Invoice with Discounts</DocHeading>

    <DocCode
      language="php"
      :code="discountsCode"
    />

    <DocHeading :level="2" id="model-integration">Model Integration</DocHeading>

    <DocCode
      language="php"
      :code="modelIntegrationCode"
    />

    <DocHeading :level="2" id="error-handling">Complete Error Handling</DocHeading>

    <DocCode
      language="php"
      :code="errorHandlingCode"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
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
const customTaxesCode = `$result = FNE::invoice()->sign([
    // ... base fields ...
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
    'customTaxes' => [
        [
            'name' => 'DTD',
            'amount' => 5.0, // 5% at invoice level
        ],
    ],
]);`

const b2fForeignCurrencyCode = `use Neocode\\FNE\\Enums\\ForeignCurrency;

$result = FNE::invoice()->sign([
    // ... base fields ...
    'template' => InvoiceTemplate::B2F->value,
    'foreignCurrency' => ForeignCurrency::EUR->value,
    'foreignCurrencyRate' => 655.0, // Exchange rate
    // ...
]);`

const discountsCode = `$result = FNE::invoice()->sign([
    // ... base fields ...
    'discount' => 10.0, // Global discount of 10%
    'items' => [
        [
            'description' => 'Product with discount',
            'quantity' => 2,
            'amount' => 5000.0,
            'discount' => 15.0, // 15% discount on this item
            'taxes' => [TaxType::TVA->value],
        ],
    ],
]);`

const modelIntegrationCode = `use Neocode\\FNE\\Concerns\\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Usage
$invoice = Invoice::find(1);
$result = $invoice->certify(); // Automatically extracts data`

const errorHandlingCode = `use Neocode\\FNE\\Exceptions\\ValidationException;
use Neocode\\FNE\\Exceptions\\AuthenticationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Handle validation error
} catch (AuthenticationException $e) {
    // Handle authentication error
}`

const headings = ref([
  { id: 'advanced-examples', text: 'Advanced Examples', depth: 1 },
  { id: 'custom-taxes', text: 'Invoice with Custom Taxes', depth: 2 },
  { id: 'b2f-foreign-currency', text: 'B2F Invoice with Foreign Currency', depth: 2 },
  { id: 'discounts', text: 'Invoice with Discounts', depth: 2 },
  { id: 'model-integration', text: 'Model Integration', depth: 2 },
  { id: 'error-handling', text: 'Complete Error Handling', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>



