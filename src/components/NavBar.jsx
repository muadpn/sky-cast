import React from "react";
import ToggleThemeButton from "./buttons/ToggleThemeButton";
import ToggleTemperatureButton from "./buttons/ToggleTemp";
import Logo from '@/assets/image/weather.png'
import Image from "next/image";
import { BsClouds } from "react-icons/bs";

export default function NavBar() {
  return (
    <nav className="flex justify-between w-full my-2 grow-0 shrink-0">
      <div className="flex items-center justify-center gap-2">
      
        <BsClouds size={42}/>
        <h1 className="text-4xl font-bold">SkyCast</h1>
      </div>
      <div className="flex items-center justify-center  overflow-clip relative grow-0 shrink-0">
        <ToggleTemperatureButton />
        <ToggleThemeButton />
      </div>
    </nav>
  );
}
