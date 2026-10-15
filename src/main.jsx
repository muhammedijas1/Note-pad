import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Noteprovider } from './context/notecontext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Noteprovider>
      <App />
    </Noteprovider>
  </StrictMode>,
)
