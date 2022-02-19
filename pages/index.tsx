import Head from 'next/head';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Blogposts from '../components/Blogposts';

import {Post} from '../interfaces/post';
import { sanityClient } from '../sanity';


interface Props {
    posts: [Post];
}

export default function Home({ posts } : Props) {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Medium 2.O</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar/>
      <Header/>
      <Blogposts posts={posts}/>

    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"]{
    _id,
    title,
    author -> {
    name,
    image
   },
   description,
   mainImage,
   slug 
  }
  `;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts
    }
  }
}
