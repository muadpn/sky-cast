"use client";

import { ProccessWeatherData } from "@/utils/ProcessWeatherData";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const WeatherContext = createContext();

export const TEMPERATURE = {
  FAHRENHEIT: "Fahrenheit",
  CELSIUS: "Celsius",
  KELVIN: "Kelvin",
};
export default function WeatherDataProvider({ children }) {

  const STORAGE_NAME_WEATHER = "weather-info";
  const STORAGE_NAME_TEMPERATURE = "temperature";



  useEffect(() => {
    if (typeof window !== 'undefined') {
      let StoredWeather;
      let StoredTemperature;
      StoredWeather = JSON.parse(localStorage.getItem(STORAGE_NAME_WEATHER));
      StoredTemperature = JSON.parse(
        localStorage.getItem(STORAGE_NAME_TEMPERATURE)
      );
      if (!StoredWeather) {
        localStorage.setItem(STORAGE_NAME_WEATHER, JSON.stringify({}));
      }
      if (!StoredTemperature) {
        localStorage.setItem(
          STORAGE_NAME_TEMPERATURE,
          JSON.stringify(TEMPERATURE.CELSIUS)
        );
      }
      setTemperature(StoredTemperature)
      setWeatherData(StoredWeather)
    }
  }, [])
  const [temperature, setTemperature] = useState(
    TEMPERATURE.CELSIUS
  );
  const [weatherData, setWeatherData] = useState({});
  function ToggleTemperature() {
    console.log(temperature);
    console.log(weatherData.main.temp)
    if (temperature === TEMPERATURE.CELSIUS) {
      const proccesedData = ProccessWeatherData(
        weatherData,
        temperature,
        TEMPERATURE.FAHRENHEIT,
        TEMPERATURE,
        { server: false }
      );
      // console.log(proccesedData);
      localStorage.setItem(
        STORAGE_NAME_TEMPERATURE,
        JSON.stringify(TEMPERATURE.FAHRENHEIT)
      );
      localStorage.setItem(STORAGE_NAME_WEATHER, JSON.stringify(proccesedData));
      setWeatherData(proccesedData);
      setTemperature(TEMPERATURE.FAHRENHEIT);
      return;
    }
    if (temperature === TEMPERATURE.FAHRENHEIT) {
      const proccesedData = ProccessWeatherData(
        weatherData,
        temperature,
        TEMPERATURE.CELSIUS,
        TEMPERATURE,
        { server: false }
      );
      localStorage.setItem(
        STORAGE_NAME_TEMPERATURE,
        JSON.stringify(TEMPERATURE.CELSIUS)
      );
      localStorage.setItem(STORAGE_NAME_WEATHER, JSON.stringify(proccesedData));
      setWeatherData(proccesedData);
      setTemperature(TEMPERATURE.CELSIUS);
      return;
    }
    return toast("Unable to Change Temperature");
  }

  async function RetriveWeatherData(location) {

    const res = await fetch(
      `/api/weather/${location.lon}/${location.lat}`,
      {
        method: "GET",
        next: {
          tags: [JSON.stringify(location.lat, location.lon)],
          revalidate: 3600,
        },
      }
    );
    const { data } = await res.json();
    if (res.status !== 200) {
      if (data?.message) {
        return toast.error(data?.message);
      }
      return toast.error("Something went Wrong 😶‍🌫️");
    }
    if (res.status === 200) {
      const proccesedData = ProccessWeatherData(
        data,
        TEMPERATURE.CELSIUS,
        TEMPERATURE.KELVIN,
        TEMPERATURE,
        { server: true }
      );

      localStorage.setItem(STORAGE_NAME_WEATHER, JSON.stringify(proccesedData));
      setWeatherData(proccesedData);
      return { completed: true }
    }
  }
  return (
    <WeatherContext.Provider
      value={{
        RetriveWeatherData,
        weatherData,
        ToggleTemperature,
        temperature,
        TEMPERATURE,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
