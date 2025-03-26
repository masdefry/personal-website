'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  // Fungsi untuk smooth scroll
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150); // Delay sebelum scroll agar efek lebih smooth
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
      <div className='flex items-center gap-10'>
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
          {time}
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => scrollToSection('contact')}
            className='btn bg-black text-white py-2 px-3 rounded-xl hover:bg-white hover:text-black hover:border border-black transition-all duration-300'
          >
            Talk with me
          </button>
          <Link
            href='/contact'
            className='btn bg-white text-black border border-black py-2 px-3 rounded-xl hover:bg-black hover:text-white transition-all duration-300'
          >
            See my work
          </Link>
        </div>
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
            className='py-2 w-full text-center hover:bg-gray-700'
          >
            Home
          </Link>
          <Link
            href='/about'
            className='py-2 w-full text-center hover:bg-gray-700'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='py-2 w-full text-center hover:bg-gray-700'
          >
            Contact
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
}
