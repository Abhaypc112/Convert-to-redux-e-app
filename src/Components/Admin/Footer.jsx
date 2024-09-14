import React from 'react'

function Footer() {
  return (
    <div className='' style={{marginTop:"5rem"}}>
         <footer className="bg-black text-white py-11 px-5">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold">LuxeLounge</h3>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center Section - Links */}
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="hover:text-gray-300">Services</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
        </ul>

        {/* Right Section - Social Icons */}
        <div className="flex space-x-4 ">
          <a href="#" className="hover:text-gray-300">Facebook</a>
          <a href="#" className="hover:text-gray-300">Twitter</a>
          <a href="#" className="hover:text-gray-300">Instagram</a>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
