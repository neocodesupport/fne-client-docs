---
title: Automatic Certification Storage
description: Guide for using automatic storage in the fne_certifications table
order: 9
---

# Automatic Certification Storage

FNE Client can automatically store certifications in a database table to facilitate management of certified invoices and future refund creation.

## Overview

When an invoice is successfully certified, FNE Client can automatically store important information in the `fne_certifications` table. This feature is particularly useful for:

- **Creating refunds** : FNE UUIDs are required to create refunds
- **History** : Keep a history of certifications
- **Search** : Easily search certified invoices
- **Reports** : Generate reports on certifications

## Activation

### Via Configuration

```php
// config/fne.php
'features' => [
    'certification_table' => env('FNE_FEATURE_CERTIFICATION_TABLE', false),
],
```

Or in `.env` :

```env
FNE_FEATURE_CERTIFICATION_TABLE=true
```

### Via Laravel Pennant

```php
use Laravel\Pennant\Feature;

Feature::for($user)->activate('fne:certification-table');
```

### Force Storage Explicitly

```php
// Force storage even if feature is disabled
$response = $invoice->certify(null, true);

// Disable storage even if feature is enabled
$response = $invoice->certify(null, false);
```

## Table Migration

### Laravel

```bash
php artisan migrate
```

The migration is available in `database/migrations/2024_01_01_000000_create_fne_certifications_table.php`.

### Symfony

Use the provided SQL file:

```bash
# MySQL
mysql -u user -p database < vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql

# PostgreSQL
psql -U user -d database -f vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql

# SQLite
sqlite3 database.db < vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql
```

### Native PHP

Use the provided SQL file with your database management system.

## Table Structure

The `fne_certifications` table contains the following columns:

| Column | Type | Description |
|--------|------|-------------|
| `id` | BIGINT | Internal ID (auto-increment) |
| `fne_invoice_id` | UUID | FNE invoice UUID (⚠️ IMPORTANT for refunds) |
| `reference` | STRING | Unique FNE reference (e.g., 9606123E25000000019) |
| `ncc` | STRING | Taxpayer number |
| `token` | STRING | QR code verification token |
| `type` | ENUM | Document type (invoice, refund) |
| `subtype` | ENUM | Subtype (normal, refund) |
| `status` | ENUM | Payment status (paid, pending) |
| `template` | STRING | Template used (B2C, B2B, B2F, B2G) |
| `client_company_name` | STRING | Client company name |
| `client_ncc` | STRING | Client NCC |
| `client_phone` | STRING | Client phone |
| `client_email` | STRING | Client email |
| `amount` | BIGINT | Total amount including tax in cents |
| `vat_amount` | BIGINT | VAT amount in cents |
| `fiscal_stamp` | BIGINT | Fiscal stamp in cents |
| `discount` | DECIMAL | Global discount in % |
| `is_rne` | BOOLEAN | Indicates if company is in RNE |
| `rne` | STRING | RNE number |
| `source` | STRING | Source (api, mobile) |
| `warning` | BOOLEAN | Alert if sticker stock is low |
| `balance_sticker` | INTEGER | Number of remaining stickers |
| `fne_date` | TIMESTAMP | FNE invoice date |
| `created_at` | TIMESTAMP | Creation date |
| `updated_at` | TIMESTAMP | Update date |

## Usage

### With CertifiableInvoice Trait

Storage is automatic if the feature is enabled:

```php
use Neocode\FNE\Concerns\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certification with automatic storage
$invoice = Invoice::find(1);
$response = $invoice->certify(); // Automatically stores if enabled
```

### Verify Storage

```php
use Neocode\FNE\Models\FNECertification;

$certification = FNECertification::where('reference', $response->reference)->first();

if ($certification) {
    echo "FNE UUID: {$certification->fne_invoice_id}";
    echo "Amount: " . ($certification->amount / 100) . " FCFA";
}
```

### Use UUID to Create Refund

```php
// Retrieve UUID from table
$certification = FNECertification::where('reference', '9606123E25000000019')->first();

// Use UUID to create refund
$refund = FNE::refund()->issueRefund($certification->fne_invoice_id, [
    [
        'id' => $itemId, // Item UUID
        'quantity' => 1.0,
    ],
]);
```

## Multi-Framework Compatibility

Automatic storage works with:

- **Laravel** : Uses Eloquent Model (`FNECertification`)
- **Symfony** : Uses Doctrine EntityManager or DBAL Connection
- **Native PHP** : Uses PDO directly

The system automatically detects the framework and uses the appropriate method.

## Error Handling

If storage fails (table doesn't exist, SQL error, etc.), certification continues normally. The error is logged but does not affect the certification process.

## Disable Storage

If you don't want to use this feature:

```php
// In config/fne.php
'features' => [
    'certification_table' => false,
],
```

Or explicitly disable during certification:

```php
$response = $invoice->certify(null, false);
```

## See Also

- **[Sales Invoices](/docs/guides/invoices)** - Complete guide on invoices
- **[Refunds](/docs/guides/refunds)** - Create refunds with stored UUIDs

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
