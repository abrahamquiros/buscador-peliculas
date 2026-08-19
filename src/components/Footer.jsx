import { useAuth } from "../context/AuthContext"

function Footer() {
    const { autenticado } = useAuth()

    if (!autenticado) return null

    return (
        <div className="flex flex-col gap-1 px-1 py-6 mt-6 text-center text-sm border-t border-gray-800 bg-blue-300">
            <p>&copy; {new Date().getFullYear()} FilmaCine | Esta página web es un proyecto de demostración sin fines de lucro.</p> 
            <p>Todos los datos, imágenes y videos de las películas pertenecen a sus respectivos dueños y se utilizan únicamente con fines ilustrativos para este portafolio.</p>   
            <p>
                Datos proporcionados por: {" "}
                <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="underline">
                    The Movie Database (TMDB)
                </a>
            </p>
        </div>               
    )
}

export default Footer