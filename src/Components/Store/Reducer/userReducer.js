import { SET_USER } from "../Action/userAction";
const DefaultValue = {
  user: null,
};

const userReducer = (state = DefaultValue, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
