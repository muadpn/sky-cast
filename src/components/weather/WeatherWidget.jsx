"use client";
import { WeatherContext } from "@/context/WeatherDataProvider";

import { useContext, useEffect, useState } from "react";

import EncorageToSearch from "./EncorageToSearch";

import WeatherIcon from "./Icons";
const WeatherWidget = () => {
  const { weatherData, temperature, TEMPERATURE } = useContext(WeatherContext);
  const { weather, main, wind, System } = weatherData;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  // if (isLoading) return <SearchLoading />
  if (!main?.temp) return <EncorageToSearch />
  function GetLocalDate(UnixCode) {
    let date = new Date(UnixCode * 1000);
    var day = date.getDate();
    var month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    var year = date.getFullYear();
    var dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;
    return (
      formattedDay + "-" + formattedMonth + " - " + dayOfWeek + " - " + year
    );
  }
  // const GetIntialTempLetter = temperature 
  return (
    <article className="">
      <div className="flex items-center justify-center gap-4 ">
        <div className="flex">
          <h3 className="text-6xl font-light">{Math.floor(main?.temp)}</h3>
          <sup className="text-2xl my-2">°{temperature.charAt(0)}</sup>
        </div>
        <div className="gap-2 ">
          <div className="flex gap-1">
            <p>{weatherData.name},</p>
            <p>{System.country}</p>
          </div>
          <div>
            <p className="font-light text-base">
              {GetLocalDate(weatherData?.dateTime)}
            </p>
          </div>
        </div>
        <div className="self-start max-h-min justify-start ">
          {weatherData && <WeatherIcon code={weatherData?.weather[0]?.icon}
            size={80}
            className=" object-cover self-start justify-start"
          />}
        </div>
      </div>
    </article>
  );
};

export default WeatherWidget;
