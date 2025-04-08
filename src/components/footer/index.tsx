'use client';

import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-black text-gray-300 py-8'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center text-center md:text-left'>
          <div className='mb-4 md:mb-0'>
            <h2 className='text-lg font-semibold'>Defryan</h2>
            <p className='text-sm'>
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

          <div className='flex space-x-6'></div>

          <div className='flex space-x-4 mt-4 md:mt-0'>
            <a
              href='https://github.com/masdefry'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl hover:text-white transition'
            >
              <FaGithub />
            </a>
            <a
              href='https://www.linkedin.com/in/ryan-defryan/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-xl hover:text-white transition'
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
