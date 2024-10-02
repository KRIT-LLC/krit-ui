import * as React from 'react';
import { cn } from '@/utils';
import ImageBoxFull from '@/assets/img_box_fill.svg?react';
import CloseIcon from '@/assets/close.svg?react';
import { Input } from './input';

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAdd: (file: File) => void;
  onFileRemove?: () => void;
  error?: string | boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onAdd, onFileRemove, error, ...props }, ref) => {
    const [fileName, setFileName] = React.useState('');
    const handleInputChange = (files: FileList) => {
      setFileName(files[0].name);
      onAdd(files[0]);
    };

    const renderRightIconGroup = () => (
      <div className={cn('flex flex-row gap-1')}>
        {
          onFileRemove && (
            <div
              className="cursor-pointer"
              onClick={e => {
                e.preventDefault();
                onFileRemove();
              }}
            >
              <CloseIcon />
            </div>
          )
        }
        <ImageBoxFull />
      </div>
    );

    const input = (
      <>
        <label className={className}>
          <input
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
            rightIcon={getRightIconGroup(onFileRemove)}
          />
        </label>
      </>
    );

    return input;
  },
);
FileInput.displayName = 'Input';

export { FileInput };
