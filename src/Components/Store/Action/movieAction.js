export const SET_TREND = "SET_TREND";
export const setTrend = (trend) => {
  return {
    type: SET_TREND,
    payload: trend,
  };
};

export const SET_SEARCH = "SET_SEARCH";
export const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    payload: search,
  };
};

export const SET_LIST = "SET_LIST";
export const setList = (list) => {
  return {
    type: SET_LIST,
    payload: list,
  };
};

export const SET_STATE = "SET_STATE";
export const setState = (itemState) => {
  return {
    type: SET_STATE,
    payload: itemState,
  };
};
