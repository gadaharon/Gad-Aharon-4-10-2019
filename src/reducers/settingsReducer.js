import { TOGGLE_ANIMATIONS } from "../actions/types";

const initialState = {
  showAnimations: true
};

export default (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case TOGGLE_ANIMATIONS:
      return {
        ...state,
        showAnimations: action.payload
      };
    default:
      return state;
  }
};
