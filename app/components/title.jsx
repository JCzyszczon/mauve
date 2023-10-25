"use client";
import Image from 'next/image';
import MauveLogo from '../img/mauve_logo_transparent.png';
import { motion } from "framer-motion";
import AnimatedText from './animatedText';

export default function Title() {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <section className='w-full h-auto flex flex-col justify-center items-center text-center md:gap-4 gap-3 py-16'>
        <Image src={MauveLogo} alt='Logo' className='sm:w-[170px] w-[150px] h-auto'/>
        <AnimatedText text={'Profesjonalny makijaż na wyjątkowe okazje/Perfekcyjne brwi na codzień'} type={'h1'} styling={'xl:text-2xl lg:text-xl text-lg font-theSeasons2 text-center font-light'}/>
        <motion.div /*variants={container} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }}*/ className='flex font-theSeasons font-light flex-col justify-center items-center text-center md:gap-4 gap-3'>
          <motion.div /*variants={item}*/ className='px-5 xl:text-base text-sm sm:block hidden md:whitespace-nowrap'>
            <p>Zadbaj o oprawę swoich oczu i czuj się piękniejsza na codzień bez tracenia czasu na malowanie brwi!</p>
            <p>Skorzystaj z najbardziej naturalnie wyglądającego makijażu permanentnego brwi metodą włoskową.</p>
          </motion.div>
          <motion.p /*variants={item}*/ className='px-5 xl:text-base text-sm sm:block hidden md:whitespace-nowrap'>Poczuj się wyjątkowo w makijażu okazjonalnym idealnie dopasowanym do Twojej naturalnej urody.</motion.p>
        </motion.div>
    </section>
  )
}