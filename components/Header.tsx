import React from 'react'

function Header() {
  return (
    <div className='flex items-center justify-between space-x-5 px-10 py-10 bg-yellow-400 border-y-2 border-y-black'>
        <div className='space-y-5'>
          <h1 className='max-w-xl text-6xl font-serif'> 
          <span className='underline decoration-4 decoration-black'>Medium</span> is a Place to write , read and connect
          </h1>
          <h2>It's easy and free to post your thinking on any topic and connect with millions of readers.</h2>
        </div>

        <img
        className='hidden md:inline-block md:h-44 lg:h-72'
        src="https://ik.imagekit.io/nextinnovate/medium-sanity-app/medium-m-logo_DHZ27Y4rq.png" 
        alt="Medium M Logo" 
        />
      </div>
  )
}

export default Header;