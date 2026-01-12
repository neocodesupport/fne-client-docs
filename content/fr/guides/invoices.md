---
title: Factures de vente
description: Guide complet pour certifier des factures de vente avec FNE Client
order: 1
---

# Factures de vente

Ce guide vous montre comment certifier des factures de vente avec FNE Client.

## Vue d'ensemble

Une facture de vente est un document commercial émis par une entreprise pour une transaction de vente. FNE Client permet de certifier ces factures auprès de l'API FNE.

## Types de templates

FNE Client supporte 4 types de templates de facturation :

- **B2C** (Business to Consumer) : Facture pour un client particulier
- **B2B** (Business to Business) : Facture pour une entreprise (nécessite `clientNcc`)
- **B2F** (Business to Foreign) : Facture pour un client international (peut nécessiter une devise étrangère)
- **B2G** (Business to Government) : Facture pour une institution gouvernementale

## Structure de base

### Exemple B2C

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
            'amount' => 5000.0, // Prix unitaire HT en centimes
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

### Exemple B2B

Pour une facture B2B, le `clientNcc` est obligatoire :

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

### Exemple B2F avec devise étrangère

Pour une facture B2F avec devise étrangère :

```php
use Neocode\FNE\Enums\ForeignCurrency;

$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::TRANSFER->value,
    'template' => InvoiceTemplate::B2F->value,
    'isRne' => false,
    'clientCompanyName' => 'Client International',
    'clientPhone' => '+33123456789',
    'clientEmail' => 'client@international.com',
    'foreignCurrency' => ForeignCurrency::EUR->value,
    'foreignCurrencyRate' => 655.0, // Taux de change
    'pointOfSale' => 'POS-001',
    'establishment' => 'EST-001',
    'items' => [
        [
            'description' => 'Service international',
            'quantity' => 1,
            'amount' => 100000.0,
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

## Méthodes de paiement

FNE Client supporte les méthodes de paiement suivantes :

- `cash` : Paiement en espèces
- `card` : Paiement par carte bancaire
- `check` : Paiement par chèque
- `mobile-money` : Paiement par mobile money
- `transfer` : Paiement par virement bancaire
- `deferred` : Paiement à terme

## Types de taxes

Les types de taxes supportés :

- `TVA` : TVA normal de 18%
- `TVAB` : TVA réduit de 9%
- `TVAC` : TVA exo.conv de 0%
- `TVAD` : TVA exo.leg de 0% pour TEE et RME

## Taxes personnalisées

Vous pouvez ajouter des taxes personnalisées au niveau facture ou article :

### Taxes personnalisées au niveau facture

```php
$result = FNE::invoice()->sign([
    // ... autres champs ...
    'customTaxes' => [
        [
            'name' => 'DTD',
            'amount' => 5.0, // 5%
        ],
    ],
]);
```

### Taxes personnalisées au niveau article

```php
$result = FNE::invoice()->sign([
    // ... autres champs ...
    'items' => [
        [
            'description' => 'Produit avec taxes personnalisées',
            'quantity' => 1,
            'amount' => 10000.0,
            'taxes' => [TaxType::TVA->value],
            'customTaxes' => [
                [
                    'name' => 'GRA',
                    'amount' => 2.5, // 2.5%
                ],
                [
                    'name' => 'AIRSI',
                    'amount' => 1.0, // 1%
                ],
            ],
        ],
    ],
]);
```

## Remises

### Remise globale

```php
$result = FNE::invoice()->sign([
    // ... autres champs ...
    'discount' => 10.0, // Remise globale de 10%
]);
```

### Remise par article

```php
$result = FNE::invoice()->sign([
    // ... autres champs ...
    'items' => [
        [
            'description' => 'Produit avec remise',
            'quantity' => 2,
            'amount' => 5000.0,
            'discount' => 15.0, // Remise de 15% sur cet article
            'taxes' => [TaxType::TVA->value],
        ],
    ],
]);
```

## RNE (Régime Normal d'Entreprise)

Si votre entreprise est en RNE, vous devez fournir le numéro RNE :

```php
$result = FNE::invoice()->sign([
    // ... autres champs ...
    'isRne' => true,
    'rne' => 'RNE123456789', // Obligatoire si isRne = true
]);
```

## Traitement de la réponse

La réponse contient toutes les informations de la facture certifiée :

```php
$result = FNE::invoice()->sign($data);

// Propriétés de base
echo $result->ncc;              // Identifiant contribuable
echo $result->reference;         // Numéro de référence FNE
echo $result->token;             // URL complète de vérification QR code
echo $result->warning;           // Alerte si stock de stickers faible
echo $result->balanceSticker;    // Nombre de stickers restants

// Informations de la facture
if ($result->invoice) {
    $invoice = $result->invoice;
    
    // UUID FNE (IMPORTANT pour avoirs futurs)
    echo $invoice->id;           // UUID à sauvegarder en base de données
    
    // Montants (en centimes, diviser par 100 pour FCFA)
    $totalTTC = $invoice->amount / 100;
    $totalTVA = $invoice->vatAmount / 100;
    
    // Informations client
    echo $invoice->clientCompanyName;
    echo $invoice->clientNcc; // null pour B2C
    
    // Items (articles)
    foreach ($invoice->items as $item) {
        echo $item->id;          // UUID de l'item (IMPORTANT pour avoirs)
        echo $item->description;
        echo $item->quantity;
        echo $item->amount / 100; // Prix unitaire HT en FCFA
    }
}
```

## Intégration avec modèles

Vous pouvez utiliser le trait `CertifiableInvoice` pour intégrer directement la certification dans vos modèles :

```php
use Neocode\FNE\Concerns\CertifiableInvoice;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use CertifiableInvoice;
    
    // Le trait extrait automatiquement les données du modèle
}

// Utilisation
$invoice = Invoice::find(1);
$result = $invoice->certify(); // Extrait automatiquement les données

// Ou avec des données personnalisées
$result = $invoice->certify([
    'items' => [...], // Données personnalisées
]);
```

## Prochaines étapes

- **[Bordereaux d'achat](/docs/guides/purchases)** - Certifiez des bordereaux d'achat
- **[Avoirs](/docs/guides/refunds)** - Créez des avoirs pour vos factures
- **[Mapping ERP → FNE](/docs/guides/mapping)** - Transformez vos données ERP vers FNE

---

**Besoin d'aide ?** Consultez la [documentation complète](/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.



