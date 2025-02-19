import ReactDOM from 'react-dom/client';

import React from 'react';
import App from './App';
import { ArticleProvider } from './context/article-provider';
import './index.css';
import ErrorBoundary from './lib/error-boundary';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ArticleProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ArticleProvider>
  </React.StrictMode>
);
