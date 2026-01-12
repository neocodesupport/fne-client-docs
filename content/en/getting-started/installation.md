---
title: Installation
description: Installation guide for FNE Client for Laravel, Symfony and native PHP
order: 2
---

# Installation

FNE Client can be installed in your PHP project in just a few minutes, regardless of your framework.

## Prerequisites

- PHP 8.2 or higher
- Composer 2.0 or higher
- Laravel 11+ (if using Laravel)
- Symfony 7.4+ (if using Symfony)

## Installation

### Laravel 11+

```bash
composer require neocode/fne-client
php artisan fne:install
```

The `fne:install` command launches an interactive wizard that:

- Automatically detects your Laravel environment
- Configures settings via interactive prompts
- Publishes configuration files
- Offers to install migrations (optional)

### Symfony 7.4+

```bash
composer require neocode/fne-client
php bin/console fne:install
```

The `fne:install` command automatically configures:

- Services in `config/services.yaml`
- Parameters in `.env`
- Migrations (optional)

### Native PHP

```bash
composer require neocode/fne-client
php vendor/bin/fne-install
```

The installation creates a configuration file `fne.php` at the root of your project.

## Configuration

### Environment Variables

Add these variables to your `.env` file:

```env
FNE_API_KEY=your-api-key
FNE_BASE_URL=https://fne-api-mock.test
FNE_MODE=test
FNE_TIMEOUT=30
FNE_CACHE_ENABLED=true
FNE_CACHE_TTL=3600
FNE_LOCALE=en
```

### Configuration File (Laravel)

The `config/fne.php` file is published during installation:

```php
return [
    'api_key' => env('FNE_API_KEY'),
    'base_url' => env('FNE_BASE_URL', 'https://fne-api-mock.test'),
    'mode' => env('FNE_MODE', 'test'),
    'timeout' => env('FNE_TIMEOUT', 30),
    
    'cache_enabled' => env('FNE_CACHE_ENABLED', true),
    'cache_ttl' => env('FNE_CACHE_TTL', 3600),
    
    'locale' => env('FNE_LOCALE', 'en'),
];
```

## Verifying Installation

### Laravel

```php
use Neocode\FNE\Facades\FNE;

// Verify that the client is available
$config = FNE::getConfig();
echo $config->getApiKey(); // Displays your API key
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

### Native PHP

```php
require_once 'vendor/autoload.php';

use Neocode\FNE\FNEClient;
use Neocode\FNE\Config\FNEConfig;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'https://fne-api-mock.test',
    'mode' => 'test',
]);

$fne = new FNEClient(/* ... */);
```

## Next Steps

Once installation is complete:

1. [Configuration](/docs/getting-started/configuration) - Configure the SDK for your environment
2. [Quick Start](/docs/getting-started/quick-start) - Create your first certified invoice

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
