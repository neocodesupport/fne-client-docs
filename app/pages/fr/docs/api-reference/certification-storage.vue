<template>
  <DocPage
    title="CertificationStorage"
    description="Classe pour gérer l'enregistrement automatique des certifications"
    sub-description="La classe CertificationStorage gère l'enregistrement automatique des certifications dans la table fne_certifications."
    section="Référence API"
    heading-id="certification-storage"
  >

    <DocHeading :level="2" id="methods">Méthodes</DocHeading>

    <DocHeading :level="3" id="save">save()</DocHeading>

    <DocParagraph>
      Enregistre une certification dans la table <DocInlineCode>fne_certifications</DocInlineCode>.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Storage\\CertificationStorage;
use Neocode\\FNE\\DTOs\\ResponseDTO;

\$success = CertificationStorage::save(\$response, \$invoiceData);`"
    />

    <DocParagraph>
      <strong>Paramètres :</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>
        <DocInlineCode>ResponseDTO $response</DocInlineCode> : Réponse de certification
      </DocListItem>
      <DocListItem>
        <DocInlineCode>array $invoiceData</DocInlineCode> : Données de la facture originale
      </DocListItem>
    </DocList>

    <DocParagraph>
      <strong>Retourne :</strong> <DocInlineCode>bool</DocInlineCode> - <DocInlineCode>true</DocInlineCode> si enregistré avec succès, <DocInlineCode>false</DocInlineCode> sinon
    </DocParagraph>

    <DocHeading :level="2" id="compatibility">Compatibilité</DocHeading>

    <DocList>
      <DocListItem>
        <strong>Laravel</strong> : Utilise Eloquent Model
      </DocListItem>
      <DocListItem>
        <strong>Symfony</strong> : Utilise Doctrine EntityManager ou DBAL Connection
      </DocListItem>
      <DocListItem>
        <strong>PHP Natif</strong> : Utilise PDO directement
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="automatic-detection">Détection automatique</DocHeading>

    <DocParagraph>
      La classe détecte automatiquement le framework utilisé et utilise la méthode appropriée :
    </DocParagraph>

    <DocCode
      language="php"
      :code="`// Laravel
if (self::isLaravel()) {
    return self::saveLaravel(\$response, \$invoiceData);
}

// Symfony
if (self::isSymfony()) {
    return self::saveSymfony(\$response, \$invoiceData);
}

// PHP Natif
return self::saveNativePHP(\$response, \$invoiceData);`"
    />

    <DocHeading :level="2" id="error-handling">Gestion des erreurs</DocHeading>

    <DocParagraph>
      Si l'enregistrement échoue, la méthode retourne <DocInlineCode>false</DocInlineCode> et l'erreur est loggée. La certification continue normalement.
    </DocParagraph>

    <DocHeading :level="2" id="see-also">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/certification-storage" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Enregistrement automatique des certifications
        </NuxtLink> - Guide complet
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/api-reference/fne-certification-model" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Modèle FNECertification
        </NuxtLink> - Modèle Eloquent
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
  { id: 'certification-storage', text: 'CertificationStorage', depth: 1 },
  { id: 'methods', text: 'Méthodes', depth: 2 },
  { id: 'save', text: 'save()', depth: 3 },
  { id: 'compatibility', text: 'Compatibilité', depth: 2 },
  { id: 'automatic-detection', text: 'Détection automatique', depth: 2 },
  { id: 'error-handling', text: 'Gestion des erreurs', depth: 2 },
  { id: 'see-also', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage({ title: 'Modèle FNECertification', path: '/fr/docs/api-reference/fne-certification-model' })
setHeadings(headings)
</script>
