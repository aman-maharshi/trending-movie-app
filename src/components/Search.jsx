import React from "react"
import { API_BASE_URL, API_OPTIONS } from "../utils/api-constants"

const Search = ({ searchText, setSearchText }) => {
  const handleClear = () => {
    setSearchText("")
  }

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-icon">
          <img src="search.svg" alt="search" />
        </div>

        <input
          type="text"
          placeholder="Search through thousands of movies..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="search-input"
          aria-label="Search movies"
        />

        {searchText && (
          <button onClick={handleClear} className="clear-button" type="button" aria-label="Clear search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
export default Search
