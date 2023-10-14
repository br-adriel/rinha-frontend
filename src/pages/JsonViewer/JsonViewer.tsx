import Loading from '../../components/Loading';
import { useJsonContext } from '../../contexts/JsonContext';
import style from './JsonViewer.module.css';
import { lazy } from 'react';

const JsonItem = lazy(() => import('../../components/JsonItem'));

function JsonViewer() {
  const { file, jsonObject, loading, setFile } = useJsonContext();
  const isArray = Array.isArray(jsonObject);

  if (loading) return <Loading />;
  return (
    <main className={style.main}>
      <div className={style.titleBar}>
        <h1 className={style.filename}>{file?.name}</h1>
        <button onClick={() => setFile(undefined)}>Home</button>
      </div>

      <details open>
        <summary className={isArray ? 'isArray' : 'isObject'}></summary>
        <JsonItem data={jsonObject || {}} />
        <summary className='bracket'>{isArray ? ']' : '}'}</summary>
      </details>
    </main>
  );
}

export default JsonViewer;
