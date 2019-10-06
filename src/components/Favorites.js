import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WeatherContext from "../context/WeatherContext";
import SettingsContext from "../context/SettingsContext";
import WeatherList from "./WeatherList";
import WeatherListItem from "./WeatherListItem";
import { Container } from "react-bootstrap";
import { isEmpty } from "../Utils/utils";

export default function Favorites() {
  const weatherContext = useContext(WeatherContext);
  const { setLocation, getFavorites, favorites } = weatherContext;
  const settingsContext = useContext(SettingsContext);

  const { settings } = settingsContext;
  const { showAnimations } = settings;

  const onFavoriteClick = city => {
    setLocation(city);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="favorites pt-5 background-image">
      <Container>
        <div
          className="details"
          style={showAnimations ? {} : { animation: "none" }}
        >
          <h1 className="align-center mt-5 mb-3">Favorites</h1>
          {!isEmpty(favorites) ? (
            <WeatherList>
              {Object.keys(favorites).map((key, i) => (
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
          ) : (
            <h3 className="align-center">No Favorites in Stock</h3>
          )}
        </div>
      </Container>
    </div>
  );
}
