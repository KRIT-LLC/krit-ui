import { z } from 'zod';

export const attachmentItemSchema = z
  .object({
    id: z.number().or(z.string()),
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
      id: z.number().or(z.string()),
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

export type ContentType = 'video' | 'audio' | 'image' | 'pdf' | 'word' | 'excel' | 'archive';

export const defaultAccepts: ContentType[] = [
  'video',
  'audio',
  'image',
  'pdf',
  'word',
  'excel',
  'archive',
];

export const acceptMap = new Map<string, string>([
  ['video', 'video/mp4'],
  ['image', 'image/png, image/jpeg'],
  ['audio', 'audio/mp3'],
  ['pdf', 'application/pdf'],
  [
    'word',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/msword',
  ],
  [
    'excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel.sheet.macroEnabled.12, application/vnd.ms-excel',
  ],
  ['archive', 'application/zip, application/x-rar-compressed, application/x-7z-compressed'],
]);

export const MAX_TOTAL_SIZE_MB = 40;
export const MAX_VIDEO_SIZE_MB = 20;
export const MAX_AUDIO_SIZE_MB = 10;
export const MAX_PDF_SIZE_MB = 1;
export const MAX_IMAGE_SIZE_MB = 1;
export const MAX_WORD_SIZE_MB = 20;
export const MAX_EXCEL_SIZE_MB = 20;
export const MAX_ARCHIVE_SIZE_MB = 20;
