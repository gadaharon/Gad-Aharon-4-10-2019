import React from "react";


export default function WeatherList({ children }) {
  return (
    <div>
      <ul className="weather-list p-0">
        {children}
      </ul>
    </div>
  );
}



