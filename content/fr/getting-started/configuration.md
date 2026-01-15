---
title: Configuration
description: Guide de configuration de FNE Client pour votre environnement
order: 3
---

# Configuration

Une fois FNE Client installé, vous devez le configurer pour votre environnement. La configuration peut se faire via des variables d'environnement ou un fichier de configuration.

## Variables d'environnement

### Variables principales

```env
# Clé API FNE (obligatoire)
FNE_API_KEY=your-api-key-here

# URL de base de l'API FNE
FNE_BASE_URL=http://54.247.95.108/ws

# Mode d'exécution (test ou production)
FNE_MODE=test

# Timeout des requêtes HTTP (en secondes)
FNE_TIMEOUT=30

# Cache
FNE_CACHE_ENABLED=true
FNE_CACHE_TTL=3600

# Locale pour les messages d'erreur (fr, en)
FNE_LOCALE=fr
```

### Variables optionnelles

```env
# Mapping personnalisé (voir section Mapping)
FNE_MAPPING_ENABLED=true

# Features Laravel Pennant (Laravel uniquement)
FNE_FEATURES_ENABLED=true
FNE_FEATURE_ADVANCED_MAPPING=true
FNE_FEATURE_BATCH_PROCESSING=false
FNE_FEATURE_WEBHOOKS=false
FNE_FEATURE_CERTIFICATION_TABLE=false  # Activer l'enregistrement automatique
```

## Fichier de configuration

### Laravel

Le fichier `config/fne.php` est publié lors de l'installation :

```php
return [
    // Configuration API
    'api_key' => env('FNE_API_KEY'),
    'base_url' => env('FNE_BASE_URL', 'http://54.247.95.108/ws'),
    'mode' => env('FNE_MODE', 'test'),
    'timeout' => env('FNE_TIMEOUT', 30),
    
    // Cache
    'cache' => [
        'enabled' => env('FNE_CACHE_ENABLED', true),
        'ttl' => env('FNE_CACHE_TTL', 3600),
    ],
    
    // Locale
    'locale' => env('FNE_LOCALE', 'fr'),
    
    // Mapping personnalisé ERP → FNE
    'mapping' => [
        'invoice' => [
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone',
            'clientEmail' => 'customer.email',
            'pointOfSale' => 'pos.code',
            'establishment' => 'establishment.code',
        ],
        'purchase' => [
            'clientCompanyName' => 'supplier.name',
            'clientPhone' => 'supplier.phone',
        ],
    ],
    
    // Features Laravel Pennant (Laravel uniquement)
    'features' => [
        'enabled' => env('FNE_FEATURES_ENABLED', true),
        'advanced_mapping' => env('FNE_FEATURE_ADVANCED_MAPPING', true),
        'batch_processing' => env('FNE_FEATURE_BATCH_PROCESSING', false),
        'webhooks' => env('FNE_FEATURE_WEBHOOKS', false),
        'certification_table' => env('FNE_FEATURE_CERTIFICATION_TABLE', false),
    ],
];
```

### Symfony

Pour Symfony, la configuration se fait dans `config/packages/fne.yaml` :

```yaml
fne:
    api_key: '%env(FNE_API_KEY)%'
    base_url: '%env(default:FNE_BASE_URL:http://54.247.95.108/ws)%'
    mode: '%env(default:FNE_MODE:test)%'
    timeout: '%env(int:default:FNE_TIMEOUT:30)%'
    
    cache:
        enabled: '%env(bool:default:FNE_CACHE_ENABLED:true)%'
        ttl: '%env(int:default:FNE_CACHE_TTL:3600)%'
    
    locale: '%env(default:FNE_LOCALE:fr)%'
    
    mapping:
        invoice:
            clientCompanyName: 'customer.name'
            clientPhone: 'customer.phone'
```

### PHP Natif

Pour PHP natif, créez un fichier `fne.php` à la racine :

```php
<?php

return [
    'api_key' => getenv('FNE_API_KEY') ?: 'your-api-key',
    'base_url' => getenv('FNE_BASE_URL') ?: 'http://54.247.95.108/ws',
    'mode' => getenv('FNE_MODE') ?: 'test',
    'timeout' => (int) (getenv('FNE_TIMEOUT') ?: 30),
    
    'cache' => [
        'enabled' => filter_var(getenv('FNE_CACHE_ENABLED') ?: true, FILTER_VALIDATE_BOOLEAN),
        'ttl' => (int) (getenv('FNE_CACHE_TTL') ?: 3600),
    ],
    
    'locale' => getenv('FNE_LOCALE') ?: 'fr',
];
```

## Configuration du mapping personnalisé

Le mapping personnalisé permet de transformer vos structures de données ERP vers le format FNE. Voir la section [Mapping ERP → FNE](/fr/docs/guides/mapping) pour plus de détails.

## Configuration du cache

### Laravel

Le cache utilise automatiquement le système de cache Laravel :

```php
// config/fne.php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // 1 heure
],
```

### Symfony

Pour Symfony, vous pouvez utiliser le cache Symfony :

```yaml
# config/packages/fne.yaml
fne:
    cache:
        enabled: true
        ttl: 3600
```

### PHP Natif

Pour PHP natif, un cache en mémoire est utilisé par défaut. Vous pouvez implémenter votre propre cache en implémentant `CacheInterface`.

## Configuration du logging

### Laravel

Le logging utilise automatiquement le système de logging Laravel :

```php
// Les logs sont automatiquement enregistrés via Log::info(), Log::error(), etc.
```

### Symfony

Pour Symfony, utilisez Monolog :

```yaml
# config/packages/fne.yaml
services:
    Neocode\FNE\Contracts\LoggerInterface:
        alias: logger
```

### PHP Natif

Pour PHP natif, vous pouvez implémenter votre propre logger en implémentant `LoggerInterface`.

## Vérification de la configuration

### Laravel

```php
use Neocode\FNE\Facades\FNE;

$config = FNE::getConfig();
echo $config->getApiKey(); // Affiche votre clé API
echo $config->getBaseUrl(); // Affiche l'URL de base
echo $config->getMode(); // Affiche le mode (test/production)
```

### Symfony

```php
use Neocode\FNE\FNEClient;

class TestController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}
    
    public function test()
    {
        $config = $this->fneClient->getConfig();
        // ...
    }
}
```

## Prochaines étapes

Une fois la configuration terminée :

1. [Démarrage rapide](/fr/docs/getting-started/quick-start) - Créez votre première facture certifiée
2. [Guides](/fr/docs/guides) - Apprenez à utiliser les différentes fonctionnalités

> [!info]
> **Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.
