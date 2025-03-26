'use client';

import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PiArrowLeft } from 'react-icons/pi';
import { posts } from '../../../utils/data';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter((segment) => segment);

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const foundBlog = posts.find((post) => post.slug === slug);
    setBlog(foundBlog);
  }, [slug]);

  if (!blog) {
    return (
      <section className='container flex flex-col justify-center mx-auto px-10 md:px-32 py-24 text-center'>
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

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(blog.date));

  return (
    <section className='container mx-auto px-10 md:px-32 py-24'>
      {/* BREADCRUMBS SECTION */}
      <nav className='text-sm text-gray-500 mb-5'>
        <ul className='flex gap-2'>
          <li>
            <Link
              href='/'
              className='hover:text-black'
            >
              Home
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            return (
              <span
                key={url}
                className='flex items-center gap-2'
              >
                <span>/</span>
                {isLast ? (
                  <span className='text-black font-medium'>
                    {decodeURIComponent(segment)}
                  </span>
                ) : (
                  <Link
                    href={url}
                    className='hover:text-black'
                  >
                    {decodeURIComponent(segment)}
                  </Link>
                )}
              </span>
            );
          })}
        </ul>
      </nav>

      {/* BLOG DETAIL SECTION */}
      {/* BLOG DETAIL SECTION */}
      <section className='min-h-screen'>
        <h1 className='text-4xl font-bold mb-4'>{blog.title}</h1>
        <p className='text-gray-500 text-sm'>
          By <span className='font-semibold'>{blog.author}</span> •{' '}
          {formattedDate}
        </p>
        <img
          src={blog.imageUrl}
          alt={blog.title}
          className='w-full rounded-lg my-6'
        />
        <p className='text-lg text-gray-700 leading-relaxed'>{blog.content}</p>
      </section>
    </section>
  );
}
