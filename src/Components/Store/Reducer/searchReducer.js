import { SET_SEARCH } from "../Action/movieAction";
const DefaultValue = {
  detail: {},
};

const searchReducer = (state = DefaultValue, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
      search: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
