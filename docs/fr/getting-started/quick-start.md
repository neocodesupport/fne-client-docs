---
title: Démarrage rapide
description: Créez votre première facture certifiée en quelques minutes
order: 4
---

# Démarrage rapide

Ce guide vous montre comment créer votre première facture certifiée avec FNE Client en quelques minutes.

## Prérequis

- FNE Client installé et configuré (voir [Installation](/fr/docs/getting-started/installation))
- Une clé API FNE valide
- PHP 8.2 ou supérieur

## Exemple basique : Facture B2C

### Laravel

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
            'amount' => 5000.0, // Prix unitaire HT en centimes (50.00 FCFA)
            'taxes' => [TaxType::TVA->value],
        ],
        [
            'description' => 'Produit 2',
            'quantity' => 1,
            'amount' => 10000.0, // Prix unitaire HT en centimes (100.00 FCFA)
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);

// Accéder aux résultats
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "9606123E25000000019"
echo $result->token;             // URL complète de vérification QR code
echo $result->balanceSticker;    // Nombre de stickers restants

// Informations de la facture
if ($result->invoice) {
    $invoice = $result->invoice;
    echo $invoice->id;           // UUID de la facture (important pour avoirs futurs)
    echo $invoice->amount;       // Montant total TTC en centimes
    echo $invoice->vatAmount;    // Montant TVA en centimes
}
```

### Symfony

```php
use Neocode\FNE\FNEClient;
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;
use Neocode\FNE\Enums\TaxType;

class InvoiceController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}
    
    public function certify(): Response
    {
        $result = $this->fneClient->invoice()->sign([
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
        
        return new JsonResponse($result->toArray());
    }
}
```

### PHP Natif

```php
require_once 'vendor/autoload.php';

use Neocode\FNE\FNEClient;
use Neocode\FNE\Config\FNEConfig;
use Neocode\FNE\Http\HttpClientFactory;
use Neocode\FNE\Enums\InvoiceType;
use Neocode\FNE\Enums\PaymentMethod;
use Neocode\FNE\Enums\InvoiceTemplate;
use Neocode\FNE\Enums\TaxType;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'https://fne-api-mock.test',
    'mode' => 'test',
]);

$httpClient = HttpClientFactory::create($config);
$fne = new FNEClient($httpClient, $config);

$result = $fne->invoice()->sign([
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

## Exemple avec facture B2B

Pour une facture B2B, vous devez fournir le `clientNcc` :

```php
$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    'template' => InvoiceTemplate::B2B->value, // B2B au lieu de B2C
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
            'amount' => 100000.0, // 1000.00 FCFA HT
            'taxes' => [TaxType::TVA->value],
        ],
    ],
    'taxes' => TaxType::TVA->value,
]);
```

## Gestion des erreurs

FNE Client lance des exceptions typées en cas d'erreur :

```php
use Neocode\FNE\Exceptions\ValidationException;
use Neocode\FNE\Exceptions\AuthenticationException;
use Neocode\FNE\Exceptions\BadRequestException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Erreur de validation des données
    echo "Erreur de validation : " . $e->getMessage();
} catch (AuthenticationException $e) {
    // Erreur d'authentification (clé API invalide)
    echo "Erreur d'authentification : " . $e->getMessage();
} catch (BadRequestException $e) {
    // Erreur dans la requête
    echo "Erreur de requête : " . $e->getMessage();
} catch (\Exception $e) {
    // Autre erreur
    echo "Erreur : " . $e->getMessage();
}
```

## Prochaines étapes

Maintenant que vous avez créé votre première facture :

1. [Guides - Factures de vente](/fr/docs/guides/invoices) - Apprenez les fonctionnalités avancées
2. [Guides - Bordereaux d'achat](/fr/docs/guides/purchases) - Certifiez des bordereaux d'achat
3. [Guides - Avoirs](/fr/docs/guides/refunds) - Créez des avoirs pour vos factures
4. [Exemples](/fr/docs/examples) - Consultez plus d'exemples de code

> [!info]
> **Besoin d'aide ?** Consultez la [documentation complète](/fr/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.
