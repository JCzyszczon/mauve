"use client";
import {BsFiletypePdf} from 'react-icons/bs'
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    window.scrollTo(0,0)
  }, []);

  return (
    <section className="w-full sm:py-24 py-10 flex sm:flex-row flex-col gap-5 box-border text-center">
      <a href='/makijaz-permanentny-regulamin.pdf' className='w-full flex flex-col justify-center items-center gap-5 py-10 rounded-md hover:outline outline-1 outline-[#aaa] duration-200'>
        <BsFiletypePdf className='lg:text-8xl text-7xl text-[#cdbebf]'/>
        <h2 className='text-sm font-klein tracking-[0.2em] uppercase font-bold'>Brwi permanentne</h2>
      </a>
      <a href='/makijaz-okazjonalny-regulamin.pdf' className='w-full flex flex-col justify-center items-center gap-5 py-10 rounded-md hover:outline outline-1 outline-[#aaa] duration-200'>
        <BsFiletypePdf className='lg:text-8xl text-7xl text-[#cdbebf]'/>
        <h2 className='text-sm font-klein tracking-[0.2em] uppercase font-bold'>Makijaż</h2>
      </a>
      <a href='/polityka-cookies.pdf' className='w-full flex flex-col justify-center items-center gap-5 py-10 rounded-md hover:outline outline-1 outline-[#aaa] duration-200'>
        <BsFiletypePdf className='lg:text-8xl text-7xl text-[#cdbebf]'/>
        <h2 className='text-sm font-klein tracking-[0.2em] uppercase font-bold'>Polityka prywatności</h2>
      </a>
    </section>
  )
}
