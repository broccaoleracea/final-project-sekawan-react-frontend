import { SET_TREND } from "../Action/movieAction";
const DefaultValue = {
  trend: null,
};

const trendReducer = (state = DefaultValue, action) => {
  switch (action.type) {
    case SET_TREND:
      return {
        ...state,
        trend: action.payload,
      };
    default:
      return state;
  }
};

export default trendReducer;
