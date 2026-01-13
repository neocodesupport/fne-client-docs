---
title: Enums
description: Référence complète des enums disponibles dans FNE Client
order: 5
---

# Enums

FNE Client utilise des enums PHP 8.2+ pour garantir la sécurité de type.

## InvoiceType

Types de factures.

```php
use Neocode\FNE\Enums\InvoiceType;

InvoiceType::SALE->value      // 'sale' - Facture de vente
InvoiceType::PURCHASE->value  // 'purchase' - Bordereau d'achat
```

## PaymentMethod

Méthodes de paiement.

```php
use Neocode\FNE\Enums\PaymentMethod;

PaymentMethod::CASH->value           // 'cash'
PaymentMethod::CARD->value           // 'card'
PaymentMethod::CHECK->value          // 'check'
PaymentMethod::MOBILE_MONEY->value  // 'mobile-money'
PaymentMethod::TRANSFER->value       // 'transfer'
PaymentMethod::DEFERRED->value       // 'deferred'
```

## InvoiceTemplate

Templates de facturation.

```php
use Neocode\FNE\Enums\InvoiceTemplate;

InvoiceTemplate::B2C->value  // 'B2C' - Business to Consumer
InvoiceTemplate::B2B->value  // 'B2B' - Business to Business
InvoiceTemplate::B2F->value  // 'B2F' - Business to Foreign
InvoiceTemplate::B2G->value  // 'B2G' - Business to Government
```

## TaxType

Types de taxes.

```php
use Neocode\FNE\Enums\TaxType;

TaxType::TVA->value   // 'TVA' - TVA normal 18%
TaxType::TVAB->value  // 'TVAB' - TVA réduit 9%
TaxType::TVAC->value  // 'TVAC' - TVA exo.conv 0%
TaxType::TVAD->value  // 'TVAD' - TVA exo.leg 0%
```

## ForeignCurrency

Devises étrangères supportées.

```php
use Neocode\FNE\Enums\ForeignCurrency;

ForeignCurrency::XOF->value  // 'XOF' - Franc CFA
ForeignCurrency::USD->value  // 'USD' - Dollar Américain
ForeignCurrency::EUR->value  // 'EUR' - Euro
// ... autres devises
```

## Utilisation

```php
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;
use Neocode\FNE\Enums\TaxType;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'taxes' => TaxType::TVA->value,
    // ...
]);
```

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



