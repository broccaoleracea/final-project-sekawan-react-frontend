import { SET_SEARCH, SET_LOADING, SET_THEME } from "../Action/movieAction";
const DefaultValue = {
  search: [],
  loading: false,
  theme: localStorage.getItem("theme") || "light", // Default to light if nothing is set
};

const searchReducer = (state = DefaultValue, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
