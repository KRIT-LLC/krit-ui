import * as React from 'react';
import ImageBoxFull from '@/assets/img_box_fill.svg?react';
import { Input } from './input';

export interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onAdd: (file: File) => void;
  error?: string | boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, onAdd, error, ...props }, ref) => {
    const [fileName, setFileName] = React.useState('');
    const handleInputChange = (files: FileList) => {
      setFileName(files[0].name);
      onAdd(files[0]);
    };
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
            rightIcon={<ImageBoxFull />}
          />
        </label>
      </>
    );

    return input;
  },
);
FileInput.displayName = 'Input';

export { FileInput };
