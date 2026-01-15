---
title: Sales Invoices
description: Complete guide for certifying sales invoices with FNE Client
---

# Sales Invoices

This guide shows you how to certify sales invoices with FNE Client.

## Overview

A sales invoice is a commercial document issued by a company for a sales transaction. FNE Client allows you to certify these invoices with the FNE API.

## Template Types

FNE Client supports 4 types of invoice templates:

- **B2C** (Business to Consumer): Invoice for an individual client
- **B2B** (Business to Business): Invoice for a business (requires `clientNcc`)
- **B2F** (Business to Foreign): Invoice for an international client (may require foreign currency)
- **B2G** (Business to Government): Invoice for a government institution

## Basic Structure

### B2C Example

```php
use Neocode\FNE\Facades\FNE;
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;
use Neocode\FNE\Enums\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Individual Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Product 1',
            'quantity' => 2,
            'amount' => 5000.0, // Unit price excluding tax in cents
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

### B2B Example

For a B2B invoice, the `clientNcc` is required:

```php
$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value,
    'isRne' => false,
    'clientNcc' => '123456789', // Required for B2B
    'clientCompanyName' => 'Business Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Professional Service',
            'quantity' => 1,
            'amount' => 100000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

### B2F Example with Foreign Currency

For a B2F invoice with foreign currency:

```php
use Neocode\FNE\Enums\ForeignCurrency;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::TRANSFER->value,
    'template' => InvoiceTemplate::B2F->value,
    'isRne' => false,
    'clientCompanyName' => 'International Client',
    'clientPhone' => '+33123456789',
    'clientEmail' => 'client@international.com',
    'foreignCurrency' => ForeignCurrency::EUR->value,
    'foreignCurrencyRate' => 655.0, // Exchange rate
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'International Service',
            'quantity' => 1,
            'amount' => 100000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

## Payment Methods

FNE Client supports the following payment methods:

- `cash`: Cash payment
- `card`: Bank card payment
- `check`: Check payment
- `mobile-money`: Mobile money payment
- `transfer`: Bank transfer payment
- `deferred`: Deferred payment

## Tax Types

Supported tax types:

- `TVA`: Standard VAT of 18%
- `TVAB`: Reduced VAT of 9%
- `TVAC`: Exempt VAT (convention) 0%
- `TVAD`: Exempt VAT (legal) 0% for TEE and RME

## Custom Taxes

You can add custom taxes at invoice or item level:

### Custom Taxes at Invoice Level

```php
$result = FNE::invoice()->sign([
    // ... other fields ...
    'customTaxes' => [
        [
            'name' => 'DTD',
            'amount' => 5.0, // 5%
        ],
    ],
]);
```

### Custom Taxes at Item Level

```php
$result = FNE::invoice()->sign([
    // ... other fields ...
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
]);
```

## Discounts

### Global Discount

```php
$result = FNE::invoice()->sign([
    // ... other fields ...
    'discount' => 10.0, // Global discount of 10%
]);
```

### Item Discount

```php
$result = FNE::invoice()->sign([
    // ... other fields ...
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

## RNE (Normal Business Regime)

If your company is in RNE, you must provide the RNE number:

```php
$result = FNE::invoice()->sign([
    // ... other fields ...
    'isRne' => true,
    'rne' => 'RNE123456789', // Required if isRne = true
]);
```

## Response Handling

The response contains all information about the certified invoice:

```php
$result = FNE::invoice()->sign($data);

// Base properties
echo $result->ncc;              // Taxpayer identifier
echo $result->reference;         // FNE reference number
echo $result->token;             // Complete QR code verification URL
echo $result->warning;           // Alert if sticker stock is low
echo $result->balanceSticker;    // Number of remaining stickers

// Invoice information
if ($result->invoice) {
    $invoice = $result->invoice;
    
    // FNE UUID (IMPORTANT for future refunds)
    echo $invoice->id;           // UUID to save in database
    
    // Amounts (in cents, divide by 100 for FCFA)
    $totalTTC = $invoice->amount / 100;
    $totalTVA = $invoice->vatAmount / 100;
    
    // Client information
    echo $invoice->clientCompanyName;
    echo $invoice->clientNcc; // null for B2C
    
    // Items (articles)
    foreach ($invoice->items as $item) {
        echo $item->id;          // UUID of the item (IMPORTANT for refunds)
        echo $item->description;
        echo $item->quantity;
        echo $item->amount / 100; // Unit price excluding tax in FCFA
    }
}
```

## Model Integration

You can use the `CertifiableInvoice` trait to directly integrate certification into your models:

```php
use Neocode\FNE\Concerns\CertifiableInvoice;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use CertifiableInvoice;
    
    // The trait automatically extracts data from the model
}

// Usage
$invoice = Invoice::find(1);
$result = $invoice->certify(); // Automatically extracts data

// Or with custom data
$result = $invoice->certify([
    'items' => [...], // Custom data
]);
```

## Automatic Storage

The `CertifiableInvoice` trait can automatically store certifications in the `fne_certifications` table:

```php
// Enable via configuration
// config/fne.php
'features' => [
    'certification_table' => true,
],

// Or force storage
$response = $invoice->certify(null, true);
```

For more information, see the [Automatic Certification Storage](/docs/guides/certification-storage) guide.

## Next Steps

- [Purchase Slips](/docs/guides/purchases) - Certify purchase slips
- [Refunds](/docs/guides/refunds) - Create refunds for your invoices
- [ERP → FNE Mapping](/docs/guides/mapping) - Transform your ERP data to FNE

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
