import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const FetcherSearch = ({ query, onResults }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const apiRDT = import.meta.env.VITE_TMDB_TOKEN;

  const [loading, setLoading] = useState(true);

  const fetchSearch = useCallback(async () => {
    if (!query) {
      onResults([]); // Clear results if query is empty
      return;
    }

    setLoading(true);
    try {
      const header = {
        accept: "application/json",
        Authorization: `Bearer ${apiRDT}`,
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`,
        { headers: header }
      );
      const movieData = response.data.results; // Access the results
      onResults(movieData); // Pass results back to the parent component
    } catch (error) {
      console.error("Error fetching data:", error);
      onResults([]); // Send empty results on error
    } finally {
      setLoading(false);
    }
  }, [apiKey, apiRDT, query, onResults]);

  useEffect(() => {
    fetchSearch();
  }, [fetchSearch]);

  return loading ? <div className="spinner"></div> : null; // Loading indicator
};

FetcherSearch.propTypes = {
  query: PropTypes.string.isRequired,
  onResults: PropTypes.func.isRequired,
};

export default FetcherSearch;