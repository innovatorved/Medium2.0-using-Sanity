import React from 'react';
import Link from 'next/link';

function Navbar() {
  return (
    <header>
        <div className="">
          <Link href="/">
            <img className='w-44 object-contain cursor-pointer' src="https://ik.imagekit.io/nextinnovate/medium-sanity-app/medium-logo_DMvTEm10q.png" alt="Medium Logo" />
          </Link>

          <div className='hidden'>
            Hello
          </div>

          <div>

          </div>
        </div>
    </header>
  )
}

export default Navbar;