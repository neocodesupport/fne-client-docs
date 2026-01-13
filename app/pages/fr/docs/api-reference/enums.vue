<template>
  <DocPage
    title="Enums"
    description="Référence complète des enums disponibles dans FNE Client"
    section="Référence API"
  >
    <DocHeading :level="1" id="enums">Enums</DocHeading>
    
    <DocParagraph>
      FNE Client utilise des enums PHP 8.2+ pour garantir la sécurité de type.
    </DocParagraph>

    <DocHeading :level="2" id="invoice-type">InvoiceType</DocHeading>

    <DocParagraph>
      Types de factures.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\InvoiceType;

InvoiceType::SALE->value      // 'sale' - Facture de vente
InvoiceType::PURCHASE->value  // 'purchase' - Bordereau d'achat`"
    />

    <DocHeading :level="2" id="payment-method">PaymentMethod</DocHeading>

    <DocParagraph>
      Méthodes de paiement.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\PaymentMethod;

PaymentMethod::CASH->value           // 'cash'
PaymentMethod::CARD->value           // 'card'
PaymentMethod::CHECK->value          // 'check'
PaymentMethod::MOBILE_MONEY->value  // 'mobile-money'
PaymentMethod::TRANSFER->value       // 'transfer'
PaymentMethod::DEFERRED->value       // 'deferred'`"
    />

    <DocHeading :level="2" id="invoice-template">InvoiceTemplate</DocHeading>

    <DocParagraph>
      Templates de facturation.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\InvoiceTemplate;

InvoiceTemplate::B2C->value  // 'B2C' - Business to Consumer
InvoiceTemplate::B2B->value  // 'B2B' - Business to Business
InvoiceTemplate::B2F->value  // 'B2F' - Business to Foreign
InvoiceTemplate::B2G->value  // 'B2G' - Business to Government`"
    />

    <DocHeading :level="2" id="tax-type">TaxType</DocHeading>

    <DocParagraph>
      Types de taxes.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\TaxType;

TaxType::TVA->value   // 'TVA' - TVA normal 18%
TaxType::TVAB->value  // 'TVAB' - TVA réduit 9%
TaxType::TVAC->value  // 'TVAC' - TVA exo.conv 0%
TaxType::TVAD->value  // 'TVAD' - TVA exo.leg 0%`"
    />

    <DocHeading :level="2" id="foreign-currency">ForeignCurrency</DocHeading>

    <DocParagraph>
      Devises étrangères supportées.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\ForeignCurrency;

ForeignCurrency::XOF->value  // 'XOF' - Franc CFA
ForeignCurrency::USD->value  // 'USD' - Dollar Américain
ForeignCurrency::EUR->value  // 'EUR' - Euro
// ... autres devises`"
    />

    <DocHeading :level="2" id="usage">Utilisation</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'taxes' => TaxType::TVA->value,
]);`"
    />

    <DocHeading :level="2" id="next-steps">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/api-reference/dtos" class="text-primary border-b border-transparent hover:border-primary font-medium">
          DTOs
        </NuxtLink> - Référence des DTOs
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
  { id: 'enums', text: 'Enums', depth: 1 },
  { id: 'invoice-type', text: 'InvoiceType', depth: 2 },
  { id: 'payment-method', text: 'PaymentMethod', depth: 2 },
  { id: 'invoice-template', text: 'InvoiceTemplate', depth: 2 },
  { id: 'tax-type', text: 'TaxType', depth: 2 },
  { id: 'foreign-currency', text: 'ForeignCurrency', depth: 2 },
  { id: 'usage', text: 'Utilisation', depth: 2 },
  { id: 'next-steps', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


