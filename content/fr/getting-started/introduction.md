---
title: Introduction
description: Découvrez FNE Client, le SDK PHP pour intégrer l'API FNE dans vos applications
order: 1
---

# Introduction

Bienvenue dans la documentation de **FNE Client**, le SDK PHP framework-agnostic pour l'intégration de l'API FNE (Facture Normalisée Électronique).

## Qu'est-ce que FNE Client ?

FNE Client est un SDK PHP moderne et intuitif qui simplifie l'intégration de l'API FNE dans vos applications PHP. Que vous utilisiez Laravel, Symfony ou PHP natif, FNE Client s'adapte à votre stack.

### Caractéristiques principales

- **Framework-Agnostic** : Compatible avec Laravel 11+, Symfony 7.4+ et PHP natif
- **Zero Configuration** : Installation en une commande avec détection automatique
- **Mapping Flexible** : Transformation de vos données ERP vers FNE avec notation pointée
- **Intégration Modèles** : Traits pour intégration directe avec vos modèles
- **Validation Robuste** : Validation automatique avant envoi à l'API
- **Enregistrement automatique** : Sauvegarde automatique des certifications dans la base de données
- **Production Ready** : 67 tests, gestion d'erreurs complète

## Pourquoi utiliser FNE Client ?

### Simplicité

```php
use Neocode\FNE\Facades\FNE;

// Certifier une facture en quelques lignes
$result = FNE::invoice()->sign([
    'invoiceType' => InvoiceType::SALE->value,
    'paymentMethod' => PaymentMethod::MOBILE_MONEY->value,
    // ...
]);
```

### Flexibilité

Le SDK supporte le mapping personnalisé pour transformer vos structures de données ERP vers le format FNE :

```php
// config/fne.php
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientPhone' => 'customer.phone',
    ],
],
```

### Intégration Modèles

Utilisez les traits fournis pour intégrer directement la certification dans vos modèles :

```php
use Neocode\FNE\Concerns\CertifiableInvoice;

class Invoice extends Model
{
    use CertifiableInvoice;
}

// Certifier directement depuis le modèle
$invoice->certify();
```

## Compatibilité

FNE Client est compatible avec :

- **Laravel 11+** : Service Provider, Façade et intégration complète
- **Symfony 7.4+** : Service Container et intégration native
- **PHP Natif** : Aucune dépendance framework requise

> [!success]
> **Prêt à commencer ?** Passez à la section [Installation](/fr/docs/getting-started/installation) pour installer FNE Client dans votre projet.

## Prochaines étapes

1. [Installation](/fr/docs/getting-started/installation) - Installez FNE Client dans votre projet
2. [Configuration](/fr/docs/getting-started/configuration) - Configurez le SDK pour votre environnement
3. [Démarrage rapide](/fr/docs/getting-started/quick-start) - Créez votre première facture certifiée

## Ressources

- [Documentation complète](/fr/docs)
- [Exemples de code](/fr/docs/examples)
- [Référence API](/fr/docs/api-reference)
- [GitHub](https://github.com/neocodesupport/fne-client)
