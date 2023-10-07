import { NextResponse } from "next/server";


/**
 * 
 * NOTE:- ADD OPEN_WEATHER_API_SECRET to ENV
 *  GET Your API KEYS FROM 
 *  https://home.openweathermap.org/api_keys
 * 
 * @param {string} search
 * @return weatherdata more info https://openweathermap.org/api/geocoding-api#direct_name_fields
 * @returns {401 200 404 500} status codes
 * 
 */

export async function POST(request) {

  try {
    // retrive the data from the request
    const { search } = await request.json();
    //if type !== string return error message
    if (typeof search !== 'string' || !search) {
      return NextResponse.json(
        { message: "Inputs are not Valid" },
        { status: 401 }
      );
    }

    //Fetch api to the OpenWeatherAPI
    /**
     * requires ENV and search results
     * direct Query to get Geo-location data
     */
    const GetCityDetails = await fetch(
      `${process.env.OPEN_WEATHER_API_URL_GEO_DATA}/direct?q=${search}&limit=10&appid=${process.env.OPEN_WEATHER_API_SECRET}`,
      {
        method: "GET",
        next: { revalidate: 3600, tags: [search] }
      }
    );
    if (GetCityDetails.status === 200) {
      const data = await GetCityDetails.json()
      if (!data.length) {
        return NextResponse.json(
          { message: "Could Not Find What you are Looking for!" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { Cities: data },
        { status: 200 }
      );
    }
    if (GetCityDetails.status === 401) {
      return NextResponse.json(
        { message: "Oops! Something went wrong. Please try again later." },
        { status: 401 }
      );
    }
    if (GetCityDetails.status === 404) {
      return NextResponse.json(
        { message: "Could Not Find What you are Looking for!" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.log("/api/city| GET ROUTE", error);
    return NextResponse.json(
      { message: "Server Error, Please Try Again Later!" },
      { status: 500 }
    );
  }
}
