import React from "react";

export default function WeatherListItem({
  header,
  body = null,
  footer = null
}) {
  return (
    <li className="weather-list-item">
      <div className="item align-center">
        <h3>{header}</h3>
        <h4>{body}&#8451;</h4>
        <h5>{footer}</h5>
      </div>
    </li>
  );
}
