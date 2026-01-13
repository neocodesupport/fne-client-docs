import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const commonSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  navigation: z.boolean().optional(),
  order: z.number().optional()
})

export default defineContentConfig({
  collections: {
    // English content collection
    content_en: defineCollection({
      type: 'page',
      source: {
        driver: 'fs',
        base: 'content/en',
        include: '**/*.md',
        prefix: '',
      },
      schema: commonSchema,
    }),
    // French content collection
    content_fr: defineCollection({
      type: 'page',
      source: {
        driver: 'fs',
        base: 'content/fr',
        include: '**/*.md',
        prefix: '',
      },
      schema: commonSchema,
    }),
  },
})



