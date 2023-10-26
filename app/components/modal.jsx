"use client";
import React from 'react';
import {IoMdClose} from 'react-icons/io';
import BasicPhoto from '../img/mauve-lokal.png';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
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

  const sectionRef = useRef(null);
  const sectionRef2 = useRef(null);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [clickedSlide, setClickedSlide] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(true);
  const [isBasic, setIsBasic] = useState();
  const [photoId, setPhotoId] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoaded2, setImageLoaded2] = useState(false);
  const [userScroll, setUserScroll] = useState(false);
  const [elements, setElements] = useState(false);
  const [userBottom, setUserBottom] = useState(false);

  useEffect(() => {
    function handleResize() {
    if (window.innerHeight <= 710) {
        setElements(true);
    } else {
        setElements(false);
    }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
  
    if (!section) return ;
  
    const scrollThreshold = 1;
  
    const handleScroll = () => {
      const isAtBottom =
        section.scrollTop + section.clientHeight >= section.scrollHeight;
      const isContentLarger = section.scrollHeight > section.clientHeight;
  
      if ((isAtBottom && !userScroll) || (section.scrollTop >= scrollThreshold)) {
        setUserScroll(true);
      } else if (!isAtBottom && userScroll) {
        setUserScroll(false);
      }

      if(isAtBottom && !isContentLarger) {
        setUserBottom(true);
      } else {
        setUserBottom(false);
      }
    };
  
    section.addEventListener("scroll", handleScroll);
  
    return () => {
      section.removeEventListener("scroll", handleScroll);
    };
  }, [userScroll]);

  function handleTouchStart(e) {
    if(userBottom) {
      const startY = e.touches[0].clientY;

      function handleTouchMove(e) {
        const currentY = e.touches[0].clientY;
  
        const deltaY = currentY - startY;
  
        if (deltaY > 10) {
          setUserScroll(false);
          setUserBottom(false);
        }
      }
  
      function handleTouchEnd() {
        sectionRef.current.removeEventListener('touchmove', handleTouchMove);
        sectionRef.current.removeEventListener('touchend', handleTouchEnd);
      }
  
      sectionRef.current.addEventListener('touchmove', handleTouchMove);
      sectionRef.current.addEventListener('touchend', handleTouchEnd);
    } else {
      setUserBottom(false);
      return;
    }
  }

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

  function formatText(text) {
    const regex = /\[([^\]]+)\]/g;
  
    const formattedText = text.replace(regex, '<strong>$1</strong>');
  
    return formattedText;
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
    <section onClick={handleOutsideClick} className={`w-screen h-screen bg-[#00000099] fixed left-0 top-0 z-[10000000000000] flex ${layoutOpen ? ('justify-start') : ('justify-end')} ${elements ? 'items-start' : 'items-center'} lg:py-[3%] py-[3%] lg:px-[5%] px-[3%] lg:drop-shadow-2xl drop-shadow-none overflow-y-scroll overflow-x-hidden`}>
      <motion.section variants={swiperItem} initial='hidden' whileInView='show' exit='exit' viewport={{ once: false, amount: 0 }} ref={modalRef} className='lg:w-[90%] sm:w-[95%] w-[100%] flex sm:flex-row flex-col bg-[#fff] sm:h-[700px] h-[96%] relative rounded-md overflow-hidden !box-border'>
        <button onClick={handleClose} className='absolute right-2 top-2 z-[100]'><IoMdClose className='text-3xl text-[#705555] hover:text-[#604444]'/></button>
        <motion.section variants={cardVariants} initial='offscreen' whileInView='onscreen' viewport={{ once: true, amount: 0}} className='sm:w-1/2 w-full sm:max-h-none max-h-1/2 duration-200 flex flex-col justify-center items-center p-2 gap-2'>
        {props.zdjecia.length >= 1 ? (
          <>
          <Swiper loop={true} spaceBetween={10} thumbs={{ swiper: thumbsSwiper }} modules={[FreeMode, Navigation, Thumbs]} className="!w-full !flex !justify-center sm:!h-full !h-auto !items-center bg-gray-100 cursor-pointer !rounded-lg !overflow-hidden">
          {props.zdjecia.map((zdjecie, index) => (
            <SwiperSlide onClick={() => getSlide(props.zdjecia, props.id, index, false)} key={'Główne' + index} className={`!w-full !flex !relative !justify-center !duration-500 !items-center sm:!h-full !h-auto`}>
              <Image src={supabaseImport(`${props.id}/${zdjecie.zdj}`)} width={730} height={490} alt={index} onLoadingComplete={handleImageLoad} className={`sm:h-full w-auto cursor-pointer 2xl:object-cover sm:object-contain duration-500 object-cover ${userScroll ? 'h-[150px]' : 'h-[300px]'}`}/>
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
          <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className={`mySwiper3 !w-full !duration-500 !justify-center !items-center bg-gray-100 !rounded-lg sm:!max-h-[150px] sm:!h-auto !max-h-none ${userScroll ? '!h-0' : '!h-[100px]'}`}>
          {props.zdjecia.map((zdjecie, index) => (
              <SwiperSlide key={index} className='modalSlide2 !bg-gray-200 !cursor-pointer !flex !justify-center !relative !items-center overflow-hidden'>
                <Image src={supabaseImport(`${props.id}/${zdjecie.zdj}`)} width={204} height={150} alt={'Zdjęcie' + index} onLoadingComplete={handleImageLoad2} className='w-auto h-full sm:object-cover object-cover'/>
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
        <motion.section variants={containerSec} initial='hidden' whileInView='show' exit='exit' viewport={{ once: true, amount: 0.5 }} className={`sm:w-1/2 w-full flex flex-col gap-5 relative justify-center items-center overflow-y-hidden`}>
          <div
            className='sm:w-full w-full h-auto sm:py-10 py-5 px-5 gap-5 flex flex-col overflow-y-scroll' ref={sectionRef} onTouchStart={handleTouchStart}
          >
            {userBottom &&
              <button ref={sectionRef2} onTouchStart={handleTouchStart} className='absolute cursor-pointer top-2 left-1/2 -translate-x-1/2 w-[60px] h-[4px] bg-[#777] rounded-2xl'></button>
            }
            <AnimatedText2
              text={props.tytul}
              anDelay={0.45}
              styling={'xl:text-[26px] leading-[2rem] lg:text-xl text-lg font-theSeasons2 text-center font-bold tracking-widest flex flex-wrap justify-center items-center'}
              className=''
            />
            <motion.div
              variants={container}
              initial='hidden'
              whileInView='show'
              exit='exit'
              viewport={{ once: true, amount: 0.5 }}
              className='w-full sm:mt-5 mt-1 h-auto flex flex-col justify-center items-center text-start lg:gap-4 gap-2 font-theSeasons xl:text-base text-sm'
            >
              {props.paragrafy.map((paragraf, i) => (
                <motion.p
                  variants={parItem}
                  key={i}
                  className='whitespace-pre-line w-full'
                  dangerouslySetInnerHTML={{ __html: formatText(paragraf.tekst) }}
                ></motion.p>
              ))}
            </motion.div>
            {props.regulamin && (
              <motion.div
                variants={container}
                initial='hidden'
                whileInView='show'
                exit='exit'
                viewport={{ once: true, amount: 0.5 }}
                className='w-full h-auto flex justify-start items-center font-theSeasons xl:text-base text-sm mt-2'
              >
                {props.regulamin.map((reg, i) => (
                  <motion.p variants={parItem} key={i}>
                    {replaceLinksInText(reg.tekst, reg.linki)}
                  </motion.p>
                ))}
              </motion.div>
            )}
            <motion.div
              variants={container}
              initial='hidden'
              whileInView='show'
              exit='exit'
              viewport={{ once: true, amount: 0.5 }}
              className='w-full h-auto sm:bg-inherit bg-[#f3f4f6aa] sm:drop-shadow-none drop-shadow-lg flex sm:justify-end sticky bottom-0 left-0 right-0 sm:py-2 py-0 rounded-md justify-center items-center'
            >
              <motion.a
                variants={parItem}
                href='https://www.facebook.com/mauvebeautypl/?locale=pl_PL'
                className='sm:w-auto w-full bg-[#cdbebf] text-center py-1 sm:drop-shadow-lg drop-shadow-none'
              >
                <button className='uppercase tracking-widest text-[#fff] hover:scale-105 duration-200 sm:text-lg text-sm px-5 py-2 font-medium cursor-pointer font-klein'>
                  Umów się
                </button>
              </motion.a>
            </motion.div>
          </div>
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