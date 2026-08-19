import { obtenerEnCartelera } from "../services/tmdb"
import ListarPeliculas from "../components/ListarPeliculas"

function EnCartelera() {
    return (
        <ListarPeliculas obtenerPeliculas={obtenerEnCartelera} titulo="Películas en cartelera" />
    )
}

export default EnCartelera