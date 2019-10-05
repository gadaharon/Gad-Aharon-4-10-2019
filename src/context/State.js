import React, { useReducer } from "react";
import axios from "axios";
import Context from "./Context";
import Reducer from "./Reducer";

import {
  GET_5_DAILY_FORECAST,
  GET_CURRENT_WEATHER,
  SET_LOCATION,
  CHANGE_FAVORITE_STATUS
} from "./types";

const apikey = "GAp6HemjRYlZmQ54TD2qC8ESHr8Bb055";
const forecastsURL = "http://dataservice.accuweather.com/forecasts/v1";
const dailyForecastURL = `${forecastsURL}/daily/1day/locationKey?apikey=${apikey}&metric=true`;
const fiveForecastURL = `${forecastsURL}/daily/5day/locationKey?apikey=${apikey}&metric=true`;

export const autocompleteURL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=`;

const State = props => {
  const initialState = {
    location: {},
    currentWeather: {
      isFavorite: false,
      forecast: {}
    },
    fiveDaysForecast: []
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  
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
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    let locationKey;
    if (Object.keys(location).length !== 0) {
      if (favorites && favorites[location.AdministrativeArea.ID]) {
        locationKey = favorites[location.AdministrativeArea.ID].code;
        getDailyForecast(dailyForecastURL, locationKey, res => {
          dispatch({
            type: GET_CURRENT_WEATHER,
            payload: { isFavorite: true, forecast: res }
          });
        });
      } else {
        locationKey = location.Key;
        getDailyForecast(dailyForecastURL, locationKey, res => {
          dispatch({
            type: GET_CURRENT_WEATHER,
            payload: { isFavorite: false, forecast: res }
          });
        });
      }
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

  const getLocation = (city, onFinish) => {
    axios
      .get(`${autocompleteURL}${city}`)
      .then(res => {
        onFinish(res.data);
      })
      .catch(err => {});
  };

  //   Change Favorite Status
  const changeFavoriteStatus = isFavorite => {
    dispatch({
      type: CHANGE_FAVORITE_STATUS,
      payload: { ...state.currentWeather, isFavorite }
    });
  };

  return (
    <Context.Provider
      value={{
        location: state.location,
        currentWeather: state.currentWeather,
        fiveDaysForecast: state.fiveDaysForecast,
        getCurrentWeather,
        getFiveDaysForecast,
        getLocation,
        setLocation,
        changeFavoriteStatus
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
