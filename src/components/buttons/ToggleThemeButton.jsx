"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import DarkMoon from "@/assets/image/dark-moon.png";
import LightMoon from "@/assets/image/light-moon.png";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
// DEFAULT THEME_COLOR
export const THEME_COLOR = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
};

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [client, setClient] = useState(false);

  //handle Toggle States
  const handleThemeChange = () => {
    if (theme === THEME_COLOR.DARK) setTheme(THEME_COLOR.LIGHT);
    if (theme === THEME_COLOR.LIGHT) setTheme(THEME_COLOR.DARK);
    if (theme === THEME_COLOR.SYSTEM) setTheme(THEME_COLOR.DARK);
  };

  //to avoid hydration issue
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        key={theme === THEME_COLOR.DARK ? "DarkTheme" : "LightTheme"}
        transition={{ ease: "easeOut", duration: 1 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 200 }}
        onClick={handleThemeChange}
        className="relative "
      >
        {client && (
          <Image
            width={32}
            height={32}
            alt="Change Theme"
            src={theme === THEME_COLOR.DARK ? DarkMoon : LightMoon}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ToggleThemeButton;
