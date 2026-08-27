import { useState, useEffect } from 'react'
import { IMG_URL } from "../services/tmdb"
import no_image from "../assets/No_Image_Available.jpg"
import { Link } from "react-router-dom"

function ListarPeliculas({ obtenerPeliculas, titulo }) {
    const [peliculas, setPeliculas] = useState([])

    useEffect(() => {
        async function cargarPeliculas() {
            const datos = await obtenerPeliculas()
            setPeliculas(datos)
        }

        cargarPeliculas()
    }, [obtenerPeliculas])

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <p className='text-[rgb(249,199,0)] text-lg font-semibold w-1/2 p-2 ml-8 mt-6 py-1 bg-gradient-to-r from-blue-500 to-transparent'>
                {titulo}
            </p>
            { peliculas.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No se encontraron películas.</p>
            ) : (
                // responsive: clase-base (movil) md:clase-mediana (tablet ) lg:clase-grande (escritorio)
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-8 gap-x-8 gap-y-8'>
                    {peliculas.map(pelicula => (
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
            ) }     
        </div>     
    )
}

export default ListarPeliculas