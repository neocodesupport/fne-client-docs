---
title: Avoirs
description: Guide complet pour créer des avoirs (remboursements) avec FNE Client
order: 3
---

# Avoirs

Ce guide vous montre comment créer des avoirs (remboursements) pour vos factures certifiées avec FNE Client.

## Vue d'ensemble

Un avoir est un document qui annule ou réduit le montant d'une facture précédemment certifiée. Pour créer un avoir, vous devez avoir l'UUID de la facture originale et les UUIDs des items à rembourser.

## ⚠️ Important : Sauvegarder les UUIDs

Pour créer un avoir, vous devez avoir sauvegardé :

1. **UUID de la facture** (`invoice.id`) de la facture originale
2. **UUIDs des items** (`item.id`) des articles à rembourser

Ces UUIDs sont retournés dans la réponse lors de la certification de la facture originale.

### Enregistrement automatique

FNE Client peut automatiquement enregistrer les certifications dans la table `fne_certifications` :

```php
use Neocode\FNE\Concerns\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certification avec enregistrement automatique
$invoice = Invoice::find(1);
$response = $invoice->certify(); // Enregistre automatiquement si activé

// Récupérer l'UUID depuis la table pour créer un avoir
$certification = \Neocode\FNE\Models\FNECertification::where('reference', $response->reference)->first();
$fneInvoiceId = $certification->fne_invoice_id; // UUID pour créer l'avoir
```

Pour plus d'informations, consultez le guide [Enregistrement automatique des certifications](/docs/guides/certification-storage).

## Créer un avoir complet

Un avoir complet rembourse toute la facture :

```php
use Neocode\FNE\Facades\FNE;

// UUID de la facture originale (récupéré depuis votre base de données)
$invoiceId = 'e2b2d8da-a532-4c08-9182-f5b428ca468d';

// UUIDs de tous les items (récupérés depuis votre base de données)
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e', // UUID de l'item
        'quantity' => 30.0, // Quantité à rembourser
    ],
    [
        'id' => 'another-item-uuid',
        'quantity' => 10.0,
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);

// La réponse pour un avoir
echo $result->ncc;              // Identifiant contribuable
echo $result->reference;         // Référence commençant par "A" (Avoir)
echo $result->token;             // URL de vérification QR code
echo $result->balanceSticker;    // Nombre de stickers restants

// ⚠️ IMPORTANT : invoice est toujours null pour les avoirs
// Seule la référence commence par "A"
```

## Créer un avoir partiel

Un avoir partiel rembourse seulement certains items ou une quantité partielle :

```php
// Rembourser seulement certains items
$items = [
    [
        'id' => 'bf9cc241-9b5f-4d26-a570-aa8e682a759e',
        'quantity' => 10.0, // Rembourser seulement 10 sur 30
    ],
];

$result = FNE::refund()->issue($invoiceId, $items);
```

## Structure de la réponse

La réponse d'un avoir a une structure différente de celle d'une facture :

```php
$result = FNE::refund()->issue($invoiceId, $items);

// Propriétés de base (identiques aux factures)
echo $result->ncc;              // "9606123E"
echo $result->reference;         // "A9606123E2500000006" (commence par "A")
echo $result->token;             // URL complète de vérification
echo $result->warning;           // false
echo $result->balanceSticker;    // 178

// ⚠️ IMPORTANT : invoice est TOUJOURS null pour les avoirs
// Contrairement aux factures, il n'y a pas d'objet invoice dans la réponse
if ($result->invoice === null) {
    echo "C'est un avoir"; // Toujours vrai pour les avoirs
}
```

## Vérifier si c'est un avoir

Vous pouvez vérifier si une réponse est un avoir :

```php
if ($result->isRefund()) {
    echo "C'est un avoir";
    echo "Référence : " . $result->reference; // Commence par "A"
}

// Ou vérifier manuellement
if (str_starts_with($result->reference, 'A')) {
    echo "C'est un avoir";
}
```

## Intégration avec modèles

Utilisez le trait `CertifiableRefund` :

```php
use Neocode\FNE\Concerns\CertifiableRefund;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use CertifiableRefund;
    
    // Le trait détecte automatiquement l'UUID FNE depuis :
    // - fne_id
    // - fne_invoice_id
    // - getFneInvoiceId()
}

// Utilisation
$invoice = Invoice::find(1);
$items = [
    [
        'id' => 'item-uuid-1',
        'quantity' => 10.0,
    ],
];

$result = $invoice->issueRefund($items);
```

## Gestion des erreurs

Les avoirs peuvent échouer dans plusieurs cas :

```php
use Neocode\FNE\Exceptions\ValidationException;
use Neocode\FNE\Exceptions\NotFoundException;

try {
    $result = FNE::refund()->issue($invoiceId, $items);
} catch (ValidationException $e) {
    // Erreur de validation (UUID invalide, quantité invalide, etc.)
    echo "Erreur de validation : " . $e->getMessage();
} catch (NotFoundException $e) {
    // Facture originale non trouvée
    echo "Facture non trouvée : " . $e->getMessage();
} catch (\Exception $e) {
    // Autre erreur
    echo "Erreur : " . $e->getMessage();
}
```

## Bonnes pratiques

1. **Sauvegardez toujours les UUIDs** : Lors de la certification d'une facture, sauvegardez toujours l'UUID de la facture et des items
2. **Vérifiez les quantités** : Assurez-vous que la quantité remboursée ne dépasse pas la quantité originale
3. **Gérez les avoirs partiels** : Vous pouvez créer plusieurs avoirs pour une même facture
4. **Stockez les références** : Sauvegardez la référence de l'avoir (commence par "A") pour traçabilité

## Exemple complet

```php
// 1. Certifier une facture originale
$invoiceResult = FNE::invoice()->sign($invoiceData);

// 2. Sauvegarder les UUIDs
$invoiceId = $invoiceResult->invoice->id;
$itemIds = array_map(fn($item) => $item->id, $invoiceResult->invoice->items);

DB::table('fne_certifications')->insert([
    'fne_invoice_id' => $invoiceId,
    'reference' => $invoiceResult->reference,
    'created_at' => now(),
]);

// 3. Plus tard, créer un avoir
$refundItems = [
    [
        'id' => $itemIds[0], // Premier item
        'quantity' => 5.0, // Rembourser 5 unités
    ],
];

$refundResult = FNE::refund()->issue($invoiceId, $refundItems);

// 4. Sauvegarder l'avoir
DB::table('fne_refunds')->insert([
    'fne_invoice_id' => $invoiceId,
    'reference' => $refundResult->reference, // Commence par "A"
    'created_at' => now(),
]);
```

## Prochaines étapes

- **[Gestion des erreurs](/docs/guides/error-handling)** - Gérez les erreurs efficacement
- **[Mapping ERP → FNE](/docs/guides/mapping)** - Transformez vos données ERP vers FNE
- **[Exemples](/docs/examples)** - Consultez plus d'exemples de code

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



