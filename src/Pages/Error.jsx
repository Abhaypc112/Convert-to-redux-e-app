import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  const adminId=localStorage.getItem("adminId")
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-700">404</h1>
      <h2 className="text-3xl font-semibold text-gray-600 mt-4">Page Not Found</h2>
      <p className="text-lg text-gray-500 mt-2">Sorry, the page you're looking for doesn't exist.</p>
      <Link to={adminId?"/admin":"/"} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Go Back to Home
      </Link>
    </div>
  )
}

export default Error
