import { SET_MOVIE_DETAIL } from "../Action/detailAction";
const DefaultValue = {
  detail: {},
};

const detailReducer = (state = DefaultValue, action) => {
  switch (action.type) {
    case SET_MOVIE_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    default:
      return state;
  }
};

export default detailReducer;
