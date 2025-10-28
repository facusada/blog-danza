import { defineCollection, defineContentConfig } from '@nuxt/content';

const productions = defineCollection({
  type: 'content',
  source: 'productions/**'
});

const events = defineCollection({
  type: 'content',
  source: 'events/**'
});

const venues = defineCollection({
  type: 'content',
  source: 'venues/**'
});

const press = defineCollection({
  type: 'content',
  source: 'press/**'
});

const people = defineCollection({
  type: 'content',
  source: 'people/**'
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
