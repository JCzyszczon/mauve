"use client";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {AiOutlineTag, AiOutlineClockCircle} from 'react-icons/ai';
import React, { useState, useEffect } from "react";
import Modal from './modal.jsx';
import { motion, AnimatePresence } from "framer-motion";
import sharedImage from './sharedImage.jsx';
import supabase from '../config/supabaseClient.js';

export default function Offer() {
    const [elements, setElements] = useState(4.2);
    const [clickedSlide, setClickedSlide] = useState();
    const [currentIndex, setCurrentIndex] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [offerDane, setOfferDane] = useState();
    const [space, setSpace] = useState(30);

    const getSlide = (item, index) => {
        setCurrentIndex(index);
        setClickedSlide(item);
        setIsModalOpen(true);
    }

    useEffect(() => {
        const fetchData = async () => {
          const { data, error } = await supabase
          .from('oferta')
          .select()
          .order('priorytet');
    
          if(error) {
            console.log(error);
          }
          if(data) {
            setOfferDane(data);
          }
        }
    
        fetchData();
    }, [])

    useEffect(() => {
        function handleResize() {
        if (window.innerWidth < 1500 && window.innerWidth >= 1024) {
            setElements(3.5);
        } else if (window.innerWidth < 1024 && window.innerWidth >= 540) {
            setElements(2.2);
        } else if (window.innerWidth < 540) {
            setElements(1.2);
            setSpace(20);
        } else {
            setElements(4.2);
            setSpace(30);
        }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isModalOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        return () => {
          document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);
      
    const swiperItem = {
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0 }
    }

    return (
    <>
        <section id='offer' className='w-full 2xl:min-h-[480px] min-h-fit 2xl:max-h-[480px] max-h-none flex sm:flex-row flex-col relative mb-16 drop-shadow-md'>
            <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
            {offerDane ? (
                <section className='w-full flex flex-col justify-center items-center'>
                    <h2 className='font-theSeasons2 lg:text-[36px] text-3xl tracking-[0.2em] font-bold uppercase text-center pt-10'>Oferta</h2>
                    <section className='w-full flex sm:px-[5%] px-[5%]'>
                        <Swiper slidesPerView={elements} spaceBetween={space} className='mySwiper !overflow-hidden'>
                        {offerDane.map((item, index) => (
                            <SwiperSlide key={item.tytul} className='offerSlide drop-shadow-xl group' onClick={() => getSlide(item, index)}>
                                <motion.div variants={swiperItem} initial='hidden' whileInView='show' transition={{ duration: 0.3, delay: index * 0.1 }} viewport={{ once: true, amount: 0.5 }} className='swiperSlide2'>
                                <h3 className='font-theSeasons2 lg:text-xl sm:text-lg text-base tracking-widest uppercase font-bold'>{item.tytul}</h3>
                                <div className='w-full h-auto flex flex-col justify-center items-center gap-5'>
                                    <div className='w-full h-auto flex justify-between items-center font-theSeasons2 text-sm'>
                                        <span className='w-full h-auto flex justify-center items-center gap-2'><AiOutlineClockCircle className='text-[26px] text-[#cdbebf]'/><p>{item.czas}</p></span>
                                        <span className='w-full h-auto flex justify-center items-center gap-2'><AiOutlineTag className='text-[26px] text-[#cdbebf] font-extralight'/><p>{item.cena}</p></span>
                                    </div>
                                    <button className='uppercase tracking-widest bg-[#cdbebf] text-[#fff] group-hover:scale-105 duration-200 sm:text-base text-base px-5 py-1 font-medium cursor-pointer font-klein'>więcej</button>
                                </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </section>
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
        <AnimatePresence initial={false} mode='wait' onExitComplete={() => null}>
        {clickedSlide && isModalOpen &&
            <Modal closeModal={() => setIsModalOpen(false)} props={clickedSlide}/>
        }
        </AnimatePresence>
    </>
    )
}