import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  setLocation,
  getLocationByGeoPosition,
  getLocation
} from "../actions/weatherActions";

import AlertContext from "../context/AlertContext";
import { isEmpty, getCurrentPosition } from "../Utils/utils";

const DEFAULT_CITY = "Tel Aviv";

const AutoComplete = ({ weather, setLocation, getLocationByGeoPosition }) => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  const { location } = weather;

  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  useEffect(() => {
    if (isEmpty(location)) {
      if ("geolocation" in navigator) {
        setCurrentLocation();
      } else {
        setLocation(DEFAULT_CITY);
      }
    }
  }, []);

  const setCurrentLocation = async () => {
    try {
      const { coords } = await getCurrentPosition();
      getLocationByGeoPosition(
        { lat: coords.latitude, lng: coords.longitude },
        res => {
          setLocation(res.LocalizedName);
        },
        err => {
          setLocation(DEFAULT_CITY);
        }
      );
    } catch (err) {
      setLocation(DEFAULT_CITY);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (cities.length >= 1) {
      setLocation(cities[0].LocalizedName);
      setCity(cities[0].LocalizedName);
    } else {
      setAlert("Make sure you entered a valid city", "danger");
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
    if ((city && city !== "") || city !== " ") {
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
            {cities &&
              cities.map((item, i) => {
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
};

const mapStateToProps = state => ({
  weather: state.weather
});

export default connect(
  mapStateToProps,
  { setLocation, getLocationByGeoPosition, getLocation }
)(AutoComplete);
