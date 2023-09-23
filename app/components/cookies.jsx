"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import sharedImage from './sharedImage';
import Image from 'next/image';
import { motion } from 'framer-motion';

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accept = localStorage.getItem('CookiesConstent');
    if(accept) {
        setShowBanner(false);
    } else {
        setShowBanner(true);
    }
  }, [])

  const handleAccept = () => {
    setShowBanner(false);
    localStorage.setItem('CookiesConstent', true);
  };

  if (!showBanner) {
    return null;
  }

  const cardVariants = {
    offscreen: {
      y: '100vh',
    },
    onscreen: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0,
        duration: 1,
      },
    },
    exit: {
      y: '100vh',
    }
  };

  return (
    <motion.div variants={cardVariants} initial='offscreen' animate='onscreen' exit='exit' viewport={{ once: false, amount: 0.5 }} className="w-full h-auto flex flex-col justify-center items-center fixed bottom-0 left-0 py-7 gap-4 z-[10000]">
      <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
      <div className='w-full flex flex-col justify-center items-center text-center font-theSeasons sm:text-base text-sm md:px-0 px-2'>
          <p>Ta strona korzysta z ciasteczek aby świadczyć usługi na najwyższym poziomie.</p>
          <p>Dalsze korzystanie ze strony oznacza, że akceptujesz <Link href={'/regulamin'} className='underline'>politykę prywatności</Link> i zgadzasz się na ich używanie.</p>
      </div>
      <button onClick={handleAccept} className='uppercase tracking-widest bg-[#cdbebf] text-[#fff] hover:scale-105 duration-200 sm:text-base text-xs px-5 py-2 font-medium cursor-pointer font-klein'>Rozumiem</button>
    </motion.div>
  );
}

export default CookieConsent;