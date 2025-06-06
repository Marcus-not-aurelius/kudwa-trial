import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { BreadcrumbProvider } from './stores/useBreadcrumbContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BreadcrumbProvider>
        <App />
      </BreadcrumbProvider>
    </BrowserRouter>
  </StrictMode>,
)
