"use client";
import { WeatherContext } from "@/context/WeatherDataProvider";
import { useContext } from "react";
import EncorageToSearch from "./EncorageToSearch";
import WeatherIcon from "./Icons";
import { GetLocalDate } from "@/utils/Converts";

/**
 * NOTE: require GetLocalDate to convert To LocalDate
 * @returns jsx elements
 */
const WeatherWidget = () => {
  const { weatherData, temperature } = useContext(WeatherContext);
  
  //check if the temp exists if not Ask User to search
  if (!weatherData?.main?.temp) return <EncorageToSearch />
  return (
    <article className="">
      <div className="flex items-center justify-center gap-4 ">
        <div className="flex">
          <h3 className="text-6xl font-light">{Math.floor(weatherData?.main?.temp)}</h3>
          <sup className="text-2xl my-2">°{temperature?.charAt(0)}</sup>
        </div>
        <div className="gap-2 ">
          <div className="flex gap-1 items-end ">
            <p className="text-2xl">{weatherData?.name},</p>
            <p>{weatherData?.System?.country}</p>
          </div>
          <div>
            <p className="text-sm">
              {GetLocalDate(weatherData?.dateTime)}
            </p>
          </div>
        </div>
        <div className="self-start max-h-min justify-start">
          <div className="flex flex-col items-center">
            {weatherData && <WeatherIcon code={`A${weatherData?.weather[0]?.icon}`} size={50} />}
            <h1 className="font-medium">{weatherData?.weather[0]?.main}</h1>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WeatherWidget;
