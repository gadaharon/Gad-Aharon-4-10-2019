import React, { useContext, useState, useEffect } from "react";
import WeatherContext from "../context/WeatherContext";
import AlertContext from '../context/AlertContext';
import { isEmpty } from "../Utils/utils";

const DEFAULT_CITY = 'Tel Aviv';

export default function AutoComplete() {
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);

  const weatherContext = useContext(WeatherContext);
  const alertContext = useContext(AlertContext);
  const { setLocation, getLocation, location } = weatherContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isEmpty(location)) {
      setLocation(DEFAULT_CITY);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if(cities.length >= 1 ){
      setLocation(cities[0].LocalizedName);
      setCity(cities[0].LocalizedName);
    } else {
      setAlert("Make sure you entered a valid city", "danger")
    }
    setCities([]);
    
  };

  const onClick = name => {
    setCity(name);
    setLocation(name);
    setCities([]);
  };

  const onTextChange = e => {
    setCity(e.target.value);
    getCities();
  };

  //   Get Locations By Name
  const getCities = () => {
    if ((city && city !== "" ) || city !== " ") {
      getLocation(city, res => {
        setCities(res);
      });
    }
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={city}
          onChange={onTextChange}
          className="form-control mt-3 col-sm-5 mr-auto ml-auto "
          placeholder="Search"
        />
        <div className="input-group mt-2 col-sm-5 mr-auto ml-auto">
          <div className="autocomplete">
            {cities && cities.map((item, i) => {
                return (
                  <input
                    key={i}
                    type="button"
                    onClick={() => onClick(item.LocalizedName)}
                    className="btn btn-block btn-secondary"
                    value={item.LocalizedName}
                  />
                );
          
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
