import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import { OMDB_BASE_URL } from './utils/api-constants'
import Movie from './components/Movie'
import { useDebounce } from "react-use"
import { getTrendingMovies, updateSearchCount } from './appwrite'

const App = () => {
  const [searchText, setSearchText] = useState("")
  const [debouncedSearchText, setDebouncedSearchText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useDebounce(() => {
    setDebouncedSearchText(searchText)
  }, 700, [searchText])

  useEffect(() => {
    getData(debouncedSearchText)
  }, [debouncedSearchText])

  const getRandomWord = () => {
    const movieTitleWords = [
      "big", "dark", "good", "bad", "great", "little", "new", "dead", "beautiful",
      "man", "woman", "love", "life", "world", "night", "day", "war", "home",
      "king", "girl", "boy", "city", "heart", "story"
    ]
    return movieTitleWords[Math.floor(Math.random() * movieTitleWords.length)]
  }

  const getData = async (text) => {
    setLoading(true)
    const query = text || getRandomWord()
    try {
      const response = await fetch(`${OMDB_BASE_URL}&s=${query}&page=1`)
      if (response.ok) {
        const data = await response.json()
        if (data.Response === "False") {
          setErrorMessage(data.Error || "Failed to fetch movies")
          setMovies([])
          return
        }
        // console.log(data)
        setErrorMessage("")
        setMovies(data.Search)

        // pushing the first search result to Appwrite
        if (text && data.Search.length > 0) {
          await updateSearchCount(text, data.Search[0])
        }
      }
    } catch (error) {
      console.log(error)
      setErrorMessage("Error fetching movies. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  /*
    TRENDING MOVIES
  ------------------*/
  const [trendingMovies, setTrendingMovies] = useState([])
  const [loadingTrendingMovies, setLoadingTrendingMovies] = useState(false)
  const [errorTrendingMovies, setErrorTrendingMovies] = useState("")

  useEffect(() => {
    getTrendingMoviesData()
  }, [])

  const getTrendingMoviesData = async () => {
    setLoadingTrendingMovies(true)
    try {
      const results = await getTrendingMovies()
      // console.log(results, "trending movies")
      if (results.length > 0) {
        setTrendingMovies(results)
        setErrorTrendingMovies("")
      }
    } catch (error) {
      console.error(error)
      setErrorTrendingMovies("Failed to fetch trending movies")
    } finally {
      setLoadingTrendingMovies(false)
    }
  }


  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          {/* <img src="./hero.png" alt="Hero Banner" /> */}
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

          <Search
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </header>

        {debouncedSearchText === "" && (
          <section className="trending">
            <h2>Trending Movies</h2>

            {loadingTrendingMovies ? (
              <Spinner />
            ) : errorMessage ? (
              <p className="text-red-500">{errorTrendingMovies}</p>
            ) : (
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.imageUrl} alt={movie.searchTerm} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie, index) => <Movie key={index} data={movie} />)}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App