export default function Loading() {
    return(
        <section className='md:w-[700px] w-[90%] h-[415px] flex flex-col gap-10 bg-[#ddd] justify-center items-center fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-20 animate-pulse'>
        <div className='md:w-[170px] w-[150px] h-[50px] bg-gray-200'></div>
        <div className='w-full flex flex-col justify-center items-center text-center gap-3'>
            <div className='px-4 py-2 lg:w-2/5 md:w-3/5 w-full h-[44px] bg-gray-200'></div>
            <div className='px-4 py-2 lg:w-2/5 md:w-3/5 w-full h-[44px] bg-gray-200'></div>
            <div className='w-[142px] h-[36px] bg-gray-200'></div>
        </div>
        </section>
    )
  }