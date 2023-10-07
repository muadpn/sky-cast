"use client";
import { THEME_COLOR } from "@/components/buttons/ToggleThemeButton";
import WeatherLoadingSkelton from "@/components/weather/WeatherLoadingSkelton";
import { useTheme } from "next-themes";
import React, { useContext, useEffect, useState } from "react";
import WeatherIcon from "@/components/weather/Icons";
import { WeatherContext } from "@/context/WeatherDataProvider";
import { convert12HourTime } from "@/utils/ProcessWeatherData";
import { IoMdRefresh } from 'react-icons/io'
import SearchLoading from "./SearchLoading";

export default function WeatherReport() {
    const { weatherData, RetriveWeatherData } = useContext(WeatherContext);
    // let { weather, main, wind, System } = weatherData;
    // let { weather, main, wind, System }
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(false)
    }, [])
    const SPEEDCONVERTER = 3.6

    // if (isLoading) return <WeatherLoadingSkelton isLoaded={weatherData?.main ? false : true} />
    if (isLoading || !weatherData.main?.temp) return <WeatherLoadingSkelton/>


    // if (!weatherData?.main?.temp) return null
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
                <div className={`min-w-[90%] dark:bg-black/60 relative hover:dark:bg-black/30 transition-colors px-6 sm:px-10 md:px-6 drop-shadow-2xl shadow-slate-300  filter-none lg:px-10 py-10 rounded-3xl sm:min-w-[60%] md:min-w-[80%] lg:min-w-[70%]`}>
                    <div className="absolute top-2 right-5" onClick={() => handleRefresh(weatherData?.coord)}><IoMdRefresh size={24} /></div>
                    <div className="flex justify-between border-b-[2px] border-gray-400 py-2 px-4">
                        <h4 className=" ">Weather At</h4>
                        <p>{convert12HourTime(weatherData?.dateTime)}</p>
                    </div>
                    <div className="flex justify-between p-4 border-b-[1px] border-gray-700">
                        <div>
                            <div className="flex items-center gap-1">
                                {weatherData && <WeatherIcon code={weatherData?.weather[0]?.icon} size={24} />}
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
                            <p>{Math.floor(weatherData?.wind?.speed * SPEEDCONVERTER)} km/h</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Wind direction</p>
                            <p>{weatherData?.wind?.deg}°</p>
                        </div>
                    </div>
                    <div className="p-4 border-b-[1px] border-gray-700">
                        <div className="flex justify-between">
                            <p>Visibility</p>
                            <p>10 km</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

