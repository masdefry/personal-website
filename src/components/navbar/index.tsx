'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { TbLogs } from 'react-icons/tb';
import { HiOutlineInformationCircle, HiOutlineHome } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathUrl = usePathname()
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setTime(now.toLowerCase());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full px-10 py-4 md:px-32 flex items-center justify-between z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className='flex items-center gap-10 text-black'>
        <div className='flex items-center gap-6'>
          <Link
            href='/'
            className='text-3xl font-bold'
          >
            mdti.
          </Link>
          <div className='text-xs font-bold md:hidden'>
            <p className='text-gray-500'>Jakarta, Indonesia</p>
            {time}
          </div>
        </div>
        <div className='hidden md:flex gap-6 font-medium'>
          <Link
            href='/about'
            className='hover:text-gray-400'
          >
            About
          </Link>
          <Link
            href='/blog'
            className='hover:text-gray-400'
          >
            Blog
          </Link>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className='md:hidden'
      >
        <Menu size={28} />
      </button>

      <div className='hidden md:flex items-center gap-10 font-bold text-sm'>
        <div className='text-xs font-bold'>
          <p className='text-gray-500'>Jakarta, Indonesia</p>
          <p className='text-gray-700'>{time}</p>
        </div>
        {
          pathUrl === '/'?
            <div className='flex items-center gap-3'>
              <button
                onClick={() => scrollToSection('contact')}
                className='btn bg-black text-white py-2 px-3 rounded-xl hover:bg-white hover:text-black hover:border border-black transition-all duration-300'
              >
                Talk with me
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className='btn bg-white text-black border border-black py-2 px-3 rounded-xl hover:bg-black hover:text-white transition-all duration-300'
              >
                See my work
              </button>
            </div>
          :
            <></>
        }
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className='absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-center py-4 md:hidden'
        >
          <Link
            href='/'
            className='py-2 gap-3 flex items-center justify-end w-full px-10 hover:bg-gray-700'
          >
            <p className='font-light text-xl'>Home</p>
            <HiOutlineHome  size={24} />
          </Link>
          <Link
            href='#'
            className='py-2 gap-3 flex items-center justify-end w-full px-10 hover:bg-gray-700'
          >
            <p className='font-light text-xl'>About</p>
            <HiOutlineInformationCircle size={24} />
          </Link>
          <Link
            href='/blog'
            className='py-2 gap-3 flex items-center justify-end w-full px-10 hover:bg-gray-700'
          >
            <p className='font-light text-xl'>Blog</p>
            <TbLogs size={24} />
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
