import React from "react";
import WeatherList from "./WeatherList";
import WeatherListItem from "./WeatherListItem";

export default function Favorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites"));

  return (
    <div className="weather-list">
      <WeatherList>
        {Object.keys(favorites).map(key => (
          <button className="favorite-item">  
          <WeatherListItem
            header={favorites[key].name}
            body={favorites[key].currentWeather.Temperature.Maximum.Value}
            footer={favorites[key].currentWeather.Day.IconPhrase}
          />
          </button>
        ))}
      </WeatherList>
    </div>
  );
}
