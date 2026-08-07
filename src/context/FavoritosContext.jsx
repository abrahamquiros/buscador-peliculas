import { createContext, useContext, useState } from "react"

const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([])

  function agregarFavorito(pelicula) {
    setFavoritos([...favoritos, pelicula])
  }

  function eliminarFavorito(id) {
    setFavoritos(favoritos.filter(p => p.id !== id))
  }

  function esFavorito(id) {
    return favoritos.some(p => p.id === id)
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, agregarFavorito, eliminarFavorito, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  return useContext(FavoritosContext)
}