import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.jsx';
import { Toaster } from 'react-hot-toast'
import AnimatedCursor from "react-animated-cursor"

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <BrowserRouter>
        <App />
      <Toaster />
       {/* <AnimatedCursor innerSize={24} outerSize={24} color='128,128,128' outerScale={1} /> */}
      </BrowserRouter>
      </Provider>
  
)
