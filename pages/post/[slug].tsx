import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'

import { Post } from '../../interfaces/post'
import Navbar from '../../components/Navbar'

// use portable text to get the post body
import PortableText from 'react-portable-text'

interface Props {
  post: Post
}

function post(props: Props) {
  const { post } = props

  return (
    <main>
      <Navbar />

      <img
        className="h-60 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt={post.title}
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl font-serif ">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt={post.author.name}
          />
          <p className="text-sm font-extralight">
            Blog Post by{' '}
            <span className="text-green-600">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <PortableText
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          className="space-y-8"
          content={post.body}
          serializers={{
            h1: (props: any) => (
              <h1 className="my-5 text-2xl font-bold" {...props} />
            ),
            h2: (props: any) => (
              <h2 className="my-5 text-xl font-bold" {...props} />
            ),
            h3: (props: any) => (
              <h3 className="text-l my-5 font-bold" {...props} />
            ),
            li: ({ children }: any) => (
              <li className="ml-8 list-disc">{children}</li>
            ),
            link: ({ href, children }: any) => (
              <a
                href={href}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            ),
          }}
        />
      </article>

      <hr className='max-w-lg my-3 mx-auto border border-yellow-500' />

      <form className='flex flex-col p-5 max-w-2xl mx-auto mb-10'>
          <h3 className="text-sm text-yello-500">Enjoy the Article?</h3>
          <h4 className="text-3xl font-bold">Leave a Comment Below!</h4>
          <hr className='py-3 mt-2 ' />
          <label className='block mb-5'>
              <span className='text-gray-700'>Name</span>
              <input type="text" className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='Rohnny Raj' required={true}/>
          </label>
          <label className='block mb-5'>
              <span className='text-gray-700'>Email</span>
              <input type="email" className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='rohnnyraj@example.com' required={true}/>
          </label>
          <label className='block mb-5'>
              <span className='text-gray-700'>Comment</span>
              <textarea className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring' placeholder='Type Your Comment here ....' required={true} rows={8}/>
          </label>
      </form>
    </main>
  )
}

export default post

export const getStaticPaths = async () => {
  // return all the paths of post
  const query = `
    *[_type == "post"]{
        _id,
       slug {
        current
       }
    }
    `
  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        description,
        mainImage,
        body,
        slug,
        author->{
         name,
         email,
         image
        }
    }
    `
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 1 minute all the pages were revalidated and cached again
  }
}
