import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css';
import App from './App.jsx'
import './styles/pagestyles.css'
import './styles/RegistrationForm.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
