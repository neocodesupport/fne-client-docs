<template>
  <DocPage
    title="PurchaseService"
    description="Référence API pour le service de bordereaux d'achat"
    sub-description="Le service <code>PurchaseService</code> gère la certification des bordereaux d'achat."
    section="Référence API"
    heading-id="purchase-service"
  >

    <DocHeading :level="2" id="methods">Méthodes</DocHeading>

    <DocHeading :level="3" id="submit-method">submit()</DocHeading>

    <DocParagraph>
      Certifie un bordereau d'achat.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`public function submit(?array $data = null): ResponseDTO`"
    />

    <DocParagraph>
      <strong>Paramètres :</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>
        <DocInlineCode>$data</DocInlineCode> (array|null) : Données du bordereau (optionnel si données définies via contexte)
      </DocListItem>
    </DocList>

    <DocParagraph>
      <strong>Retourne :</strong> <DocInlineCode>ResponseDTO</DocInlineCode>
    </DocParagraph>

    <DocHeading :level="3" id="example">Exemple :</DocHeading>

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
    'clientCompanyName' => 'Fournisseur',
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
]);`"
    />

    <DocHeading :level="2" id="see-also">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/purchases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guide - Bordereaux d'achat
        </NuxtLink>
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

const headings = ref([
  { id: 'purchase-service', text: 'PurchaseService', depth: 1 },
  { id: 'methods', text: 'Méthodes', depth: 2 },
  { id: 'submit-method', text: 'submit()', depth: 3 },
  { id: 'example', text: 'Exemple', depth: 3 },
  { id: 'see-also', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


