import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './components/redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <PersistGate persistor={persistor}>
      <Provider store={store}>
          <HashRouter>
            <App />
          </HashRouter>
        </Provider>
    </PersistGate>
)
