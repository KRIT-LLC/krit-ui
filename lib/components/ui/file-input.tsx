import * as React from 'react';
import { cn } from '@/utils';
import ImageBoxFull from '@/assets/img_box_fill.svg?react';
import CloseIcon from '@/assets/close.svg?react';
import { Input } from './input';
import { validateFile } from '@/lib/file';

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAdd: (file: File, error?: {fileSizeError?: string, fileTypeError?: string}) => void;
  onFileRemove?: (onConfirmCallback?: () => void) => void;
  onClick?: () => void;
  error?: string | boolean;
  maxFileSize: number;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onAdd, onClick, onFileRemove, error, accept, maxFileSize, ...props }, ref) => {
    const [fileName, setFileName] = React.useState('');

    const handleInputChange = async (files: FileList) => {
      const result = await validateFile(files[0], accept ?? '', maxFileSize);

      if (result.ok) {
        setFileName(files[0].name);
        onAdd(files[0]);
      } else {
        onAdd(files[0], { fileTypeError: result.fileTypeError, fileSizeError: result.fileSizeError });
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
            defaultValue={fileName}
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
