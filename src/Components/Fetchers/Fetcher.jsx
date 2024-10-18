import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const MovieFetcher = ({ onFetch }) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
    const accId = import.meta.env.VITE_TMDB_ACC_KEY;
    const baseUrl = import.meta.env.VITE_TMDB_BASE_URL;
    const baseImgUrl = import.meta.env.VITE_TMDB_BASE_IMG_URL;


    const [loading, setLoading] = useState(true);
    
  useEffect(() => {
    const fetchMovieList = async () => {
      setLoading(true);
      try {
        let header = { accept: "application/json", Authorization: "Bearer " + apiRDT +"" };
        const response = await axios.get(
          `${baseUrl}/genre/movie/list?api_key=${apiKey}`
           ,{
             headers: header,
           }
        );
        const movieList = response.data;
        console.log(movieList)
        
        onFetch(movieList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieList();
  }, [onFetch, accId, apiKey, apiRDT]);

  return loading ? <div className="spinner"></div> : null;
};

MovieFetcher.propTypes = {
  onFetch: PropTypes.func.isRequired,
};

export default MovieFetcher;
