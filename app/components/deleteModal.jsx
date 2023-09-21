"use client";
import React from 'react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import MauveLogo from '../img/mauve_logo_transparent.png';
import supabase from '../config/supabaseClient';
import {IoMdClose} from 'react-icons/io';

function DeleteModal({ closeModal, props, tableN }) {

  const modalRef = useRef(null);
  const [messageTimer, setMessageTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalState, setModalState] = useState(false);
  const [failure, setFailure] = useState();

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleClose = () => {
    closeModal();
  }

  const handleClick = () => {
    setModalState(false);
    setMessage(null);
  }

  const handleDelete = async () => {
    setLoading(true);
    const {data, error} = await supabase
    .from(tableN)
    .delete()
    .eq('id', props)
    .select()

    if(error) {
      setLoading(false);
      setMessage('Bład podczas usuwania');
      setModalState(true);
      clearTimeout(messageTimer);
      setMessageTimer(setTimeout(() => setModalState(false), 3000));
      setFailure(true);
    } else {
      if(tableN === 'oferta') {
        const folderName = data[0].id;
        const { data: imgData, error } = await supabase.storage
        .from(tableN)
        .list(folderName);

        if (error) {
          setLoading(false);
          setMessage('Bład podczas usuwania zdjęcia');
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(true);
        }

        for (const file of imgData) {
          const { error: deleteError } = await supabase.storage
            .from(tableN)
            .remove([`${folderName}/${file.name}`]);
    
          if (deleteError) {
            setLoading(false);
            setMessage('Bład podczas usuwania zdjęcia');
            setModalState(true);
            clearTimeout(messageTimer);
            setMessageTimer(setTimeout(() => setModalState(false), 3000));
            setFailure(true);
          }
        }
        const { error: deleteFolderError } = await supabase.storage
        .from(tableN)
        .remove([folderName]);

        if (deleteFolderError) {
          setLoading(false);
          setMessage('Bład podczas usuwania folderu');
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(true);
        } else {
          setMessage('Pomyślnie usunięto artykuł');
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(false);
        }
        setMessageTimer(setTimeout(() => window.location.reload(), 1500));
      } else {
        const { data: fileData, error: fileError } = await supabase.storage
        .from(tableN)
        .remove([data[0].zdjecie])
        if(fileError) {
          setLoading(false);
          setMessage('Bład podczas usuwania zdjęcia');
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(true);
        } else {
          setMessage('Pomyślnie usunięto artykuł');
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(false);
        }
        setMessageTimer(setTimeout(() => window.location.reload(), 1500));
      }
    }
  }

  return (
    <section onClick={handleOutsideClick} className={`w-[100vw] h-full bg-[#00000099] fixed left-0 top-0 z-[10000000] flex justify-center items-center lg:py-0 py-[3%] lg:px-[5%] px-[3%] drop-shadow-2xl overflow-y-scroll overflow-x-hidden`}>
        <section ref={modalRef} className='sm:w-auto w-[90%] h-auto bg-[#fff] sm:px-20 px-10 py-8 flex flex-col rounded-md justify-center items-center gap-5 absolute left-1/2 top-[5%] -translate-x-1/2 -translate-y-[5%]'>
            <Image src={MauveLogo} alt="Logo" className='w-[150px] h-auto'/>
            <p className='font-klein'>Czy napewno chcesz usunąć ten artykuł?</p>
            <div className='w-full flex justify-center items-center gap-2 mt-2'>
                <button onClick={handleClose} className='w-full bg-[#cdbebf] text-[#fff] hover:scale-105 duration-200 px-5 py-2 font-klein font-light tracking-widest'>Anuluj</button>
                <button onClick={handleDelete} disabled={loading} className='w-full bg-[#705555] text-[#fff] hover:scale-105 duration-200 px-5 py-2 font-klein font-light tracking-widest'>
                {loading ? (
                  <div className='w-full flex justify-center items-center'>
                    <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                ) : (
                  <>Potwierdź</>
                )}
                </button>
            </div>
        </section>
        {modalState && (
            <div className='sm:min-w-[200px] min-w-[90%] h-auto px-5 py-3 fixed sm:gap-5 gap-2 top-4 sm:right-4 sm:left-auto right-auto left-1/2 sm:-translate-x-0 -translate-x-1/2 bg-[#705555] z-[1000] rounded-md flex justify-between items-center overflow-hidden'>
                <p className='text-[#fff] sm:text-base text-sm font-klein tracking-wide font-extralight'>{message}</p>
                <IoMdClose onClick={handleClick} className='text-xl text-[#fff] hover:scale-[1.15] cursor-pointer duration-200'/>
                <div className={`w-[5px] h-full absolute left-0 ${failure ? 'bg-[#ed2939]' : 'bg-[#3cb043]'}`}></div>
            </div>
        )}
    </section>
  )
}

export default DeleteModal;