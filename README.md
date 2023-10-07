
# SkyCast

Project Name: SkyCast - Weather Forecast & More

Discover the world through weather with SkyCast! Dive into a meteorological adventure that goes beyond just temperatures. Our sleek and intuitive web application offers a dynamic weather experience that's more than just a forecast.

🌦️ All-in-One Weather Data: SkyCast provides you with a comprehensive weather overview. From current temperature to date and time, location specifics, humidity, wind direction, pressure, and more, we've got your weather needs covered.

🌐 City Search: Simply search for your favorite cities to access real-time weather information instantly. Whether you're planning a trip or just curious about a location, SkyCast delivers the data you need.

🔄 Data Persistence: Worried about constantly refreshing for updates? Don't be! SkyCast automatically refreshes weather data every 30 minutes, ensuring you're always in the know.

🌗 Light & Dark Modes: Customize your experience with our stylish light and dark modes. Whether it's a bright day or a cozy night, SkyCast adapts to your preferences.

🌡️ Temperature Conversion: Switch between Fahrenheit and Celsius effortlessly to understand the weather on your terms.

Powered by Cutting-Edge Technologies: SkyCast is built using a tech stack that includes Axios for seamless data fetching, Framer Motion for delightful animations, Next.js for server-rendered speed, React for a robust UI, Tailwind CSS for modern styling, Sonner for toast notifications, and React Icons for stunning visuals.

Embrace the elements with SkyCast and make weather-watching an experience you'll look forward to. Explore the world, one forecast at a time! ⛅


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`OPEN_WEATHER_API_SECRET` 
you can get `OPEN_WEATHER_API_SECRET` from the mentioned url
https://home.openweathermap.org/api_keys

`OPEN_WEATHER_API_URL_DATA` = "https://api.openweathermap.org/data/2.5"

`OPEN_WEATHER_API_URL_GEO_DATA` = "http://api.openweathermap.org/geo/1.0/"



## Installation
Clone the repository using 

```bash
git clone https://github.com/muadpn/sky-cast.git

cd sky-cast

npm install

```
After configuring `.env` in your root folder which is `./sky-cast`

to run in developer mode type below command in your terminal on root folder `./sky-cast`
```bash
npm run dev
```
to run in Build mode Run 
```bash
npm run Build

<Long loading...>

npm start

```

## Demo

[`Click Here to View The Demo`](https://skycast-app.vercel.app/)

