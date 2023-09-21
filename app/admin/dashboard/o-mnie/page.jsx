"use client";
import Image from "next/image";
import sharedImage from '../../../components/sharedImage';
import { useEffect, useState } from "react";
import supabase from "../../../config/supabaseClient";
import Logo from '../../../img/mauve_logo_transparent.png';
import {IoMdClose} from 'react-icons/io';

const supabaseImport = (image) => {
  const imageUrl = supabase.storage.from('about').getPublicUrl(image);
  return imageUrl.data.publicUrl;
}

export default function Home() {

  const [aboutData, setAboutData] = useState();
  const [picture, setPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageTimer, setMessageTimer] = useState(null);
  const [message, setMessage] = useState('');
  const [modalState, setModalState] = useState(false);
  const [failure, setFailure] = useState();
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const paragrafyToString = (paragrafyArray) => {
    return paragrafyArray.map((paragraf) => {
      let tekst = paragraf.tekst;
      return tekst;
    }).join('\n\n');
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
      .from('about')
      .select()

      if (error) {
        console.log(error);
      } else {
        setAboutData(data);
        setInputText(paragrafyToString(data[0].paragrafy));  
      }
    }

    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const paragraphsArray = inputText.split('\n\n').map((paragraph) => {
      let newText = paragraph;
  
      return {
        tekst: newText.trim(),
      };
    });
    
    const fullPath = picture;
    const fileName = fullPath.split('\\').pop() || fullPath.split('/').pop();

    const fileInput = document.querySelector('#fileInput');
    const file = fileInput.files[0];

    setLoading(true);

    if (fileName && !(fileName === aboutData[0].zdjecie)) {
      const {data, error} = await supabase
      .from('about')
      .update({
        zdjecie: fileName,
      })
      .eq('id', 1);

      if(error) {
        setLoading(false);
        setMessage('Błąd podczas edycji zdjęcia');
        setModalState(true);
        clearTimeout(messageTimer);
        setFailure(true);
        setMessageTimer(setTimeout(() => setModalState(false), 3000));
      } else {
        const { data: fileData, error: fileError } = await supabase.storage
        .from('about')
        .upload(`${fileName}`, file);

        if(fileError) {
          setLoading(false);
          setMessage('Bład podczas dodawania zdjęcia');
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(true);
        } else {
          const { data: fileData, error: fileError } = await supabase.storage
          .from('about')
          .remove([aboutData[0].zdjecie])
          
          if(fileError) {
          setLoading(false);
          setMessage('Bład podczas usuwania zdjęcia');
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(true);
          }
        }
      }
    } else if (fileName === aboutData[0].zdjecie) {
        setLoading(false);
        setMessage('Zdjęcie już widnieje');
        setModalState(true);
        clearTimeout(messageTimer);
        setFailure(true);
        setMessageTimer(setTimeout(() => setModalState(false), 3000));
    }

    const { data, error } = await supabase
      .from('about')
      .update({
        paragrafy: paragraphsArray,
      })
      .eq('id', 1);

    if (error) {
      setLoading(false);
      setMessage('Błąd podczas edycji artykułu');
      setModalState(true);
      clearTimeout(messageTimer);
      setFailure(true);
      setMessageTimer(setTimeout(() => setModalState(false), 3000));
    } else {
      setMessage('Pomyślnie edytowano!');
      setModalState(true);
      setFailure(false);
      setMessageTimer(setTimeout(() => window.location.reload(), 500));
    }
  };

  const handleClick = () => {
    setModalState(false);
    setMessage(null);
  };

  return (
    <>
    <section className='w-full min-h-[500px] sm:px-10 px-5 pt-16 sm:pb-10 pb-5 relative drop-shadow-md bg-[#eee] flex justify-start items-start flex-col sm:gap-20 gap-10'>
      <Image src={sharedImage} alt="Background Image" fill={true} quality={100} className="bg-no-repeat bg-cover z-[-1]"/>
      <div className="w-full h-auto flex justify-center items-center">
        <Image src={Logo} alt="Logo" className="sm:w-[170px] w-[150px] h-auto"/>
      </div>
      <section className="w-full h-full flex sm:flex-row flex-col sm:gap-0 gap-5">
        <section className="sm:w-1/2 w-full h-full">
          <form onSubmit={handleFormSubmit} className="w-full h-auto">
            <textarea
              rows="16"
              cols="50"
              className='w-full border-2 p-1 border-gray-300 text-gray-900 sm:text-base text-sm focus:outline-none focus:border-[#705555]'
              placeholder="Wprowadź tekst..."
              value={inputText}
              onChange={handleInputChange}
              required
            />
            <div className='w-full flex justify-start items-center md:mt-5 mt-5'>
                <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input type="file" accept='image/*' id='fileInput' value={picture || ""} onChange={(e) => setPicture(e.target.value)} className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-normal cursor-pointer file:cursor-pointer
                    file:bg-[#705555] file:text-white
                    hover:file:bg-[#816666]
                    "/>
                </label>
            </div>
            <div className='w-full flex justify-start items-center md:mt-5 mt-5'>
              <button type='submit' disabled={loading} className='w-full bg-[#705555] text-[#fff] hover:scale-[1.03] duration-200 px-5 py-2 font-klein font-light tracking-[0.2em] uppercase'>
              {loading ? (
              <div className='w-full flex justify-center items-center'>
                  <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              </div>
              ) : (
              <>Zapisz zmiany</>
              )}
              </button>
            </div>
          </form>
        </section>
        <section className="sm:w-1/2 w-full flex justify-center items-center">
          {aboutData ? (
            <Image src={supabaseImport(aboutData[0].zdjecie)} width={350} height={520} alt={"Profile Picture"} className="xl:w-[50%] lg:w-[70%] sm:w-[90%] w-auto sm:h-auto h-[300px]"/>
          ) : (
            <div className="xl:w-[50%] md:w-[80%] sm:w-[90%] w-[50%] h-auto sm:min-h-[520px] min-h-[300px] flex justify-center items-center bg-[#eee]">
              <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </section>
      </section>
    </section>
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