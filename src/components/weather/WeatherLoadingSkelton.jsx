import { IoMdRefresh } from 'react-icons/io'
const WeatherLoadingSkelton = ({ isLoaded }) => {

    return (
        <article className="">
            {!isLoaded ? (
                <>
                    <div className="flex justify-center md:justify-start ">
                        <div className={`min-w-[90%] relative dark:bg-black/60 hover:dark:bg-black/30 transition-colors px-6 sm:px-10 md:px-6 drop-shadow-2xl shadow-slate-300  filter-none lg:px-10 py-10 rounded-3xl sm:min-w-[60%] md:min-w-[80%] lg:min-w-[70%]`}>
                            <div className="absolute top-2 right-5 animate-spin"><IoMdRefresh size={24} /></div>
                            <div className="flex justify-between border-b-[2px] border-gray-400 py-2 px-4">
                                <h4 className="">Current Weather</h4>
                                <p className='bg-slate-700/40 rounded-lg min-w-[100px] animate-pulse'></p>
                            </div>
                            <div className="flex justify-between p-4 border-b-[1px] border-gray-700">
                                <div>
                                    <div className="flex items-center gap-2  ">

                                        <p className="font-light text-xl bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse">

                                        </p>
                                    </div>
                                    {/* <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px]'></p> */}
                                </div>
                                <div className="flex items-center">
                                    <p className="font-extralight">RealFeel</p><p className="text-xs mx-[2px] rounded-full border-[1px] dark:border-white border-black min-w-[16px] max-h-[16px] grid place-content-center p-[0.5px] ">R</p> <p className="bg-slate-700/40 rounded-lg mx-1 min-w-[24px] min-h-[24px] animate-pulse "></p>
                                </div>
                            </div>
                            <div className="p-4 border-b-[1px] border-gray-700">
                                <div className="flex justify-between ">
                                    <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse'></p>
                                    <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse'></p>
                                </div>
                                <div className="flex justify-between py-2">
                                    <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse'></p>
                                    <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse'></p>
                                </div>
                            </div>
                            <div className="p-4 border-b-[1px] border-gray-700 py-2">
                                <div className="flex justify-between py-2">
                                    <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse'></p>
                                    <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse'></p>
                                </div>
                                <div className="flex justify-center py-2 bg-slate-700/40 rounded-lg min-w-[100px] min-h-[40px] animate-pulse">
                                    {/* <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse'></p> */}
                                    {/* <p className='bg-slate-700/40 rounded-lg min-w-[100px] min-h-[24px] animate-pulse'></p> */}
                                    Weather Insights Await - Start Searching
                                </div>
                            </div>
                            <div className="p-4 border-b-[1px] border-gray-700 ">
                                <div className="flex justify-between py-2 bg-slate-700/40 rounded-lg min-w-[100px] min-h-[40px] animate-pulse">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
                :
                null
            }
        </article >
    )
}

export default WeatherLoadingSkelton