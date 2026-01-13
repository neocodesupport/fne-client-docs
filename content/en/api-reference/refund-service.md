---
title: RefundService
description: API reference for the refund service
---

# RefundService

The `RefundService` service handles refund creation.

## Methods

### issue()

Creates a refund for an invoice.

```php
public function issue(string $invoiceId, array $items): ResponseDTO
```

**Parameters:**

- `$invoiceId` (string): UUID of the original invoice
- `$items` (array): Array of items to refund with structure `['id' => 'uuid', 'quantity' => float]`

**Returns:** `ResponseDTO`

### Example:

```php
use Neocode\FNE\Facades\FNE;

$invoiceId = 'e2b2d8da-a532-4c08-9182-f5b428ca468d';
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e',
        'quantity' => 10.0,
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);
```

## See Also

- [Guide - Refunds](/docs/guides/refunds)

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
