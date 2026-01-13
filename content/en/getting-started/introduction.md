---
title: Introduction
description: Discover FNE Client, the PHP SDK for integrating the FNE API into your applications
order: 1
---

# Introduction

Welcome to the **FNE Client** documentation, the framework-agnostic PHP SDK for integrating the FNE (Facture Normalisée Électronique) API.

## What is FNE Client?

FNE Client is a modern and intuitive PHP SDK that simplifies FNE API integration in your PHP applications. Whether you use Laravel, Symfony, or native PHP, FNE Client adapts to your stack.

### Main Features

- **Framework-Agnostic**: Compatible with Laravel 11+, Symfony 7.4+, and native PHP
- **Zero Configuration**: One-command installation with automatic detection
- **Flexible Mapping**: Transform your ERP data structures to FNE format with dot notation
- **Model Integration**: Traits for direct integration with your models
- **Robust Validation**: Automatic validation before sending to the API
- **Production Ready**: 67 tests, complete error handling

## Why use FNE Client?

### Simplicity

```php
use Neocode\FNE\Facades\FNE;

// Certify an invoice in just a few lines
$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    // ...
]);
```

### Flexibility

The SDK supports custom mapping to transform your ERP data structures to FNE format:

```php
// config/fne.php
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientPhone' => 'customer.phone',
    ],
],
```

### Model Integration

Use the provided traits to directly integrate certification into your models:

```php
use Neocode\FNE\Concerns\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certify directly from the model
$invoice->certify();
```

## Compatibility

FNE Client is compatible with:

- **Laravel 11+**: Service Provider, Facade, and complete integration
- **Symfony 7.4+**: Service Container and native integration
- **Native PHP**: No framework dependencies required

> [!success]
> **Ready to get started?** Head to the [Installation](/docs/getting-started/installation) section to install FNE Client in your project.

## Next Steps

1. [Installation](/docs/getting-started/installation) - Install FNE Client in your project
2. [Configuration](/docs/getting-started/configuration) - Configure the SDK for your environment
3. [Quick Start](/docs/getting-started/quick-start) - Create your first certified invoice

## Resources

- [Complete documentation](/docs)
- [Code examples](/docs/examples)
- [API Reference](/docs/api-reference)
- [GitHub](https://github.com/neocodesupport/fne-client)
