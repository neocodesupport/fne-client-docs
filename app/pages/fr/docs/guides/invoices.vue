<template>
  <DocPage
    title="Factures de vente"
    description="Guide complet pour certifier des factures de vente avec FNE Client"
    sub-description="Ce guide vous montre comment certifier des factures de vente avec FNE Client."
    section="Guides"
    heading-id="invoices"
  >

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      Une facture de vente est un document commercial émis par une entreprise pour une transaction de vente. FNE Client permet de certifier ces factures auprès de l'API FNE.
    </DocParagraph>

    <DocHeading :level="2" id="template-types">Types de templates</DocHeading>

    <DocParagraph>
      FNE Client supporte 4 types de templates de facturation :
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>B2C</strong> (Business to Consumer) : Facture pour un client particulier
      </DocListItem>
      <DocListItem>
        <strong>B2B</strong> (Business to Business) : Facture pour une entreprise (nécessite <DocInlineCode>clientNcc</DocInlineCode>)
      </DocListItem>
      <DocListItem>
        <strong>B2F</strong> (Business to Foreign) : Facture pour un client international (peut nécessiter une devise étrangère)
      </DocListItem>
      <DocListItem>
        <strong>B2G</strong> (Business to Government) : Facture pour une institution gouvernementale
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="basic-structure">Structure de base</DocHeading>

    <DocHeading :level="3" id="example-b2c">Exemple B2C</DocHeading>

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
    'clientCompanyName' => 'Client Particulier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Produit 1',
            'quantity' => 2,
            'amount' => 5000.0, // Prix unitaire HT en centimes
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`"
    />

    <DocHeading :level="3" id="example-b2b">Exemple B2B</DocHeading>

    <DocParagraph>
      Pour une facture B2B, le <DocInlineCode>clientNcc</DocInlineCode> est obligatoire :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
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
]);`"
    />

    <DocHeading :level="3" id="example-b2f">Exemple B2F avec devise étrangère</DocHeading>

    <DocParagraph>
      Pour une facture B2F avec devise étrangère :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Enums\\ForeignCurrency;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::TRANSFER->value,
    'template' => InvoiceTemplate::B2F->value,
    'isRne' => false,
    'clientCompanyName' => 'Client International',
    'clientPhone' => '+33123456789',
    'clientEmail' => 'client@international.com',
    'foreignCurrency' => ForeignCurrency::EUR->value,
    'foreignCurrencyRate' => 655.0, // Taux de change
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Service international',
            'quantity' => 1,
            'amount' => 100000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`"
    />

    <DocHeading :level="2" id="payment-methods">Méthodes de paiement</DocHeading>

    <DocParagraph>
      FNE Client supporte les méthodes de paiement suivantes :
    </DocParagraph>

    <DocList>
      <DocListItem><DocInlineCode>cash</DocInlineCode> : Paiement en espèces</DocListItem>
      <DocListItem><DocInlineCode>card</DocInlineCode> : Paiement par carte bancaire</DocListItem>
      <DocListItem><DocInlineCode>check</DocInlineCode> : Paiement par chèque</DocListItem>
      <DocListItem><DocInlineCode>mobile-money</DocInlineCode> : Paiement par mobile money</DocListItem>
      <DocListItem><DocInlineCode>transfer</DocInlineCode> : Paiement par virement bancaire</DocListItem>
      <DocListItem><DocInlineCode>deferred</DocInlineCode> : Paiement à terme</DocListItem>
    </DocList>

    <DocHeading :level="2" id="tax-types">Types de taxes</DocHeading>

    <DocParagraph>
      Les types de taxes supportés :
    </DocParagraph>

    <DocList>
      <DocListItem><DocInlineCode>TVA</DocInlineCode> : TVA normal de 18%</DocListItem>
      <DocListItem><DocInlineCode>TVAB</DocInlineCode> : TVA réduit de 9%</DocListItem>
      <DocListItem><DocInlineCode>TVAC</DocInlineCode> : TVA exo.conv de 0%</DocListItem>
      <DocListItem><DocInlineCode>TVAD</DocInlineCode> : TVA exo.leg de 0% pour TEE et RME</DocListItem>
    </DocList>

    <DocHeading :level="2" id="custom-taxes">Taxes personnalisées</DocHeading>

    <DocParagraph>
      Vous pouvez ajouter des taxes personnalisées au niveau facture ou article :
    </DocParagraph>

    <DocHeading :level="3" id="custom-taxes-invoice">Taxes personnalisées au niveau facture</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... autres champs ...
    'customTaxes' => [
        [
            'name' => 'DTD',
            'amount' => 5.0, // 5%
        ],
    ],
]);`"
    />

    <DocHeading :level="3" id="custom-taxes-item">Taxes personnalisées au niveau article</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... autres champs ...
    'items' => [
        [
            'description' => 'Produit avec taxes personnalisées',
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
]);`"
    />

    <DocHeading :level="2" id="discounts">Remises</DocHeading>

    <DocHeading :level="3" id="global-discount">Remise globale</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... autres champs ...
    'discount' => 10.0, // Remise globale de 10%
]);`"
    />

    <DocHeading :level="3" id="item-discount">Remise par article</DocHeading>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... autres champs ...
    'items' => [
        [
            'description' => 'Produit avec remise',
            'quantity' => 2,
            'amount' => 5000.0,
            'discount' => 15.0, // Remise de 15% sur cet article
            'taxes' => [TaxType::TVA->value],
        ],
    ],
]);`"
    />

    <DocHeading :level="2" id="rne">RNE (Régime Normal d'Entreprise)</DocHeading>

    <DocParagraph>
      Si votre entreprise est en RNE, vous devez fournir le numéro RNE :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign([
    // ... autres champs ...
    'isRne' => true,
    'rne' => 'RNE123456789', // Obligatoire si isRne = true
]);`"
    />

    <DocHeading :level="2" id="response-handling">Traitement de la réponse</DocHeading>

    <DocParagraph>
      La réponse contient toutes les informations de la facture certifiée :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$result = FNE::invoice()->sign($data);

