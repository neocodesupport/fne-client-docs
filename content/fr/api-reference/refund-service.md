---
title: RefundService
description: Référence API pour le service d'avoirs
order: 4
---

# RefundService

Le service `RefundService` gère la création d'avoirs (remboursements).

## Méthodes

### issue()

Crée un avoir pour une facture.

```php
public function issue(string $invoiceId, array $items): ResponseDTO
```

**Paramètres :**
- `$invoiceId` (string) : UUID de la facture originale
- `$items` (array) : Tableau d'items à rembourser avec structure `['id' => 'uuid', 'quantity' => float]`

**Retourne :** `ResponseDTO`

**Exemple :**

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

**Voir aussi :** [Guide - Avoirs](/docs/guides/refunds)

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



