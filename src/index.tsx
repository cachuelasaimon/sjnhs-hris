import React from 'react';

import { SnackbarProvider } from 'notistack';
import { createRoot } from 'react-dom/client';

import './index.css';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container as any);

root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
