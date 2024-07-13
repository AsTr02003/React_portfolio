import React from 'react'
import { motion } from 'framer-motion'
const Contact = () => {
  return (
    <div className='border-b border-neutral-900 pb-24' >
        <motion.h1 whileInView={{opacity:1, y:0}}
        initial={{opacity:0, y:-100}}
        transition={{duration:1.5}} className='my-20 text-center bg-gradient-to-r from-pink-200 via-cyan-200 to-cyan-900 bg-clip-text text-5xl tracking-tight text-transparent'>Contact</motion.h1>
        <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:-100}}
        className="text-center tracking-tighter">
            <motion.p transition={{duration:1.5}} className="my-4">Borivali West,Mumbai-400103</motion.p>
            <motion.p transition={{duration:2}} className="my-4">+91-9324039137</motion.p>
            <motion.a transition={{duration:2.5}} href='mailto:pabhi.joshi0104@gmail.com' className="my-4 border-b">pabhi.joshi0104@gmail.com</motion.a>
        </motion.div>
    </div>
  )
}

export default Contact