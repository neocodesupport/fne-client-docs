---
title: Features (Laravel Pennant)
description: Guide for using Laravel Pennant features with FNE Client
---

# Features (Laravel Pennant)

FNE Client uses Laravel Pennant to manage modules in a modular way.

## Overview

The features system allows enabling/disabling functionality flexibly.

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

## Usage

```php
use Laravel\Pennant\Feature;

if (Feature::active('fne:advanced-mapping')) {
    // Use advanced mapping
}
```

## Feature: certification-table

This feature enables automatic storage of certifications in the `fne_certifications` table.

### Activation

```php
use Laravel\Pennant\Feature;

Feature::for($user)->activate('fne:certification-table');
```

### Usage

```php
if (Feature::active('fne:certification-table')) {
    // Automatic storage is enabled
}
```

For more information, see the [Automatic Certification Storage](/docs/guides/certification-storage) guide.

## See Also

- [Advanced Configuration](/docs/getting-started/configuration) - Detailed configuration

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
