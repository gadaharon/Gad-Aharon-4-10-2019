import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import WeatherList from "./WeatherList";
import WeatherListItem from "./WeatherListItem";
import { getDayByDate } from "../Utils/utils";
import { dailyForecastURL } from "../context/State";

export default function Favorites() {
  let data = JSON.parse(localStorage.getItem("favorites"));
  const [favorites, setFavorites] = useState(data);
  const context = useContext(Context);
  const { setLocation, getDailyForecast } = context;

  

  const onFavoriteClick = city => {
    setLocation(city);
  };

  useEffect(() => {
    const currentDay = getDayByDate(Date.now);
    Object.keys(data).map(key => {
        if((data[key].currentWeather.Date) !== currentDay) {
            getDailyForecast(dailyForecastURL, key, res => {
                data[key].currentWeather = res
            })
        }
    })
  }, [favorites])

  return (
    <div>
      <h1 className="align-center">Favorites</h1>
      <div className="weather-list favorites-list">
        <WeatherList>
          {favorites && Object.keys(favorites).map((key, i) => (
            <Link
              to="/"
              onClick={() => onFavoriteClick(favorites[key].name)}
              className="favorite-item btn"
            >
              <WeatherListItem
                key={i}
                header={favorites[key].name}
                body={favorites[key].currentWeather.Temperature.Maximum.Value}
                footer={favorites[key].currentWeather.Day.IconPhrase}
              />
            </Link>
          ))}
        </WeatherList>
      </div>
    </div>
  );
}
