<template>
  <DocPage
    title="Enregistrement automatique des certifications"
    description="Guide pour utiliser l'enregistrement automatique dans la table fne_certifications"
    sub-description="FNE Client peut automatiquement enregistrer les certifications dans une table de base de données pour faciliter la gestion des factures certifiées et la création d'avoirs futurs."
    section="Guides"
    heading-id="certification-storage"
  >

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      Lorsqu'une facture est certifiée avec succès, FNE Client peut automatiquement enregistrer les informations importantes dans la table <DocInlineCode>fne_certifications</DocInlineCode>. Cette fonctionnalité est particulièrement utile pour :
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>Créer des avoirs</strong> : Les UUIDs FNE sont nécessaires pour créer des avoirs
      </DocListItem>
      <DocListItem>
        <strong>Historique</strong> : Conserver un historique des certifications
      </DocListItem>
      <DocListItem>
        <strong>Recherche</strong> : Rechercher facilement les factures certifiées
      </DocListItem>
      <DocListItem>
        <strong>Rapports</strong> : Générer des rapports sur les certifications
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="activation">Activation</DocHeading>

    <DocHeading :level="3" id="via-configuration">Via la configuration</DocHeading>

    <DocCode
      language="php"
      :code="`// config/fne.php
'features' => [
    'certification_table' => env('FNE_FEATURE_CERTIFICATION_TABLE', false),
],`"
    />

    <DocParagraph>
      Ou dans <DocInlineCode>.env</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="env"
      :code="`FNE_FEATURE_CERTIFICATION_TABLE=true`"
    />

    <DocHeading :level="3" id="via-pennant">Via Laravel Pennant</DocHeading>

    <DocCode
      language="php"
      :code="`use Laravel\\Pennant\\Feature;

Feature::for(\$user)->activate('fne:certification-table');`"
    />

    <DocHeading :level="3" id="force-storage">Forcer l'enregistrement explicitement</DocHeading>

    <DocCode
      language="php"
      :code="`// Forcer l'enregistrement même si la feature est désactivée
\$response = \$invoice->certify(null, true);

// Désactiver l'enregistrement même si la feature est activée
\$response = \$invoice->certify(null, false);`"
    />

    <DocHeading :level="2" id="migration">Migration de la table</DocHeading>

    <DocHeading :level="3" id="migration-laravel">Laravel</DocHeading>

    <DocCode
      language="bash"
      :code="`php artisan migrate`"
    />

    <DocParagraph>
      La migration est disponible dans <DocInlineCode>database/migrations/2024_01_01_000000_create_fne_certifications_table.php</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="3" id="migration-symfony">Symfony</DocHeading>

    <DocParagraph>
      Utilisez le fichier SQL fourni :
    </DocParagraph>

    <DocCode
      language="bash"
      :code="`# MySQL
mysql -u user -p database < vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql

# PostgreSQL
psql -U user -d database -f vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql

# SQLite
sqlite3 database.db < vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql`"
    />

    <DocHeading :level="2" id="usage">Utilisation</DocHeading>

    <DocHeading :level="3" id="with-trait">Avec le trait CertifiableInvoice</DocHeading>

    <DocParagraph>
      L'enregistrement est automatique si la feature est activée :
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
\$response = \$invoice->certify(); // Enregistre automatiquement si activé`"
    />

    <DocHeading :level="3" id="verify-storage">Vérifier l'enregistrement</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Models\\FNECertification;

\$certification = FNECertification::where('reference', \$response->reference)->first();

if (\$certification) {
    echo 'UUID FNE: {\$certification->fne_invoice_id}';
    echo 'Montant: ' . (\$certification->amount / 100) . ' FCFA';
}`"
    />

    <DocHeading :level="3" id="use-uuid-refund">Utiliser l'UUID pour créer un avoir</DocHeading>

    <DocCode
      language="php"
      :code="`// Récupérer l'UUID depuis la table
\$certification = FNECertification::where('reference', '9606123E25000000019')->first();

// Utiliser l'UUID pour créer un avoir
\$refund = FNE::refund()->issueRefund(\$certification->fne_invoice_id, [
    [
        'id' => \$itemId, // UUID de l'item
        'quantity' => 1.0,
    ],
]);`"
    />

    <DocHeading :level="2" id="compatibility">Compatibilité multi-framework</DocHeading>

    <DocParagraph>
      L'enregistrement automatique fonctionne avec :
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>Laravel</strong> : Utilise Eloquent Model (<DocInlineCode>FNECertification</DocInlineCode>)
      </DocListItem>
      <DocListItem>
        <strong>Symfony</strong> : Utilise Doctrine EntityManager ou DBAL Connection
      </DocListItem>
      <DocListItem>
        <strong>PHP Natif</strong> : Utilise PDO directement
      </DocListItem>
    </DocList>

    <DocParagraph>
      Le système détecte automatiquement le framework et utilise la méthode appropriée.
    </DocParagraph>

    <DocHeading :level="2" id="error-handling">Gestion des erreurs</DocHeading>

    <DocParagraph>
      Si l'enregistrement échoue (table inexistante, erreur SQL, etc.), la certification continue normalement. L'erreur est loggée mais n'affecte pas le processus de certification.
    </DocParagraph>

    <DocHeading :level="2" id="disable-storage">Désactiver l'enregistrement</DocHeading>

    <DocParagraph>
      Si vous ne souhaitez pas utiliser cette fonctionnalité :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Dans config/fne.php
'features' => [
    'certification_table' => false,
],`"
    />

    <DocParagraph>
      Ou désactiver explicitement lors de la certification :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`\$response = \$invoice->certify(null, false);`"
    />

    <DocHeading :level="2" id="see-also">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/invoices" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Factures de vente
        </NuxtLink> - Guide complet sur les factures
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Avoirs
        </NuxtLink> - Créer des avoirs avec les UUIDs enregistrés
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
  { id: 'certification-storage', text: 'Enregistrement automatique des certifications', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'activation', text: 'Activation', depth: 2 },
  { id: 'via-configuration', text: 'Via la configuration', depth: 3 },
  { id: 'via-pennant', text: 'Via Laravel Pennant', depth: 3 },
  { id: 'force-storage', text: 'Forcer l\'enregistrement explicitement', depth: 3 },
  { id: 'migration', text: 'Migration de la table', depth: 2 },
  { id: 'migration-laravel', text: 'Laravel', depth: 3 },
  { id: 'migration-symfony', text: 'Symfony', depth: 3 },
  { id: 'usage', text: 'Utilisation', depth: 2 },
  { id: 'with-trait', text: 'Avec le trait CertifiableInvoice', depth: 3 },
  { id: 'verify-storage', text: 'Vérifier l\'enregistrement', depth: 3 },
  { id: 'use-uuid-refund', text: 'Utiliser l\'UUID pour créer un avoir', depth: 3 },
  { id: 'compatibility', text: 'Compatibilité multi-framework', depth: 2 },
  { id: 'error-handling', text: 'Gestion des erreurs', depth: 2 },
  { id: 'disable-storage', text: 'Désactiver l\'enregistrement', depth: 2 },
  { id: 'see-also', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage({ title: 'Internationalisation', path: '/fr/docs/guides/i18n' })
setNextPage(null)
setHeadings(headings)
</script>
