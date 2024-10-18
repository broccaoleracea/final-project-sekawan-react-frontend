import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setTrend } from "../../Components/Store/Action/movieAction";

const TrendMovieFetcher = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiRDT = import.meta.env.VITE_TMDB_TOKEN;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const fetchMovieList = useCallback(async () => {
    setLoading(true);
    try {
      let header = {
        accept: "application/json",
        Authorization: "Bearer " + apiRDT + "",
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
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
      setLoading(false);
    }
  }, [dispatch, apiKey, apiRDT]);

  useEffect(() => {
    fetchMovieList();
  }, [fetchMovieList]);

  return loading ? <div className="spinner"></div> : null;
};
TrendMovieFetcher.propTypes = {};

export default TrendMovieFetcher;
