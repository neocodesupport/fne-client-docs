<template>
  <DocPage
    title="Dépannage"
    description="Guide de dépannage pour résoudre les problèmes courants"
    sub-description="Ce guide vous aide à résoudre les problèmes courants avec FNE Client."
    section="Avancé"
    heading-id="troubleshooting"
  >

    <DocHeading :level="2" id="common-problems">Problèmes courants</DocHeading>

    <DocHeading :level="3" id="authentication-error">Erreur d'authentification</DocHeading>

    <DocParagraph>
      <strong>Symptôme :</strong> <DocInlineCode>AuthenticationException</DocInlineCode> lancée
    </DocParagraph>

    <DocParagraph>
      <strong>Solutions :</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>Vérifiez que votre clé API est correcte</DocListItem>
      <DocListItem>Vérifiez que la clé API est bien définie dans <DocInlineCode>.env</DocInlineCode></DocListItem>
      <DocListItem>Vérifiez que le mode (test/production) correspond à votre environnement</DocListItem>
    </DocList>

    <DocHeading :level="3" id="validation-error">Erreur de validation</DocHeading>

    <DocParagraph>
      <strong>Symptôme :</strong> <DocInlineCode>ValidationException</DocInlineCode> lancée
    </DocParagraph>

    <DocParagraph>
      <strong>Solutions :</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>Vérifiez que tous les champs requis sont fournis</DocListItem>
      <DocListItem>Vérifiez que les types de données sont corrects</DocListItem>
      <DocListItem>Vérifiez que les enums utilisent les bonnes valeurs</DocListItem>
    </DocList>

    <DocHeading :level="3" id="mapping-error">Erreur de mapping</DocHeading>

    <DocParagraph>
      <strong>Symptôme :</strong> <DocInlineCode>MappingException</DocInlineCode> lancée
    </DocParagraph>

    <DocParagraph>
      <strong>Solutions :</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>Vérifiez la configuration du mapping dans <DocInlineCode>config/fne.php</DocInlineCode></DocListItem>
      <DocListItem>Vérifiez que les chemins de notation pointée sont corrects</DocListItem>
      <DocListItem>Vérifiez que les données ERP correspondent au mapping</DocListItem>
    </DocList>

    <DocHeading :level="2" id="see-also">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/error-handling" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Gestion des erreurs
        </NuxtLink> - Guide complet sur la gestion des erreurs
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/logging" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Logging
        </NuxtLink> - Configurez le logging pour le débogage
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
  { id: 'troubleshooting', text: 'Dépannage', depth: 1 },
  { id: 'common-problems', text: 'Problèmes courants', depth: 2 },
  { id: 'authentication-error', text: 'Erreur d\'authentification', depth: 3 },
  { id: 'validation-error', text: 'Erreur de validation', depth: 3 },
  { id: 'mapping-error', text: 'Erreur de mapping', depth: 3 },
  { id: 'see-also', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


