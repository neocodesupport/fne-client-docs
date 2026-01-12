<template>
  <DocPage
    title="ERP → FNE Mapping"
    description="Complete guide for mapping your ERP data to FNE format"
    section="Guides"
  >
    <DocHeading :level="1" id="mapping">ERP → FNE Mapping</DocHeading>
    
    <DocParagraph>
      This guide shows you how to use custom mapping to transform your ERP data structures to FNE format.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      Custom mapping allows you to automatically transform your ERP data structures to the format expected by the FNE API. This avoids having to manually restructure your data on each call.
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Mapping Configuration</DocHeading>

    <DocHeading :level="3" id="config-laravel">Laravel</DocHeading>

    <DocParagraph>
      In <DocInlineCode>config/fne.php</DocInlineCode>:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`return [
    // ... other configurations ...
    
    'mapping' => [
        'invoice' => [
            // Mapping for sales invoices
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone_number',
            'clientEmail' => 'customer.email_address',
            'pointOfSale' => 'pos.code',
            'establishment' => 'establishment.code',
            'clientSellerName' => 'seller.full_name',
        ],
        'purchase' => [
            // Mapping for purchase slips
            'clientCompanyName' => 'supplier.company_name',
            'clientPhone' => 'supplier.contact_phone',
            'clientEmail' => 'supplier.email',
        ],
    ],
];`"
    />

    <DocHeading :level="3" id="config-symfony">Symfony</DocHeading>

    <DocParagraph>
      In <DocInlineCode>config/packages/fne.yaml</DocInlineCode>:
    </DocParagraph>

    <DocCode
      language="yaml"
      :code="`fne:
    mapping:
        invoice:
            clientCompanyName: 'customer.name'
            clientPhone: 'customer.phone_number'
            clientEmail: 'customer.email_address'
        purchase:
            clientCompanyName: 'supplier.company_name'
            clientPhone: 'supplier.contact_phone'`"
    />

    <DocHeading :level="3" id="config-php">Native PHP</DocHeading>

    <DocParagraph>
      In <DocInlineCode>fne.php</DocInlineCode>:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`return [
    // ... other configurations ...
    
    'mapping' => [
        'invoice' => [
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone_number',
        ],
    ],
];`"
    />

    <DocHeading :level="2" id="dot-notation">Dot Notation</DocHeading>

    <DocParagraph>
      Mapping supports dot notation to access nested properties:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`'mapping' => [
    'invoice' => [
        // Direct access
        'clientCompanyName' => 'customer_name',
        
        // Dot notation for nested properties
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.contact.email',
        
        // Array access
        'pointOfSale' => 'point_of_sale.code',
        'establishment' => 'establishment.name',
    ],
],`"
    />

    <DocHeading :level="2" id="usage-example">Usage Example</DocHeading>

    <DocHeading :level="3" id="without-mapping">Without Mapping</DocHeading>

    <DocParagraph>
      Without custom mapping, you must manually restructure your data:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// ERP data
$erpData = [
    'customer' => [
        'name' => 'Business Client',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'pos' => [
        'code' => 'POS-001',
    ],
];

// Manual restructuring
$fneData = [
    'clientCompanyName' => $erpData['customer']['name'],
    'clientPhone' => $erpData['customer']['phone'],
    'clientEmail' => $erpData['customer']['email'],
    'pointOfSale' => $erpData['pos']['code'],
    // ... other fields ...
];`"
    />

    <DocHeading :level="3" id="with-mapping">With Mapping</DocHeading>

    <DocParagraph>
      With custom mapping, you can use your ERP data directly:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Mapping configuration (in config/fne.php)
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.name',
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.email',
        'pointOfSale' => 'pos.code',
    ],
],

