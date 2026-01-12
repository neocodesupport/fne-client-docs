---
title: Purchase Slips
description: Complete guide for certifying purchase slips with FNE Client
---

# Purchase Slips

This guide shows you how to certify purchase slips (agricultural product purchase invoices) with FNE Client.

## Overview

A purchase slip is a document issued when purchasing agricultural products. Unlike sales invoices, purchase slips do not require taxes.

## Basic Structure

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
    'clientCompanyName' => 'Agricultural Supplier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'supplier@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Rice 50kg',
            'quantity' => 10,
            'amount' => 50000.0, // Unit price excluding tax in cents (500.00 FCFA)
            'measurementUnit' => 'kg',
        ],
        [
            'description' => 'Corn 25kg',
            'quantity' => 20,
            'amount' => 25000.0, // Unit price excluding tax in cents (250.00 FCFA)
            'measurementUnit' => 'kg',
        ],
    ],
]);
```

## Differences from Sales Invoices

Purchase slips have several important differences:

1. **No taxes**: Purchase slips do not require taxes (`taxes` is not required)
2. **Invoice type**: Use `InvoiceType::PURCHASE->value` instead of `InvoiceType::SALE->value`
3. **Service**: Use `FNE::purchase()->submit()` instead of `FNE::invoice()->sign()`

## Measurement Units

You can specify the measurement unit for each item:

```php
'items' => [
    [
        'description' => 'Rice',
        'quantity' => 10,
        'amount' => 50000.0,
        'measurementUnit' => 'kg', // Measurement unit
    ],
    [
        'description' => 'Oil bottles',
        'quantity' => 50,
        'amount' => 2000.0,
        'measurementUnit' => 'pcs', // Pieces
    ],
],
```

## Discounts

As with sales invoices, you can apply discounts:

### Global Discount

```php
$result = FNE::purchase()->submit([
    // ... other fields ...
    'discount' => 5.0, // Global discount of 5%
]);
```

### Item Discount

```php
$result = FNE::purchase()->submit([
    // ... other fields ...
    'items' => [
        [
            'description' => 'Rice',
            'quantity' => 10,
            'amount' => 50000.0,
            'discount' => 10.0, // 10% discount on this item
            'measurementUnit' => 'kg',
        ],
    ],
]);
```

## RNE (Normal Business Regime)

If your company is in RNE:

```php
$result = FNE::purchase()->submit([
    // ... other fields ...
    'isRne' => true,
    'rne' => 'RNE123456789', // Required if isRne = true
]);
```

## Response Handling

The response has the same structure as for sales invoices:

```php
$result = FNE::purchase()->submit($data);

// Base properties
echo $result->ncc;
echo $result->reference;
echo $result->token;
echo $result->balanceSticker;

// Purchase slip information
if ($result->invoice) {
    $purchase = $result->invoice;
    
    // FNE UUID (IMPORTANT for future refunds)
    echo $purchase->id;
    
    // Total amount (in cents)
    $total = $purchase->amount / 100;
    
    // Items
    foreach ($purchase->items as $item) {
        echo $item->id;          // UUID of the item
        echo $item->description;
        echo $item->quantity;
        echo $item->measurementUnit;
    }
}
```

## Model Integration

Use the `CertifiablePurchase` trait:

```php
use Neocode\FNE\Concerns\CertifiablePurchase;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use CertifiablePurchase;
}

// Usage
$purchase = Purchase::find(1);
$result = $purchase->submit(); // Automatically extracts data
```

## Next Steps

- [Refunds](/docs/guides/refunds) - Create refunds for your purchase slips
- [ERP → FNE Mapping](/docs/guides/mapping) - Transform your ERP data to FNE
- [Error Handling](/docs/guides/error-handling) - Handle errors efficiently

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
