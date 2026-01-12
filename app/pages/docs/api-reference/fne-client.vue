<template>
  <DocPage
    title="FNEClient"
    description="API reference for the main FNEClient class"
    section="API Reference"
  >
    <DocHeading :level="1" id="fne-client">FNEClient</DocHeading>
    
    <DocParagraph>
      The main <DocInlineCode>FNEClient</DocInlineCode> class is the entry point for all FNE operations.
    </DocParagraph>

    <DocHeading :level="2" id="installation">Installation</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\FNEClient;
use Neocode\\FNE\\Config\\FNEConfig;
use Neocode\\FNE\\Http\\HttpClientFactory;`"
    />

    <DocHeading :level="2" id="initialization">Initialization</DocHeading>

    <DocHeading :level="3" id="init-laravel">Laravel</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

// Usage via Facade
$result = FNE::invoice()->sign($data);`"
    />

    <DocHeading :level="3" id="init-symfony">Symfony</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\FNEClient;

class InvoiceController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}
    
    public function certify()
    {
        $result = $this->fneClient->invoice()->sign($data);
    }
}`"
    />

    <DocHeading :level="3" id="init-php">Native PHP</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\FNEClient;
use Neocode\\FNE\\Config\\FNEConfig;
use Neocode\\FNE\\Http\\HttpClientFactory;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'http://54.247.95.108/ws',
    'mode' => 'test',
]);

$httpClient = HttpClientFactory::create($config);
$fne = new FNEClient($httpClient, $config);`"
    />

    <DocHeading :level="2" id="methods">Methods</DocHeading>

    <DocHeading :level="3" id="invoice-method">invoice()</DocHeading>

    <DocParagraph>
      Returns the service for sales invoices.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$invoiceService = $fne->invoice();
$result = $invoiceService->sign($data);`"
    />

    <DocHeading :level="3" id="purchase-method">purchase()</DocHeading>

    <DocParagraph>
      Returns the service for purchase slips.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$purchaseService = $fne->purchase();
$result = $purchaseService->submit($data);`"
    />

    <DocHeading :level="3" id="refund-method">refund()</DocHeading>

    <DocParagraph>
      Returns the service for refunds.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$refundService = $fne->refund();
$result = $refundService->issue($invoiceId, $items);`"
    />

    <DocHeading :level="2" id="next-steps">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/api-reference/invoice-service" class="text-primary border-b border-transparent hover:border-primary font-medium">
          InvoiceService
        </NuxtLink> - Service for invoices
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/api-reference/purchase-service" class="text-primary border-b border-transparent hover:border-primary font-medium">
          PurchaseService
        </NuxtLink> - Service for purchase slips
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/api-reference/refund-service" class="text-primary border-b border-transparent hover:border-primary font-medium">
          RefundService
        </NuxtLink> - Service for refunds
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
  { id: 'fne-client', text: 'FNEClient', depth: 1 },
  { id: 'installation', text: 'Installation', depth: 2 },
  { id: 'initialization', text: 'Initialization', depth: 2 },
  { id: 'init-laravel', text: 'Laravel', depth: 3 },
  { id: 'init-symfony', text: 'Symfony', depth: 3 },
  { id: 'init-php', text: 'Native PHP', depth: 3 },
  { id: 'methods', text: 'Methods', depth: 2 },
  { id: 'invoice-method', text: 'invoice()', depth: 3 },
  { id: 'purchase-method', text: 'purchase()', depth: 3 },
  { id: 'refund-method', text: 'refund()', depth: 3 },
  { id: 'next-steps', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


