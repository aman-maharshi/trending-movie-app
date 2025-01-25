import React from 'react'
import { API_BASE_URL, API_OPTIONS} from "../utils/api-constants"

const Search = ({ searchText, setSearchText }) => {
  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />

        <input
          type="text"
          placeholder="Search through thousands of movies"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  )
}
export default Search
