import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSearch, setLoading } from "../Store/Action/movieAction";

const FetcherSearch = ({ query, page }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiRDT = import.meta.env.VITE_TMDB_TOKEN;

  const dispatch = useDispatch();

  if (!page) {
    page = 1;
  }
  const fetchSearch = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const header = {
        accept: "application/json",
        Authorization: `Bearer ${apiRDT}`,
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}&api_key=${apiKey}`,
        { headers: header }
      );
      const movieData = response.data;
      dispatch(setSearch(movieData));
      console.log(movieData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [apiKey, apiRDT, query, page, dispatch]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return null;
};

FetcherSearch.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default FetcherSearch;
