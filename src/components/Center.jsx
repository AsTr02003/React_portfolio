import React from 'react';
import Profile from '../assets/Profile.png'
import { motion } from "framer-motion"

const Center = () => {
  return (
    <div className='border-b border-neutral-900 pb-4 lg:mb-35'>
        <div className='flex flex-wrap'>
            <div className='w-full lg:w-1/2'>
                <div className="flex flex-col items-center lg:items-start">
                    <motion.h1 initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.5, delay:0 }} className='pb-16 text-6xl font-normal tracking-tight lg:mt-16 lg:text-8xl'>Abhishek Joshi</motion.h1>
                    <motion.span initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.5, delay:0.5 }}
                    className='bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent'>Full Stack Developer</motion.span>
                    <motion.p initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:0.5, delay:1 }} className='my-2 max-w-xl py-6 font-light text-xl tracking-tighter'>I am a dedicated Full Stack developer with expertise in building scalable web applications using the MERN stack. My focus is on creating seamless user experiences, efficient backend systems, and delivering solutions that drive business growth and performance.</motion.p>
                </div>
            </div>
            
            <div className='max-w-42 flex items-center lg:w-1/2 lg:p-8'>
            <div className='flex justify-end md:items-start '>
                <motion.img initial={{x:100, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:1, delay:1.2}} className='rounded-lg' src={Profile} alt="profile" />
            </div>        
        </div>
        </div>
        
    </div>
  )
}

export default Center