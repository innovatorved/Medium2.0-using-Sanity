import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <header className='flex justify-between p-5'>
      <div className='flex items-center space-x-5'>
        <Link href="/">
          <img
            className="w-44 cursor-pointer object-contain"
            src="https://ik.imagekit.io/nextinnovate/medium-sanity-app/medium-logo_DMvTEm10q.png"
            alt="Medium Logo"
          />
        </Link>

        <div className="hidden md:inline-flex space-x-5 items-center">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className='text-white bg-green-600 rounded-full px-4 py-1 text-sm'>Follow</h3>
        </div>
      </div>

      <div className='flex items-center space-x-5'>
        <h3 className='text-green-600'>Sign In</h3>
        <h3 className='text-green-600 border-2 border-green-600 px-4 py-1 rounded-full'>Get Started</h3>
        
      </div>
    </header>
  )
}

export default Navbar;
