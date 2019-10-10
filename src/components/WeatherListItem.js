import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const WeatherListItem = ({ header = '', body = '', footer = '', settings }) => {
  const { showAnimations } = settings;

  return (
    <li
      className="weather-list-item"
      style={showAnimations ? {} : { animation: "none" }}
    >
      <div className="item-light align-center">
        <h3>{header}</h3>
        <h4>{body}&deg;</h4>
        {footer && <h5 className="pt-3 pb-3">{footer}</h5>}
      </div>
    </li>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

WeatherListItem.propTypes = {
  header: PropTypes.string,
  settings: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(WeatherListItem);
