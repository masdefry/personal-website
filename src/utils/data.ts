
export const techStack = [
  { src: '/next-logo.png', alt: 'Next.js' },
  { src: '/react-logo.png', alt: 'React.js' },
  { src: '/next-logo.png', alt: 'Next.js' },
  { src: '/laravel-logo.png', alt: 'Laravel' },
  { src: '/tailwindcss-logo.png', alt: 'Tailwind CSS' },
  { src: '/mantineui-logo.png', alt: 'MantineUI CSS' },
  { src: '/express-logo.png', alt: 'Express' },
  { src: '/nest-logo.png', alt: 'Nest JS' },
  { src: '/mysql-logo.png', alt: 'MySql' },
  { src: '/postgree-logo.png', alt: 'Postgre Sql' },
];

export const educationHistory = [
  {
    school: 'Purwadhika Schools',
    degree: 'Web & Mobile Development',
    year: '2021',
    logo: '/pwd-logo.svg',
    alt: 'Purwadhika Digital School Logo'
  },
  {
    school: 'Telkom University',
    degree: 'Electrical Engineering',
    year: '2014-2019',
    logo: '/telkom-logo.webp',
    alt: 'Telkom University Logo'
  },
  {
    school: 'SMK Telkom Malang',
    degree: 'Computer and Network Engineering',
    year: '2011-2014',
    logo: '/telkomschool-logo.png',
    alt: 'SMK Telkom Malang Logo'
  },
];

export const projects = [
  {
    title: 'Kirei Wash',
    description:
      'A laundry ordering application that connects customers with outlets. Features include pick-up and delivery services, order recording, invoice generation for customers, and more.',
    imageUrl: '/kirei-logo.png',
    alt: 'Kirei Wash Logo'
  },
  {
    title: '82 Origin',
    description:
      'An online group website for Korean nationals living abroad. Features include functionalities similar to Facebook, such as creating posts, adding comments, and more.',
    image: '/82origin-logo.webp',
  },
  {
    title: 'Tetring',
    description:
      'An internal application for the PSE OP division of Yayasan Pendidikan Telkom. This web-based application is used to monitor employees tasks within the division.',
    image: '/tetring-logo.webp',
  },
];

export const testimonials = [
  {
    name: 'Yusuf Fadilah',
    position: 'Full Stack Engineer at Universitas Terbuka',
    image: '/user.jpg',
    message:
      'Belajar web development adalah perjalanan yang menantang tapi juga sangat menarik. Dari awal memahami dasar-dasar HTML, CSS, dan JavaScript hingga membangun aplikasi dengan framework seperti React, NextJS atau ExpressJS, setiap tahap memberikan wawasan baru dan pengalaman berharga. Tantangan seperti debugging, memahami konsep backend-frontend, dan mengelola state dalam aplikasi modern membuat proses belajar semakin seru dan penuh eksplorasi.',
  },
  {
    name: 'Immanuel Janis',
    position: 'Developer Engineer at Integrasi Logistik Cipta Solusi',
    image: '/testi-immanuel.jpg',
    message: `Huhuhu selama diajar Pak Defryan, beliau itu gak hanya mengajar, tapi bisa membangun fondasi pemahaman yang kuat sekaligus bikin kelas jadi fun. Dengan pendekatan beliau yang sabar, dedikasi sekali dan detail, membawa saya menjadi bisa belajar bidang ilmu Web Development ini. Yang mulai sekarang sudah pede berkarir, bangun web app dari 0 dan menerapkan best practices di setiap aspek aplikasi.

Yang paling berkesan adalah cara beliau menjelaskan konsep-konsep kompleks di dalam pemrograman web dengan analogi sederhana dan yang langsung 'nyambung'. Gak hanya teori doang, setiap materi selalu dibarengi real study case, code review bersama, dan tips best practice yang ternyata sangat berguna di dunia kerja.`,
  },
];

