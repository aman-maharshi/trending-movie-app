import React, { useState, useEffect } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner"
import { OMDB_BASE_URL } from "./utils/api-constants"
import Movie from "./components/Movie"
import { useDebounce } from "react-use"
import { getTrendingMovies, updateSearchCount } from "./appwrite"
import { AllMovieLoader, TrendingMovieLoader } from "./components/Loader"
import Pagination from "./components/Pagination"
import MovieDetail from "./components/MovieDetail"

const App = () => {
  const [searchText, setSearchText] = useState("")
  const [debouncedSearchText, setDebouncedSearchText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [hasMorePages, setHasMorePages] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [globalError, setGlobalError] = useState(null)

  // Simple error handler for the entire app
  const handleGlobalError = error => {
    console.error("App Error:", error)
    setGlobalError("Something went wrong. Please refresh the page.")
  }

  // Clear global error
  const clearGlobalError = () => {
    setGlobalError(null)
  }

  // Add global error listener
  useEffect(() => {
    const handleError = event => {
      handleGlobalError(event.error)
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", event => {
      handleGlobalError(event.reason)
    })

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleError)
    }
  }, [])

  // Initialize search from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const searchParam = urlParams.get("search")
    if (searchParam) {
      setSearchText(searchParam)
      setDebouncedSearchText(searchParam)
    }
  }, [])

  useDebounce(
    () => {
      setDebouncedSearchText(searchText)
      // Update URL with search query
      const url = new URL(window.location)
      if (searchText) {
        url.searchParams.set("search", searchText)
      } else {
        url.searchParams.delete("search")
      }
      window.history.replaceState({}, "", url)
    },
    700,
    [searchText]
  )

  useEffect(() => {
    getData(debouncedSearchText)
  }, [debouncedSearchText])

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

  const getData = async (text, page = 1) => {
    setLoading(true)
    const query = text || getRandomWord()
    try {
      const response = await fetch(`${OMDB_BASE_URL}&s=${query}&page=${page}`)
      if (response.ok) {
        const data = await response.json()
        if (data.Response === "False") {
          setErrorMessage(data.Error || "Failed to fetch movies")
          setMovies([])
          return
        }

        setErrorMessage("")
        setTotalResults(parseInt(data.totalResults) || 0)
        setHasMorePages(page * 10 < parseInt(data.totalResults))

        if (page === 1) {
          setMovies(data.Search)
        } else {
          setMovies(prev => [...prev, ...data.Search])
        }

        // pushing the first search result to Appwrite
        if (text && data.Search.length > 0 && page === 1) {
          try {
            await updateSearchCount(text, data.Search[0])
          } catch (appwriteError) {
            console.warn("Failed to update search count:", appwriteError)
            // Don't show error to user for analytics failures
          }
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.log(error)
      setErrorMessage("Error fetching movies. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const loadMoreMovies = () => {
    try {
      if (!loading && hasMorePages) {
        const nextPage = currentPage + 1
        setCurrentPage(nextPage)
        getData(debouncedSearchText, nextPage)
      }
    } catch (error) {
      console.error("Error loading more movies:", error)
      setErrorMessage("Failed to load more movies")
    }
  }

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1)
    setMovies([])
    getData(debouncedSearchText, 1)
  }, [debouncedSearchText])

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
      if (results && results.length > 0) {
        setTrendingMovies(results)
        setErrorTrendingMovies("")
      } else {
        setErrorTrendingMovies("No trending movies available")
      }
    } catch (error) {
      console.error(error)
      setErrorTrendingMovies("Failed to fetch trending movies")
    } finally {
      setLoadingTrendingMovies(false)
    }
  }

  const handleMovieClick = movie => {
    try {
      if (!movie || !movie.Title) {
        console.warn("Invalid movie data:", movie)
        return
      }
      setSelectedMovie(movie)
      setIsDetailOpen(true)
    } catch (error) {
      console.error("Error opening movie details:", error)
      setErrorMessage("Failed to open movie details")
    }
  }

  const closeMovieDetail = () => {
    try {
      setIsDetailOpen(false)
      setSelectedMovie(null)
    } catch (error) {
      console.error("Error closing movie details:", error)
    }
  }

  return (
    <main>
      {/* Global Error Overlay */}
      {globalError && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 rounded-2xl p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-400 mb-6">{globalError}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={clearGlobalError}
                className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-primary font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pattern" />

      <div className="wrapper">
        <header>
          {/* <img src="./hero.png" alt="Hero Banner" /> */}
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

          {loading && movies.length === 0 ? (
            <AllMovieLoader />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <>
              <ul>
                {movies.map((movie, index) => (
                  <Movie key={index} data={movie} onMovieClick={handleMovieClick} />
                ))}
              </ul>

              <Pagination
                hasMorePages={hasMorePages}
                loading={loading}
                onLoadMore={loadMoreMovies}
                totalResults={totalResults}
                currentCount={movies.length}
              />
            </>
          )}
        </section>
      </div>

      <MovieDetail movie={selectedMovie} isOpen={isDetailOpen} onClose={closeMovieDetail} />
    </main>
  )
}

export default App
