import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import App from './App.js'

createRoot(document.getElementById('root') as Element).render(
  <StrictMode>
    <App /> 
  </StrictMode>,
)

