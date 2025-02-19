import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ArticleProvider } from './context/article-provider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ArticleProvider>
      <App />
    </ArticleProvider>
  </React.StrictMode>
);
