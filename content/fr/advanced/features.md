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
    'certification_table' => env('FNE_FEATURE_CERTIFICATION_TABLE', false),
],
```

## Utilisation

```php
use Laravel\Pennant\Feature;

if (Feature::active('fne:advanced-mapping')) {
    // Utiliser le mapping avancé
}
```

## Feature : certification-table

Cette feature active l'enregistrement automatique des certifications dans la table `fne_certifications`.

### Activation

```php
use Laravel\Pennant\Feature;

Feature::for($user)->activate('fne:certification-table');
```

### Utilisation

```php
if (Feature::active('fne:certification-table')) {
    // L'enregistrement automatique est activé
}
```

Pour plus d'informations, consultez le guide [Enregistrement automatique des certifications](/docs/guides/certification-storage).

## Voir aussi

- **[Configuration avancée](/docs/advanced/advanced-config)** - Configuration détaillée

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



