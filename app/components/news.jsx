import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import dane from "../data.js";
import BasicPhoto from '../img/giorgio-trovato-gI9rvJK61L8-unsplash.jpg';

const dynamicImageImport = (imageName) => require(`../img/${imageName}`);

export default function News() {

    const replaceLinksInText = (text, linki) => {
        return text.split(/(\[[^\]]+])/).map((part, index) => {
          if (part.startsWith("[") && part.endsWith("]")) {
            const linkText = part.slice(1, -1);
            const linkHref = linki[linkText];
            if (linkHref) {
              return (
                <a key={index} href={linkHref} className="underline" target="_blank">
                  {linkText}
                </a>
              );
            } else {
              return part;
            }
          } else {
            return part;
          }
        });
    };

  return (
  <section className='w-full h-auto flex justify-center items-center bg-mainBackground bg-no-repeat bg-cover mb-16 drop-shadow-md md:pb-0 pb-2'>
    <Swiper spaceBetween={30} loop={true} pagination={{clickable: true,}} modules={[Autoplay,Pagination]} autoplay={{delay: 15000, disableOnInteraction: false,}} className="w-full h-full pb-10">
    {dane.map((item, index) => (
        <SwiperSlide>
            <article className='w-full min-h-[376px] flex md:flex-row flex-col justify-center items-stretch'>
                <section className='md:w-1/2 w-full min-h-full flex justify-center items-center'>
                    {item.zdjecie ? (
                      <Image src={dynamicImageImport(item.zdjecie).default} alt='Article Picture' className='w-auto h-full object-cover'/>
                    ) : (
                      <Image src={BasicPhoto} alt='Article Picture' className='w-auto h-full object-cover'/>
                    )}
                </section>
                <section className='md:w-1/2 w-full h-auto flex flex-col justify-center items-center pt-5 pb-10'>
                    <h2 className='lg:text-2xl xs:text-xl text-lg font-klein text-center xl:px-10 px-2'>{item.tytul}</h2>
                    {item.podtytul && <h3 className='text-center font-theSeasons lg:text-lg md:text-base text-sm mt-1'>{item.podtytul}</h3>}
                    <div className='flex flex-col justify-center items-center text-center lg:gap-3 md:gap-1 gap-2 font-theSeasons lg:text-base sm:text-sm text-xs lg:mt-8 mt-4 w-full md:px-6 px-2'>
                    {item.paragrafy.map((paragraf, i) => (
                        <p key={i}>{replaceLinksInText(paragraf.tekst, paragraf.linki)}</p>
                    ))}
                    </div>
                    {item.przycisk && <button className='bg-[#cdbebf] px-5 py-2 md:mt-10 mt-6 text-[#fff] font-klein lg:text-xl xs:text-lg text-base tracking-[0.2em] hover:scale-105 duration-200'><a href={item.linkPrzycisk} target='_blank'>{item.przycisk}</a></button>}
                </section>
            </article>
        </SwiperSlide>
    ))}
    </Swiper>
  </section>
)
}