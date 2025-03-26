'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
type Post = {
  objectId: string;
  title: string;
  slug: string;
  imageUrl: string;
  created: string;
  author: string;
  content: string;
  description: string;
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<{ data: Post[] }>('/api/posts');

        setPosts(response.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
      </div>
    );

  return (
    <section className='container mx-auto px-10 md:px-32 py-24 min-h-screen'>
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
        <div className='col-span-1 flex justify-between mt-5 md:mt-3 border border-gray-300 rounded-full flex items-center w-full md:w-fit'>
          <input
            type='text'
            placeholder='Enter your email'
            className='px-3 focus:outline-none focus:ring-0 focus:border-transparent'
          />
          <button className='btn bg-black text-white rounded-full'>
            Subscribe Now →
          </button>
        </div>
      </section>

      <section className='grid gap-8 mt-10 md:mt-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <Link
            href={`/blog/${post.slug}`}
            key={post.objectId}
          >
            <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all h-full flex flex-col'>
              <img
                src={post.imageUrl}
                alt={post.title}
                width={400}
                height={250}
                className='w-full h-48 object-cover'
              />
              <div className='p-5 flex flex-col flex-grow justify-between'>
                <div>
                  <p className='text-sm text-gray-500'>
                    {new Date(post.created).toLocaleDateString()} •{' '}
                    {post.author}
                  </p>
                  <h2 className='text-xl font-semibold text-gray-800 mt-2 line-clamp-1'>
                    {post.title}
                  </h2>
                  <p className='line-clamp-6 min-h-42 text-gray-600 py-3'>{post.description}</p>
                </div>
                <button className='mt-4 text-blue-600 hover:underline cursor-pointer'>
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
