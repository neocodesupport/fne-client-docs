<template>
  <DocPage
    title="Error Handling"
    description="Complete guide for handling errors with FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="error-handling">Error Handling</DocHeading>
    
    <DocParagraph>
      This guide shows you how to handle errors with FNE Client efficiently.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Overview</DocHeading>

    <DocParagraph>
      FNE Client uses typed exceptions to handle errors. Each error type has its own exception, making handling and debugging easier.
    </DocParagraph>

    <DocHeading :level="2" id="exception-hierarchy">Exception Hierarchy</DocHeading>

    <DocCode
      language="text"
      :code="exceptionHierarchyCode"
      :show-line-numbers="false"
    />

    <DocHeading :level="2" id="exception-types">Exception Types</DocHeading>

    <DocHeading :level="3" id="validation-exception">ValidationException</DocHeading>

    <DocParagraph>
      Thrown when provided data is invalid:
    </DocParagraph>

    <DocCode
      language="php"
      :code="validationExceptionCode"
    />

    <DocHeading :level="3" id="authentication-exception">AuthenticationException</DocHeading>

    <DocParagraph>
      Thrown when authentication fails (invalid API key):
    </DocParagraph>

    <DocCode
      language="php"
      :code="authenticationExceptionCode"
    />

    <DocHeading :level="3" id="bad-request-exception">BadRequestException</DocHeading>

    <DocParagraph>
      Thrown when the request is malformed (400):
    </DocParagraph>

    <DocCode
      language="php"
      :code="badRequestExceptionCode"
    />

    <DocHeading :level="3" id="not-found-exception">NotFoundException</DocHeading>

    <DocParagraph>
      Thrown when the resource is not found (404):
    </DocParagraph>

    <DocCode
      language="php"
      :code="notFoundExceptionCode"
    />

    <DocHeading :level="3" id="server-exception">ServerException</DocHeading>

    <DocParagraph>
      Thrown when the server encounters an error (500+):
    </DocParagraph>

    <DocCode
      language="php"
      :code="serverExceptionCode"
    />

    <DocHeading :level="3" id="mapping-exception">MappingException</DocHeading>

    <DocParagraph>
      Thrown when data mapping fails:
    </DocParagraph>

    <DocCode
      language="php"
      :code="mappingExceptionCode"
    />

    <DocHeading :level="2" id="complete-handling">Complete Error Handling</DocHeading>

    <DocHeading :level="3" id="complete-example">Complete Example</DocHeading>

    <DocCode
      language="php"
      :code="completeExampleCode"
    />

    <DocHeading :level="2" id="error-format">Error Format</DocHeading>

    <DocParagraph>
      All FNE exceptions implement a <DocInlineCode>toArray()</DocInlineCode> method to get a standardized format:
    </DocParagraph>

    <DocCode
      language="php"
      :code="errorFormatCode"
    />

    <DocHeading :level="2" id="localized-messages">Localized Error Messages</DocHeading>

    <DocParagraph>
      Error messages are automatically localized according to configuration:
    </DocParagraph>

    <DocCode
      language="php"
      :code="localizedMessagesCode"
    />

    <DocHeading :level="2" id="error-logging">Error Logging</DocHeading>

    <DocParagraph>
      FNE Client automatically logs errors if a logger is configured:
    </DocParagraph>

    <DocCode
      language="php"
      :code="errorLoggingCode"
    />

    <DocHeading :level="2" id="auto-retry">Automatic Retry</DocHeading>

    <DocParagraph>
      For temporary server errors, you can implement a retry:
    </DocParagraph>

    <DocCode
      language="php"
      :code="autoRetryCode"
    />

    <DocHeading :level="2" id="best-practices">Best Practices</DocHeading>

    <DocList ordered>
      <DocListItem>
        <strong>Always handle exceptions</strong>: Never leave FNE exceptions unhandled
      </DocListItem>
      <DocListItem>
        <strong>Use specific types</strong>: Use specific exceptions rather than generic <DocInlineCode>FNEException</DocInlineCode>
      </DocListItem>
      <DocListItem>
        <strong>Log errors</strong>: Log errors for debugging
      </DocListItem>
      <DocListItem>
        <strong>User messages</strong>: Display user-friendly messages rather than technical messages
      </DocListItem>
      <DocListItem>
        <strong>Retry for server errors</strong>: Implement retry for temporary server errors
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="next-steps">Next Steps</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/docs/guides/cache" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Cache
        </NuxtLink> - Use cache to improve performance
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/guides/logging" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Logging
        </NuxtLink> - Configure logging for debugging
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Examples
        </NuxtLink> - Check out more error handling examples
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
const exceptionHierarchyCode = `FNEException (abstract)
├── ValidationException (422)
├── MappingException (500)
├── AuthenticationException (401)
├── BadRequestException (400)
├── NotFoundException (404)
└── ServerException (500+)`

