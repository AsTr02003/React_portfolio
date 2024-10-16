import React from 'react';
import Project1 from '../assets/project_manager.png'
import Project2 from '../assets/user_directory.png'
import Project3 from '../assets/project3.png'
import { motion } from 'framer-motion';

const Project = () => {
  return (
    <div className='border-b border-neutral-900 pb-24' >
        <motion.h1  whileInView={{opacity:1, y:0}}
        initial={{opacity:0, y:-100}}
        transition={{duration:1.5}} className='my-20 text-center bg-gradient-to-r from-pink-200 via-cyan-200 to-cyan-900 bg-clip-text text-5xl tracking-tight text-transparent'>Projects</motion.h1>
        <div>
            <div className='mb-8 flex flex-wrap lg:justify-center'>
                <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:-100}}
        transition={{duration:1.5}} className="w-full lg:w-1/4">
                    <img src={Project1}  className='mb-6 rounded' alt="PM" />
                </motion.div>
                <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:100}}
        transition={{duration:1.5}} className='w-full max-w-xl ml-40 lg:w-3/4'>
                    <h6 className='font-bold text-xl'>Task Manager</h6>
                    <p className='mb-4 text-neutral-400'>Developed a MERN stack-based task management app for managing projects, tasks, and bugs with user creation and team assignment features. Enhanced project tracking and task delegation, improving team collaboration and operational efficiency.</p>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>MongoDB</span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>ExpressJS </span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>ReactJS+Vite </span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>NodeJS </span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>Tailwind CSS </span>
                </motion.div>
            </div>
        </div>
        <div>
            <div className='mb-8 flex flex-wrap lg:justify-center'>
                <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:-100}}
        transition={{duration:1.5}} className="w-full lg:w-1/4">
                    <img src={Project2}  className='mb-6 rounded' alt="SV1" />
                </motion.div>
                <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:100}}
        transition={{duration:1.5}} className='w-full max-w-xl ml-40 lg:w-3/4'>
                    <h6 className='font-bold text-xl'>User Directory</h6>
                    <p className='mb-4 text-neutral-400'>Built a scalable user directory using the MERN stack with efficient handling of large datasets, supporting pagination, filters, and global search functionality. Integrated role-based access control for admin and regular users, ensuring secure and tailored access to data and CRUD
operations.</p>
<span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>MongoDB</span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>ExpressJS </span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>ReactJS+Vite </span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>NodeJS </span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>Tailwind CSS </span>
                </motion.div>
            </div>
        </div>
        <div>
            <div className='mb-8 flex flex-wrap lg:justify-center'>
                <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:-100}}
        transition={{duration:1.5}} className="w-full lg:w-1/4">
                    <img src={Project3}  className='mb-6 rounded' alt="SV2" />
                </motion.div>
                <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:100}}
        transition={{duration:1.5}} className='w-full max-w-xl ml-40 lg:w-3/4'>
                    <h6 className='font-bold text-xl'>Sorting Visualizer</h6>
                    <p className='mb-4 text-neutral-400'>Sorting Visualizer is an interactive web application developed with ReactJS, enabling users to visually explore and compare various sorting algorithms in real-time.</p>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-400'>ReactJS</span>
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default Project