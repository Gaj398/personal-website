import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* GitHub Pages 部署在 /personal-website/ 子路径，需设 basename */}
    <BrowserRouter basename="/personal-website/">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
