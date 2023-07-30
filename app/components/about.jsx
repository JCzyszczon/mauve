"use client";

import Image from 'next/image';
import MauveLogo from '../img/mauve-logo-removebg-preview.png';
import ProfilePic from '../img/michael-dam-mEZ3PoFGs_k-unsplash.jpg';
import MobilePic from '../img/christopher-campbell-rDEOVtE7vOs-unsplash.jpg';
import React, { useState, useEffect } from "react";

export default function About() {

  const [profilePic, setProfilePic] = useState(ProfilePic);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setProfilePic(MobilePic);
      } else {
        setProfilePic(ProfilePic);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    /*<section className='w-full h-auto flex justify-center items-center gap-5 bg-mainBackground bg-no-repeat bg-cover mb-16 md:px-0 px-2 md:py-0 md:pb-0 md:pt-0 pb-2 pt-10 drop-shadow-md'>
        <div className='lg:w-[75%] w-[100%] h-auto flex md:flex-row flex-col justify-center items-center md:gap-0 gap-6'>
            <section className='w-full h-full flex flex-col justify-center items-center gap-6 lg:px-0 px-4'>
                <Image src={MauveLogo} alt='Logo' className='w-[180px] h-auto'/>
                <div className='w-full h-auto flex flex-col justify-center items-center gap-4 md:text-base text-[13px] text-start font-theSeasons'>
                    <div>
                        <p>Nazywam się Dagmara  Misiewicz.</p>
                        <p>Jestem wizażystką wykonującą makijaże na szczególne okazje, czym pasjonuję się od 2016 r.</p>
                    </div>
                    <p>Inspirując się makijażami z wybiegów oraz śledząc aktualne trendy, kształtuję swój własny styl. Przemycam go pracując przy sesjach zdjęciowych oraz z klientami indywidualnymi.</p>
                    <p>Szczególną uwagę przykładam do tego, aby moje prace były estetyczne, trwałe, a przede wszystkim podkreślały naturalne piękno.</p>
                    <p>Zauważając kompleks brwi odwiedzających mnie kobiet, zdecydowałam się wykonywać także makijaż permanentny metodą włoskową, która do złudzenia imituje naturalne brwi bez przerysowanego efektu.</p>
                </div>
            </section>
            <section className='w-full h-full flex justify-center items-center'>
                <Image src={profilePic} alt='Profile Picture' className='lg:w-[320px] w-auto h-auto'/>
            </section>
        </div>
    </section>*/
    <section className='w-full h-auto flex md:flex-row flex-col justify-center items-center bg-mainBackground bg-no-repeat bg-cover mb-16 drop-shadow-md xl:px-[10%] px-0'>
      <section className='md:w-1/2 w-full min-h-full flex flex-col justify-center items-center gap-5 md:py-0 py-5'>
        <Image src={MauveLogo} alt='Mauve Logo' className='w-[180px] h-auto'/>
        <div className='w-full h-auto flex flex-col justify-center items-center md:gap-4 gap-3 xl:text-base sm:text-sm text-xs text-start font-theSeasons md:px-10 px-3'>
          <div className='w-full'>
            <p>Nazywam się Dagmara  Misiewicz.</p>
            <p>Jestem wizażystką wykonującą makijaże na szczególne okazje, czym pasjonuję się od 2016 r.</p>
          </div>
          <p>Inspirując się makijażami z wybiegów oraz śledząc aktualne trendy, kształtuję swój własny styl. Przemycam go pracując przy sesjach zdjęciowych oraz z klientami indywidualnymi.</p>
          <p>Szczególną uwagę przykładam do tego, aby moje prace były estetyczne, trwałe, a przede wszystkim podkreślały naturalne piękno.</p>
          <p>Zauważając kompleks brwi odwiedzających mnie kobiet, zdecydowałam się wykonywać także makijaż permanentny metodą włoskową, która do złudzenia imituje naturalne brwi bez przerysowanego efektu.</p>
        </div>
      </section>
      <section className='md:w-1/2 w-full min-h-full flex justify-center items-center'>
        <Image src={profilePic} alt='Profile Picture' className='md:w-auto w-full lg:max-h-[500px] lg:min-h-0 md:max-h-0 md:min-h-[700px] h-auto object-cover'/>
      </section>
    </section>
  )
}