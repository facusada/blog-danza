import { defineCollection, defineContentConfig } from '@nuxt/content';
import { z } from 'zod';

const imageSchema = z.object({
  src: z.string(),
  alt: z.string()
});

const crewMemberSchema = z.object({
  role: z.string(),
  name: z.string()
});

const linkSchema = z.object({
  label: z.string(),
  url: z.string()
});

const productions = defineCollection({
  type: 'content',
  source: 'productions/**',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    year: z.number(),
    duration: z.string().optional(),
    synopsis: z.string(),
    crew: z.array(crewMemberSchema).optional(),
    cover: z.string(),
    gallery: z.array(imageSchema).optional(),
    youtubeId: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const events = defineCollection({
  type: 'content',
  source: 'events/**',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    venueSlug: z.string(),
    city: z.string(),
    country: z.string(),
    productionSlug: z.string(),
    flyer: z.string().optional(),
    gallery: z.array(imageSchema).optional(),
    pressLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.string()
        })
      )
      .optional()
  })
});

const venues = defineCollection({
  type: 'content',
  source: 'venues/**',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    address: z.string(),
    city: z.string(),
    country: z.string(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    photos: z.array(imageSchema).optional()
  })
});

const press = defineCollection({
  type: 'content',
  source: 'press/**',
  schema: z.object({
    outlet: z.string(),
    author: z.string(),
    date: z.string(),
    url: z.string(),
    excerpt: z.string(),
    relatedProductionSlug: z.string().nullable().optional()
  })
});

const people = defineCollection({
  type: 'content',
  source: 'people/**',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    photo: z.string(),
    links: z.array(linkSchema).optional()
  })
});

export default defineContentConfig({
  collections: {
    productions,
    events,
    venues,
    press,
    people
  }
});
