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
    case "DELETE_RATING_SUCCESS":
      return {
        ...state,
        list: {
          ...state.list,
          total_results: state.list.total_results - 1,
          results: state.list.results.filter(
            (item) => item.id !== action.payload.id
          ),
        },
      };
    default:
      return state;
  }
};

export default listReducer;
