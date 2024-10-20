export const SET_TREND = "SET_TREND";
export const SET_LOADING = "SET_LOADING";
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});
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

export const SET_THEME = "SET_THEME";
export const setTheme = (theme) => {
  return {
    type: SET_THEME,
    payload: theme,
  };
};
