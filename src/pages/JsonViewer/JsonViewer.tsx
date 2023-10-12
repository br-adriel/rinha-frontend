import JsonItem from '../../components/JsonItem';
import { useJsonContext } from '../../contexts/JsonContext';
import style from './JsonViewer.module.css';

function JsonViewer() {
  const { setHasFile, jsonObject } = useJsonContext();
  const isArray = Array.isArray(jsonObject);

  return (
    <main className={style.main}>
      <button type='button' onClick={() => setHasFile(false)}>
        Voltar
      </button>
      <details open>
        <summary className={isArray ? 'isArray' : 'isObject'}></summary>
        <JsonItem data={jsonObject} />
        <summary className='bracket'>{isArray ? ']' : '}'}</summary>
      </details>
    </main>
  );
}

export default JsonViewer;
