import ReactDOM from 'react-dom/client';
import { StoreProvider } from 'app/providers/StoreProvider';

import App from './App.tsx';

import './index.css';

const element = document.getElementById('root');

if (element) {
  ReactDOM.createRoot(element).render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );
}
