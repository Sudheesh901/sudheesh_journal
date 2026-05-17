import { defineCollection, z } from 'astro:content';

const noteSchema = z.object({
  title: z.string(),
  description: z.string(),
  domain: z.string(),
  level: z.enum(['Foundational', 'Intermediate', 'Advanced', 'Research', 'Roadmap']),
  order: z.number(),
  tags: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  updated: z.coerce.date(),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['Planned', 'Building', 'Live']),
  order: z.number(),
  tags: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  updated: z.coerce.date(),
});

const experienceSchema = z.object({
  title: z.string(),
  description: z.string(),
  role: z.string(),
  order: z.number(),
  tags: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  updated: z.coerce.date(),
});

export const collections = {
  foundations: defineCollection({ type: 'content', schema: noteSchema }),
  'ai-engineering': defineCollection({ type: 'content', schema: noteSchema }),
  interview: defineCollection({ type: 'content', schema: noteSchema }),
  projects: defineCollection({ type: 'content', schema: projectSchema }),
  experience: defineCollection({ type: 'content', schema: experienceSchema }),
};
