import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import { API_BASE_URL, API_OPTIONS, OMDB_BASE_URL } from './utils/api-constants'
import Movie from './components/Movie'
import { useDebounce } from "react-use"
import { updateSearchCount } from './appwrite'

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

        <section className='all-movies'>
          <h2 className='max-md:mt-4 mt-8'>All Movies</h2>

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