import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getFavorites, setLocation } from "../actions/weatherActions";
import { isEmpty } from "../Utils/utils";
import WeatherList from "./WeatherList";
import WeatherListItem from "./WeatherListItem";

const Favorites = ({ favorites, getFavorites, setLocation, settings }) => {
  const { showAnimations } = settings;

  const onFavoriteClick = city => {
    setLocation(city);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="favorites pt-5 background-image">
      <Container>
        <div
          className="details"
          style={showAnimations ? {} : { animation: "none" }}
        >
          <h1 className="align-center mt-5 mb-3">Favorites</h1>
          {!isEmpty(favorites) ? (
            <WeatherList>
              {Object.keys(favorites).map((key, i) => (
                <Link
                  key={i}
                  to="/"
                  onClick={() => onFavoriteClick(favorites[key].name)}
                  className="m-3 btn"
                >
                  <WeatherListItem
                    key={i}
                    header={favorites[key].name}
                    body={favorites[
                      key
                    ].currentWeather.Temperature.Maximum.Value.toString()}
                    footer={favorites[key].currentWeather.Day.IconPhrase}
                  />
                </Link>
              ))}
            </WeatherList>
          ) : (
            <h3 className="align-center">No Favorites in Stock</h3>
          )}
        </div>
      </Container>
    </div>
  );
};

Favorites.propTypes = {
  favorites: PropTypes.object.isRequired,
  getFavorites: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  favorites: state.weather.favorites,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { setLocation, getFavorites }
)(Favorites);
