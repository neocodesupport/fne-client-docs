---
title: Enums
description: Complete reference for available enums in FNE Client
---

# Enums

FNE Client uses PHP 8.2+ enums to ensure type safety.

## InvoiceType

Invoice types.

```php
use Neocode\FNE\Enums\InvoiceType;

InvoiceType::SALE->value      // 'sale' - Sales invoice
InvoiceType::PURCHASE->value  // 'purchase' - Purchase slip
```

## PaymentMethod

Payment methods.

```php
use Neocode\FNE\Enums\PaymentMethod;

PaymentMethod::CASH->value           // 'cash'
PaymentMethod::CARD->value           // 'card'
PaymentMethod::CHECK->value          // 'check'
PaymentMethod::MOBILE_MONEY->value  // 'mobile-money'
PaymentMethod::TRANSFER->value       // 'transfer'
PaymentMethod::DEFERRED->value       // 'deferred'
```

## InvoiceTemplate

Invoice templates.

```php
use Neocode\FNE\Enums\InvoiceTemplate;

InvoiceTemplate::B2C->value  // 'B2C' - Business to Consumer
InvoiceTemplate::B2B->value  // 'B2B' - Business to Business
InvoiceTemplate::B2F->value  // 'B2F' - Business to Foreign
InvoiceTemplate::B2G->value  // 'B2G' - Business to Government
```

## TaxType

Tax types.

```php
use Neocode\FNE\Enums\TaxType;

TaxType::TVA->value   // 'TVA' - Standard VAT 18%
TaxType::TVAB->value  // 'TVAB' - Reduced VAT 9%
TaxType::TVAC->value  // 'TVAC' - Exempt VAT (convention) 0%
TaxType::TVAD->value  // 'TVAD' - Exempt VAT (legal) 0%
```

## ForeignCurrency

Supported foreign currencies.

```php
use Neocode\FNE\Enums\ForeignCurrency;

ForeignCurrency::XOF->value  // 'XOF' - CFA Franc
ForeignCurrency::USD->value  // 'USD' - US Dollar
ForeignCurrency::EUR->value  // 'EUR' - Euro
// ... other currencies
```

## Usage

```php
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;
use Neocode\FNE\Enums\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'taxes' => TaxType::TVA->value,
]);
```

## See Also

- [DTOs](/docs/api-reference/dtos) - DTOs reference

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
