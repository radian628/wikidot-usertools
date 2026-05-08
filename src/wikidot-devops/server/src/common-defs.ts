import z from "zod";

export const WikidotDevopsInitMessageParser = z.object({
  updateUrl: z.url(),
});

export const WikidotDevopsFileMessageParser = z.object({
  name: z.string(),
  fetchUrl: z.string(),
  comments: z.string().optional(),
});

export const WikidotDevopsContentMessageParser = z.object({
  title: z.string(),
  updatedSourceUrl: z.string(),
  comment: z.string().optional(),
});

export const WikidotDevopsPageMessageParser = z.object({
  site: z.string(),
  slug: z.string(),
  updatedContent: WikidotDevopsContentMessageParser.optional(),
  parentSlug: z.string().optional(),
  tags: z.array(z.string()).optional(),
  updatedFiles: z.array(WikidotDevopsFileMessageParser),
});

export const WikidotDevopsMessageParser = z.object({
  updatedPages: WikidotDevopsPageMessageParser.array(),
});

export type WikidotDevopsMessage = z.infer<typeof WikidotDevopsMessageParser>;
export type WikidotDevopsPageMessage = z.infer<
  typeof WikidotDevopsPageMessageParser
>;
export type WikidotDevopsFileMessage = z.infer<
  typeof WikidotDevopsFileMessageParser
>;
export type WikidotDevopsContentMessage = z.infer<
  typeof WikidotDevopsContentMessageParser
>;
