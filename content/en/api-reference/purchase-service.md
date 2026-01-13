---
title: PurchaseService
description: API reference for the purchase slip service
---

# PurchaseService

The `PurchaseService` service handles purchase slip certification.

## Methods

### submit()

Certifies a purchase slip.

```php
public function submit(?array $data = null): ResponseDTO
```

**Parameters:**

- `$data` (array|null): Purchase slip data (optional if data is defined via context)

**Returns:** `ResponseDTO`

### Example:

```php
use Neocode\FNE\Facades\FNE;
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;

$result = FNE::purchase()->submit([
    'invoiceType' => InvoiceType::PURCHASE->value,
    'paymentMethod' => PaymentMethod::CASH->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Supplier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'supplier@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Rice 50kg',
            'quantity' => 10,
            'amount' => 50000.0,
            'measurementUnit' => 'kg',
        ],
    ],
]);
```

## See Also

- [Guide - Purchase Slips](/docs/guides/purchases)

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
