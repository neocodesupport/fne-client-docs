---
title: Mapping ERP → FNE
description: Guide complet pour mapper vos données ERP vers le format FNE
order: 4
---

# Mapping ERP → FNE

Ce guide vous montre comment utiliser le mapping personnalisé pour transformer vos structures de données ERP vers le format FNE.

## Vue d'ensemble

Le mapping personnalisé permet de transformer automatiquement vos structures de données ERP vers le format attendu par l'API FNE. Cela évite d'avoir à restructurer manuellement vos données à chaque appel.

## Configuration du mapping

### Laravel

Dans `config/fne.php` :

```php
return [
    // ... autres configurations ...
    
    'mapping' => [
        'invoice' => [
            // Mapping pour les factures de vente
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone_number',
            'clientEmail' => 'customer.email_address',
            'pointOfSale' => 'pos.code',
            'establishment' => 'establishment.code',
            'clientSellerName' => 'seller.full_name',
        ],
        'purchase' => [
            // Mapping pour les bordereaux d'achat
            'clientCompanyName' => 'supplier.company_name',
            'clientPhone' => 'supplier.contact_phone',
            'clientEmail' => 'supplier.email',
        ],
    ],
];
```

### Symfony

Dans `config/packages/fne.yaml` :

```yaml
fne:
    mapping:
        invoice:
            clientCompanyName: 'customer.name'
            clientPhone: 'customer.phone_number'
            clientEmail: 'customer.email_address'
        purchase:
            clientCompanyName: 'supplier.company_name'
            clientPhone: 'supplier.contact_phone'
```

### PHP Natif

Dans `fne.php` :

```php
return [
    // ... autres configurations ...
    
    'mapping' => [
        'invoice' => [
            'clientCompanyName' => 'customer.name',
            'clientPhone' => 'customer.phone_number',
        ],
    ],
];
```

## Notation pointée

Le mapping supporte la notation pointée pour accéder aux propriétés imbriquées :

```php
'mapping' => [
    'invoice' => [
        // Accès direct
        'clientCompanyName' => 'customer_name',
        
        // Notation pointée pour propriétés imbriquées
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.contact.email',
        
        // Accès aux tableaux
        'pointOfSale' => 'point_of_sale.code',
        'establishment' => 'establishment.name',
    ],
],
```

## Exemple d'utilisation

### Sans mapping

Sans mapping personnalisé, vous devez restructurer vos données manuellement :

```php
// Données ERP
$erpData = [
    'customer' => [
        'name' => 'Entreprise Client',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'pos' => [
        'code' => 'POS-001',
    ],
];

// Restructuration manuelle
$fneData = [
    'clientCompanyName' => $erpData['customer']['name'],
    'clientPhone' => $erpData['customer']['phone'],
    'clientEmail' => $erpData['customer']['email'],
    'pointOfSale' => $erpData['pos']['code'],
    // ... autres champs ...
];
```

### Avec mapping

Avec le mapping personnalisé, vous pouvez utiliser directement vos données ERP :

```php
// Configuration du mapping (dans config/fne.php)
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.name',
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.email',
        'pointOfSale' => 'pos.code',
    ],
],

// Utilisation - les données sont automatiquement transformées
$erpData = [
    'customer' => [
        'name' => 'Entreprise Client',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'pos' => [
        'code' => 'POS-001',
    ],
    // ... autres champs FNE directement ...
];

// Le mapping est appliqué automatiquement
$result = FNE::invoice()->sign($erpData);
```

## Mapping avec modèles

Le mapping fonctionne également avec les modèles via les traits :

```php
use Neocode\FNE\Concerns\CertifiableInvoice;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use CertifiableInvoice;
    
    // Le mapping est appliqué automatiquement lors de l'extraction des données
}

// Utilisation
$invoice = Invoice::find(1);

// Les données du modèle sont automatiquement transformées selon le mapping
$result = $invoice->certify();
```

## Ordre de priorité

Le mapping personnalisé est appliqué **avant** le mapping standard. L'ordre de traitement est :

1. **Mapping personnalisé** : Transforme les clés ERP vers les clés FNE
2. **Fusion** : Les données mappées sont fusionnées avec les données originales
3. **Mapping standard** : Le mapping standard est appliqué sur les données fusionnées

## Champs non mappés

Les champs qui ne sont pas dans le mapping sont préservés tels quels. Vous pouvez donc :

- Mapper certains champs et laisser les autres en format FNE
- Combiner les deux approches dans la même structure de données

```php
$data = [
    // Champs mappés depuis ERP
    'customer' => [
        'name' => 'Entreprise Client',
        'phone' => '0123456789',
    ],
    
    // Champs déjà en format FNE
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2C->value,
    'items' => [
        // ... items en format FNE ...
    ],
];
```

## Désactiver le mapping

Pour désactiver le mapping pour un appel spécifique, vous pouvez passer directement les données en format FNE :

```php
// Les données sont déjà en format FNE, pas besoin de mapping
$fneData = [
    'clientCompanyName' => 'Entreprise Client',
    'clientPhone' => '0123456789',
    // ... autres champs FNE ...
];

$result = FNE::invoice()->sign($fneData);
```

## Exemples avancés

### Mapping conditionnel

Vous pouvez utiliser différents mappings selon le contexte :

```php
// Mapping pour factures B2B
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientNcc' => 'customer.ncc',
        'clientRccm' => 'customer.rccm',
    ],
],

// Les données ERP
$erpData = [
    'customer' => [
        'company_name' => 'Entreprise Client',
        'ncc' => '123456789',
        'rccm' => 'CI-ABJ-12345',
    ],
];
```

### Mapping avec valeurs par défaut

Si une valeur n'existe pas dans les données ERP, vous pouvez fournir une valeur par défaut dans votre code :

```php
$erpData = [
    'customer' => [
        'name' => 'Entreprise Client',
        // phone n'existe pas
    ],
];

// Fournir une valeur par défaut
$erpData['customer']['phone'] = $erpData['customer']['phone'] ?? '0000000000';
```

## Prochaines étapes

- **[Intégration modèles](/docs/guides/invoices#intégration-avec-modèles)** - Utilisez les traits pour intégration directe
- **[Gestion des erreurs](/docs/guides/error-handling)** - Gérez les erreurs de mapping
- **[Exemples](/docs/examples)** - Consultez plus d'exemples de mapping

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



