---
title: Advanced Examples
description: Advanced code examples with FNE Client
---

# Advanced Examples

This page contains advanced code examples for complex use cases.

## Invoice with Custom Taxes

```php
$result = FNE::invoice()->sign([
    // ... base fields ...
    'items' => [
        [
            'description' => 'Product with custom taxes',
            'quantity' => 1,
            'amount' => 10000.0,
            'taxes' => [TaxType::TVA->value],
            'customTaxes' => [
                [
                    'name' => 'GRA',
                    'amount' => 2.5, // 2.5%
                ],
                [
                    'name' => 'AIRSI',
                    'amount' => 1.0, // 1%
                ],
            ],
        ],
    ],
    'customTaxes' => [
        [
            'name' => 'DTD',
            'amount' => 5.0, // 5% at invoice level
        ],
    ],
]);
```

## B2F Invoice with Foreign Currency

```php
use Neocode\FNE\Enums\ForeignCurrency;

$result = FNE::invoice()->sign([
    // ... base fields ...
    'template' => InvoiceTemplate::B2F->value,
    'foreignCurrency' => ForeignCurrency::EUR->value,
    'foreignCurrencyRate' => 655.0, // Exchange rate
    // ...
]);
```

## Invoice with Discounts

```php
$result = FNE::invoice()->sign([
    // ... base fields ...
    'discount' => 10.0, // Global discount of 10%
    'items' => [
        [
            'description' => 'Product with discount',
            'quantity' => 2,
            'amount' => 5000.0,
            'discount' => 15.0, // 15% discount on this item
            'taxes' => [TaxType::TVA->value],
        ],
    ],
]);
```

## Model Integration

```php
use Neocode\FNE\Concerns\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Usage
$invoice = Invoice::find(1);
$result = $invoice->certify(); // Automatically extracts data
```

## Complete Error Handling

```php
use Neocode\FNE\Exceptions\ValidationException;
use Neocode\FNE\Exceptions\AuthenticationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Handle validation error
} catch (AuthenticationException $e) {
    // Handle authentication error
}
```

## Next Steps

- [Real Use Cases](/docs/examples/use-cases) - See real-world use case examples
- [Guides](/docs/guides) - Learn advanced features

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
