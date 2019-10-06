import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import WeatherList from "./WeatherList";
import WeatherListItem from "./WeatherListItem";
import { Container } from "react-bootstrap";

export default function Favorites() {
  const context = useContext(Context);
  const { setLocation, getFavorites, favorites } = context;

  const onFavoriteClick = city => {
    setLocation(city);
  };

  /**
 * const currentDay = getDayByDate(Date.now);
    Object.keys(data).map(key => {
        if((data[key].currentWeather.Date) !== currentDay) {
            getDailyForecast(dailyForecastURL, key, res => {
                data[key].currentWeather = res
            })
        }
    })
 */

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="favorites pt-5 background-image">
      <Container>
        <div className="details">
          <h1 className="align-center mt-5 mb-3">Favorites</h1>
          <WeatherList>
            {favorites &&
              Object.keys(favorites).map((key, i) => (
                <Link
                  to="/"
                  onClick={() => onFavoriteClick(favorites[key].name)}
                  className="m-3 btn"
                >
                  <WeatherListItem
                    key={i}
                    header={favorites[key].name}
                    body={
                      favorites[key].currentWeather.Temperature.Maximum.Value
                    }
                    footer={favorites[key].currentWeather.Day.IconPhrase}
                  />
                </Link>
              ))}
          </WeatherList>
        </div>
      </Container>
    </div>
  );
}
