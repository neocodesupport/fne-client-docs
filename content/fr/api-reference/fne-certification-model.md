---
title: FNECertification Model
description: Modèle Eloquent pour la table fne_certifications
order: 8
---

# FNECertification Model

Le modèle `FNECertification` représente la table `fne_certifications` dans Laravel.

## Utilisation

```php
use Neocode\FNE\Models\FNECertification;

// Trouver une certification par référence
$certification = FNECertification::where('reference', '9606123E25000000019')->first();

// Trouver toutes les certifications d'un client
$certifications = FNECertification::where('client_ncc', '123456789')->get();

// Trouver les certifications en attente de paiement
$pending = FNECertification::where('status', 'pending')->get();
```

## Propriétés principales

### Identifiants

- `id` : ID interne (auto-increment)
- `fne_invoice_id` : UUID FNE de la facture (⚠️ IMPORTANT pour avoirs)
- `reference` : Référence FNE unique
- `ncc` : Numéro Contribuable
- `token` : Token de vérification QR code

### Informations document

- `type` : Type de document (`invoice`, `refund`)
- `subtype` : Sous-type (`normal`, `refund`)
- `status` : Statut paiement (`paid`, `pending`)
- `template` : Template utilisé (`B2C`, `B2B`, `B2F`, `B2G`)

### Informations client

- `client_company_name` : Nom de l'entreprise client
- `client_ncc` : NCC du client
- `client_phone` : Téléphone du client
- `client_email` : Email du client

### Montants (en centimes)

- `amount` : Montant total TTC en centimes
- `vat_amount` : Montant TVA en centimes
- `fiscal_stamp` : Timbre fiscal en centimes
- `discount` : Remise globale en %

### Métadonnées

- `is_rne` : Indique si l'entreprise est en RNE
- `rne` : Numéro RNE
- `source` : Source (`api`, `mobile`)
- `warning` : Alerte si stock de stickers faible
- `balance_sticker` : Nombre de stickers restants
- `fne_date` : Date de la facture FNE

## Exemples d'utilisation

### Récupérer l'UUID pour créer un avoir

```php
$certification = FNECertification::where('reference', $reference)->first();

if ($certification) {
    $fneInvoiceId = $certification->fne_invoice_id; // UUID pour créer l'avoir
}
```

### Calculer les montants en FCFA

```php
$certification = FNECertification::find(1);

$amountFCFA = $certification->amount / 100;        // Montant TTC en FCFA
$vatAmountFCFA = $certification->vat_amount / 100;  // TVA en FCFA
$stampFCFA = $certification->fiscal_stamp / 100;   // Timbre fiscal en FCFA
```

### Rechercher les certifications récentes

```php
// Certifications des 30 derniers jours
$recent = FNECertification::where('created_at', '>=', now()->subDays(30))->get();

// Certifications par template
$b2b = FNECertification::where('template', 'B2B')->get();
```

### Statistiques

```php
// Nombre total de certifications
$total = FNECertification::count();

// Montant total certifié
$totalAmount = FNECertification::sum('amount') / 100; // En FCFA

// Certifications en attente de paiement
$pendingCount = FNECertification::where('status', 'pending')->count();
```

## Relations (si nécessaire)

Vous pouvez ajouter des relations dans votre modèle personnalisé :

```php
use Neocode\FNE\Models\FNECertification;

class CustomFNECertification extends FNECertification
{
    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'fne_invoice_id', 'fne_id');
    }
}
```

## Voir aussi

- **[Enregistrement automatique des certifications](/docs/guides/certification-storage)** - Guide complet
- **[CertificationStorage](/docs/api-reference/certification-storage)** - Classe de stockage

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.
