import React from "react"

const Pagination = ({ hasMorePages, loading, onLoadMore, totalResults, currentCount }) => {
  if (!hasMorePages) return null

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-primary font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            Loading...
          </div>
        ) : (
          `Load More (${currentCount}/${totalResults})`
        )}
      </button>
    </div>
  )
}

export default Pagination
