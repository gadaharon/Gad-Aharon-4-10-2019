import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import WeatherList from "./WeatherList";
import WeatherListItem from "./WeatherListItem";

export default function Favorites() {
 const context = useContext(Context);
 const { setLocation } = context;   
   
 const favorites = JSON.parse(localStorage.getItem("favorites"));

  const onFavoriteClick = (name) => {
    setLocation(name)
  }

  return (
    <div className="weather-list">
      <WeatherList>
        {Object.keys(favorites).map((key, i) => (
          <Link to="/" onClick={() => onFavoriteClick(favorites[key].name)} className="favorite-item btn">  
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
  );
}
