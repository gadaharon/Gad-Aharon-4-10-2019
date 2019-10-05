import React, { useContext, useEffect, useRef } from "react";
import { Container, Card, Button } from "react-bootstrap";
import uuid from "uuid";
import WeatherList from "./WeatherList";
import Context from "../context/Context";
import AutoComplete from "./AutoComplete";
import { getDayByDate } from "../Utils/utils";
import WeatherListItem from "./WeatherListItem";

export default function Home() {
  const context = useContext(Context);
  const {
    setLocation,
    fiveDaysForecast,
    location,
    getCurrentWeather,
    currentWeather,
    getFiveDaysForecast
  } = context;
  const { Headline = {}, DailyForecasts = [] } = fiveDaysForecast;
  const { forecast = {}, isFavorite } = currentWeather;

  useEffect(() => {
    setLocation("Tel Aviv");
  }, [currentWeather]);

  useEffect(() => {
    getCurrentWeather();
  }, [location]);

  useEffect(() => {
    if (location.Key) {
      getFiveDaysForecast(location.Key);
    }
  }, [location]);

  function addToFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    const cityId = location.AdministrativeArea.ID;
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
    getCurrentWeather();
  }

  function removeFromFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    const cityId = location.AdministrativeArea.ID;
    if (favorites) {
      const newFavorites = Object.keys(favorites)
        .filter(key => key !== cityId)
        .reduce((obj, key) => {
          obj[key] = favorites[key];
          return obj;
        }, {});
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      getCurrentWeather();
    }
  }

  return (
    <div>
      <Container>
        <AutoComplete />
        <Card className="mt-5">
          <Card.Header className="header">
            <div className="d-flex">
              <div className="pr-5 pl-4 bg-warning"></div>
              <div className="ml-2 float-right">
                <h6>{location.LocalizedName}</h6>
                <p>
                  {forecast.DailyForecasts &&
                    forecast.DailyForecasts[0].Temperature.Maximum.Value}
                  &#8451;
                </p>
              </div>
            </div>
            <Button
              onClick={isFavorite ? removeFromFavorites : addToFavorites}
              className={isFavorite ? "bg-danger" : "bg-secondary"}
            >
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Button>
          </Card.Header>
          <Card.Body>
            <h2 className="mt-4 mb-5 align-center">{Headline.Text}</h2>
            <WeatherList>
              {DailyForecasts.map((item, i) => (
                <WeatherListItem
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
