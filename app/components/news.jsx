"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import BasicPhoto from '../img/mauve_final.png';
import sharedImage from './sharedImage.jsx';
import AnimatedText2 from './animatedText2.jsx';
import { motion } from 'framer-motion';
import supabase from '../config/supabaseClient.js';
import { useState, useEffect } from 'react';

const supabaseImport = (image) => {
  const imageUrl = supabase.storage.from('aktualnosci').getPublicUrl(image);
  
  return imageUrl.data.publicUrl;
}

export default function News() {

  const [fetchError, setFetchError] = useState(null);
  const [offerDane, setOfferDane] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
      .from('aktualnosci')
      .select()
      .order('id', { ascending: false });

      if(error) {
        setFetchError('Could not fetch data');
        setOfferDane(null);
        console.log(error);
      }
      if(data) {
        setOfferDane(data);
        setFetchError(null);
      }
    }

    fetchData();
  }, [])

  const replaceLinksInText = (text, linki) => {
    return text.split(/(\[[^\]]+])/).map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        const linkText = part.slice(1, -1);
        const linkHref = linki[linkText];
        if (linkHref) {
          return (
            <a key={index} href={linkHref} className="underline" target="_blank">
              {linkText}
            </a>
          );
        } else {
          return part;
        }
      } else {
        return part;
      }
    });
  };

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
        staggerChildren: 0.1,
      }
    }
  }
  
  const SlideItem = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  }

  return (
    <section className='w-full 2xl:min-h-[480px] min-h-fit 2xl:max-h-[480px] max-h-none flex sm:flex-row flex-col relative mb-16 drop-shadow-md'>
      <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
      {offerDane ? (
        <Swiper spaceBetween={10} loop={true} pagination={{clickable: true,}} modules={[Autoplay,Pagination]} autoplay={{delay: 15000, disableOnInteraction: false,}} className='w-full'>
        {offerDane.slice(0,3).map((item, index) => (
          <SwiperSlide key={item.tytul} className='swiperSlide'>
            <motion.section variants={cardVariants} initial='offscreen' whileInView='onscreen' viewport={{ once: true, amount: 0.5 }} className='sm:w-1/2 w-full flex justify-center items-center'>
              {item.zdjecie ? (
                <Image src={supabaseImport(item.zdjecie)} width={730} height={480} alt={`Article Picture - ${item.tytul}`} className='sm:h-[100%] aspect-video h-full sm:w-auto w-[100%] object-cover object-center'/>
              ) : (
                <Image src={BasicPhoto} width={730} height={480} alt={`Article Picture - ${item.tytul}`} placeholder='blur' className='sm:h-[100%] aspect-video h-full sm:w-auto w-[100%] object-cover object-center'/>
              )}
            </motion.section>
            <section className='sm:w-1/2 w-full flex flex-col justify-center items-center 2xl:py-0 sm:py-10 pb-10 pt-5'>
              {item.tytul && <AnimatedText2 text={item.tytul} state={false} styling={'xl:text-[26px] lineChange2 lg:text-xl text-lg font-theSeasons2 text-center font-bold xl:px-14 px-2 tracking-widest flex flex-wrap justify-center items-center'}/>}
              {item.podtytul && <motion.h3 variants={SlideItem} initial='hidden' whileInView='show' viewport={{ once: false, amount: 0.5 }} className='text-center font-theSeasons2 lg:text-xl text-base mt-2 xl:px-10 px-2'>{item.podtytul}</motion.h3>}
              <motion.div variants={container} initial='hidden' whileInView='show' viewport={{ once: true, amount: 0.5 }} className='flex flex-col justify-center sm:items-center items-start sm:text-center text-start font-theSeasons font-light xl:text-base text-sm w-full sm:mt-6 mt-3 gap-2 xl:px-10 px-5'>
              {item.paragrafy && item.paragrafy.map((paragraf, i) => (
                <motion.p variants={SlideItem} key={i}>{replaceLinksInText(paragraf.tekst, paragraf.linki)}</motion.p>
              ))}
              </motion.div>
              {item.przycisk && <button className='bg-[#cdbebf] px-5 py-2 mt-6 text-[#fff] font-klein xl:text-xl text-sm tracking-[0.2em] hover:scale-105 duration-200'><a href={item.linkPrzycisk} target='_blank'>{item.przycisk}</a></button>}
            </section>
          </SwiperSlide>
        ))}  
        </Swiper>
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