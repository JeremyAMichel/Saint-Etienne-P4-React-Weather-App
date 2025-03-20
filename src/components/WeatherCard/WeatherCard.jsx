import WeatherDays from "./WeatherDays/WeatherDays";
import WeatherInfo from "./WeatherInfo/WeatherInfo";
import "./WeatherCard.css";
import { useState } from "react";
import { useEffect } from "react";

function WeatherCard() {
  const [weather, setWeather] = useState(null);

  async function getData() {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=Saint-Etienne&days=5&aqi=no&alerts=no`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      setWeather(json);
      console.log(json);
      
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="weather card blue-grey darken-1">
      <WeatherInfo />
      <WeatherDays />
    </div>
  );
}

// style="font-weight: bold"

export default WeatherCard;
