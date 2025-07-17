import React from "react"

const Movie = ({ data }) => {
  const { Title, Poster, Year, imdbID, type } = data
  console.log(data, "data")

  const handleClick = () => {
    if (imdbID) {
      window.open(`https://www.imdb.com/title/${imdbID}`, "_blank")
    }
  }

  return (
    <div
      className="movie-card cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-light-100/20"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={Poster && Poster !== "N/A" ? Poster : "/no-movie.png"}
          alt={Title}
          className="transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <div className="flex items-center justify-center">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">View on IMDB</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="hover:text-light-100 transition-colors duration-200">{Title}</h3>
        <div className="content">
          <p className="year">{Year}</p>
          {type && <span className="bg-light-100/10 text-light-200 px-2 py-1 rounded text-xs capitalize">{type}</span>}
        </div>
      </div>
    </div>
  )
}

export default Movie
