---
title: FNEClient
description: API reference for the main FNEClient class
---

# FNEClient

The main `FNEClient` class is the entry point for all FNE operations.

## Installation

```php
use Neocode\FNE\FNEClient;
use Neocode\FNE\Config\FNEConfig;
use Neocode\FNE\Http\HttpClientFactory;
```

## Initialization

### Laravel

```php
use Neocode\FNE\Facades\FNE;

// Usage via Facade
$result = FNE::invoice()->sign($data);
```

### Symfony

```php
use Neocode\FNE\FNEClient;

class InvoiceController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}
    
    public function certify()
    {
        $result = $this->fneClient->invoice()->sign($data);
    }
}
```

### Native PHP

```php
use Neocode\FNE\FNEClient;
use Neocode\FNE\Config\FNEConfig;
use Neocode\FNE\Http\HttpClientFactory;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'http://54.247.95.108/ws',
    'mode' => 'test',
]);

$httpClient = HttpClientFactory::create($config);
$fne = new FNEClient($httpClient, $config);
```

## Methods

### invoice()

Returns the service for sales invoices.

```php
$invoiceService = $fne->invoice();
$result = $invoiceService->sign($data);
```

### purchase()

Returns the service for purchase slips.

```php
$purchaseService = $fne->purchase();
$result = $purchaseService->submit($data);
```

### refund()

Returns the service for refunds.

```php
$refundService = $fne->refund();
$result = $refundService->issue($invoiceId, $items);
```

## See Also

- [InvoiceService](/docs/api-reference/invoice-service) - Service for invoices
- [PurchaseService](/docs/api-reference/purchase-service) - Service for purchase slips
- [RefundService](/docs/api-reference/refund-service) - Service for refunds

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
