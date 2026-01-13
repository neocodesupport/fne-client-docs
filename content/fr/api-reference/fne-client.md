---
title: FNEClient
description: Référence API pour la classe principale FNEClient
order: 1
---

# FNEClient

La classe principale `FNEClient` est le point d'entrée pour toutes les opérations FNE.

## Installation

```php
use Neocode\FNE\FNEClient;
use Neocode\FNE\Config\FNEConfig;
use Neocode\FNE\Http\HttpClientFactory;
```

## Initialisation

### Laravel

```php
use Neocode\FNE\Facades\FNE;

// Utilisation via Facade
$result = FNE::invoice()->sign($data);
```

### Symfony

```php
use Neocode\FNE\FNEClient;

class InvoiceController
{
    public function __construct(
        private FNEClient $fneClient
    ) {}
    
    public function certify()
    {
        $result = $this->fneClient->invoice()->sign($data);
    }
}
```

### PHP Natif

```php
use Neocode\FNE\FNEClient;
use Neocode\FNE\Config\FNEConfig;
use Neocode\FNE\Http\HttpClientFactory;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'http://54.247.95.108/ws',
    'mode' => 'test',
]);

$httpClient = HttpClientFactory::create($config);
$fne = new FNEClient($httpClient, $config);
```

## Méthodes

### invoice()

Retourne le service pour les factures de vente.

```php
$invoiceService = $fne->invoice();
$result = $invoiceService->sign($data);
```

### purchase()

Retourne le service pour les bordereaux d'achat.

```php
$purchaseService = $fne->purchase();
$result = $purchaseService->submit($data);
```

### refund()

Retourne le service pour les avoirs.

```php
$refundService = $fne->refund();
$result = $refundService->issue($invoiceId, $items);
```

## Configuration

### getConfig()

Retourne la configuration actuelle.

```php
$config = $fne->getConfig();
echo $config->getApiKey();
echo $config->getBaseUrl();
```

## Exemple complet

```php
use Neocode\FNE\FNEClient;
use Neocode\FNE\Config\FNEConfig;
use Neocode\FNE\Http\HttpClientFactory;

$config = new FNEConfig([
    'api_key' => 'your-api-key',
    'base_url' => 'http://54.247.95.108/ws',
    'mode' => 'test',
]);

$httpClient = HttpClientFactory::create($config);
$fne = new FNEClient($httpClient, $config);

// Certifier une facture
$result = $fne->invoice()->sign($data);

// Certifier un bordereau d'achat
$result = $fne->purchase()->submit($data);

// Créer un avoir
$result = $fne->refund()->issue($invoiceId, $items);
```

## Voir aussi

- **[InvoiceService](/docs/api-reference/invoice-service)** - Service pour factures de vente
- **[PurchaseService](/docs/api-reference/purchase-service)** - Service pour bordereaux d'achat
- **[RefundService](/docs/api-reference/refund-service)** - Service pour avoirs

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



