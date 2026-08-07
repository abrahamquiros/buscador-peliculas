import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FavoritosProvider } from './context/FavoritosContext.jsx'
import { BusquedaProvider } from './context/BuscadorContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FavoritosProvider>
        <BusquedaProvider>
          <App />
        </BusquedaProvider>
      </FavoritosProvider>
    </AuthProvider>
  </StrictMode>,
)
