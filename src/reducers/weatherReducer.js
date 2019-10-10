import {
  GET_CURRENT_WEATHER,
  GET_5_DAILY_FORECAST,
  SET_LOCATION,
  GET_FAVORITES
} from "../actions/types";

const initialState = {
    location: {},
    currentWeather: {
      isFavorite: false,
      forecast: {}
    },
    fiveDaysForecast: [],
    favorites: {}
  };

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case GET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload
      };
    case GET_5_DAILY_FORECAST:
      return {
        ...state,
        fiveDaysForecast: action.payload
      };
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
};
