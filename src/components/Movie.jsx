import React from 'react'

const Movie = ({ data }) => {
  const { Title, Poster, Year, imdbID } = data
  return (
    <div className="movie-card">
      <img
        src={Poster && Poster !== "N/A" ? Poster : '/no-movie.png'}
        alt={Title}
      />
      <div className='mt-4'>
        <h3>{Title}</h3>

        <div className="content">
          {/* <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{(Math.random() * (9 - 7) + 7).toFixed(1)}</p>   
          </div>
          <span>•</span> */}
          <p className="year">
            {Year}
          </p>
        </div>
      </div>
    </div>

  )
}

export default Movie