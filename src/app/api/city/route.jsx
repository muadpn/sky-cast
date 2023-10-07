

import { NextResponse } from "next/server";

export async function POST(request) {

  try {
    const { search } = await request.json();
    const GetCityDetails = await fetch(
      `${process.env.OPEN_WEATHER_API_URL_GEO_DATA}/direct?q=${search}&limit=30&appid=${process.env.OPEN_WEATHER_API_SECRET}`,
      {
        method: "GET",
        next: { revalidate: 0, tags: [search] }
      }
    );
    if (GetCityDetails.status === 200) {
      const data = await GetCityDetails.json()
      return NextResponse.json(
        { Cities: data },
        { status: 200 }
      );
    }
    if (GetCityDetails.status === 401) {
      return NextResponse.json(
        { message: "Please Try Again Later." },
        { status: 401 }
      );
    }
    if (GetCityDetails.status === 404) {
      return NextResponse.json(
        { message: "Could Not Find What you are Looking for!" },
        { status: 401 }
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
