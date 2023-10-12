import { Suspense, lazy } from 'react';
import Loading from './components/Loading';
import { useJsonContext } from './contexts/JsonContext';
const Home = lazy(() => import('./pages/Home'));
const JsonViewer = lazy(() => import('./pages/JsonViewer'));

function App() {
  const { file } = useJsonContext();

  return file ? (
    <Suspense fallback={<Loading />}>
      <JsonViewer />
    </Suspense>
  ) : (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
}

export default App;
