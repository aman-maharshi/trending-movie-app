import React from "react"
import { API_BASE_URL, API_OPTIONS } from "../utils/api-constants"

const Search = ({ searchText, setSearchText }) => {
  const handleClear = () => {
    setSearchText("")
  }

  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />

        {searchText && (
          <button onClick={handleClear} className="clear-btn cursor-pointer" type="button" aria-label="Clear search">
            ×
          </button>
        )}
      </div>
    </div>
  )
}
export default Search
