export function useAppI18n() {
  const route = useRoute()
  
  // Détecter la locale actuelle depuis l'URL
  const locale = computed(() => {
    if (route.path.startsWith('/fr/') || route.path === '/fr') {
      return 'fr'
    }
    return 'en' // Par défaut en anglais
  })
  
  // Traductions
  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        // Navigation
        'nav.features': 'Features',
        'nav.documentation': 'Documentation',
        'nav.examples': 'Examples',
        'nav.getting-started': 'Getting Started',
        'nav.guides': 'Guides',
        'nav.api-reference': 'API Reference',
        'nav.advanced': 'Advanced',
        
        // Navigation items - Getting Started
        'nav.getting-started.introduction': 'Introduction',
        'nav.getting-started.installation': 'Installation',
        'nav.getting-started.configuration': 'Configuration',
        'nav.getting-started.quick-start': 'Quick Start',
        
        // Navigation items - Guides
        'nav.guides.invoices': 'Sales Invoices',
        'nav.guides.purchases': 'Purchase Slips',
        'nav.guides.refunds': 'Refunds',
        'nav.guides.mapping': 'ERP → FNE Mapping',
        'nav.guides.error-handling': 'Error Handling',
        'nav.guides.cache': 'Cache',
        'nav.guides.logging': 'Logging',
        'nav.guides.i18n': 'Internationalization',
        
        // Navigation items - API Reference
        'nav.api.fne-client': 'FNEClient',
        'nav.api.invoice-service': 'InvoiceService',
        'nav.api.purchase-service': 'PurchaseService',
        'nav.api.refund-service': 'RefundService',
        'nav.api.dtos': 'DTOs',
        'nav.api.enums': 'Enums',
        
        // Navigation items - Examples
        'nav.examples.basic': 'Basic Examples',
        'nav.examples.advanced': 'Advanced Examples',
        'nav.examples.use-cases': 'Real Use Cases',
        
        // Navigation items - Advanced
        'nav.advanced.features': 'Features (Laravel Pennant)',
        'nav.advanced.troubleshooting': 'Troubleshooting',
        
        // Homepage
        'home.trusted-by': 'Trusted by developers & businesses worldwide',
        'home.title': 'The Modern PHP SDK',
        'home.title-highlight': 'for the FNE API',
        'home.description': 'Easily integrate the Electronic Standardized Invoice into your PHP applications with a robust, intuitive, and framework-agnostic SDK.',
        'home.cta.start': 'Get Started',
        'home.cta.docs': 'View Documentation',
        'home.cta.examples': 'View Examples',
        'home.features.production-ready': 'Production Ready',
        'home.features.production-ready-desc': '67 tests, robust validation',
        'home.stats.tests': 'Tests',
        'home.stats.frameworks': 'Frameworks',
        'home.stats.opensource': 'Open Source',
        'home.install.title': 'Install in seconds',
        'home.install.subtitle': 'From Composer install to your first invoice in three steps.',
        'home.install.description': 'FNE Client is a modern, framework-agnostic PHP SDK for integrating the FNE API into your existing applications.',
        'home.install.step1': 'Install via Composer',
        'home.install.step2': 'Configure environment variables',
        'home.install.step3': 'Use the client',
        'home.code.title': 'Get started in',
        'home.code.title-highlight': 'a few lines',
        'home.code.subtitle': 'Certify your first invoice in less than 5 minutes',
        
        // Search
        'search.placeholder': 'Search documentation...',
        'search.no-results': 'No results found for',
        'search.type-minimum': 'Type at least 2 characters to search',
        'search.navigate': 'Navigate',
        'search.open': 'Open',
        'search.close': 'Close',
        'search.no-title': 'Untitled',
        
        // Docs
        'docs.title': 'Documentation',
        'docs.previous': 'Previous',
        'docs.next': 'Next',
        'docs.edit-page': 'Edit this page',
        'docs.report-issue': 'Report an issue',
        'docs.copy-page': 'Copy page',
        'docs.copy-page-title': 'Copy page URL',
        'docs.on-this-page': 'On this page',
        'docs.no-headings': 'No headings available',
        
        // Header
        'header.search': 'Search…',
        'header.search-aria': 'Search',
        'header.menu-aria': 'Menu',
        'header.github-aria': 'GitHub',
        'header.close-menu': 'Close menu',
        
        // Navigation mobile
        'nav.menu-title': 'Navigation',
        'nav.select-language': 'Language',
        
        // Footer
        'footer.learn': 'Learn',
        'footer.support': 'Support',
        'footer.discuss': 'Discuss',
        'footer.social': 'Social',
        'footer.docs': 'Docs',
        'footer.quickstart': 'Quickstart',
        'footer.guides': 'Guides',
        'footer.api': 'API',
        'footer.github': 'GitHub',
        'footer.issues': 'Issues',
        'footer.discussions': 'Discussions',
        'footer.twitter': 'Twitter',
        'footer.copyright': '© FNE Client 2025. All rights reserved. Powered by',
        'footer.description': 'Modern, framework-agnostic PHP SDK for integrating the FNE API into your applications.',
        
        // Homepage additional
        'home.features.title': 'Features',
        'home.features.learn-more': 'Learn more',
        'home.final.description': 'Complete documentation, interactive examples and community support.',
        'home.final.cta.examples': 'View Examples',
        'home.features.subtitle': 'Everything you need to integrate the FNE API',
        'home.features.description': 'From installation to production, a complete and modern SDK for your PHP applications.',
        'home.final.title': 'Ready to integrate the FNE API?',
        'home.final.subtitle': 'Get started in minutes with our modern and intuitive SDK.',
        
        // Hero section
        'home.hero.code-example': 'Interactive code example',
        'home.hero.frameworks': 'Laravel • Symfony • PHP',
        'home.hero.live-preview': 'Live Preview',
        'home.hero.tests-passed': '67 tests passed',
        'home.hero.frameworks-label': 'Frameworks',
        'home.hero.tests-label': 'Tests',
        
        // Stats section
        'home.stats.tests-title': 'Tests',
        'home.stats.tests-desc': 'Complete tests covering all aspects',
        'home.stats.frameworks-title': 'Frameworks',
        'home.stats.frameworks-desc': 'Laravel, Symfony and native PHP',
        'home.stats.opensource-title': 'Open Source',
        'home.stats.opensource-desc': 'MIT license, free to use',
        
        // Features
        'home.features.zero-config-title': 'Zero Configuration',
        'home.features.zero-config-desc': 'One-command installation with automatic framework detection. Compatible with Laravel, Symfony and native PHP.',
        'home.features.mapping-title': 'Flexible Mapping',
        'home.features.mapping-desc': 'Transform your ERP data to FNE with intuitive dot notation. Customizable mapping via configuration.',
        'home.features.validation-title': 'Robust Validation',
        'home.features.validation-desc': 'Automatic validation before sending to API. Complete error handling with typed and localized exceptions.',
        'home.features.integration-title': 'Model Integration',
        'home.features.integration-desc': 'Traits for direct integration with Eloquent, Doctrine or PHP objects. Certification in a single method.',
        'home.features.performance-title': 'Optimized Performance',
        'home.features.performance-desc': 'PSR-16 support for caching and PSR-3 for logging. Optimized for high-performance applications.',
        'home.features.i18n-title': 'Multilingual Support',
        'home.features.i18n-desc': 'Error messages and documentation in French and English. Complete i18n support for your applications.',
        
        // Code components
        'code.copy': 'Copy code',
        'code.copied': 'Copied!',
      },
      fr: {
        // Navigation
        'nav.features': 'Fonctionnalités',
        'nav.documentation': 'Documentation',
        'nav.examples': 'Exemples',
        'nav.getting-started': 'Démarrage',
        'nav.guides': 'Guides',
        'nav.api-reference': 'Référence API',
        'nav.advanced': 'Avancé',
        
        // Navigation items - Getting Started
        'nav.getting-started.introduction': 'Introduction',
        'nav.getting-started.installation': 'Installation',
        'nav.getting-started.configuration': 'Configuration',
        'nav.getting-started.quick-start': 'Démarrage rapide',
        
        // Navigation items - Guides
        'nav.guides.invoices': 'Factures de vente',
        'nav.guides.purchases': 'Bordereaux d\'achat',
        'nav.guides.refunds': 'Avoirs',
        'nav.guides.mapping': 'Mapping ERP → FNE',
        'nav.guides.error-handling': 'Gestion des erreurs',
        'nav.guides.cache': 'Cache',
        'nav.guides.logging': 'Logging',
        'nav.guides.i18n': 'Internationalisation',
        
        // Navigation items - API Reference
        'nav.api.fne-client': 'FNEClient',
        'nav.api.invoice-service': 'InvoiceService',
        'nav.api.purchase-service': 'PurchaseService',
        'nav.api.refund-service': 'RefundService',
        'nav.api.dtos': 'DTOs',
        'nav.api.enums': 'Enums',
        
        // Navigation items - Examples
        'nav.examples.basic': 'Exemples basiques',
        'nav.examples.advanced': 'Exemples avancés',
        'nav.examples.use-cases': 'Cas d\'usage réels',
        
        // Navigation items - Advanced
        'nav.advanced.features': 'Features (Laravel Pennant)',
        'nav.advanced.troubleshooting': 'Dépannage',
        
        // Homepage
        'home.trusted-by': 'Fiable par les développeurs et entreprises du monde entier',
        'home.title': 'Le SDK PHP Moderne',
        'home.title-highlight': 'pour l\'API FNE',
        'home.description': 'Intégrez facilement la Facture Normalisée Électronique dans vos applications PHP avec un SDK robuste, intuitif et framework-agnostic.',
        'home.cta.start': 'Commencer maintenant',
        'home.cta.docs': 'Voir la documentation',
        'home.cta.examples': 'Voir les exemples',
        'home.features.production-ready': 'Prêt pour la Production',
        'home.features.production-ready-desc': '67 tests, validation robuste',
        'home.stats.tests': 'Tests',
        'home.stats.frameworks': 'Frameworks',
        'home.stats.opensource': 'Open Source',
        'home.install.title': 'Installation en secondes',
        'home.install.subtitle': 'De l\'installation Composer à la première facture en trois étapes.',
        'home.install.description': 'FNE Client est un SDK PHP moderne et framework-agnostic pour intégrer l\'API FNE dans vos applications existantes.',
        'home.install.step1': 'Installer via Composer',
        'home.install.step2': 'Configurer les variables d\'environnement',
        'home.install.step3': 'Utiliser le client',
        'home.code.title': 'Commencez en',
        'home.code.title-highlight': 'quelques lignes',
        'home.code.subtitle': 'Certifiez votre première facture en moins de 5 minutes',
        
        // Search
        'search.placeholder': 'Rechercher dans la documentation...',
        'search.no-results': 'Aucun résultat trouvé pour',
        'search.type-minimum': 'Tapez au moins 2 caractères pour rechercher',
        'search.navigate': 'Naviguer',
        'search.open': 'Ouvrir',
        'search.close': 'Fermer',
        'search.no-title': 'Sans titre',
        
        // Docs
        'docs.title': 'Documentation',
        'docs.previous': 'Précédent',
        'docs.next': 'Suivant',
        'docs.edit-page': 'Modifier cette page',
        'docs.report-issue': 'Signaler un problème',
        'docs.copy-page': 'Copier la page',
        'docs.copy-page-title': 'Copier l\'URL de la page',
        'docs.on-this-page': 'Sur cette page',
        'docs.no-headings': 'Aucun titre disponible',
        
        // Header
        'header.search': 'Rechercher…',
        'header.search-aria': 'Rechercher',
        'header.menu-aria': 'Menu',
        'header.github-aria': 'GitHub',
        'header.close-menu': 'Fermer le menu',
        
        // Navigation mobile
        'nav.menu-title': 'Navigation',
        'nav.select-language': 'Langue',
        
        // Footer
        'footer.learn': 'Apprendre',
        'footer.support': 'Support',
        'footer.discuss': 'Discuter',
        'footer.social': 'Social',
        'footer.docs': 'Docs',
        'footer.quickstart': 'Démarrage rapide',
        'footer.guides': 'Guides',
        'footer.api': 'API',
        'footer.github': 'GitHub',
        'footer.issues': 'Issues',
        'footer.discussions': 'Discussions',
        'footer.twitter': 'Twitter',
        'footer.copyright': '© FNE Client 2025. Tous droits réservés. Propulsé par',
        'footer.description': 'SDK PHP moderne et framework-agnostic pour intégrer l\'API FNE dans vos applications.',
        
        // Homepage additional
        'home.features.title': 'Fonctionnalités',
        'home.features.learn-more': 'En savoir plus',
        'home.final.description': 'Documentation complète, exemples interactifs et support communautaire.',
        'home.final.cta.examples': 'Voir les exemples',
        'home.features.subtitle': 'Tout ce dont vous avez besoin pour intégrer l\'API FNE',
        'home.features.description': 'De l\'installation à la production, un SDK complet et moderne pour vos applications PHP.',
        'home.final.title': 'Prêt à intégrer l\'API FNE ?',
        'home.final.subtitle': 'Commencez en quelques minutes avec notre SDK moderne et intuitif.',
        
        // Hero section
        'home.hero.code-example': 'Exemple de code interactif',
        'home.hero.frameworks': 'Laravel • Symfony • PHP',
        'home.hero.live-preview': 'Aperçu en direct',
        'home.hero.tests-passed': '67 tests passés',
        'home.hero.frameworks-label': 'Frameworks',
        'home.hero.tests-label': 'Tests',
        
        // Stats section
        'home.stats.tests-title': 'Tests',
        'home.stats.tests-desc': 'Tests complets couvrant tous les aspects',
        'home.stats.frameworks-title': 'Frameworks',
        'home.stats.frameworks-desc': 'Laravel, Symfony et PHP natif',
        'home.stats.opensource-title': 'Open Source',
        'home.stats.opensource-desc': 'Licence MIT, libre d\'utilisation',
        
        // Features
        'home.features.zero-config-title': 'Zéro Configuration',
        'home.features.zero-config-desc': 'Installation en une commande avec détection automatique du framework. Compatible Laravel, Symfony et PHP natif.',
        'home.features.mapping-title': 'Mapping Flexible',
        'home.features.mapping-desc': 'Transformez vos données ERP vers FNE avec notation pointée intuitive. Mapping personnalisable via configuration.',
        'home.features.validation-title': 'Validation Robuste',
        'home.features.validation-desc': 'Validation automatique avant envoi à l\'API. Gestion d\'erreurs complète avec exceptions typées et localisées.',
        'home.features.integration-title': 'Intégration Modèles',
        'home.features.integration-desc': 'Traits pour intégration directe avec Eloquent, Doctrine ou objets PHP. Certification en une seule méthode.',
        'home.features.performance-title': 'Performance Optimisée',
        'home.features.performance-desc': 'Support PSR-16 pour le cache et PSR-3 pour le logging. Optimisé pour les applications haute performance.',
        'home.features.i18n-title': 'Support Multilingue',
        'home.features.i18n-desc': 'Messages d\'erreur et documentation en français et anglais. Support i18n complet pour vos applications.',
        
        // Code components
        'code.copy': 'Copier le code',
        'code.copied': 'Copié !',
      }
    }
    
    return translations[locale.value]?.[key] || key
  }
  
  // Obtenir le chemin localisé
  const getLocalizedPath = (targetLocale: string, path?: string) => {
    const currentPath = path || route.path
    
    // Page d'accueil
    if (currentPath === '/' || currentPath === '/fr') {
      return targetLocale === 'fr' ? '/fr' : '/'
    }
    
    // Si on est sur une page de documentation
    if (currentPath.startsWith('/docs')) {
      if (targetLocale === 'fr') {
        return currentPath.replace('/docs', '/fr/docs')
      } else {
        return currentPath
      }
    }
    // Si on est sur /fr/docs/*, convertir selon la locale
    else if (currentPath.startsWith('/fr/docs')) {
      if (targetLocale === 'en') {
        return currentPath.replace('/fr/docs', '/docs')
      } else {
        return currentPath
      }
    }
    // Si on est sur /fr/* (autre que docs)
    else if (currentPath.startsWith('/fr')) {
      if (targetLocale === 'en') {
        const withoutFr = currentPath.replace('/fr', '') || '/'
        return withoutFr
      } else {
        return currentPath
      }
    }
    // Sinon, on est sur une page en anglais
    else {
      if (targetLocale === 'fr') {
        return `/fr${currentPath}`
      } else {
        return currentPath
      }
    }
  }
  
  return {
    locale,
    t,
    getLocalizedPath
  }
}

