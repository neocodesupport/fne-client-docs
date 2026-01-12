<template>
  <DocPage
    title="InvoiceService"
    description="Référence API pour le service de factures de vente"
    section="Référence API"
  >
    <DocHeading :level="1" id="invoice-service">InvoiceService</DocHeading>
    
    <DocParagraph>
      Le service <DocInlineCode>InvoiceService</DocInlineCode> gère la certification des factures de vente.
    </DocParagraph>

    <DocHeading :level="2" id="methods">Méthodes</DocHeading>

    <DocHeading :level="3" id="sign-method">sign()</DocHeading>

    <DocParagraph>
      Certifie une facture de vente.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`public function sign(?array $data = null): ResponseDTO`"
    />

    <DocParagraph>
      <strong>Paramètres :</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>
        <DocInlineCode>$data</DocInlineCode> (array|null) : Données de la facture (optionnel si données définies via contexte)
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
use Neocode\\FNE\\Enums\\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Produit',
            'quantity' => 1,
            'amount' => 10000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`"
    />

    <DocHeading :level="2" id="see-also">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/invoices" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guide - Factures de vente
        </NuxtLink>
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

const headings = ref([
  { id: 'invoice-service', text: 'InvoiceService', depth: 1 },
  { id: 'methods', text: 'Méthodes', depth: 2 },
  { id: 'sign-method', text: 'sign()', depth: 3 },
  { id: 'example', text: 'Exemple', depth: 3 },
  { id: 'see-also', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>

