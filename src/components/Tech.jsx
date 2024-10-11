import React from 'react';
import { RiReactjsLine } from 'react-icons/ri';
import { TbBrandNextjs, TbBrandJavascript , TbBrandNodejs} from 'react-icons/tb';
import { SiMongodb } from 'react-icons/si';
import { motion } from "framer-motion"


const iconVari = (duration) =>({
    initial: {y:-10},
    animate:{
        y:[10,-10],
        transition:{
            duration: duration,
            ease:"linear",
            repeat: Infinity,
            repeatType:"reverse"
        },
    },
});

const Tech = () => {
  return (
    <div className='border-b border-neutral-900 pb-24'>
        <motion.h1 whileInView={{opacity:1, y:0}}
        initial={{opacity:0, y:-100}}
        transition={{duration:1.5}} className=' my-20 text-center bg-gradient-to-r from-cyan-500 via-green-200 to-yellow-600 bg-clip-text text-5xl tracking-tight text-transparent'>Technologies</motion.h1>
        <motion.div whileInView={{opacity:1, x:0}}
        initial={{opacity:0, x:-100}}
        transition={{duration:1.5}} className='flex flex-wrap items-center justify-center gap-4'>
            <motion.div initial={{y:-10}} animate={{y:[10,10], transition:{duration:2.5, ease:"linear", repeat:Infinity, repeatType:"reverse" }}}  className='rounded-2xl border-4 p-4 border-neutral-800'>
                <RiReactjsLine className='text-7xl text-cyan-400'/>
            </motion.div>
            <motion.div initial={{y:-10}} animate={{y:[10,10], transition:{duration:3, ease:"linear", repeat:Infinity, repeatType:"reverse" }}} className='rounded-2xl border-4 p-4 border-neutral-800'>
                <SiMongodb className='text-7xl text-green-600'/>
            </motion.div>
            <motion.div initial={{y:-10}} animate={{y:[10,10], transition:{duration:3.5, ease:"linear", repeat:Infinity, repeatType:"reverse" }}} className='rounded-2xl border-4 p-4 border-neutral-800'>
                <TbBrandNodejs className='text-7xl text-green-500'/>
            </motion.div>
            <motion.div initial={{y:-10}} animate={{y:[10,10], transition:{duration:4, ease:"linear", repeat:Infinity, repeatType:"reverse" }}} className='rounded-2xl border-4 p-4 border-neutral-800'>
                <TbBrandNextjs className='text-7xl'/>
            </motion.div>
            <motion.div initial={{y:-10}} animate={{y:[10,10], transition:{duration:4.5, ease:"linear", repeat:Infinity, repeatType:"reverse" }}} className='rounded-2xl border-4 p-4 border-neutral-800'>
                <TbBrandJavascript className='text-7xl text-yellow-500'/>
            </motion.div> 
        </motion.div>
    </div>
  ) 
}

export default Tech