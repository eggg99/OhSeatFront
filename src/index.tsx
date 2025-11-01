import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/css/common.scss'
import '@/styles/css/default.scss'

// import '@/index.css'
import App from './App.jsx';

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
        <App />
  );
}
