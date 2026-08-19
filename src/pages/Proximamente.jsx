import { obtenerProximamente } from "../services/tmdb"
import ListarPeliculas from "../components/ListarPeliculas"

function Proximamente() {
    return (
        <ListarPeliculas obtenerPeliculas={obtenerProximamente} titulo={"Próximas películas"} />
    )
}

export default Proximamente