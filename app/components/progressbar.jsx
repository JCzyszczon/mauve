"use client";
import React from 'react'
import useReadingProgress from './useReadingProgress';

function ProgressBar() {
  
  const completion = useReadingProgress();

  return (
    <span style={{transform: `translateX(${completion-100}%)`}} className='w-full h-1 left-0 top-0 bg-[#705555] fixed duration-1000 z-[1000]'></span>
  )
}

export default ProgressBar