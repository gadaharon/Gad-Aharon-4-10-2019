import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uuid from "uuid";
import WeatherList from "./WeatherList";
import WeatherContext from "../context/WeatherContext";
import AlertContext from "../context/AlertContext";
import SettingsContext from "../context/SettingsContext";
import AutoComplete from "./AutoComplete";
import { getDayByDate, getItem, isEmpty, setItem } from "../Utils/utils";
import WeatherListItem from "./WeatherListItem";
import Alerts from "./Alerts";

export default function Home() {
  const weatherContext = useContext(WeatherContext);
  const settingsContext = useContext(SettingsContext);
  const alertContext = useContext(AlertContext);

  const {
    fiveDaysForecast,
    location,
    getCurrentWeather,
    currentWeather,
    getFiveDaysForecast
  } = weatherContext;
  const { Headline = {}, DailyForecasts = [] } = fiveDaysForecast;
  const { forecast = {}, isFavorite } = currentWeather;
  const { setAlert } = alertContext;

  const { settings } = settingsContext;
  const { showAnimations } = settings;

  useEffect(() => {
    // Get current weather and 5 daily forecast
    if (location.Key) {
      getCurrentWeather(location);
      getFiveDaysForecast(location.Key);
    }
  }, [location]);

  function addToFavorites() {
    let favorites = getItem("favorites", {});
    const key = location.Key;
    favorites[key] = {
      id: uuid.v4(),
      name: location.LocalizedName,
      currentWeather: forecast.DailyForecasts[0],
      code: location.Key
    };
    // update favorites in local storage
    setItem("favorites", favorites);
    setAlert("City added successfully to favorites", "success");
    getCurrentWeather(location);
  }

  function removeFromFavorites() {
    //  get items from local storage
    let favorites = getItem("favorites", {});
    const cityId = location.Key;
    if (!isEmpty(favorites)) {
      const newFavorites = Object.keys(favorites)
        .filter(key => key !== cityId)
        .reduce((newFavorites, key) => {
          newFavorites[key] = favorites[key];
          return newFavorites;
        }, {});
      setItem("favorites", newFavorites);
      setAlert("City removed successfully from favorites", "success");
      getCurrentWeather(location);
    }
  }

  return (
    <div className="home background-image">
      <Container>
        <AutoComplete />
        <Alerts />
        <div
          className="details mt-5"
          style={showAnimations ? {} : { animation: "none" }}
        >
          <div className="header">
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
            <span
              className="d-inline-block"
              tabIndex="0"
              data-toggle="tooltip"
              title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <button
                onClick={isFavorite ? removeFromFavorites : addToFavorites}
                className="btn"
              >
                <h6 className="text-white">Favorites</h6>
                <FontAwesomeIcon
                  icon="heart"
                  size="3x"
                  className={isFavorite ? "favorite-button" : ""}
                />
              </button>
            </span>
          </div>
          <div>
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
          </div>
        </div>
      </Container>
    </div>
  );
}
