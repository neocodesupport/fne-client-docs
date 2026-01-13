---
title: Exemples avancés
description: Exemples de code avancés avec FNE Client
order: 2
---

# Exemples avancés

Cette page contient des exemples de code avancés pour des cas d'usage complexes.

## Facture avec taxes personnalisées

```php
$result = FNE::invoice()->sign([
    // ... champs de base ...
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
    'customTaxes' => [
        [
            'name' => 'DTD',
            'amount' => 5.0, // 5% au niveau facture
        ],
    ],
]);
```

## Facture B2F avec devise étrangère

```php
use Neocode\FNE\Enums\ForeignCurrency;

$result = FNE::invoice()->sign([
    // ... champs de base ...
    'template' => InvoiceTemplate::B2F->value,
    'foreignCurrency' => ForeignCurrency::EUR->value,
    'foreignCurrencyRate' => 655.0, // Taux de change
    // ...
]);
```

## Facture avec remises

```php
$result = FNE::invoice()->sign([
    // ... champs de base ...
    'discount' => 10.0, // Remise globale de 10%
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

## Intégration avec modèles

```php
use Neocode\FNE\Concerns\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Utilisation
$invoice = Invoice::find(1);
$result = $invoice->certify(); // Extrait automatiquement les données
```

## Gestion d'erreurs complète

```php
use Neocode\FNE\Exceptions\ValidationException;
use Neocode\FNE\Exceptions\AuthenticationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Gérer l'erreur de validation
} catch (AuthenticationException $e) {
    // Gérer l'erreur d'authentification
} catch (\Exception $e) {
    // Gérer les autres erreurs
}
```

## Voir aussi

- **[Exemples basiques](/docs/examples/basic)** - Exemples simples pour démarrer
- **[Cas d'usage réels](/docs/examples/use-cases)** - Exemples de cas d'usage réels

---

**Besoin d'aide ?** Consultez la [documentation complète](/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.



