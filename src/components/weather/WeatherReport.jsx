"use client";
import WeatherLoadingSkelton from "@/components/weather/WeatherLoadingSkelton";
import React, { useContext, useEffect, useState } from "react";
import WeatherIcon from "@/components/weather/Icons";
import { WeatherContext } from "@/context/WeatherDataProvider";
import { IoMdRefresh } from 'react-icons/io'
import { convert12HourTime } from "@/utils/Converts";

// mtr / 1000 = KM
export const CONVERT_MTR_TO_KM_VALUE = 1000


export default function WeatherReport() {
    //get weatherdata from context
    const { weatherData, RetriveWeatherData } = useContext(WeatherContext);

    //checks if the page is loading || if it is in loading state
    const [isLoading, setIsLoading] = useState(true);

    //Loading to false if the page is loaded.
    useEffect(() => {
        setIsLoading(false)
    }, [])
    //if the server is loading or state is loading || weather the data is loading. || not Found
    if (isLoading || !weatherData.main?.temp) return <WeatherLoadingSkelton />

    /** refresh the data 
     * 
     * @param {lat , lon } coord 
     * @returns {true} completed
     */
    const handleRefresh = async (coord) => {
        setIsLoading(true)
        const { completed } = await RetriveWeatherData(coord);
        if (completed) {
            setIsLoading(false)
        }
    }
    return (
        <article className="">
            <div className="flex justify-center md:justify-start ">
                <div className={`min-w-[90%] bg-gray-400/20 hover:bg-gray-400/40 dark:bg-black/60 relative hover:dark:bg-black/30 transition-colors px-6 sm:px-10 md:px-6 drop-shadow-2xl shadow-slate-300  filter-none lg:px-10 py-10 rounded-3xl sm:min-w-[60%] md:min-w-[90%] lg:min-w-[70%]`}>
                    <div className="absolute top-2 right-5" onClick={() => handleRefresh(weatherData?.coord)}><IoMdRefresh size={24} /></div>
                    <div className="flex justify-between border-b-[2px] border-gray-400 py-2 px-4">
                        <h4 className=" ">Weather At</h4>
                        {/* converts Unix Time to 12HourTime */}
                        <p>{convert12HourTime(weatherData?.dateTime)}</p>
                    </div>
                    <div className="flex justify-between p-4 border-b-[1px] border-gray-700">
                        <div>
                            <div className="flex items-center gap-1">
                                {weatherData && <WeatherIcon code={`A${weatherData?.weather[0]?.icon}`} size={24} />}
                                <p className="font-light text-xl ">
                                    {Math.floor(weatherData?.main?.temp)}°
                                </p>
                            </div>
                            <p>{weatherData?.weather[0]?.description}°</p>
                        </div>
                        <div className="flex  items-center">
                            <p className="font-extralight">RealFeel</p><p className="text-xs mx-[2px] rounded-full border-[1px] dark:border-white border-black min-w-[16px] max-h-[16px] grid place-content-center p-[0.5px]">R</p> <p className="font-extralight">{Math.floor(weatherData?.main.feels_like)}°</p>
                        </div>
                    </div>
                    <div className="p-4 border-b-[1px] border-gray-700">
                        <div className="flex justify-between">
                            <p>Humidity</p>
                            <p>{weatherData?.main?.humidity}%</p>
                        </div>
                        <div className="flex justify-between">
                            <p>pressure</p>
                            <p>{weatherData?.main?.pressure} hpa</p>
                        </div>
                    </div>
                    <div className="p-4 border-b-[1px] border-gray-700">
                        <div className="flex justify-between">
                            <p>Wind Gusts</p>
                            <p>{Math.floor(weatherData?.wind?.speed * CONVERT_MTR_TO_KM_VALUE)} km/h</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Wind direction</p>
                            <p>{weatherData?.wind?.deg}°</p>
                        </div>
                    </div>
                    <div className="p-4 border-b-[1px] border-gray-700">
                        <div className="flex justify-between">
                            <p>Visibility</p>
                            <p>{weatherData.visibility / CONVERT_MTR_TO_KM_VALUE}/km</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

