---
title: Troubleshooting
description: Troubleshooting guide to resolve common issues
---

# Troubleshooting

This guide helps you resolve common issues with FNE Client.

## Common Problems

### Authentication Error

**Symptom:** `AuthenticationException` thrown

**Solutions:**
- Verify that your API key is correct
- Verify that the API key is properly set in `.env`
- Verify that the mode (test/production) matches your environment

### Validation Error

**Symptom:** `ValidationException` thrown

**Solutions:**
- Verify that all required fields are provided
- Verify that data types are correct
- Verify that enums use the correct values

### Mapping Error

**Symptom:** `MappingException` thrown

**Solutions:**
- Verify the mapping configuration in `config/fne.php`
- Verify that dot notation paths are correct
- Verify that ERP data matches the mapping

## See Also

- [Error Handling](/docs/guides/error-handling) - Complete guide on error handling
- [Logging](/docs/guides/logging) - Configure logging for debugging

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
