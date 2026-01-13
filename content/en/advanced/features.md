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
],
```

## Usage

```php
use Laravel\Pennant\Feature;

if (Feature::active('fne:advanced-mapping')) {
    // Use advanced mapping
}
```

## See Also

- [Advanced Configuration](/docs/getting-started/configuration) - Detailed configuration

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
