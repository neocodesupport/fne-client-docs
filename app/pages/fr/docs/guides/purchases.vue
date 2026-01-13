<template>
  <DocPage
    title="Bordereaux d'achat"
    description="Guide complet pour certifier des bordereaux d'achat avec FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="purchases">Bordereaux d'achat</DocHeading>
    
    <DocParagraph>
      Ce guide vous montre comment certifier des bordereaux d'achat (factures d'achat de produits agricoles) avec FNE Client.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      Un bordereau d'achat est un document émis lors de l'achat de produits agricoles. Contrairement aux factures de vente, les bordereaux d'achat ne nécessitent pas de taxes.
    </DocParagraph>

    <DocHeading :level="2" id="basic-structure">Structure de base</DocHeading>

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
    'clientCompanyName' => 'Fournisseur Agricole',
    'clientPhone' => '0123456789',
    'clientEmail' => 'fournisseur@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Riz 50kg',
            'quantity' => 10,
            'amount' => 50000.0, // Prix unitaire HT en centimes (500.00 FCFA)
            'measurementUnit' => 'kg',
        ],
        [
            'description' => 'Maïs 25kg',
            'quantity' => 20,
            'amount' => 25000.0, // Prix unitaire HT en centimes (250.00 FCFA)
            'measurementUnit' => 'kg',
        ],
    ],
]);`"
    />

    <DocHeading :level="2" id="differences">Différences avec les factures de vente</DocHeading>

    <DocParagraph>
      Les bordereaux d'achat ont plusieurs différences importantes :
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <strong>Pas de taxes</strong> : Les bordereaux d'achat ne nécessitent pas de taxes (<DocInlineCode>taxes</DocInlineCode> n'est pas requis)
      </DocListItem>
      <DocListItem>
        <strong>Type de facture</strong> : Utilisez <DocInlineCode>InvoiceType::PURCHASE->value</DocInlineCode> au lieu de <DocInlineCode>InvoiceType::SALE->value</DocInlineCode>
      </DocListItem>
      <DocListItem>
        <strong>Service</strong> : Utilisez <DocInlineCode>FNE::purchase()->submit()</DocInlineCode> au lieu de <DocInlineCode>FNE::invoice()->sign()</DocInlineCode>
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="measurement-units">Unités de mesure</DocHeading>

    <DocParagraph>
      Vous pouvez spécifier l'unité de mesure pour chaque article :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`'items' => [
    [
        'description' => 'Riz',
        'quantity' => 10,
        'amount' => 50000.0,
        'measurementUnit' => 'kg', // Unité de mesure
    ],
    [
        'description' => 'Bouteilles d\\'huile',
        'quantity' => 50,
        'amount' => 2000.0,
        'measurementUnit' => 'pcs', // Pièces
    ],
],`"
    />

    <DocHeading :level="2" id="discounts">Remises</DocHeading>

    <DocParagraph>
      Comme pour les factures de vente, vous pouvez appliquer des remises :
    </DocParagraph>

    <DocHeading :level="3" id="global-discount">Remise globale</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::purchase()->submit([
    // ... autres champs ...
    'discount' => 5.0, // Remise globale de 5%
]);`"
    />

    <DocHeading :level="3" id="item-discount">Remise par article</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::purchase()->submit([
    // ... autres champs ...
    'items' => [
        [
            'description' => 'Riz',
            'quantity' => 10,
            'amount' => 50000.0,
            'discount' => 10.0, // Remise de 10% sur cet article
            'measurementUnit' => 'kg',
        ],
    ],
]);`"
    />

    <DocHeading :level="2" id="rne">RNE (Régime Normal d'Entreprise)</DocHeading>

    <DocParagraph>
      Si votre entreprise est en RNE :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::purchase()->submit([
    // ... autres champs ...
    'isRne' => true,
    'rne' => 'RNE123456789', // Obligatoire si isRne = true
]);`"
    />

    <DocHeading :level="2" id="response-handling">Traitement de la réponse</DocHeading>

    <DocParagraph>
      La réponse a la même structure que pour les factures de vente :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::purchase()->submit($data);

// Propriétés de base
echo $result->ncc;
echo $result->reference;
echo $result->token;
echo $result->balanceSticker;

// Informations du bordereau
if ($result->invoice) {
    $purchase = $result->invoice;
    
    // UUID FNE (IMPORTANT pour avoirs futurs)
    echo $purchase->id;
    
    // Montant total (en centimes)
    $total = $purchase->amount / 100;
    
    // Items
    foreach ($purchase->items as $item) {
        echo $item->id;          // UUID de l'item
        echo $item->description;
        echo $item->quantity;
        echo $item->measurementUnit;
    }
}`"
    />

    <DocHeading :level="2" id="model-integration">Intégration avec modèles</DocHeading>

    <DocParagraph>
      Utilisez le trait <DocInlineCode>CertifiablePurchase</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiablePurchase;
use Illuminate\\Database\\Eloquent\\Model;

class Purchase extends Model
{
    use CertifiablePurchase;
}

// Utilisation
$purchase = Purchase::find(1);
$result = $purchase->submit(); // Extrait automatiquement les données`"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Avoirs
        </NuxtLink> - Créez des avoirs pour vos bordereaux
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/mapping" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Mapping ERP → FNE
        </NuxtLink> - Transformez vos données ERP vers FNE
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Gestion des erreurs
        </NuxtLink> - Gérez les erreurs efficacement
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
  { id: 'purchases', text: 'Bordereaux d\'achat', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'basic-structure', text: 'Structure de base', depth: 2 },
  { id: 'differences', text: 'Différences avec les factures de vente', depth: 2 },
  { id: 'measurement-units', text: 'Unités de mesure', depth: 2 },
  { id: 'discounts', text: 'Remises', depth: 2 },
  { id: 'global-discount', text: 'Remise globale', depth: 3 },
  { id: 'item-discount', text: 'Remise par article', depth: 3 },
  { id: 'rne', text: 'RNE (Régime Normal d\'Entreprise)', depth: 2 },
  { id: 'response-handling', text: 'Traitement de la réponse', depth: 2 },
  { id: 'model-integration', text: 'Intégration avec modèles', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


