import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { JsonContextProvider } from './contexts/JsonContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <JsonContextProvider>
      <App />
    </JsonContextProvider>
  </React.StrictMode>
);
