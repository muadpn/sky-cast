"use client";
import { WeatherContext } from "@/context/WeatherDataProvider";
import { useDebounce } from "@/utils/debouncer";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TbWorldSearch } from "react-icons/tb";
import { toast } from "sonner";


const SearchBar = () => {
  //function to Fetch Weather data from Weather Context
  const { RetriveWeatherData } = useContext(WeatherContext);

  //animation config. tag: animationConfig
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
  //animation config animationConfig.

  // UseStates Tag : UseState
  const [InputSearchCity, setInputSearchCity] = useState({
    city: "",
  });
  const [receivedCity, setReceivedCity] = useState([]);
  const [ShowSearched, setShowSearched] = useState(false);
  const [SearchLoading, setSearchLoading] = useState(false);
  //UseStates Tag : UseState

  //deBounce the result by 600ms low level implimentation
  const CityDebounced = useDebounce(InputSearchCity.city);


  //useEffect starts tag: useEffectSearchCity
  // depend upon CityDebounced
  useEffect(() => {
    async function getCities() {
      try {
        //
        /**get data from api destructured data and status. 
         * 
         * @async
         * @returns - {status, data }
         * @param searchinputs
         */
        const { status, data } = await axios.post("/api/city", {
          search: CityDebounced,
        });

        //Found-
        if (status === 200) {
          // Confirming weather data exists
          if (!data.Cities.length) {
            setSearchLoading(false);
            return toast('Oops! City or country not found. Try again!')
          }
          //Save the data to view on ReceivedState for User Search B
          setShowSearched(true);
          setReceivedCity(data.Cities);
        }
        setSearchLoading(false);
      } catch (error) {
        setSearchLoading(false);
        if (error?.response?.data?.message) {
          return toast(error?.response?.data?.message);
        } else {
          return toast('Something Went Wrong')
        }
      }
    }

    //if debouced city is present and also greater than 2 
    if (CityDebounced && CityDebounced.length >= 2) {
      setSearchLoading(true);
      getCities();
    }
  }, [CityDebounced]);
  //useEffectSearchCity

  //Handle input Change.
  const handleCityChange = (e) => {
    setInputSearchCity((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };


  /**
   * set the handle SetData Takes up params
   * @param {lat, lon} location 
   * @returns void
   * 
   */
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

              className="top-10  rounded-lg my-1 z-10 bg- dark:bg-black min-w-[90%] sm:min-w-[60%] md:min-w-[80%] lg:min-w-[70%] py-2  absolute"
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
