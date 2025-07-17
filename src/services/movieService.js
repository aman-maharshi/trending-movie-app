import { OMDB_BASE_URL } from "../utils/api-constants"
import { updateSearchCount } from "../appwrite"

const getRandomWord = () => {
  const movieTitleWords = [
    "big",
    "dark",
    "good",
    "bad",
    "great",
    "little",
    "new",
    "dead",
    "beautiful",
    "man",
    "woman",
    "love",
    "life",
    "world",
    "night",
    "day",
    "war",
    "home",
    "king",
    "girl",
    "boy",
    "city",
    "heart",
    "story"
  ]
  return movieTitleWords[Math.floor(Math.random() * movieTitleWords.length)]
}

export const fetchMovies = async (searchText, page = 1) => {
  const query = searchText || getRandomWord()

  try {
    const response = await fetch(`${OMDB_BASE_URL}&s=${query}&page=${page}`)
    if (response.ok) {
      const data = await response.json()
      if (data.Response === "False") {
        throw new Error(data.Error || "Failed to fetch movies")
      }

      // pushing the first search result to Appwrite
      if (searchText && data.Search.length > 0) {
        await updateSearchCount(searchText, data.Search[0])
      }

      return {
        movies: data.Search,
        totalResults: data.totalResults,
        hasMore: data.Search && data.Search.length > 0
      }
    } else {
      throw new Error("Error fetching movies. Please try again later.")
    }
  } catch (error) {
    console.log(error)
    throw new Error("Error fetching movies. Please try again later.")
  }
}
