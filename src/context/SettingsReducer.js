import { TOGGLE_ANIMATIONS } from "./types";

export default (state, action) => {
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
