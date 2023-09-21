import {BsArrowLeftShort} from 'react-icons/bs';
import Link from 'next/link';
import LoginPanel from '../components/login';

export default function Home() {
  return (
    <section className="w-full h-screen flex justify-center items-center relative">
        <Link href={'/'} className="fixed left-5 top-5 z-[200]"><BsArrowLeftShort className='text-5xl text-[#705555] hover:opacity-80 duration-200'/></Link>
        <LoginPanel/>
    </section>
  )
}
