"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import sharedImage from './sharedImage';
import Image from 'next/image';
import { BsNewspaper, BsFillPersonFill } from 'react-icons/bs';
import { IoMdPricetag, IoMdMail } from 'react-icons/io';
import Logo from '../img/mauve_logo_transparent.png';
import supabase from '../config/supabaseClient';

function MainPanel() {

  const [articleCount, setArticleCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    async function fetchDataArt() {
      const { count, error } = await supabase.from('aktualnosci').select('id', { count: 'exact' });
      if (!error) {
        setArticleCount(count);
      }
    }
    async function fetchDataOff() {
      const { count, error } = await supabase.from('oferta').select('id', { count: 'exact' });
      if (!error) {
        setOfferCount(count);
      }
    }
    async function fetchDataUsr() {
      const { count, error } = await supabase.from('newsletter').select('id', { count: 'exact' });
      if (!error) {
        setUserCount(count);
      }
    }
  
    fetchDataArt();
    fetchDataOff();
    fetchDataUsr();
  }, [])

  return (
    <section className='w-full min-h-full sm:px-10 px-5 pt-20 sm:pb-10 pb-5 relative drop-shadow-md bg-[#eee] flex justify-start items-start flex-col sm:gap-10 gap-8'>
      <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
      <div className='w-full flex justify-center items-center'>
        <Image src={Logo} alt='Logo' className='sm:w-[170px] w-[150px] h-auto'/>
      </div>
      <section className='w-full min-h-full lg:px-20 px-[3%] py-5 grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-5 gap-3'>
        <Link href={'/admin/dashboard/aktualnosci'}><article className='w-auto sm:min-h-[200px] min-h-[140px] group flex flex-col justify-between items-center bg-[#fff] p-5 rounded-md drop-shadow-xl hover:scale-[1.02] duration-200'>
          <div className='w-full h-auto flex justify-between items-center'>
            <h3 className='sm:text-2xl text-xl tracking-tight font-bold font-theSeasons2'>Aktualności</h3>
            <BsNewspaper className='sm:text-6xl text-5xl text-[#705555]'/>
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
            <h4 className='text-xs font-klein tracking-[0.2em] text-[#705555]'>Zawartość</h4>
            {articleCount ? (
              <p className='text-sm'>{articleCount} artykuły</p>
            ) : (
              <p className='w-[100px] h-[14px] bg-gray-200 animate-pulse'></p>
            )}
          </div>
        </article></Link>
        <Link href={'/admin/dashboard/oferta'}><article className='w-auto sm:min-h-[200px] min-h-[140px] group flex flex-col justify-between items-center bg-[#fff] p-5 rounded-md drop-shadow-xl hover:scale-[1.02] duration-200'>
          <div className='w-full h-auto flex justify-between items-center'>
            <h3 className='sm:text-2xl text-xl tracking-tight font-bold font-theSeasons2'>Oferta</h3>
            <IoMdPricetag className='sm:text-6xl text-5xl text-[#705555]'/>
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
            <h4 className='text-xs font-klein tracking-[0.2em] text-[#705555]'>Zawartość</h4>
            {offerCount ? (
              <p className='text-sm'>{offerCount} ofert</p>
            ) : (
              <p className='w-[100px] h-[14px] bg-gray-200 animate-pulse'></p>
            )}
          </div>
        </article></Link>
        <Link href={'/admin/dashboard/o-mnie'}><article className='w-auto sm:min-h-[200px] min-h-[140px] group flex flex-col justify-between items-center bg-[#fff] p-5 rounded-md drop-shadow-xl hover:scale-[1.02] duration-200'>
          <div className='w-full h-auto flex justify-between items-center'>
            <h3 className='sm:text-2xl text-xl tracking-tight font-bold font-theSeasons2'>O mnie</h3>
            <BsFillPersonFill className='sm:text-6xl text-5xl text-[#705555]'/>
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
            <h4 className='text-xs font-klein tracking-[0.2em] text-[#705555]'>Zawartość</h4>
            {articleCount ? (
              <p className='text-sm'>Tekst</p>
            ) : (
              <p className='w-[100px] h-[14px] bg-gray-200 animate-pulse'></p>
            )}
          </div>
        </article></Link>
        <Link href={'/admin/dashboard/uzytkownicy'}><article className='w-auto sm:min-h-[200px] min-h-[140px] group flex flex-col justify-between items-center bg-[#fff] p-5 rounded-md drop-shadow-xl hover:scale-[1.02] duration-200'>
          <div className='w-full h-auto flex justify-between items-center'>
            <h3 className='sm:text-2xl text-xl tracking-tight font-bold font-theSeasons2'>Użytkownicy</h3>
            <IoMdMail className='sm:text-6xl text-5xl text-[#705555]'/>
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start gap-2'>
            <h4 className='text-xs font-klein tracking-[0.2em] text-[#705555]'>Zawartość</h4>
            {userCount ? (
              <p className='text-sm'>{userCount} osób</p>
            ) : (
              <p className='w-[100px] h-[14px] bg-gray-200 animate-pulse'></p>
            )}
          </div>
        </article></Link>
      </section>
    </section>
  );
}

export default MainPanel;