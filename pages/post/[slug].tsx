import { useState } from 'react'
import { GetStaticProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'

import { Post } from '../../interfaces/post'
import Navbar from '../../components/Navbar'

// use portable text to get the post body
import PortableText from 'react-portable-text'

// form
import { useForm, SubmitHandler } from 'react-hook-form'

interface Props {
  post: Post
}

// import Interface for the form
import { CommentFormData } from '../../interfaces/form'

export default function post(props: Props) {
  const [submitted, setSubmitted] = useState(false)

  const { post } = props

  //  destructuring the elements from useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormData>()

  const SubmitForm: SubmitHandler<CommentFormData> = async (data) => {
    await fetch('/api/createComments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.state) {
          setSubmitted(true)
        } else {
          setSubmitted(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <main>
      <Navbar />

      <img
        className="h-60 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt={post.title}
      />

      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 font-serif text-3xl ">{post.title}</h1>
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

      <hr className="my-3 mx-auto max-w-lg border border-yellow-500" />

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thank you for Submitting your comment!
          </h3>
          <p>
            Once it has been approved, it will appear below!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(SubmitForm)}
          className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-yello-500 text-sm">Enjoy the Article?</h3>
          <h4 className="text-3xl font-bold">Leave a Comment Below!</h4>
          <hr className="mt-2 py-3 " />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="mb-5 block">
            <span className="text-gray-700">Name</span>
            <input
              {...register('name', { required: true, minLength: 3 })}
              type="text"
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
              placeholder="Rohnny Raj"
              required={true}
            />
          </label>
          <label className="mb-5 block">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              type="email"
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
              placeholder="rohnnyraj@example.com"
              required={true}
            />
          </label>
          <label className="mb-5 block">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register('comment', { required: true, minLength: 10 })}
              className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-yellow-500 focus:ring"
              placeholder="Type Your Comment here ...."
              required={true}
              rows={8}
            />
          </label>

          <div className="flex flex-col p-5 font-bold">
            {errors.name && (
              <span className="text-xs text-red-500">
                Minimun length of Title is 3!
              </span>
            )}
            {errors.email && (
              <span className="text-xs text-red-500">
                Enter the Correct Email!
              </span>
            )}
            {errors.comment && (
              <span className="text-xs text-red-500">
                Minimum length of Description is 10!
              </span>
            )}
          </div>

          <input
            type="submit"
            className="cursor-pointer rounded bg-yellow-400 px-4 py-2 font-bold text-white shadow hover:bg-yellow-500 focus:shadow-inherit focus:outline-none"
          />
        </form>        
      )}

      {/* Comments */}
      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
          <h3 className='text-4xl' >Comments</h3>
          <hr className='pb-2'/>

          {
            post.comments.map((comment: any) => (
              <div key={comment._id} >
                <span className='text-yellow-500'>{comment.name}: </span>
                {comment.comment}
              </div>
            ))
          }

      </div>
    </main>
  )
}

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
        },
        'comments': *[
          _type == "comment" &&
          post._ref == ^._id &&
          approved == true
        ],
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
