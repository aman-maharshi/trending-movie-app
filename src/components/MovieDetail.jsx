import React from "react"

const MovieDetail = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-100 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-white">{movie.Title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
              ×
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/no-movie.png"}
              alt={movie.Title}
              className="w-full md:w-48 h-72 object-cover rounded-lg"
            />

            <div className="flex-1">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Year:</span>
                  <span className="text-white ml-2">{movie.Year}</span>
                </div>

                {movie.Type && (
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <span className="text-white ml-2 capitalize">{movie.Type}</span>
                  </div>
                )}

                {movie.imdbID && (
                  <div>
                    <span className="text-gray-400">IMDB ID:</span>
                    <span className="text-white ml-2">{movie.imdbID}</span>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-primary font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity inline-block"
                >
                  View on IMDB
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail
