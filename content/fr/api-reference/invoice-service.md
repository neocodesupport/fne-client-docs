---
title: InvoiceService
description: Référence API pour le service de factures de vente
order: 2
---

# InvoiceService

Le service `InvoiceService` gère la certification des factures de vente.

## Méthodes

### sign()

Certifie une facture de vente.

```php
public function sign(?array $data = null): ResponseDTO
```

**Paramètres :**
- `$data` (array|null) : Données de la facture (optionnel si données définies via contexte)

**Retourne :** `ResponseDTO`

**Exemple :**

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
    'clientCompanyName' => 'Client',
    'clientPhone' => '0123456789',
    'clientEmail' => 'client@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Produit',
            'quantity' => 1,
            'amount' => 10000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

**Voir aussi :** [Guide - Factures de vente](/docs/guides/invoices)

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



