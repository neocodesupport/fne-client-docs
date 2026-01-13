<template>
  <DocPage
    title="Introduction"
    description="Discover FNE Client, the PHP SDK for integrating the FNE API into your applications"
    section="Getting Started"
  >
    <DocHeading :level="1" id="introduction">Introduction</DocHeading>
    
    <DocParagraph>
      Welcome to the <strong>FNE Client</strong> documentation, the framework-agnostic PHP SDK for integrating the FNE (Facture Normalisée Électronique) API.
    </DocParagraph>

    <DocHeading :level="2" id="what-is-fne-client">What is FNE Client?</DocHeading>

    <DocParagraph>
      FNE Client is a modern and intuitive PHP SDK that simplifies FNE API integration in your PHP applications. Whether you use Laravel, Symfony, or native PHP, FNE Client adapts to your stack.
    </DocParagraph>

    <DocHeading :level="3" id="main-features">Main Features</DocHeading>

    <DocList>
      <DocListItem>
        <strong>Framework-Agnostic</strong>: Compatible with Laravel 11+, Symfony 7.4+, and native PHP
      </DocListItem>
      <DocListItem>
        <strong>Zero Configuration</strong>: One-command installation with automatic detection
      </DocListItem>
      <DocListItem>
        <strong>Flexible Mapping</strong>: Transform your ERP data structures to FNE format with dot notation
      </DocListItem>
      <DocListItem>
        <strong>Model Integration</strong>: Traits for direct integration with your models
      </DocListItem>
      <DocListItem>
        <strong>Robust Validation</strong>: Automatic validation before sending to the API
      </DocListItem>
      <DocListItem>
        <strong>Production Ready</strong>: 67 tests, complete error handling
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="why-use-fne-client">Why use FNE Client?</DocHeading>

    <DocHeading :level="3" id="simplicity">Simplicity</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

// Certify an invoice in just a few lines
$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    // ...
]);`"
    />

    <DocHeading :level="3" id="flexibility">Flexibility</DocHeading>

    <DocParagraph>
      The SDK supports custom mapping to transform your ERP data structures to FNE format:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// config/fne.php
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientPhone' => 'customer.phone',
    ],
],`"
    />

    <DocHeading :level="3" id="model-integration">Model Integration</DocHeading>

    <DocParagraph>
      Use the provided traits to directly integrate certification into your models:
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certify directly from the model
$invoice->certify();`"
    />

    <DocHeading :level="2" id="compatibility">Compatibility</DocHeading>

    <DocParagraph>
      FNE Client is compatible with:
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>Laravel 11+</strong>: Service Provider, Facade, and complete integration
      </DocListItem>
      <DocListItem>
        <strong>Symfony 7.4+</strong>: Service Container and native integration
      </DocListItem>
      <DocListItem>
        <strong>Native PHP</strong>: No framework dependencies required
      </DocListItem>
    </DocList>

    <DocAlert type="success">
      <strong>Ready to get started?</strong> Head to the <NuxtLink to="/docs/getting-started/installation" class="text-primary border-b border-transparent hover:border-primary font-medium">Installation</NuxtLink> section to install FNE Client in your project.
    </DocAlert>

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList ordered>
      <DocListItem>
        <NuxtLink to="/docs/getting-started/installation" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Installation
        </NuxtLink> - Install FNE Client in your project
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/getting-started/configuration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Configuration
        </NuxtLink> - Configure the SDK for your environment
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/getting-started/quick-start" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Quick Start
        </NuxtLink> - Create your first certified invoice
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="resources">Resources</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Complete documentation
        </NuxtLink>
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Code examples
        </NuxtLink>
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/api-reference" class="text-primary border-b border-transparent hover:border-primary font-medium">
          API Reference
        </NuxtLink>
      </DocListItem>
      <DocListItem>
        <a href="https://github.com/neocodesupport/fne-client" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
          GitHub
        </a>
      </DocListItem>
    </DocList>
  </DocPage>
</template>

<script setup lang="ts">
import DocPage from '~/components/docs/DocPage.vue'
import DocHeading from '~/components/docs/DocHeading.vue'
import DocCode from '~/components/docs/DocCode.vue'
import DocParagraph from '~/components/docs/DocParagraph.vue'
import DocList from '~/components/docs/DocList.vue'
import DocListItem from '~/components/docs/DocListItem.vue'
import DocAlert from '~/components/docs/DocAlert.vue'

definePageMeta({
  layout: 'docs'
})

// Calculate headings for table of contents
const headings = ref([
  { id: 'introduction', text: 'Introduction', depth: 1 },
  { id: 'what-is-fne-client', text: 'What is FNE Client?', depth: 2 },
  { id: 'main-features', text: 'Main Features', depth: 3 },
  { id: 'why-use-fne-client', text: 'Why use FNE Client?', depth: 2 },
  { id: 'simplicity', text: 'Simplicity', depth: 3 },
  { id: 'flexibility', text: 'Flexibility', depth: 3 },
  { id: 'model-integration', text: 'Model Integration', depth: 3 },
  { id: 'compatibility', text: 'Compatibility', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
  { id: 'resources', text: 'Resources', depth: 2 },
])

// Previous and next pages
const nextPage = { title: 'Installation', path: '/docs/getting-started/installation' }

// Provide data to layout
const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(nextPage)
setHeadings(headings)
</script>



