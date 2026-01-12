---
title: Real Use Cases
description: Real-world use case examples with FNE Client
---

# Real Use Cases

This page contains real-world use case examples with FNE Client.

## E-commerce: Automatic Certification

```php
class OrderController
{
    public function complete(Order $order)
    {
        // Automatically certify invoice when order is finalized
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
                    'amount' => $item->price * 100, // Convert to cents
                    'taxes' => [TaxType::TVA->value],
                ];
            })->toArray(),
            'taxes' => TaxType::TVA->value,
        ]);
        
        // Save FNE reference
        $order->update([
            'fne_reference' => $result->reference,
            'fne_token' => $result->token,
        ]);
        
        return $result;
    }
}
```

## ERP: Integration with Custom Mapping

```php
// Mapping configuration in config/fne.php
'mapping' => [
    'invoice' => [
        'clientCompanyName' => 'customer.company_name',
        'clientPhone' => 'customer.phone',
        'clientEmail' => 'customer.email',
    ],
],

// Usage with ERP data
$erpInvoice = [
    'customer' => [
        'company_name' => 'Client Company',
        'phone' => '0123456789',
        'email' => 'client@example.com',
    ],
    'invoiceType' => InvoiceType::SALE->value,
    // ... other FNE fields directly ...
];

// Mapping is applied automatically
$result = FNE::invoice()->sign($erpInvoice);
```

## SaaS: Subscription Invoice Generation

```php
class SubscriptionController
{
    public function generateInvoice(Subscription $subscription)
    {
        $result = FNE::invoice()->sign([
            'invoiceType' => InvoiceType::SALE->value,
            'paymentMethod' => PaymentMethod::DEFERRED->value, // Deferred payment
            'template' => InvoiceTemplate::B2B->value,
            'clientNcc' => $subscription->customer->ncc,
            'clientCompanyName' => $subscription->customer->company_name,
            'clientPhone' => $subscription->customer->phone,
            'clientEmail' => $subscription->customer->email,
            'items' => [
                [
                    'description' => "Subscription {$subscription->plan->name}",
                    'quantity' => 1,
                    'amount' => $subscription->amount * 100,
                    'taxes' => [TaxType::TVA->value],
                ],
            ],
            'taxes' => TaxType::TVA->value,
        ]);
        
        return $result;
    }
}
```

## Next Steps

- [Basic Examples](/docs/examples/basic) - Check out simple examples
- [Advanced Examples](/docs/examples/advanced) - Check out more complex examples
- [Guides](/docs/guides) - Learn advanced features

> [!info]
> **Need help?** Check out the [complete documentation](/docs) or [open an issue](https://github.com/neocode/fne-client/issues) on GitHub.
