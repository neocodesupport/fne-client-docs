<template>
  <DocPage
    title="Gestion des erreurs"
    description="Guide complet pour gérer les erreurs avec FNE Client"
    section="Guides"
  >
    <DocHeading :level="1" id="error-handling">Gestion des erreurs</DocHeading>
    
    <DocParagraph>
      Ce guide vous montre comment gérer les erreurs avec FNE Client de manière efficace.
    </DocParagraph>

    <DocHeading :level="2" id="overview">Vue d'ensemble</DocHeading>

    <DocParagraph>
      FNE Client utilise des exceptions typées pour gérer les erreurs. Chaque type d'erreur a sa propre exception, ce qui facilite la gestion et le débogage.
    </DocParagraph>

    <DocHeading :level="2" id="exception-hierarchy">Hiérarchie des exceptions</DocHeading>

    <DocCode
      language="text"
      :code="exceptionHierarchyCode"
      :show-line-numbers="false"
    />

    <DocHeading :level="2" id="exception-types">Types d'exceptions</DocHeading>

    <DocHeading :level="3" id="validation-exception">ValidationException</DocHeading>

    <DocParagraph>
      Lancée lorsque les données fournies sont invalides :
    </DocParagraph>

    <DocCode
      language="php"
      :code="validationExceptionCode"
    />

    <DocHeading :level="3" id="authentication-exception">AuthenticationException</DocHeading>

    <DocParagraph>
      Lancée lorsque l'authentification échoue (clé API invalide) :
    </DocParagraph>

    <DocCode
      language="php"
      :code="authenticationExceptionCode"
    />

    <DocHeading :level="3" id="bad-request-exception">BadRequestException</DocHeading>

    <DocParagraph>
      Lancée lorsque la requête est mal formée (400) :
    </DocParagraph>

    <DocCode
      language="php"
      :code="badRequestExceptionCode"
    />

    <DocHeading :level="3" id="not-found-exception">NotFoundException</DocHeading>

    <DocParagraph>
      Lancée lorsque la ressource n'est pas trouvée (404) :
    </DocParagraph>

    <DocCode
      language="php"
      :code="notFoundExceptionCode"
    />

    <DocHeading :level="3" id="server-exception">ServerException</DocHeading>

    <DocParagraph>
      Lancée lorsque le serveur rencontre une erreur (500+) :
    </DocParagraph>

    <DocCode
      language="php"
      :code="serverExceptionCode"
    />

    <DocHeading :level="3" id="mapping-exception">MappingException</DocHeading>

    <DocParagraph>
      Lancée lorsque le mapping des données échoue :
    </DocParagraph>

    <DocCode
      language="php"
      :code="mappingExceptionCode"
    />

    <DocHeading :level="2" id="complete-handling">Gestion complète des erreurs</DocHeading>

    <DocHeading :level="3" id="complete-example">Exemple complet</DocHeading>

    <DocCode
      language="php"
      :code="completeExampleCode"
    />

    <DocHeading :level="2" id="error-format">Format des erreurs</DocHeading>

    <DocParagraph>
      Toutes les exceptions FNE implémentent une méthode <DocInlineCode>toArray()</DocInlineCode> pour obtenir un format standardisé :
    </DocParagraph>

    <DocCode
      language="php"
      :code="errorFormatCode"
    />

    <DocHeading :level="2" id="localized-messages">Messages d'erreur localisés</DocHeading>

    <DocParagraph>
      Les messages d'erreur sont automatiquement localisés selon la configuration :
    </DocParagraph>

    <DocCode
      language="php"
      :code="localizedMessagesCode"
    />

    <DocHeading :level="2" id="error-logging">Logging des erreurs</DocHeading>

    <DocParagraph>
      FNE Client enregistre automatiquement les erreurs si un logger est configuré :
    </DocParagraph>

    <DocCode
      language="php"
      :code="errorLoggingCode"
    />

    <DocHeading :level="2" id="auto-retry">Retry automatique</DocHeading>

    <DocParagraph>
      Pour les erreurs serveur temporaires, vous pouvez implémenter un retry :
    </DocParagraph>

    <DocCode
      language="php"
      :code="autoRetryCode"
    />

    <DocHeading :level="2" id="best-practices">Bonnes pratiques</DocHeading>

    <DocList ordered>
      <DocListItem>
        <strong>Toujours gérer les exceptions</strong> : Ne laissez jamais les exceptions FNE non gérées
      </DocListItem>
      <DocListItem>
        <strong>Utiliser les types spécifiques</strong> : Utilisez les exceptions spécifiques plutôt que <DocInlineCode>FNEException</DocInlineCode> générique
      </DocListItem>
      <DocListItem>
        <strong>Logger les erreurs</strong> : Enregistrez les erreurs pour le débogage
      </DocListItem>
      <DocListItem>
        <strong>Messages utilisateur</strong> : Affichez des messages utilisateur conviviaux plutôt que les messages techniques
      </DocListItem>
      <DocListItem>
        <strong>Retry pour erreurs serveur</strong> : Implémentez un retry pour les erreurs serveur temporaires
      </DocListItem>
    </DocList>

    <DocHeading :level="2" id="next-steps">Prochaines étapes</DocHeading>

    <DocList>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/cache" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Cache
        </NuxtLink> - Utilisez le cache pour améliorer les performances
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/guides/logging" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Logging
        </NuxtLink> - Configurez le logging pour le débogage
      </DocListItem>
      <DocListItem>
        <NuxtLink to="/fr/docs/examples" class="text-primary border-b border-transparent hover:border-primary font-medium">
          Exemples
        </NuxtLink> - Consultez plus d'exemples de gestion d'erreurs
      </DocListItem>
    </DocList>

    <DocAlert type="info">
      <strong>Besoin d'aide ?</strong> Consultez la 
      <NuxtLink to="/fr/docs" class="text-primary border-b border-transparent hover:border-primary font-medium">
        documentation complète
      </NuxtLink> 
      ou 
      <a href="https://github.com/neocode/fne-client/issues" target="_blank" class="text-primary border-b border-transparent hover:border-primary font-medium">
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
const exceptionHierarchyCode = `FNEException (abstraite)
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
    // Erreur de validation
    echo "Erreur de validation : " . $e->getMessage();
    echo "Code d'erreur : " . $e->getErrorCode();
    echo "Erreurs détaillées : ";
    print_r($e->getErrors());
}`

