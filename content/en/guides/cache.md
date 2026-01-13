---
title: Cache
description: Guide for using cache with FNE Client
---

# Cache

This guide shows you how to use cache with FNE Client to improve performance.

## Overview

FNE Client supports cache via the PSR-16 interface. Cache allows storing API responses to avoid repeated calls.

## Configuration

### Laravel

Cache automatically uses the Laravel cache system:

```php
// config/fne.php
return [
    'cache' => [
        'enabled' => true,
        'ttl' => 3600, // Time to live in seconds (1 hour)
    ],
];
```

### Symfony

For Symfony, you can use the Symfony cache:

```yaml
# config/packages/fne.yaml
fne:
    cache:
        enabled: true
        ttl: 3600
```

### Native PHP

For native PHP, an in-memory cache is used by default. You can implement your own cache by implementing `CacheInterface`.

## Usage

Cache is automatically used during API calls:

```php
// First call - API request
$result1 = FNE::invoice()->sign($data);

// Second call with the same data - uses cache
$result2 = FNE::invoice()->sign($data); // Faster, uses cache
```

## Cache Keys

Cache keys are automatically generated from the endpoint and payload:

```php
// Generated key: 'fne:invoice:' . md5($endpoint . serialize($payload))
```

## Time to Live (TTL)

Cache time to live is configurable:

```php
// config/fne.php
'cache' => [
    'enabled' => true,
    'ttl' => 3600, // 1 hour
],
```

## Disable Cache

### Globally

```php
// config/fne.php
'cache' => [
    'enabled' => false,
],
```

### For a Specific Call

Cache is not used for refunds by default, as they modify state.

## Custom Cache

You can implement your own cache by implementing `CacheInterface`:

```php
use Neocode\FNE\Contracts\CacheInterface;

class CustomCache implements CacheInterface
{
    public function get(string $key, mixed $default = null): mixed
    {
        // Your retrieval logic
    }
    
    public function set(string $key, mixed $value, \DateInterval|int|null $ttl = null): bool
    {
        // Your storage logic
    }
    
    // ... other methods ...
}
```

## Next Steps

- [Logging](/docs/guides/logging) - Configure logging
- [Performance](/docs/advanced/features) - Optimize performance

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
