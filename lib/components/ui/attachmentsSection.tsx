import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { AttachmentItem, Attachments, ContentType } from '../../lib/attachments';
import { filesToAttachments } from '../../lib/file';
import { NoDataBanner } from './banner';
import { Previews } from './previews';

/**
 * Пропсы компонента секции вложений
 */
export interface AttachmentsSectionProps {
  /** Заголовок секции */
  title?: string;
  /** Ориентация контейнера (вертикальная/горизонтальная) */
  orientation?: 'vertical' | 'horizontal';
  /** Ориентация превью файлов */
  previewsOrientation?: 'vertical' | 'horizontal';
  /** Видимые секции по меткам или индексам */
  visibleSections?: (string | number)[];
  /** Доступные для загрузки MIME-типы */
  accepts?: ContentType[];
  /** Максимальные размеры файлов по типам */
  maxSizes?: {
    image?: number;
    video?: number;
    total?: number;
    audio?: number;
    pdf?: number;
    word?: number;
    excel?: number;
    archive?: number;
  };
  /** Включение сжатия изображений */
  withCompress?: boolean;
  /** Колбэк добавления файлов */
  onAdd?: (attachments: AttachmentItem[], tabIndex: number) => Promise<void> | void;
  /** Колбэк удаления файлов */
  onRemove?: (index: number, tabIndex: number) => Promise<void> | void;
  /** Список вкладок с файлами */
  tabs?: Attachments;
  /** Показать плашку "Медиафайлов нет" при отсутствии файлов */
  showNoDataBanner?: boolean;
}

/**
 * Компонент для управления и отображения вложений с группировкой по типам
 *
 * @component
 * @param {AttachmentsSectionProps} props - Параметры компонента
 * @returns {React.ReactElement} Секция с превью файлов и управлением
 *
 * @example
 * <AttachmentsSection
 *   title="Медиафайлы"
 *   orientation="horizontal"
 *   onAdd={(files) => handleUpload(files)}
 * />
 */

export const AttachmentsSection = ({
  title,
  tabs = [],
  orientation,
  previewsOrientation,
  visibleSections,
  accepts,
  maxSizes,
  withCompress,
  onAdd,
  onRemove,
  showNoDataBanner = true,
}: AttachmentsSectionProps) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);

  const getIndex = (label: string) => tabs.findIndex(tab => tab.label === label);

  const add = async (files: File[], tabIndex: number) => {
    const attachments = await filesToAttachments(files);
    await onAdd?.(attachments, tabIndex);
  };

  const [visibleTabs, setVisibleTabs] = useState(tabs);

  const filterVisible = (subsection: Attachments[0], index: number) =>
    !visibleSections?.length ||
    visibleSections?.includes(subsection.label) ||
    visibleSections?.includes(index);

  useEffect(() => {
    const newVisibleTabs = tabs
      .filter(filterVisible)
      .filter(
        (subsection, i) =>
          !subsection.hideIfEmpty ||
          subsection.items.length > 0 ||
          (!!visibleSections?.length && filterVisible(subsection, i)),
      );
    setVisibleTabs(newVisibleTabs);
  }, [tabs]);

  const hasItems = visibleTabs?.filter(subsection => subsection.items.length > 0).length > 0;

  return (
    <>
      {title && <div className='text-sm font-medium'>{title}</div>}
      <div
        className={cn('flex gap-5 mb-1', orientation === 'horizontal' ? 'flex-row' : 'flex-col')}
      >
        {!hasItems && !onAdd && showNoDataBanner && <NoDataBanner>{t('noMediaFiles')}</NoDataBanner>}
        {(!!hasItems || !!onAdd) &&
          visibleTabs.map(item => (
            <div
              key={item.label}
              className={cn(
                'flex flex-col items-start gap-1 rounded-lg w-auto cursor-default transition-colors',
                item.disableIfEmpty && !item.items.length && 'pointer-events-none opacity-50',
              )}
              onClick={() => setSelected(getIndex(item.label))}
            >
              <span className='text-foreground-secondary font-normal text-sm flex'>
                {item.label}
              </span>
              <Previews
                data={item.items}
                max={item?.maxFiles}
                accepts={accepts}
                maxSizes={maxSizes}
                withCompress={withCompress}
                orientation={previewsOrientation}
                onRemove={onRemove ? index => onRemove?.(index, selected) : undefined}
                onAdd={onAdd && item.canAdd ? files => add(files, getIndex(item.label)) : undefined}
              />
            </div>
          ))}
      </div>
    </>
  );
};
