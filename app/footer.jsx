import Image from 'next/image';
import {AiFillFacebook, AiOutlineInstagram} from 'react-icons/ai';


export default function Footer() {
  return (
    <footer className='w-full h-auto bg-mainBackground bg-no-repeat bg-cover sm:px-20 px-5 pt-20 sm:pb-10 pb-5 relative drop-shadow-md'>
        <span className='absolute right-5 top-5 flex justify-center items-center gap-1'>
            <a href="https://www.facebook.com/mauvebeautypl/?locale=pl_PL" target='_blank'><AiFillFacebook className='sm:text-4xl text-3xl text-[#705555] hover:text-[#604444] duration-200'/></a>
            <a href="https://www.instagram.com/mauve.pl/" target='_blank'><AiOutlineInstagram className='sm:text-4xl text-3xl text-[#705555] hover:text-[#604444] duration-200'/></a>
        </span>
        <section className='w-full h-auto flex flex-col justify-center items-center md:gap-5 gap-4'>
            <h2 className='uppercase lg:text-2xl xs:text-xl text-lg font-theSeasons text-center font-[500]'>Bądźmy w kontakcie!</h2>
            <span className='md:w-[150px] w-[100px] h-[1px] bg-[#000]'></span>
            <p className='font-theSeasons lg:text-base sm:text-sm text-sm text-center'>Zostaw swój adres email, a będę na bieżąco<br/>informować Cię o nowościach w ofercie i promocjach.</p>
            <form action="" className='w-full flex flex-col justify-center items-center text-center md:gap-5 gap-4'>
                <input type="email" name="email" id="email" placeholder='Podaj swój e-mail' className='bg-mainBackground text-[#000] placeholder:text-[#555] placeholder:uppercase bg-no-repeat bg-cover text-center sm:text-base text-xs border-2 border-[#cdbebf] outline-none focus:border-[#ab9c9d] duration-200 placeholder:tracking-[0.2em] tracking-widest px-4 py-2 lg:w-2/5 md:w-3/5 w-full font-klein'/>
                <input type="submit" value="zapisz się" className='uppercase tracking-widest bg-[#cdbebf] text-[#fff] hover:scale-105 duration-200 sm:text-base text-xs px-5 py-2 font-medium cursor-pointer font-klein'/>
            </form>
        </section>
        <section className='w-full flex justify-between items-center mt-10'>
            <a href='/' className='uppercase font-maghony sm:text-2xl text-lg'>mauve</a>
            <p className='font-klein sm:text-base text-sm text-[#705555] font-medium'>Copyright <a href="/" className='hover:underline'>mauve.pl</a></p>
        </section>
    </footer>
  )
}