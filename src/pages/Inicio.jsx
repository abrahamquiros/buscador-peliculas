import { useState, useEffect } from 'react'
import { obtenerPopulares, IMG_URL } from "../services/tmdb"
import { useBusqueda } from "../context/BuscadorContext"
import no_image from "../assets/No_Image_Available.jpg"
import { Link, useParams } from "react-router-dom"

function Inicio() {
    const [populares, setPopulares] = useState([])
    const { peliculas } = useBusqueda()
    const listaAMostrar = peliculas || populares

    useEffect(() => {
        async function cargarPopulares() {
            const datos = await obtenerPopulares()
            setPopulares(datos)
        }

        cargarPopulares()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-8">
            {/* <p>Películas populares</p> */}
            <div className='grid grid-cols-5 p-8 gap-x-8 gap-y-8'>
                {listaAMostrar.map(pelicula => (
                    <Link key={pelicula.id} to={`/pelicula/${pelicula.id}`}>
                        <div className="border border-gray-300 min-h-90 rounded-lg shadow-sm">
                            <img 
                                src={pelicula.poster_path ? `${IMG_URL}${pelicula.poster_path}` : no_image}
                                alt={pelicula.original_title}
                                className="w-full h-60 rounded-t-lg"
                            />
                            <div className='p-4'>
                                    <p className='font-semibold'>{pelicula.title}</p>
                                    <p><span className='text-gray-600 font-semibold'>Estreno</span>: {pelicula.release_date}</p>
                            </div>         
                        </div>
                    </Link>          
                ))}
            </div>
        </div>  
    )
}

export default Inicio