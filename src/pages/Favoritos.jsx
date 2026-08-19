import { IMG_URL } from "../services/tmdb"
import { useFavoritos } from "../context/FavoritosContext"
import { Link, useParams } from "react-router-dom"

function Favoritos() {
    const { favoritos, eliminarFavorito } = useFavoritos()
    
    return (    
        <div className="max-w-7xl mx-auto px-8">
            {favoritos.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No tienes películas favoritas aún</p>
            )}
            <p className='text-[rgb(249,199,0)] text-lg font-semibold w-1/2 p-2 ml-8 mt-6 py-1 bg-gradient-to-r from-blue-500 to-transparent'>Películas favoritas</p>
            <div className='grid grid-cols-5 p-8 gap-x-8 gap-y-8'>
                {favoritos.map(pelicula => (
                    /* min-h-90 para que la card tenga una altura minima de 90 y flex-col justify-between el contenido se distribuye 
                    y el botón siempre queda abajo */
                    <div key={pelicula.id} className="border border-gray-300 min-h-90 rounded-lg shadow-sm flex flex-col justify-between">
                        <Link to={`/pelicula/${pelicula.id}`}>
                            <img 
                                src={pelicula.poster_path ? `${IMG_URL}${pelicula.poster_path}` : no_image}
                                alt={pelicula.original_title}
                                className="w-full h-60 rounded-t-lg"
                            />
                            <div className='p-4'>
                                <p className='font-semibold'>{pelicula.title}</p>
                                <p><span className='text-gray-600 font-semibold'>Estreno</span>: {pelicula.release_date}</p>       
                            </div> 
                        </Link> 
                        <button
                            onClick={() => {
                                    eliminarFavorito(pelicula.id)
                            }}
                            // self-start aplica el alineamiento solo a ese elemento sin afectar a los demás
                            className='bg-blue-500 hover:bg-blue-700 text-white font-semibold px-2 py-1 ml-4 mb-2 self-start rounded-lg cursor-pointer'
                        >
                            Quitar
                        </button>       
                    </div>                          
                ))}
            </div>
        </div>
    )
}

export default Favoritos