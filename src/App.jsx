import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import { API_BASE_URL, API_OPTIONS, OMDB_BASE_URL } from './utils/api-constants'
import Movie from './components/Movie'

const App = () => {
  const [searchText, setSearchText] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // getMovies(searchText)
  }, [searchText])


  // const getMovies = async (query = '') => {
  //   setLoading(true)
  //   setErrorMessage("")

  //   try {
  //     const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
  //     const response = await fetch(endpoint, API_OPTIONS)

  //     if (!response.ok) throw new Error("Failed to fetch movies")

  //     const data = await response.json()

  //     if (data.response === 'False') {
  //       setErrorMessage(data.Error || "Failed to fetch movies")
  //       setMovies([])
  //       return
  //     }

  //     setMovies(data.results || [])

  //   } catch (error) {
  //     console.error("Error fetching movies: ", error)
  //     setErrorMessage("Error fetching movies. Please try again later.")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    getData(searchText)
  }, [searchText])

  const getRandomWord = () => {
    const words = ["beautiful", "amazing", "wonderful", "fantastic", "incredible", "summer", "home", "winter", "love"]
    return words[Math.floor(Math.random() * words.length)]
  }

  const getData = async (searchText) => {
    setLoading(true)
    const query = searchText || getRandomWord()
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
      }
    } catch (error) {
      console.log(error)
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
              {movies.map((movie, index) => <Movie key={index} data={movie} />)}
            </ul>
          )}

        </section>


      </div>
    </main>
  )
}

export default App