const validationExceptionCode = `use Neocode\\FNE\\Exceptions\\ValidationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Validation error
    echo "Validation error: " . $e->getMessage();
    echo "Error code: " . $e->getErrorCode();
    echo "Detailed errors: ";
    print_r($e->getErrors());
}`

const authenticationExceptionCode = `use Neocode\\FNE\\Exceptions\\AuthenticationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (AuthenticationException $e) {
    // Authentication error
    echo "Authentication error: " . $e->getMessage();
    echo "Check your API key";
}`

const badRequestExceptionCode = `use Neocode\\FNE\\Exceptions\\BadRequestException;

try {
    $result = FNE::invoice()->sign($data);
} catch (BadRequestException $e) {
    // Request error
    echo "Request error: " . $e->getMessage();
    echo "HTTP code: " . $e->getStatusCode();
}`

const notFoundExceptionCode = `use Neocode\\FNE\\Exceptions\\NotFoundException;

try {
    $result = FNE::refund()->issue($invoiceId, $items);
} catch (NotFoundException $e) {
    // Invoice not found
    echo "Invoice not found: " . $e->getMessage();
}`

const serverExceptionCode = `use Neocode\\FNE\\Exceptions\\ServerException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ServerException $e) {
    // Server error
    echo "Server error: " . $e->getMessage();
    echo "Please try again later";
}`

const mappingExceptionCode = `use Neocode\\FNE\\Exceptions\\MappingException;

try {
    $result = FNE::invoice()->sign($data);
} catch (MappingException $e) {
    // Mapping error
    echo "Mapping error: " . $e->getMessage();
}`

const completeExampleCode = `use Neocode\\FNE\\Exceptions\\ValidationException;
use Neocode\\FNE\\Exceptions\\AuthenticationException;
use Neocode\\FNE\\Exceptions\\BadRequestException;
use Neocode\\FNE\\Exceptions\\NotFoundException;
use Neocode\\FNE\\Exceptions\\ServerException;
use Neocode\\FNE\\Exceptions\\MappingException;
use Neocode\\FNE\\Exceptions\\FNEException;

try {
    $result = FNE::invoice()->sign($data);
    
    // Success
    return response()->json([
        'success' => true,
        'data' => $result->toArray(),
    ]);
    
} catch (ValidationException $e) {
    // Validation error (422)
    return response()->json([
        'success' => false,
        'error' => 'validation_error',
        'message' => $e->getMessage(),
        'errors' => $e->getErrors(),
    ], 422);
    
} catch (AuthenticationException $e) {
    // Authentication error (401)
    return response()->json([
        'success' => false,
        'error' => 'authentication_error',
        'message' => 'Invalid API key',
    ], 401);
    
} catch (BadRequestException $e) {
    // Request error (400)
    return response()->json([
        'success' => false,
        'error' => 'bad_request',
        'message' => $e->getMessage(),
    ], 400);
    
} catch (NotFoundException $e) {
    // Resource not found (404)
    return response()->json([
        'success' => false,
        'error' => 'not_found',
        'message' => $e->getMessage(),
    ], 404);
    
} catch (ServerException $e) {
    // Server error (500+)
    return response()->json([
        'success' => false,
        'error' => 'server_error',
        'message' => 'A server error occurred. Please try again later.',
    ], 500);
    
} catch (MappingException $e) {
    // Mapping error (500)
    return response()->json([
        'success' => false,
        'error' => 'mapping_error',
        'message' => $e->getMessage(),
    ], 500);
    
} catch (FNEException $e) {
    // Other FNE error
    return response()->json([
        'success' => false,
        'error' => 'fne_error',
        'message' => $e->getMessage(),
    ], $e->getStatusCode());
    
} catch (\\Exception $e) {
    // Unexpected error
    Log::error('Unexpected FNE error', [
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
    ]);
    
    return response()->json([
        'success' => false,
        'error' => 'unexpected_error',
        'message' => 'An unexpected error occurred.',
    ], 500);
}`

