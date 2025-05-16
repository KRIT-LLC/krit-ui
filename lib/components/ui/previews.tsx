import { useRef, useState } from 'react';
import { acceptMap, AttachmentItem, ContentType, defaultAccepts } from '@/lib/attachments';
import { compressFile } from '@/lib/file';
import { Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { AudioFileIcon, FileIcon, VideoFileIcon } from '@/assets';
import AttachFile from '@/assets/attach_file.svg?react';
import CancelCircleOutline from '@/assets/cancel_circle_outline.svg?react';
import { useConfirm } from '../../hooks/useConfirm';
import { Input } from './input';
import { PreviewFull } from './previewFull';

interface PreviewsProps {
  className?: string;
  placeholder?: string;
  data?: AttachmentItem[];
  accepts?: ContentType[];
  multiple?: boolean;
  max?: number;
  previewSize?: number;
  gap?: number;
  title?: string;
  handleFileLimit?: (filetype: ContentType) => void;
  handleAllFilesLimit?: () => void;
  onAdd?: (files: File[]) => void;
  onRemove?: (index: number) => void;
}

const MAX_TOTAL_SIZE_MB = 40;
const MAX_VIDEO_SIZE_MB = 20;
const MAX_IMAGE_SIZE_MB = 1;

export const Previews = (props: PreviewsProps) => {
  const {
    className,
    placeholder,
    data = [],
    accepts = defaultAccepts,
    multiple = true,
    max = 10,
    previewSize = 130,
    gap = 2,
    title,
    handleFileLimit,
    handleAllFilesLimit,
    onAdd,
    onRemove,
  } = props;
  const { confirm } = useConfirm();
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const [currentPreview, setCurrentPreview] = useState<AttachmentItem>(data[0]);

  const getPrevHandler = () => {
    const prevIndex = data.indexOf(currentPreview) - 1;
    if (data[prevIndex]) return () => setCurrentPreview(data[prevIndex]);
  };

  const getNextHandler = () => {
    const nextIndex = data.indexOf(currentPreview) + 1;
    if (data[nextIndex]) return () => setCurrentPreview(data[nextIndex]);
  };

  const getType = (attachment?: AttachmentItem) => {
    const contentType = attachment?.contentType?.split('/')[0].toLowerCase();
    if (contentType === 'application' && attachment?.contentType?.includes('pdf')) return 'pdf';
    return contentType as ContentType;
  };

  const mbToBytes = (mb: number) => mb * 1024 * 1024;
  const isImage = (file: File) => file.type.includes('image');

  const [processing, setProcessing] = useState(false);

  const handleInputChange = async (files: FileList) => {
    const isSizeOk = (file: File) => {
      if (isImage(file)) return file.size < mbToBytes(MAX_IMAGE_SIZE_MB);
      else return file.size < mbToBytes(MAX_VIDEO_SIZE_MB);
    };

    const calculateCompressQuality = (file: File) => {
      const maxSizeBytes = mbToBytes(isImage(file) ? MAX_IMAGE_SIZE_MB : MAX_VIDEO_SIZE_MB);
      const quality = Number((maxSizeBytes / file.size).toFixed(2));
      if (quality >= 1) return 1;
      return quality;
    };

    const filesArray = Array.from(files);
    if (filesArray.length) setProcessing(true);
    for (const file of filesArray) {
      const processedFile = !isSizeOk(file)
        ? await compressFile(file, { quality: calculateCompressQuality(file) })
        : file;
      filesArray[filesArray.indexOf(file)] = processedFile;
      if (!isSizeOk(processedFile)) {
        handleFileLimit?.(processedFile.type.split('/')[0] as ContentType);
        // TODO: вернуть notifyError после добавления count в кастомный translations
        /* if (isImage(file))
          notifyError(`${t('imageSizeLimitMB', { count: MAX_IMAGE_SIZE_MB })} (${file.name})`);
        else notifyError(`${t('videoSizeLimitMB', { count: MAX_VIDEO_SIZE_MB })} (${file.name})`); */
      }
    }
    const currentFiles = data.filter(item => !!item.file).map(item => item.file);
    const totalSizeMb =
      [...currentFiles, ...filesArray].reduce((acc, file) => acc + file!.size, 0) / 1024 / 1024;
    if (totalSizeMb > MAX_TOTAL_SIZE_MB) {
      handleAllFilesLimit?.();
      // TODO: вернуть notifyError после добавления count в кастомный translations
      /*  notifyError(t('maxSizeOfFileMB', { count: MAX_TOTAL_SIZE_MB })); */
      return setProcessing(false);
    }
    const filesWithOkSize = filesArray.filter(isSizeOk);
    const results = max ? filesWithOkSize.slice(0, max) : filesWithOkSize;
    if (results.length) onAdd?.(results);
    if (inputRef.current) inputRef.current.value = '';
    setProcessing(false);
  };

  const onRemoveAttachment = async (item: AttachmentItem, index: number) => {
    const confirmed = await confirm({
      description: t('confirmDeleteMedia'),
      confirmText: t('delete'),
      confirmType: 'destructive-primary',
    });
    if (confirmed) item.onRemove?.() || onRemove?.(index);
  };

  const getSizeClass = (prefix: string = '') =>
    `${prefix}h-[${previewSize}px] ${prefix}w-[${previewSize}px]`;
  const getMinSizeClass = () => getSizeClass('min-');

  return (
    <div
      className={cn(
        'grid grid-flow-col auto-cols-[130px] pt-1 overflow-x-auto overflow-y-hidden w-full',
        `gap-${gap}`,
        `auto-cols-[${previewSize}px]`,
        className,
      )}
    >
      {onAdd && (!max || data.length < max) && (
        <div
          className={cn(
            'w-[130px] h-[130px] relative flex justify-center items-center rounded-lg border-foreground/10 bg-[transparent] text-[transparent] cursor-pointer transition-colors',
            getMinSizeClass(),
            getSizeClass(),
          )}
        >
          <Input
            ref={inputRef}
            className={
              'h-full w-full flex justify-center items-center cursor-pointer file:text-[transparent] file:bg-[transparent] file:hidden border-dashed hover:bg-background-secondary'
            }
            id='attachment'
            type='file'
            accept={accepts.map(type => acceptMap.get(type)).join(',')}
            multiple={multiple}
            disabled={!!max && data.length >= max}
            onChange={e => e.target.files?.length && handleInputChange(e.target.files)}
          />
          {processing ? (
            <Loader2 className='absolute pointer-events-none h-7 w-7 animate-spin opacity-80' />
          ) : (
            <div className='absolute pointer-events-none flex flex-col gap-1 items-center justify-center'>
              <AttachFile
                className={cn('text-icon-fade-contrast', { 'opacity-50': data.length >= max })}
              />
              <span className='text-sm text-foreground-tertiary'>{t('attachFile')}</span>
            </div>
          )}
        </div>
      )}
      {placeholder && !data?.length && (
        <span className='text-base text-secondary-foreground'>{placeholder}</span>
      )}
      {data?.map((item, i) => {
        const fileType = getType(item);
        return (
          <div
            key={item.id}
            className={cn('relative select-none cursor-pointer', getMinSizeClass(), getSizeClass())}
          >
            <PreviewFull
              type={getType(currentPreview)}
              src={currentPreview?.url}
              name={currentPreview?.fileName}
              onPrev={getPrevHandler()}
              onNext={getNextHandler()}
              onRemove={(onRemove || item.onRemove) && (() => onRemoveAttachment(item, i))}
            >
              <span className='relative'>
                {fileType === 'image' && (
                  <>
                    <img
                      src={item.url}
                      alt=''
                      className={cn(
                        'rounded-lg object-cover border border-foreground/10',
                        getSizeClass(),
                      )}
                      loading='lazy'
                      onClick={() => setCurrentPreview(item)}
                    />
                    {title && (
                      <span className='absolute bottom-2 left-2 display-block p-0.5 rounded-xl bg-background-on-image text-xs text-foreground-on-image w-[calc(100%-1rem)] truncate'>
                        {title}
                      </span>
                    )}
                  </>
                )}
                {fileType === 'video' && (
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center h-full w-full text-icon-theme rounded-lg border-2 border-line-secondary',
                      getSizeClass(),
                    )}
                    onClick={() => setCurrentPreview(item)}
                  >
                    <VideoFileIcon />
                    <div className='text-sm mt-1 text-foreground-secondary w-full truncate text-center p-0.5'>
                      {item.fileName ||
                        item.url?.split('/').pop() +
                          `.${item.contentType?.split('/').pop() || 'mp4'}`}
                    </div>
                  </div>
                )}
                {fileType === 'audio' && (
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center h-full w-full text-icon-theme rounded-lg border-2 border-line-secondary',
                      getSizeClass(),
                    )}
                    onClick={() => setCurrentPreview(item)}
                  >
                    <AudioFileIcon />
                    <div className='text-sm mt-1 text-foreground-secondary w-full truncate text-center p-0.5'>
                      {item.fileName ||
                        item.url?.split('/').pop() +
                          `.${item.contentType?.split('/').pop() || 'mp3'}`}
                    </div>
                  </div>
                )}
                {fileType === 'pdf' && (
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cn(
                      'flex flex-col items-center justify-center h-full w-full text-icon-theme rounded-lg border-2 border-line-secondary',
                      getSizeClass(),
                    )}
                  >
                    <FileIcon />
                    <div className='text-sm mt-1 text-foreground-secondary w-full truncate text-center p-0.5'>
                      {item.fileName ||
                        item.url?.split('/').pop() +
                          `.${item.contentType?.split('/').pop() || 'pdf'}`}
                    </div>
                  </a>
                )}
              </span>
            </PreviewFull>
            {(onRemove || item.onRemove) && (
              <div onClick={() => onRemoveAttachment(item, i)}>
                <CancelCircleOutline className='absolute -top-[3px] -right-[3px] rounded-full bg-background fill-background text-destructive-foreground cursor-pointer' />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
