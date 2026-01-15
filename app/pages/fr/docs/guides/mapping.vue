<template>
  <DocPage
    title="Mapping ERP → FNE"
    description="Guide complet pour mapper vos données ERP vers le format FNE"
    sub-description="Ce guide vous montre comment utiliser le mapping personnalisé pour transformer vos structures de données ERP vers le format FNE."
    section="Guides"
    heading-id="mapping"
  >

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      Le mapping personnalisé permet de transformer automatiquement vos structures de données ERP vers le format attendu par l'API FNE. Cela évite d'avoir à restructurer manuellement vos données à chaque appel.
    </DocParagraph>

    <DocHeading :level="2" id="configuration">Configuration du mapping</DocHeading>

    <DocHeading :level="3" id="config-laravel">Laravel</DocHeading>

    <DocParagraph>
      Dans <DocInlineCode>config/fne.php</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`return [
    // ... autres configurations ...
    
    'mapping' => [
        'invoice' => [
            // Mapping pour les factures de vente
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone_number',
            'clientEmail' => 'customer.email_address',
            'pointOfSale' => 'pos.code',
            'establishment' => 'establishment.code',
            'clientSellerName' => 'seller.full_name',
        ],
        'purchase' => [
            // Mapping pour les bordereaux d'achat
            'clientCompanyName' => 'supplier.company_name',
            'clientPhone' => 'supplier.contact_phone',
            'clientEmail' => 'supplier.email',
        ],
    ],
];`"
    />

    <DocHeading :level="3" id="config-symfony">Symfony</DocHeading>

    <DocParagraph>
      Dans <DocInlineCode>config/packages/fne.yaml</DocInlineCode> :
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

    <DocHeading :level="3" id="config-php">PHP Natif</DocHeading>

    <DocParagraph>
      Dans <DocInlineCode>fne.php</DocInlineCode> :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`return [
    // ... autres configurations ...
    
    'mapping' => [
        'invoice' => [
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone_number',
        ],
    ],
];`"
    />

    <DocHeading :level="2" id="dot-notation">Notation pointée</DocHeading>

    <DocParagraph>
      Le mapping supporte la notation pointée pour accéder aux propriétés imbriquées :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`'mapping' => [
    'invoice' => [
        // Accès direct
        'clientCompanyName' => 'customer_name',
        
        // Notation pointée pour propriétés imbriquées
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.contact.email',
        
        // Accès aux tableaux
        'pointOfSale' => 'point_of_sale.code',
        'establishment' => 'establishment.name',
    ],
],`"
    />

    <DocHeading :level="2" id="usage-example">Exemple d'utilisation</DocHeading>

    <DocHeading :level="3" id="without-mapping">Sans mapping</DocHeading>

    <DocParagraph>
      Sans mapping personnalisé, vous devez restructurer vos données manuellement :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Données ERP
