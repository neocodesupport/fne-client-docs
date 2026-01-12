<template>
  <DocPage
    title="RefundService"
    description="API reference for the refund service"
    section="API Reference"
  >
    <DocHeading :level="1" id="refund-service">RefundService</DocHeading>
    
    <DocParagraph>
      The <DocInlineCode>RefundService</DocInlineCode> service handles refund creation.
    </DocParagraph>

    <DocHeading :level="2" id="methods">Methods</DocHeading>

    <DocHeading :level="3" id="issue-method">issue()</DocHeading>

    <DocParagraph>
      Creates a refund for an invoice.
    </DocParagraph>

    <DocCode
      language="php"
      :code="`public function issue(string $invoiceId, array $items): ResponseDTO`"
    />

    <DocParagraph>
      <strong>Parameters:</strong>
    </DocParagraph>

    <DocList>
      <DocListItem>
        <DocInlineCode>$invoiceId</DocInlineCode> (string): UUID of the original invoice
      </DocListItem>
      <DocListItem>
        <DocInlineCode>$items</DocInlineCode> (array): Array of items to refund with structure <DocInlineCode>['id' => 'uuid', 'quantity' => float]</DocInlineCode>
      </DocListItem>
    </DocList>

    <DocParagraph>
      <strong>Returns:</strong> <DocInlineCode>ResponseDTO</DocInlineCode>
    </DocParagraph>

    <DocHeading :level="3" id="example">Example:</DocHeading>

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

    <DocHeading :level="2" id="see-also">See Also</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/refunds" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Guide - Refunds
        </NuxtLink>
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
  { id: 'refund-service', text: 'RefundService', depth: 1 },
  { id: 'methods', text: 'Methods', depth: 2 },
  { id: 'issue-method', text: 'issue()', depth: 3 },
  { id: 'example', text: 'Example', depth: 3 },
  { id: 'see-also', text: 'See Also', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


