import React from "react"

const Movie = ({ data, onMovieClick }) => {
  // Simple error handling for individual movies
  if (!data || !data.Title) {
    return (
      <div className="movie-card bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
        <div className="h-[400px] bg-gray-700/50 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm font-medium">Movie data unavailable</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-400 font-semibold">Unknown Title</h3>
          <div className="content">
            <p className="year text-gray-500">N/A</p>
          </div>
        </div>
      </div>
    )
  }

  const { Title, Poster, Year, imdbID, Type } = data

  return (
    <div className="movie-card group" onClick={() => onMovieClick(data)}>
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={Poster && Poster !== "N/A" ? Poster : "/no-movie.png"}
          alt={Title}
          className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
          onError={e => {
            e.target.src = "/no-movie.png"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2">
            <div className="bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-white text-sm font-semibold">View on IMDB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-white font-semibold text-lg line-clamp-2 mb-3 group-hover:text-accent-light transition-colors duration-200">
          {Title}
        </h3>

        <div className="content">
          <div className="flex items-center gap-2">
            <p className="year">{Year || "N/A"}</p>
            {Type && <span className="movie-type bg-gray-800/50 px-2 py-1 rounded-md">{Type}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movie
