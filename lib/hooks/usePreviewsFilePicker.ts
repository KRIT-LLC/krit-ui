import { useCallback, useRef, useState } from 'react';
import { filterValidAttachmentItems, getContentTypeFromMime } from '@/components/ui/previewsShared';
import {
  acceptMap,
  type AttachmentItem,
  type ContentType,
  defaultAccepts,
  MAX_AUDIO_SIZE_MB,
  MAX_ARCHIVE_SIZE_MB,
  MAX_EXCEL_SIZE_MB,
  MAX_IMAGE_SIZE_MB,
  MAX_PDF_SIZE_MB,
  MAX_TOTAL_SIZE_MB,
  MAX_VIDEO_SIZE_MB,
  MAX_WORD_SIZE_MB,
} from '@/lib/attachments';
import { compressFile, mbToBytes, MB_IN_BYTES } from '@/lib/file';
import { useNotify } from '@/hooks/useNotify';
import { useTranslation } from '@/hooks/useTranslation';

export interface PreviewsFilePickerMaxSizes {
  image?: number;
  video?: number;
  total?: number;
  audio?: number;
  pdf?: number;
  word?: number;
  excel?: number;
  archive?: number;
}

export interface UsePreviewsFilePickerParams {
  accepts?: ContentType[];
  multiple?: boolean;
  max?: number;
  maxSizes?: PreviewsFilePickerMaxSizes;
  withCompress?: boolean;
  onAdd?: (files: File[]) => void;
  handleFileLimit?: (filetype: ContentType) => void;
  handleAllFilesLimit?: () => void;
  /**
   * Текущие вложения: для лимита max, подсчёта слотов и суммарного размера файлов с полем `file`.
   */
  attachmentData?: AttachmentItem[];
}

const defaultMaxSizes: Required<PreviewsFilePickerMaxSizes> = {
  image: MAX_IMAGE_SIZE_MB,
  video: MAX_VIDEO_SIZE_MB,
  total: MAX_TOTAL_SIZE_MB,
  audio: MAX_AUDIO_SIZE_MB,
  pdf: MAX_PDF_SIZE_MB,
  word: MAX_WORD_SIZE_MB,
  excel: MAX_EXCEL_SIZE_MB,
  archive: MAX_ARCHIVE_SIZE_MB,
};

export interface UsePreviewsFilePickerResult {
  inputRef: React.RefObject<HTMLInputElement>;
  openPicker: () => void;
  processing: boolean;
  /** true, если нельзя открыть диалог (лимит файлов или идёт обработка) */
  pickerDisabled: boolean;
  acceptAttr: string;
  multiple: boolean;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Логика выбора файлов как в Previews: лимиты по типам, общий размер, сжатие, onAdd.
 * Скрытый input рендерит потребитель; триггер вызывает openPicker().
 */
export const usePreviewsFilePicker = (
  params: UsePreviewsFilePickerParams,
): UsePreviewsFilePickerResult => {
  const {
    accepts = defaultAccepts,
    multiple = true,
    max,
    maxSizes: maxSizesProp,
    withCompress = true,
    onAdd,
    attachmentData = [],
  } = params;

  const maxSizes = { ...defaultMaxSizes, ...maxSizesProp };
  const { notifyError } = useNotify();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);

  const validData = filterValidAttachmentItems(attachmentData);
  const currentCount = validData.length;
  const atMax = max != null && currentCount >= max;
  const pickerDisabled = atMax || processing || !onAdd;

