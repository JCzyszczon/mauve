"use client";
import React, { lazy } from 'react';
import {BsArrowLeftShort} from 'react-icons/bs';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { motion } from 'framer-motion';
import supabase from '../config/supabaseClient.js';

const supabaseImport = (image) => {
  const imageUrl = supabase.storage.from('oferta').getPublicUrl(image);
  
  return imageUrl.data.publicUrl;
}

function PhotoModal({ closeModal, props, photoId, openIndex, basicState }) {
  const modalRef = useRef(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [isSwipeClosing, setIsSwipeClosing] = useState(false);
  const [layoutOpen, setLayoutOpen] = useState(true);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.4,
      }
    },
    exit: { opacity: 0 }
  }
  
  const swiperItem = {
    hidden: { y: '-100vh' },
    show: { 
        y: 0,
        transition: {
            type: "twin",
            duration: 0.4,
        },
    },
    exit: { y: '-100vh' }
  }

  return (
    <motion.article variants={container} initial='hidden' whileInView='show' exit='exit' viewport={{ once: true, amount: 0}} onClick={handleOutsideClick} className='w-[100vw] h-screen bg-[#00000099] fixed left-0 top-0 z-[100000000000000] flex justify-center items-center lg:py-0 py-[3%] lg:px-[5%] px-[3%] drop-shadow-2xl'>
      <button onClick={closeModal} className='absolute left-5 top-5 z-[200]'><BsArrowLeftShort className='text-5xl text-[#fff] hover:text-[#fff]'/></button>
      <motion.section drag='y' dragConstraints={{ top: 0, bottom: 0 }} onDrag={(event, info) => {if(isSwipeClosing && info.offset.y < -100) {setLayoutOpen(false);setCurrentOffset(info.offset.y);closeModal();} else {setCurrentOffset(info.offset.y)}}} onDragStart={() => setIsSwipeClosing(true)} onDragEnd={() => setIsSwipeClosing(false)} variants={swiperItem} className='md:w-[80%] sm:w-[90%] w-full z-[100] select-none flex justify-center items-center'>
        {props.length >= 1 && !basicState ? (
          <Swiper ref={modalRef} initialSlide={openIndex} loop={true} spaceBetween={10} modules={[FreeMode, Navigation, Thumbs]} className="mySwiperPhoto !w-full !flex !justify-center !items-center">
          {props.map((zdjecie, index) => (
            <SwiperSlide key={zdjecie.zdj} className='modalSlidePhoto !w-full !h-screen !flex !justify-center !items-center cursor-grab !py-10'>
                <Image src={supabaseImport(`${photoId}/${zdjecie.zdj}`)} width={1200} height={800} quality={100} alt={index} className='w-auto h-full !object-contain'/>
            </SwiperSlide>
          ))}
          </Swiper>
        ) : (
          <Swiper ref={modalRef} loop={true} spaceBetween={10} modules={[FreeMode, Navigation, Thumbs]} className="mySwiperPhoto">
            <SwiperSlide className='modalSlidePhoto cursor-grab'>
              <Image ref={modalRef} src={props} alt='Offer Photo' quality={100} placeholder='blur' loading='lazy' className='w-auto h-auto'/>
            </SwiperSlide>
          </Swiper>
        )} 
      </motion.section>
    </motion.article>
  )
}

export default PhotoModal;