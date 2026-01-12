<template>
  <DocPage
    title="Cas d'usage réels"
    description="Exemples de cas d'usage réels avec FNE Client"
    section="Exemples"
  >
    <DocHeading :level="1" id="use-cases">Cas d'usage réels</DocHeading>
    
    <DocParagraph>
      Cette page contient des exemples de cas d'usage réels avec FNE Client.
    </DocParagraph>

    <DocHeading :level="2" id="ecommerce">E-commerce : Certification automatique</DocHeading>

    <DocCode
      language="php"
      :code="ecommerceCode"
    />

    <DocHeading :level="2" id="erp">ERP : Intégration avec mapping personnalisé</DocHeading>

    <DocCode
      language="php"
      :code="erpCode"
    />

    <DocHeading :level="2" id="saas">SaaS : Génération de factures d'abonnement</DocHeading>

    <DocCode
      language="php"
      :code="saasCode"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples/basic" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Exemples basiques
        </NuxtLink> - Consultez des exemples simples
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples/advanced" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Exemples avancés
        </NuxtLink> - Consultez des exemples plus complexes
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides
        </NuxtLink> - Apprenez les fonctionnalités avancées
      </DocListItem>
    </DocList>

    <DocAlert type="info">
      <strong>Besoin d'aide ?</strong> Consultez la 
      <NuxtLink to="/fr/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
        documentation complète
      </NuxtLink> 
      ou 
      <a href="https://github.com/neocode/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
        ouvrez une issue
      </a> 
      sur GitHub.
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
        // Certifier automatiquement la facture lors de la finalisation de la commande
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
                    'amount' => $item->price * 100, // Convertir en centimes
                    'taxes' => [TaxType::TVA->value],
                ];
            })->toArray(),
            'taxes' => TaxType::TVA->value,
        ]);
        
        // Sauvegarder la référence FNE
        $order->update([
            'fne_reference' => $result->reference,
            'fne_token' => $result->token,
        ]);
        
        return $result;
    }
}`

const erpCode = `// Configuration du mapping dans config/fne.php
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.email',
    ],
],

// Utilisation avec données ERP
$erpInvoice = [
    'customer' => [
        'company_name' => 'Entreprise Client',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'invoiceType' => InvoiceType::SALE->value,
    // ... autres champs FNE directement ...
];

// Le mapping est appliqué automatiquement
$result = FNE::invoice()->sign($erpInvoice);`

const saasCode = `class SubscriptionController
{
    public function generateInvoice(Subscription $subscription)
    {
        $result = FNE::invoice()->sign([
            'invoiceType' => InvoiceType::SALE->value,
            'paymentMethod' => PaymentMethod::DEFERRED->value, // Paiement à terme
            'template' => InvoiceTemplate::B2B->value,
            'clientNcc' => $subscription->customer->ncc,
            'clientCompanyName' => $subscription->customer->company_name,
            'clientPhone' => $subscription->customer->phone,
            'clientEmail' => $subscription->customer->email,
            'items' => [
                [
                    'description' => "Abonnement {$subscription->plan->name}",
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
  { id: 'use-cases', text: 'Cas d\'usage réels', depth: 1 },
  { id: 'ecommerce', text: 'E-commerce : Certification automatique', depth: 2 },
  { id: 'erp', text: 'ERP : Intégration avec mapping personnalisé', depth: 2 },
  { id: 'saas', text: 'SaaS : Génération de factures d\'abonnement', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>

