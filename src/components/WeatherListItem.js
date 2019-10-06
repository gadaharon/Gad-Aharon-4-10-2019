import React from "react";

export default function WeatherListItem({
  header,
  body = null,
  footer = null
}) {
  return (
    <li className="weather-list-item">
      <div className="item-light align-center">
        <h3>{header}</h3>
        <h4>{body}&deg;</h4>
        {footer && <h5 className="pt-3 pb-3">{footer}</h5>}
      </div>
    </li>
  );
}
