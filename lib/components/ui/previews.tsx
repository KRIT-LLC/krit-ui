import { useContext, useRef, useState } from 'react';
import { compressFile } from '@/lib/file';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils';
import AttachFile from '@/assets/attach_file.svg?react';
import CancelCircleOutline from '@/assets/cancel_circle_outline.svg?react';
import { Input } from './input';
import { PreviewFull } from './previewFull';
import { ThemeProviderContext } from './theme-provider';

export type ContentType = 'video' | 'image';

export type AttachmentItem = {
  id: number;
  contentType: string;
  url?: string;
  file?: File | undefined;
  fileName?: string;
  inProgress?: boolean;
  onRemove?: () => void;
};

interface PreviewsProps {
  className?: string;
  placeholder?: string;
  data?: AttachmentItem[];
  accepts?: ContentType[];
  multiple?: boolean;
  max?: number;
  previewSize?: number;
  gap?: number;
  maxSizes?: { video: number; image: number; total: number };
  onAdd?: (files: File[]) => void;
  onRemove?: (index: number) => void;
  handleFileLimit?: (filetype: ContentType) => void;
  handleAllFilesLimit?: () => void;
}

const acceptMap = new Map<string, string>([
  ['video', 'video/mp4'],
  ['image', 'image/png, image/jpeg'],
]);

export const Previews = ({
  className,
  placeholder,
  data = [],
  accepts = ['video', 'image'],
  multiple = true,
  max = 10,
  previewSize = 130,
  gap = 2,
  maxSizes = { video: 20, image: 1, total: 40 },
  onAdd,
  onRemove,
  handleFileLimit,
  handleAllFilesLimit,
}: PreviewsProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(ThemeProviderContext);
  const [currentPreview, setCurrentPreview] = useState<AttachmentItem>(data[0]);

  const getPrevHandler = () => {
    const prevIndex = data.indexOf(currentPreview) - 1;
    if (data[prevIndex]) return () => setCurrentPreview(data[prevIndex]);
  };

  const getNextHandler = () => {
    const nextIndex = data.indexOf(currentPreview) + 1;
    if (data[nextIndex]) return () => setCurrentPreview(data[nextIndex]);
  };

  const getType = (attachment?: AttachmentItem) =>
    attachment?.contentType?.split('/')[0] as ContentType;

  const mbToBytes = (mb: number) => mb * 1024 * 1024;
  const isImage = (file: File) => file.type.includes('image');

  const [processing, setProcessing] = useState(false);

  const handleInputChange = async (files: FileList) => {
    const isSizeOk = (file: File) => {
      if (isImage(file)) return file.size < mbToBytes(maxSizes.image);
      else return file.size < mbToBytes(maxSizes.video);
    };

    const calculateCompressQuality = (file: File) => {
      const maxSizeBytes = mbToBytes(isImage(file) ? maxSizes.image : maxSizes.video);
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
      }
    }
    const currentFiles = data.filter(item => !!item.file).map(item => item.file);
    const totalSizeMb =
      [...currentFiles, ...filesArray].reduce((acc, file) => acc + file!.size, 0) / 1024 / 1024;
    if (totalSizeMb > maxSizes.total) {
      handleAllFilesLimit?.();
      return setProcessing(false);
    }
    const filesWithOkSize = filesArray.filter(isSizeOk);
    const results = max ? filesWithOkSize.slice(0, max) : filesWithOkSize;
    if (results.length) onAdd?.(results);
    if (inputRef.current) inputRef.current.value = '';
    setProcessing(false);
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
      {onAdd && (
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
              <span className='text-sm text-foreground-tertiary'>
                {context.translations.attachFile}
              </span>
            </div>
          )}
        </div>
      )}
      {placeholder && !data?.length && (
        <span className='text-base text-secondary-foreground'>{placeholder}</span>
      )}
      {data?.map((item, i) => (
        <div
          key={item.id}
          className={cn('relative select-none', getMinSizeClass(), getSizeClass())}
        >
          <PreviewFull
            type={getType(currentPreview)}
            src={currentPreview?.url}
            onPrev={getPrevHandler()}
            onNext={getNextHandler()}
          >
            <span className='relative'>
              {getType(item) === 'image' && (
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
              )}
              {getType(item) === 'video' && (
                <video
                  className={cn(
                    'rounded-lg object-cover border border-foreground/10',
                    getSizeClass(),
                  )}
                  preload='none'
                  onClick={() => setCurrentPreview(item)}
                >
                  <source src={item.url} type='video/mp4' />
                </video>
              )}
            </span>
          </PreviewFull>
          {(onRemove || item.onRemove) && (
            <div
              onClick={() => {
                item.onRemove?.();
                if (!item.onRemove) {
                  onRemove?.(i);
                }
              }}
            >
              <CancelCircleOutline className='absolute -top-[3px] -right-[3px] rounded-full bg-background fill-background text-destructive-foreground cursor-pointer' />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
