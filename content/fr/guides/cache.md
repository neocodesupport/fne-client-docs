---
title: Cache
description: Guide pour utiliser le cache avec FNE Client
order: 6
---

# Cache

Ce guide vous montre comment utiliser le cache avec FNE Client pour améliorer les performances.

## Vue d'ensemble

FNE Client supporte le cache via l'interface PSR-16. Le cache permet de stocker les réponses de l'API pour éviter des appels répétés.

## Configuration

### Laravel

Le cache utilise automatiquement le système de cache Laravel :

```php
// config/fne.php
return [
    'cache' => [
        'enabled' => true,
        'ttl' => 3600, // Durée de vie en secondes (1 heure)
    ],
];
```

### Symfony

Pour Symfony, vous pouvez utiliser le cache Symfony :

```yaml
# config/packages/fne.yaml
fne:
    cache:
        enabled: true
        ttl: 3600
```

### PHP Natif

Pour PHP natif, un cache en mémoire est utilisé par défaut. Vous pouvez implémenter votre propre cache en implémentant `CacheInterface`.

## Utilisation

Le cache est automatiquement utilisé lors des appels API :

```php
// Premier appel - requête API
$result1 = FNE::invoice()->sign($data);

// Deuxième appel avec les mêmes données - utilise le cache
$result2 = FNE::invoice()->sign($data); // Plus rapide, utilise le cache
```

## Clés de cache

Les clés de cache sont générées automatiquement à partir de l'endpoint et du payload :

```php
// Clé générée : 'fne:invoice:' . md5($endpoint . serialize($payload))
```

## Durée de vie (TTL)

La durée de vie du cache est configurable :

```php
// config/fne.php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // 1 heure
],
```

## Désactiver le cache

### Globalement

```php
// config/fne.php
'cache' => [
    'enabled' => false,
],
```

### Pour un appel spécifique

Le cache n'est pas utilisé pour les avoirs (refunds) par défaut, car ils modifient l'état.

## Cache personnalisé

Vous pouvez implémenter votre propre cache en implémentant `CacheInterface` :

```php
use Neocode\FNE\Contracts\CacheInterface;

class CustomCache implements CacheInterface
{
    public function get(string $key, mixed $default = null): mixed
    {
        // Votre logique de récupération
    }
    
    public function set(string $key, mixed $value, \DateInterval|int|null $ttl = null): bool
    {
        // Votre logique de stockage
    }
    
    // ... autres méthodes ...
}
```

## Prochaines étapes

- **[Logging](/docs/guides/logging)** - Configurez le logging
- **[Performance](/docs/advanced/performance)** - Optimisez les performances

---

**Besoin d'aide ?** Consultez la [documentation complète](/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.



