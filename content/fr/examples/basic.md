---
title: Exemples basiques
description: Exemples de code basiques pour démarrer avec FNE Client
order: 1
---

# Exemples basiques

Cette page contient des exemples de code basiques pour démarrer avec FNE Client.

## Facture B2C simple

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
    'clientCompanyName' => 'Client Particulier',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Produit 1',
            'quantity' => 2,
            'amount' => 5000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

## Facture B2B avec clientNcc

```php
$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value,
    'isRne' => false,
    'clientNcc' => '123456789', // Obligatoire pour B2B
    'clientCompanyName' => 'Entreprise Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Service professionnel',
            'quantity' => 1,
            'amount' => 100000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

## Bordereau d'achat

```php
$result = FNE::purchase()->submit([
    'invoiceType' => InvoiceType::PURCHASE->value,
    'paymentMethod' => PaymentMethod::CASH->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Fournisseur Agricole',
    'clientPhone' => '0123456789',
    'clientEmail' => 'fournisseur@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Riz 50kg',
            'quantity' => 10,
            'amount' => 50000.0,
            'measurementUnit' => 'kg',
        ],
    ],
]);
```

## Avoir

```php
$invoiceId = 'e2b2d8da-a532-4c08-9182-f5b428ca468d';
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e',
        'quantity' => 10.0,
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);
```

## Voir aussi

- **[Exemples avancés](/docs/examples/advanced)** - Exemples plus complexes
- **[Cas d'usage réels](/docs/examples/use-cases)** - Exemples de cas d'usage réels

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



