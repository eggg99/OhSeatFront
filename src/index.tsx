import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import './styles/layout.scss';
import './styles/button.scss';
import '@/index.css'
import App from './App.jsx';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  );
}
