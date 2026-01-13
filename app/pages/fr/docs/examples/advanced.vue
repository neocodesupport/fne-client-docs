<template>
  <DocPage
    title="Exemples avancés"
    description="Exemples de code avancés avec FNE Client"
    section="Exemples"
  >
    <DocHeading :level="1" id="advanced-examples">Exemples avancés</DocHeading>
    
    <DocParagraph>
      Cette page contient des exemples de code avancés pour des cas d'usage complexes.
    </DocParagraph>

    <DocHeading :level="2" id="custom-taxes">Facture avec taxes personnalisées</DocHeading>

    <DocCode
      language="php"
      :code="customTaxesCode"
    />

    <DocHeading :level="2" id="b2f-foreign-currency">Facture B2F avec devise étrangère</DocHeading>

    <DocCode
      language="php"
      :code="b2fForeignCurrencyCode"
    />

    <DocHeading :level="2" id="discounts">Facture avec remises</DocHeading>

    <DocCode
      language="php"
      :code="discountsCode"
    />

    <DocHeading :level="2" id="model-integration">Intégration avec modèles</DocHeading>

    <DocCode
      language="php"
      :code="modelIntegrationCode"
    />

    <DocHeading :level="2" id="error-handling">Gestion d'erreurs complète</DocHeading>

    <DocCode
      language="php"
      :code="errorHandlingCode"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples/use-cases" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Cas d'usage réels
        </NuxtLink> - Voir des exemples de cas d'usage réels
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guides
        </NuxtLink> - Apprenez les fonctionnalités avancées
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
const customTaxesCode = `$result = FNE::invoice()->sign([
    // ... champs de base ...
    'items' => [
        [
            'description' => 'Produit avec taxes personnalisées',
            'quantity' => 1,
            'amount' => 10000.0,
            'taxes' => [TaxType::TVA->value],
            'customTaxes' => [
                [
                    'name' => 'GRA',
                    'amount' => 2.5, // 2.5%
                ],
                [
                    'name' => 'AIRSI',
                    'amount' => 1.0, // 1%
                ],
            ],
        ],
    ],
    'customTaxes' => [
        [
            'name' => 'DTD',
            'amount' => 5.0, // 5% au niveau facture
        ],
    ],
]);`

const b2fForeignCurrencyCode = `use Neocode\\FNE\\Enums\\ForeignCurrency;

$result = FNE::invoice()->sign([
    // ... champs de base ...
    'template' => InvoiceTemplate::B2F->value,
    'foreignCurrency' => ForeignCurrency::EUR->value,
    'foreignCurrencyRate' => 655.0, // Taux de change
    // ...
]);`

const discountsCode = `$result = FNE::invoice()->sign([
    // ... champs de base ...
    'discount' => 10.0, // Remise globale de 10%
    'items' => [
        [
            'description' => 'Produit avec remise',
            'quantity' => 2,
            'amount' => 5000.0,
            'discount' => 15.0, // Remise de 15% sur cet article
            'taxes' => [TaxType::TVA->value],
        ],
    ],
]);`

const modelIntegrationCode = `use Neocode\\FNE\\Concerns\\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Utilisation
$invoice = Invoice::find(1);
$result = $invoice->certify(); // Extrait automatiquement les données`

const errorHandlingCode = `use Neocode\\FNE\\Exceptions\\ValidationException;
use Neocode\\FNE\\Exceptions\\AuthenticationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Gérer l'erreur de validation
} catch (AuthenticationException $e) {
    // Gérer l'erreur d'authentification
}`

const headings = ref([
  { id: 'advanced-examples', text: 'Exemples avancés', depth: 1 },
  { id: 'custom-taxes', text: 'Facture avec taxes personnalisées', depth: 2 },
  { id: 'b2f-foreign-currency', text: 'Facture B2F avec devise étrangère', depth: 2 },
  { id: 'discounts', text: 'Facture avec remises', depth: 2 },
  { id: 'model-integration', text: 'Intégration avec modèles', depth: 2 },
  { id: 'error-handling', text: 'Gestion d\'erreurs complète', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


