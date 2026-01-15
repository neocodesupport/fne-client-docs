---
title: Refunds
description: Complete guide for creating refunds with FNE Client
---

# Refunds

This guide shows you how to create refunds for your certified invoices with FNE Client.

## Overview

A refund is a document that cancels or reduces the amount of a previously certified invoice. To create a refund, you must have the UUID of the original invoice and the UUIDs of the items to refund.

> [!warning]
> **Important: Save UUIDs**
> 
> To create a refund, you must have saved:
> 1. **Invoice UUID** (`invoice.id`) from the original invoice
> 2. **Item UUIDs** (`item.id`) of the items to refund
> 
> These UUIDs are returned in the response when certifying the original invoice.

### Automatic Storage

FNE Client can automatically store certifications in the `fne_certifications` table:

```php
use Neocode\FNE\Concerns\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certification with automatic storage
$invoice = Invoice::find(1);
$response = $invoice->certify(); // Automatically stores if enabled

// Retrieve UUID from table to create refund
$certification = \Neocode\FNE\Models\FNECertification::where('reference', $response->reference)->first();
$fneInvoiceId = $certification->fne_invoice_id; // UUID to create refund
```

For more information, see the [Automatic Certification Storage](/docs/guides/certification-storage) guide.

## Create a Full Refund

A full refund refunds the entire invoice:

```php
use Neocode\FNE\Facades\FNE;

// UUID of the original invoice (retrieved from your database)
$invoiceId = 'e2b2d8da-a532-4c08-9182-f5b428ca468d';

// UUIDs of all items (retrieved from your database)
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e', // Item UUID
        'quantity' => 30.0, // Quantity to refund
    ],
    [
        'id' => 'another-item-uuid',
        'quantity' => 10.0,
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);

// Response for a refund
echo $result->ncc;              // Taxpayer identifier
echo $result->reference;         // Reference starting with "A" (Refund)
echo $result->token;             // QR code verification URL
echo $result->balanceSticker;    // Number of remaining stickers

// ⚠️ IMPORTANT: invoice is always null for refunds
// Only the reference starts with "A"
```

## Create a Partial Refund

A partial refund refunds only certain items or a partial quantity:

```php
// Refund only certain items
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e',
        'quantity' => 10.0, // Refund only 10 out of 30
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);
```

## Response Structure

A refund response has a different structure from an invoice:

```php
$result = FNE::refund()->issue($invoiceId, $items);

// Base properties (identical to invoices)
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "A9606123E2500000006" (starts with "A")
echo $result->token;             // Complete verification URL
echo $result->warning;           // false
echo $result->balanceSticker;    // 178

// ⚠️ IMPORTANT: invoice is ALWAYS null for refunds
// Unlike invoices, there is no invoice object in the response
if ($result->invoice === null) {
    echo "This is a refund"; // Always true for refunds
}
```

## Check if it's a Refund

```php
if ($result->isRefund()) {
    echo "This is a refund";
    echo "Reference: " . $result->reference; // Starts with "A"
}

// Or check manually
if (str_starts_with($result->reference, 'A')) {
    echo "This is a refund";
}
```

## Model Integration

Use the `CertifiableRefund` trait:

```php
use Neocode\FNE\Concerns\CertifiableRefund;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use CertifiableRefund;
    
    // The trait automatically detects the FNE UUID from:
    // - fne_id
    // - fne_invoice_id
    // - getFneInvoiceId()
}

// Usage
$invoice = Invoice::find(1);
$items = [
    [
        'id' => 'item-uuid-1',
        'quantity' => 10.0,
    ],
];

$result = $invoice->issueRefund($items);
```

## Error Handling

```php
use Neocode\FNE\Exceptions\ValidationException;
use Neocode\FNE\Exceptions\NotFoundException;

try {
    $result = FNE::refund()->issue($invoiceId, $items);
} catch (ValidationException $e) {
    // Validation error (invalid UUID, invalid quantity, etc.)
    echo "Validation error: " . $e->getMessage();
} catch (NotFoundException $e) {
    // Original invoice not found
    echo "Invoice not found: " . $e->getMessage();
} catch (\Exception $e) {
    // Other error
    echo "Error: " . $e->getMessage();
}
```

## Best Practices

1. **Always save UUIDs**: When certifying an invoice, always save the invoice UUID and item UUIDs
2. **Check quantities**: Make sure the refunded quantity does not exceed the original quantity
3. **Handle partial refunds**: You can create multiple refunds for the same invoice
4. **Store references**: Save the refund reference (starts with "A") for traceability

## Complete Example

```php
// 1. Certify an original invoice
$invoiceResult = FNE::invoice()->sign($invoiceData);

// 2. Save UUIDs
$invoiceId = $invoiceResult->invoice->id;
$itemIds = array_map(fn($item) => $item->id, $invoiceResult->invoice->items);

DB::table('fne_certifications')->insert([
    'fne_invoice_id' => $invoiceId,
    'reference' => $invoiceResult->reference,
    'created_at' => now(),
]);

// 3. Later, create a refund
$refundItems = [
    [
        'id' => $itemIds[0], // First item
        'quantity' => 5.0, // Refund 5 units
    ],
];

$refundResult = FNE::refund()->issue($invoiceId, $refundItems);

// 4. Save the refund
DB::table('fne_refunds')->insert([
    'fne_invoice_id' => $invoiceId,
    'reference' => $refundResult->reference, // Starts with "A"
    'created_at' => now(),
]);
```

## Next Steps

- [Error Handling](/docs/guides/error-handling) - Handle errors efficiently
- [ERP → FNE Mapping](/docs/guides/mapping) - Transform your ERP data to FNE
- [Examples](/docs/examples) - Check out more refund examples

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
