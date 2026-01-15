---
title: CertificationStorage
description: Classe pour gérer l'enregistrement automatique des certifications
order: 7
---

# CertificationStorage

La classe `CertificationStorage` gère l'enregistrement automatique des certifications dans la table `fne_certifications`.

## Méthodes

### save()

Enregistre une certification dans la table `fne_certifications`.

```php
use Neocode\FNE\Storage\CertificationStorage;
use Neocode\FNE\DTOs\ResponseDTO;

$success = CertificationStorage::save($response, $invoiceData);
```

**Paramètres :**
- `ResponseDTO $response` : Réponse de certification
- `array $invoiceData` : Données de la facture originale

**Retourne :** `bool` - `true` si enregistré avec succès, `false` sinon

## Compatibilité

- **Laravel** : Utilise Eloquent Model
- **Symfony** : Utilise Doctrine EntityManager ou DBAL Connection
- **PHP Natif** : Utilise PDO directement

## Détection automatique

La classe détecte automatiquement le framework utilisé et utilise la méthode appropriée :

```php
// Laravel
if (self::isLaravel()) {
    return self::saveLaravel($response, $invoiceData);
}

// Symfony
if (self::isSymfony()) {
    return self::saveSymfony($response, $invoiceData);
}

// PHP Natif
return self::saveNativePHP($response, $invoiceData);
```

## Gestion des erreurs

Si l'enregistrement échoue, la méthode retourne `false` et l'erreur est loggée. La certification continue normalement.

## Voir aussi

- **[Enregistrement automatique des certifications](/docs/guides/certification-storage)** - Guide complet
- **[FNECertification Model](/docs/api-reference/fne-certification-model)** - Modèle Eloquent

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.
