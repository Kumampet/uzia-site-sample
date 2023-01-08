import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheet/index.css';
import './stylesheet/customStyleSheet.css';
import App from './App';
import AppContext from './AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const contextValue = {
  text: 'text'
}
root.render(
  <React.StrictMode>
    <AppContext.Provider value={contextValue}>
      <App />
    </AppContext.Provider>
  </React.StrictMode>
);
