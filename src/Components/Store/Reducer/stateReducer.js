import { SET_STATE } from "../Action/movieAction";
const DefaultValue = {
  itemState: {},
};

const stateReducer = (state = DefaultValue, action) => {
  switch (action.type) {
    case SET_STATE:
      return {
        ...state,
        itemState: action.payload,
      };
    default:
      return state;
  }
};

export default stateReducer;