$erpData = [
    'customer' => [
        'name' => 'Entreprise Client',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'pos' => [
        'code' => 'POS-001',
    ],
];

// Restructuration manuelle
$fneData = [
    'clientCompanyName' => $erpData['customer']['name'],
    'clientPhone' => $erpData['customer']['phone'],
    'clientEmail' => $erpData['customer']['email'],
    'pointOfSale' => $erpData['pos']['code'],
    // ... autres champs ...
];`"
    />

    <DocHeading :level="3" id="with-mapping">Avec mapping</DocHeading>

    <DocParagraph>
      Avec le mapping personnalisé, vous pouvez utiliser directement vos données ERP :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Configuration du mapping (dans config/fne.php)
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.name',
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.email',
        'pointOfSale' => 'pos.code',
    ],
],

// Utilisation - les données sont automatiquement transformées
$erpData = [
    'customer' => [
        'name' => 'Entreprise Client',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'pos' => [
        'code' => 'POS-001',
    ],
    // ... autres champs FNE directement ...
];

// Le mapping est appliqué automatiquement
$result = FNE::invoice()->sign($erpData);`"
    />

    <DocHeading :level="2" id="model-mapping">Mapping avec modèles</DocHeading>

    <DocParagraph>
      Le mapping fonctionne également avec les modèles via les traits :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiableInvoice;
use Illuminate\\Database\\Eloquent\\Model;

class Invoice extends Model
{
    use CertifiableInvoice;
    
    // Le mapping est appliqué automatiquement lors de l'extraction des données
}

// Utilisation
$invoice = Invoice::find(1);

// Les données du modèle sont automatiquement transformées selon le mapping
$result = $invoice->certify();`"
    />

    <DocHeading :level="2" id="priority-order">Ordre de priorité</DocHeading>

    <DocParagraph>
      Le mapping personnalisé est appliqué <strong>avant</strong> le mapping standard. L'ordre de traitement est :
    </DocParagraph>

    <DocList ordered>
      <DocListItem>
        <strong>Mapping personnalisé</strong> : Transforme les clés ERP vers les clés FNE
      </DocListItem>
      <DocListItem>
        <strong>Fusion</strong> : Les données mappées sont fusionnées avec les données originales
      </DocListItem>
      <DocListItem>
        <strong>Mapping standard</strong> : Le mapping standard est appliqué sur les données fusionnées
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="unmapped-fields">Champs non mappés</DocHeading>

    <DocParagraph>
      Les champs qui ne sont pas dans le mapping sont préservés tels quels. Vous pouvez donc :
    </DocParagraph>

    <DocList>
      <DocListItem>Mapper certains champs et laisser les autres en format FNE</DocListItem>
      <DocListItem>Combiner les deux approches dans la même structure de données</DocListItem>
    </DocList>

    <DocCode
      language="php"
      :code="`$data = [
    // Champs mappés depuis ERP
    'customer' => [
        'name' => 'Entreprise Client',
        'phone' => '0123456789',
    ],
    
    // Champs déjà en format FNE
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'items' => [
        // ... items en format FNE ...
    ],
];`"
    />

    <DocHeading :level="2" id="disable-mapping">Désactiver le mapping</DocHeading>

    <DocParagraph>
      Pour désactiver le mapping pour un appel spécifique, vous pouvez passer directement les données en format FNE :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Les données sont déjà en format FNE, pas besoin de mapping
$fneData = [
    'clientCompanyName' => 'Entreprise Client',
    'clientPhone' => '0123456789',
    // ... autres champs FNE ...
];

$result = FNE::invoice()->sign($fneData);`"
    />

    <DocHeading :level="2" id="advanced-examples">Exemples avancés</DocHeading>

    <DocHeading :level="3" id="conditional-mapping">Mapping conditionnel</DocHeading>

    <DocCode
      language="php"
      :code="`// Mapping pour factures B2B
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientNcc' => 'customer.ncc',
        'clientRccm' => 'customer.rccm',
    ],
],

// Les données ERP
$erpData = [
    'customer' => [
        'company_name' => 'Entreprise Client',
        'ncc' => '123456789',
        'rccm' => 'CI-ABJ-12345',
    ],
];`"
    />

    <DocHeading :level="3" id="default-values">Mapping avec valeurs par défaut</DocHeading>

    <DocCode
      language="php"
      :code="`$erpData = [
    'customer' => [
        'name' => 'Entreprise Client',
        // phone n'existe pas
    ],
];

// Fournir une valeur par défaut
$erpData['customer']['phone'] = $erpData['customer']['phone'] ?? '0000000000';`"
    />

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/invoices#model-integration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Intégration modèles
        </NuxtLink> - Utilisez les traits pour intégration directe
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Gestion des erreurs
        </NuxtLink> - Gérez les erreurs de mapping
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Exemples
        </NuxtLink> - Consultez plus d'exemples de mapping
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
  { id: 'mapping', text: 'Mapping ERP → FNE', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'configuration', text: 'Configuration du mapping', depth: 2 },
  { id: 'config-laravel', text: 'Laravel', depth: 3 },
  { id: 'config-symfony', text: 'Symfony', depth: 3 },
  { id: 'config-php', text: 'PHP Natif', depth: 3 },
  { id: 'dot-notation', text: 'Notation pointée', depth: 2 },
  { id: 'usage-example', text: 'Exemple d\'utilisation', depth: 2 },
  { id: 'without-mapping', text: 'Sans mapping', depth: 3 },
  { id: 'with-mapping', text: 'Avec mapping', depth: 3 },
  { id: 'model-mapping', text: 'Mapping avec modèles', depth: 2 },
  { id: 'priority-order', text: 'Ordre de priorité', depth: 2 },
  { id: 'unmapped-fields', text: 'Champs non mappés', depth: 2 },
  { id: 'disable-mapping', text: 'Désactiver le mapping', depth: 2 },
  { id: 'advanced-examples', text: 'Exemples avancés', depth: 2 },
  { id: 'conditional-mapping', text: 'Mapping conditionnel', depth: 3 },
  { id: 'default-values', text: 'Mapping avec valeurs par défaut', depth: 3 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


