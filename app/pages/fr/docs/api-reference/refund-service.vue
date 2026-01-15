<template>
  <DocPage
    title="RefundService"
    description="Référence API pour le service d'avoirs"
    sub-description="Le service <code>RefundService</code> gère la création d'avoirs (remboursements)."
    section="Référence API"
    heading-id="refund-service"
  >

    <DocHeading :level="2" id="methods">Méthodes</DocHeading>

    <DocHeading :level="3" id="issue-method">issue()</DocHeading>

    <DocParagraph>
      Crée un avoir pour une facture.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`public function issue(string $invoiceId, array $items): ResponseDTO`"
    />

    <DocParagraph>
      <strong>Paramètres :</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>
        <DocInlineCode>$invoiceId</DocInlineCode> (string) : UUID de la facture originale
      </DocListItem>
      <DocListItem>
        <DocInlineCode>$items</DocInlineCode> (array) : Tableau d'items à rembourser avec structure <DocInlineCode>['id' => 'uuid', 'quantity' => float]</DocInlineCode>
      </DocListItem>
    </DocList>

    <DocParagraph>
      <strong>Retourne :</strong> <DocInlineCode>ResponseDTO</DocInlineCode>
    </DocParagraph>

    <DocHeading :level="3" id="example">Exemple :</DocHeading>

    <DocCode
      language="php"
      :code="`use Neocode\\FNE\\Facades\\FNE;

$invoiceId = 'e2b2d8da-a532-4c08-9182-f5b428ca468d';
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e',
        'quantity' => 10.0,
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);`"
    />

    <DocHeading :level="2" id="see-also">Voir aussi</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guide - Avoirs
        </NuxtLink>
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
  { id: 'refund-service', text: 'RefundService', depth: 1 },
  { id: 'methods', text: 'Méthodes', depth: 2 },
  { id: 'issue-method', text: 'issue()', depth: 3 },
  { id: 'example', text: 'Exemple', depth: 3 },
  { id: 'see-also', text: 'Voir aussi', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


