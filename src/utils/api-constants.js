
export const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const API_BASE_URL = 'https://api.themoviedb.org/3'

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

export const OMDB_BASE_URL = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}`