---
title: Installation
description: Guide d'installation de FNE Client pour Laravel, Symfony et PHP natif
order: 2
---

# Installation

FNE Client peut être installé dans votre projet PHP en quelques minutes, quel que soit votre framework.

## Prérequis

- PHP 8.2 ou supérieur
- Composer 2.0 ou supérieur
- Laravel 11+ (si vous utilisez Laravel)
- Symfony 7.4+ (si vous utilisez Symfony)

## Installation

### Laravel 11+

```bash
composer require neocode/fne-client
php artisan fne:install
```

La commande `fne:install` lance un assistant interactif qui :

- Détecte automatiquement votre environnement Laravel
- Configure les paramètres via des prompts interactifs
- Publie les fichiers de configuration
- Propose l'installation des migrations (optionnel)

### Symfony 7.4+

```bash
composer require neocode/fne-client
php bin/console fne:install
```

La commande `fne:install` configure automatiquement :

- Les services dans `config/services.yaml`
- Les paramètres dans `.env`
- Les migrations (optionnel)

### PHP Natif

```bash
composer require neocode/fne-client
php vendor/bin/fne-install
```

L'installation crée un fichier de configuration `fne.php` à la racine de votre projet.

## Configuration

### Variables d'environnement

Ajoutez ces variables dans votre fichier `.env` :

```env
FNE_API_KEY=your-api-key
FNE_BASE_URL=https://fne-api-mock.test
FNE_MODE=test
FNE_TIMEOUT=30
FNE_CACHE_ENABLED=true
FNE_CACHE_TTL=3600
FNE_LOCALE=fr
```

### Fichier de configuration (Laravel)

Le fichier `config/fne.php` est publié lors de l'installation :

```php
return [
    'api_key' => env('FNE_API_KEY'),
    'base_url' => env('FNE_BASE_URL', 'https://fne-api-mock.test'),
    'mode' => env('FNE_MODE', 'test'),
    'timeout' => env('FNE_TIMEOUT', 30),
    
    'cache_enabled' => env('FNE_CACHE_ENABLED', true),
    'cache_ttl' => env('FNE_CACHE_TTL', 3600),
    
    'locale' => env('FNE_LOCALE', 'fr'),
];
```

## Vérification de l'installation

### Laravel

```php
use Neocode\FNE\Facades\FNE;

// Vérifier que le client est disponible
$config = FNE::getConfig();
echo $config->getApiKey(); // Affiche votre clé API
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

### PHP Natif

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

## Prochaines étapes

Une fois l'installation terminée :

1. [Configuration](/fr/docs/getting-started/configuration) - Configurez le SDK pour votre environnement
2. [Démarrage rapide](/fr/docs/getting-started/quick-start) - Créez votre première facture certifiée

> [!info]
> **Besoin d'aide ?** Consultez la [documentation complète](/fr/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.
