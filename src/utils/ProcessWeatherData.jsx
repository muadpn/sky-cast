export function ProccessWeatherData(
  data,
  FromTemp,
  ToTemp,
  TEMPERATURE,
  { server }
) {
  console.log(data)
  let System;
  let dateTime;
  if (server) {
    System = {
      type: data?.sys.type,
      id: data?.sys.id,
      country: data?.sys.country,
      sunrise: data?.sys.sunrise,
      sunset: data?.sys.sunset,
    };
    dateTime = data?.dt;
  }
  if (!server) {
    System = {
      type: data?.System.type,
      id: data?.System.id,
      country: data?.System.country,
      sunrise: data?.System.sunrise,
      sunset: data?.System.sunset,
    };
    dateTime = data?.dateTime;
  }
  function convertTemperature(Temp, FromTemp, ToTemp, TEMPERATURE) {
    if (
      FromTemp === TEMPERATURE.FAHRENHEIT &&
      ToTemp === TEMPERATURE.FAHRENHEIT
    ) {
      console.log("am here");
    }
    if (FromTemp === TEMPERATURE.CELSIUS && ToTemp === TEMPERATURE.CELSIUS) {
      console.log("am here");
    }
    let value;
    if (ToTemp === TEMPERATURE.KELVIN && FromTemp === TEMPERATURE.FAHRENHEIT) {
      console.log("am here");
      value = ((Temp - 273.15) * 9) / 5 + 32;
      return value.toFixed(2);
    }
    if (ToTemp === TEMPERATURE.KELVIN && FromTemp === TEMPERATURE.CELSIUS) {
      console.log("am here");
      value = Temp - 273.15;
      return value.toFixed(2);
    }
    if (FromTemp === TEMPERATURE.FAHRENHEIT && ToTemp === TEMPERATURE.CELSIUS) {
      console.log("am here");
      value = (Temp - 32) * (5 / 9);
      return value.toFixed(2);
    }
    if (FromTemp === TEMPERATURE.CELSIUS && ToTemp === TEMPERATURE.FAHRENHEIT) {
      console.log("am here");
      value = Temp * 1.8 + 32;
      return value.toFixed(2);
    }
  }
  const proccesedData = {
    coord: data.coord,
    weather: data.weather,
    main: {
      temp: convertTemperature(data?.main.temp, FromTemp, ToTemp, TEMPERATURE),
      feels_like: convertTemperature(
        data?.main.feels_like,
        FromTemp,
        ToTemp,
        TEMPERATURE
      ),
      temp_min: convertTemperature(
        data?.main.temp_min,
        FromTemp,
        ToTemp,
        TEMPERATURE
      ),
      temp_max: convertTemperature(
        data?.main.temp_max,
        FromTemp,
        ToTemp,
        TEMPERATURE
      ),
      pressure: data?.main.pressure,
      humidity: data?.main.humidity,
      sea_level: data?.main.sea_level,
      grnd_level: data?.main.grnd_level,
    },
    visibility: data?.visibility,
    wind: {
      speed: data?.wind.speed,
      deg: data?.wind.deg,
      gust: data?.wind.gust,
    },
    clouds: {
      all: data?.clouds.all,
    },
    dateTime,
    System: { ...System },
    timezone: data?.timezone,
    name: data?.name,
    cod: data?.cod,
  };

  return proccesedData;
}

export function GetLocalDate(UnixCode) {
  let date = new Date(UnixCode * 1000);
  var day = date.getDate();
  var month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  var year = date.getFullYear();
  var dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  var formattedDay = day < 10 ? "0" + day : day;
  var formattedMonth = month < 10 ? "0" + month : month;
  return (
    formattedDay + "-" + formattedMonth + " - " + dayOfWeek + " - " + year
  );
}
export function convert12HourTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours ? hours : 12;
  hours = hours % 12;
  let formattedTime = hours + ':' + minutes.slice(-2) + ' ' + ampm;
  return formattedTime
}