const errorFormatCode = `try {
    $result = FNE::invoice()->sign($data);
} catch (FNEException $e) {
    $errorArray = $e->toArray();
    
    /*
    [
        'message' => 'Translated error message',
        'error' => 'error_code',
        'status_code' => 422,
        'errors' => [...], // Detailed errors (if available)
        'meta' => [
            'timestamp' => '2025-01-14T16:59:11.016Z',
            'request_id' => 'req_1234567890',
        ],
    ]
    */
}`

const localizedMessagesCode = `// Configuration in config/fne.php
'locale' => 'en', // or 'fr'

// Error messages will be in English or French according to configuration
try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    echo $e->getMessage(); // Message in English if locale = 'en'
}`

const errorLoggingCode = `// Errors are automatically logged via the configured logger
try {
    $result = FNE::invoice()->sign($data);
} catch (FNEException $e) {
    // Error has already been automatically logged
    // You can also log manually if needed
    Log::error('FNE error', [
        'exception' => $e->getMessage(),
        'code' => $e->getErrorCode(),
        'status' => $e->getStatusCode(),
    ]);
}`

const autoRetryCode = `use Neocode\\FNE\\Exceptions\\ServerException;

$maxRetries = 3;
$retryCount = 0;

while ($retryCount < $maxRetries) {
    try {
        $result = FNE::invoice()->sign($data);
        break; // Success
    } catch (ServerException $e) {
        $retryCount++;
        
        if ($retryCount >= $maxRetries) {
            throw $e; // Failed after all attempts
        }
        
        // Wait before retrying (exponential backoff)
        sleep(pow(2, $retryCount));
    }
}`

const headings = ref([
  { id: 'error-handling', text: 'Error Handling', depth: 1 },
  { id: 'overview', text: 'Overview', depth: 2 },
  { id: 'exception-hierarchy', text: 'Exception Hierarchy', depth: 2 },
  { id: 'exception-types', text: 'Exception Types', depth: 2 },
  { id: 'validation-exception', text: 'ValidationException', depth: 3 },
  { id: 'authentication-exception', text: 'AuthenticationException', depth: 3 },
  { id: 'bad-request-exception', text: 'BadRequestException', depth: 3 },
  { id: 'not-found-exception', text: 'NotFoundException', depth: 3 },
  { id: 'server-exception', text: 'ServerException', depth: 3 },
  { id: 'mapping-exception', text: 'MappingException', depth: 3 },
  { id: 'complete-handling', text: 'Complete Error Handling', depth: 2 },
  { id: 'complete-example', text: 'Complete Example', depth: 3 },
  { id: 'error-format', text: 'Error Format', depth: 2 },
  { id: 'localized-messages', text: 'Localized Error Messages', depth: 2 },
  { id: 'error-logging', text: 'Error Logging', depth: 2 },
  { id: 'auto-retry', text: 'Automatic Retry', depth: 2 },
  { id: 'best-practices', text: 'Best Practices', depth: 2 },
  { id: 'next-steps', text: 'Next Steps', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>


