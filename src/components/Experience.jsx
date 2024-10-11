import React from 'react';
import { motion } from 'framer-motion';


const Experience = () => {
  return (
    <div className='border-b border-neutral-900 pb-24' >
        <motion.h1 whileInView={{opacity:1, y:0}}
        initial={{opacity:0, y:-100}}
        transition={{duration:1.5}} className='my-20 text-center bg-gradient-to-r from-pink-200 via-cyan-200 to-cyan-900 bg-clip-text text-5xl tracking-tight text-transparent'>Experience</motion.h1>
        <div className='mb-8 flex flex-wrap lg:justify-center'>
            <div className="mb-8 flex flexx-wrap lg:justify-center">
                <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:-100}}
        transition={{duration:1.5}} className="w-full lg:w-1/4">
                    <p className='mb-2 text-lg text-neutral-400 '> July-2024 to October 2024</p>
                </motion.div>
                <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:100}}
        transition={{duration:1.5}} className="w-full max-w-xl lg:w-3/4">
                    <h6 className='mb-2 text-lg font-bold'>Full Stack Developer - <span className='text-lg text-white'>Bot2Do Technologies</span> </h6>
                    <p className='mb-4 text-neutral-200'>Worked with a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines</p>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>MongoDB</span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>ExpressJS</span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>ReactJS+Vite </span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>NodeJS </span>
                    <span className='mr-2 mt-4 rounded bg-neutral-600 px-2 py-1 text-sm font-medium text-purple-200'>Tailwind CSS </span>
                </motion.div>
                
            </div>
            
        </div>  
    </div>

  )
}

export default Experience