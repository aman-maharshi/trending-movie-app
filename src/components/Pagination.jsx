import React from "react"

const Pagination = ({ hasMorePages, loading, onLoadMore, totalResults, currentCount }) => {
  if (!hasMorePages) return null

  return (
    <div className="flex justify-center mt-12">
      <button onClick={onLoadMore} disabled={loading} className="pagination-button text-white">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading more movies...</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 cursor-pointer">
            <span>Load More Movies</span>
            <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-medium">
              {currentCount} / {totalResults}
            </div>
          </div>
        )}
      </button>
    </div>
  )
}

export default Pagination
