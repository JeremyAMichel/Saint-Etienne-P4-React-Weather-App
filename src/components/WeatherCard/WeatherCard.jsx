import WeatherDays from "./WeatherDays/WeatherDays";
import WeatherInfo from "./WeatherInfo/WeatherInfo";
import "./WeatherCard.css";
import { useState } from "react";
import { useEffect } from "react";

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);

  async function getData() {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=Saint-Etienne&days=5&aqi=no&alerts=no`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      const formattedWeatherData = {
        city: json.location.name,
        days: [
          json.forecast.forecastday[0].date,
          json.forecast.forecastday[1].date,
          json.forecast.forecastday[2].date,
          //  json.forecast.forecastday[3].date,
          //  json.forecast.forecastday[4].date,
        ],
        weatherByDay: [
          {
            avgTemp: json.forecast.forecastday[0].day.avgtemp_c,
            icon: json.forecast.forecastday[0].day.condition.icon,
            description: json.forecast.forecastday[0].day.condition.text,
            windSpeed: json.forecast.forecastday[0].day.maxwind_kph,
          },
          {
            avgTemp: json.forecast.forecastday[1].day.avgtemp_c,
            icon: json.forecast.forecastday[1].day.condition.icon,
            description: json.forecast.forecastday[1].day.condition.text,
            windSpeed: json.forecast.forecastday[1].day.maxwind_kph,
          },
          {
            avgTemp: json.forecast.forecastday[2].day.avgtemp_c,
            icon: json.forecast.forecastday[2].day.condition.icon,
            description: json.forecast.forecastday[2].day.condition.text,
            windSpeed: json.forecast.forecastday[2].day.maxwind_kph,
          },
          // {
          //   avgTemp: json.forecast.forecastday[3].day.avgtemp_c,
          //   icon: json.forecast.forecastday[3].day.condition.icon,
          //   description: json.forecast.forecastday[3].day.condition.text,
          //   windSpeed: json.forecast.forecastday[3].day.maxwind_kph
          // },
          // {
          //   avgTemp: json.forecast.forecastday[4].day.avgtemp_c,
          //   icon: json.forecast.forecastday[4].day.condition.icon,
          //   description: json.forecast.forecastday[4].day.condition.text,
          //   windSpeed: json.forecast.forecastday[4].day.maxwind_kph
          // }
        ],
      };

      setWeather(formattedWeatherData);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleDayClick(index) {
    setActiveDay(index);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="weather card blue-grey darken-1">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <WeatherInfo
            city={weather.city}
            weatherOfActiveDay={weather.weatherByDay[activeDay]}
          />

          <WeatherDays days={weather.days} activeDay={activeDay} handleDayClick={handleDayClick} />
        </>
      )}
    </div>
  );
}

// style="font-weight: bold"

export default WeatherCard;
