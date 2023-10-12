import FileInput from '../../components/FileInput';
import { useJsonContext } from '../../contexts/JsonContext';
import style from './Home.module.css';

interface Props {
  invalid?: boolean;
}

function Home({ invalid = false }: Props) {
  const { setHasFile, setJsonObject } = useJsonContext();

  const fileSelect = async (files: FileList | null) => {
    if (files && files.length == 1) {
      const content = JSON.parse((await files.item(0)?.text()) || '');
      setHasFile(true);
      setJsonObject(content);
    }
  };

  return (
    <main className={style.main}>
      <h1 className='text-center'>JSON Tree Viewer</h1>
      <h2 className='text-center'>
        Simple JSON Viewer that runs completely on-client. No data exchange
      </h2>
      <FileInput onFileSelected={fileSelect}>Load JSON</FileInput>
      {invalid && (
        <p className={style.error}>
          Invalid file. Please load a valid JSON file.
        </p>
      )}
    </main>
  );
}

export default Home;
