---
title: Configuration
description: Configuration guide for FNE Client for your environment
order: 3
---

# Configuration

Once FNE Client is installed, you need to configure it for your environment. Configuration can be done via environment variables or a configuration file.

## Environment Variables

### Main Variables

```env
# FNE API Key (required)
FNE_API_KEY=your-api-key-here

# FNE API base URL
FNE_BASE_URL=http://54.247.95.108/ws

# Execution mode (test or production)
FNE_MODE=test

# HTTP request timeout (in seconds)
FNE_TIMEOUT=30

# Cache
FNE_CACHE_ENABLED=true
FNE_CACHE_TTL=3600

# Locale for error messages (fr, en)
FNE_LOCALE=en
```

### Optional Variables

```env
# Custom mapping (see Mapping section)
FNE_MAPPING_ENABLED=true

# Laravel Pennant features (Laravel only)
FNE_FEATURES_ENABLED=true
FNE_FEATURE_ADVANCED_MAPPING=true
FNE_FEATURE_BATCH_PROCESSING=false
FNE_FEATURE_WEBHOOKS=false
```

## Configuration File

### Laravel

The `config/fne.php` file is published during installation:

```php
return [
    // API Configuration
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
    'locale' => env('FNE_LOCALE', 'en'),
    
    // Custom ERP → FNE mapping
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
    
    // Laravel Pennant features (Laravel only)
    'features' => [
        'enabled' => env('FNE_FEATURES_ENABLED', true),
        'advanced_mapping' => env('FNE_FEATURE_ADVANCED_MAPPING', true),
        'batch_processing' => env('FNE_FEATURE_BATCH_PROCESSING', false),
        'webhooks' => env('FNE_FEATURE_WEBHOOKS', false),
    ],
];
```

### Symfony

For Symfony, configuration is done in `config/packages/fne.yaml`:

```yaml
fne:
    api_key: '%env(FNE_API_KEY)%'
    base_url: '%env(default:FNE_BASE_URL:http://54.247.95.108/ws)%'
    mode: '%env(default:FNE_MODE:test)%'
    timeout: '%env(int:default:FNE_TIMEOUT:30)%'
    
    cache:
        enabled: '%env(bool:default:FNE_CACHE_ENABLED:true)%'
        ttl: '%env(int:default:FNE_CACHE_TTL:3600)%'
    
    locale: '%env(default:FNE_LOCALE:en)%'
    
    mapping:
        invoice:
            clientCompanyName: 'customer.name'
            clientPhone: 'customer.phone'
```

### Native PHP

For native PHP, create a `fne.php` file at the root:

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
    
    'locale' => getenv('FNE_LOCALE') ?: 'en',
];
```

## Custom Mapping Configuration

Custom mapping allows you to transform your ERP data structures to FNE format. See the [ERP → FNE Mapping](/docs/guides/mapping) section for more details.

## Cache Configuration

### Laravel

Cache automatically uses the Laravel cache system:

```php
// config/fne.php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // 1 hour
],
```

### Symfony

For Symfony, you can use the Symfony cache:

```yaml
# config/packages/fne.yaml
fne:
    cache:
        enabled: true
        ttl: 3600
```

### Native PHP

For native PHP, an in-memory cache is used by default. You can implement your own cache by implementing `CacheInterface`.

## Logging Configuration

### Laravel

Logging automatically uses the Laravel logging system:

```php
// Logs are automatically recorded via Log::info(), Log::error(), etc.
```

### Symfony

For Symfony, use Monolog:

```yaml
# config/packages/fne.yaml
services:
    Neocode\FNE\Contracts\LoggerInterface:
        alias: logger
```

### Native PHP

For native PHP, you can implement your own logger by implementing `LoggerInterface`.

## Configuration Verification

### Laravel

```php
use Neocode\FNE\Facades\FNE;

$config = FNE::getConfig();
echo $config->getApiKey(); // Displays your API key
echo $config->getBaseUrl(); // Displays the base URL
echo $config->getMode(); // Displays the mode (test/production)
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

## Next Steps

Once configuration is complete:

1. [Quick Start](/docs/getting-started/quick-start) - Create your first certified invoice
2. [Guides](/docs/guides) - Learn how to use the different features

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
