import { TOGGLE_ANIMATIONS } from "../actions/types";

export const toggleAnimations = isOn => dispatch => {
  dispatch({
    type: TOGGLE_ANIMATIONS,
    payload: isOn
  });
};
