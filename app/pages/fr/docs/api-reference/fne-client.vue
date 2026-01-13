<template>
  <DocPage
    title="FNEClient"
    description="Référence API pour la classe principale FNEClient"
    section="Référence API"
  >
    <DocHeading :level="1" id="fne-client">FNEClient</DocHeading>
    
    <DocParagraph>
      La classe principale <DocInlineCode>FNEClient</DocInlineCode> est le point d'entrée pour toutes les opérations FNE.
    </DocParagraph>

    <DocHeading :level="2" id="installation">Installation</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\FNEClient;
use Neocode\\FNE\\Config\\FNEConfig;
use Neocode\\FNE\\Http\\HttpClientFactory;`"
    />

    <DocHeading :level="2" id="initialization">Initialisation</DocHeading>

    <DocHeading :level="3" id="init-laravel">Laravel</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

// Utilisation via Facade
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

    <DocHeading :level="3" id="init-php">PHP Natif</DocHeading>

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

    <DocHeading :level="2" id="methods">Méthodes</DocHeading>

    <DocHeading :level="3" id="invoice-method">invoice()</DocHeading>

    <DocParagraph>
      Retourne le service pour les factures de vente.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$invoiceService = $fne->invoice();
$result = $invoiceService->sign($data);`"
    />

    <DocHeading :level="3" id="purchase-method">purchase()</DocHeading>

    <DocParagraph>
      Retourne le service pour les bordereaux d'achat.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$purchaseService = $fne->purchase();
$result = $purchaseService->submit($data);`"
    />

    <DocHeading :level="3" id="refund-method">refund()</DocHeading>

    <DocParagraph>
      Retourne le service pour les avoirs.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`$refundService = $fne->refund();
$result = $refundService->issue($invoiceId, $items);`"
    />

    <DocHeading :level="2" id="next-steps">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/api-reference/invoice-service" class="text-primary border-b border-transparent hover:border-primary font-medium">
          InvoiceService
        </NuxtLink> - Service pour les factures
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/api-reference/purchase-service" class="text-primary border-b border-transparent hover:border-primary font-medium">
          PurchaseService
        </NuxtLink> - Service pour les bordereaux d'achat
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/api-reference/refund-service" class="text-primary border-b border-transparent hover:border-primary font-medium">
          RefundService
        </NuxtLink> - Service pour les avoirs
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
  { id: 'fne-client', text: 'FNEClient', depth: 1 },
  { id: 'installation', text: 'Installation', depth: 2 },
  { id: 'initialization', text: 'Initialisation', depth: 2 },
  { id: 'init-laravel', text: 'Laravel', depth: 3 },
  { id: 'init-symfony', text: 'Symfony', depth: 3 },
  { id: 'init-php', text: 'PHP Natif', depth: 3 },
  { id: 'methods', text: 'Méthodes', depth: 2 },
  { id: 'invoice-method', text: 'invoice()', depth: 3 },
  { id: 'purchase-method', text: 'purchase()', depth: 3 },
  { id: 'refund-method', text: 'refund()', depth: 3 },
  { id: 'next-steps', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


