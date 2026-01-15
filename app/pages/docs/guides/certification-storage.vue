<template>
  <DocPage
    title="Automatic Certification Storage"
    description="Guide for using automatic storage in the fne_certifications table"
    sub-description="FNE Client can automatically store certifications in a database table to facilitate management of certified invoices and future refund creation."
    section="Guides"
    heading-id="certification-storage"
  >

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      When an invoice is successfully certified, FNE Client can automatically store important information in the <DocInlineCode>fne_certifications</DocInlineCode> table. This feature is particularly useful for:
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>Creating refunds</strong>: FNE UUIDs are required to create refunds
      </DocListItem>
      <DocListItem>
        <strong>History</strong>: Keep a history of certifications
      </DocListItem>
      <DocListItem>
        <strong>Search</strong>: Easily search certified invoices
      </DocListItem>
      <DocListItem>
        <strong>Reports</strong>: Generate reports on certifications
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="activation">Activation</DocHeading>

    <DocHeading :level="3" id="via-configuration">Via Configuration</DocHeading>

    <DocCode
      language="php"
      :code="`// config/fne.php
'features' => [
    'certification_table' => env('FNE_FEATURE_CERTIFICATION_TABLE', false),
],`"
    />

    <DocParagraph>
      Or in <DocInlineCode>.env</DocInlineCode>:
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

    <DocHeading :level="3" id="force-storage">Force Storage Explicitly</DocHeading>

    <DocCode
      language="php"
      :code="`// Force storage even if feature is disabled
\$response = \$invoice->certify(null, true);

// Disable storage even if feature is enabled
\$response = \$invoice->certify(null, false);`"
    />

    <DocHeading :level="2" id="migration">Table Migration</DocHeading>

    <DocHeading :level="3" id="migration-laravel">Laravel</DocHeading>

    <DocCode
      language="bash"
      :code="`php artisan migrate`"
    />

    <DocParagraph>
      The migration is available in <DocInlineCode>database/migrations/2024_01_01_000000_create_fne_certifications_table.php</DocInlineCode>.
    </DocParagraph>

    <DocHeading :level="3" id="migration-symfony">Symfony</DocHeading>

    <DocParagraph>
      Use the provided SQL file:
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

    <DocHeading :level="2" id="usage">Usage</DocHeading>

    <DocHeading :level="3" id="with-trait">With CertifiableInvoice Trait</DocHeading>

    <DocParagraph>
      Storage is automatic if the feature is enabled:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certification with automatic storage
\$invoice = Invoice::find(1);
\$response = \$invoice->certify(); // Automatically stores if enabled`"
    />

    <DocHeading :level="3" id="verify-storage">Verify Storage</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Models\\FNECertification;

\$certification = FNECertification::where('reference', \$response->reference)->first();

if (\$certification) {
    echo 'UUID FNE: {\$certification->fne_invoice_id}';
    echo 'Amount: ' . (\$certification->amount / 100) . ' FCFA';
}`"
    />

    <DocHeading :level="3" id="use-uuid-refund">Use UUID to Create Refund</DocHeading>

    <DocCode
      language="php"
      :code="`// Retrieve UUID from table
\$certification = FNECertification::where('reference', '9606123E25000000019')->first();

// Use UUID to create refund
\$refund = FNE::refund()->issueRefund(\$certification->fne_invoice_id, [
    [
        'id' => \$itemId, // Item UUID
        'quantity' => 1.0,
    ],
]);`"
    />

    <DocHeading :level="2" id="compatibility">Multi-Framework Compatibility</DocHeading>

    <DocParagraph>
      Automatic storage works with:
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>Laravel</strong>: Uses Eloquent Model (<DocInlineCode>FNECertification</DocInlineCode>)
      </DocListItem>
      <DocListItem>
        <strong>Symfony</strong>: Uses Doctrine EntityManager or DBAL Connection
      </DocListItem>
      <DocListItem>
        <strong>Native PHP</strong>: Uses PDO directly
      </DocListItem>
    </DocList>

    <DocParagraph>
      The system automatically detects the framework and uses the appropriate method.
    </DocParagraph>

    <DocHeading :level="2" id="error-handling">Error Handling</DocHeading>

    <DocParagraph>
      If storage fails (table doesn't exist, SQL error, etc.), certification continues normally. The error is logged but does not affect the certification process.
    </DocParagraph>

    <DocHeading :level="2" id="disable-storage">Disable Storage</DocHeading>

    <DocParagraph>
      If you don't want to use this feature:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// In config/fne.php
'features' => [
    'certification_table' => false,
],`"
    />

    <DocParagraph>
      Or explicitly disable during certification:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`\$response = \$invoice->certify(null, false);`"
    />

    <DocHeading :level="2" id="see-also">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/invoices" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Sales Invoices
        </NuxtLink> - Complete guide on invoices
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Refunds
        </NuxtLink> - Create refunds with stored UUIDs
      </DocListItem>
    </DocList>

    <DocAlert type="info">
      <strong>Need help?</strong> Check out the 
      <NuxtLink to="/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
        complete documentation
      </NuxtLink> 
      or 
      <a href="https://github.com/neocodesupport/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
        open an issue
      </a> 
      on GitHub.
    </DocAlert>
  </DocPage>

  <!-- Page Actions Section -->
  <div class="flex flex-col sm:flex-row items-center justify-center my-8 gap-2">
    <div class="border-t border-base-300 w-full"></div>
    <div class="flex flex-wrap items-center justify-center gap-2 px-3 text-xs sm:text-sm text-base-content/60">
      <PageActionsDropdown />
      <span class="hidden sm:inline">or</span>
      <a 
        href="https://github.com/neocodesupport/fne-client/issues/new" 
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-sm btn-ghost gap-1.5 text-base-content/60 hover:text-base-content whitespace-nowrap"
      >
        <Icon name="heroicons:exclamation-circle" class="w-4 h-4" />
        <span class="hidden sm:inline">Report Issue</span>
        <span class="sm:hidden">Issue</span>
      </a>
    </div>
    <div class="border-t border-base-300 w-full"></div>
  </div>
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
import PageActionsDropdown from '~/components/PageActionsDropdown.vue'

definePageMeta({
  layout: 'docs'
})

const headings = ref([
  { id: 'certification-storage', text: 'Automatic Certification Storage', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'activation', text: 'Activation', depth: 2 },
  { id: 'via-configuration', text: 'Via Configuration', depth: 3 },
  { id: 'via-pennant', text: 'Via Laravel Pennant', depth: 3 },
  { id: 'force-storage', text: 'Force Storage Explicitly', depth: 3 },
  { id: 'migration', text: 'Table Migration', depth: 2 },
  { id: 'migration-laravel', text: 'Laravel', depth: 3 },
  { id: 'migration-symfony', text: 'Symfony', depth: 3 },
  { id: 'usage', text: 'Usage', depth: 2 },
  { id: 'with-trait', text: 'With CertifiableInvoice Trait', depth: 3 },
  { id: 'verify-storage', text: 'Verify Storage', depth: 3 },
  { id: 'use-uuid-refund', text: 'Use UUID to Create Refund', depth: 3 },
  { id: 'compatibility', text: 'Multi-Framework Compatibility', depth: 2 },
  { id: 'error-handling', text: 'Error Handling', depth: 2 },
  { id: 'disable-storage', text: 'Disable Storage', depth: 2 },
  { id: 'see-also', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage({ title: 'Internationalization', path: '/docs/guides/i18n' })
setNextPage(null)
setHeadings(headings)
</script>
