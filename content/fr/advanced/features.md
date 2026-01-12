---
title: Features (Laravel Pennant)
description: Guide pour utiliser les features Laravel Pennant avec FNE Client
order: 1
---

# Features (Laravel Pennant)

FNE Client utilise Laravel Pennant pour gérer les modules de manière modulaire.

## Vue d'ensemble

Le système de features permet d'activer/désactiver des fonctionnalités de manière flexible.

## Configuration

```php
// config/fne.php
'features' => [
    'enabled' => true,
    'advanced_mapping' => true,
    'batch_processing' => false,
    'webhooks' => false,
],
```

## Utilisation

```php
use Laravel\Pennant\Feature;

if (Feature::active('fne:advanced-mapping')) {
    // Utiliser le mapping avancé
}
```

## Voir aussi

- **[Configuration avancée](/docs/advanced/advanced-config)** - Configuration détaillée

---

**Besoin d'aide ?** Consultez la [documentation complète](/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.