// Propriétés de base
echo $result->ncc;              // Identifiant contribuable
echo $result->reference;         // Numéro de référence FNE
echo $result->token;             // URL complète de vérification QR code
echo $result->warning;           // Alerte si stock de stickers faible
echo $result->balanceSticker;    // Nombre de stickers restants

// Informations de la facture
if ($result->invoice) {
    $invoice = $result->invoice;
    
    // UUID FNE (IMPORTANT pour avoirs futurs)
    echo $invoice->id;           // UUID à sauvegarder en base de données
    
    // Montants (en centimes, diviser par 100 pour FCFA)
    $totalTTC = $invoice->amount / 100;
    $totalTVA = $invoice->vatAmount / 100;
    
    // Informations client
    echo $invoice->clientCompanyName;
    echo $invoice->clientNcc; // null pour B2C
    
    // Items (articles)
    foreach ($invoice->items as $item) {
        echo $item->id;          // UUID de l'item (IMPORTANT pour avoirs)
        echo $item->description;
        echo $item->quantity;
        echo $item->amount / 100; // Prix unitaire HT en FCFA
    }
}`"
    />

    <DocHeading :level="2" id="model-integration">Intégration avec modèles</DocHeading>

    <DocParagraph>
      Vous pouvez utiliser le trait <DocInlineCode>CertifiableInvoice</DocInlineCode> pour intégrer directement la certification dans vos modèles :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiableInvoice;
use Illuminate\\Database\\Eloquent\\Model;

class Invoice extends Model
{
    use CertifiableInvoice;
    
    // Le trait extrait automatiquement les données du modèle
}

// Utilisation
$invoice = Invoice::find(1);
$result = $invoice->certify(); // Extrait automatiquement les données

// Ou avec des données personnalisées
$result = $invoice->certify([
    'items' => [...], // Données personnalisées
]);`"
    />

    <DocHeading :level="2" id="automatic-storage">Enregistrement automatique</DocHeading>

    <DocParagraph>
      Le trait <DocInlineCode>CertifiableInvoice</DocInlineCode> peut automatiquement enregistrer les certifications dans la table <DocInlineCode>fne_certifications</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Activer via la configuration
// config/fne.php
'features' => [
    'certification_table' => true,
],

// Ou forcer l'enregistrement
$response = $invoice->certify(null, true);`"
    />

    <DocParagraph>
      Pour plus d'informations, consultez le guide <NuxtLink to="/fr/docs/guides/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">Enregistrement automatique des certifications</NuxtLink>.
    </DocParagraph>

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/purchases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Bordereaux d'achat
        </NuxtLink> - Certifiez des bordereaux d'achat
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Avoirs
        </NuxtLink> - Créez des avoirs pour vos factures
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/mapping" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Mapping ERP → FNE
        </NuxtLink> - Transformez vos données ERP vers FNE
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
  { id: 'invoices', text: 'Factures de vente', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'template-types', text: 'Types de templates', depth: 2 },
  { id: 'basic-structure', text: 'Structure de base', depth: 2 },
  { id: 'example-b2c', text: 'Exemple B2C', depth: 3 },
  { id: 'example-b2b', text: 'Exemple B2B', depth: 3 },
  { id: 'example-b2f', text: 'Exemple B2F avec devise étrangère', depth: 3 },
  { id: 'payment-methods', text: 'Méthodes de paiement', depth: 2 },
  { id: 'tax-types', text: 'Types de taxes', depth: 2 },
  { id: 'custom-taxes', text: 'Taxes personnalisées', depth: 2 },
  { id: 'custom-taxes-invoice', text: 'Taxes personnalisées au niveau facture', depth: 3 },
  { id: 'custom-taxes-item', text: 'Taxes personnalisées au niveau article', depth: 3 },
  { id: 'discounts', text: 'Remises', depth: 2 },
  { id: 'global-discount', text: 'Remise globale', depth: 3 },
  { id: 'item-discount', text: 'Remise par article', depth: 3 },
  { id: 'rne', text: 'RNE (Régime Normal d\'Entreprise)', depth: 2 },
  { id: 'response-handling', text: 'Traitement de la réponse', depth: 2 },
  { id: 'model-integration', text: 'Intégration avec modèles', depth: 2 },
  { id: 'automatic-storage', text: 'Enregistrement automatique', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


