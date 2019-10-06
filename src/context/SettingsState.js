import React, { useReducer } from "react";
import SettingsContext from "./SettingsContext";
import SettingsReducer from "./SettingsReducer";
import { TOGGLE_ANIMATIONS } from "./types";

const SettingsState = props => {
  const initialState = {
    showAnimations: true
  };

  const [state, dispatch] = useReducer(SettingsReducer, initialState);

  const toggleAnimations = (isOn) => {
    dispatch({
      type: TOGGLE_ANIMATIONS,
      payload: isOn
    });
  };

  return (
    <SettingsContext.Provider value={{ settings: state, toggleAnimations }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsState;
