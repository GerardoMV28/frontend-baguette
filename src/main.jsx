import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // 👈 IMPORTAR
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* 👈 ENVOLVER APP CON BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
)