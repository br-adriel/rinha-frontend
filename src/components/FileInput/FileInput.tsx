import { PropsWithChildren, useRef } from "react";
import style from './FileInput.module.css';

interface Props extends PropsWithChildren { }

const FileInput = ({ children }: Props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const onClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click()
    }
  }

  return <>
    <button onClick={onClick}>
      {children}
    </button>
    <input type="file" ref={hiddenFileInput} className={style.fileInput} />
  </>
}


export default FileInput;