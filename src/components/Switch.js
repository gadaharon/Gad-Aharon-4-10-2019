import React, { useState } from "react";
import PropTypes from "prop-types";

const Switch = (props) => {
  const [value, setValue] = useState(true);

  function onValueChange(e) {
    setValue(e.target.checked);
    typeof props.onValueChange === "function" && props.onValueChange(!value);
  }

  return (
    <div className="custom-control custom-switch">
      <span
        className="d-inline-block"
        tabIndex="0"
        data-toggle="tooltip"
        title={props.tooltipTitle}
      >
        <input
          type="checkbox"
          checked={value}
          onChange={onValueChange}
          className="custom-control-input"
          id="customSwitch1"
        />

        <label
          className="custom-control-label text-white"
          htmlFor="customSwitch1"
        >
          {props.label}
        </label>
      </span>
    </div>
  );
}

Switch.propTypes = {
  onValueChange: PropTypes.func.isRequired
}

export default Switch;
