import { lazy } from 'react';
import { useJsonContext } from './contexts/JsonContext';
const Home = lazy(() => import('./pages/Home'));
const JsonViewer = lazy(() => import('./pages/JsonViewer'));

function App() {
  const { hasFile } = useJsonContext();
  return hasFile ? <JsonViewer /> : <Home />;
}

export default App;
