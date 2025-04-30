import { z } from 'zod';

export const attachmentItemSchema = z
  .object({
    id: z.number(),
    contentType: z.string(),
    url: z.string(),
    file: z.instanceof(File).optional(),
    fileName: z.string().optional(),
    isMain: z.boolean().optional(),
    inProgress: z.boolean().optional(),
    onRemove: z.function().optional(),
  })
  .or(
    z.object({
      id: z.number(),
      contentType: z.string(),
      url: z.string().optional(),
      file: z.instanceof(File),
      fileName: z.string().optional(),
      isMain: z.boolean().optional(),
      inProgress: z.boolean().optional(),
      onRemove: z.function().optional(),
    }),
  );

export type AttachmentItem = z.infer<typeof attachmentItemSchema>;

export const attachmentsSchema = z.array(
  z.object({
    label: z.string(),
    items: z.array(attachmentItemSchema),
    disableIfEmpty: z.boolean().optional(),
    hideIfEmpty: z.boolean().optional(),
    canAdd: z.boolean().optional(),
    maxFiles: z.number().optional(),
  }),
);

export type Attachments = z.infer<typeof attachmentsSchema>;

export type ContentType = 'video' | 'image';
