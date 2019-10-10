import React, { useReducer } from "react";
import axios from "axios";
import WeatherContext from "./WeatherContext";
import WeatherReducer from "./WeatherReducer";

import {
  GET_5_DAILY_FORECAST,
  GET_CURRENT_WEATHER,
  SET_LOCATION,
  GET_FAVORITES
} from "./types";
import { getItem, isEmpty, setItem } from "../Utils/utils";

const apikey = "GAp6HemjRYlZmQ54TD2qC8ESHr8Bb055";

const forecastsURL = "http://dataservice.accuweather.com/forecasts/v1";
const locationURL = "http://dataservice.accuweather.com/locations/v1/cities";
export const dailyForecastURL = `${forecastsURL}/daily/1day/locationKey?apikey=${apikey}&metric=true`;
export const fiveForecastURL = `${forecastsURL}/daily/5day/locationKey?apikey=${apikey}&metric=true`;

export const autocompleteURL = `${locationURL}/autocomplete?apikey=${apikey}&q=`;
export const getByGeoPositionURL = `${locationURL}/geoposition/search?apikey=${apikey}&q={lat}%2C{lng}`;

const WeatherState = props => {
  const initialState = {
    location: {},
    currentWeather: {
      isFavorite: false,
      forecast: {}
    },
    fiveDaysForecast: [],
    favorites: {}
  };
  const [state, dispatch] = useReducer(WeatherReducer, initialState);

  //   Fetch forecast from server
  const getDailyForecast = (URL, locationKey, onFinish) => {
    axios
      .get(`${URL.replace("locationKey", locationKey)}`)
      .then(res => {
        onFinish(res.data);
      })
      .catch(err => {});
  };

  //   Get Current Weather
  const getCurrentWeather = location => {
    if (!isEmpty(location)) {
      //   Get favorites from local storage
      const favorites = getItem("favorites", {});
      const isFavorite = favorites && favorites[location.Key];

      getDailyForecast(dailyForecastURL, location.Key, res => {
        dispatch({
          type: GET_CURRENT_WEATHER,
          payload: { isFavorite, forecast: res }
        });
      });
    }
  };

  //   Get 5 Daily Weather
  const getFiveDaysForecast = locationKey => {
    getDailyForecast(fiveForecastURL, locationKey, res => {
      dispatch({
        type: GET_5_DAILY_FORECAST,
        payload: res
      });
    });
  };

  //   Set Location
  const setLocation = city => {
    getLocation(city, res => {
      dispatch({
        type: SET_LOCATION,
        payload: res[0]
      });
    });
  };

  //   Get locations from server
  const getLocation = (city, onFinish) => {
    axios
      .get(`${autocompleteURL}${city}`)
      .then(res => {
        onFinish(res.data);
      })
      .catch(err => {});
  };

  const getLocationByGeoPosition = ({ lat, lng }, onFinish) => {
    const url = getByGeoPositionURL.replace("{lat}%2C{lng}", `${lat}%2C${lng}`);
    axios
      .get(url)
      .then(res => {
        onFinish(res.data);
      })
      .catch(err => {});
  };

  const getFavorites = () => {
    const favorites = getItem("favorites", {});
    if (!isEmpty(favorites)) {
      Object.keys(favorites).forEach(key => {
        getDailyForecast(dailyForecastURL, key, res => {
          favorites[key].currentWeather = res.DailyForecasts[0];
        });
      });
    }
    setItem("favorites", favorites);
    dispatch({
      type: GET_FAVORITES,
      payload: favorites
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        location: state.location,
        currentWeather: state.currentWeather,
        fiveDaysForecast: state.fiveDaysForecast,
        favorites: state.favorites,
        getCurrentWeather,
        getFiveDaysForecast,
        getDailyForecast,
        getLocation,
        setLocation,
        getLocationByGeoPosition,
        getFavorites
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherState;
