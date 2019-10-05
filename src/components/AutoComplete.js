import React, { useContext, useState, useEffect } from "react";
import Context from "../context/Context";
import AlertContext from '../context/AlertContext';

export default function AutoComplete() {
  const [city, setCity] = useState("Tel Aviv");
  const [cities, setCities] = useState([]);

  const context = useContext(Context);
  const alertContext = useContext(AlertContext);
  const { setLocation, getLocation, location } = context;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (Object.keys(location).length === 0) {
      setLocation(city);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if(cities.length === 1 ){
      setLocation(city);
    } else {
      setAlert("Choose from the options below", "danger")
    }
    setCities([]);
    
  };

  const onClick = name => {
    setCity(name);
    setLocation(name);
    setCities([]);
  };

  const onTextChange = e => {
    console.log(cities);
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
          minLength={3}
          value={city}
          onChange={onTextChange}
          className="form-control mt-3 col-sm-5 mr-auto ml-auto "
          placeholder="Search"
        />
        <div className="input-group mt-2 col-sm-5 mr-auto ml-auto">
          <div className="autocomplete">
            {cities && cities.map((item, i) => {
              if (
                city !== "" &&
                item.LocalizedName.toLowerCase().includes(city.toLowerCase())
              ) {
                return (
                  <input
                    key={i}
                    type="button"
                    onClick={() => onClick(item.LocalizedName)}
                    className="btn btn-block btn-secondary"
                    value={item.LocalizedName}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
