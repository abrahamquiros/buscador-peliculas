import { createContext, useContext, useState, useEffect } from "react"

const FavoritosContext = createContext()

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const guardado = localStorage.getItem("favoritos")
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
  }, [favoritos])

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