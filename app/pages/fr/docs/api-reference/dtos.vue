<template>
  <DocPage
    title="DTOs"
    description="Référence complète des DTOs (Data Transfer Objects)"
    section="Référence API"
  >
    <DocHeading :level="1" id="dtos">DTOs</DocHeading>
    
    <DocParagraph>
      Les DTOs (Data Transfer Objects) permettent de manipuler les données de manière type-safe.
    </DocParagraph>

    <DocHeading :level="2" id="response-dto">ResponseDTO</DocHeading>

    <DocParagraph>
      Réponse complète de l'API FNE.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\DTOs\\ResponseDTO;

$result = FNE::invoice()->sign($data);

// Propriétés
$result->ncc              // string - Identifiant contribuable
$result->reference        // string - Numéro de référence FNE
$result->token            // string - URL de vérification QR code
$result->warning          // bool - Alerte si stock faible
$result->balanceSticker   // int - Nombre de stickers restants
$result->invoice          // ?InvoiceResponseDTO - Informations facture (null pour avoirs)

// Méthodes
$result->isInvoice()      // bool - Vérifie si c'est une facture
$result->isRefund()       // bool - Vérifie si c'est un avoir
$result->toArray()        // array - Convertit en tableau`"
    />

    <DocHeading :level="2" id="invoice-response-dto">InvoiceResponseDTO</DocHeading>

    <DocParagraph>
      Informations de facture dans la réponse.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`if ($result->invoice) {
    $invoice = $result->invoice;
    
    // Propriétés principales
    $invoice->id                    // string - UUID FNE (IMPORTANT pour avoirs)
    $invoice->amount                // int - Montant total TTC en centimes
    $invoice->vatAmount            // int - Montant TVA en centimes
    $invoice->clientCompanyName    // string
    $invoice->items                // array<InvoiceItemResponseDTO>
    
    // Méthodes
    $invoice->getAmountInFCFA()    // float - Montant en FCFA
    $invoice->getVatAmountInFCFA()  // float - TVA en FCFA
}`"
    />

    <DocHeading :level="2" id="invoice-item-response-dto">InvoiceItemResponseDTO</DocHeading>

    <DocParagraph>
      Informations d'un article de facture.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`foreach ($result->invoice->items as $item) {
    $item->id              // string - UUID de l'item (IMPORTANT pour avoirs)
    $item->description     // string
    $item->quantity        // float
    $item->amount          // int - Prix unitaire HT en centimes
    $item->taxes           // array<TaxResponseDTO>
    
    // Méthodes
    $item->getAmountInFCFA() // float - Prix unitaire HT en FCFA
}`"
    />

    <DocHeading :level="2" id="array-conversion">Conversion en tableau</DocHeading>

    <DocParagraph>
      Tous les DTOs peuvent être convertis en tableau :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$array = $result->toArray();
$json = json_encode($result); // Implémente JsonSerializable`"
    />

    <DocHeading :level="2" id="next-steps">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/api-reference/enums" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Enums
        </NuxtLink> - Référence des enums disponibles
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
  { id: 'dtos', text: 'DTOs', depth: 1 },
  { id: 'response-dto', text: 'ResponseDTO', depth: 2 },
  { id: 'invoice-response-dto', text: 'InvoiceResponseDTO', depth: 2 },
  { id: 'invoice-item-response-dto', text: 'InvoiceItemResponseDTO', depth: 2 },
  { id: 'array-conversion', text: 'Conversion en tableau', depth: 2 },
  { id: 'next-steps', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>