  const handleInputChange = useCallback(
    async (files: FileList) => {
      const valid = filterValidAttachmentItems(attachmentData);
      const count = valid.length;

      const isImage = (file: File) => getContentTypeFromMime(file.type) === 'image';
      const isAudio = (file: File) => getContentTypeFromMime(file.type) === 'audio';
      const isPdf = (file: File) => getContentTypeFromMime(file.type) === 'pdf';
      const isWord = (file: File) => getContentTypeFromMime(file.type) === 'word';
      const isExcel = (file: File) => getContentTypeFromMime(file.type) === 'excel';
      const isArchive = (file: File) => getContentTypeFromMime(file.type) === 'archive';

      const isSizeOk = (file: File) => {
        if (isImage(file)) return file.size < mbToBytes(maxSizes.image);
        if (isAudio(file)) return file.size < mbToBytes(maxSizes.audio);
        if (isPdf(file)) return file.size < mbToBytes(maxSizes.pdf);
        if (isWord(file)) return file.size < mbToBytes(maxSizes.word);
        if (isExcel(file)) return file.size < mbToBytes(maxSizes.excel);
        if (isArchive(file)) return file.size < mbToBytes(maxSizes.archive);
        return file.size < mbToBytes(maxSizes.video);
      };

      const getMaxSizeForFileType = (
        file: File,
        sizes: PreviewsFilePickerMaxSizes,
      ): number | undefined => {
        if (isImage(file)) return sizes.image;
        if (isAudio(file)) return sizes.audio;
        if (isPdf(file)) return sizes.pdf;
        if (isWord(file)) return sizes.word;
        if (isExcel(file)) return sizes.excel;
        if (isArchive(file)) return sizes.archive;
        return sizes.video;
      };

      const calculateCompressQuality = (file: File) => {
        const limitMb = getMaxSizeForFileType(file, maxSizes);
        const maxSizeBytes = mbToBytes(limitMb ?? maxSizes.video);
        const quality = Number((maxSizeBytes / file.size).toFixed(2));
        if (quality >= 1) return 1;
        return quality;
      };

      const filesArray = Array.from(files);
      if (!filesArray.length) return;

      setProcessing(true);
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const processedFile =
          !isSizeOk(file) && withCompress
            ? await compressFile(file, { quality: calculateCompressQuality(file) })
            : file;
        filesArray[i] = processedFile;
        if (!isSizeOk(processedFile)) {
          if (isImage(file))
            notifyError(`${t('imageSizeLimitMB')} ${maxSizes.image}(MB) (${file.name})`);
          else if (isAudio(file))
            notifyError(`${t('audioSizeLimitMB')} ${maxSizes.audio}(MB) (${file.name})`);
          else if (isPdf(file))
            notifyError(`${t('pdfSizeLimitMB')} ${maxSizes.pdf}(MB) (${file.name})`);
          else if (isWord(file))
            notifyError(`${t('videoSizeLimitMB')} ${maxSizes.word}(MB) (${file.name})`);
          else if (isExcel(file))
            notifyError(`${t('videoSizeLimitMB')} ${maxSizes.excel}(MB) (${file.name})`);
          else if (isArchive(file))
            notifyError(`${t('videoSizeLimitMB')} ${maxSizes.archive}(MB) (${file.name})`);
          else notifyError(`${t('videoSizeLimitMB')} ${maxSizes.video}(MB) (${file.name})`);
        }
      }

      const currentFiles = valid.filter((item) => !!item.file).map((item) => item.file!);
      const totalSizeMb =
        [...currentFiles, ...filesArray].reduce((acc, file) => acc + file.size, 0) / MB_IN_BYTES;

      if (maxSizes.total != null && totalSizeMb > maxSizes.total) {
        notifyError(`${t('maxSizeOfFilesMB')} ${maxSizes.total}(MB)`);
        setProcessing(false);
        return;
      }

      const filesWithOkSize = filesArray.filter(isSizeOk);
      const remainingSlots = max != null ? Math.max(0, max - count) : filesWithOkSize.length;
      const results = max != null ? filesWithOkSize.slice(0, remainingSlots) : filesWithOkSize;

      if (results.length) onAdd?.(results);
      if (inputRef.current) inputRef.current.value = '';
      setProcessing(false);
    },
    [attachmentData, max, maxSizes, withCompress, onAdd, notifyError, t],
  );

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) void handleInputChange(e.target.files);
    },
    [handleInputChange],
  );

  const openPicker = useCallback(() => {
    if (!pickerDisabled) inputRef.current?.click();
  }, [pickerDisabled]);

  const acceptAttr = accepts.map((type) => acceptMap.get(type)).filter(Boolean).join(',');

  return {
    inputRef,
    openPicker,
    processing,
    pickerDisabled,
    acceptAttr,
    multiple,
    onFileInputChange,
  };
};
