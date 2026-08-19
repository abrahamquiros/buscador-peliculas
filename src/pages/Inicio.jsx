import { obtenerPopulares } from "../services/tmdb"
import ListarPeliculas from "../components/ListarPeliculas"

function Inicio() {
    return (
        <ListarPeliculas obtenerPeliculas={obtenerPopulares} titulo="Películas populares" />
    )
}

export default Inicio