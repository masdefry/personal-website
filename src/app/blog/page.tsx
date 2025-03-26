import Image from 'next/image';
import Link from 'next/link';
import { posts } from '../../utils/data';

export default function BlogPage() {
  return (
    <section className='container mx-auto px-10 md:px-32 py-24'>
      {/* HEADER SECTION */}
      <section className='grid grid-cols-1 grid-rows-3 md:grid-cols-3 grid-rows-2 pt-10 pb-1'>
        <h1 className='col-span-3 md:col-span-2 text-4xl font-bold text-gray-900 text-center md:text-left'>
          Defryan Blog.
        </h1>
        <p className='col-span-3 md:col-span-1 row-span-2 text-lg text-gray-500 text-center md:text-right'>
          Stay updated with the latest trends and insights, and feel free to
          contribute to this blog{' '}
          <Link
            href='/blog/form'
            className='font-bold underline'
          >
            here.
          </Link>
        </p>
        <div className='col-span-1 flex justify-center mt-5 md:mt-1 border border-gray-300 rounded-full flex items-center p-3 w-full md:w-fit'>
          <input
            type='text'
            placeholder='Enter your email'
            className='focus:outline-none focus:ring-0 focus:border-transparent'
          />
          <button className='btn bg-black text-white px-4 py-2 ml-2 rounded-full'>
            Subscribe Now →
          </button>
        </div>
      </section>

      {/* BLOG POST LIST SECTION */}
      <section className='grid gap-8 mt-10 md:mt-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.id}
          >
            <div
              key={post.id}
              className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all h-full flex flex-col'
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={400}
                height={250}
                className='w-full h-48 object-cover'
              />
              <div className='p-5 flex flex-col flex-grow'>
                <p className='text-sm text-gray-500'>
                  {post.date} • {post.author}
                </p>
                <h2 className='text-xl font-semibold text-gray-800 mt-2'>
                  {post.title}
                </h2>
                <p className='text-gray-600 mt-2 flex-grow'>
                  {post.description}
                </p>
                <button className='mt-4 text-blue-600 hover:underline'>
                  Read More →
                </button>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}
