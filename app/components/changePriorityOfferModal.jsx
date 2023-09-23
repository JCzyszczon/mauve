"use client";
import React from 'react';
import Image from 'next/image';
import MauveLogo from '../img/mauve_logo_transparent.png';
import { IoMdClose } from 'react-icons/io';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRef, useState } from 'react';
import supabase from '../config/supabaseClient';

function ChangePriorityOfferModal({ closeModal, props, tableN }) {
  const modalRef = useRef(null);
  const [messageTimer, setMessageTimer] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [failure, setFailure] = useState();
  
  const initialData = props.map((item, index) => ({
    id: item.id.toString(),
    content: item,
  }));
  
  const [languages, setLanguages] = useState(initialData);

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

  const handleApply = async () => {
    setLoading(true);

    for (const item of languages) {
        const dataToUpdate = {
            priorytet: item.content.priorytet,
        };

        const { data, error } = await supabase
        .from('oferta')
        .update(dataToUpdate)
        .eq('id', item.content.id)
        .select()

        if(error) {
            setMessage("Błąd podczas aktualizacji ofert");
            setModalState(true);
            setLoading(false);
            clearTimeout(messageTimer);
            setMessageTimer(setTimeout(() => setModalState(false), 3000));
            setFailure(true);
        }
    }
    setMessage("Pomyślnie zaktualizowano ofertę");
    setModalState(true);
    clearTimeout(messageTimer);
    setMessageTimer(setTimeout(() => window.location.reload(), 500));
    setFailure(false);
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const reorderedLanguages = [...languages];
    const [movedItem] = reorderedLanguages.splice(result.source.index, 1);
    reorderedLanguages.splice(result.destination.index, 0, movedItem);
    const updatedLanguages = reorderedLanguages.map((item, index) => ({
      ...item,
      content: {
        ...item.content,
        priorytet: index + 1,
      },
    }));
  
    setLanguages(updatedLanguages);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <section onClick={handleOutsideClick} className={`w-[100vw] h-full bg-[#00000099] fixed left-0 top-0 z-[10000000] flex justify-center items-start lg:py-[3%] py-[3%] lg:px-[5%] px-[3%] drop-shadow-2xl overflow-y-scroll overflow-x-hidden`}>
        <section ref={modalRef} className='lg:w-[70%] md:w-[90%] w-[99%] h-auto bg-[#fff] sm:px-20 px-6 py-8 flex flex-col rounded-md justify-center items-center gap-10'>
          <Image src={MauveLogo} alt="Logo" className='sm:w-[170px] w-[150px] h-auto mt-10' />
          <Droppable droppableId="languages">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {languages.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className='bg-[#eee] py-1 sm:px-5 px-2 mt-2 rounded-md font-klein sm:text-base text-sm'>
                        <p className='bg-[#fff] px-2 py-1 rounded-lg'>{item.content.tytul}</p>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
          </Droppable>
          <div className='lg:w-[70%] md:w-[90%] w-[99%] h-auto flex sm:flex-row flex-col sm:justify-between justify-center items-center gap-3'>
            <button onClick={handleClose} className='w-full bg-[#cdbebf] text-[#fff] hover:scale-[1.03] duration-200 px-5 py-2 font-klein font-light tracking-widest'>Anuluj</button>
            <button onClick={handleApply} className='w-full bg-[#705555] text-[#fff] hover:scale-[1.03] duration-200 px-5 py-2 font-klein font-light tracking-widest'>
            {loading ? (
            <div className='w-full flex justify-center items-center'>
                <svg className="mr-3 h-6 w-6 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
            ) : (
            <>Zatwierdź</>
            )}
            </button>
          </div>
        </section>
        {modalState && (
          <div className='sm:min-w-[200px] min-w-[90%] h-auto px-5 py-3 fixed sm:gap-5 gap-2 top-4 sm:right-4 sm:left-auto right-auto left-1/2 sm:-translate-x-0 -translate-x-1/2 bg-[#705555] z-[1000] rounded-md flex justify-between items-center overflow-hidden'>
            <p className='text-[#fff] sm:text-base text-sm font-klein tracking-wide font-extralight'>{message}</p>
            <IoMdClose onClick={handleClick} className='text-xl text-[#fff] hover:scale-[1.15] cursor-pointer duration-200' />
            <div className={`w-[5px] h-full absolute left-0 ${failure ? 'bg-[#ed2939]' : 'bg-[#3cb043]'}`}></div>
          </div>
        )}
      </section>
    </DragDropContext>

    );
        }

export default ChangePriorityOfferModal;