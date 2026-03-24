import { useEffect, useState } from 'react';
import type { AttachmentItem, ContentType } from '@/lib/attachments';
import { AudioFileIcon, CloseIcon, FileIcon, VideoFileIcon } from '@/assets';
import { useConfirm } from '@/hooks/useConfirm';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { PreviewFull } from './previewFull';
import {
  filterValidAttachmentItems,
  getAttachmentContentType,
  PREVIEW_TYPES,
} from './previewsShared';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

export interface PreviewsCompactListProps {
  className?: string;
  data?: AttachmentItem[];
  onRemove?: (index: number) => void;
  /** Подпись поверх миниатюры изображения (как в Previews) */
  title?: string;
  /**
   * Резерв под макет Figma: превью всегда 40×40 (size S).
   * Значение `M` оставлено для совместимости и также даёт 40×40.
   */
  cardSize?: 'S' | 'M';
}

const bytesToMb = (bytes: number = 0) => (bytes / (1024 * 1024)).toFixed(2);

const getFileName = (item: AttachmentItem, fileType: ContentType): string =>
  item.fileName ||
  `${item.url?.split('/').pop() ?? 'file'}.${item.contentType?.split('/').pop() || (fileType === 'video' ? 'mp4' : fileType === 'audio' ? 'mp3' : fileType === 'word' ? 'docx' : fileType === 'excel' ? 'xlsx' : fileType === 'archive' ? 'zip' : 'pdf')}`;

/** Превью 40×40, скругление 8px; иконка файла 24×24, Icon/Fade-contrast */
const thumbBoxClass = () =>
  cn(
    'relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line-primary bg-background-tertiary',
  );

/** Карточка: строка превью + текст + удаление; крестик — `align-self: start` по макету */
const cardSurfaceClass = () =>
  cn(
    'group flex min-w-[200px] max-w-[280px] shrink-0 items-center gap-2 rounded-xl border border-line-primary bg-background-secondary p-2 transition-colors hover:bg-background-primary-hover',
  );

/**
 * Компактный горизонтальный список вложений (макет Figma File Upload New). Логика удаления и модального превью — как у Previews.
 * В паре с `usePreviewsFilePicker`: список и кнопка-скрепка в разных местах разметки.
 */
export const PreviewsCompactList = ({
  className,
  data = [],
  onRemove,
  title,
}: PreviewsCompactListProps) => {
  const { confirm } = useConfirm();
  const { t } = useTranslation();
  const validData = filterValidAttachmentItems(data);
  const previewableItems = validData.filter((item) =>
    PREVIEW_TYPES.includes(getAttachmentContentType(item)),
  );
  const [currentPreview, setCurrentPreview] = useState<AttachmentItem | undefined>(
    previewableItems[0],
  );

  useEffect(() => {
    const previewable = filterValidAttachmentItems(data).filter((item) =>
      PREVIEW_TYPES.includes(getAttachmentContentType(item)),
    );
    setCurrentPreview((prev) => (prev && previewable.includes(prev) ? prev : previewable[0]));
  }, [data]);

  const getPrevHandler = () => {
    if (!currentPreview) return undefined;
    const prevItem = previewableItems[previewableItems.indexOf(currentPreview) - 1];
    return prevItem ? () => setCurrentPreview(prevItem) : undefined;
  };

  const getNextHandler = () => {
    if (!currentPreview) return undefined;
    const nextItem = previewableItems[previewableItems.indexOf(currentPreview) + 1];
    return nextItem ? () => setCurrentPreview(nextItem) : undefined;
  };

  const onRemoveAttachment = async (item: AttachmentItem, index: number) => {
    const confirmed = await confirm({
      description: t('confirmDeleteMedia'),
      confirmText: t('delete'),
      confirmType: 'warning-filled',
    });
    if (confirmed) item.onRemove?.() || onRemove?.(index);
  };

  if (!validData.length) return null;

  return (
    <div
      className={cn(
        'flex w-full gap-2 overflow-x-auto overflow-y-hidden pt-1 pb-0.5 [scrollbar-width:thin]',
        className,
      )}>
      {validData.map((item, i) => {
        const fileType = getAttachmentContentType(item);
        const isDownloadable = !PREVIEW_TYPES.includes(fileType);
        const fileName = getFileName(item, fileType);
        const sizeLabel =
          item.file?.size != null ? `${bytesToMb(item.file.size)} ${t('mb')}` : '\u2014';

        const textBlock = (
          <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className='truncate text-left text-sm font-normal leading-5 text-foreground-primary'>
                    {fileName}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{fileName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className='truncate text-left text-xs font-normal leading-4 text-foreground-quaternary'>
              {sizeLabel}
            </span>
          </div>
        );

        const removeBtn =
          (onRemove || item.onRemove) && (
            <div className='flex h-6 w-6 shrink-0 items-center justify-center self-start'>
              <button
                type='button'
                className={cn(
                  'flex size-6 items-center justify-center rounded-full bg-background-primary p-1 text-icon-fade-contrast opacity-0 transition-opacity',
                  'pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100',
                  'focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void onRemoveAttachment(item, i);
                }}
                aria-label={t('delete')}>
                <CloseIcon className='size-4 shrink-0' aria-hidden />
              </button>
            </div>
          );

        if (isDownloadable) {
          const thumbDownloadable = (
            <a
              href={item.url}
              target='_blank'
              rel='noopener noreferrer'
              download={fileName}
              className={cn(thumbBoxClass(), 'text-icon-fade-contrast')}
              aria-label={fileName}>
              <FileIcon className='size-6 shrink-0' aria-hidden />
            </a>
          );

          return (
            <div key={`${String(item.id)}-${i}`} className={cardSurfaceClass()}>
              {thumbDownloadable}
              {textBlock}
              {removeBtn}
            </div>
          );
        }

        const previewThumbInner =
          fileType === 'image' ? (
            <img src={item.url} alt='' className='size-full object-cover' loading='lazy' />
          ) : fileType === 'video' ? (
            <VideoFileIcon className='size-6 shrink-0 text-icon-fade-contrast' aria-hidden />
          ) : (
            <AudioFileIcon className='size-6 shrink-0 text-icon-fade-contrast' aria-hidden />
          );

        return (
          <div key={`${String(item.id)}-${i}`} className={cardSurfaceClass()}>
            <PreviewFull
              type={getAttachmentContentType(currentPreview)}
              src={currentPreview?.url}
              name={currentPreview?.fileName}
              onPrev={getPrevHandler()}
              onNext={getNextHandler()}
              onRemove={
                (onRemove || item.onRemove) &&
                (async () => {
                  await onRemoveAttachment(item, i);
                })
              }>
              <button
                type='button'
                className='relative shrink-0 cursor-pointer border-0 bg-transparent p-0 text-left'
                onClick={() => setCurrentPreview(item)}
                aria-label={fileName}>
                {fileType === 'image' && title && (
                  <span className='absolute bottom-0.5 left-0.5 z-[1] max-w-[calc(100%-4px)] truncate rounded-md bg-background-on-image px-1 text-[10px] text-foreground-on-image'>
                    {title}
                  </span>
                )}
                <div
                  className={cn(
                    thumbBoxClass(),
                    fileType !== 'image' && 'text-icon-fade-contrast',
                  )}>
                  {previewThumbInner}
                </div>
              </button>
            </PreviewFull>
            {textBlock}
            {removeBtn}
          </div>
        );
      })}
    </div>
  );
};
