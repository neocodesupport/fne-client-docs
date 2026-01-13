---
title: PurchaseService
description: Référence API pour le service de bordereaux d'achat
order: 3
---

# PurchaseService

Le service `PurchaseService` gère la certification des bordereaux d'achat.

## Méthodes

### submit()

Certifie un bordereau d'achat.

```php
public function submit(?array $data = null): ResponseDTO
```

**Paramètres :**
- `$data` (array|null) : Données du bordereau (optionnel si données définies via contexte)

**Retourne :** `ResponseDTO`

**Exemple :**

```php
use Neocode\FNE\Facades\FNE;
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;

$result = FNE::purchase()->submit([
    'invoiceType' => InvoiceType::PURCHASE->value,
    'paymentMethod' => PaymentMethod::CASH->value,
    'template' => InvoiceTemplate::B2C->value,
    'isRne' => false,
    'clientCompanyName' => 'Fournisseur',
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

**Voir aussi :** [Guide - Bordereaux d'achat](/docs/guides/purchases)

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



