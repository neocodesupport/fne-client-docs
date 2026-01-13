---
title: Error Handling
description: Complete guide for handling errors with FNE Client
---

# Error Handling

This guide shows you how to handle errors with FNE Client efficiently.

## Overview

FNE Client uses typed exceptions to handle errors. Each error type has its own exception, making handling and debugging easier.

## Exception Hierarchy

```
FNEException (abstract)
├── ValidationException (422)
├── MappingException (500)
├── AuthenticationException (401)
├── BadRequestException (400)
├── NotFoundException (404)
└── ServerException (500+)
```

## Exception Types

### ValidationException

Thrown when provided data is invalid:

```php
use Neocode\FNE\Exceptions\ValidationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    // Validation error
    echo "Validation error: " . $e->getMessage();
    echo "Error code: " . $e->getErrorCode();
    echo "Detailed errors: ";
    print_r($e->getErrors());
}
```

### AuthenticationException

Thrown when authentication fails (invalid API key):

```php
use Neocode\FNE\Exceptions\AuthenticationException;

try {
    $result = FNE::invoice()->sign($data);
} catch (AuthenticationException $e) {
    // Authentication error
    echo "Authentication error: " . $e->getMessage();
    echo "Check your API key";
}
```

### BadRequestException

Thrown when the request is malformed (400):

```php
use Neocode\FNE\Exceptions\BadRequestException;

try {
    $result = FNE::invoice()->sign($data);
} catch (BadRequestException $e) {
    // Request error
    echo "Request error: " . $e->getMessage();
    echo "HTTP code: " . $e->getStatusCode();
}
```

### NotFoundException

Thrown when the resource is not found (404):

```php
use Neocode\FNE\Exceptions\NotFoundException;

try {
    $result = FNE::refund()->issue($invoiceId, $items);
} catch (NotFoundException $e) {
    // Invoice not found
    echo "Invoice not found: " . $e->getMessage();
}
```

### ServerException

Thrown when the server encounters an error (500+):

```php
use Neocode\FNE\Exceptions\ServerException;

try {
    $result = FNE::invoice()->sign($data);
} catch (ServerException $e) {
    // Server error
    echo "Server error: " . $e->getMessage();
    echo "Try again later";
}
```

### MappingException

Thrown when data mapping fails:

```php
use Neocode\FNE\Exceptions\MappingException;

try {
    $result = FNE::invoice()->sign($data);
} catch (MappingException $e) {
    // Mapping error
    echo "Mapping error: " . $e->getMessage();
}
```

## Complete Error Handling

### Complete Example

```php
use Neocode\FNE\Exceptions\ValidationException;
use Neocode\FNE\Exceptions\AuthenticationException;
use Neocode\FNE\Exceptions\BadRequestException;
use Neocode\FNE\Exceptions\NotFoundException;
use Neocode\FNE\Exceptions\ServerException;
use Neocode\FNE\Exceptions\MappingException;
use Neocode\FNE\Exceptions\FNEException;

try {
    $result = FNE::invoice()->sign($data);
    
    // Success
    return response()->json([
        'success' => true,
        'data' => $result->toArray(),
    ]);
    
} catch (ValidationException $e) {
    // Validation error (422)
    return response()->json([
        'success' => false,
        'error' => 'validation_error',
        'message' => $e->getMessage(),
        'errors' => $e->getErrors(),
    ], 422);
    
} catch (AuthenticationException $e) {
    // Authentication error (401)
    return response()->json([
        'success' => false,
        'error' => 'authentication_error',
        'message' => 'Invalid API key',
    ], 401);
    
} catch (BadRequestException $e) {
    // Request error (400)
    return response()->json([
        'success' => false,
        'error' => 'bad_request',
        'message' => $e->getMessage(),
    ], 400);
    
} catch (NotFoundException $e) {
    // Resource not found (404)
    return response()->json([
        'success' => false,
        'error' => 'not_found',
        'message' => $e->getMessage(),
    ], 404);
    
} catch (ServerException $e) {
    // Server error (500+)
    return response()->json([
        'success' => false,
        'error' => 'server_error',
        'message' => 'A server error occurred. Please try again later.',
    ], 500);
    
} catch (MappingException $e) {
    // Mapping error (500)
    return response()->json([
        'success' => false,
        'error' => 'mapping_error',
        'message' => $e->getMessage(),
    ], 500);
    
} catch (FNEException $e) {
    // Other FNE error
    return response()->json([
        'success' => false,
        'error' => 'fne_error',
        'message' => $e->getMessage(),
    ], $e->getStatusCode());
    
} catch (\Exception $e) {
    // Unexpected error
    Log::error('Unexpected FNE error', [
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString(),
    ]);
    
    return response()->json([
        'success' => false,
        'error' => 'unexpected_error',
        'message' => 'An unexpected error occurred.',
    ], 500);
}
```

## Error Format

All FNE exceptions implement a `toArray()` method to get a standardized format:

```php
try {
    $result = FNE::invoice()->sign($data);
} catch (FNEException $e) {
    $errorArray = $e->toArray();
    
    /*
    [
        'message' => 'Translated error message',
        'error' => 'error_code',
        'status_code' => 422,
        'errors' => [...], // Detailed errors (if available)
        'meta' => [
            'timestamp' => '2025-01-14T16:59:11.016Z',
            'request_id' => 'req_1234567890',
        ],
    ]
    */
}
```

## Localized Error Messages

Error messages are automatically localized according to the configuration:

```php
// Configuration in config/fne.php
'locale' => 'en', // or 'fr'

// Error messages will be in English or French according to the configuration
try {
    $result = FNE::invoice()->sign($data);
} catch (ValidationException $e) {
    echo $e->getMessage(); // Message in English if locale = 'en'
}
```

## Error Logging

FNE Client automatically logs errors if a logger is configured:

```php
// Errors are automatically logged via the configured logger
try {
    $result = FNE::invoice()->sign($data);
} catch (FNEException $e) {
    // The error has already been logged automatically
    // You can also log manually if necessary
    Log::error('FNE Error', [
        'exception' => $e->getMessage(),
        'code' => $e->getErrorCode(),
        'status' => $e->getStatusCode(),
    ]);
}
```

## Auto Retry

For temporary server errors, you can implement a retry:

```php
use Neocode\FNE\Exceptions\ServerException;

$maxRetries = 3;
$retryCount = 0;

while ($retryCount < $maxRetries) {
    try {
        $result = FNE::invoice()->sign($data);
        break; // Success
    } catch (ServerException $e) {
        $retryCount++;
        
        if ($retryCount >= $maxRetries) {
            throw $e; // Failure after all attempts
        }
        
        // Wait before retrying (exponential backoff)
        sleep(pow(2, $retryCount));
    }
}
```

## Best Practices

1. **Always handle exceptions**: Never leave FNE exceptions unhandled
2. **Use specific types**: Use specific exceptions rather than generic `FNEException`
3. **Log errors**: Log errors for debugging
4. **User messages**: Display user-friendly messages rather than technical messages
5. **Retry for server errors**: Implement retry for temporary server errors

## Next Steps

- [Cache](/docs/guides/cache) - Use cache to improve performance
- [Logging](/docs/guides/logging) - Configure logging for debugging
- [Examples](/docs/examples) - Check out more error handling examples

> [!info]
> **Need help?** Check out the [complete documentation](https://fne-client.neocode.ci/) or [open an issue](https://github.com/neocodesupport/fne-client/issues) on GitHub.
