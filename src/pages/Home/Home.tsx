import FileInput from '../../components/FileInput';
import style from './Home.module.css';

interface Props {
  invalid?: boolean
}

function Home({ invalid = false }: Props) {
  return (
    <main className={style.main}>
      <h1 className='text-center'>JSON Tree Viewer</h1>
      <h2 className='text-center'>Simple JSON Viewer that runs completely on-client. No data exchange</h2>
      <FileInput>Load JSON</FileInput>
      {invalid && <p className={style.error}>Invalid file. Please load a valid JSON file.</p>}
    </main>
  )
}

export default Home