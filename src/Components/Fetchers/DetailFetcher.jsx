import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setMovieDetail } from "../Store/Action/detailAction";
import { setLoading, setState } from "../Store/Action/movieAction";

const DetailMovieFetcher = ({ id, type }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

  const dispatch = useDispatch();

  const fetchMovieDetails = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const header = {
        accept: "application/json",
        Authorization: `Bearer ${apiRDT}`,
      };
      let response, responseState;
      if (type == "movie") {
        response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&api_key=${apiKey}`,
          { headers: header }
        );
        responseState = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/account_states?api_key=${apiKey}`,
          { headers: header }
        );
      } else if (type == "tv") {
        response = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos&api_key=${apiKey}`,
          { headers: header }
        );
        responseState = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/account_states?api_key=${apiKey}`,
          { headers: header }
        );
      } else if (type == "person") {
        console.log(
          `Accessed : https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`
        );
        response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`,
          { headers: header }
        );
      }
      const movieData = response.data;
      const stateData = responseState?.data;
      console.log(movieData, stateData);
      dispatch(setMovieDetail(movieData));
      dispatch(setState(stateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, apiKey, apiRDT, id, type]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  return null;
};

DetailMovieFetcher.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailMovieFetcher;
