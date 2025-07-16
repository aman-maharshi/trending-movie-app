import React from "react"

const Spinner = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-gray-600 border-t-white rounded-full animate-spin`}></div>
    </div>
  )
}

export default Spinner
