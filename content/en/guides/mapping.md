---
title: ERP → FNE Mapping
description: Complete guide for mapping your ERP data to FNE format
---

# ERP → FNE Mapping

This guide shows you how to use custom mapping to transform your ERP data structures to FNE format.

## Overview

Custom mapping allows you to automatically transform your ERP data structures to the format expected by the FNE API. This avoids having to manually restructure your data on each call.

## Mapping Configuration

### Laravel

In `config/fne.php`:

```php
return [
    // ... other configurations ...
    
    'mapping' => [
        'invoice' => [
            // Mapping for sales invoices
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone_number',
            'clientEmail' => 'customer.email_address',
            'pointOfSale' => 'pos.code',
            'establishment' => 'establishment.code',
            'clientSellerName' => 'seller.full_name',
        ],
        'purchase' => [
            // Mapping for purchase slips
            'clientCompanyName' => 'supplier.company_name',
            'clientPhone' => 'supplier.contact_phone',
            'clientEmail' => 'supplier.email',
        ],
    ],
];
```

### Symfony

In `config/packages/fne.yaml`:

```yaml
fne:
    mapping:
        invoice:
            clientCompanyName: 'customer.name'
            clientPhone: 'customer.phone_number'
            clientEmail: 'customer.email_address'
        purchase:
            clientCompanyName: 'supplier.company_name'
            clientPhone: 'supplier.contact_phone'
```

### Native PHP

In `fne.php`:

```php
return [
    // ... other configurations ...
    
    'mapping' => [
        'invoice' => [
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone_number',
        ],
    ],
];
```

## Dot Notation

Mapping supports dot notation to access nested properties:

```php
'mapping' => [
    'invoice' => [
        // Direct access
        'clientCompanyName' => 'customer_name',
        
        // Dot notation for nested properties
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.contact.email',
        
        // Array access
        'pointOfSale' => 'point_of_sale.code',
        'establishment' => 'establishment.name',
    ],
],
```

## Usage Example

### Without Mapping

Without custom mapping, you must manually restructure your data:

```php
// ERP data
$erpData = [
    'customer' => [
        'name' => 'Client Company',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'pos' => [
        'code' => 'POS-001',
    ],
];

// Manual restructuring
$fneData = [
    'clientCompanyName' => $erpData['customer']['name'],
    'clientPhone' => $erpData['customer']['phone'],
    'clientEmail' => $erpData['customer']['email'],
    'pointOfSale' => $erpData['pos']['code'],
    // ... other fields ...
];
```

### With Mapping

With custom mapping, you can use your ERP data directly:

```php
// Mapping configuration (in config/fne.php)
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.name',
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.email',
        'pointOfSale' => 'pos.code',
    ],
],

// Usage - data is automatically transformed
$erpData = [
    'customer' => [
        'name' => 'Client Company',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'pos' => [
        'code' => 'POS-001',
    ],
    // ... other FNE fields directly ...
];

// Mapping is applied automatically
$result = FNE::invoice()->sign($erpData);
```

## Mapping with Models

Mapping also works with models via traits:

```php
use Neocode\FNE\Concerns\CertifiableInvoice;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use CertifiableInvoice;
    
    // Mapping is automatically applied when extracting data
}

// Usage
$invoice = Invoice::find(1);

// Model data is automatically transformed according to the mapping
$result = $invoice->certify();
```

## Priority Order

Custom mapping is applied **before** standard mapping. The processing order is:

1. **Custom mapping**: Transforms ERP keys to FNE keys
2. **Merge**: Mapped data is merged with original data
3. **Standard mapping**: Standard mapping is applied to merged data

## Unmapped Fields

Fields that are not in the mapping are preserved as-is. You can:

- Map some fields and leave others in FNE format
- Combine both approaches in the same data structure

```php
$data = [
    // Mapped fields from ERP
    'customer' => [
        'name' => 'Client Company',
        'phone' => '0123456789',
    ],
    
    // Fields already in FNE format
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'items' => [
        // ... items in FNE format ...
    ],
];
```

## Disable Mapping

To disable mapping for a specific call, you can pass data directly in FNE format:

```php
// Data is already in FNE format, no mapping needed
$fneData = [
    'clientCompanyName' => 'Client Company',
    'clientPhone' => '0123456789',
    // ... other FNE fields ...
];

$result = FNE::invoice()->sign($fneData);
```

## Advanced Examples

### Conditional Mapping

```php
// Mapping for B2B invoices
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientNcc' => 'customer.ncc',
        'clientRccm' => 'customer.rccm',
    ],
],

// ERP data
$erpData = [
    'customer' => [
        'company_name' => 'Client Company',
        'ncc' => '123456789',
        'rccm' => 'CI-ABJ-12345',
    ],
];
```

### Mapping with Default Values

```php
$erpData = [
    'customer' => [
        'name' => 'Client Company',
        // phone doesn't exist
    ],
];

// Provide a default value
$erpData['customer']['phone'] = $erpData['customer']['phone'] ?? '0000000000';
```

## Next Steps

- [Model Integration](/docs/guides/invoices#model-integration) - Use traits for direct integration
- [Error Handling](/docs/guides/error-handling) - Handle mapping errors
- [Examples](/docs/examples) - Check out more mapping examples

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
