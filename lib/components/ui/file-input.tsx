import * as React from 'react';
import { cn } from '@/utils';
import ImageBoxFull from '@/assets/img_box_fill.svg?react';
import CloseIcon from '@/assets/close.svg?react';
import { Input } from './input';

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAdd: (file: File) => void;
  onFileRemove?: (onConfirmCallback?: () => void) => void;
  onClick?: () => void;
  error?: string | boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onAdd, onClick, onFileRemove, error, ...props }, ref) => {
    const [fileName, setFileName] = React.useState('');
    const handleInputChange = (files: FileList) => {
      setFileName(files[0].name);
      onAdd(files[0]);
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

    const input = (
      <>
        <label className={cn( 'bg-background-primary', className)} onClick={handleClick}>
          <input
            key={fileName}
            type={'file'}
            style={{ display: 'none' }}
            {...props}
            ref={ref}
            onChange={e => e.target.files?.length && handleInputChange(e.target.files)}
          />
          <Input
            defaultValue={fileName}
            style={{ pointerEvents: 'none' }}
            placeholder={props.placeholder}
            error={error}
            rightIcon={renderRightIconGroup()}
          />
        </label>
      </>
    );

    return input;
  },
);
FileInput.displayName = 'Input';

export { FileInput };