const authenticationExceptionCode = `use Neocode\\FNE\\Exceptions\\AuthenticationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (AuthenticationException $e) {
    // Erreur d'authentification
    echo "Erreur d'authentification : " . $e->getMessage();
    echo "Vérifiez votre clé API";
}`

const badRequestExceptionCode = `use Neocode\\FNE\\Exceptions\\BadRequestException;

try {
    $result = FNE::invoice()->sign($data);
} catch (BadRequestException $e) {
    // Erreur dans la requête
    echo "Erreur de requête : " . $e->getMessage();
    echo "Code HTTP : " . $e->getStatusCode();
}`

const notFoundExceptionCode = `use Neocode\\FNE\\Exceptions\\NotFoundException;

try {
    $result = FNE::refund()->issue($invoiceId, $items);
} catch (NotFoundException $e) {
    // Facture non trouvée
    echo "Facture non trouvée : " . $e->getMessage();
}`

const serverExceptionCode = `use Neocode\\FNE\\Exceptions\\ServerException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ServerException $e) {
    // Erreur serveur
    echo "Erreur serveur : " . $e->getMessage();
    echo "Réessayez plus tard";
}`

const mappingExceptionCode = `use Neocode\\FNE\\Exceptions\\MappingException;

try {
    $result = FNE::invoice()->sign($data);
} catch (MappingException $e) {
    // Erreur de mapping
    echo "Erreur de mapping : " . $e->getMessage();
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
    
    // Succès
    return response()->json([
        'success' => true,
        'data' => $result->toArray(),
    ]);
    
} catch (ValidationException $e) {
    // Erreur de validation (422)
    return response()->json([
        'success' => false,
        'error' => 'validation_error',
        'message' => $e->getMessage(),
        'errors' => $e->getErrors(),
    ], 422);
    
} catch (AuthenticationException $e) {
    // Erreur d'authentification (401)
    return response()->json([
        'success' => false,
        'error' => 'authentication_error',
        'message' => 'Clé API invalide',
    ], 401);
    
} catch (BadRequestException $e) {
    // Erreur dans la requête (400)
    return response()->json([
        'success' => false,
        'error' => 'bad_request',
        'message' => $e->getMessage(),
    ], 400);
    
} catch (NotFoundException $e) {
    // Ressource non trouvée (404)
    return response()->json([
        'success' => false,
        'error' => 'not_found',
        'message' => $e->getMessage(),
    ], 404);
    
} catch (ServerException $e) {
    // Erreur serveur (500+)
    return response()->json([
        'success' => false,
        'error' => 'server_error',
        'message' => 'Une erreur serveur est survenue. Veuillez réessayer plus tard.',
    ], 500);
    
} catch (MappingException $e) {
    // Erreur de mapping (500)
    return response()->json([
        'success' => false,
        'error' => 'mapping_error',
        'message' => $e->getMessage(),
    ], 500);
    
} catch (FNEException $e) {
    // Autre erreur FNE
    return response()->json([
        'success' => false,
        'error' => 'fne_error',
        'message' => $e->getMessage(),
    ], $e->getStatusCode());
    
} catch (\\Exception $e) {
    // Erreur inattendue
    Log::error('Erreur inattendue FNE', [
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
    ]);
    
    return response()->json([
        'success' => false,
        'error' => 'unexpected_error',
        'message' => 'Une erreur inattendue est survenue.',
    ], 500);
}`

