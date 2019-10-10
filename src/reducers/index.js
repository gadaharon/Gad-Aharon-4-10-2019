import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import alertReducer from "./alertReducer";
import settingsReducer from './settingsReducer';

export default combineReducers({
  weather: weatherReducer,
  alerts: alertReducer,
  settings: settingsReducer 
});
