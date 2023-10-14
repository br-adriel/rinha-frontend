import { Suspense, lazy } from 'react';
import Loading from './components/Loading';
import { useJsonContext } from './contexts/JsonContext';
import Footer from './components/Footer';
const Home = lazy(() => import('./pages/Home'));
const JsonViewer = lazy(() => import('./pages/JsonViewer'));

function App() {
  const { file } = useJsonContext();

  return (
    <>
      {file ? (
        <Suspense fallback={<Loading />}>
          <JsonViewer />
        </Suspense>
      ) : (
        <Suspense fallback={<Loading />}>
          <Home />
          <Footer />
        </Suspense>
      )}
      <Footer />
    </>
  );
}

export default App;
