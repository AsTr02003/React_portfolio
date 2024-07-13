import React from 'react'
import AboutMe from '../assets/About.png'
import { motion } from "framer-motion"
const About = () => {
  return (
    <div className='border-b border-neutral-900 pb-4'>
        <h1 className=' my-20 text-center bg-gradient-to-r from-cyan-100 via-slate-400 to-cyan-600 bg-clip-text text-5xl tracking-tight text-transparent'>About Me</h1>
        <div className='flex flex-wrap'>
            <motion.div whileInView={{opacity:1, x:0}}
            initial={{opacity:0, x:-100 }}
            transition={{duration:1}} className='w-full lg:w-1/2 lg:p-8'>
                <div className='flex items-center justify-center'>
                    <img className='rounded-lg shadow-lg max-w-xs md:max-w-md'src={AboutMe} alt="About" />
                </div>
            </motion.div>
            <motion.div whileInView={{opacity:1, x:0}}
            initial={{opacity:0, x:100 }}
            transition={{duration:1}} className='w-full lg:w-1/2'>
                  <div className='flex justify-center lg:justify-start'>
                    <p className='my-2 max-w-xl text-xl py-6'>I am a dedicated and versatile Front-End developer with a passion for creating efficient and user-friendly web applications. I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.</p>
                  </div>
            </motion.div>
        </div>
    </div>
  )
}

export default About