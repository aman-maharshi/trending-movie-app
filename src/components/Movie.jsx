import React from "react"

const Movie = ({ data, onMovieClick }) => {
  // Simple error handling for individual movies
  if (!data || !data.Title) {
    return (
      <div className="movie-card bg-gray-800 p-5 rounded-2xl">
        <div className="h-[350px] bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-400 text-sm">Movie data unavailable</p>
        </div>
        <div className="mt-4">
          <h3 className="text-gray-400">Unknown Title</h3>
          <div className="content">
            <p className="year text-gray-500">N/A</p>
          </div>
        </div>
      </div>
    )
  }

  const { Title, Poster, Year, imdbID } = data

  return (
    <div
      className="movie-card cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={() => onMovieClick(data)}
    >
      <img
        src={Poster && Poster !== "N/A" ? Poster : "/no-movie.png"}
        alt={Title}
        onError={e => {
          e.target.src = "/no-movie.png"
        }}
      />
      <div className="mt-4">
        <h3>{Title}</h3>

        <div className="content">
          <p className="year">{Year || "N/A"}</p>
        </div>
      </div>
    </div>
  )
}

export default Movie
