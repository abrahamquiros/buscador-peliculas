import { useState, useEffect } from 'react'
import { obtenerDetalle, IMG_URL } from "../services/tmdb"
import { useParams } from "react-router-dom"
import no_image from "../assets/No_Image_Available.jpg"
import { useFavoritos } from "../context/FavoritosContext"

function Detalle() {
    const {id} = useParams()
    const [pelicula, setPelicula] = useState(null)
    const { agregarFavorito, eliminarFavorito, esFavorito } = useFavoritos()

    useEffect(() => {
        async function cargarDetalles(id) {
            const datos = await obtenerDetalle(id)
            setPelicula(datos)
        }
    
        cargarDetalles(id)
    }, [id])

    if (!pelicula) return; 

    // Acceso seguro al año
    const año = pelicula.release_date?.split("-")[0]

    // Extraemos el director y guionista de forma segura ANTES del return
    const director = pelicula.credits?.crew?.find(p => p.job === "Director")?.name || "Desconocido";
    const guionista = pelicula.credits?.crew?.find(p => p.job === "Writer")?.name || "Desconocido";

    // Acceso seguro al país principal
    const codigoPais = pelicula.production_countries?.[0]?.iso_3166_1
    const regionNames = new Intl.DisplayNames(["es"], { type: "region" })
    const pais = codigoPais ? regionNames.of(codigoPais) : "No disponible"

    // Acceso seguro al trailer
    const trailer = pelicula.videos?.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
    )

    const trailerKey = trailer?.key

    return (
        <div className="max-w-7xl mx-auto px-8">  
            {/* grid-cols-[256px_1fr] para que la primera columna tenga exactamente el ancho de la imagen y la segunda ocupe el resto. */}
            <div 
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${pelicula.backdrop_path})` }}
                // bg-blend-multiply: Fusiona la imagen con el color de fondo y bg-black/60: Sube la opacidad a 60% para que la imagen se vea más oscura 
                className='bg-cover bg-center bg-black/60 bg-blend-multiply text-white grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-x-6 p-4'
            >
            {/* <div className='bg-[#1c1c1c] text-white grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-x-6 p-4'>     */}
                <div className='col-span-1 lg:col-span-2 mb-3 flex justify-between items-center gap-3'>
                    <h1 className='text-2xl font-semibold'>{pelicula.title} ({año})</h1>
                    <button 
                        onClick={() => esFavorito(pelicula.id) ? eliminarFavorito(pelicula.id) : agregarFavorito(pelicula)}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg cursor-pointer'
                    >
                        {esFavorito(pelicula.id) ? "✅ Quitar de favoritos" : "Añadir a favoritos"}
                    </button>
                </div>
                <div className='flex flex-col gap-3 w-64 col-span-1'>              
                    <img 
                        src={pelicula.poster_path ? `${IMG_URL}${pelicula.poster_path}` : "/no-image.png"}
                        alt={pelicula.title}
                        className="w-full h-96 rounded-lg object-cover" 
                        // object-cover para asegura que la imagen no se deforme si no tiene exactamente las proporciones del contenedor.
                    />
                </div>
                <div className='flex flex-col gap-2 flex-1 col-span-1 mt-4 lg:mt-0'> {/* flex-1 ocupa todo el espacio restante disponible, independientemente del contenido. */}
                    <div>
                        <h1 className='text-xl font-semibold mb-1'>Ficha</h1>
                        <hr className='w-1/2' />
                    </div>
                    <p><span className='font-semibold'>Título:</span> {pelicula.title}</p>
                    <p><span className='font-semibold'>Título original:</span> {pelicula.original_title}</p>
                    <p><span className='font-semibold'>País:</span> {pais}</p>
                    <p><span className='font-semibold'>Fecha de estreno:</span> {pelicula.release_date}</p>
                    <p><span className='font-semibold'>Duración:</span> {pelicula.runtime} min</p>     
                    <p><span className='font-semibold'>Dirección:</span> {director}</p>
                    <p><span className='font-semibold'>Guion:</span> {guionista}</p>
                    <p><span className='font-semibold'>Género:</span> {pelicula.genres?.map(g => g.name).join(", ")}</p>
                    <div className='flex gap-1'>
                        <p className='font-semibold'>Sinopsis:</p>
                        <p>{pelicula.overview}</p>
                    </div>
                </div> 
            </div>
            <div className="flex flex-col gap-5 mt-6">
                <div>
                    <h1 className='text-xl font-semibold mb-1'>Reparto Principal</h1>
                    <hr className='w-1/2' />
                </div>           
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 md:gap-4'>
                    {pelicula.credits?.cast?.slice(0, 8).map(actor => (
                        <div key={actor.id} className="border border-gray-300 h-72 rounded-lg shadow-sm overflow-hidden">
                            <img 
                                src={actor.profile_path ? `${IMG_URL}${actor.profile_path}` : no_image}
                                alt={actor.name}
                                className="w-full h-48 rounded-t-lg"
                            />
                            <div className='p-4'>
                                <p className='text-sm font-semibold '>{actor.name}</p>
                                <p className='text-sm text-gray-600 font-semibold'>{actor.character}</p>
                            </div>
                        </div>
                    ))}
                </div>                   
            </div>
            {trailerKey && (
                <div className="flex flex-col gap-5 mt-6">
                    <div>
                        <h1 className='text-xl font-semibold mb-1'>Tráiler</h1>
                        <hr className='w-1/2' />
                    </div>
                    <div className="max-w-4xl">
                        {trailerKey && (
                            <iframe
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="Tráiler"
                                allowFullScreen // Para que el usuario pueda poner el video en pantalla completa
                                className="w-full aspect-video"
                            />
                        )}
                    </div>
                </div>
            )}         
        </div> 
    )
}

export default Detalle