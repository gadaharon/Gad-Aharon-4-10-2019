import React, { useState } from "react";

export default function Switch(props) {
  const [value, setValue] = useState(true);

  function onValueChange(e) {
    setValue(e.target.checked);
    typeof props.onValueChange === "function" && props.onValueChange(!value);
  }

  return (
    <div className="custom-control custom-switch">
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
    </div>
  );
}