const errorFormatCode = `try {
    $result = FNE::invoice()->sign($data);
} catch (FNEException $e) {
    $errorArray = $e->toArray();
    
    /*
    [
        'message' => 'Message d'erreur traduit',
        'error' => 'error_code',
        'status_code' => 422,
        'errors' => [...], // Erreurs détaillées (si disponible)
        'meta' => [
            'timestamp' => '2025-01-14T16:59:11.016Z',
            'request_id' => 'req_1234567890',
        ],
    ]
    */
}`

const localizedMessagesCode = `// Configuration dans config/fne.php
'locale' => 'fr', // ou 'en'

// Les messages d'erreur seront en français ou anglais selon la configuration
try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    echo $e->getMessage(); // Message en français si locale = 'fr'
}`

const errorLoggingCode = `// Les erreurs sont automatiquement loggées via le logger configuré
try {
    $result = FNE::invoice()->sign($data);
} catch (FNEException $e) {
    // L'erreur a déjà été loggée automatiquement
    // Vous pouvez également logger manuellement si nécessaire
    Log::error('Erreur FNE', [
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
        break; // Succès
    } catch (ServerException $e) {
        $retryCount++;
        
        if ($retryCount >= $maxRetries) {
            throw $e; // Échec après tous les essais
        }
        
        // Attendre avant de réessayer (backoff exponentiel)
        sleep(pow(2, $retryCount));
    }
}`

const headings = ref([
  { id: 'error-handling', text: 'Gestion des erreurs', depth: 1 },
  { id: 'overview', text: 'Vue d\'ensemble', depth: 2 },
  { id: 'exception-hierarchy', text: 'Hiérarchie des exceptions', depth: 2 },
  { id: 'exception-types', text: 'Types d\'exceptions', depth: 2 },
  { id: 'validation-exception', text: 'ValidationException', depth: 3 },
  { id: 'authentication-exception', text: 'AuthenticationException', depth: 3 },
  { id: 'bad-request-exception', text: 'BadRequestException', depth: 3 },
  { id: 'not-found-exception', text: 'NotFoundException', depth: 3 },
  { id: 'server-exception', text: 'ServerException', depth: 3 },
  { id: 'mapping-exception', text: 'MappingException', depth: 3 },
  { id: 'complete-handling', text: 'Gestion complète des erreurs', depth: 2 },
  { id: 'complete-example', text: 'Exemple complet', depth: 3 },
  { id: 'error-format', text: 'Format des erreurs', depth: 2 },
  { id: 'localized-messages', text: 'Messages d\'erreur localisés', depth: 2 },
  { id: 'error-logging', text: 'Logging des erreurs', depth: 2 },
  { id: 'auto-retry', text: 'Retry automatique', depth: 2 },
  { id: 'best-practices', text: 'Bonnes pratiques', depth: 2 },
  { id: 'next-steps', text: 'Prochaines étapes', depth: 2 },
])

const { setPrevPage, setNextPage, setHeadings } = useDocsPage()
setPrevPage(null)
setNextPage(null)
setHeadings(headings)
</script>

