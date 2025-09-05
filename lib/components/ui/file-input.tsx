import * as React from 'react';
import { validateFile } from '@/lib/file';
import { cn } from '@/utils';
import CloseIcon from '@/assets/close.svg?react';
import ImageBoxFull from '@/assets/img_box_fill.svg?react';
import { Input } from './input';

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Callback при добавлении файла */
  onAdd: (file: File, error?: { fileSizeError?: string; fileTypeError?: string }) => void;
  /** Callback при удалении файла */
  onFileRemove?: (onConfirmCallback?: () => void) => void;
  /** Callback при клике на поле ввода */
  onClick?: () => void;
  /** Текст ошибки или флаг наличия ошибки */
  error?: string | boolean;
  /** Максимальный размер файла в байтах */
  maxFileSize: number;
  /** Значение по умолчанию для имени файла */
  defaultValue?: string;
}

/**
 * Компонент для выбора файла с валидацией и превью.
 * Поддерживает кастомизацию через стандартные атрибуты input.
 *
 * @component
 * @param {FileInputProps} props - Пропсы компонента
 * @returns {JSX.Element}
 *
 * @example
 * <FileInput
 *   onAdd={(file) => console.log(file)}
 *   maxFileSize={5242880}
 *   accept="image/*"
 *   placeholder="Выберите файл"
 * />
 */
const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    { className, onAdd, onClick, onFileRemove, error, accept, maxFileSize, defaultValue, ...props },
    ref,
  ) => {
    const [fileName, setFileName] = React.useState('');

    const handleInputChange = async (files: FileList) => {
      const result = await validateFile(files[0], accept ?? '', maxFileSize);

      if (result.ok) {
        setFileName(files[0].name);
        onAdd(files[0]);
      } else {
        onAdd(files[0], {
          fileTypeError: result.fileTypeError,
          fileSizeError: result.fileSizeError,
        });
      }
    };

    function handleClick(e: React.MouseEvent) {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    }

    const renderRightIconGroup = () => (
      <div className={cn('flex flex-row gap-1')}>
        {onFileRemove && (
          <div
            className='cursor-pointer'
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              onFileRemove(() => setFileName(''));
            }}
          >
            <CloseIcon />
          </div>
        )}
        <ImageBoxFull />
      </div>
    );

    return (
      <>
        <label className={className} onClick={handleClick}>
          <input
            key={fileName}
            type={'file'}
            style={{ display: 'none' }}
            accept={accept}
            {...props}
            ref={ref}
            onChange={e => e.target.files?.length && handleInputChange(e.target.files)}
          />
          <Input
            defaultValue={fileName || defaultValue}
            style={{ pointerEvents: 'none', background: 'white' }}
            placeholder={props.placeholder}
            error={error}
            rightIcon={renderRightIconGroup()}
          />
        </label>
      </>
    );
  },
);
FileInput.displayName = 'FileInput';

export { FileInput };
