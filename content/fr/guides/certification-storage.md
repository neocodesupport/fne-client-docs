---
title: Enregistrement automatique des certifications
description: Guide pour utiliser l'enregistrement automatique dans la table fne_certifications
order: 9
---

# Enregistrement automatique des certifications

FNE Client peut automatiquement enregistrer les certifications dans une table de base de données pour faciliter la gestion des factures certifiées et la création d'avoirs futurs.

## Vue d'ensemble

Lorsqu'une facture est certifiée avec succès, FNE Client peut automatiquement enregistrer les informations importantes dans la table `fne_certifications`. Cette fonctionnalité est particulièrement utile pour :

- **Créer des avoirs** : Les UUIDs FNE sont nécessaires pour créer des avoirs
- **Historique** : Conserver un historique des certifications
- **Recherche** : Rechercher facilement les factures certifiées
- **Rapports** : Générer des rapports sur les certifications

## Activation

### Via la configuration

```php
// config/fne.php
'features' => [
    'certification_table' => env('FNE_FEATURE_CERTIFICATION_TABLE', false),
],
```

Ou dans `.env` :

```env
FNE_FEATURE_CERTIFICATION_TABLE=true
```

### Via Laravel Pennant

```php
use Laravel\Pennant\Feature;

Feature::for($user)->activate('fne:certification-table');
```

### Forcer l'enregistrement explicitement

```php
// Forcer l'enregistrement même si la feature est désactivée
$response = $invoice->certify(null, true);

// Désactiver l'enregistrement même si la feature est activée
$response = $invoice->certify(null, false);
```

## Migration de la table

### Laravel

```bash
php artisan migrate
```

La migration est disponible dans `database/migrations/2024_01_01_000000_create_fne_certifications_table.php`.

### Symfony

Utilisez le fichier SQL fourni :

```bash
# MySQL
mysql -u user -p database < vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql

# PostgreSQL
psql -U user -d database -f vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql

# SQLite
sqlite3 database.db < vendor/neocode/fne-client/database/migrations/2024_01_01_000000_create_fne_certifications_table.sql
```

### PHP Natif

Utilisez le fichier SQL fourni avec votre système de gestion de base de données.

## Structure de la table

La table `fne_certifications` contient les colonnes suivantes :

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | BIGINT | ID interne (auto-increment) |
| `fne_invoice_id` | UUID | UUID FNE de la facture (⚠️ IMPORTANT pour avoirs) |
| `reference` | STRING | Référence FNE unique (ex: 9606123E25000000019) |
| `ncc` | STRING | Numéro Contribuable |
| `token` | STRING | Token de vérification QR code |
| `type` | ENUM | Type de document (invoice, refund) |
| `subtype` | ENUM | Sous-type (normal, refund) |
| `status` | ENUM | Statut paiement (paid, pending) |
| `template` | STRING | Template utilisé (B2C, B2B, B2F, B2G) |
| `client_company_name` | STRING | Nom de l'entreprise client |
| `client_ncc` | STRING | NCC du client |
| `client_phone` | STRING | Téléphone du client |
| `client_email` | STRING | Email du client |
| `amount` | BIGINT | Montant total TTC en centimes |
| `vat_amount` | BIGINT | Montant TVA en centimes |
| `fiscal_stamp` | BIGINT | Timbre fiscal en centimes |
| `discount` | DECIMAL | Remise globale en % |
| `is_rne` | BOOLEAN | Indique si l'entreprise est en RNE |
| `rne` | STRING | Numéro RNE |
| `source` | STRING | Source (api, mobile) |
| `warning` | BOOLEAN | Alerte si stock de stickers faible |
| `balance_sticker` | INTEGER | Nombre de stickers restants |
| `fne_date` | TIMESTAMP | Date de la facture FNE |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |

## Utilisation

### Avec le trait CertifiableInvoice

L'enregistrement est automatique si la feature est activée :

```php
use Neocode\FNE\Concerns\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certification avec enregistrement automatique
$invoice = Invoice::find(1);
$response = $invoice->certify(); // Enregistre automatiquement si activé
```

### Vérifier l'enregistrement

```php
use Neocode\FNE\Models\FNECertification;

$certification = FNECertification::where('reference', $response->reference)->first();

if ($certification) {
    echo "UUID FNE: {$certification->fne_invoice_id}";
    echo "Montant: " . ($certification->amount / 100) . " FCFA";
}
```

### Utiliser l'UUID pour créer un avoir

```php
// Récupérer l'UUID depuis la table
$certification = FNECertification::where('reference', '9606123E25000000019')->first();

// Utiliser l'UUID pour créer un avoir
$refund = FNE::refund()->issueRefund($certification->fne_invoice_id, [
    [
        'id' => $itemId, // UUID de l'item
        'quantity' => 1.0,
    ],
]);
```

## Compatibilité multi-framework

L'enregistrement automatique fonctionne avec :

- **Laravel** : Utilise Eloquent Model (`FNECertification`)
- **Symfony** : Utilise Doctrine EntityManager ou DBAL Connection
- **PHP Natif** : Utilise PDO directement

Le système détecte automatiquement le framework et utilise la méthode appropriée.

## Gestion des erreurs

Si l'enregistrement échoue (table inexistante, erreur SQL, etc.), la certification continue normalement. L'erreur est loggée mais n'affecte pas le processus de certification.

## Désactiver l'enregistrement

Si vous ne souhaitez pas utiliser cette fonctionnalité :

```php
// Dans config/fne.php
'features' => [
    'certification_table' => false,
],
```

Ou désactiver explicitement lors de la certification :

```php
$response = $invoice->certify(null, false);
```

## Voir aussi

- **[Factures de vente](/docs/guides/invoices)** - Guide complet sur les factures
- **[Avoirs](/docs/guides/refunds)** - Créer des avoirs avec les UUIDs enregistrés

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.
