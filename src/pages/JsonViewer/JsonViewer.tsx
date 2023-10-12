import JsonItem from '../../components/JsonItem';
import { useJsonContext } from '../../contexts/JsonContext';
import style from './JsonViewer.module.css';

function JsonViewer() {
  const {
    jsonObject,
    loadNextPage,
    loadPreviousPage,
    setFile,
    currentIndex,
    file,
  } = useJsonContext();
  const isArray = Array.isArray(jsonObject);

  return (
    <main className={style.main}>
      <button type='button' onClick={() => setFile(undefined)}>
        Home
      </button>
      <button
        type='button'
        onClick={loadPreviousPage}
        disabled={currentIndex > 0}
      >
        Previous
      </button>
      <button
        type='button'
        onClick={loadNextPage}
        disabled={!file || currentIndex >= file.size - 1}
      >
        Next
      </button>
      <details open>
        <summary className={isArray ? 'isArray' : 'isObject'}></summary>
        <JsonItem data={jsonObject || {}} />
        <summary className='bracket'>{isArray ? ']' : '}'}</summary>
      </details>
    </main>
  );
}

export default JsonViewer;
