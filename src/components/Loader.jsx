export const TrendingMovieLoader = () => (
  <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="min-w-[280px] flex flex-row items-center gap-4 bg-gradient-to-br from-dark-200/90 to-dark-100/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
      >
        <div className="fancy-text text-6xl sm:text-7xl shimmer bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
          {index + 1}
        </div>
        <div className="w-[140px] h-[180px] bg-gray-700 rounded-xl shimmer"></div>
      </div>
    ))}
  </div>
)

export const AllMovieLoader = () => (
  <div className="grid grid-cols-1 gap-6 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {[...Array(10)].map((_, index) => (
      <div
        key={index}
        className="bg-gradient-to-br from-dark-200/90 to-dark-100/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
      >
        <div className="w-full h-[400px] bg-gray-700 rounded-xl shimmer mb-4"></div>
        <div className="space-y-3">
          <div className="h-6 bg-gray-700 rounded shimmer"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 w-16 bg-gray-700 rounded shimmer"></div>
            <div className="h-4 w-20 bg-gray-700 rounded shimmer"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
)
