"use client";

import Image from 'next/image';
import NavImg from '../img/mauve_final.png';
import NavMobile from '../img/mauve_mobile.png';
import {BiMenu} from 'react-icons/bi';
import {IoMdClose} from 'react-icons/io';
import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import Link from 'next/link';
import sharedImage from './sharedImage';
import { motion, AnimatePresence } from "framer-motion";
import AnimatedText from './animatedText';
import { useRouter } from 'next/navigation';
import MauveLogo from '../img/mauve_logo_nav.png';

export default function Navbar() {

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const router = useRouter();
  const [navPic, setNavPic] = useState(NavImg);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  }

  const cardVariants = {
    offscreen: {
      filter: 'blur(2px)',
    },
    onscreen: {
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.8,
      },
    },
  };

  const mobile = {
    hidden: {
      y: '-50vh',
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.8,
      },
    },
    exit: {
      y: '-50vh',
      opacity: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 1.5,
      },
    }
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setNavPic(NavMobile);
      } else {
        setNavPic(NavImg);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <header className='w-full 2xl:min-h-[480px] min-h-fit 2xl:max-h-[480px] max-h-none flex sm:flex-row flex-col relative drop-shadow-md'>
      <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
      <section className="w-full flex sm:flex-row flex-col-reverse sm:gap-0 gap-5">
        <motion.section variants={cardVariants} initial='offscreen' whileInView='onscreen' viewport={{ once: true, amount: 0.5 }} className='sm:w-1/2 w-full flex justify-center items-center'>
          <Image src={navPic} alt='Navbar Image' width={1200} height={800} quality={100} priority={true} className='sm:h-[100%] aspect-auto h-full sm:w-full w-[100%] object-cover object-center'/>
        </motion.section>
        <section className='sm:w-1/2 w-full flex flex-col relative justify-evenly items-center xl:pr-[5%] sm:pr-[3%] pr-0 sm:gap-0 gap-5'>
          <nav className='w-full flex justify-between items-center border-b border-[#705555] sm:pb-2 pb-3 pt-5 sm:px-0 px-5'>
            <Link href='/' scroll={true}><Image src={MauveLogo} quality={100} alt='Mauve' className='w-[120px]'/></Link>
            <motion.ul variants={container} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='w-auto h-auto lg:flex hidden justify-between items-center uppercase tracking-widest xl:text-base text-sm font-normal font-klein xl:gap-5 gap-3'>
              <motion.li variants={item} className='hover:text-[#705555] duration-200 cursor-pointer'><ScrollLink to='offer' smooth={true} duration={400} offset={-40}>Oferta</ScrollLink></motion.li>
              <motion.li variants={item} className='hover:text-[#705555] duration-200 cursor-pointer'><a href='https://www.instagram.com/mauve.pl/' target='_blank'>Portfolio</a></motion.li>
              <motion.li variants={item} className='hover:text-[#705555] duration-200 cursor-pointer'><ScrollLink to='about' smooth={true} duration={400} offset={-40}>O mnie</ScrollLink></motion.li>
            </motion.ul>
            {!nav ? <BiMenu className='lg:hidden flex text-2xl text-[#000]' onClick={handleClick}/> : <IoMdClose className='lg:hidden flex text-2xl text-[#000]' onClick={handleClick}/>}
          </nav>
          <AnimatePresence>
          {nav && 
            <motion.section variants={mobile} initial="hidden" animate="show" exit="exit" viewport={{ once: false, amount: 1 }} className='w-full bg-[#fff] absolute left-0 top-0 z-[10000]'>
              <div className='w-full flex justify-between items-center border-b border-[#705555] pb-3 pt-5 px-5'>
                <Link href='/' scroll={true}><Image src={MauveLogo} quality={100} alt='Mauve' className='w-[120px]'/></Link>
                {!nav ? <BiMenu className='lg:hidden flex text-2xl text-[#000]' onClick={handleClick}/> : <IoMdClose className='lg:hidden flex text-2xl text-[#000]' onClick={handleClick}/>}
              </div>
              <motion.ul variants={container} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='w-full flex flex-col justify-center items-center uppercase tracking-widest text-base font-normal font-klein gap-3 py-10'>
                <motion.li variants={item} className='hover:text-[#705555] duration-200 cursor-pointer'><ScrollLink to='offer' onClick={() => setNav(false)} smooth={true} duration={400} offset={-40}>Oferta</ScrollLink></motion.li>
                <motion.li variants={item} className='hover:text-[#705555] duration-200 cursor-pointer'><a href='https://www.instagram.com/mauve.pl/' onClick={() => setNav(false)} target='_blank'>Portfolio</a></motion.li>
                <motion.li variants={item} className='hover:text-[#705555] duration-200 cursor-pointer'><ScrollLink to='about' onClick={() => setNav(false)} smooth={true} duration={400} offset={-40}>O mnie</ScrollLink></motion.li>
              </motion.ul>
            </motion.section>
          }
          </AnimatePresence>
          <div className='w-full flex sm:justify-end justify-center items-center'>
            <AnimatedText text={'Makeup/& Brows'} styling={'xl:text-[53px] lg:text-4xl text-3xl lineChange uppercase font-theSeasons2 tracking-widest text-end'}/>
          </div>
          <div className='w-full flex sm:justify-end justify-center items-center'>
            <button className='uppercase xl:text-2xl lg:text-xl text-lg font-klein tracking-[0.2em] bg-[#cdbebf] hover:scale-105 duration-200 text-[#fff] px-5 py-2'><a href="https://www.facebook.com/mauvebeautypl/?locale=pl_PL">Umów się</a></button>
          </div>
        </section>
      </section>
    </header>
  )
}