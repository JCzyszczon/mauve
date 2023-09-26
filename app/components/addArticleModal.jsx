"use client";
import React from 'react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import MauveLogo from '../img/mauve_logo_transparent.png';
import supabase from '../config/supabaseClient';
import {IoMdClose} from 'react-icons/io';

function AddArticleModal({ closeModal, props, tableN }) {

  const modalRef = useRef(null);
  const [messageTimer, setMessageTimer] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [picture, setPicture] = useState('');
  const [modalState, setModalState] = useState(false);
  const [failure, setFailure] = useState();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const paragraphsArray = inputText.split('\n\n').map((paragraph) => {
      const links = {};
      let currentIndex = 0;
      let newText = paragraph;
  
      while (true) {
        const startIndex = newText.indexOf('[', currentIndex);
        if (startIndex === -1) break;
  
        const endIndex = newText.indexOf(']', startIndex);
        if (endIndex === -1) break;
  
        const linkText = newText.substring(startIndex + 1, endIndex);
        const linkStartIndex = newText.indexOf('(', endIndex);
        if (linkStartIndex === -1) break;
  
        const linkEndIndex = newText.indexOf(')', linkStartIndex);
        if (linkEndIndex === -1) break;
  
        const linkURL = newText.substring(linkStartIndex + 1, linkEndIndex);
        links[linkText] = linkURL;
  
        newText =
          newText.substring(0, startIndex) +
          `[${linkText}]` +
          newText.substring(linkEndIndex + 1);
  
        currentIndex = startIndex + 1;
      }
  
      return {
        tekst: newText.trim(),
        linki: links,
      };
    });

    const fullPath = picture;
    const fileName = fullPath.split('\\').pop() || fullPath.split('/').pop();
    const newFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');

    const fileInput = document.querySelector('#fileInput');
    const file = fileInput.files[0];

    setLoading(true);

    if (file) {
      const { data: fileData, error: fileError } = await supabase.storage
        .from('aktualnosci')
        .upload(`${newFileName}`, file);
  
      if (fileError) {
        setLoading(false);
        setMessage('Bład podczas dodawania zdjęcia');
        setModalState(true);
        clearTimeout(messageTimer);
        setMessageTimer(setTimeout(() => setModalState(false), 3000));
        setFailure(true);
      } else {
        const { data, error } = await supabase
        .from('aktualnosci')
        .insert({tytul: title, podtytul: subtitle, zdjecie: newFileName, paragrafy: paragraphsArray, przycisk: buttonText, linkPrzycisk: buttonLink})
        .select()

        if(error) {
          setLoading(false);
          setMessage('Bład podczas dodawania');
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(true);
        } else {
          setMessage('Pomyślnie dodano nowy artykuł');
          setModalState(true);
          setFailure(false);
          setMessageTimer(setTimeout(() => window.location.reload(), 500));
        }
      }
    }
  };

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleClick = () => {
    setModalState(false);
    setMessage(null);
  }

  const handleClose = () => {
    closeModal();
  }

  return (
    <section onClick={handleOutsideClick} className={`w-[100vw] h-full bg-[#00000099] fixed left-0 top-0 z-[10000000] flex justify-center items-start lg:py-[3%] py-[3%] lg:px-[5%] px-[3%] drop-shadow-2xl overflow-y-scroll overflow-x-hidden`}>
        <section ref={modalRef} className='lg:w-[70%] md:w-[90%] w-[99%] h-auto bg-[#fff] sm:px-20 px-6 py-8 flex flex-col rounded-md justify-center items-center gap-10'>
            <Image src={MauveLogo} alt="Logo" className='sm:w-[170px] w-[150px] h-auto mt-10'/>
            <form onSubmit={handleFormSubmit} className='w-full h-auto md:flex block flex-col justify-center items-center gap-5 font-klein'>
                <div className="relative md:mt-0 mt-5">
                    <input id="title" name="title" type="text" value={title || ""} onChange={(e) => setTitle(e.target.value)} required className="peer h-10 md:w-[600px] pl-1 w-full border-b-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]" placeholder="Tytuł Artykułu" />
                    <label htmlFor="title" className="absolute left-0 -top-3.5 text-gray-600 text-sm pl-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Tytuł Artykułu</label>
                </div>
                <div className="relative md:mt-0 mt-5">
                    <input id="subtitle" name="subtitle" type="text" value={subtitle || ""} onChange={(e) => setSubtitle(e.target.value)} className="peer h-10 pl-1 md:w-[600px] w-full border-b-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]" placeholder="Podtytuł (opcjonalny)" />
                    <label htmlFor="subtitle" className="absolute left-0 -top-3.5 text-gray-600 text-sm pl-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Podtytuł (opcjonalny)</label>
                </div>
                <textarea
                    rows="10"
                    cols="50"
                    className='md:w-[600px] w-full border-2 p-1 border-gray-300 text-gray-900 sm:text-base text-sm focus:outline-none focus:border-[#705555] md:mt-4 mt-5'
                    placeholder="Wprowadź tekst..."
                    required
                    value={inputText}
                    onChange={handleInputChange}
                />
                <div className="relative md:mt-2 mt-5">
                    <input id="buttonText" name="buttonText" type="text" value={buttonText || ""} onChange={(e) => setButtonText(e.target.value)} className="peer h-10 pl-1 md:w-[600px] w-full border-b-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]" placeholder="Przycisk (opcjonalny)" />
                    <label htmlFor="buttonText" className="absolute left-0 -top-3.5 text-gray-600 text-sm pl-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Przycisk (opcjonalny)</label>
                </div>
                <div className="relative md:mt-2 mt-5">
                    <input id="buttonLink" name="buttonLink" type="text" value={buttonLink || ""} onChange={(e) => setButtonLink(e.target.value)} disabled={!buttonText ? true : false} className="peer h-10 pl-1 md:w-[600px] w-full border-b-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]" placeholder="Link dla przycisku (opcjonalny)" />
                    <label htmlFor="buttonLink" className="absolute left-0 -top-3.5 text-gray-600 text-sm pl-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Link dla przycisku (opcjonalny)</label>
                </div>
                <div className='md:w-[600px] w-full flex justify-start items-center md:mt-0 mt-5'>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" accept='image/*' id='fileInput' required value={picture || ""} onChange={(e) => setPicture(e.target.value)} className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-normal cursor-pointer file:cursor-pointer
                        file:bg-[#705555] file:text-white
                        hover:file:bg-[#816666]
                        "/>
                    </label>
                </div>
                <div className='md:w-[600px] w-full flex justify-center items-center gap-2 md:mt-2 mt-5'>
                    <button onClick={handleClose} className='w-full bg-[#cdbebf] text-[#fff] hover:scale-[1.03] duration-200 px-5 py-2 font-klein font-light tracking-widest'>Anuluj</button>
                    <button type='submit' disabled={loading} className='w-full bg-[#705555] text-[#fff] hover:scale-[1.03] duration-200 px-5 py-2 font-klein font-light tracking-widest'>
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
            </form>
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

export default AddArticleModal;