// Usage - data is automatically transformed
$erpData = [
    'customer' => [
        'name' => 'Business Client',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'pos' => [
        'code' => 'POS-001',
    ],
    // ... other FNE fields directly ...
];

// Mapping is applied automatically
$result = FNE::invoice()->sign($erpData);`"
    />

    <DocHeading :level="2" id="model-mapping">Mapping with Models</DocHeading>

    <DocParagraph>
      Mapping also works with models via traits:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiableInvoice;
use Illuminate\\Database\\Eloquent\\Model;

class Invoice extends Model
{
    use CertifiableInvoice;
    
    // Mapping is automatically applied when extracting data
}

// Usage
$invoice = Invoice::find(1);

// Model data is automatically transformed according to mapping
$result = $invoice->certify();`"
    />

    <DocHeading :level="2" id="priority-order">Priority Order</DocHeading>

    <DocParagraph>
      Custom mapping is applied <strong>before</strong> standard mapping. The processing order is:
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <strong>Custom mapping</strong>: Transforms ERP keys to FNE keys
      </DocListItem>
      <DocListItem>
        <strong>Merge</strong>: Mapped data is merged with original data
      </DocListItem>
      <DocListItem>
        <strong>Standard mapping</strong>: Standard mapping is applied to merged data
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="unmapped-fields">Unmapped Fields</DocHeading>

    <DocParagraph>
      Fields that are not in the mapping are preserved as-is. You can:
    </DocParagraph>

    <DocList>
      <DocListItem>Map some fields and leave others in FNE format</DocListItem>
      <DocListItem>Combine both approaches in the same data structure</DocListItem>
    </DocList>

    <DocCode
      language="php"
      :code="`$data = [
    // Fields mapped from ERP
    'customer' => [
        'name' => 'Business Client',
        'phone' => '0123456789',
    ],
    
    // Fields already in FNE format
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'items' => [
        // ... items in FNE format ...
    ],
];`"
    />

    <DocHeading :level="2" id="disable-mapping">Disable Mapping</DocHeading>

    <DocParagraph>
      To disable mapping for a specific call, you can pass data directly in FNE format:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Data is already in FNE format, no mapping needed
$fneData = [
    'clientCompanyName' => 'Business Client',
    'clientPhone' => '0123456789',
    // ... other FNE fields ...
];

$result = FNE::invoice()->sign($fneData);`"
    />

    <DocHeading :level="2" id="advanced-examples">Advanced Examples</DocHeading>

    <DocHeading :level="3" id="conditional-mapping">Conditional Mapping</DocHeading>

    <DocCode
      language="php"
      :code="`// Mapping for B2B invoices
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientNcc' => 'customer.ncc',
        'clientRccm' => 'customer.rccm',
    ],
],

// ERP data
$erpData = [
    'customer' => [
        'company_name' => 'Business Client',
        'ncc' => '123456789',
        'rccm' => 'CI-ABJ-12345',
    ],
];`"
    />

    <DocHeading :level="3" id="default-values">Mapping with Default Values</DocHeading>

    <DocCode
      language="php"
      :code="`$erpData = [
    'customer' => [
        'name' => 'Business Client',
        // phone doesn't exist
    ],
];

// Provide a default value
$erpData['customer']['phone'] = $erpData['customer']['phone'] ?? '0000000000';`"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/invoices#model-integration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Model Integration
        </NuxtLink> - Use traits for direct integration
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Error Handling
        </NuxtLink> - Handle mapping errors
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Examples
        </NuxtLink> - Check out more mapping examples
      </DocListItem>
    </DocList>

    <DocAlert type="info">
      <strong>Need help?</strong> Check out the 
      <NuxtLink to="/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
        complete documentation
      </NuxtLink> 
      or 
      <a href="https://github.com/neocode/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
        open an issue
      </a> 
      on GitHub.
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
  { id: 'mapping', text: 'ERP → FNE Mapping', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'configuration', text: 'Mapping Configuration', depth: 2 },
  { id: 'config-laravel', text: 'Laravel', depth: 3 },
  { id: 'config-symfony', text: 'Symfony', depth: 3 },
  { id: 'config-php', text: 'Native PHP', depth: 3 },
  { id: 'dot-notation', text: 'Dot Notation', depth: 2 },
  { id: 'usage-example', text: 'Usage Example', depth: 2 },
  { id: 'without-mapping', text: 'Without Mapping', depth: 3 },
  { id: 'with-mapping', text: 'With Mapping', depth: 3 },
  { id: 'model-mapping', text: 'Mapping with Models', depth: 2 },
  { id: 'priority-order', text: 'Priority Order', depth: 2 },
  { id: 'unmapped-fields', text: 'Unmapped Fields', depth: 2 },
  { id: 'disable-mapping', text: 'Disable Mapping', depth: 2 },
  { id: 'advanced-examples', text: 'Advanced Examples', depth: 2 },
  { id: 'conditional-mapping', text: 'Conditional Mapping', depth: 3 },
  { id: 'default-values', text: 'Mapping with Default Values', depth: 3 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


