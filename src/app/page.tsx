'use client';
import CardAward from '@/components/card-award';
import CardExperience from '@/components/card-experience';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlinePhone } from 'react-icons/hi';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { PiArrowBendUpRight } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import {
  educationHistory,
  projects,
  techStack,
  testimonials,
} from '@/utils/data';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 30000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <div className='px-10 grid grid-cols-1 md:grid-cols-2 md:px-32 py-10 h-screen md:h-[80vh]'>
        {/* BANNER SECTION */}
        <div className='col-span-1 flex flex-col justify-center items-start'>
          <div className='bg-black px-10 py-10 rounded-full'></div>
          <h1 className='text-5xl font-bold mt-3'>Hello! I am Defryan</h1>
          <h1 className='text-5xl font-bold mt-3'>Isfandy</h1>
        </div>
        <div className='col-span-1 flex flex-col justify-center items-start'>
          <h1 className='text-4xl mt-3'>
            Full Stack Software Engineer in Jakarta, Indonesia.
          </h1>
          <h1 className='text-lg text-gray-500 mt-3'>
            Passionate Createing Great Experiences for Digital Products
          </h1>
          <div className='flex items-center gap-3 mt-10 md:hidden'>
            <Link
              href='/contact'
              className='btn bg-black text-white py-2 px-3 rounded-xl hover:bg-white hover:text-black hover:border border-black'
            >
              Talk with me
            </Link>
            <Link
              href='/contact'
              className='btn bg-white text-black border border-black py-2 px-3 rounded-xl hover:bg-black hover:text-white'
            >
              See my work
            </Link>
          </div>
        </div>
      </div>

      <section className='bg-gray-100'>
        {/* WORKING EXPERIENCE SECTION */}
        <section
          id='working'
          className='px-10 md:px-32 py-10 md:py-20 grid grid-cols-1 md:grid-cols-2'
        >
          <div className='col-span-1'>
            <h1 className='text-4xl'>Working Experience</h1>
            <div className='py-10 flex flex-col gap-10'>
              <CardExperience
                companyName='Purwadhika Kirana Nusantara'
                jobTitle='Full Stack Web Development Lecturer'
                jobPeriod='2021 - Present'
                imageSrc='/pwd-logo.svg'
                imageDescription='Purwadhika Logo'
              />
              <CardExperience
                companyName='Yayasan Pendidikan Telkom'
                jobTitle='Web Developer'
                jobPeriod='2019 - 2020'
                imageSrc='/logo-ypt.jpg'
                imageDescription='YPT Logo'
              />
              <CardExperience
                companyName='BPJS Kesehatan Sidoarjo'
                jobTitle='Web Developer'
                jobPeriod='2016'
                imageSrc='/bpjs-logo.png'
                imageDescription='BPJS Logo'
              />
            </div>
          </div>
          <div className='col-span-1'>
            <h1 className='text-4xl'>Awards & Recognition</h1>
            <div className='py-10 flex flex-col gap-10'>
              <CardAward
                title='Best Web Development Lecturer'
                description='Purwadhika Employee Award'
                year='2024'
              />
            </div>
          </div>
        </section>

        {/* PROJECT SECTION */}
        <section
          id='projects'
          className='px-10 md:px-32'
        >
          <div className='container mx-auto px-6'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-4xl italic'>My Latest</h1>
              <h1 className='text-4xl font-bold'>Project</h1>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className='bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className='relative w-full h-48 rounded-lg overflow-hidden'>
                    <Image
                      src={project.image!}
                      alt={project.title}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <h3 className='text-xl font-semibold mt-4'>
                    {project.title}
                  </h3>
                  <p className='text-gray-600 mt-2'>{project.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section
          id='techstack'
          className='px-10 md:px-32 mt-10 md:mt-20'
        >
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl italic'>Exploring Tech Stack</h1>
            <h1 className='text-4xl font-bold'>Behind My Project</h1>
          </div>
          <div className='relative overflow-hidden w-full py-6 bg-gray-100 mt-2'>
            <motion.div
              className='flex gap-10 min-w-max'
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{
                repeat: Infinity,
                ease: 'linear',
                duration: 50,
              }}
            >
              {[...techStack, ...techStack].map((logo, index) => (
                <div
                  key={index}
                  className='p-3 bg-white rounded-xl shadow-md'
                >
                  <div className='relative w-32 h-20'>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className='object-contain'
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TESTI SECTION */}
        <section
          id='testimonials'
          className='mt-20 px-10 md:px-32 bg-gray-100'
        >
          <div className='text-center mb-12'>
            <h2 className='text-4xl italic text-black'>Alumni Success Story</h2>
            <h1 className='text-4xl font-bold'>Hear From My Students</h1>
          </div>

          <div className='relative w-full max-w-xl mx-auto'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentIndex}
                className='bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <div className='relative w-16 h-16 rounded-full'>
                  <Image
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    fill
                    className='object-cover rounded-full'
                  />
                </div>
                <p className='text-gray-700 italic mb-4'>
                  {testimonials[currentIndex].message}
                </p>
                <h4 className='font-semibold text-gray-900'>
                  {testimonials[currentIndex].name}
                </h4>
                <p className='text-gray-500 text-sm'>
                  {testimonials[currentIndex].position}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <div className='flex justify-center mt-6 gap-2'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index ? 'bg-gray-800 w-5' : 'bg-gray-400'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section
          id='education'
          className='mt-20'
        >
          <div className='container mx-auto px-10 md:px-32'>
            <div className='flex flex-col justify-center items-center'>
              <h1 className='text-4xl italic'>My Academic</h1>
              <h1 className='text-4xl font-bold'>Journey</h1>
            </div>

            <div className='grid md:grid-cols-3 gap-6 py-10'>
              {educationHistory.map((edu, index) => (
                <motion.div
                  key={index}
                  className='bg-white p-6 rounded-lg shadow-md flex items-center justify-between'
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <h3 className='text-xl font-semibold text-gray-800'>
                      {edu.school}
                    </h3>
                    <p className='text-gray-600'>{edu.degree}</p>
                    <p className='text-gray-500 text-sm'>{edu.year}</p>
                  </div>
                  <div className='relative w-16 h-16'>
                    <Image
                      src={edu.logo}
                      alt=''
                      fill
                      className='object-contain'
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* CONTACT SECTION */}
      <section
        id='contact'
        className='px-6 md:px-16 lg:px-32 py-10'
      >
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          {/* Contact Info */}
          <div className='col-span-1'>
            <h1 className='text-2xl font-bold text-gray-800'>Contact Us!</h1>
            <h1 className='text-4xl mt-3 italic text-gray-900'>
              Lets Talk for
            </h1>
            <h1 className='text-4xl font-bold'>Your Next Project!</h1>

            <div className='flex flex-col gap-5 py-10'>
              <div className='flex items-center gap-5'>
                <div className='rounded-xl shadow-md bg-yellow-500 p-3'>
                  <HiOutlinePhone
                    size={24}
                    className='text-white'
                  />
                </div>
                <p className='text-xl text-gray-800'>+62 812-1418-6000</p>
              </div>
              <div className='flex items-center gap-5'>
                <div className='rounded-xl shadow-md bg-yellow-500 p-3'>
                  <MdOutlineAlternateEmail
                    size={24}
                    className='text-white'
                  />
                </div>
                <p className='text-xl text-gray-800'>ryan.fandy@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5'>
            <fieldset className='space-y-2'>
              <legend className='text-lg text-gray-700 font-medium'>
                Your Name *
              </legend>
              <input
                type='text'
                className='w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black focus:outline-none'
                placeholder='Ex. Immanuel Janis'
                aria-label='Your Name'
              />
            </fieldset>
            <fieldset className='space-y-2'>
              <legend className='text-lg text-gray-700 font-medium'>
                Email *
              </legend>
              <input
                type='text'
                className='w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black focus:outline-none'
                placeholder='Ex. immanuel@gmail.com'
              />
            </fieldset>
            <fieldset className='space-y-2 md:col-span-2'>
              <legend className='text-lg text-gray-700 font-medium'>
                Phone Number *
              </legend>
              <input
                type='text'
                className='w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black focus:outline-none'
                placeholder='Enter Phone Number'
              />
            </fieldset>
            <fieldset className='space-y-2 md:col-span-2'>
              <legend className='text-lg text-gray-700 font-medium'>
                Leave Message *
              </legend>
              <textarea
                className='w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-black focus:outline-none'
                placeholder='Type your message'
                rows={4}
              />
            </fieldset>
          </div>
        </div>

        {/* Submit Button */}
        <div className='col-span-3 flex justify-center py-3'>
          <button className='btn bg-black px-2 py-2 bg-gray-300 w-34 rounded-full flex justify-between items-center border border-white hover:bg-white hover:text-black hover:border hover:border-black'>
            <p className='px-3'>Submit</p>
            <PiArrowBendUpRight
              size={28}
              className='p-2 bg-white rounded-full'
            />
          </button>
        </div>
      </section>
    </div>
  );
}
