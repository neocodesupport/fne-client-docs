<template>
  <DocPage
    title="Avoirs"
    description="Guide complet pour créer des avoirs (remboursements) avec FNE Client"
    sub-description="Ce guide vous montre comment créer des avoirs (remboursements) pour vos factures certifiées avec FNE Client."
    section="Guides"
    heading-id="refunds"
  >

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      Un avoir est un document qui annule ou réduit le montant d'une facture précédemment certifiée. Pour créer un avoir, vous devez avoir l'UUID de la facture originale et les UUIDs des items à rembourser.
    </DocParagraph>

    <DocAlert type="warning">
      <strong>Important : Sauvegarder les UUIDs</strong><br>
      Pour créer un avoir, vous devez avoir sauvegardé :
      <DocList>
        <DocListItem><strong>UUID de la facture</strong> (<DocInlineCode>invoice.id</DocInlineCode>) de la facture originale</DocListItem>
        <DocListItem><strong>UUIDs des items</strong> (<DocInlineCode>item.id</DocInlineCode>) des articles à rembourser</DocListItem>
      </DocList>
      Ces UUIDs sont retournés dans la réponse lors de la certification de la facture originale.
    </DocAlert>

    <DocHeading :level="3" id="automatic-storage">Enregistrement automatique</DocHeading>

    <DocParagraph>
      FNE Client peut automatiquement enregistrer les certifications dans la table <DocInlineCode>fne_certifications</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certification avec enregistrement automatique
\$invoice = Invoice::find(1);
\$response = \$invoice->certify(); // Enregistre automatiquement si activé

// Récupérer l'UUID depuis la table pour créer un avoir
\$certification = \\Neocode\\FNE\\Models\\FNECertification::where(\\'reference\\', \$response->reference)->first();
\$fneInvoiceId = \$certification->fne_invoice_id; // UUID pour créer l'avoir`"
    />

    <DocParagraph>
      Pour plus d'informations, consultez le guide <NuxtLink to="/fr/docs/guides/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">Enregistrement automatique des certifications</NuxtLink>.
    </DocParagraph>

    <DocHeading :level="2" id="full-refund">Créer un avoir complet</DocHeading>

    <DocParagraph>
      Un avoir complet rembourse toute la facture :
    </DocParagraph>

    <DocCode
      language="php"
      :code="fullRefundCode"
    />

    <DocHeading :level="2" id="partial-refund">Créer un avoir partiel</DocHeading>

    <DocParagraph>
      Un avoir partiel rembourse seulement certains items ou une quantité partielle :
    </DocParagraph>

    <DocCode
      language="php"
      :code="partialRefundCode"
    />

    <DocHeading :level="2" id="response-structure">Structure de la réponse</DocHeading>

    <DocParagraph>
      La réponse d'un avoir a une structure différente de celle d'une facture :
    </DocParagraph>

    <DocCode
      language="php"
      :code="responseStructureCode"
    />

    <DocHeading :level="2" id="check-refund">Vérifier si c'est un avoir</DocHeading>

    <DocCode
      language="php"
      :code="checkRefundCode"
    />

    <DocHeading :level="2" id="model-integration">Intégration avec modèles</DocHeading>

    <DocParagraph>
      Utilisez le trait <DocInlineCode>CertifiableRefund</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="php"
      :code="modelIntegrationCode"
    />

    <DocHeading :level="2" id="error-handling">Gestion des erreurs</DocHeading>

    <DocCode
      language="php"
      :code="errorHandlingCode"
    />

    <DocHeading :level="2" id="best-practices">Bonnes pratiques</DocHeading>

    <DocList ordered>
      <DocListItem>
        <strong>Sauvegardez toujours les UUIDs</strong> : Lors de la certification d'une facture, sauvegardez toujours l'UUID de la facture et des items. Utilisez l'<NuxtLink to="/fr/docs/guides/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">enregistrement automatique</NuxtLink> pour plus de facilité.
      </DocListItem>
      <DocListItem>
        <strong>Vérifiez les quantités</strong> : Assurez-vous que la quantité remboursée ne dépasse pas la quantité originale
      </DocListItem>
      <DocListItem>
        <strong>Gérez les avoirs partiels</strong> : Vous pouvez créer plusieurs avoirs pour une même facture
      </DocListItem>
      <DocListItem>
        <strong>Stockez les références</strong> : Sauvegardez la référence de l'avoir (commence par "A") pour traçabilité
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="complete-example">Exemple complet</DocHeading>

    <DocCode
      language="php"
      :code="completeExampleCode"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Enregistrement automatique des certifications
        </NuxtLink> - Enregistrer les certifications automatiquement
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Gestion des erreurs
        </NuxtLink> - Gérez les erreurs efficacement
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/mapping" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Mapping ERP → FNE
        </NuxtLink> - Transformez vos données ERP vers FNE
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Exemples
        </NuxtLink> - Consultez plus d'exemples de code
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
const fullRefundCode = `use Neocode\\FNE\\Facades\\FNE;

// UUID de la facture originale (récupéré depuis votre base de données)
$invoiceId = \\'e2b2d8da-a532-4c08-9182-f5b428ca468d\\';

// UUIDs de tous les items (récupérés depuis votre base de données)
$items = [
    [
        \\'id\\' => \\'bf9cc241-9b5f-4d26-a570-aa8e682a759e\\', // UUID de l'item
        \\'quantity\\' => 30.0, // Quantité à rembourser
    ],
    [
        \\'id\\' => \\'another-item-uuid\\',
        \\'quantity\\' => 10.0,
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);

// La réponse pour un avoir
echo $result->ncc;              // Identifiant contribuable
echo $result->reference;         // Référence commençant par "A" (Avoir)
echo $result->token;             // URL de vérification QR code
echo $result->balanceSticker;    // Nombre de stickers restants

// ⚠️ IMPORTANT : invoice est toujours null pour les avoirs
// Seule la référence commence par "A"`

