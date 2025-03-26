'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BlogFormPage() {
  const pathname = usePathname();

  // Membagi URL menjadi array untuk breadcrumbs
  const pathSegments = pathname.split('/').filter((segment) => segment);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      author: '',
      imageUrl: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string()
        .min(20, 'Content must be at least 20 characters')
        .required('Content is required'),
      author: Yup.string()
        .required('Author email is required')
        .email('Email is invalid'),
      imageUrl: Yup.string().required('Image URL is required'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
      alert('Blog submitted successfully!');
    },
  });

  return (
    <section className='container mx-auto px-10 md:px-32 py-24'>
      {/* BREADCRUMBS SECTION */}
      <nav className='text-sm text-gray-500'>
        <ul className='flex gap-2'>
          <li>
            <Link
              href='/'
              className='hover:text-black'
            >
              home
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

      {/* FORM POST SECTION */}
      <section>
        <div className='pt-10 pb-5'>
          <h2 className='text-3xl font-bold'>Create a New Post</h2>
          <p className='text-lg text-gray-500'>
            "Share your thoughts and ideas with the world. Fill in the details
            below to create and publish a new blog post!"
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className='space-y-4'
        >
          <div>
            <label className='block font-medium text-gray-700'>Title</label>
            <input
              type='text'
              placeholder='Ex. Mastering TypeScript for Modern Web Apps'
              className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black'
              {...formik.getFieldProps('title')}
            />
            {formik.touched.title && formik.errors.title && (
              <p className='text-red-500 text-sm'>{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Content</label>
            <textarea
              placeholder='Type your content'
              className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black'
              {...formik.getFieldProps('content')}
            ></textarea>
            {formik.touched.content && formik.errors.content && (
              <p className='text-red-500 text-sm'>{formik.errors.content}</p>
            )}
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Author</label>
            <input
              type='text'
              placeholder='Ex. defryan@gmail.com'
              className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black'
              {...formik.getFieldProps('author')}
            />
            {formik.touched.author && formik.errors.author && (
              <p className='text-red-500 text-sm'>{formik.errors.author}</p>
            )}
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Image URL</label>
            <input
              type='text'
              placeholder='Ex. https://example.com/image.jpg'
              className='w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black'
              {...formik.getFieldProps('imageUrl')}
            />
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <p className='text-red-500 text-sm'>{formik.errors.imageUrl}</p>
            )}
          </div>

          <button
            type='submit'
            className='w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800'
          >
            Post Blog
          </button>
        </form>
      </section>
    </section>
  );
}
