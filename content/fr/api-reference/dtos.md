---
title: DTOs
description: Référence complète des DTOs (Data Transfer Objects)
order: 6
---

# DTOs

Les DTOs (Data Transfer Objects) permettent de manipuler les données de manière type-safe.

## ResponseDTO

Réponse complète de l'API FNE.

```php
use Neocode\FNE\DTOs\ResponseDTO;

$result = FNE::invoice()->sign($data);

// Propriétés
$result->ncc              // string - Identifiant contribuable
$result->reference        // string - Numéro de référence FNE
$result->token            // string - URL de vérification QR code
$result->warning          // bool - Alerte si stock faible
$result->balanceSticker   // int - Nombre de stickers restants
$result->invoice          // ?InvoiceResponseDTO - Informations facture (null pour avoirs)

// Méthodes
$result->isInvoice()      // bool - Vérifie si c'est une facture
$result->isRefund()       // bool - Vérifie si c'est un avoir
$result->toArray()        // array - Convertit en tableau
```

## InvoiceResponseDTO

Informations de facture dans la réponse.

```php
if ($result->invoice) {
    $invoice = $result->invoice;
    
    // Propriétés principales
    $invoice->id                    // string - UUID FNE (IMPORTANT pour avoirs)
    $invoice->amount                // int - Montant total TTC en centimes
    $invoice->vatAmount            // int - Montant TVA en centimes
    $invoice->clientCompanyName    // string
    $invoice->items                // array<InvoiceItemResponseDTO>
    
    // Méthodes
    $invoice->getAmountInFCFA()    // float - Montant en FCFA
    $invoice->getVatAmountInFCFA()  // float - TVA en FCFA
}
```

## InvoiceItemResponseDTO

Informations d'un article de facture.

```php
foreach ($result->invoice->items as $item) {
    $item->id              // string - UUID de l'item (IMPORTANT pour avoirs)
    $item->description     // string
    $item->quantity        // float
    $item->amount          // int - Prix unitaire HT en centimes
    $item->taxes           // array<TaxResponseDTO>
    
    // Méthodes
    $item->getAmountInFCFA() // float - Prix unitaire HT en FCFA
}
```

## Conversion en tableau

Tous les DTOs peuvent être convertis en tableau :

```php
$array = $result->toArray();
$json = json_encode($result); // Implémente JsonSerializable
```

---

**Besoin d'aide ?** Consultez la [documentation complète](/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.



