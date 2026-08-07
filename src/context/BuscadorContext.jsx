import { createContext, useContext, useEffect, useState } from "react"
import { buscarPeliculas } from "../services/tmdb"

const BusquedaContext = createContext()

export function BusquedaProvider({ children }) {
    const [busqueda, setBusqueda] = useState("")
    const [peliculas, setPeliculas] = useState(null)

    useEffect(() => {
        let cancelado = false

        const temporizador = setTimeout(() => {
            if (!busqueda) {
                setPeliculas(null)
                return
            }

            async function cargarPeliculas(busqueda) {
                const datos = await buscarPeliculas(busqueda)
                if (!cancelado) setPeliculas(datos)       
            }

            cargarPeliculas(busqueda)
        }, 500) 

        return () => {
            cancelado = true
            clearTimeout(temporizador)
        }

    }, [busqueda])

    return (
        <BusquedaContext.Provider value={{ busqueda, setBusqueda, peliculas }}>
            {children}
        </BusquedaContext.Provider>
    )
}

export function useBusqueda() {
  return useContext(BusquedaContext)
}
  