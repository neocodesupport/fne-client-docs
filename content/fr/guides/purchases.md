---
title: Bordereaux d'achat
description: Guide complet pour certifier des bordereaux d'achat avec FNE Client
order: 2
---

# Bordereaux d'achat

Ce guide vous montre comment certifier des bordereaux d'achat (factures d'achat de produits agricoles) avec FNE Client.

## Vue d'ensemble

Un bordereau d'achat est un document émis lors de l'achat de produits agricoles. Contrairement aux factures de vente, les bordereaux d'achat ne nécessitent pas de taxes.

## Structure de base

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
    'clientCompanyName' => 'Fournisseur Agricole',
    'clientPhone' => '0123456789',
    'clientEmail' => 'fournisseur@example.com',
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Riz 50kg',
            'quantity' => 10,
            'amount' => 50000.0, // Prix unitaire HT en centimes (500.00 FCFA)
            'measurementUnit' => 'kg',
        ],
        [
            'description' => 'Maïs 25kg',
            'quantity' => 20,
            'amount' => 25000.0, // Prix unitaire HT en centimes (250.00 FCFA)
            'measurementUnit' => 'kg',
        ],
    ],
]);
```

## Différences avec les factures de vente

Les bordereaux d'achat ont plusieurs différences importantes :

1. **Pas de taxes** : Les bordereaux d'achat ne nécessitent pas de taxes (`taxes` n'est pas requis)
2. **Type de facture** : Utilisez `InvoiceType::PURCHASE->value` au lieu de `InvoiceType::SALE->value`
3. **Service** : Utilisez `FNE::purchase()->submit()` au lieu de `FNE::invoice()->sign()`

## Unités de mesure

Vous pouvez spécifier l'unité de mesure pour chaque article :

```php
'items' => [
    [
        'description' => 'Riz',
        'quantity' => 10,
        'amount' => 50000.0,
        'measurementUnit' => 'kg', // Unité de mesure
    ],
    [
        'description' => 'Bouteilles d\'huile',
        'quantity' => 50,
        'amount' => 2000.0,
        'measurementUnit' => 'pcs', // Pièces
    ],
],
```

## Remises

Comme pour les factures de vente, vous pouvez appliquer des remises :

### Remise globale

```php
$result = FNE::purchase()->submit([
    // ... autres champs ...
    'discount' => 5.0, // Remise globale de 5%
]);
```

### Remise par article

```php
$result = FNE::purchase()->submit([
    // ... autres champs ...
    'items' => [
        [
            'description' => 'Riz',
            'quantity' => 10,
            'amount' => 50000.0,
            'discount' => 10.0, // Remise de 10% sur cet article
            'measurementUnit' => 'kg',
        ],
    ],
]);
```

## RNE (Régime Normal d'Entreprise)

Si votre entreprise est en RNE :

```php
$result = FNE::purchase()->submit([
    // ... autres champs ...
    'isRne' => true,
    'rne' => 'RNE123456789', // Obligatoire si isRne = true
]);
```

## Traitement de la réponse

La réponse a la même structure que pour les factures de vente :

```php
$result = FNE::purchase()->submit($data);

// Propriétés de base
echo $result->ncc;
echo $result->reference;
echo $result->token;
echo $result->balanceSticker;

// Informations du bordereau
if ($result->invoice) {
    $purchase = $result->invoice;
    
    // UUID FNE (IMPORTANT pour avoirs futurs)
    echo $purchase->id;
    
    // Montant total (en centimes)
    $total = $purchase->amount / 100;
    
    // Items
    foreach ($purchase->items as $item) {
        echo $item->id;          // UUID de l'item
        echo $item->description;
        echo $item->quantity;
        echo $item->measurementUnit;
    }
}
```

## Intégration avec modèles

Utilisez le trait `CertifiablePurchase` :

```php
use Neocode\FNE\Concerns\CertifiablePurchase;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use CertifiablePurchase;
}

// Utilisation
$purchase = Purchase::find(1);
$result = $purchase->submit(); // Extrait automatiquement les données
```

## Prochaines étapes

- **[Avoirs](/docs/guides/refunds)** - Créez des avoirs pour vos bordereaux
- **[Mapping ERP → FNE](/docs/guides/mapping)** - Transformez vos données ERP vers FNE
- **[Gestion des erreurs](/docs/guides/error-handling)** - Gérez les erreurs efficacement

---

**Besoin d'aide ?** Consultez la [documentation complète](/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.



