import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/utils';
import { AttachmentItem, Attachments, ContentType } from '../../lib/attachments';
import { filesToAttachments } from '../../lib/file';
import { NoDataBanner } from './banner';
import { Previews } from './previews';

export interface AttachmentsSectionProps {
  title?: string;
  defaultExpanded?: boolean;
  count?: number;
  tabs?: Attachments;
  placeholder?: string;
  addDescription?: string;
  visibleSections?: (string | number)[];
  orientation?: 'vertical' | 'horizontal';
  accepts?: ContentType[];
  maxSizes?: {
    image?: number;
    video?: number;
    total?: number;
    audio?: number;
    pdf?: number;
  };
  withCompress?: boolean;
  onAdd?: (attachments: AttachmentItem[], tabIndex: number) => Promise<void> | void;
  onRemove?: (index: number, tabIndex: number) => Promise<void> | void;
}

export const AttachmentsSection = ({
  title,
  tabs = [],
  orientation,
  visibleSections,
  accepts,
  maxSizes,
  withCompress,
  onAdd,
  onRemove,
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
        {!hasItems && !onAdd && <NoDataBanner>{t('noMediaFiles')}</NoDataBanner>}
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
                onRemove={onRemove ? index => onRemove?.(index, selected) : undefined}
                onAdd={onAdd && item.canAdd ? files => add(files, getIndex(item.label)) : undefined}
              />
            </div>
          ))}
      </div>
    </>
  );
};
