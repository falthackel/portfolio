import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project in src/content/projects/.
// The fields below are what each file's frontmatter (the block between the
// two --- lines at the top) is allowed to contain.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Which home-page section the project appears in.
      category: z.enum(['work', 'self', 'school']),
      date: z.string(), // shown as the timeframe, e.g. "2025" or "2024–25"
      type: z.string(), // e.g. "Agentic AI, personal project"
      lenses: z.array(z.enum(['engineer', 'product'])).min(1),
      summary: z.string(), // one sentence with the result
      engineerLine: z.string().optional(), // one line shown on the card under the Engineer lens
      productLine: z.string().optional(), // one line shown on the card under the Product lens
      role: z.string().optional(),
      result: z.string().optional(), // key result, with a number when one exists
      stack: z.array(z.string()).default([]),
      thumbnail: image(),
      thumbnailAlt: z.string(),
      featured: z.boolean().default(false), // true = large card spanning the full width
      order: z.number().default(99), // position within its section, lowest first
      attachments: z
        .array(z.object({ type: z.string(), label: z.string(), href: z.string() }))
        .default([]),
    }),
});

export const collections = { projects };
