import { NextResponse } from "next/server";

export async function GET(request, { params }) {
 
    try {
      const [lon , lat] = params.coord

      if (
        !lon ||
        !lon ||
        typeof parseFloat(lon) !== "number" ||
        typeof parseFloat(lat) !== "number"
      ) {

        return NextResponse.json(
          {
            message: "Recieved geo-location is Incorrect",
          },
          {
            status: 404,
          }
        );
      }
      const data = await fetch(
        `${process.env.OPEN_WEATHER_API_URL_DATA}/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_SECRET}`, {
        method: "GET",
        next: { revalidate: 60 * 30, tags: [`${lat.toString()}, ${lon.toString()}`] }
      }
      );
      // .then((response) => response.json())
      // .catch((err) => {
      //   console.log("/api/weather (1) | GET", err);
      // });
      // console.log(data);
      if (data.status === 401) {
        return NextResponse.json(
          {
            message: "Something went down on server. Please Try again later",
          },
          {
            status: 401,
          }
        );
      }
      const res = await data.json();
      return NextResponse.json({ data: res }, { status: 200 });
    } catch (error) {
      console.log("am here");
      console.log(error);
      console.log("/api/weather (2) | GET", error);
      return NextResponse.json(
        {
          message: "Something went down on servers. Please Try again later",
        },
        {
          status: 500,
        }
      );
    }
}
