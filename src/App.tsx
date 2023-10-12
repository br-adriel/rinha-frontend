import { Suspense, lazy } from 'react';
import { useJsonContext } from './contexts/JsonContext';
const Home = lazy(() => import('./pages/Home'));
const JsonViewer = lazy(() => import('./pages/JsonViewer'));

function App() {
  const { file } = useJsonContext();

  return file ? (
    <Suspense fallback={<h1>Carregando</h1>}>
      <JsonViewer />
    </Suspense>
  ) : (
    <Suspense fallback={<h1>Carregando</h1>}>
      <Home />
    </Suspense>
  );
}

export default App;
