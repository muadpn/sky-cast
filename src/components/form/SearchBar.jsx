"use client";
import { WeatherContext } from "@/context/WeatherDataProvider";
import { useDebounce } from "@/utils/debouncer";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TbWorldSearch } from "react-icons/tb";
import { toast } from "sonner";
// import useSWR from "swr";

let demoData = [
  {
    name: "Kochi",
    local_names: {
      he: "קוצ'י",
      ta: "கொச்சி",
      cs: "Kóčin",
      el: "Κοτσί",
      pa: "ਕੋਚੀ",
      ks: "کوچی",
      ur: "کوچی",
      kn: "ಕೊಚ್ಚಿ",
      es: "Cochín",
      en: "Kochi",
      uk: "Кочі",
      hi: "कोच्चि",
      ja: "コーチ",
      te: "కొచ్చి",
      zh: "科钦",
      ps: "کوچين",
      ar: "كوتشي",
      ml: "കൊച്ചി",
      fa: "کوچی",
      ru: "Коччи",
      sr: "Кочин",
    },
    lat: 9.931308,
    lon: 76.2674136,
    country: "IN",
    state: "Kerala",
  },
  {
    name: "Kochi",
    local_names: {
      feature_name: "Kōchi",
      ar: "كوتشي",
      mr: "कोची",
      ru: "Коти",
      uk: "Коті",
      es: "Kōchi",
      lt: "Kočis",
      de: "Kōchi",
      fr: "Kōchi",
      th: "โคจิ",
      en: "Kochi",
      sr: "Кочи",
      ko: "고치시",
      ascii: "Kōchi",
      cs: "Kóči",
      zh: "高知市",
      pl: "Kōchi",
      et: "Kōchi",
      az: "Koçi",
      sv: "Kochi",
      ml: "കൊച്ചി",
      ja: "高知市",
      eo: "Koĉo",
    },
    lat: 33.5680384,
    lon: 133.5394221,
    country: "JP",
  },
  {
    name: "Kochi",
    lat: 20.0287732,
    lon: 79.1231918,
    country: "IN",
    state: "Maharashtra",
  },
  {
    name: "Kochi",
    lat: 20.1870746,
    lon: 78.4556436,
    country: "IN",
    state: "Maharashtra",
  },
  {
    name: "Kochi",
    lat: 20.2938984,
    lon: 78.7724662,
    country: "IN",
    state: "Maharashtra",
  },
];

const SearchBar = () => {
  const { RetriveWeatherData } = useContext(WeatherContext);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 1,
      },
    },
  };
  const varient = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  const [InputSearchCity, setInputSearchCity] = useState({
    city: "",
  });
  const [receivedCity, setReceivedCity] = useState([]);
  const [ShowSearched, setShowSearched] = useState(false);
  const [SearchLoading, setSearchLoading] = useState(false);
  const CityDebounced = useDebounce(InputSearchCity.city);

  useEffect(() => {
    async function getCities() {
      console.log('first')
      setSearchLoading(true);
      try {
        const { status, data } = await axios.post("/api/city", {
          search: CityDebounced,
        });
        if (status === 200) {

          setReceivedCity(data.Cities);
          setTimeout(() => {
            setSearchLoading(false);
          }, [250]);
        }
      } catch (error) {
        console.log()
        if (error?.response?.message) {
          return toast(error?.response?.message);
        } else {
          return toast('Something Went Wrong')
        }
      }
    }
    if (CityDebounced && CityDebounced.length >= 2) {

      setShowSearched(true);
      toast.loading("Loading...", { duration: 1200 });
      getCities();
    }
  }, [CityDebounced]);
  const handleCityChange = (e) => {
    setInputSearchCity((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const HandleSetData = (location) => {
    RetriveWeatherData(location);
    setShowSearched(false);
  };
  return (
    <>
      <div className="flex items-center min-w-full  justify-center">
        <div className="min-w-full relative flex flex-col items-center justify-center  ">
          <form className="relative min-w-[90%] sm:min-w-[60%] md:min-w-[80%] lg:min-w-[70%] ">
            <label
              htmlFor="InputSearchCity"
              className="absolute min-h-full left-1  top-0 flex items-center"
            >
              <TbWorldSearch size={32} />
            </label>
            <input
              id="InputSearchCity"
              type="text"
              name="city"
              value={InputSearchCity.city}
              onFocus={() => setShowSearched(true)}
              onBlur={() =>
                setTimeout(() => {
                  setShowSearched(false);
                }, [500])
              }
              onChange={handleCityChange}
              className="w-full py-2 px-2 indent-9 rounded-xl bg-gray-700/10 dark:bg-gray-700/20"
              placeholder="Search City"
            />
            {SearchLoading && (
              <div className="absolute min-h-full right-1  top-0 flex items-center">
                <div className="min-w-[24px] flex items-center relative justify-center animate-spin  border-s-0 border-t-0 border-2 rounded-full min-h-[24px]">
                  <div className="min-h-[2px] animate-spin absolute  bg-black dark:bg-white  min-w-[12px]  rounded-full "></div>
                </div>
              </div>
            )}
          </form>

          {receivedCity.length > 0 && ShowSearched && (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="top-10  rounded-lg my-1 dark:bg-black/90 bg-blue-400/20  min-w-[90%] sm:min-w-[60%] md:min-w-[80%] lg:min-w-[70%] py-2  absolute"
            >
              {CityDebounced &&
                receivedCity
                  .filter((FilterItem) => {
                    if (
                      FilterItem.name
                        .toLowerCase()
                        .includes(InputSearchCity.city.toLowerCase())
                    ) {
                      return true;
                    }
                  })
                  .map((item) => {
                    return (
                      <motion.div
                        variants={varient}
                        initial="hidden"
                        animate="show"
                        key={`${item.lat.toString()}${item.lon.toString()}`}
                        className=" rounded-lg  relative z-20 dark:bg-gray-600/20 mx-2 bg-white hover:bg-gray-400  dark:hover:bg-gray-700  py-2 px-2 flex justify-between  items-center  first-of-type:my-0 my-1"
                        onClick={() => HandleSetData(item)}
                      >
                        <div className="">
                          {item.country && (
                            <div className="flex gap-3">
                              <p className="min-w-[24px]">{item.country} </p>
                              <p className=""> {item.name.trim()}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {item.state && <p>{item.state}</p>}
                        </div>
                      </motion.div>
                    );
                  })}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
