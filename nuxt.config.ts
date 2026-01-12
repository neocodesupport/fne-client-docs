// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    
    // Modules
    modules: [
        '@nuxt/icon',
        '@nuxt/content',
        '@nuxtjs/i18n'
    ],
    
    // Nuxt Content configuration
    // Les collections sont définies dans content.config.ts
    // Le dossier content est dans content/ (à la racine)
    // Nuxt Content - Shiki désactivé, on utilise CodeHighlight.vue à la place
    // Les collections sont définies dans content.config.ts
    
    // i18n configuration
    // @ts-ignore - Type definition issue with Nuxt 4
    i18n: {
        locales: [
            { code: 'en', name: 'English', language: 'en-US', dir: 'ltr' },
            { code: 'fr', name: 'French', language: 'fr-FR', dir: 'ltr' },
        ],
        strategy: 'prefix_except_default',
        defaultLocale: 'fr',
    },
    
    // Vite configuration
    vite: {
        plugins: [tailwindcss()],
    },
    
    // CSS
    css: ["./app/tailwind.css"],
    
    
    // SEO
    app: {
        head: {
            title: 'FNE Client - PHP SDK for FNE API',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Framework-agnostic PHP SDK for integrating the FNE (Facture Normalisée Électronique) API. Compatible with Laravel, Symfony and native PHP.' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },

    content: {
        database: {
            type: 'fs'
        }
    },

    experimental: {
        oxc: false
    },
    
    devtools: { enabled: true }
})