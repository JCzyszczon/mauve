"use client";
import { useState, useEffect } from 'react';
import sharedImage from './sharedImage';
import Image from 'next/image';
import Logo from '../img/mauve_logo_transparent.png';
import { motion, AnimatePresence } from "framer-motion";
import {IoMdClose} from 'react-icons/io';
import supabase from '../config/supabaseClient';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


function LoginPanel() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalState, setModalState] = useState(false);
  const [failure, setFailure] = useState();
  const [messageTimer, setMessageTimer] = useState(null);
  const [message, setMessage] = useState('');
  const [translation, setTranslation] = useState('0%');

  const { data: session } = useSession();

  if (session) {
    redirect('/admin/dashboard');
  }

  const handleClick = () => {
    setModalState(false);
    setMessage(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if(!isValidEmail) {
      setMessage('Błąd logowania. Sprawdź dane.');
      setModalState(true);
      clearTimeout(messageTimer);
      setMessageTimer(setTimeout(() => setModalState(false), 3000));
      setFailure(true);
    } else {
      const { data, error } = await supabase
      .from('logowanie')
      .select()
      .eq('email', email)
      .eq('password', password)
      .single();

      if (error) {
        setMessage('Błąd logowania. Sprawdź dane.');
        setModalState(true);
        clearTimeout(messageTimer);
        setMessageTimer(setTimeout(() => setModalState(false), 3000));
        setFailure(true);
      } else {
        const result = await signIn('credentials', {
          username: email,
          password: password,
          redirect: true,
          callbackUrl: '/admin/dashboard',
        });
      }
    }
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
      <section className='md:w-[700px] w-[90%] h-auto flex flex-col gap-10 bg-[#eee] justify-center items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-20'>
        <Image src={sharedImage} alt='Background Image' fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
        <Image src={Logo} alt='Logo' className='md:w-[170px] w-[150px] h-auto'/>
        <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center items-center text-center gap-3'>
          <input type="email" name="email" id="email" placeholder='Email' value={email || ''} onChange={(e) => setEmail(e.target.value)} className='bg-mainBackground text-[#000] placeholder:text-[#555] bg-no-repeat bg-cover text-start sm:text-base text-sm border-2 border-[#cdbebf] outline-none focus:border-[#ab9c9d] duration-200 placeholder:tracking-[0.2em] tracking-widest px-4 py-2 lg:w-2/5 md:w-3/5 w-full font-klein'/>
          <input type="password" name="password" id="password" placeholder='Hasło' value={password || ''} onChange={(e) => setPassword(e.target.value)} className='bg-mainBackground text-[#000] placeholder:text-[#555] bg-no-repeat bg-cover text-start sm:text-base text-sm border-2 border-[#cdbebf] outline-none focus:border-[#ab9c9d] duration-200 placeholder:tracking-[0.2em] tracking-widest px-4 py-2 lg:w-2/5 md:w-3/5 w-full font-klein'/>
          <input type="submit" value="Zaloguj się" className='uppercase tracking-widest bg-[#cdbebf] text-[#fff] hover:scale-105 duration-200 sm:text-sm text-xs px-5 py-2 font-medium cursor-pointer font-klein mt-5'/>
        </form>
      </section>
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

export default LoginPanel;