const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"
export const IMG_URL = "https://image.tmdb.org/t/p/w500"

export async function buscarPeliculas(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES`)
  const datos = await res.json()
  return datos.results
}

export async function obtenerDetalle(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=credits`)
  return await res.json()
}

export async function obtenerPopulares() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`)
  const datos = await res.json()
  return datos.results
}