const partialRefundCode = `// Rembourser seulement certains items
$items = [
    [
        \\'id\\' => \\'bf9cc241-9b5f-4d26-a570-aa8e682a759e\\',
        \\'quantity\\' => 10.0, // Rembourser seulement 10 sur 30
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);`

const responseStructureCode = `$result = FNE::refund()->issue($invoiceId, $items);

// Propriétés de base (identiques aux factures)
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "A9606123E2500000006" (commence par "A")
echo $result->token;             // URL complète de vérification
echo $result->warning;           // false
echo $result->balanceSticker;    // 178

// ⚠️ IMPORTANT : invoice est TOUJOURS null pour les avoirs
// Contrairement aux factures, il n'y a pas d'objet invoice dans la réponse
if ($result->invoice === null) {
    echo "C'est un avoir"; // Toujours vrai pour les avoirs
}`

const checkRefundCode = `if ($result->isRefund()) {
    echo "C'est un avoir";
    echo "Référence : " . $result->reference; // Commence par "A"
}

// Ou vérifier manuellement
if (str_starts_with($result->reference, \\'A\\')) {
    echo "C'est un avoir";
}`

const modelIntegrationCode = `use Neocode\\FNE\\Concerns\\CertifiableRefund;
use Illuminate\\Database\\Eloquent\\Model;

class Invoice extends Model
{
    use CertifiableRefund;
    
    // Le trait détecte automatiquement l'UUID FNE depuis :
    // - fne_id
    // - fne_invoice_id
    // - getFneInvoiceId()
}

// Utilisation
$invoice = Invoice::find(1);
$items = [
    [
        \\'id\\' => \\'item-uuid-1\\',
        \\'quantity\\' => 10.0,
    ],
];

$result = $invoice->issueRefund($items);`

const errorHandlingCode = `use Neocode\\FNE\\Exceptions\\ValidationException;
use Neocode\\FNE\\Exceptions\\NotFoundException;

try {
    $result = FNE::refund()->issue($invoiceId, $items);
} catch (ValidationException $e) {
    // Erreur de validation (UUID invalide, quantité invalide, etc.)
    echo "Erreur de validation : " . $e->getMessage();
} catch (NotFoundException $e) {
    // Facture originale non trouvée
    echo "Facture non trouvée : " . $e->getMessage();
} catch (\\Exception $e) {
    // Autre erreur
    echo "Erreur : " . $e->getMessage();
}`

const completeExampleCode = `use Neocode\\FNE\\Concerns\\CertifiableInvoice;
use Neocode\\FNE\\Models\\FNECertification;

// 1. Certifier une facture originale avec enregistrement automatique
$invoice = Invoice::find(1);
$invoiceResult = $invoice->certify(); // Enregistre automatiquement si activé

// 2. Récupérer les UUIDs depuis la table de certification
$certification = FNECertification::where(\\'reference\\', $invoiceResult->reference)->first();
$invoiceId = $certification->fne_invoice_id;

// Obtenir les UUIDs des items depuis la réponse de la facture originale
$itemIds = array_map(fn($item) => $item->id, $invoiceResult->invoice->items);

// 3. Plus tard, créer un avoir
$refundItems = [
    [
        \\'id\\' => $itemIds[0], // Premier item
        \\'quantity\\' => 5.0, // Rembourser 5 unités
    ],
];

$refundResult = FNE::refund()->issue($invoiceId, $refundItems);

// 4. La référence de l'avoir commence par "A"
echo $refundResult->reference; // "A9606123E2500000006"`

const headings = ref([
  { id: 'refunds', text: 'Avoirs', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'automatic-storage', text: 'Enregistrement automatique', depth: 3 },
  { id: 'full-refund', text: 'Créer un avoir complet', depth: 2 },
  { id: 'partial-refund', text: 'Créer un avoir partiel', depth: 2 },
  { id: 'response-structure', text: 'Structure de la réponse', depth: 2 },
  { id: 'check-refund', text: 'Vérifier si c\'est un avoir', depth: 2 },
  { id: 'model-integration', text: 'Intégration avec modèles', depth: 2 },
  { id: 'error-handling', text: 'Gestion des erreurs', depth: 2 },
  { id: 'best-practices', text: 'Bonnes pratiques', depth: 2 },
  { id: 'complete-example', text: 'Exemple complet', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


