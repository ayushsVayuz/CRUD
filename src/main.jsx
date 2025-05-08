import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { Provider } from 'react-redux';
import store from './store/Store.js'; 
import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Provider store={store}>
    <div className="font-cambria">
      <App />
    </div>
  </Provider>
);
