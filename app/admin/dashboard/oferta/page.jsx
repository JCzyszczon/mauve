"use client";
import Image from "next/image";
import sharedImage from '../../../components/sharedImage';
import { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import { AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import DeleteModal from '../../../components/deleteModal';
import AddOfferModal from '../../../components/addOfferModal';
import EditOfferModal from '../../../components/editOfferModal';
import Logo from '../../../img/mauve_logo_transparent.png';
import ChangePriorityOfferModal from '../../../components/changePriorityOfferModal';
import {IoSwapVertical} from 'react-icons/io5'

export default function Home() {

  const [offerData, setOfferData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedSlide, setClickedSlide] = useState();
  const [tableName, setTableName] = useState();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isChangePriorityModalOpen, setIsChangePriorityModalOpen] = useState(false);

  const DeleteSlide = (item) => {
    setClickedSlide(item);
    setIsModalOpen(true);
    setTableName('oferta');
  }

  const AddOffer = () => {
    setIsAddModalOpen(true);
  }

  const EditOffer = (data) => {
    setIsEditModalOpen(true);
    setClickedSlide(data);
  }

  const ChangePriority = (data) => {
    setIsChangePriorityModalOpen(true);
    setClickedSlide(data);
  }

  useEffect(() => {
    async function fetchDataOffer() {
      const { data, error } = await supabase
      .from('oferta')
      .select()
      .order('priorytet');

      if(error) {
        console.log(error);
      } else {
        setOfferData(data);
      }
    }

    fetchDataOffer();
  }, [])

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
    <section className='w-full min-h-[500px] sm:px-10 px-5 pt-16 sm:pb-10 pb-5 relative drop-shadow-md bg-[#eee] flex justify-start items-center flex-col sm:gap-10 gap-8'>
      <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
      <div className="w-full h-auto flex justify-center items-center">
        <Image src={Logo} alt="Logo" className="sm:w-[170px] w-[150px] h-auto"/>
      </div>
      <div className="sm:w-[80%] w-full h-auto flex sm:flex-row flex-col sm:justify-between justify-center items-center gap-2">
        <button onClick={() => AddOffer()} className="bg-[#705555] hover:scale-105 duration-200 text-[#fff] px-4 py-2 font-klein tracking-[0.2em] uppercase sm:text-base text-sm flex justify-center items-center gap-1"><AiOutlinePlus/>nowy</button>
        <button onClick={() => ChangePriority(offerData)} className="bg-[#705555] hover:scale-105 duration-200 text-[#fff] px-4 py-2 font-klein tracking-[0.2em] uppercase sm:text-base text-sm flex justify-center items-center gap-1"><IoSwapVertical/>kolejność</button>
      </div>
      {offerData ? (
        <section className="sm:w-auto w-full flex flex-col justify-start items-center">
          <div className="w-full flex justify-between items-center gap-5 font-klein text-[#705555] sm:text-sm text-xs">
            <div className="w-full overflow-hidden flex px-5 justify-start items-center gap-5">
              <p className="2xl:min-w-[300px] min-w-[200px] 2xl:max-w-[300px] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis px-2">Tytuł oferty:</p>
              <p className="min-w-[200px] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis sm:flex hidden px-2">Cena:</p>
              <p className="min-w-[200px] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis 2xl:flex hidden px-2">Czas:</p>
            </div>
            <button><AiFillDelete className="bg-[#705555] hover:bg-[#816666] opacity-0 duration-200 text-[#fff] p-2 text-4xl rounded-md"/></button>
            <button><AiFillEdit className="bg-[#705555] hover:bg-[#816666] opacity-0 duration-200 text-[#fff] p-2 text-4xl rounded-md"/></button>
          </div>
          {offerData.map((data, index) => (
            <div key={index} className="w-full flex justify-between items-center gap-2 mb-4">
              <div className="w-full overflow-hidden flex justify-start items-center py-1 sm:px-5 px-2 bg-[#fff] rounded-md gap-5 font-klein sm:text-base text-sm">
                <p className="2xl:min-w-[300px] sm:min-w-[200px] min-w-[10%] 2xl:max-w-[300px] sm:max-w-[200px] max-w-fit overflow-hidden whitespace-nowrap text-ellipsis bg-[#eee] px-2 py-1 rounded-lg">{data.tytul ? data.tytul : "-"}</p>
                <p className="min-w-[200px] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis sm:flex hidden bg-[#eee] px-2 py-1 rounded-lg">{data.cena ? data.cena : "-"}</p>
                <p className="min-w-[200px] max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis 2xl:flex hidden bg-[#eee] px-2 py-1 rounded-lg">{data.czas ? data.czas : "-"}</p>
              </div>
              <button><AiFillEdit onClick={() => EditOffer(data)} className="bg-[#705555] hover:bg-[#816666] duration-200 text-[#fff] p-2 text-4xl rounded-md"/></button>
              <button><AiFillDelete onClick={() => DeleteSlide(data.id)} className="bg-[#705555] hover:bg-[#816666] duration-200 text-[#fff] p-2 text-4xl rounded-md"/></button>
            </div>
          ))} 
        </section>
      ) : (
        <div className='w-full min-h-[300px] flex justify-center items-center'>
          <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
    </section>
    {isModalOpen &&
      <DeleteModal closeModal={() => setIsModalOpen(false)} props={clickedSlide} tableN={tableName}/>
    }
    {isAddModalOpen &&
      <AddOfferModal closeModal={() => setIsAddModalOpen(false)}/>
    }
    {isEditModalOpen &&
      <EditOfferModal closeModal={() => setIsEditModalOpen(false)} props={clickedSlide}/>
    }
    {isChangePriorityModalOpen &&
      <ChangePriorityOfferModal closeModal={() => setIsChangePriorityModalOpen(false)} props={clickedSlide}/>
    }
    </>
  );
}