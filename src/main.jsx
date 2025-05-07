import { hydrateRoot } from 'react-dom/client' 
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './store/Store.js'
import { HelmetProvider } from 'react-helmet-async';

hydrateRoot(document.getElementById('root'),
  <Provider store={Store}>
    <HelmetProvider>
    <div className='font-cambria'>
      <App />
    </div>
    </HelmetProvider>
  </Provider>
)

