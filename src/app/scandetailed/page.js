import React from 'react'
import Navbar  from "../navbar/page"
const page = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar */}
    <Navbar />
  
    {/* Main Content */}
    <main className="flex-1 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Scan Gallery</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search scans..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
  
      {/* Gallery Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Image Card */}
        {[
          { id: 1, name: "Scan 001", url: "/path/to/image1.jpg" },
          { id: 2, name: "Scan 002", url: "/path/to/image2.jpg" },
          { id: 3, name: "Scan 003", url: "/path/to/image3.jpg" },
          { id: 4, name: "Scan 004", url: "/path/to/image4.jpg" },
          // Add more images here
        ].map((scan) => (
          <div key={scan.id} className="bg-white rounded-lg shadow p-4">
            <a href={scan.url} target="_blank" rel="noopener noreferrer">
              <img
                src={scan.url}
                alt={scan.name}
                className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity"
              />
            </a>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-800">{scan.name}</p>
              <a
                href={scan.url}
                download={scan.name}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 16l4-4H8l4 4zm0-14c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 18c4.411 0 8-3.589 8-8s-3.589-8-8-8-8 3.589-8 8 3.589 8 8 8z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  </div>
  )
}

export default page
