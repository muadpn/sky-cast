"use client";

import { WeatherContext } from "@/context/WeatherDataProvider";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from "react-icons/tb";
// FAHRENHEIT
// CELSIUS
export default function ToggleTemp() {
  const { ToggleTemperature, temperature, TEMPERATURE } =
    useContext(WeatherContext);
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    console.log("first");
    setIsClient(true);
  }, []);
  if (!isClient) {
    return (
      <>
        <p>Loading....</p>
      </>
    );
  }
  return (
    <button
      onClick={ToggleTemperature}
      className="px-4 transition-all ease-in-out duration-500"
    >
      {temperature === TEMPERATURE.CELSIUS && (
        <TbTemperatureCelsius size={24} />
      )}
      {temperature === TEMPERATURE.FAHRENHEIT && (
        <TbTemperatureFahrenheit size={24} />
      )}
    </button>
  );
}
