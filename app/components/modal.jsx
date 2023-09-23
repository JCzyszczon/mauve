"use client";
import React from 'react';
import {IoMdClose} from 'react-icons/io';
import BasicPhoto from '../img/chris-tIUXSj2iFVY-unsplash.jpg';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import PhotoModal from './photoModal';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedText2 from './animatedText2';
import supabase from '../config/supabaseClient.js';


const supabaseImport = (image) => {
  const imageUrl = supabase.storage.from('oferta').getPublicUrl(image);
  
  return imageUrl.data.publicUrl;
}

function Modal({ closeModal, props }) {

  const modalRef = useRef(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [clickedSlide, setClickedSlide] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(true);
  const [isBasic, setIsBasic] = useState();
  const [photoId, setPhotoId] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageLoad2 = () => {
    setImageLoaded2(true);
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setLayoutOpen(false);
      closeModal();
    }
  };

  const handleClose = () => {
    setLayoutOpen(false);
    closeModal();
  }

  const getSlide = (item, id, index, basic) => {
    setIsBasic(basic);
    setCurrentIndex(index);
    setClickedSlide(item);
    setIsModalOpen(true);
    setPhotoId(id);
  }


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

  const swiperItem = {
    hidden: { width: 0, opacity: 0},
    show: { 
        width: '100%',
        opacity: 1,
        transition: {
            type: "twin",
            duration: 0.4,
        },
    },
    exit: { width: 0, opacity: 0 }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      }
    },
    exit: { opacity: 0 }
  }

  const containerSec = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      }
    },
    exit: { opacity: 0 }
  }

  const container2 = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      }
    },
    exit: { opacity: 0 }
  }
  
  const parItem = {
    hidden: { opacity: 0, x: -10},
    show: { opacity: 1, x: 0 }
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
        duration: 2.5,
      },
    },
  };

  return (
    <>
    <section onClick={handleOutsideClick} className={`w-screen h-screen bg-[#00000099] fixed left-0 top-0 z-[1000] flex ${layoutOpen ? ('justify-start') : ('justify-end')} 2xl:items-center items-start lg:py-[3%] py-[3%] lg:px-[5%] px-[3%] drop-shadow-2xl overflow-y-scroll overflow-x-hidden`}>
      <motion.section variants={swiperItem} initial='hidden' whileInView='show' exit='exit' viewport={{ once: false, amount: 0.5 }} ref={modalRef} className='lg:w-[90%] sm:w-[95%] w-[100%] flex sm:flex-row flex-col bg-[#fff] 2xl:min-h-[700px] min-h-0 2xl:max-h-[700px] max-h-none relative rounded-md overflow-hidden'>
        <button onClick={handleClose} className='absolute right-2 top-2 z-[100]'><IoMdClose className='text-3xl text-[#705555] hover:text-[#604444]'/></button>
        <motion.section variants={cardVariants} initial='offscreen' whileInView='onscreen' viewport={{ once: true, amount: 0.5 }} className='sm:w-1/2 w-full flex flex-col justify-center items-center p-2 gap-2'>
        {props.zdjecia.length >= 1 ? (
          <>
          <Swiper loop={true} spaceBetween={10} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} className="!w-full !flex !justify-center !items-center bg-gray-100 cursor-pointer !rounded-lg !overflow-hidden">
          {props.zdjecia.map((zdjecie, index) => (
            <SwiperSlide onClick={() => getSlide(props.zdjecia, props.id, index, false)} key={'Główne' + index} className='!w-full !flex !relative !justify-center !items-center sm:!h-full !h-[350px]'>
              <Image src={supabaseImport(`${props.id}/${zdjecie.zdj}`)} width={730} height={490} quality={100} alt={index} onLoadingComplete={handleImageLoad} className='h-full w-auto cursor-pointer 2xl:object-cover sm:object-contain object-cover'/>
              {!imageLoaded &&
                <div className='w-full h-full flex justify-center items-center absolute left-0 top-0 bg-gray-100'>
                  <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              }
            </SwiperSlide>
          ))}
          </Swiper>
          <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className="mySwiper3 !w-full !flex !justify-center !items-center bg-gray-100 !rounded-lg sm:!max-h-[150px] sm:!h-auto !max-h-none !h-[100px]">
          {props.zdjecia.map((zdjecie, index) => (
              <SwiperSlide key={index} className='modalSlide2 !bg-gray-200 !cursor-pointer !flex !justify-center !relative !items-center overflow-hidden'>
                <Image src={supabaseImport(`${props.id}/${zdjecie.zdj}`)} width={730} height={490} alt={'Zdjęcie' + index} onLoadingComplete={handleImageLoad2} className='w-auto h-full sm:object-cover object-cover'/>
                {!imageLoaded2 &&
                <div className='w-full h-full flex justify-center items-center absolute left-0 top-0 bg-gray-100'>
                  <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                }
              </SwiperSlide>
          ))}
          </Swiper>
          </>
        ) : (
          <Image onClick={() => getSlide(BasicPhoto, 0, true)} src={BasicPhoto} alt='Offer' className='object-cover h-full w-auto cursor-pointer rounded-lg'/>
        )}
        </motion.section>
        <motion.section variants={containerSec} initial='hidden' whileInView='show' exit='exit' viewport={{ once: true, amount: 0.5}} className='sm:w-1/2 w-full flex flex-col gap-5 px-5 sm:py-10 py-5 justify-center items-center'>
          <AnimatedText2 text={props.tytul} anDelay={0.45} styling={'xl:text-[26px] leading-[2rem] lg:text-xl text-lg font-theSeasons2 text-center font-bold tracking-widest flex flex-wrap justify-center items-center'} className=''></AnimatedText2>
          <motion.div variants={container} initial='hidden' whileInView='show' exit='exit' viewport={{ once: true, amount: 0.5}} className='w-full sm:mt-5 mt-1 h-auto flex flex-col justify-center items-center text-start lg:gap-4 gap-2 font-theSeasons xl:text-base text-sm'>
          {props.paragrafy.map((paragraf, i) => (
            <motion.p variants={parItem} key={i} className='whitespace-pre-line w-full' dangerouslySetInnerHTML={{__html: paragraf.tekst}}></motion.p>
          ))}
          </motion.div>
          {props.cennik && (
          <motion.div variants={container2} initial='hidden' whileInView='show' exit='exit' viewport={{ once: true, amount: 0.5}} className='w-full bg-gray-100 h-auto flex flex-col gap-4 p-4 rounded-lg'>
            {props.cennik.map((ceny, i) => (
              <motion.div variants={parItem} key={i} className='w-auto h-auto flex font-klein font-bold justify-around items-center xl:text-base text-sm'>
                <p className='w-full text-start'>{ceny.tekst}</p>
                <p className='w-full border-dotted border-[#666] border-b-2 text-end pb-1'>{ceny.cena}</p>
              </motion.div>
            ))}
          </motion.div>
          )}
          {props.regulamin && (
            <motion.div variants={container} initial='hidden' whileInView='show' exit='exit' viewport={{ once: true, amount: 0.5}} className='w-full h-auto flex justify-start items-center font-theSeasons xl:text-base text-sm'>
              {props.regulamin.map((reg, i) => (
                <motion.p variants={parItem} key={i}>{replaceLinksInText(reg.tekst, reg.linki)}</motion.p>
              ))}
            </motion.div>
          )}
          <motion.div variants={container} initial='hidden' whileInView='show' exit='exit' viewport={{ once: true, amount: 0.5}} className='w-full h-auto flex sm:justify-end px-10 justify-center items-center'>
            <motion.a variants={parItem} href="https://www.facebook.com/mauvebeautypl/?locale=pl_PL"><button className='uppercase tracking-widest bg-[#cdbebf] text-[#fff] hover:scale-105 duration-200 sm:text-lg text-sm px-5 py-2 font-medium cursor-pointer font-klein'>Umów się</button></motion.a>
          </motion.div>
        </motion.section>
      </motion.section>
    </section>
    <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
    {clickedSlide && isModalOpen &&
      <PhotoModal closeModal={() => setIsModalOpen(false)} props={clickedSlide} photoId={photoId} basicState={isBasic} openIndex={currentIndex}/>
    }
    </AnimatePresence>
    </>
  )
}

export default Modal;