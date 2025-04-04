'use client';
// 
import { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { PiArrowLeft } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

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

type Category = {
  objectId: string;
  name: string;
}

function BlogContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFilter, setLoadingFilter] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const router = useRouter() 
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<{ data: Post[] }>(`/api/posts?${searchParams.toString()}`); 
        setPosts(response.data.data);
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
        setLoadingFilter(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ data: Category[] }>(`/api/categories`); 
        setCategories(response.data.data);
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
        setLoadingFilter(false);
      }
    };

    fetchCategories()
  }, [])

  const handleFilterCategory = (category: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    const newCategory = selectedCategory?.name === category.name ? null : category;
    setSelectedCategory(newCategory);
    if(category){
      params.set('category', category.name);
    }else{
      params.delete('category')
    }
    router.push(`?${params.toString()}`, { scroll: false });
    setLoadingFilter(true);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if(searchInput){
      params.set('search', searchInput);
    }else{
      params.delete('searchInput')
    }
    router.push(`?${params.toString()}`, { scroll: false });
    setSearchInput('')
    setLoadingFilter(true);
  }

  const handleResertFilter = () => {
    setSelectedCategory(null);
    setShowFilter(false);
    setSearchInput('');
    router.push('/blog',  { scroll: false });
  }

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen bg-white'>
        <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
      </div>
    );

  return (
    <section className='container mx-auto px-10 md:px-32 py-24 min-h-screen bg-white'>
      {/* HEADER SECTION */}
      <section>
        <section className='grid grid-cols-1 md:grid-cols-3 pt-10 pb-1'>
          <h1 className='col-span-3 md:col-span-2 text-4xl font-bold text-gray-900 text-center md:text-left'>
            Defryan Blog.
          </h1>
          <p className='col-span-3 md:col-span-1 text-lg text-gray-500 text-center md:text-right'>
            Stay updated with the latest trends and insights, and feel free to contribute{' '}
            <Link href='/blog/form' className='font-bold underline'>
              here.
            </Link>
          </p>
        </section>
        <section>
          <div className='flex items-center gap-3 my-10'>
            <button onClick={() => setShowFilter(!showFilter)} className='hidden btn bg-gray-900 text-white rounded-full px-7 py-1 hover:bg-white hover:border hover:border-black hover:text-black lg:block'>
              Filter →
            </button>
            <div className='flex flex-row items-center gap-3 border border-gray-300 rounded-full w-full'>
            <input
              type='text'
              placeholder='Search with Article Title or Description'
              className='text-black px-3 w-full focus:outline-none'
              value={searchInput || ''}
              onChange={(e) => setSearchInput(e.target.value)}
            />
              <button onClick={handleSearch} className='btn bg-gray-900 text-white rounded-full px-4 py-2 hover:bg-white hover:border hover:border-black hover:text-black'>
                Search Now →
              </button>
            </div>
          </div>
        </section>
      </section>

      <section className='grid grid-cols-1 gap-5 md:grid-cols-5'>
        <motion.section 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: showFilter ? 1 : 0, x: showFilter ? 0 : -20 }} 
          transition={{ duration: 0.3 }}
          className={`hidden lg:${showFilter ? 'block col-span-1' : 'hidden'}`}
        >
          <fieldset className='fieldset p-4 bg-white text-black border border-gray-300 rounded-box'>
            <legend className='fieldset-legend text-black p-3'>Category Options</legend>
            {categories.map((category) => (
              <label key={category.objectId} className='fieldset-label text-black'>
                <input
                  type='radio'
                  name='category'
                  value={category?.objectId}
                  checked={selectedCategory?.objectId === category?.objectId}
                  onChange={() => handleFilterCategory(category)}
                  className='radio text-black border border-gray-300'
                />
                {category?.name}
              </label>
            ))}
          </fieldset>
          <button onClick={handleResertFilter} className='btn bg-black text-white w-full my-3 hover:bg-white hover:text-black'>
            Reset
          </button>
        </motion.section>

        {error || posts.length === 0 ? (
          <section className={`col-span-5 ${showFilter ? 'lg:col-span-4' : 'lg:col-span-5'} container min-h-60 flex flex-col justify-center mx-auto px-10 md:px-32 py-24 text-center bg-white`}>
            <h2 className='text-2xl font-bold text-black'>Something Went Wrong</h2>
            <p className='text-gray-500'>
              {error ? error + ', Please try again later.' : 'No blog posts found.'}
            </p>
            <Link href='/'>
              <div className='flex justify-center py-3'>
                <button className='btn px-4 py-2 bg-gray-900 text-white rounded-full flex items-center border border-white hover:bg-white hover:text-black hover:border-black'>
                  <span className='px-3'>Go back</span>
                  <PiArrowLeft size={24} className='bg-white rounded-full text-black' />
                </button>
              </div>
            </Link>
          </section>
        ) : loadingFilter?
          <div className={`col-span-5 ${showFilter ? 'lg:col-span-4' : 'lg:col-span-5'} flex justify-center items-center min-h-3 bg-white`}>
            <div className='w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
          </div>
        : (
          <section className={`col-span-5 ${showFilter ? 'lg:col-span-4' : 'lg:col-span-5'} grid gap-8 mt-10 p-4 md:mt-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
            {posts.map((post) => (
              <div key={post.objectId} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all h-fit flex flex-col'>
                <Link href={`/blog/${post.slug}`}>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    width={400}
                    height={250}
                    className='w-full h-48 object-cover'
                  />
                </Link>
                <div className='p-5 flex flex-col flex-grow justify-between'>
                  <div>
                    <p className='text-sm text-gray-500'>
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(new Date(post.created))} • {post.author}
                    </p>
                    <h2 className='text-xl font-semibold text-gray-800 mt-2 line-clamp-1'>{post.title}</h2>
                    <p className='line-clamp-6 min-h-42 text-gray-600 py-3'>{post.description}</p>
                  </div>
                  <Link href={`/blog/${post.slug}`} className='mt-4 text-blue-600 hover:underline cursor-pointer'>
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </section>
        )}
      </section>
    </section>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div></div>}>
      <BlogContent />
    </Suspense>
  );
}