import SearchBar from "@/components/form/SearchBar";
import HeroTitle from "@/components/hero/HeroTitle";
import EncorageToSearch from "@/components/weather/EncorageToSearch";
import WeatherWidget from "@/components/weather/WeatherWidget";
import WeatherCartContainer from "@/container/WeatherCartContainer";
import { Suspense } from "react";


export default function Home() {
  return (
    <>
      <header className="flex items-center flex-col justify-center  my-10 ">
        <h1 className="text-4xl xs:text-5xl lg:text-6xl font-bold whitespace-pre flex flex-col md:flex-row">
          Your Weather <HeroTitle />
        </h1>
        <p className="max-w-xl text-sm xs:text-base lg:text-lg font-light text-center my-2">
          Get the latest weather information at your fingertips. Stay prepared
          and make informed decisions with real-time updates and accurate
          forecasts.
        </p>
      </header>
      <main className="grid grid-col-1 md:grid-cols-2 ">
        <section className="flex flex-col justify-start items-center gap-14 sm:gap-28 lg:gap-36 ">
          <Suspense fallback={<>Loading..</>}>
            <SearchBar />
          </Suspense>
          <Suspense fallback={<EncorageToSearch />}>
            <WeatherWidget />
          </Suspense>
        </section>
        <section className="my-6 md:my-0">
          <WeatherCartContainer />
        </section>
      </main>
    </>
  );
}
