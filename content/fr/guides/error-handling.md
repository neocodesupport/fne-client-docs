---
title: Gestion des erreurs
description: Guide complet pour gérer les erreurs avec FNE Client
---

# Gestion des erreurs

Ce guide vous montre comment gérer les erreurs avec FNE Client de manière efficace.

## Vue d'ensemble

FNE Client utilise des exceptions typées pour gérer les erreurs. Chaque type d'erreur a sa propre exception, ce qui facilite la gestion et le débogage.

## Hiérarchie des exceptions

```
FNEException (abstraite)
├── ValidationException (422)
├── MappingException (500)
├── AuthenticationException (401)
├── BadRequestException (400)
├── NotFoundException (404)
└── ServerException (500+)
```

## Types d'exceptions

### ValidationException

Lancée lorsque les données fournies sont invalides :

```php
use Neocode\FNE\Exceptions\ValidationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Erreur de validation
    echo "Erreur de validation : " . $e->getMessage();
    echo "Code d'erreur : " . $e->getErrorCode();
    echo "Erreurs détaillées : ";
    print_r($e->getErrors());
}
```

### AuthenticationException

Lancée lorsque l'authentification échoue (clé API invalide) :

```php
use Neocode\FNE\Exceptions\AuthenticationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (AuthenticationException $e) {
    // Erreur d'authentification
    echo "Erreur d'authentification : " . $e->getMessage();
    echo "Vérifiez votre clé API";
}
```

### BadRequestException

Lancée lorsque la requête est mal formée (400) :

```php
use Neocode\FNE\Exceptions\BadRequestException;

try {
    $result = FNE::invoice()->sign($data);
} catch (BadRequestException $e) {
    // Erreur dans la requête
    echo "Erreur de requête : " . $e->getMessage();
    echo "Code HTTP : " . $e->getStatusCode();
}
```

### NotFoundException

Lancée lorsque la ressource n'est pas trouvée (404) :

```php
use Neocode\FNE\Exceptions\NotFoundException;

try {
    $result = FNE::refund()->issue($invoiceId, $items);
} catch (NotFoundException $e) {
    // Facture non trouvée
    echo "Facture non trouvée : " . $e->getMessage();
}
```

### ServerException

Lancée lorsque le serveur rencontre une erreur (500+) :

```php
use Neocode\FNE\Exceptions\ServerException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ServerException $e) {
    // Erreur serveur
    echo "Erreur serveur : " . $e->getMessage();
    echo "Réessayez plus tard";
}
```

### MappingException

Lancée lorsque le mapping des données échoue :

```php
use Neocode\FNE\Exceptions\MappingException;

try {
    $result = FNE::invoice()->sign($data);
} catch (MappingException $e) {
    // Erreur de mapping
    echo "Erreur de mapping : " . $e->getMessage();
}
```

## Gestion complète des erreurs

### Exemple complet

```php
use Neocode\FNE\Exceptions\ValidationException;
use Neocode\FNE\Exceptions\AuthenticationException;
use Neocode\FNE\Exceptions\BadRequestException;
use Neocode\FNE\Exceptions\NotFoundException;
use Neocode\FNE\Exceptions\ServerException;
use Neocode\FNE\Exceptions\MappingException;
use Neocode\FNE\Exceptions\FNEException;

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
    
} catch (\Exception $e) {
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
}
```

## Format des erreurs

Toutes les exceptions FNE implémentent une méthode `toArray()` pour obtenir un format standardisé :

```php
try {
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
}
```

## Messages d'erreur localisés

Les messages d'erreur sont automatiquement localisés selon la configuration :

```php
// Configuration dans config/fne.php
'locale' => 'fr', // ou 'en'

// Les messages d'erreur seront en français ou anglais selon la configuration
try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    echo $e->getMessage(); // Message en français si locale = 'fr'
}
```

## Logging des erreurs

FNE Client enregistre automatiquement les erreurs si un logger est configuré :

```php
// Les erreurs sont automatiquement loggées via le logger configuré
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
}
```

## Retry automatique

Pour les erreurs serveur temporaires, vous pouvez implémenter un retry :

```php
use Neocode\FNE\Exceptions\ServerException;

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
}
```

## Bonnes pratiques

1. **Toujours gérer les exceptions** : Ne laissez jamais les exceptions FNE non gérées
2. **Utiliser les types spécifiques** : Utilisez les exceptions spécifiques plutôt que `FNEException` générique
3. **Logger les erreurs** : Enregistrez les erreurs pour le débogage
4. **Messages utilisateur** : Affichez des messages utilisateur conviviaux plutôt que les messages techniques
5. **Retry pour erreurs serveur** : Implémentez un retry pour les erreurs serveur temporaires

## Prochaines étapes

- [Cache](/fr/docs/guides/cache) - Utilisez le cache pour améliorer les performances
- [Logging](/fr/docs/guides/logging) - Configurez le logging pour le débogage
- [Exemples](/fr/docs/examples) - Consultez plus d'exemples de gestion d'erreurs

> [!info]
> **Besoin d'aide ?** Consultez la [documentation complète](/fr/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.
