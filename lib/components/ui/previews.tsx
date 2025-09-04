import { useRef, useState } from 'react';
import {
  acceptMap,
  AttachmentItem,
  ContentType,
  defaultAccepts,
  MAX_AUDIO_SIZE_MB,
  MAX_IMAGE_SIZE_MB,
  MAX_PDF_SIZE_MB,
  MAX_TOTAL_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
} from '@/lib/attachments';
import { compressFile } from '@/lib/file';
import { Loader2 } from 'lucide-react';
import { useNotify } from '@/hooks/useNotify';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { AudioFileIcon, CloseIcon, DeleteOutlineIcon, FileIcon, VideoFileIcon } from '@/assets';
import AttachFile from '@/assets/attach_file.svg?react';
import { useConfirm } from '../../hooks/useConfirm';
import { Input } from './input';
import { PreviewFull } from './previewFull';

export interface PreviewsProps {
  className?: string;
  placeholder?: string;
  data?: AttachmentItem[];
  accepts?: ContentType[];
  multiple?: boolean;
  max?: number;
  previewSize?: number;
  gap?: number;
  title?: string;
  orientation?: 'vertical' | 'horizontal';
  maxSizes?: {
    image?: number;
    video?: number;
    total?: number;
    audio?: number;
    pdf?: number;
  };
  withCompress?: boolean;
  handleFileLimit?: (filetype: ContentType) => void;
  handleAllFilesLimit?: () => void;
  onAdd?: (files: File[]) => void;
  onRemove?: (index: number) => void;
}

