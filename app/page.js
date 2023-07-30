"use client";

import Image from 'next/image';
import MauveLogo from './img/mauve-logo.png';
import Title from './components/title';
import About from './components/about';
import useReadingProgress from './components/useReadingProgress';
import News from './components/news';

export default function Home() {

  const completion = useReadingProgress();

  return (
    <main className='w-full h-auto'>
      <span style={{transform: `translateX(${completion-100}%)`}} className='w-full h-1 left-0 top-0 bg-[#705555] fixed duration-1000 z-[1000]'></span>
      <Title/>
      <News/>
      <About/>
    </main>
  )
}
