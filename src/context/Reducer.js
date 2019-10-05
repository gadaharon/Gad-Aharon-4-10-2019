import {
  GET_CURRENT_WEATHER,
  GET_5_DAILY_FORECAST,
  SET_LOCATION,
  CHANGE_FAVORITE_STATUS
} from "./types";

export default (state, action) => {
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
    case CHANGE_FAVORITE_STATUS:
      return {
        ...state,
        currentWeather: action.payload
      };
    default:
      return state;
  }
};
