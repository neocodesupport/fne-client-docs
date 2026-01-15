---
title: CertificationStorage
description: Class for managing automatic certification storage
order: 7
---

# CertificationStorage

The `CertificationStorage` class manages automatic storage of certifications in the `fne_certifications` table.

## Methods

### save()

Stores a certification in the `fne_certifications` table.

```php
use Neocode\FNE\Storage\CertificationStorage;
use Neocode\FNE\DTOs\ResponseDTO;

$success = CertificationStorage::save($response, $invoiceData);
```

**Parameters:**
- `ResponseDTO $response` : Certification response
- `array $invoiceData` : Original invoice data

**Returns:** `bool` - `true` if stored successfully, `false` otherwise

## Compatibility

- **Laravel** : Uses Eloquent Model
- **Symfony** : Uses Doctrine EntityManager or DBAL Connection
- **Native PHP** : Uses PDO directly

## Automatic Detection

The class automatically detects the framework used and uses the appropriate method:

```php
// Laravel
if (self::isLaravel()) {
    return self::saveLaravel($response, $invoiceData);
}

// Symfony
if (self::isSymfony()) {
    return self::saveSymfony($response, $invoiceData);
}

// Native PHP
return self::saveNativePHP($response, $invoiceData);
```

## Error Handling

If storage fails, the method returns `false` and the error is logged. Certification continues normally.

## See Also

- **[Automatic Certification Storage](/docs/guides/certification-storage)** - Complete guide
- **[FNECertification Model](/docs/api-reference/fne-certification-model)** - Eloquent Model

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