export const posts = [
  {
    id: 1,
    slug: 'understanding-nextjs-the-future-of-react',
    title: 'Understanding Next.js: The Future of React',
    description:
      'Learn how Next.js enhances the React experience with server-side rendering, static site generation, and more.',
    content: `
      ### What is Next.js?
      Next.js is a powerful React framework that enables developers to build high-performance web applications with ease. 
      Unlike traditional React apps that rely solely on client-side rendering, Next.js provides server-side rendering (SSR) and static site generation (SSG) to improve speed and SEO.

      ### Key Features of Next.js:
      - **Server-Side Rendering (SSR)**: Renders pages on the server, ensuring fast load times and better SEO.
      - **Static Site Generation (SSG)**: Pre-generates pages at build time for ultra-fast performance.
      - **API Routes**: Built-in support for backend APIs, allowing full-stack development within a single framework.
      - **Image Optimization**: Next.js includes automatic image optimization to improve page speed.

      ### Why Choose Next.js?
      - **Better SEO**: With pre-rendered content, search engines can easily index your pages.
      - **Improved Performance**: Pages load faster thanks to efficient data fetching strategies.
      - **Scalability**: Suitable for projects of all sizes, from small blogs to enterprise applications.

      Next.js is the future of modern web development, providing a seamless experience for both developers and users.
    `,
    imageUrl: '/nextjs-blog.jpg',
    date: 'March 25, 2025',
    author: 'John Doe',
  },
  {
    id: 2,
    slug: 'why-tailwind-css-is-a-game-changer',
    title: 'Why Tailwind CSS is a Game Changer',
    description:
      'Discover why developers are switching to Tailwind CSS for rapid UI development.',
    content: `
      ### What is Tailwind CSS?
      Tailwind CSS is a utility-first CSS framework that allows developers to build modern, responsive designs without writing custom CSS. 
      Unlike traditional CSS frameworks like Bootstrap, Tailwind provides low-level utility classes that give developers complete control over styling.

      ### Benefits of Using Tailwind CSS:
      - **Rapid Development**: Build complex layouts quickly without writing custom styles.
      - **Highly Customizable**: Easily configure colors, spacing, and typography in the Tailwind config file.
      - **No More CSS Bloat**: Only the styles you use are included in your final CSS file.
      - **Responsive Design Made Easy**: Utility classes make it simple to create responsive layouts.

      ### Why Developers Love Tailwind:
      Many developers find Tailwind CSS to be more efficient compared to traditional CSS frameworks. 
      Instead of overriding default styles, you create unique, custom designs using utility classes.

      Tailwind CSS is changing the way developers build modern UIs by providing a flexible and efficient approach to styling.
    `,
    imageUrl: '/tailwindcss-blog.jpg',
    date: 'March 20, 2025',
    author: 'Jane Smith',
  },
  {
    id: 3,
    slug: 'mastering-typescript-for-modern-web-apps',
    title: 'Mastering TypeScript for Modern Web Apps',
    description:
      'A comprehensive guide to using TypeScript for large-scale web applications.',
    content: `
      ### Why Use TypeScript?
      TypeScript is a superset of JavaScript that adds static typing, making it easier to write reliable and maintainable code. 
      It helps developers catch errors early and provides a better development experience with features like autocompletion and type checking.

      ### Key Features of TypeScript:
      - **Static Typing**: Reduces runtime errors by catching mistakes during development.
      - **Interfaces & Generics**: Improves code reusability and maintainability.
      - **Better Code Documentation**: Enhances code readability and collaboration.
      - **Seamless Integration with JavaScript**: Works with existing JavaScript codebases without issues.

      ### Getting Started with TypeScript:
      To start using TypeScript in a project, install it with:

      \`\`\`bash
      npm install -g typescript
      \`\`\`

      You can then create a TypeScript file (\`index.ts\`) and compile it to JavaScript using:

      \`\`\`bash
      tsc index.ts
      \`\`\`

      ### Conclusion:
      TypeScript is an essential tool for modern web development. By adding type safety and improving developer productivity, 
      TypeScript enables developers to build scalable and maintainable web applications with confidence.
    `,
    imageUrl: '/typescript-blog.jpg',
    date: 'March 15, 2025',
    author: 'Alice Brown',
  },
];
