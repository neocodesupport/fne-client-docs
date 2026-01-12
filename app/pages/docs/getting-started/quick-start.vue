<template>
  <DocPage
    title="Quick Start"
    description="Create your first certified invoice in just a few minutes"
    section="Getting Started"
  >
    <DocHeading :level="1" id="quick-start">Quick Start</DocHeading>
    
    <DocParagraph>
      This guide shows you how to create your first certified invoice with FNE Client in just a few minutes.
    </DocParagraph>

    <DocHeading :level="2" id="prerequisites">Prerequisites</DocHeading>

    <DocList>
      <DocListItem>
        FNE Client installed and configured (see <NuxtLink to="/docs/getting-started/installation" class="text-primary border-b border-transparent hover:border-primary font-medium">Installation</NuxtLink>)
      </DocListItem>
      <DocListItem>A valid FNE API key</DocListItem>
      <DocListItem>PHP 8.2 or higher</DocListItem>
    </DocList>

    <DocHeading :level="2" id="basic-example">Basic Example: B2C Invoice</DocHeading>

    <DocHeading :level="3" id="example-laravel">Laravel</DocHeading>

    <DocCode
      language="php"
      :code="laravelExampleCode"
    />

    <DocHeading :level="3" id="example-symfony">Symfony</DocHeading>

    <DocCode
      language="php"
      :code="symfonyExampleCode"
    />

    <DocHeading :level="3" id="example-php">Native PHP</DocHeading>

    <DocCode
      language="php"
      :code="phpExampleCode"
    />

    <DocHeading :level="2" id="b2b-example">B2B Invoice Example</DocHeading>

    <DocParagraph>
      For a B2B invoice, you must provide the <DocInlineCode>clientNcc</DocInlineCode>:
    </DocParagraph>

    <DocCode
      language="php"
      :code="b2bExampleCode"
    />

    <DocHeading :level="2" id="error-handling">Error Handling</DocHeading>

    <DocParagraph>
      FNE Client throws typed exceptions on error:
    </DocParagraph>

    <DocCode
      language="php"
      :code="errorHandlingCode"
    />

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocParagraph>
      Now that you've created your first invoice:
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <NuxtLink to="/docs/guides/invoices" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides - Sales Invoices
        </NuxtLink> - Learn advanced features
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/purchases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides - Purchase Slips
        </NuxtLink> - Certify purchase slips
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides - Refunds
        </NuxtLink> - Create refunds for your invoices
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Examples
        </NuxtLink> - Check out more code examples
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

// Code blocks
const laravelExampleCode = `use Neocode\\FNE\\Facades\\FNE;
use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Individual Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Product 1',
            'quantity' => 2,
            'amount' => 5000.0, // Unit price excluding tax in cents (50.00 FCFA)
            'taxes' => [TaxType::TVA->value],
        ],
        [
            'description' => 'Product 2',
            'quantity' => 1,
            'amount' => 10000.0, // Unit price excluding tax in cents (100.00 FCFA)
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);

// Access results
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "9606123E25000000019"
echo $result->token;             // Complete QR code verification URL
echo $result->balanceSticker;    // Number of remaining stickers

// Invoice information
if ($result->invoice) {
    $invoice = $result->invoice;
    echo $invoice->id;           // Invoice UUID (important for future refunds)
    echo $invoice->amount;       // Total amount including tax in cents
    echo $invoice->vatAmount;    // VAT amount in cents
}`

const symfonyExampleCode = `use Neocode\\FNE\\FNEClient;
use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;

class InvoiceController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}
    
    public function certify(): Response
    {
        $result = $this->fneClient->invoice()->sign([
            'invoiceType' => InvoiceType::SALE->value,
            'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
            'template' => InvoiceTemplate::B2C->value,
            'isRne' => false,
            'clientCompanyName' => 'Individual Client',
            'clientPhone' => '0123456789',
            'clientEmail' => 'client@example.com',
            'pointOfSale' => 'POS-001',
            'establishment' => 'EST-001',
            'items' => [
                [
                    'description' => 'Product 1',
                    'quantity' => 2,
                    'amount' => 5000.0,
                    'taxes' => [TaxType::TVA->value],
                ],
            ],
            'taxes' => TaxType::TVA->value,
        ]);
        
        return new JsonResponse($result->toArray());
    }
}`

const phpExampleCode = `require_once 'vendor/autoload.php';

use Neocode\\FNE\\FNEClient;
use Neocode\\FNE\\Config\\FNEConfig;
use Neocode\\FNE\\Http\\HttpClientFactory;
use Neocode\\FNE\\Enums\\InvoiceType;
use Neocode\\FNE\\Enums\\PaymentMethod;
use Neocode\\FNE\\Enums\\InvoiceTemplate;
use Neocode\\FNE\\Enums\\TaxType;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'http://54.247.95.108/ws',
    'mode' => 'test',
]);

$httpClient = HttpClientFactory::create($config);
$fne = new FNEClient($httpClient, $config);

$result = $fne->invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Individual Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Product 1',
            'quantity' => 2,
            'amount' => 5000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);

echo "Reference: " . $result->reference . "\\n";
echo "Token: " . $result->token . "\\n";`

const b2bExampleCode = `$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value, // B2B instead of B2C
    'isRne' => false,
    'clientNcc' => '123456789', // Required for B2B
    'clientCompanyName' => 'Business Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Professional Service',
            'quantity' => 1,
            'amount' => 100000.0, // 1000.00 FCFA excluding tax
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);`

const errorHandlingCode = `use Neocode\\FNE\\Exceptions\\ValidationException;
use Neocode\\FNE\\Exceptions\\AuthenticationException;
use Neocode\\FNE\\Exceptions\\BadRequestException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Data validation error
    echo "Validation error: " . $e->getMessage();
} catch (AuthenticationException $e) {
    // Authentication error (invalid API key)
    echo "Authentication error: " . $e->getMessage();
} catch (BadRequestException $e) {
    // Request error
    echo "Request error: " . $e->getMessage();
} catch (\\Exception $e) {
    // Other error
    echo "Error: " . $e->getMessage();
}`

const headings = ref([
  { id: 'quick-start', text: 'Quick Start', depth: 1 },
  { id: 'prerequisites', text: 'Prerequisites', depth: 2 },
  { id: 'basic-example', text: 'Basic Example: B2C Invoice', depth: 2 },
  { id: 'example-laravel', text: 'Laravel', depth: 3 },
  { id: 'example-symfony', text: 'Symfony', depth: 3 },
  { id: 'example-php', text: 'Native PHP', depth: 3 },
  { id: 'b2b-example', text: 'B2B Invoice Example', depth: 2 },
  { id: 'error-handling', text: 'Error Handling', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const prevPage = { title: 'Configuration', path: '/docs/getting-started/configuration' }
const nextPage = null

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(prevPage)
setNextPage(nextPage)
setHeadings(headings)
</script>


