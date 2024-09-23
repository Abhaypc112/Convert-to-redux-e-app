import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  const adminId=localStorage.getItem("adminId")
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-black">404</h1>
      <h2 className="text-3xl font-semibold text-black mt-4">Page Not Found</h2>
      <p className="text-lg text-black mt-2">Sorry, the page you're looking for doesn't exist.</p>
      <Link to={adminId?"/admin":"/"} className="mt-6 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-black hover:text-yellow-400 transition">
        Go Back to Home
      </Link>
    </div>
  )
}

export default Error
