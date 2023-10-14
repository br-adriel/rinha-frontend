import { PropsWithChildren, useRef } from 'react';
import style from './FileInput.module.css';

interface Props extends PropsWithChildren {
  onFileSelected: (files: FileList | null) => void;
}

const FileInput = ({ children, onFileSelected }: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const hiddenFileInputChange = () => {
    if (hiddenFileInput.current) {
      onFileSelected(hiddenFileInput.current.files);
    }
  };

  return (
    <>
      <button onClick={onClick} type='button'>
        {children}
      </button>
      <label htmlFor='file' style={{ display: 'none' }}>
        Open JSON File
      </label>
      <input
        id='file'
        type='file'
        ref={hiddenFileInput}
        className={style.fileInput}
        onChange={hiddenFileInputChange}
        accept='.json'
      />
    </>
  );
};

export default FileInput;
