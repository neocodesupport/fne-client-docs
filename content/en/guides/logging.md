---
title: Logging
description: Guide for configuring logging with FNE Client
---

# Logging

This guide shows you how to configure logging with FNE Client for debugging and monitoring.

## Overview

FNE Client supports logging via the PSR-3 interface. Logs allow tracking API calls and debugging issues.

## Configuration

### Laravel

Logging automatically uses the Laravel logging system:

```php
// Logs are automatically recorded via Log::info(), Log::error(), etc.
```

### Symfony

For Symfony, use Monolog:

```yaml
# config/packages/fne.yaml
services:
    Neocode\FNE\Contracts\LoggerInterface:
        alias: logger
```

### Native PHP

For native PHP, you can implement your own logger by implementing `LoggerInterface`.

## Log Levels

FNE Client uses the following log levels:

- **debug**: Detailed debugging information
- **info**: General information (successful API calls)
- **warning**: Warnings (low sticker stock)
- **error**: Errors (exceptions, failed API calls)

## Log Examples

### Successful API Call

```
[INFO] Sending request to: /external/invoices/sign
[INFO] Request successful: {"reference": "9606123E25000000019", ...}
```

### API Error

```
[ERROR] FNE Error: Validation failed
[ERROR] Endpoint: /external/invoices/sign
[ERROR] Exception: ValidationException
```

## Custom Logger

You can implement your own logger:

```php
use Neocode\FNE\Contracts\LoggerInterface;
use Psr\Log\LoggerInterface as PsrLoggerInterface;

class CustomLogger implements LoggerInterface
{
    public function emergency(string $message, array $context = []): void
    {
        // Your logic
    }
    
    // ... other methods ...
}
```

## Next Steps

- [Error Handling](/docs/guides/error-handling) - Handle errors efficiently
- [Troubleshooting](/docs/advanced/troubleshooting) - Resolve issues

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
