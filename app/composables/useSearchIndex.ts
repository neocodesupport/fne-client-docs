interface SearchIndexItem {
  _path: string
  title: string
  description?: string
  category: string
  locale: 'en' | 'fr'
}

// Index statique des pages de documentation
const searchIndex: SearchIndexItem[] = [
  // English pages
  { _path: '/docs/getting-started/introduction', title: 'Introduction', description: 'Discover FNE Client, the framework-agnostic PHP SDK for integrating the FNE (Facture Normalisée Électronique) API. Learn about features, compatibility with Laravel, Symfony, and native PHP, model integration, validation, and why to use this modern SDK.', category: 'Getting Started', locale: 'en' },
  { _path: '/docs/getting-started/installation', title: 'Installation', description: 'Installation guide for FNE Client. Step-by-step instructions for Laravel 11+, Symfony 7.4+, and native PHP. Learn how to use Composer, run installation commands, configure environment variables, and verify your installation.', category: 'Getting Started', locale: 'en' },
  { _path: '/docs/getting-started/configuration', title: 'Configuration', description: 'Configuration guide for FNE Client. Set up API keys, base URLs, timeouts, cache settings, locale, and environment variables. Configure for Laravel, Symfony, or native PHP projects.', category: 'Getting Started', locale: 'en' },
  { _path: '/docs/getting-started/quick-start', title: 'Quick Start', description: 'Create your first certified invoice in minutes. Quick start guide with code examples for Laravel, Symfony, and native PHP. Learn how to sign invoices, handle B2C and B2B invoices, and manage errors.', category: 'Getting Started', locale: 'en' },
  
  { _path: '/docs/guides/invoices', title: 'Invoices', description: 'Complete guide for certifying sales invoices with FNE Client. Learn how to create B2C and B2B invoices, use InvoiceService, handle invoice types, payment methods, templates, taxes, items, and retrieve invoice data.', category: 'Guides', locale: 'en' },
  { _path: '/docs/guides/purchases', title: 'Purchase Orders', description: 'Complete guide for creating and submitting purchase orders (bordereaux d\'achat) with FNE Client. Learn how to use PurchaseService, submit purchase data, and handle purchase order certification.', category: 'Guides', locale: 'en' },
  { _path: '/docs/guides/refunds', title: 'Refunds', description: 'Complete guide for creating refunds and credit notes (avoirs) with FNE Client. Learn how to use RefundService, issue refunds for invoices, handle refund data, and manage credit note creation.', category: 'Guides', locale: 'en' },
  { _path: '/docs/guides/mapping', title: 'Mapping ERP → FNE', description: 'Complete guide for mapping your ERP data to FNE format. Learn how to transform data structures, use dot notation mapping, configure field mappings, and integrate with your existing ERP systems.', category: 'Guides', locale: 'en' },
  { _path: '/docs/guides/error-handling', title: 'Error Handling', description: 'Complete guide for handling errors with FNE Client. Learn about ValidationException, AuthenticationException, BadRequestException, error messages, error handling patterns, and best practices for debugging.', category: 'Guides', locale: 'en' },
  { _path: '/docs/guides/cache', title: 'Cache', description: 'Guide for configuring and using cache with FNE Client. Learn how to enable caching, set TTL values, configure cache drivers, and optimize API call performance with caching strategies.', category: 'Guides', locale: 'en' },
  { _path: '/docs/guides/logging', title: 'Logging', description: 'Guide for configuring logging with FNE Client. Set up log levels, configure logging for Laravel, Symfony, and native PHP. Learn how to debug API calls, track requests, and monitor application behavior.', category: 'Guides', locale: 'en' },
  { _path: '/docs/guides/i18n', title: 'Internationalization (i18n)', description: 'Guide for using internationalization with FNE Client. Configure locale settings, translate error messages, change locale globally or per call, and support multiple languages in your application.', category: 'Guides', locale: 'en' },
  
  { _path: '/docs/examples/basic', title: 'Basic Examples', description: 'Basic code examples to get started with FNE Client. Simple examples for creating invoices, handling basic operations, and understanding the SDK fundamentals. Perfect for beginners.', category: 'Examples', locale: 'en' },
  { _path: '/docs/examples/advanced', title: 'Advanced Examples', description: 'Advanced code examples with FNE Client. Complex scenarios, batch processing, custom configurations, model integration, advanced mapping, and sophisticated use cases for experienced developers.', category: 'Examples', locale: 'en' },
  { _path: '/docs/examples/use-cases', title: 'Real Use Cases', description: 'Real use case examples with FNE Client. E-commerce integration, subscription management, invoice generation workflows, ERP integration patterns, and production-ready implementations.', category: 'Examples', locale: 'en' },
  
  { _path: '/docs/api-reference/fne-client', title: 'FNEClient', description: 'API reference for the main FNEClient class. Learn about the entry point for all FNE operations, initialization, configuration, service access, and how to use the client in different frameworks.', category: 'API Reference', locale: 'en' },
  { _path: '/docs/api-reference/invoice-service', title: 'InvoiceService', description: 'API reference for the InvoiceService class. Complete documentation for the sign() method, invoice certification, parameters, return values, and all available methods for sales invoice operations.', category: 'API Reference', locale: 'en' },
  { _path: '/docs/api-reference/purchase-service', title: 'PurchaseService', description: 'API reference for the PurchaseService class. Complete documentation for the submit() method, purchase order submission, parameters, return values, and purchase order management.', category: 'API Reference', locale: 'en' },
  { _path: '/docs/api-reference/refund-service', title: 'RefundService', description: 'API reference for the RefundService class. Complete documentation for the issue() method, refund creation, credit note generation, parameters, and refund management operations.', category: 'API Reference', locale: 'en' },
  { _path: '/docs/api-reference/dtos', title: 'DTOs', description: 'Complete reference of DTOs (Data Transfer Objects) in FNE Client. Learn about ResponseDTO, InvoiceDTO, PurchaseDTO, RefundDTO, and all data transfer objects with their properties and methods.', category: 'API Reference', locale: 'en' },
  { _path: '/docs/api-reference/enums', title: 'Enums', description: 'Complete reference of available enums in FNE Client. InvoiceType, PaymentMethod, InvoiceTemplate, TaxType, and all enumeration types with their values and usage examples.', category: 'API Reference', locale: 'en' },
  
  { _path: '/docs/advanced/features', title: 'Features (Laravel Pennant)', description: 'Guide for using Laravel Pennant features with FNE Client. Learn how to enable and disable features, configure feature flags, use advanced mapping, batch processing, and webhooks functionality.', category: 'Advanced', locale: 'en' },
  { _path: '/docs/advanced/troubleshooting', title: 'Troubleshooting', description: 'Troubleshooting guide for common issues with FNE Client. Solutions for authentication problems, validation errors, API connection issues, configuration problems, and debugging tips.', category: 'Advanced', locale: 'en' },
  
  // French pages
  { _path: '/fr/docs/getting-started/introduction', title: 'Introduction', description: 'Découvrez FNE Client, le SDK PHP framework-agnostic pour intégrer l\'API FNE (Facture Normalisée Électronique). Apprenez les fonctionnalités, la compatibilité avec Laravel, Symfony et PHP natif, l\'intégration de modèles, la validation et pourquoi utiliser ce SDK moderne.', category: 'Démarrage', locale: 'fr' },
  { _path: '/fr/docs/getting-started/installation', title: 'Installation', description: 'Guide d\'installation de FNE Client. Instructions étape par étape pour Laravel 11+, Symfony 7.4+ et PHP natif. Apprenez à utiliser Composer, exécuter les commandes d\'installation, configurer les variables d\'environnement et vérifier votre installation.', category: 'Démarrage', locale: 'fr' },
  { _path: '/fr/docs/getting-started/configuration', title: 'Configuration', description: 'Guide de configuration de FNE Client. Configurez les clés API, les URLs de base, les timeouts, les paramètres de cache, la locale et les variables d\'environnement. Configuration pour Laravel, Symfony ou projets PHP natifs.', category: 'Démarrage', locale: 'fr' },
  { _path: '/fr/docs/getting-started/quick-start', title: 'Démarrage rapide', description: 'Créez votre première facture certifiée en quelques minutes. Guide de démarrage rapide avec exemples de code pour Laravel, Symfony et PHP natif. Apprenez à signer des factures, gérer les factures B2C et B2B, et gérer les erreurs.', category: 'Démarrage', locale: 'fr' },
  
  { _path: '/fr/docs/guides/invoices', title: 'Factures', description: 'Guide complet pour certifier des factures de vente avec FNE Client. Apprenez à créer des factures B2C et B2B, utiliser InvoiceService, gérer les types de factures, méthodes de paiement, modèles, taxes, articles et récupérer les données de facture.', category: 'Guides', locale: 'fr' },
  { _path: '/fr/docs/guides/purchases', title: 'Bordereaux d\'achat', description: 'Guide complet pour créer et soumettre des bordereaux d\'achat avec FNE Client. Apprenez à utiliser PurchaseService, soumettre des données d\'achat et gérer la certification des bordereaux d\'achat.', category: 'Guides', locale: 'fr' },
  { _path: '/fr/docs/guides/refunds', title: 'Avoirs', description: 'Guide complet pour créer des avoirs et notes de crédit avec FNE Client. Apprenez à utiliser RefundService, émettre des remboursements pour des factures, gérer les données de remboursement et gérer la création de notes de crédit.', category: 'Guides', locale: 'fr' },
  { _path: '/fr/docs/guides/mapping', title: 'Mapping ERP → FNE', description: 'Guide complet pour mapper vos données ERP vers le format FNE. Apprenez à transformer les structures de données, utiliser la notation pointée, configurer les mappings de champs et intégrer avec vos systèmes ERP existants.', category: 'Guides', locale: 'fr' },
  { _path: '/fr/docs/guides/error-handling', title: 'Gestion des erreurs', description: 'Guide complet pour gérer les erreurs avec FNE Client. Apprenez sur ValidationException, AuthenticationException, BadRequestException, les messages d\'erreur, les patterns de gestion d\'erreurs et les meilleures pratiques pour le débogage.', category: 'Guides', locale: 'fr' },
  { _path: '/fr/docs/guides/cache', title: 'Cache', description: 'Guide pour configurer et utiliser le cache avec FNE Client. Apprenez à activer le cache, définir les valeurs TTL, configurer les drivers de cache et optimiser les performances des appels API avec des stratégies de cache.', category: 'Guides', locale: 'fr' },
  { _path: '/fr/docs/guides/logging', title: 'Journalisation', description: 'Guide pour configurer le logging avec FNE Client. Configurez les niveaux de log, configurez le logging pour Laravel, Symfony et PHP natif. Apprenez à déboguer les appels API, suivre les requêtes et surveiller le comportement de l\'application.', category: 'Guides', locale: 'fr' },
  { _path: '/fr/docs/guides/i18n', title: 'Internationalisation (i18n)', description: 'Guide pour utiliser l\'internationalisation avec FNE Client. Configurez les paramètres de locale, traduisez les messages d\'erreur, changez la locale globalement ou par appel, et supportez plusieurs langues dans votre application.', category: 'Guides', locale: 'fr' },
  
  { _path: '/fr/docs/examples/basic', title: 'Exemples basiques', description: 'Exemples de code basiques pour démarrer avec FNE Client. Exemples simples pour créer des factures, gérer les opérations de base et comprendre les fondamentaux du SDK. Parfait pour les débutants.', category: 'Exemples', locale: 'fr' },
  { _path: '/fr/docs/examples/advanced', title: 'Exemples avancés', description: 'Exemples de code avancés avec FNE Client. Scénarios complexes, traitement par lots, configurations personnalisées, intégration de modèles, mapping avancé et cas d\'usage sophistiqués pour les développeurs expérimentés.', category: 'Exemples', locale: 'fr' },
  { _path: '/fr/docs/examples/use-cases', title: 'Cas d\'usage réels', description: 'Exemples de cas d\'usage réels avec FNE Client. Intégration e-commerce, gestion d\'abonnements, workflows de génération de factures, patterns d\'intégration ERP et implémentations prêtes pour la production.', category: 'Exemples', locale: 'fr' },
  
  { _path: '/fr/docs/api-reference/fne-client', title: 'FNEClient', description: 'Référence API pour la classe principale FNEClient. Apprenez le point d\'entrée pour toutes les opérations FNE, l\'initialisation, la configuration, l\'accès aux services et comment utiliser le client dans différents frameworks.', category: 'Référence API', locale: 'fr' },
  { _path: '/fr/docs/api-reference/invoice-service', title: 'InvoiceService', description: 'Référence API pour la classe InvoiceService. Documentation complète de la méthode sign(), certification de factures, paramètres, valeurs de retour et toutes les méthodes disponibles pour les opérations de factures de vente.', category: 'Référence API', locale: 'fr' },
  { _path: '/fr/docs/api-reference/purchase-service', title: 'PurchaseService', description: 'Référence API pour la classe PurchaseService. Documentation complète de la méthode submit(), soumission de bordereaux d\'achat, paramètres, valeurs de retour et gestion des bordereaux d\'achat.', category: 'Référence API', locale: 'fr' },
  { _path: '/fr/docs/api-reference/refund-service', title: 'RefundService', description: 'Référence API pour la classe RefundService. Documentation complète de la méthode issue(), création de remboursements, génération de notes de crédit, paramètres et opérations de gestion des remboursements.', category: 'Référence API', locale: 'fr' },
  { _path: '/fr/docs/api-reference/dtos', title: 'DTOs', description: 'Référence complète des DTOs (Data Transfer Objects) dans FNE Client. Apprenez sur ResponseDTO, InvoiceDTO, PurchaseDTO, RefundDTO et tous les objets de transfert de données avec leurs propriétés et méthodes.', category: 'Référence API', locale: 'fr' },
  { _path: '/fr/docs/api-reference/enums', title: 'Enums', description: 'Référence complète des enums disponibles dans FNE Client. InvoiceType, PaymentMethod, InvoiceTemplate, TaxType et tous les types d\'énumération avec leurs valeurs et exemples d\'utilisation.', category: 'Référence API', locale: 'fr' },
  
  { _path: '/fr/docs/advanced/features', title: 'Fonctionnalités (Laravel Pennant)', description: 'Guide pour utiliser les fonctionnalités Laravel Pennant avec FNE Client. Apprenez à activer et désactiver les fonctionnalités, configurer les feature flags, utiliser le mapping avancé, le traitement par lots et la fonctionnalité webhooks.', category: 'Avancé', locale: 'fr' },
  { _path: '/fr/docs/advanced/troubleshooting', title: 'Dépannage', description: 'Guide de dépannage pour les problèmes courants avec FNE Client. Solutions pour les problèmes d\'authentification, erreurs de validation, problèmes de connexion API, problèmes de configuration et conseils de débogage.', category: 'Avancé', locale: 'fr' },
]

export const useSearchIndex = () => {
  const search = (query: string, locale?: 'en' | 'fr'): SearchIndexItem[] => {
    if (!query || query.length < 2) {
      return []
    }
    
    const searchLower = query.toLowerCase()
    const filtered = searchIndex.filter((item) => {
      // Filtrer par locale si spécifiée
      if (locale && item.locale !== locale) {
        return false
      }
      
      const title = (item.title || '').toLowerCase()
      const description = (item.description || '').toLowerCase()
      const category = (item.category || '').toLowerCase()
      
      return title.includes(searchLower) || 
             description.includes(searchLower) || 
             category.includes(searchLower)
    })
    
    return filtered.slice(0, 10) // Limiter à 10 résultats
  }
  
  return {
    search,
    all: searchIndex
  }
}
