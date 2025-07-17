import React, { useState, useEffect } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner"
import Movie from "./components/Movie"
import { useDebounce } from "react-use"
import { fetchTrendingMovies } from "./appwrite"
import { AllMovieLoader, TrendingMovieLoader } from "./components/Loader"
import { fetchMovies } from "./services/movieService"

const App = () => {
  const [searchText, setSearchText] = useState("")
  const [debouncedSearchText, setDebouncedSearchText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useDebounce(
    () => {
      setDebouncedSearchText(searchText)
    },
    700,
    [searchText]
  )

  useEffect(() => {
    getData(debouncedSearchText)
  }, [debouncedSearchText])

  const getData = async text => {
    setLoading(true)
    try {
      const movieData = await fetchMovies(text)
      setErrorMessage("")
      setMovies(movieData)
    } catch (error) {
      setErrorMessage(error.message)
      setMovies([])
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
      const results = await fetchTrendingMovies()
      setTrendingMovies(results)
      setErrorTrendingMovies("")
    } catch (error) {
      setErrorTrendingMovies(error.message)
    } finally {
      setLoadingTrendingMovies(false)
    }
  }

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <h1>
            Find <span className="text-gradient">Movies & TV Shows</span> You'll Enjoy Without the Hassle
          </h1>

          <Search searchText={searchText} setSearchText={setSearchText} />
        </header>

        {debouncedSearchText === "" && (
          <section className="trending">
            <h2>Trending Movies</h2>

            {loadingTrendingMovies ? (
              <TrendingMovieLoader />
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

        <section className={`all-movies ${debouncedSearchText === "" ? "" : "mt-8"}`}>
          <h2>All Movies</h2>

          {loading ? (
            <AllMovieLoader />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie, index) => (
                <Movie key={index} data={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
