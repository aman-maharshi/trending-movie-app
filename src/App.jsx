import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import { API_BASE_URL, API_OPTIONS } from './utils/api-constants'

const App = () => {
  const [searchText, setSearchText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getMovies()
  }, [])


  const getMovies = async () => {
    setLoading(true)
    setErrorMessage("")

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) throw new Error("Failed to fetch movies")

      const data = await response.json()

      if (data.response === 'False') {
        setErrorMessage(data.Error || "Failed to fetch movies")
        setMovies([])
        return
      }

      setMovies(data.results || [])

    } catch (error) {
      console.error("Error fetching movies: ", error)
      setErrorMessage("Error fetching movies. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>

          <Search
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </header>

        <section className='all-movies'>
          <h2>All Movies</h2>

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <p key={movie.id} className='text-white'>{movie?.title}</p>
              ))}
            </ul>
          )}

        </section>


      </div>
    </main>
  )
}

export default App