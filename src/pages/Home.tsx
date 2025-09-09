// src/pages/Home.tsx

import { FaFilm, FaSearch, FaCloudDownloadAlt } from 'react-icons/fa';

export function Home() {
  return (
    <div className="container mx-auto max-w-6xl p-4 sm:p-6 text-white text-center">
      <div className="py-16 sm:py-24">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-blue-400">
          Welcome to Lulu Stream
        </h1>
        <p className="mt-4 text-lg sm:text-xl max-w-3xl mx-auto text-gray-300">
          Discover and stream your favorite videos in high quality. Use the search bar above to find exactly what you're looking for.
        </p>
        <div className="mt-10">
          <p className="text-gray-400">
            To start, simply type your search query in the navigation bar at the top.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-200">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <FaFilm className="text-4xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Extensive Library</h3>
            <p className="text-gray-400">
              Access a vast collection of videos covering various genres and topics.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <FaSearch className="text-4xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
            <p className="text-gray-400">
              Our intuitive search helps you find any video in just a few seconds.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <FaCloudDownloadAlt className="text-4xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Download & Watch</h3>
            <p className="text-gray-400">
              Easily download videos to watch them offline, anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}