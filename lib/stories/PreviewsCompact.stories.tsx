import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { AttachFileIcon } from '@/assets';
import { Button } from '@/components/ui/button';
import { PreviewsCompactList } from '@/components/ui/previewsCompactList';
import { usePreviewsFilePicker } from '@/hooks/usePreviewsFilePicker';
import type { AttachmentItem } from '@/lib/attachments';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Components/UI/PreviewsCompact',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Компактный горизонтальный список вложений и хук `usePreviewsFilePicker`: скрепка и список можно размещать в разных частях макета. Логика выбора файлов совпадает с `Previews`.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

/** Список над «строкой ввода», кнопка скрепки слева от поля */
export const SplitTriggerAndList: Story = {
  render: () => {
    const [files, setFiles] = useState<AttachmentItem[]>([]);

    const { inputRef, openPicker, processing, pickerDisabled, acceptAttr, multiple, onFileInputChange } =
      usePreviewsFilePicker({
        attachmentData: files,
        max: 5,
        onAdd: (newFiles) => {
          setFiles((prev) => [
            ...prev,
            ...newFiles.map((file) => ({
              id: `${Date.now()}-${Math.random()}`,
              url: URL.createObjectURL(file),
              fileName: file.name,
              contentType: file.type,
              file,
            })),
          ]);
        },
      });

    return (
      <div className='flex w-full max-w-xl flex-col gap-3'>
        <PreviewsCompactList
          data={files}
          cardSize='M'
          onRemove={(index) => setFiles((prev) => prev.filter((_, i) => i !== index))}
        />
        <div className='flex items-center gap-3 rounded-lg border border-line-primary bg-background-primary px-3 py-2'>
          <input
            ref={inputRef}
            type='file'
            className='sr-only'
            accept={acceptAttr}
            multiple={multiple}
            disabled={pickerDisabled}
            onChange={onFileInputChange}
            aria-hidden
          />
          <Button
            type='button'
            variant='fade-contrast-transparent'
            className='h-6 w-6 min-h-6 min-w-6 shrink-0 rounded-lg p-0'
            disabled={pickerDisabled}
            onClick={openPicker}
            aria-label='Прикрепить файл'>
            <AttachFileIcon className='h-6 w-6 text-icon-contrast' />
          </Button>
          <span className='min-w-0 flex-1 truncate text-sm text-foreground-tertiary'>
            Введите сообщение…
          </span>
          {processing ? <Loader2 className='h-5 w-5 shrink-0 animate-spin text-foreground-tertiary' /> : null}
        </div>
      </div>
    );
  },
};

/** Скрепка отдельно (не в строке с полем): сверху справа; ниже — список и поле без повторной скрепки */
export const DetachedFloatingTrigger: Story = {
  render: () => {
    const [files, setFiles] = useState<AttachmentItem[]>([]);

    const { inputRef, openPicker, processing, pickerDisabled, acceptAttr, multiple, onFileInputChange } =
      usePreviewsFilePicker({
        attachmentData: files,
        max: 5,
        onAdd: (newFiles) => {
          setFiles((prev) => [
            ...prev,
            ...newFiles.map((file) => ({
              id: `${Date.now()}-${Math.random()}`,
              url: URL.createObjectURL(file),
              fileName: file.name,
              contentType: file.type,
              file,
            })),
          ]);
        },
      });

    return (
      <div className='relative flex w-full max-w-xl flex-col gap-4 rounded-xl border border-dashed border-line-primary bg-background-secondary/40 p-6'>
        <input
          ref={inputRef}
          type='file'
          className='sr-only'
          accept={acceptAttr}
          multiple={multiple}
          disabled={pickerDisabled}
          onChange={onFileInputChange}
          aria-hidden
        />
        <div className='flex justify-end'>
          <Button
            type='button'
            variant='fade-contrast-transparent'
            className='h-10 w-10 shrink-0 rounded-xl border border-line-primary bg-background-primary p-0 shadow-sm'
            disabled={pickerDisabled}
            onClick={openPicker}
            aria-label='Прикрепить файл'>
            <AttachFileIcon className='h-6 w-6 text-icon-contrast' />
          </Button>
        </div>
        <div className='min-h-[48px] rounded-lg border border-line-primary bg-background-primary px-3 py-2'>
          {files.length > 0 ? (
            <PreviewsCompactList
              data={files}
              onRemove={(index) => setFiles((prev) => prev.filter((_, i) => i !== index))}
            />
          ) : (
            <p className='text-sm text-foreground-tertiary'>Список вложений появится здесь</p>
          )}
        </div>
        <div className='flex items-center gap-3 rounded-lg border border-line-primary bg-background-primary px-3 py-2'>
          <span className='min-w-0 flex-1 truncate text-sm text-foreground-tertiary'>
            Введите сообщение…
          </span>
          {processing ? <Loader2 className='h-5 w-5 shrink-0 animate-spin text-foreground-tertiary' /> : null}
        </div>
      </div>
    );
  },
};
