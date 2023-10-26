"use client";
import {AiFillFacebook, AiOutlineInstagram} from 'react-icons/ai';
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import AnimatedText2 from './animatedText2';
import sharedImage from './sharedImage';
import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient';
import {IoMdClose} from 'react-icons/io';
import MauveLogo from '../img/mauve_logo_nav.png';

export default function Footer() {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [modalState, setModalState] = useState(false);
    const [failure, setFailure] = useState();
    const [messageTimer, setMessageTimer] = useState(null);
    const [translation, setTranslation] = useState('0%');
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const handleClick = () => {
        setModalState(false);
        setMessage(null);
    }

    useEffect(() => {
        function handleResize() {
        if (window.innerWidth < 640) {
            setTranslation('-50%');
        } else {
            setTranslation('0%');
        }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!isValidEmail) {
            setMessage('Adres e-mail nie jest poprawny!');
            setLoading(false);
            setModalState(true);
            clearTimeout(messageTimer);
            setMessageTimer(setTimeout(() => setModalState(false), 3000));
            setFailure(true);
        } else {
            const { data, error } = await supabase
            .from('newsletter')
            .select()
            .eq('email', email)
            .single();

            if (error) {
                const { data, error } = await supabase.from('newsletter').upsert([
                    { email },
                ]);
    
                if (error) {
                    setMessage('Bład podczas dodawania');
                    setModalState(true);
                    setLoading(false);
                    clearTimeout(messageTimer);
                    setMessageTimer(setTimeout(() => setModalState(false), 3000));
                    setFailure(true);
                } else {
                    setMessage('Pomyślnie dodano do newslettera!');
                    setModalState(true);
                    clearTimeout(messageTimer);
                    setLoading(false)
                    setMessageTimer(setTimeout(() => setModalState(false), 3000));
                    setFailure(false);

                    await fetch('api/email', {
                        method: 'POST',
                        body: JSON.stringify({
                            userEmail: email,
                        })
                    });
                }
            } else {
                setMessage('Adres e-mail widnieje już w bazie danych!');
                setModalState(true);
                setLoading(false);
                clearTimeout(messageTimer);
                setMessageTimer(setTimeout(() => setModalState(false), 3000));
                setFailure(true);
            }
        }
    };

    useEffect(() => {
        function handleResize() {
          if (window.innerWidth <= 1024) {
            setIsMobile(true);
          } else {
            setIsMobile(false);
          }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const buttonVariants = {
        offscreen: {
            backgroundColor: '#705555',
        },
        onscreen: {
            backgroundColor: '#cdbebf',
            transition: {
                type: "spring",
                duration: 0.8,
            },
        },
    };

    const container = {
        hidden: {
            y: '-100vh',
        },
        visible: {
            y: 0,
            x: translation,
            transition: {
                type: 'spring',
                duration: 0.8,
            },
        },
        exit: {
            opacity: 0,
        }
    }

    return (
        <>
            <footer className='w-full h-auto sm:px-10 px-5 pt-20 sm:pb-10 pb-5 relative'>
                <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
                <span className='absolute sm:right-10 right-5 top-5 flex justify-center items-center gap-1'>
                    <a href="https://www.facebook.com/mauvebeautypl/?locale=pl_PL" aria-label='Odwiedź nas na Fb!' target='_blank'><AiFillFacebook className='sm:text-4xl text-3xl text-[#705555] hover:opacity-80 duration-200'/></a>
                    <a href="https://www.instagram.com/mauve.pl/" aria-label='Odwiedź nas na Ig!' target='_blank'><AiOutlineInstagram className='sm:text-4xl text-3xl text-[#705555] hover:opacity-80 duration-200'/></a>
                </span>
                <span className='absolute sm:left-10 left-5 top-6 flex justify-center items-center'>
                    <Link href='/regulamin' scroll={true} className='sm:text-lg text-sm font-klein font-medium hover:opacity-80 duration-200 uppercase text-[#705555]'>Regulaminy</Link>
                </span>
                <section className='w-full h-auto flex flex-col justify-center items-center md:gap-5 gap-4'>
                    {!isMobile ? <AnimatedText2 text={'Bądźmy w kontakcie!'} state={true} styling={'uppercase lg:text-2xl sm:text-xl text-lg font-theSeasons2 tracking-widest text-center font-bold'}/> : <h3 className='uppercase lg:text-2xl sm:text-xl text-lg font-theSeasons2 tracking-widest text-center font-bold'>Bądźmy w kontakcie!</h3> }
                    <span className='md:w-[150px] w-[100px] h-[1px] bg-[#000]'></span>
                    <p className='font-theSeasons font-light lg:text-base sm:text-sm text-sm text-center sm:flex hidden'>Zostaw swój adres email, a będę na bieżąco<br/>informować Cię o nowościach w ofercie i promocjach.</p>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center text-center md:gap-5 gap-4'>
                        <input type="email" name="email" id="email" placeholder='Podaj swój e-mail' value={email} onChange={(e) => setEmail(e.target.value)} className='bg-mainBackground text-[#000] placeholder:text-[#555] placeholder:uppercase bg-no-repeat bg-cover text-center sm:text-base text-xs border-2 border-[#cdbebf] outline-none focus:border-[#ab9c9d] duration-200 placeholder:tracking-[0.2em] tracking-widest px-4 py-2 lg:w-2/5 md:w-3/5 w-full font-klein'/>
                        <motion.button initial={buttonVariants.offscreen} whileInView={buttonVariants.onscreen} viewport={{ once: true, amount: 0.5 }} type="submit" className='sm:w-[134px] w-[112px] uppercase tracking-widest bg-[#cdbebf] text-[#fff] hover:scale-105 duration-200 sm:text-base text-xs py-2 font-medium cursor-pointer font-klein'>
                        {loading ? (
                            <div className='w-full flex justify-center items-center'>
                                <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        ) : (
                            <>Zapisz się</>
                        )}
                        </motion.button>
                    </form>
                </section>
                <section className='w-full flex justify-between items-center mt-10'>
                    <Link href='/' scroll={true}><Image src={MauveLogo} quality={100} alt='Mauve' className='sm:w-[120px] w-[90px]'/></Link>
                    <p className='font-klein sm:text-base text-xs text-[#705555] font-medium'>Copyright <Link href="/" scroll={true} className='hover:underline'>mauve.pl</Link></p>
                </section>
            </footer>
            <AnimatePresence>
                {modalState && (
                    <motion.div drag={true} dragConstraints={{top: 0, left: 0, bottom: 0, right: 0}} variants={container} initial='hidden' animate='visible' exit='exit' viewport={{ once: false, amount: 0.5 }} className='sm:min-w-[200px] min-w-[90%] h-auto px-5 py-3 fixed sm:gap-5 gap-2 top-4 sm:right-4 sm:left-auto right-auto left-1/2 sm:-translate-x-0 -translate-x-1/2 bg-[#705555] z-[1000] rounded-md flex justify-between items-center overflow-hidden'>
                        <p className='text-[#fff] sm:text-base text-sm font-klein tracking-wide font-extralight'>{message}</p>
                        <IoMdClose onClick={handleClick} className='text-xl text-[#fff] hover:scale-[1.15] cursor-pointer duration-200'/>
                        <div className={`w-[5px] h-full absolute left-0 ${failure ? 'bg-[#ed2939]' : 'bg-[#3cb043]'}`}></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}