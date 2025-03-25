'use client';

import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-black text-gray-300 py-8'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center text-center md:text-left'>
          {/* Nama & Hak Cipta */}
          <div className='mb-4 md:mb-0'>
            <h2 className='text-lg font-semibold'>Defryan</h2>
            <p className='text-sm'>
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

          {/* Navigasi */}
          <div className='flex space-x-6'>
            <a
              href='#about'
              className='hover:text-white transition'
            >
              About
            </a>
            <a
              href='#projects'
              className='hover:text-white transition'
            >
              Projects
            </a>
            <a
              href='#contact'
              className='hover:text-white transition'
            >
              Contact
            </a>
          </div>

          {/* Social Media */}
          <div className='flex space-x-4 mt-4 md:mt-0'>
            <a
              href='https://github.com/yourgithub'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl hover:text-white transition'
            >
              <FaGithub />
            </a>
            <a
              href='https://linkedin.com/in/yourlinkedin'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl hover:text-white transition'
            >
              <FaLinkedin />
            </a>
            <a
              href='https://twitter.com/yourtwitter'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl hover:text-white transition'
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
