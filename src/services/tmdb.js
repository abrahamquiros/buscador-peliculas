const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"
export const IMG_URL = "https://image.tmdb.org/t/p/w500"

export async function buscarPeliculas(query) {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES`)
  const datos = await res.json()
  return datos.results
}

export async function obtenerDetalle(id) {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=credits,videos`)
  const datos = await res.json()

  // Comprueba si hay algún trailer en español
  const hayTrailerEs = datos.videos.results.some(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )

  // Si no hay, pide los vídeos en inglés y los añade
  if (!hayTrailerEs) {
    const resVideosEn = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
    const datosVideosEn = await resVideosEn.json()
    datos.videos = datosVideosEn
  }

  return datos
}

export async function obtenerPopulares() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`)
  const datos = await res.json()
  return datos.results
}

// Para buscar "Películas en cartelera" TMDB tiene el Endpoint: /movie/now_playing y el parámetro region=ES para España concretamente
export async function obtenerEnCartelera() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&region=ES`)
  const datos = await res.json()
  return datos.results
}

export async function obtenerProximamente() {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=es-ES&region=ES`)
  const datos = await res.json()
  return datos.results
}