/**
 * Компонент для отображения и управления вложениями различных типов (изображения, видео, аудио, PDF).
 * Поддерживает предпросмотр, добавление, удаление и сжатие файлов с проверкой ограничений по размеру.
 *
 * @component
 * @param {PreviewsProps} props - Параметры компонента
 * @param {string} [props.className] - Дополнительные CSS-классы для контейнера
 * @param {string} [props.placeholder] - Текст-заполнитель при отсутствии вложений
 * @param {AttachmentItem[]} [props.data=[]] - Массив вложений для отображения
 * @param {ContentType[]} [props.accepts=defaultAccepts] - Разрешенные типы файлов
 * @param {boolean} [props.multiple=true] - Разрешить множественный выбор файлов
 * @param {number} [props.max=10] - Максимальное количество файлов
 * @param {number} [props.previewSize=130] - Размер превью в пикселях
 * @param {number} [props.gap=2] - Отступ между элементами
 * @param {string} [props.title] - Заголовок для изображений
 * @param {'vertical' | 'horizontal'} [props.orientation='horizontal'] - Ориентация элементов
 * @param {object} [props.maxSizes] - Максимальные размеры файлов по типам
 * @param {number} [props.maxSizes.image=MAX_IMAGE_SIZE_MB] - Макс. размер изображений (МБ)
 * @param {number} [props.maxSizes.video=MAX_VIDEO_SIZE_MB] - Макс. размер видео (МБ)
 * @param {number} [props.maxSizes.total=MAX_TOTAL_SIZE_MB] - Макс. общий размер (МБ)
 * @param {number} [props.maxSizes.audio=MAX_AUDIO_SIZE_MB] - Макс. размер аудио (МБ)
 * @param {number} [props.maxSizes.pdf=MAX_PDF_SIZE_MB] - Макс. размер PDF (МБ)
 * @param {boolean} [props.withCompress=true] - Включить сжатие файлов
 * @param {function} [props.onAdd] - Обработчик добавления файлов
 * @param {function} [props.onRemove] - Обработчик удаления файлов
 * @returns {React.ReactElement} Компонент для управления вложениями
 *
 * @example
 * <Previews
 *   data={attachments}
 *   onAdd={(files) => console.log('Added files:', files)}
 *   onRemove={(index) => console.log('Remove file at index:', index)}
 *   max={5}
 *   orientation="vertical"
 * />
 */
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
    orientation = 'horizontal',
    maxSizes = {
      image: MAX_IMAGE_SIZE_MB,
      video: MAX_VIDEO_SIZE_MB,
      total: MAX_TOTAL_SIZE_MB,
      audio: MAX_AUDIO_SIZE_MB,
      pdf: MAX_PDF_SIZE_MB,
    },
    withCompress = true,
    onAdd,
    onRemove,
  } = props;
  const { confirm } = useConfirm();
  const { notifyError } = useNotify();
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

  const mbToBytes = (mb: number = 0) => mb * 1024 * 1024;
  const bytesToMb = (bytes: number = 0) => (bytes / (1024 * 1024)).toFixed(2);
  const isImage = (file: File) => file.type.includes('image');
  const isAudio = (file: File) => file.type.includes('audio');
  const isPdf = (file: File) => file.type.includes('pdf');

  const [processing, setProcessing] = useState(false);

  const handleInputChange = async (files: FileList) => {
    const isSizeOk = (file: File) => {
      if (isImage(file)) return file.size < mbToBytes(maxSizes.image);
      else if (isAudio(file)) return file.size < mbToBytes(maxSizes.audio);
      else if (isPdf(file)) return file.size < mbToBytes(maxSizes.pdf);
      else return file.size < mbToBytes(maxSizes.video);
    };

    const getMaxSizeForFileType = (
      file: File,
      maxSizes: {
        image?: number;
        audio?: number;
        pdf?: number;
        video?: number;
      },
    ) => {
      if (isImage(file)) return maxSizes.image;
      if (isAudio(file)) return maxSizes.audio;
      if (isPdf(file)) return maxSizes.pdf;
      return maxSizes.video;
    };

    const calculateCompressQuality = (file: File) => {
      const maxSizeBytes = mbToBytes(getMaxSizeForFileType(file, maxSizes));
      const quality = Number((maxSizeBytes / file.size).toFixed(2));
      if (quality >= 1) return 1;
      return quality;
    };

    const filesArray = Array.from(files);
    if (filesArray.length) setProcessing(true);
    for (const file of filesArray) {
      const processedFile =
        !isSizeOk(file) && withCompress
          ? await compressFile(file, { quality: calculateCompressQuality(file) })
          : file;
      filesArray[filesArray.indexOf(file)] = processedFile;
      if (!isSizeOk(processedFile)) {
        if (isImage(file))
          notifyError(`${t('imageSizeLimitMB')} ${maxSizes.image}(MB) (${file.name})`);
        else if (isAudio(file))
          notifyError(`${t('audioSizeLimitMB')} ${maxSizes.audio}(MB) (${file.name})`);
        else if (isPdf(file))
          notifyError(`${t('pdfSizeLimitMB')} ${maxSizes.pdf}(MB) (${file.name})`);
        else notifyError(`${t('videoSizeLimitMB')} ${maxSizes.video}(MB) (${file.name})`);
      }
    }
    const currentFiles = data.filter(item => !!item.file).map(item => item.file);
    const totalSizeMb =
      [...currentFiles, ...filesArray].reduce((acc, file) => acc + file!.size, 0) / 1024 / 1024;
    if (!maxSizes?.total || totalSizeMb > maxSizes.total) {
      notifyError(`${t('maxSizeOfFilesMB')} ${maxSizes.total}(MB)`);
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
        orientation === 'vertical'
          ? `flex flex-col gap-2 pt-1 overflow-y-auto overflow-x-hidden w-full`
          : 'grid grid-flow-col auto-cols-[130px] pt-1 overflow-x-auto overflow-y-hidden w-full',
        orientation === 'horizontal' ? `gap-${gap}` : '',
        orientation === 'horizontal' ? `auto-cols-[${previewSize}px]` : '',
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
        const fileName =
          item.fileName ||
          item.url?.split('/').pop() +
            `.${item.contentType?.split('/').pop() || (fileType === 'video' ? 'mp4' : fileType === 'audio' ? 'mp3' : 'pdf')}`;

        return (
          <div
            key={item.fileName}
            className={cn(
              'relative select-none cursor-pointer',
              orientation === 'vertical'
                ? 'grid grid-cols-[130px_1fr] items-center gap-4 w-full h-full'
                : '',
              orientation === 'horizontal' ? getMinSizeClass() : '',
              orientation === 'horizontal' ? getSizeClass() : '',
            )}
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
                        'rounded-lg object-cover border border-line-primary',
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
                    {orientation === 'horizontal' && (
                      <div className='text-sm mt-1 text-foreground-secondary w-full truncate text-center p-0.5'>
                        {fileName}
                      </div>
                    )}
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
                    {orientation === 'horizontal' && (
                      <div className='text-sm mt-1 text-foreground-secondary w-full truncate text-center p-0.5'>
                        {fileName}
                      </div>
                    )}
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
                    onClick={() => setCurrentPreview(item)}
                  >
                    <FileIcon />
                    {orientation === 'horizontal' && (
                      <div className='text-sm mt-1 text-foreground-secondary w-full truncate text-center p-0.5'>
                        {fileName}
                      </div>
                    )}
                  </a>
                )}
              </span>
            </PreviewFull>
            {orientation === 'vertical' && (
              <div className='flex flex-col justify-start flex-1 h-full py-2 group min-w-0 overflow-hidden'>
                <div className='flex flex-row gap-2 items-center gap-2 pb-2'>
                  <span className='text-sm text-foreground-primary line-clamp-2' title={fileName}>
                    {fileName}
                  </span>
                  {(onRemove || item.onRemove) && (
                    <div
                      onClick={() => onRemoveAttachment(item, i)}
                      className='opacity-0 group-hover:opacity-100 transition-opacity'
                    >
                      <DeleteOutlineIcon className='bg-background text-icon-fade-contrast cursor-pointer' />
                    </div>
                  )}
                </div>
                <span className='text-sm text-foreground-quaternary'>
                  {item.file?.size ? bytesToMb(item.file.size) : 0} {t('mb')}
                </span>
              </div>
            )}
            {orientation === 'horizontal' && (onRemove || item.onRemove) && (
              <div onClick={() => onRemoveAttachment(item, i)}>
                <CloseIcon className='absolute top-[2px] right-[2px] rounded-full bg-background text-destructive-foreground cursor-pointer' />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
