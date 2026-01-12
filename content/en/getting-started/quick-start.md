---
title: Quick Start
description: Create your first certified invoice in just a few minutes
order: 4
---

# Quick Start

This guide shows you how to create your first certified invoice with FNE Client in just a few minutes.

## Prerequisites

- FNE Client installed and configured (see [Installation](/docs/getting-started/installation))
- A valid FNE API key
- PHP 8.2 or higher

## Basic Example: B2C Invoice

### Laravel

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
            'amount' => 5000.0, // Unit price excluding tax in cents (50.00 FCFA)
            'taxes' => [TaxType::TVA->value],
        ],
        [
            'description' => 'Product 2',
            'quantity' => 1,
            'amount' => 10000.0, // Unit price excluding tax in cents (100.00 FCFA)
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);

// Access results
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "9606123E25000000019"
echo $result->token;             // Complete QR code verification URL
echo $result->balanceSticker;    // Number of remaining stickers

// Invoice information
if ($result->invoice) {
    $invoice = $result->invoice;
    echo $invoice->id;           // Invoice UUID (important for future refunds)
    echo $invoice->amount;       // Total amount including tax in cents
    echo $invoice->vatAmount;    // VAT amount in cents
}
```

### Symfony

```php
use Neocode\FNE\FNEClient;
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;
use Neocode\FNE\Enums\TaxType;

class InvoiceController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}
    
    public function certify(): Response
    {
        $result = $this->fneClient->invoice()->sign([
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
                    'amount' => 5000.0,
                    'taxes' => [TaxType::TVA->value],
                ],
            ],
            'taxes' => TaxType::TVA->value,
        ]);
        
        return new JsonResponse($result->toArray());
    }
}
```

### Native PHP

```php
require_once 'vendor/autoload.php';

use Neocode\FNE\FNEClient;
use Neocode\FNE\Config\FNEConfig;
use Neocode\FNE\Http\HttpClientFactory;
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;
use Neocode\FNE\Enums\TaxType;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'http://54.247.95.108/ws',
    'mode' => 'test',
]);

$httpClient = HttpClientFactory::create($config);
$fne = new FNEClient($httpClient, $config);

$result = $fne->invoice()->sign([
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
            'amount' => 5000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

## B2B Invoice Example

For a B2B invoice, you must provide the `clientNcc`:

```php
$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value, // B2B instead of B2C
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
            'amount' => 100000.0, // 1000.00 FCFA excluding tax
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

## Error Handling

FNE Client throws typed exceptions on error:

```php
use Neocode\FNE\Exceptions\ValidationException;
use Neocode\FNE\Exceptions\AuthenticationException;
use Neocode\FNE\Exceptions\BadRequestException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Data validation error
    echo "Validation error: " . $e->getMessage();
} catch (AuthenticationException $e) {
    // Authentication error (invalid API key)
    echo "Authentication error: " . $e->getMessage();
} catch (BadRequestException $e) {
    // Request error
    echo "Request error: " . $e->getMessage();
} catch (\Exception $e) {
    // Other error
    echo "Error: " . $e->getMessage();
}
```

## Next Steps

Now that you've created your first invoice:

1. [Guides - Sales Invoices](/docs/guides/invoices) - Learn advanced features
2. [Guides - Purchase Slips](/docs/guides/purchases) - Certify purchase slips
3. [Guides - Refunds](/docs/guides/refunds) - Create refunds for your invoices
4. [Examples](/docs/examples) - Check out more code examples

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
