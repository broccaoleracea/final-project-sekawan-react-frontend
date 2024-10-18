import { SET_LIST } from "../Action/movieAction";
const DefaultValue = {
  list: {},
};

const listReducer = (state = DefaultValue, action) => {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
