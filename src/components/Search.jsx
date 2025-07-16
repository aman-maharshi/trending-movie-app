import React, { useState } from "react"

const Search = ({ searchText, setSearchText }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="search">
      <div>
        <svg
          className={`absolute left-3 h-6 w-6 transition-all duration-300 ${
            isFocused ? "text-accent opacity-100" : "text-gray-400 opacity-60"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search through thousands of movies..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent py-3 pl-12 pr-4 text-lg text-white placeholder-gray-400 outline-none font-medium"
        />

        {searchText && (
          <button
            onClick={() => setSearchText("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-400 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Search
