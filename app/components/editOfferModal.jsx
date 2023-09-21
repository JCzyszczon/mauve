"use client";
import React from 'react';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import MauveLogo from '../img/mauve_logo_transparent.png';
import supabase from '../config/supabaseClient';
import {IoMdClose} from 'react-icons/io';

function EditOfferModal({ closeModal, props, tableN }) {

  const modalRef = useRef(null);
  const [messageTimer, setMessageTimer] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputDescription, setInputDescription] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputTerms, setInputTerms] = useState('');
  const [title, setTitle] = useState(props.tytul);
  const [price, setPrice] = useState(props.cena);
  const [time, setTime] = useState(props.czas);
  const [picture, setPicture] = useState('');
  const [modalState, setModalState] = useState(false);
  const [failure, setFailure] = useState();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [picLoad, setPicLoad] = useState(false);
  const [filesCount, setFilesCount] = useState();

  const handleInputDescriptionChange = (e) => {
    setInputDescription(e.target.value);
  };

  const handleInputPriceChange = (e) => {
    setInputPrice(e.target.value);
  };

  const handleInputTermsChange = (e) => {
    setInputTerms(e.target.value);
  };

  const textToString = (paragrafyArray) => {
    return paragrafyArray.map((paragraf) => {
        return `${paragraf.tekst}`;
    }).join('\n\n');
  };

  const termsToString = (paragrafyArray) => {
    return paragrafyArray.map((paragraf) => {
      let tekst = paragraf.tekst;
  
      Object.keys(paragraf.linki).forEach((key) => {
        const link = paragraf.linki[key];
        const linkWithBrackets = `[${key}](${link})`;
        tekst = tekst.replace(`[${key}]`, linkWithBrackets);
      });
  
      return tekst;
    }).join('\n\n');
  };

  const priceToString = (paragrafyArray) => {
    return paragrafyArray.map((paragraf) => {
        return paragraf.cena ? `${paragraf.tekst} [${paragraf.cena}]` : `${paragraf.tekst}`;
    }).join('\n\n');
  };

  useEffect(() => {
    setInputTerms(props.regulamin ? termsToString(props.regulamin) : null);
    setInputPrice(props.cennik ? priceToString(props.cennik) : null);
    setInputDescription(props.paragrafy ? textToString(props.paragrafy) : null);

    async function fetchData() {
      const { data, error } = await supabase.storage
      .from('oferta')
      .list(props.id)

      setFilesCount(data.length ? data.length : '0');
    }

    fetchData();
  }, [props]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const uploadedImagesArray = [];
    const uploadedFilesArray = [];

    setLoading(true);

    const paragraphsArray = inputDescription.split('\n\n').map((paragraph) => {
        let newText = paragraph;
    
        return {
          tekst: newText.trim(),
        };
    });

    const priceArray = inputPrice.split('\n\n').map((paragraph) => {
        const cenaRegex = /\[(.*?)\]/;
        const cenaMatch = paragraph.match(cenaRegex);
        const cena = cenaMatch ? cenaMatch[1].trim() : '';

        const tekst = cenaMatch
        ? paragraph.replace(cenaRegex, '').trim()
        : paragraph.trim();

        return {
            tekst: tekst,
            cena: cena,
        };
    });

    const termsArray = !inputTerms ? null : inputTerms.split('\n\n').map((paragraph) => {
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


    if(selectedFiles) {
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const fileName = file.name;
            
            uploadedFilesArray.push(file);
            uploadedImagesArray.push({ zdj: fileName });
        }
    } else {
      if(props.zdjecia) {
        for (let i = 0; i < props.zdjecia.length; i++) {
          uploadedImagesArray.push(props.zdjecia[i]);
        }
      } else {
          uploadedImagesArray.push(null);
      }
    }

    const imgArr = await Promise.all(uploadedImagesArray);
    const fileArr = await Promise.all(uploadedFilesArray);

    if(imgArr) {
      const { data, error } = await supabase
      .from('oferta')
      .update({tytul: title, czas: time, cena: price,  paragrafy: paragraphsArray, cennik: priceArray, regulamin: termsArray, zdjecia: imgArr})
      .eq('id', props.id)
      .select()

      if(error) {
        setLoading(false);
        setMessage(`Błąd podczas edytowania oferty`);
        setModalState(true);
        clearTimeout(messageTimer);
        setMessageTimer(setTimeout(() => setModalState(false), 3000));
        setFailure(true);
      } else {
        if(fileArr.length > 0) {

          const { data: files, error } = await supabase.storage
          .from('oferta')
          .list(props.id);

          if(files && files.length > 0) {
            for (const file of files) {
              const { error } = await supabase.storage
              .from('oferta')
              .remove([`${props.id}/${file.name}`]);

              if(error) {
                setLoading(false);
                setMessage(`Błąd podczas usuwania zdjęć`);
                setModalState(true);
                clearTimeout(messageTimer);
                setMessageTimer(setTimeout(() => setModalState(false), 3000));
                setFailure(true);
              }
            }
          }

          for(let i = 0; i < fileArr.length; i++) {
            const file = fileArr[i];
            const fileName = file.name;
            const fileData = file;

            const { data: fileDt, error } = await supabase.storage
            .from('oferta')
            .upload(`${data[0].id}/${fileName}`, fileData)
    
            if(error) {
                setMessage(`Zdjęcie nr. ${i+1} znajduje się już w bazie`);
                setModalState(true);
                clearTimeout(messageTimer);
                setMessageTimer(setTimeout(() => setModalState(false), 3000));
                setFailure(true);
            }
          }
        }
        setMessage(`Pomyślnie edytowano ofertę`);
        setModalState(true);
        clearTimeout(messageTimer);
        setMessageTimer(setTimeout(() => window.location.reload(), 500));
        setFailure(false);
      }
    } else {
        setLoading(false);
        setMessage(`Błąd podczas dodawania zdjęć`);
        setModalState(true);
        clearTimeout(messageTimer);
        setMessageTimer(setTimeout(() => setModalState(false), 3000));
        setFailure(true);
    }
  };

  const deletePic = async () => {
    setPicLoad(true);

    const { data: files, error } = await supabase.storage
    .from('oferta')
    .list(props.id);

    if(files && files.length > 0) {
      for (const file of files) {
        const { error } = await supabase.storage
        .from('oferta')
        .remove([`${props.id}/${file.name}`]);

        if(error) {
          setPicLoad(false);
          setMessage(`Błąd podczas usuwania zdjęć`);
          setModalState(true);
          clearTimeout(messageTimer);
          setMessageTimer(setTimeout(() => setModalState(false), 3000));
          setFailure(true);
        } else {
          setFilesCount('0');
          const {data, error} = await supabase
          .from('oferta')
          .update({zdjecia: null})
          .eq('id', props.id)
          .select()

          if(error) {
            setPicLoad(false);
            setMessage(`Błąd podczas usuwania zdjęć`);
            setModalState(true);
            clearTimeout(messageTimer);
            setMessageTimer(setTimeout(() => setModalState(false), 3000));
            setFailure(true);
          }
        }
      }
    }
    setPicLoad(false);
    setMessage(`Pomyślnie usunięto zdjęcia`);
    setModalState(true);
    clearTimeout(messageTimer);
    setMessageTimer(setTimeout(() => setModalState(false), 3000));
    setFailure(false);
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
    <section onClick={handleOutsideClick} className={`w-[100vw] h-full bg-[#00000099] fixed left-0 top-0 z-[10000000] flex justify-center items-start lg:py-[2%] py-[3%] lg:px-[5%] px-[3%] drop-shadow-2xl overflow-y-scroll overflow-x-hidden`}>
        <section ref={modalRef} className='lg:w-[70%] md:w-[90%] w-[99%] h-auto bg-[#fff] sm:px-20 px-6 py-8 flex flex-col rounded-md justify-center items-center gap-10'>
            <Image src={MauveLogo} alt="Logo" className='sm:w-[170px] w-[150px] h-auto mt-10'/>
            <form onSubmit={handleFormSubmit} className='w-full h-auto md:flex block flex-col justify-center items-center gap-5 font-klein'>
                <div className="relative md:mt-0 mt-5">
                    <input id="title" name="title" type="text" value={title || ""} onChange={(e) => setTitle(e.target.value)} required className="peer h-10 md:w-[600px] pl-1 w-full border-b-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]" placeholder="Tytuł Oferty" />
                    <label htmlFor="title" className="absolute left-0 -top-3.5 text-gray-600 text-sm pl-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Tytuł Oferty</label>
                </div>
                <div className='md:w-[600px] w-full flex justify-between items-start gap-5'>
                    <div className="w-full relative md:mt-0 mt-5">
                        <input id="price" name="price" type="text" value={price || ""} required onChange={(e) => setPrice(e.target.value)} className="peer h-10 pl-1 md:w-[290px] w-full border-b-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]" placeholder="Cena" />
                        <label htmlFor="price" className="absolute left-0 -top-3.5 text-gray-600 text-sm pl-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Cena</label>
                    </div>
                    <div className="w-full relative md:mt-0 mt-5">
                        <input id="time" name="time" type="text" value={time || ""} required onChange={(e) => setTime(e.target.value)} className="peer h-10 pl-1 md:w-[290px] w-full border-b-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]" placeholder="Czas" />
                        <label htmlFor="time" className="absolute left-0 -top-3.5 text-gray-600 text-sm pl-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Czas</label>
                    </div>
                </div>
                <div className="relative md:mt-2 mt-7">
                    <textarea
                        rows="5"
                        cols="50"
                        id='description'
                        name='description'
                        className="peer md:w-[600px] p-1 w-full border-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]"
                        placeholder="Wprowadź opis..."
                        required
                        value={inputDescription}
                        onChange={handleInputDescriptionChange}
                    />
                    <label htmlFor="description" className="absolute left-0 -top-5 text-gray-600 text-sm pl-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">Wprowadź opis...</label>
                </div>
                <div className="relative md:mt-2 mt-7">
                    <textarea
                        rows="4"
                        cols="50"
                        id='cennik'
                        name='cennik'
                        className="peer md:w-[600px] p-1 w-full border-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]"
                        placeholder="Wprowadź cennik..."
                        required
                        value={inputPrice}
                        onChange={handleInputPriceChange}
                    />
                    <label htmlFor="cennik" className="absolute left-0 -top-5 text-gray-600 text-sm pl-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">Wprowadź cennik...</label>
                </div>
                <div className="relative md:mt-2 mt-7">
                    <textarea
                        rows="4"
                        cols="50"
                        id='regulamin'
                        name='regulamin'
                        className="peer md:w-[600px] p-1 w-full border-2 border-gray-300 text-gray-900 sm:text-base text-sm placeholder-transparent focus:outline-none focus:border-[#705555]"
                        placeholder="Wprowadź regulamin..."
                        value={inputTerms}
                        onChange={handleInputTermsChange}
                    />
                    <label htmlFor="regulamin" className="absolute left-0 -top-5 text-gray-600 text-sm pl-2 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">Wprowadź regulamin...</label>
                </div>
                <div className='md:w-[600px] w-full flex justify-start items-center md:mt-0 mt-3 font-klein'>
                    <p className='flex gap-1 items-center text-sm'>Liczba zdjęć: 
                    {filesCount ? (
                      <span>{filesCount}</span>
                    ) : (
                      <span className='w-[10px] h-[16px] bg-gray-200 animate-pulse'></span>
                    )}
                    </p>
                </div>
                <div className='md:w-[600px] w-full flex justify-between items-center md:mt-0 mt-3'>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input type="file" multiple accept='image/*' id='fileInput' onChange={handleFileChange} className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-normal cursor-pointer file:cursor-pointer
                        file:bg-[#705555] file:text-white
                        hover:file:bg-[#816666]
                        "/>
                    </label>
                    <button onClick={deletePic} type='button' disabled={!(filesCount !== '0')} className={`${filesCount !== '0' ? 'bg-[#705555] hover:bg-[#816666]' : 'bg-[#ccc]'}  duration-200 px-4 py-2 rounded-md text-sm text-[#fff] font-klein`}>
                    {picLoad ? (
                      <div className='w-full flex justify-center items-center px-5'>
                        <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    ) : (
                      <>Usuń zdjęcia</>
                    )}
                    </button>
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

export default EditOfferModal;