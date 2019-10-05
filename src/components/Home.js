import React, { useContext, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuid from "uuid";
import WeatherList from "./WeatherList";
import Context from "../context/Context";
import AlertContext from '../context/AlertContext';
import AutoComplete from "./AutoComplete";
import { getDayByDate, isEmpty } from "../Utils/utils";
import WeatherListItem from "./WeatherListItem";
import Alerts from "./Alerts";

export default function Home() {
  const context = useContext(Context);
  const alertContext = useContext(AlertContext);
  const {
    fiveDaysForecast,
    location,
    getCurrentWeather,
    currentWeather,
    getFiveDaysForecast
  } = context;
  const { Headline = {}, DailyForecasts = [] } = fiveDaysForecast;
  const { forecast = {}, isFavorite } = currentWeather;
  const { alerts } = alertContext;
 

  useEffect(() => {
    if (location.Key) {
      getCurrentWeather(location);
    }
  }, [location]);

  useEffect(() => {
    if (location.Key) {
      getFiveDaysForecast(location.Key);
    }
  }, [location]);

  function addToFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    const cityId = location.Key;
    const newFavorite = {
      id: uuid.v4(),
      name: location.LocalizedName,
      currentWeather: forecast.DailyForecasts[0],
      code: location.Key
    };
    if (favorites) {
      if (!favorites[cityId]) {
        favorites[cityId] = newFavorite;
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    } else {
      favorites = {};
      favorites[cityId] = newFavorite;
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    getCurrentWeather(location);
  }

  function removeFromFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    const cityId = location.Key;
    if (favorites) {
      const newFavorites = Object.keys(favorites)
        .filter(key => key !== cityId)
        .reduce((newFavorites, key) => {
          newFavorites[key] = favorites[key];
          return newFavorites;
        }, {});
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      getCurrentWeather(location);
    }
  }

  return (
    <div className="home">
      <Container>
        <AutoComplete />
        <Alerts />
        <Card className="mt-5">
          <Card.Header className="header">
            <div className="d-flex">
              <div className="ml-2 float-right">
                <h1>{location.LocalizedName}</h1>
                <h4>
                  {forecast.DailyForecasts &&
                    forecast.DailyForecasts[0].Temperature.Maximum.Value}
                  &deg;
                </h4>
              </div>
            </div>
            <button
              onClick={isFavorite ? removeFromFavorites : addToFavorites}
              className="btn"
            >
              <h6>Favorite</h6>
              <FontAwesomeIcon
                icon="star"
                size="3x"
                className={isFavorite ? "favorite-button" : ""}
              />
            </button>
          </Card.Header>
          <Card.Body>
            <h2 className="mt-4 mb-5 align-center">{Headline.Text}</h2>
            <WeatherList>
              {DailyForecasts.map((item, i) => (
                <WeatherListItem
                  key={i}
                  header={getDayByDate(item.Date)}
                  body={item.Temperature.Maximum.Value}
                />
              ))}
            </WeatherList>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
