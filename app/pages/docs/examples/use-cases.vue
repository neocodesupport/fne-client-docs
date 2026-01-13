<template>
  <DocPage
    title="Real Use Cases"
    description="Real-world use case examples with FNE Client"
    section="Examples"
  >
    <DocHeading :level="1" id="use-cases">Real Use Cases</DocHeading>
    
    <DocParagraph>
      This page contains real-world use case examples with FNE Client.
    </DocParagraph>

    <DocHeading :level="2" id="ecommerce">E-commerce: Automatic Certification</DocHeading>

    <DocCode
      language="php"
      :code="ecommerceCode"
    />

    <DocHeading :level="2" id="erp">ERP: Integration with Custom Mapping</DocHeading>

    <DocCode
      language="php"
      :code="erpCode"
    />

    <DocHeading :level="2" id="saas">SaaS: Subscription Invoice Generation</DocHeading>

    <DocCode
      language="php"
      :code="saasCode"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/examples/basic" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Basic Examples
        </NuxtLink> - Check out simple examples
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/examples/advanced" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Advanced Examples
        </NuxtLink> - Check out more complex examples
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
const ecommerceCode = `class OrderController
{
    public function complete(Order $order)
    {
        // Automatically certify invoice when order is finalized
        $result = FNE::invoice()->sign([
            'invoiceType' => InvoiceType::SALE->value,
            'paymentMethod' => $this->mapPaymentMethod($order->payment_method),
            'template' => $order->customer->isCompany() 
                ? InvoiceTemplate::B2B->value 
                : InvoiceTemplate::B2C->value,
            'clientCompanyName' => $order->customer->name,
            'clientPhone' => $order->customer->phone,
            'clientEmail' => $order->customer->email,
            'items' => $order->items->map(function ($item) {
                return [
                    'description' => $item->product->name,
                    'quantity' => $item->quantity,
                    'amount' => $item->price * 100, // Convert to cents
                    'taxes' => [TaxType::TVA->value],
                ];
            })->toArray(),
            'taxes' => TaxType::TVA->value,
        ]);
        
        // Save FNE reference
        $order->update([
            'fne_reference' => $result->reference,
            'fne_token' => $result->token,
        ]);
        
        return $result;
    }
}`

const erpCode = `// Mapping configuration in config/fne.php
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.email',
    ],
],

// Usage with ERP data
$erpInvoice = [
    'customer' => [
        'company_name' => 'Client Company',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'invoiceType' => InvoiceType::SALE->value,
    // ... other FNE fields directly ...
];

// Mapping is applied automatically
$result = FNE::invoice()->sign($erpInvoice);`

const saasCode = `class SubscriptionController
{
    public function generateInvoice(Subscription $subscription)
    {
        $result = FNE::invoice()->sign([
            'invoiceType' => InvoiceType::SALE->value,
            'paymentMethod' => PaymentMethod::DEFERRED->value, // Deferred payment
            'template' => InvoiceTemplate::B2B->value,
            'clientNcc' => $subscription->customer->ncc,
            'clientCompanyName' => $subscription->customer->company_name,
            'clientPhone' => $subscription->customer->phone,
            'clientEmail' => $subscription->customer->email,
            'items' => [
                [
                    'description' => "Subscription {$subscription->plan->name}",
                    'quantity' => 1,
                    'amount' => $subscription->amount * 100,
                    'taxes' => [TaxType::TVA->value],
                ],
            ],
            'taxes' => TaxType::TVA->value,
        ]);
        
        return $result;
    }
}`

const headings = ref([
  { id: 'use-cases', text: 'Real Use Cases', depth: 1 },
  { id: 'ecommerce', text: 'E-commerce: Automatic Certification', depth: 2 },
  { id: 'erp', text: 'ERP: Integration with Custom Mapping', depth: 2 },
  { id: 'saas', text: 'SaaS: Subscription Invoice Generation', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>



