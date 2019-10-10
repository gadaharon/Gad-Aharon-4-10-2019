import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAlert } from "../actions/alertAction";
import { getLocation, getLocationByGeoPosition, setLocation } from "../actions/weatherActions";
import { getCurrentPosition, isEmpty } from "../Utils/utils";


const DEFAULT_CITY = "Tel Aviv";

const AutoComplete = ({
  weather,
  setLocation,
  getLocationByGeoPosition,
  setAlert
}) => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  const { location } = weather;

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

AutoComplete.propTypes = {
  weather: PropTypes.object.isRequired,
  setLocation: PropTypes.func.isRequired,
  getLocationByGeoPosition: PropTypes.func,
  setAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  weather: state.weather
});

export default connect(
  mapStateToProps,
  { setLocation, getLocationByGeoPosition, getLocation, setAlert }
)(AutoComplete);
