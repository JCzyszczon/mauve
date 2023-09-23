"use client";
import Image from "next/image";
import sharedImage from '../../../components/sharedImage';
import { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import Logo from '../../../img/mauve_logo_transparent.png';
import {IoMdClose} from 'react-icons/io';
import { format } from 'date-fns';
import { AiFillDelete } from "react-icons/ai";
import DeleteModal from "../../../components/deleteModal";

export default function Home() {

  const [newsletterData, setNewsletterData] = useState();
  const [messageTimer, setMessageTimer] = useState(null);
  const [message, setMessage] = useState('');
  const [modalState, setModalState] = useState(false);
  const [failure, setFailure] = useState();
  const [dataL, setDataL] = useState();
  const [clickedSlide, setClickedSlide] = useState();
  const [tableName, setTableName] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const DeleteSlide = (item) => {
    setClickedSlide(item);
    setIsModalOpen(true);
    setTableName('newsletter');
  }


  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
      .from('newsletter')
      .select()

      if (error) {
        console.log(error);
      } else {
        setNewsletterData(data);
        setDataL(data.length);
      }
    }

    fetchData();
  }, []);

  const handleClick = () => {
    setModalState(false);
    setMessage(null);
  };

  const handleCopyToClipboard = () => {
    if (newsletterData) {
      const emailList = newsletterData.map(data => data.email).join(", ");
      
      const textarea = document.createElement("textarea");
      textarea.value = emailList;
      document.body.appendChild(textarea);
      
      textarea.select();
      document.execCommand("copy");
      
      document.body.removeChild(textarea);
      
      setMessage("Adresy email zostały skopiowane do schowka");
      setModalState(true);
      setFailure(false);
      clearTimeout(messageTimer);
      setMessageTimer(setTimeout(() => setModalState(false), 3000));
    }
  };

  return (
    <>
    <section className='w-full min-h-[500px] sm:px-10 px-5 pt-16 sm:pb-10 pb-5 relative drop-shadow-md bg-[#eee] flex justify-start items-start flex-col sm:gap-10 gap-8'>
      <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
      <div className="w-full h-auto flex justify-center items-center">
        <Image src={Logo} alt="Logo" className="sm:w-[170px] w-[150px] h-auto"/>
      </div>
      <section className="w-full flex flex-col justify-start items-center sm:gap-8 gap-4">
        <div className="w-[60%] flex sm:flex-row flex-col-reverse sm:justify-between justify-center items-center sm:gap-1 gap-4 text-center sm:text-base text-sm">
          <button onClick={handleCopyToClipboard} className="bg-[#705555] uppercase hover:scale-105 duration-200 text-[#fff] px-4 py-2 font-klein tracking-[0.2em]">Skopiuj</button>
          {newsletterData ? (
            <p>Liczba użytkowników: {dataL}</p>
          ) : (
            <p className="w-[200px] h-[20px] bg-gray-100 animate-pulse"></p>
          )}
        </div>
        <div className="lg:w-[60%] w-auto flex flex-col gap-0">
          <div className="w-full flex justify-between items-center gap-5 font-klein text-[#705555] sm:text-sm text-xs">
            <div className="w-full flex px-5 justify-between items-center gap-5">
              <p className="max-w-[300px] overflow-hidden whitespace-nowrap text-ellipsis">Adres e-mail:</p>
              <p className="sm:flex hidden">Data dodania:</p>
            </div>
            <button><AiFillDelete className="bg-[#705555] hover:bg-[#816666] opacity-0 duration-200 text-[#fff] p-2 text-4xl rounded-md"/></button>
          </div>
        {newsletterData ? (
          <>
          {newsletterData && newsletterData.map((data, index) => (
            <div key={index} className="w-full flex justify-between items-center gap-2 mb-4">
              <div className="w-full flex justify-between items-center py-1 px-5 bg-[#fff] rounded-md gap-5 font-klein sm:text-base text-sm">
                <p className="max-w-[300px] overflow-hidden bg-[#eee] whitespace-nowrap text-ellipsis px-2 py-1 rounded-lg">{data.email}</p>
                <p className="sm:flex bg-[#eee] hidden px-2 py-1 rounded-lg">{format(new Date(data.created_at), 'dd-MM-yyyy')}</p>
              </div>
              <button onClick={() => DeleteSlide(data.id)}><AiFillDelete className="bg-[#705555] hover:bg-[#816666] duration-200 text-[#fff] p-2 text-4xl rounded-md"/></button>
            </div>
          ))}
          </>
        ) : (
          <>
          {[...Array(4).keys()].map((i) => (
            <div key={i} className="w-full bg-gray-100 animate-pulse h-[40px] mb-4 py-2 rounded-md"></div>
          ))}
          </>
        )}
        </div>
      </section>
    </section>
    {isModalOpen &&
      <DeleteModal closeModal={() => setIsModalOpen(false)} props={clickedSlide} tableN={tableName}/>
    }
    {modalState && (
      <div className='sm:min-w-[200px] min-w-[90%] h-auto px-5 py-3 fixed sm:gap-5 gap-2 sm:top-4 sm:bottom-auto bottom-4 top-auto sm:left-4 sm:right-auto right-auto left-1/2 sm:-translate-x-0 -translate-x-1/2 bg-[#705555] z-[1000] rounded-md flex justify-between items-center overflow-hidden'>
          <p className='text-[#fff] sm:text-base text-sm font-klein tracking-wide font-extralight'>{message}</p>
          <IoMdClose onClick={handleClick} className='text-xl text-[#fff] hover:scale-[1.15] cursor-pointer duration-200'/>
          <div className={`w-[5px] h-full absolute left-0 ${failure ? 'bg-[#ed2939]' : 'bg-[#3cb043]'}`}></div>
      </div>
    )}
    </>
  );
}