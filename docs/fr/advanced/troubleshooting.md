---
title: Troubleshooting
description: Guide de dépannage pour résoudre les problèmes courants
order: 5
---

# Troubleshooting

Ce guide vous aide à résoudre les problèmes courants avec FNE Client.

## Problèmes courants

### Erreur d'authentification

**Symptôme :** `AuthenticationException` lancée

**Solutions :**
- Vérifiez que votre clé API est correcte
- Vérifiez que la clé API est bien définie dans `.env`
- Vérifiez que le mode (test/production) correspond à votre environnement

### Erreur de validation

**Symptôme :** `ValidationException` lancée

**Solutions :**
- Vérifiez que tous les champs requis sont fournis
- Vérifiez que les types de données sont corrects
- Vérifiez que les enums utilisent les bonnes valeurs

### Erreur de mapping

**Symptôme :** `MappingException` lancée

**Solutions :**
- Vérifiez la configuration du mapping dans `config/fne.php`
- Vérifiez que les chemins de notation pointée sont corrects
- Vérifiez que les données ERP correspondent au mapping

## Voir aussi

- **[Gestion des erreurs](/docs/guides/error-handling)** - Guide complet sur la gestion des erreurs
- **[Logging](/docs/guides/logging)** - Configurez le logging pour le débogage

---

**Besoin d'aide ?** Consultez la [documentation complète](/docs) ou [ouvrez une issue](https://github.com/neocode/fne-client/issues) sur GitHub.



