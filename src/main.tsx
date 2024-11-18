import { BrowserRouter } from 'react-router-dom';
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { store } from './app/store.ts';

const portalDiv = document.createElement('div');
portalDiv.id = 'portal-root';
document.body.appendChild(portalDiv);

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);
