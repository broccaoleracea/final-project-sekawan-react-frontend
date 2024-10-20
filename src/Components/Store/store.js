import trendReducer from "./Reducer/trendReducer";
import detailReducer from "./Reducer/detailReducer";
import searchReducer from "./Reducer/searchReducer";
import listReducer from "./Reducer/listReducer";
import stateReducer from "./Reducer/stateReducer";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/userReducer";

const store = configureStore({
  reducer: {
    trend: trendReducer,
    detail: detailReducer,
    search: searchReducer,
    list: listReducer,
    itemState: stateReducer,

    loading: searchReducer,
    theme: searchReducer,
    user: userReducer,
  },
});
export default store;
