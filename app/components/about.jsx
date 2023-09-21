"use client";

import Image from 'next/image';
import MauveLogo from '../img/mauve_logo_transparent.png';
import React, { useState, useEffect } from "react";
import { delay, motion } from "framer-motion";
import sharedImage from './sharedImage';
import supabase from '../config/supabaseClient';

const supabaseImport = (image) => {
  const imageUrl = supabase.storage.from('about').getPublicUrl(image);
  
  return imageUrl.data.publicUrl;
}

export default function About() {

  const [aboutDane, setAboutDane] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
      .from('about')
      .select()

      if (error) {
        console.log(error);
      } else {
        setAboutDane(data);
      }
    }

    fetchData()
  }, [])

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: {
      staggerChildren: 0.25,
    } }
  }

  return (
    <section id='about' className='w-full 2xl:min-h-[480px] min-h-fit 2xl:max-h-[480px] max-h-none flex sm:flex-row flex-col relative mb-16 drop-shadow-md xl:px-[10%] px-0'>
      <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
      {aboutDane ? (
      <section className="w-full flex sm:flex-row flex-col gap-0">
        <section className='sm:w-1/2 w-full flex flex-col justify-center items-center xl:px-0 px-5 xl:py-0 sm:py-5 pt-10'>
          <Image src={MauveLogo} alt='Mauve Logo' className='sm:w-[160px] w-[150px] h-auto mb-5'/>
          <motion.div variants={container} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='w-full h-auto flex flex-col justify-center items-center gap-3'>
            {aboutDane[0].paragrafy.map((paragraf, i) => (
              <motion.p variants={item} key={i} className='whitespace-pre-line xl:text-base sm:text-sm text-sm sm:text-start text-justify font-theSeasons font-light' dangerouslySetInnerHTML={{__html: paragraf.tekst}}></motion.p>
            ))}
          </motion.div>
        </section>
          <motion.section initial={cardVariants.offscreen} whileInView={cardVariants.onscreen} viewport={{ once: true, amount: 0.5 }} className='sm:w-1/2 w-full flex justify-center items-center sm:py-0 py-5'>
            <Image src={supabaseImport(aboutDane[0].zdjecie)} width={330} height={480} alt='Profile Picture' className='xl:h-[100%] sm:h-[80%] h-[300px] w-auto'/>
          </motion.section>
      </section>
      ) : (
        <div className='w-full 2xl:min-h-[480px] xl:min-h-[380px] lg:min-h-[330px] sm:min-h-[400px] min-h-[540px] flex justify-center items-center'>
          <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </section>
  )
}