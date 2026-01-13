<template>
  <DocPage
    title="Démarrage rapide"
    description="Créez votre première facture certifiée en quelques minutes"
    section="Démarrage"
  >
    <DocHeading :level="1" id="quick-start">Démarrage rapide</DocHeading>
    
    <DocParagraph>
      Ce guide vous montre comment créer votre première facture certifiée avec FNE Client en quelques minutes.
    </DocParagraph>

    <DocHeading :level="2" id="prerequisites">Prérequis</DocHeading>

    <DocList>
      <DocListItem>
        FNE Client installé et configuré (voir <NuxtLink to="/fr/docs/getting-started/installation" class="text-primary border-b border-transparent hover:border-primary font-medium">Installation</NuxtLink>)
      </DocListItem>
      <DocListItem>Une clé API FNE valide</DocListItem>
      <DocListItem>PHP 8.2 ou supérieur</DocListItem>
    </DocList>

    <DocHeading :level="2" id="basic-example">Exemple basique : Facture B2C</DocHeading>

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

    <DocHeading :level="3" id="example-php">PHP Natif</DocHeading>

    <DocCode
      language="php"
      :code="phpExampleCode"
    />

    <DocHeading :level="2" id="b2b-example">Exemple avec facture B2B</DocHeading>

    <DocParagraph>
      Pour une facture B2B, vous devez fournir le <DocInlineCode>clientNcc</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="php"
      :code="b2bExampleCode"
    />

    <DocHeading :level="2" id="error-handling">Gestion des erreurs</DocHeading>

    <DocParagraph>
      FNE Client lance des exceptions typées en cas d'erreur :
    </DocParagraph>

    <DocCode
      language="php"
      :code="errorHandlingCode"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocParagraph>
      Maintenant que vous avez créé votre première facture :
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/invoices" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides - Factures de vente
        </NuxtLink> - Apprenez les fonctionnalités avancées
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/purchases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides - Bordereaux d'achat
        </NuxtLink> - Certifiez des bordereaux d'achat
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides - Avoirs
        </NuxtLink> - Créez des avoirs pour vos factures
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
    'clientCompanyName' => 'Client Particulier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Produit 1',
            'quantity' => 2,
            'amount' => 5000.0, // Prix unitaire HT en centimes (50.00 FCFA)
            'taxes' => [TaxType::TVA->value],
        ],
        [
            'description' => 'Produit 2',
            'quantity' => 1,
            'amount' => 10000.0, // Prix unitaire HT en centimes (100.00 FCFA)
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);

// Accéder aux résultats
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "9606123E25000000019"
echo $result->token;             // URL complète de vérification QR code
echo $result->balanceSticker;    // Nombre de stickers restants

// Informations de la facture
if ($result->invoice) {
    $invoice = $result->invoice;
    echo $invoice->id;           // UUID de la facture (important pour avoirs futurs)
    echo $invoice->amount;       // Montant total TTC en centimes
    echo $invoice->vatAmount;    // Montant TVA en centimes
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
            'clientCompanyName' => 'Client Particulier',
            'clientPhone' => '0123456789',
            'clientEmail' => 'client@example.com',
            'pointOfSale' => 'POS-001',
            'establishment' => 'EST-001',
            'items' => [
                [
                    'description' => 'Produit 1',
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
    'clientCompanyName' => 'Client Particulier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Produit 1',
            'quantity' => 2,
            'amount' => 5000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);

echo "Référence : " . $result->reference . "\\n";
echo "Token : " . $result->token . "\\n";`

const b2bExampleCode = `$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value, // B2B au lieu de B2C
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
            'amount' => 100000.0, // 1000.00 FCFA HT
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
    // Erreur de validation des données
    echo "Erreur de validation : " . $e->getMessage();
} catch (AuthenticationException $e) {
    // Erreur d'authentification (clé API invalide)
    echo "Erreur d'authentification : " . $e->getMessage();
} catch (BadRequestException $e) {
    // Erreur dans la requête
    echo "Erreur de requête : " . $e->getMessage();
} catch (\\Exception $e) {
    // Autre erreur
    echo "Erreur : " . $e->getMessage();
}`

const headings = ref([
  { id: 'quick-start', text: 'Démarrage rapide', depth: 1 },
  { id: 'prerequisites', text: 'Prérequis', depth: 2 },
  { id: 'basic-example', text: 'Exemple basique : Facture B2C', depth: 2 },
  { id: 'example-laravel', text: 'Laravel', depth: 3 },
  { id: 'example-symfony', text: 'Symfony', depth: 3 },
  { id: 'example-php', text: 'PHP Natif', depth: 3 },
  { id: 'b2b-example', text: 'Exemple avec facture B2B', depth: 2 },
  { id: 'error-handling', text: 'Gestion des erreurs', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const prevPage = { title: 'Configuration', path: '/fr/docs/getting-started/configuration' }
const nextPage = null

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(prevPage)
setNextPage(nextPage)
setHeadings(headings)
</script>


