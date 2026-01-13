---
title: DTOs
description: Complete reference for DTOs (Data Transfer Objects)
---

# DTOs

DTOs (Data Transfer Objects) allow manipulating data in a type-safe way.

## ResponseDTO

Complete FNE API response.

```php
use Neocode\FNE\DTOs\ResponseDTO;

$result = FNE::invoice()->sign($data);

// Properties
$result->ncc              // string - Taxpayer identifier
$result->reference        // string - FNE reference number
$result->token            // string - QR code verification URL
$result->warning          // bool - Alert if low stock
$result->balanceSticker   // int - Remaining stickers count
$result->invoice          // ?InvoiceResponseDTO - Invoice information (null for refunds)

// Methods
$result->isInvoice()      // bool - Checks if it's an invoice
$result->isRefund()       // bool - Checks if it's a refund
$result->toArray()        // array - Converts to array
```

## InvoiceResponseDTO

Invoice information in the response.

```php
if ($result->invoice) {
    $invoice = $result->invoice;
    
    // Main properties
    $invoice->id                    // string - FNE UUID (IMPORTANT for refunds)
    $invoice->amount                // int - Total amount including tax in cents
    $invoice->vatAmount            // int - VAT amount in cents
    $invoice->clientCompanyName    // string
    $invoice->items                // array<InvoiceItemResponseDTO>
    
    // Methods
    $invoice->getAmountInFCFA()    // float - Amount in FCFA
    $invoice->getVatAmountInFCFA()  // float - VAT in FCFA
}
```

## InvoiceItemResponseDTO

Invoice item information.

```php
foreach ($result->invoice->items as $item) {
    $item->id              // string - Item UUID (IMPORTANT for refunds)
    $item->description     // string
    $item->quantity        // float
    $item->amount          // int - Unit price excluding tax in cents
    $item->taxes           // array<TaxResponseDTO>
    
    // Methods
    $item->getAmountInFCFA() // float - Unit price excluding tax in FCFA
}
```

## Array Conversion

All DTOs can be converted to arrays:

```php
$array = $result->toArray();
$json = json_encode($result); // Implements JsonSerializable
```

## See Also

- [Enums](/docs/api-reference/enums) - Reference for available enums

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
