<template>
  <DocPage
    title="Exemples basiques"
    description="Exemples de code basiques pour démarrer avec FNE Client"
    sub-description="Cette page contient des exemples de code basiques pour démarrer avec FNE Client."
    section="Exemples"
    heading-id="basic-examples"
  >

    <DocHeading :level="2" id="b2c-invoice">Facture B2C simple</DocHeading>

    <DocCode
      language="php"
      :code="b2cInvoiceCode"
    />

    <DocHeading :level="2" id="b2b-invoice">Facture B2B avec clientNcc</DocHeading>

    <DocCode
      language="php"
      :code="b2bInvoiceCode"
    />

    <DocHeading :level="2" id="purchase">Bordereau d'achat</DocHeading>

    <DocCode
      language="php"
      :code="purchaseCode"
    />

    <DocHeading :level="2" id="refund">Avoir</DocHeading>

    <DocCode
      language="php"
      :code="refundCode"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples/advanced" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Exemples avancés
        </NuxtLink> - Consultez des exemples plus complexes
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples/use-cases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Cas d'usage réels
        </NuxtLink> - Voir des exemples de cas d'usage réels
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
      <a href="https://github.com/neocodesupport/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
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
    'clientCompanyName' => 'Client Particulier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Produit 1',
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
    'clientNcc' => '123456789', // Obligatoire pour B2B
    'clientCompanyName' => 'Entreprise Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Service professionnel',
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
    'clientCompanyName' => 'Fournisseur Agricole',
    'clientPhone' => '0123456789',
    'clientEmail' => 'fournisseur@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Riz 50kg',
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
  { id: 'basic-examples', text: 'Exemples basiques', depth: 1 },
  { id: 'b2c-invoice', text: 'Facture B2C simple', depth: 2 },
  { id: 'b2b-invoice', text: 'Facture B2B avec clientNcc', depth: 2 },
  { id: 'purchase', text: 'Bordereau d\'achat', depth: 2 },
  { id: 'refund', text: 'Avoir', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


