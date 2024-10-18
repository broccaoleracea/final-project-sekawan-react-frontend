export const SET_MOVIE_DETAIL = "SET_MOVIE_DETAIL";
export const setMovieDetail = (detail) => {
  return {
    type: SET_MOVIE_DETAIL,
    payload: detail,
  };
};
