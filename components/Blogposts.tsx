import React from 'react'
import Link from 'next/link';

import {Post} from '../interfaces/post';
import { sanityClient , urlFor } from '../sanity';


export default function Blogposts({ posts } : { posts : [Post] }) {
  return (
    <div className='grid grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 md:p-6 md:gap-6 '>
      {posts.map(post => (
        <Link href={`/post/${post.slug.current}`} key={post._id}>
          <div className='group border rounded-lg cursor-pointer overflow-hidden mb-2' key={post._id}>
            <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out ' src={urlFor(post.mainImage).url()!} alt={post.title} />

            <div className='flex justify-between bg-white p-5'>
              <div>
                <p className='text-lg font-bold'>{post.title}</p>
                <p className='text-xs'>{post.description} by {post.author.name}</p>
              </div>

              <img className='h-12 w-12 rounded-full' src={urlFor(post.author.image).url()} alt={post.author.name} title={post.author.name} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}