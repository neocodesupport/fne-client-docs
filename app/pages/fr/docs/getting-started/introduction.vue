<template>
  <DocPage
    title="Introduction"
    description="Découvrez FNE Client, le SDK PHP pour intégrer l'API FNE dans vos applications"
    section="Démarrage"
  >
    <DocHeading :level="1" id="introduction">Introduction</DocHeading>
    
    <DocParagraph>
      Bienvenue dans la documentation de <strong>FNE Client</strong>, le SDK PHP framework-agnostic pour l'intégration de l'API FNE (Facture Normalisée Électronique).
    </DocParagraph>

    <DocHeading :level="2" id="what-is-fne-client">Qu'est-ce que FNE Client ?</DocHeading>

    <DocParagraph>
      FNE Client est un SDK PHP moderne et intuitif qui simplifie l'intégration de l'API FNE dans vos applications PHP. Que vous utilisiez Laravel, Symfony ou PHP natif, FNE Client s'adapte à votre stack.
    </DocParagraph>

    <DocHeading :level="3" id="main-features">Caractéristiques principales</DocHeading>

    <DocList>
      <DocListItem>
        <strong>Framework-Agnostic</strong> : Compatible avec Laravel 11+, Symfony 7.4+ et PHP natif
      </DocListItem>
      <DocListItem>
        <strong>Zero Configuration</strong> : Installation en une commande avec détection automatique
      </DocListItem>
      <DocListItem>
        <strong>Mapping Flexible</strong> : Transformation de vos données ERP vers FNE avec notation pointée
      </DocListItem>
      <DocListItem>
        <strong>Intégration Modèles</strong> : Traits pour intégration directe avec vos modèles
      </DocListItem>
      <DocListItem>
        <strong>Validation Robuste</strong> : Validation automatique avant envoi à l'API
      </DocListItem>
      <DocListItem>
        <strong>Production Ready</strong> : 67 tests, gestion d'erreurs complète
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="why-use-fne-client">Pourquoi utiliser FNE Client ?</DocHeading>

    <DocHeading :level="3" id="simplicity">Simplicité</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

// Certifier une facture en quelques lignes
$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    // ...
]);`"
    />

    <DocHeading :level="3" id="flexibility">Flexibilité</DocHeading>

    <DocParagraph>
      Le SDK supporte le mapping personnalisé pour transformer vos structures de données ERP vers le format FNE :
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

    <DocHeading :level="3" id="model-integration">Intégration Modèles</DocHeading>

    <DocParagraph>
      Utilisez les traits fournis pour intégrer directement la certification dans vos modèles :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Concerns\\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certifier directement depuis le modèle
$invoice->certify();`"
    />

    <DocHeading :level="2" id="compatibility">Compatibilité</DocHeading>

    <DocParagraph>
      FNE Client est compatible avec :
    </DocParagraph>

    <DocList>
      <DocListItem>
        <strong>Laravel 11+</strong> : Service Provider, Façade et intégration complète
      </DocListItem>
      <DocListItem>
        <strong>Symfony 7.4+</strong> : Service Container et intégration native
      </DocListItem>
      <DocListItem>
        <strong>PHP Natif</strong> : Aucune dépendance framework requise
      </DocListItem>
    </DocList>

    <DocAlert type="success">
      <strong>Prêt à commencer ?</strong> Passez à la section <NuxtLink to="/fr/docs/getting-started/installation" class="text-primary border-b border-transparent hover:border-primary font-medium">Installation</NuxtLink> pour installer FNE Client dans votre projet.
    </DocAlert>

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList ordered>
      <DocListItem>
        <NuxtLink to="/fr/docs/getting-started/installation" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Installation
        </NuxtLink> - Installez FNE Client dans votre projet
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/getting-started/configuration" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Configuration
        </NuxtLink> - Configurez le SDK pour votre environnement
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/getting-started/quick-start" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Démarrage rapide
        </NuxtLink> - Créez votre première facture certifiée
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="resources">Ressources</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Documentation complète
        </NuxtLink>
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Exemples de code
        </NuxtLink>
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/api-reference" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Référence API
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

// Calculer les headings pour la table des matières
const headings = ref([
  { id: 'introduction', text: 'Introduction', depth: 1 },
  { id: 'what-is-fne-client', text: 'Qu\'est-ce que FNE Client ?', depth: 2 },
  { id: 'main-features', text: 'Caractéristiques principales', depth: 3 },
  { id: 'why-use-fne-client', text: 'Pourquoi utiliser FNE Client ?', depth: 2 },
  { id: 'simplicity', text: 'Simplicité', depth: 3 },
  { id: 'flexibility', text: 'Flexibilité', depth: 3 },
  { id: 'model-integration', text: 'Intégration Modèles', depth: 3 },
  { id: 'compatibility', text: 'Compatibilité', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
  { id: 'resources', text: 'Ressources', depth: 2 },
])

// Pages précédente et suivante
const nextPage = { title: 'Installation', path: '/fr/docs/getting-started/installation' }

// Fournir les données au layout
const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(nextPage)
setHeadings(headings)
</script>


