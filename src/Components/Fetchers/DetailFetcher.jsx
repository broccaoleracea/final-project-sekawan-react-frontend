import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setMovieDetail } from "../Store/Action/detailAction";
import { setState } from "../Store/Action/movieAction";

const DetailMovieFetcher = ({ id, type }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    try {
      const header = {
        accept: "application/json",
        Authorization: `Bearer ${apiRDT}`,
      };
      let response, responseState;
      if (type == "movie") {
        console.log(
          `Accessed : https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey} and https://api.themoviedb.org/3/movie/${id}/account_states?api_key=${apiKey}`
        );
        response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
          { headers: header }
        );
        responseState = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/account_states?api_key=${apiKey}`,
          { headers: header }
        );
      } else if (type == "tv") {
        console.log(
          `Accessed : https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey} and https://api.themoviedb.org/3/tv/${id}/account_states?api_key=${apiKey}`
        );
        response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`,
          { headers: header }
        );
        responseState = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/account_states?api_key=${apiKey}`,
          { headers: header }
        );
      }
      const movieData = response.data;
      const stateData = responseState.data;
      console.log(movieData, stateData);
      console.log(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
      dispatch(setMovieDetail(movieData));
      dispatch(setState(stateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, apiKey, apiRDT, id, type]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  return loading ? <div className="spinner"></div> : null;
};

DetailMovieFetcher.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailMovieFetcher;
