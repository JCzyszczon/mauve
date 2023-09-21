"use client";
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { MdDashboard, MdHome } from 'react-icons/md';

function LogOutButton() {
  const { data: session } = useSession();

  if(session) {
    return(
        <section className='sm:w-auto w-full h-auto absolute lg:right-4 sm:right-2 right-0 lg:top-4 top-1 flex sm:justify-between justify-center items-center z-[10000] gap-5'>
          <Link href={'/'}><MdHome className='bg-[#705555] duration-200 hover:bg-[#816666] rounded-md text-[#fff] text-base w-[50px] h-[30px] py-1'/></Link>
          <Link href={'/admin/dashboard'}><MdDashboard className='bg-[#705555] duration-200 hover:bg-[#816666] rounded-md text-[#fff] text-base w-[50px] h-[30px] py-1'/></Link>
          <button onClick={() => signOut()} className='bg-[#705555] duration-200 hover:bg-[#816666] lg:text-base text-sm rounded-md md:px-4 px-3 py-1 text-[#fff] font-light font-klein'>Wyloguj się</button>
        </section>
    )
  }
}

export default LogOutButton;