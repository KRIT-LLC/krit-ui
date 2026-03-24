import type { AttachmentItem, ContentType } from '@/lib/attachments';

/** Типы вложений, открываемых в модальном превью */
export const PREVIEW_TYPES: ContentType[] = ['image', 'video', 'audio'];

export const getContentTypeFromMime = (mimeType: string): ContentType | null => {
  const mime = mimeType.toLowerCase();

  if (mime.includes('pdf')) return 'pdf';
  if (mime.includes('wordprocessingml') || mime === 'application/msword') return 'word';
  if (mime.includes('spreadsheetml') || mime.includes('ms-excel')) return 'excel';
  if (mime === 'application/zip' || mime.includes('rar') || mime.includes('7z')) return 'archive';
  if (mime.includes('image')) return 'image';
  if (mime.includes('video')) return 'video';
  if (mime.includes('audio')) return 'audio';

  return null;
};

export const getAttachmentContentType = (attachment?: AttachmentItem): ContentType => {
  if (!attachment?.contentType) return 'image';
  return getContentTypeFromMime(attachment.contentType) || 'image';
};

export const filterValidAttachmentItems = (data: AttachmentItem[] | undefined): AttachmentItem[] =>
  (data ?? []).filter((item) => item?.url && item?.contentType);
