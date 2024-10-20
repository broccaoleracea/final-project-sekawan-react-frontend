import { useCallback, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  setLoading,
  setTrend,
} from "../../Components/Store/Action/movieAction";

const TrendMovieFetcher = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

  const dispatch = useDispatch();

  const fetchMovieList = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      let header = {
        accept: "application/json",
        Authorization: "Bearer " + apiRDT + "",
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
        {
          headers: header,
        }
      );
      const movieList = response.data.results;
      console.log(movieList);

      dispatch(setTrend(movieList));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, apiKey, apiRDT]);

  useEffect(() => {
    fetchMovieList();
  }, [fetchMovieList]);

  return null;
};
TrendMovieFetcher.propTypes = {};

export default TrendMovieFetcher;
