---
title: FNECertification Model
description: Eloquent Model for the fne_certifications table
order: 8
---

# FNECertification Model

The `FNECertification` model represents the `fne_certifications` table in Laravel.

## Usage

```php
use Neocode\FNE\Models\FNECertification;

// Find a certification by reference
$certification = FNECertification::where('reference', '9606123E25000000019')->first();

// Find all certifications for a client
$certifications = FNECertification::where('client_ncc', '123456789')->get();

// Find pending payment certifications
$pending = FNECertification::where('status', 'pending')->get();
```

## Main Properties

### Identifiers

- `id` : Internal ID (auto-increment)
- `fne_invoice_id` : FNE invoice UUID (⚠️ IMPORTANT for refunds)
- `reference` : Unique FNE reference
- `ncc` : Taxpayer number
- `token` : QR code verification token

### Document Information

- `type` : Document type (`invoice`, `refund`)
- `subtype` : Subtype (`normal`, `refund`)
- `status` : Payment status (`paid`, `pending`)
- `template` : Template used (`B2C`, `B2B`, `B2F`, `B2G`)

### Client Information

- `client_company_name` : Client company name
- `client_ncc` : Client NCC
- `client_phone` : Client phone
- `client_email` : Client email

### Amounts (in cents)

- `amount` : Total amount including tax in cents
- `vat_amount` : VAT amount in cents
- `fiscal_stamp` : Fiscal stamp in cents
- `discount` : Global discount in %

### Metadata

- `is_rne` : Indicates if company is in RNE
- `rne` : RNE number
- `source` : Source (`api`, `mobile`)
- `warning` : Alert if sticker stock is low
- `balance_sticker` : Number of remaining stickers
- `fne_date` : FNE invoice date

## Usage Examples

### Retrieve UUID to Create Refund

```php
$certification = FNECertification::where('reference', $reference)->first();

if ($certification) {
    $fneInvoiceId = $certification->fne_invoice_id; // UUID to create refund
}
```

### Calculate Amounts in FCFA

```php
$certification = FNECertification::find(1);

$amountFCFA = $certification->amount / 100;        // Total amount including tax in FCFA
$vatAmountFCFA = $certification->vat_amount / 100;  // VAT in FCFA
$stampFCFA = $certification->fiscal_stamp / 100;     // Fiscal stamp in FCFA
```

### Search Recent Certifications

```php
// Certifications from last 30 days
$recent = FNECertification::where('created_at', '>=', now()->subDays(30))->get();

// Certifications by template
$b2b = FNECertification::where('template', 'B2B')->get();
```

### Statistics

```php
// Total number of certifications
$total = FNECertification::count();

// Total certified amount
$totalAmount = FNECertification::sum('amount') / 100; // In FCFA

// Pending payment certifications
$pendingCount = FNECertification::where('status', 'pending')->count();
```

## Relations (if needed)

You can add relations in your custom model:

```php
use Neocode\FNE\Models\FNECertification;

class CustomFNECertification extends FNECertification
{
    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'fne_invoice_id', 'fne_id');
    }
}
```

## See Also

- **[Automatic Certification Storage](/docs/guides/certification-storage)** - Complete guide
- **[CertificationStorage](/docs/api-reference/certification-storage)** - Storage class

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
