---
title: Cas d'usage réels
description: Exemples de cas d'usage réels avec FNE Client
order: 3
---

# Cas d'usage réels

Cette page contient des exemples de cas d'usage réels avec FNE Client.

## E-commerce : Certification automatique

```php
class OrderController
{
    public function complete(Order $order)
    {
        // Certifier automatiquement la facture lors de la finalisation de la commande
        $result = FNE::invoice()->sign([
            'invoiceType' => InvoiceType::SALE->value,
            'paymentMethod' => $this->mapPaymentMethod($order->payment_method),
            'template' => $order->customer->isCompany() 
                ? InvoiceTemplate::B2B->value 
                : InvoiceTemplate::B2C->value,
            'clientCompanyName' => $order->customer->name,
            'clientPhone' => $order->customer->phone,
            'clientEmail' => $order->customer->email,
            'items' => $order->items->map(function ($item) {
                return [
                    'description' => $item->product->name,
                    'quantity' => $item->quantity,
                    'amount' => $item->price * 100, // Convertir en centimes
                    'taxes' => [TaxType::TVA->value],
                ];
            })->toArray(),
            'taxes' => TaxType::TVA->value,
        ]);
        
        // Sauvegarder la référence FNE
        $order->update([
            'fne_reference' => $result->reference,
            'fne_token' => $result->token,
        ]);
        
        return $result;
    }
}
```

## ERP : Intégration avec mapping personnalisé

```php
// Configuration du mapping dans config/fne.php
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.email',
    ],
],

// Utilisation avec données ERP
$erpInvoice = [
    'customer' => [
        'company_name' => 'Entreprise Client',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'invoiceType' => InvoiceType::SALE->value,
    // ... autres champs FNE directement ...
];

// Le mapping est appliqué automatiquement
$result = FNE::invoice()->sign($erpInvoice);
```

## SaaS : Génération de factures d'abonnement

```php
class SubscriptionController
{
    public function generateInvoice(Subscription $subscription)
    {
        $result = FNE::invoice()->sign([
            'invoiceType' => InvoiceType::SALE->value,
            'paymentMethod' => PaymentMethod::DEFERRED->value, // Paiement à terme
            'template' => InvoiceTemplate::B2B->value,
            'clientNcc' => $subscription->customer->ncc,
            'clientCompanyName' => $subscription->customer->company_name,
            'clientPhone' => $subscription->customer->phone,
            'clientEmail' => $subscription->customer->email,
            'items' => [
                [
                    'description' => "Abonnement {$subscription->plan->name}",
                    'quantity' => 1,
                    'amount' => $subscription->amount * 100,
                    'taxes' => [TaxType::TVA->value],
                ],
            ],
            'taxes' => TaxType::TVA->value,
        ]);
        
        // Créer l'enregistrement de facture
        Invoice::create([
            'subscription_id' => $subscription->id,
            'fne_reference' => $result->reference,
            'fne_token' => $result->token,
            'amount' => $result->invoice->amount / 100,
        ]);
        
        return $result;
    }
}
```

## Voir aussi

- **[Exemples basiques](/docs/examples/basic)** - Exemples simples pour démarrer
- **[Exemples avancés](/docs/examples/advanced)** - Exemples plus complexes

---

**Besoin d'aide ?** Consultez la [documentation complète](https://fne-client.neocode.ci/) ou [ouvrez une issue](https://github.com/neocodesupport/fne-client/issues) sur GitHub.



