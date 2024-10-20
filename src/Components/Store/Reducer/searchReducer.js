import { SET_SEARCH, SET_LOADING } from "../Action/movieAction";
const DefaultValue = {
  search: [],
  loading: false,
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
    default:
      return state;
  }
};

export default searchReducer;
