'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PiArrowLeft } from 'react-icons/pi';
import axios from 'axios';

interface BlogPost {
  objectId: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  created: string;
  author: string;
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${slug}`);
        setBlog(response.data.data[0]);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Something went wrong');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (loading) {
    return (
      <section className='container min-h-screen flex flex-col justify-center items-center'>
        <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className='container min-h-screen flex flex-col justify-center mx-auto px-10 md:px-32 py-24 text-center'>
        <h2 className='text-2xl font-bold'>Blog not found</h2>
        <p className='text-gray-500'>
          The blog you are looking for does not exist.
        </p>
        <Link href='/blog'>
          <div className='col-span-3 flex justify-center py-3'>
            <button className='btn bg-black px-2 py-2 bg-gray-300 w-34 rounded-full flex justify-between items-center border border-white hover:bg-white hover:text-black hover:border hover:border-black'>
              <p className='px-3'>Go back</p>
              <PiArrowLeft
                size={28}
                className='p-2 bg-white rounded-full text-bold'
              />
            </button>
          </div>
        </Link>
      </section>
    );
  }

  const formattedDate = blog.created
    ? new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(blog.created))
    : 'Unknown Date';

  return (
    <section className='container mx-auto px-10 md:px-32 py-24'>
      {/* BACK BUTTON SECTION */}
      <button
        onClick={() => window.history.back()}
        className='cursor-pointer flex items-center gap-2 border border-black text-gray-600 hover:text-white hover:border-black hover:bg-black mb-4 rounded-full p-2'
      >
        <PiArrowLeft size={20} />
      </button>

      {/* BLOG DETAIL SECTION */}
      <section className='min-h-screen'>
        <h1 className='text-4xl font-bold mb-4'>{blog.title}</h1>
        <p className='text-gray-500 text-sm'>
          By <span className='font-semibold'>{blog.author}</span> •{' '}
          {formattedDate}
        </p>
        <div className='relative w-full h-92 rounded-lg overflow-hidden pt-3 pb-6'>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className='object-cover w-full h-full rounded-lg'
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
          className='text-lg text-gray-700 leading-relaxed prose'
        ></div>
      </section>
    </section>
  );
}
