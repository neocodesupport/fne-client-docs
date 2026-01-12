---
title: Logging
description: Guide pour configurer le logging avec FNE Client
order: 7
---

# Logging

Ce guide vous montre comment configurer le logging avec FNE Client pour le débogage et le suivi.

## Vue d'ensemble

FNE Client supporte le logging via l'interface PSR-3. Les logs permettent de suivre les appels API et de déboguer les problèmes.

## Configuration

### Laravel

Le logging utilise automatiquement le système de logging Laravel :

```php
// Les logs sont automatiquement enregistrés via Log::info(), Log::error(), etc.
```

### Symfony

Pour Symfony, utilisez Monolog :

```yaml
# config/packages/fne.yaml
services:
    Neocode\FNE\Contracts\LoggerInterface:
        alias: logger
```

### PHP Natif

Pour PHP natif, vous pouvez implémenter votre propre logger en implémentant `LoggerInterface`.

## Niveaux de log

FNE Client utilise les niveaux de log suivants :

- **debug** : Informations de débogage détaillées
- **info** : Informations générales (appels API réussis)
- **warning** : Avertissements (stock de stickers faible)
- **error** : Erreurs (exceptions, échecs d'appels API)

## Exemples de logs

### Appel API réussi

```
[INFO] Sending request to: /external/invoices/sign
[INFO] Request successful: {"reference": "9606123E25000000019", ...}
```

### Erreur API

```
[ERROR] FNE Error: Validation failed
[ERROR] Endpoint: /external/invoices/sign
[ERROR] Exception: ValidationException
```

## Logger personnalisé

Vous pouvez implémenter votre propre logger :

```php
use Neocode\FNE\Contracts\LoggerInterface;
use Psr\Log\LoggerInterface as PsrLoggerInterface;

class CustomLogger implements LoggerInterface
{
    public function emergency(string $message, array $context = []): void
    {
        // Votre logique
    }
    
    // ... autres méthodes ...
}
```

## Prochaines étapes

- **[Gestion des erreurs](/docs/guides/error-handling)** - Gérez les erreurs efficacement
- **[Troubleshooting](/docs/advanced/troubleshooting)** - Résolvez les problèmes

---

**Besoin d'aide ?** Consultez la [documentation complète](/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.



