import { SET_TOP, SET_TREND } from "../Action/movieAction";
const DefaultValue = {
  trend: null,
  topRated: null,
};

const trendReducer = (state = DefaultValue, action) => {
  switch (action.type) {
    case SET_TREND:
      return {
        ...state,
        trend: action.payload,
      };
    case SET_TOP:
      return {
        ...state,
        topRated: action.payload,
      };
    default:
      return state;
  }
};

export default trendReducer;
