import React, { useReducer } from "react";
import axios from "axios";
import Context from "./Context";
import Reducer from "./Reducer";

import {
  GET_5_DAILY_FORECAST,
  GET_CURRENT_WEATHER,
  GET_LOCATION,
  SET_LOCATION,
  CHANGE_FAVORITE_STATUS
} from "./types";

const apikey = "HtDadCJGC416Qr6QmEQ8rSm1Exh3wpZ9";

const forecastsURL = "http://dataservice.accuweather.com/forecasts/v1";
const dailyForecastURL = `${forecastsURL}/daily/1day/locationKey?apikey=HtDadCJGC416Qr6QmEQ8rSm1Exh3wpZ9&metric=true`;
const fiveForecastURL = `${forecastsURL}/daily/5day/locationKey?apikey=HtDadCJGC416Qr6QmEQ8rSm1Exh3wpZ9&metric=true`;

export const autocompleteURL = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apikey}&q=`;

const currentWeatherResponse = {
  Headline: {
    EffectiveDate: "2019-10-05T08:00:00+03:00",
    EffectiveEpochDate: 1570251600,
    Severity: 4,
    Text: "Pleasant this weekend",
    Category: "",
    EndDate: null,
    EndEpochDate: null,
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?unit=c&lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
  },
  DailyForecasts: [
    {
      Date: "2019-10-03T07:00:00+03:00",
      EpochDate: 1570075200,
      Temperature: {
        Minimum: {
          Value: 19.6,
          Unit: "C",
          UnitType: 17
        },
        Maximum: {
          Value: 29.1,
          Unit: "C",
          UnitType: 17
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
    }
  ]
};
const fiveDaysForecastResponse = {
  Headline: {
    EffectiveDate: "2019-10-05T08:00:00+03:00",
    EffectiveEpochDate: 1570251600,
    Severity: 4,
    Text: "Pleasant this weekend",
    Category: "",
    EndDate: null,
    EndEpochDate: null,
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?unit=c&lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?unit=c&lang=en-us"
  },
  DailyForecasts: [
    {
      Date: "2019-10-03T07:00:00+03:00",
      EpochDate: 1570075200,
      Temperature: {
        Minimum: {
          Value: 19.6,
          Unit: "C",
          UnitType: 17
        },
        Maximum: {
          Value: 29.1,
          Unit: "C",
          UnitType: 17
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us"
    },
    {
      Date: "2019-10-04T07:00:00+03:00",
      EpochDate: 1570161600,
      Temperature: {
        Minimum: {
          Value: 19.5,
          Unit: "C",
          UnitType: 17
        },
        Maximum: {
          Value: 29.5,
          Unit: "C",
          UnitType: 17
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us"
    },
    {
      Date: "2019-10-05T07:00:00+03:00",
      EpochDate: 1570248000,
      Temperature: {
        Minimum: {
          Value: 19.9,
          Unit: "C",
          UnitType: 17
        },
        Maximum: {
          Value: 29.4,
          Unit: "C",
          UnitType: 17
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us"
    },
    {
      Date: "2019-10-06T07:00:00+03:00",
      EpochDate: 1570334400,
      Temperature: {
        Minimum: {
          Value: 21.9,
          Unit: "C",
          UnitType: 17
        },
        Maximum: {
          Value: 29.4,
          Unit: "C",
          UnitType: 17
        }
      },
      Day: {
        Icon: 1,
        IconPhrase: "Sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 34,
        IconPhrase: "Mostly clear",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us"
    },
    {
      Date: "2019-10-07T07:00:00+03:00",
      EpochDate: 1570420800,
      Temperature: {
        Minimum: {
          Value: 20,
          Unit: "C",
          UnitType: 17
        },
        Maximum: {
          Value: 28.8,
          Unit: "C",
          UnitType: 17
        }
      },
      Day: {
        Icon: 2,
        IconPhrase: "Mostly sunny",
        HasPrecipitation: false
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
      Link:
        "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us"
    }
  ]
};

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

  //   Get Current Weather
  const getCurrentWeather = location => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (Object.keys(location).length !== 0) {
      if (favorites && favorites[location.AdministrativeArea.ID]) {
        // axios
        //   .get(
        //     `${dailyForecastURL.replace(
        //       "locationKey",
        //       favorites[location.AdministrativeArea.ID].code
        //     )}`
        //   )
        //   .then(res => {
        //     dispatch({
        //       type: GET_CURRENT_WEATHER,
        //       payload: { isFavorite: true, forecast: res.data }
        //     });
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      } else {
        // axios
        //   .get(`${dailyForecastURL.replace("locationKey", location.Key)}`)
        //   .then(res => {
        //     dispatch({
        //       type: GET_CURRENT_WEATHER,
        //       payload: { isFavorite: false, forecast: res.data }
        //     });
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      }
    }
  };
  //   Get 5 Daily Weather
  const getFiveDaysForecast = locationKey => {
    // axios
    //   .get(`${fiveForecastURL.replace("locationKey", locationKey)}`)
    //   .then(res => {
    //     dispatch({
    //         type: GET_5_DAILY_FORECAST,
    //         payload: res.data
    //       });
    //   })
    //   .catch(err => {
    //   });

  };

  //   Set Location
  const setLocation = (location = {}) => {
    dispatch({
      type: SET_LOCATION,
      payload: location
    });
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
        setLocation,
        changeFavoriteStatus
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
