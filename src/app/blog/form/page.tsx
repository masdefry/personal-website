'use client';

import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import axios from 'axios';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListOl,
  FaListUl,
  FaHeading,
} from 'react-icons/fa';
import { useState } from 'react';
import { PiArrowLeft } from 'react-icons/pi';

interface FormValues {
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  description: string;
  category: string;
}

interface TiptapProps {
  onChange: (value: string) => void;
}

type Category = {
  objectId: string;
  name: string;
}

const Tiptap: React.FC<TiptapProps> = ({ onChange }) => {
  const [headingLevel, setHeadingLevel] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Underline,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: '<p>Types content here...</p>',
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none min-h-[250px] border rounded-lg p-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className='w-full py-2 text-gray-700'>
      <div className='flex space-x-2 mb-2'>
        <button>
          <FaHeading />
        </button>
        <select
          value={headingLevel}
          onChange={(e) => {
            const level = Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6;
            setHeadingLevel(level);
            editor.chain().focus().setNode('heading', { level }).run();
          }}
          className='border p-1 rounded-lg'
        >
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <option
              key={level}
              value={level}
            >
              H-{level}
            </option>
          ))}
        </select>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <FaUnderline />
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <FaListOl />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className='text-gray-700 prose prose-headings:text-4xl prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 h-60 overflow-y-auto'
      />
    </div>
  );
};

export default function BlogFormPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<{ data: Category[] }>(`/api/categories`); 
        setCategories(response.data.data);
      } catch (err: unknown) {
        console.log(err)
      }
    };

    fetchCategories()
  }, [])

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      content: '',
      author: '',
      imageUrl: '',
      description: '',
      category: ''
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Title is required')
        .max(250, 'Max 250 characters'),
      content: Yup.string().required('Content is required'),
      author: Yup.string()
        .email('Invalid email')
        .required('Author email is required'),
      imageUrl: Yup.string()
        .required('Image URL is required')
        .max(250, 'Max 250 characters'),
      description: Yup.string()
        .required('Description is required')
        .min(250, 'Min 250 characters')
        .max(500, 'Max 500 characters'),
      category: Yup.string().required('Category is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);
        await axios.post('/api/posts', values);
        toast.success('Blog Successfully Created!');
        resetForm();
      } catch (error) {
        console.log(error);
        toast.error('Failed to Create Post.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <section className='container mx-auto px-10 md:px-32 py-24 bg-white'>
      {/* BACK BUTTON SECTION */}
      <button
        onClick={() => window.history.back()}
        className='cursor-pointer flex items-center gap-2 border border-black text-gray-600 hover:text-white hover:border-black hover:bg-black mb-4 rounded-full p-2'
      >
        <PiArrowLeft size={20} />
      </button>

      <section className='mt-10'>
        <h2 className='text-3xl font-bold text-black'>Create a New Post</h2>
        <form
          onSubmit={formik.handleSubmit}
          className='space-y-6 mt-10'
        >
          <div>
            <label className='block font-medium text-gray-700'>Title</label>
            <input
              placeholder='Ex. Mastering TypeScript for Modern Web Apps'
              type='text'
              className='w-full p-3 border border-gray-400 rounded-xl text-black'
              {...formik.getFieldProps('title')}
            />
            {formik.touched.title && formik.errors.title && (
              <p className='text-red-500'>{formik.errors.title}</p>
            )}
          </div>

          <div>
            <label className='block font-medium text-gray-700'>
              Description
            </label>
            <input
              type='text'
              placeholder='Ex. Lorem ipsum dolor sit amet'
              className='w-full p-3 border border-gray-400 rounded-xl text-black'
              {...formik.getFieldProps('description')}
            />
            {formik.touched.description && formik.errors.description && (
              <p className='text-red-500'>{formik.errors.description}</p>
            )}
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Category</label>
            <select
              className='w-full p-3 border border-gray-400 rounded-xl text-black'
              {...formik.getFieldProps('category')}
            >
              <option value='' label='Select Category' />
              {categories.map((category: Category) => (
                <option key={category.objectId} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className='text-red-500'>{formik.errors.category}</p>
            )}
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Content</label>
            <div className='border border-gray-400 rounded-xl px-2'>
            <Tiptap
              onChange={(value) => formik.setFieldValue('content', value)}
            />
            </div>
            {formik.touched.content && formik.errors.content && (
              <p className='text-red-500'>{formik.errors.content}</p>
            )}
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Author</label>
            <input
              type='text'
              placeholder='Ex. defryan@gmail.com'
              className='w-full p-3 border border-gray-400 rounded-xl text-black'
              {...formik.getFieldProps('author')}
            />
            {formik.touched.author && formik.errors.author && (
              <p className='text-red-500'>{formik.errors.author}</p>
            )}
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Image URL</label>
            <input
              type='text'
              placeholder='Ex. https://example.com/image.jpg'
              className='w-full p-3 border border-gray-400 rounded-xl text-black'
              {...formik.getFieldProps('imageUrl')}
            />
            {formik.touched.imageUrl && formik.errors.imageUrl && (
              <p className='text-red-500'>{formik.errors.imageUrl}</p>
            )}
          </div>

          <button
            disabled={isLoading}
            type='submit'
            className='w-full bg-black text-white py-3 rounded-xl cursor-pointer'
          >
            {isLoading ? 'Sending Data...' : 'Create Post'}
          </button>
        </form>
        <ToastContainer />
      </section>
    </section>
  );
}
