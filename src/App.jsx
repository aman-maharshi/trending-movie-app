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
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  useDebounce(
    () => {
      setDebouncedSearchText(searchText)
    },
    700,
    [searchText]
  )

  useEffect(() => {
    setCurrentPage(1)
    getData(debouncedSearchText, 1)
  }, [debouncedSearchText])

  const getData = async (text, page = 1) => {
    if (page === 1) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }

    try {
      const movieData = await fetchMovies(text, page)
      setErrorMessage("")

      if (page === 1) {
        setMovies(movieData.movies)
      } else {
        setMovies(prev => [...prev, ...movieData.movies])
      }

      setHasMore(movieData.hasMore)
    } catch (error) {
      setErrorMessage(error.message)
      if (page === 1) {
        setMovies([])
      }
    } finally {
      setLoading(false)
      setLoadingMore(false)
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

  const loadMoreMovies = async () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    await getData(debouncedSearchText, nextPage)
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
            <>
              <ul>
                {movies.map((movie, index) => (
                  <Movie key={index} data={movie} />
                ))}
              </ul>

              {hasMore && movies.length > 0 && (
                <div className="load-more-container">
                  <button onClick={loadMoreMovies} disabled={loadingMore} className="load-more-btn">
                    {loadingMore ? "Loading..." : "Load More Movies"}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
