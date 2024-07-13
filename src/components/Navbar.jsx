import React from 'react'
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';
import logo from '../assets/logo.png'
import resume from '../assets/Abhishek_Resume.pdf';


const Navbar = () => {
  return (
    <nav className='mb-20 flex items-center justify-between'>
      <div className='flex flex-shrink-0 items-center'>
        <img className='mx-2 w-20'src={logo} alt='logo'/>
      </div>
      <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
      <button className=" hover:text-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => window.location.href ='https://www.linkedin.com/in/abhishek-joshi-4b3265246/'}>
      <FaLinkedin/></button>
      <button
      className=" hover:text-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => window.location.href ='https://www.linkedin.com/in/abhishek-joshi-4b3265246/'}><FaGithub/></button>
        <button
      className=" hover:text-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => window.location.href ='https://github.com/AsTr02003'}><FaInstagram/></button>
        <button
      className="hover:text-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => window.location.href ='https://x.com/Abhishek6432376?t=fXp5QsC4TIDs6mrsu4-K9g&s=08 '}><FaSquareXTwitter/></button>
      <div className='relative group'>
      <a href={resume} download className=" text-white hover:text-blue-700"><FaDownload/></a>
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">Resume</span>
      </div>
    
      </div>
      
    </nav>
  )
}

export default Navbar