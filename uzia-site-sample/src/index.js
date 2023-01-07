import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheet/index.css';
import './stylesheet/customStyleSheet.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
