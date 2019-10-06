import React, { useContext } from "react";
import SettingsContext from "../context/SettingsContext";

export default function WeatherListItem({
  header,
  body = null,
  footer = null
}) {
    
const settingsContext = useContext(SettingsContext);
const { settings } = settingsContext;
const { showAnimations } = settings;  

return (
    <li className="weather-list-item" style={showAnimations ? {} : { animation: "none" }}>
      <div className="item-light align-center">
        <h3>{header}</h3>
        <h4>{body}&deg;</h4>
        {footer && <h5 className="pt-3 pb-3">{footer}</h5>}
      </div>
    </li>
  );
}
