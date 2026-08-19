import { useSearchParams } from "react-router-dom"
import { buscarPeliculas } from "../services/tmdb"
import ListarPeliculas from "../components/ListarPeliculas"

function Buscar() {

    const [searchParams] = useSearchParams()
    const termino = searchParams.get("q")

    return (
        <ListarPeliculas obtenerPeliculas={() => buscarPeliculas(termino)} titulo={`Resultados para "${termino}"`} />
    )
}

export default Buscar