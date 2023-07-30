import Image from 'next/image';
import MauveLogo from '../img/mauve-logo-removebg-preview.png';

export default function Title() {
  return (
    <section className='w-full h-auto flex flex-col justify-center items-center text-center gap-5 py-16'>
        <Image src={MauveLogo} alt='Logo' className='w-[180px] h-auto'/>
        <h1 className='md:text-2xl sm:text-xl text-lg font-theSeasons font-light'>Profesjonalny makijaż na wyjątkowe okazje<br/>Perfekcyjne brwi na codzień</h1>
        <span className='px-5'>
          <p className='md:text-base sm:text-sm text-[14px] font-theSeasons'>Zadbaj o oprawę swoich oczu i czuj się piękniejsza na codzień bez tracenia czasu na malowanie brwi!</p>
          <p className='md:text-base sm:text-sm text-[14px] font-theSeasons'>Skorzystaj z najbardziej naturalnie wyglądającego makijażu permanentnego brwi metodą włoskową.</p>
        </span>
        <p className='md:text-base sm:text-sm text-[14px] font-theSeasons px-5'>Poczuj się wyjątkowo w makijażu okazjonalnym idealnie dopasowanym do Twojej naturalnej urody.</p>
    </section>
  )
}