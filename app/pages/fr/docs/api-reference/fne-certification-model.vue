<template>
  <DocPage
    title="Modèle FNECertification"
    description="Modèle Eloquent pour la table fne_certifications"
    sub-description="Le modèle FNECertification représente la table fne_certifications dans Laravel."
    section="Référence API"
    heading-id="fne-certification-model"
  >

    <DocHeading :level="2" id="usage">Utilisation</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Models\\FNECertification;

// Trouver une certification par référence
\$certification = FNECertification::where('reference', '9606123E25000000019')->first();

// Trouver toutes les certifications d'un client
\$certifications = FNECertification::where('client_ncc', '123456789')->get();

// Trouver les certifications en attente de paiement
\$pending = FNECertification::where('status', 'pending')->get();`"
    />

    <DocHeading :level="2" id="main-properties">Propriétés principales</DocHeading>

    <DocHeading :level="3" id="identifiers">Identifiants</DocHeading>

    <DocList>
      <DocListItem>
        <DocInlineCode>id</DocInlineCode> : ID interne (auto-increment)
      </DocListItem>
      <DocListItem>
        <DocInlineCode>fne_invoice_id</DocInlineCode> : UUID FNE de la facture (⚠️ IMPORTANT pour avoirs)
      </DocListItem>
      <DocListItem>
        <DocInlineCode>reference</DocInlineCode> : Référence FNE unique
      </DocListItem>
      <DocListItem>
        <DocInlineCode>ncc</DocInlineCode> : Numéro Contribuable
      </DocListItem>
      <DocListItem>
        <DocInlineCode>token</DocInlineCode> : Token de vérification QR code
      </DocListItem>
    </DocList>

    <DocHeading :level="3" id="amounts">Montants (en centimes)</DocHeading>

    <DocList>
      <DocListItem>
        <DocInlineCode>amount</DocInlineCode> : Montant total TTC en centimes
      </DocListItem>
      <DocListItem>
        <DocInlineCode>vat_amount</DocInlineCode> : Montant TVA en centimes
      </DocListItem>
      <DocListItem>
        <DocInlineCode>fiscal_stamp</DocInlineCode> : Timbre fiscal en centimes
      </DocListItem>
      <DocListItem>
        <DocInlineCode>discount</DocInlineCode> : Remise globale en %
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="examples">Exemples d'utilisation</DocHeading>

    <DocHeading :level="3" id="retrieve-uuid">Récupérer l'UUID pour créer un avoir</DocHeading>

    <DocCode
      language="php"
      :code="`\$certification = FNECertification::where('reference', \$reference)->first();

if (\$certification) {
    \$fneInvoiceId = \$certification->fne_invoice_id; // UUID pour créer l'avoir
}`"
    />

    <DocHeading :level="3" id="calculate-amounts">Calculer les montants en FCFA</DocHeading>

    <DocCode
      language="php"
      :code="`\$certification = FNECertification::find(1);

\$amountFCFA = \$certification->amount / 100;        // Montant TTC en FCFA
\$vatAmountFCFA = \$certification->vat_amount / 100;  // TVA en FCFA
\$stampFCFA = \$certification->fiscal_stamp / 100;   // Timbre fiscal en FCFA`"
    />

    <DocHeading :level="3" id="statistics">Statistiques</DocHeading>

    <DocCode
      language="php"
      :code="`// Nombre total de certifications
\$total = FNECertification::count();

// Montant total certifié
\$totalAmount = FNECertification::sum('amount') / 100; // En FCFA

// Certifications en attente de paiement
\$pendingCount = FNECertification::where('status', 'pending')->count();`"
    />

    <DocHeading :level="2" id="see-also">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Enregistrement automatique des certifications
        </NuxtLink> - Guide complet
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/api-reference/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">
          CertificationStorage
        </NuxtLink> - Classe de stockage
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
  { id: 'fne-certification-model', text: 'Modèle FNECertification', depth: 1 },
  { id: 'usage', text: 'Utilisation', depth: 2 },
  { id: 'main-properties', text: 'Propriétés principales', depth: 2 },
  { id: 'identifiers', text: 'Identifiants', depth: 3 },
  { id: 'amounts', text: 'Montants (en centimes)', depth: 3 },
  { id: 'examples', text: 'Exemples d\'utilisation', depth: 2 },
  { id: 'retrieve-uuid', text: 'Récupérer l\'UUID pour créer un avoir', depth: 3 },
  { id: 'calculate-amounts', text: 'Calculer les montants en FCFA', depth: 3 },
  { id: 'statistics', text: 'Statistiques', depth: 3 },
  { id: 'see-also', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage({ title: 'CertificationStorage', path: '/fr/docs/api-reference/certification-storage' })
setNextPage(null)
setHeadings(headings)
</script>
