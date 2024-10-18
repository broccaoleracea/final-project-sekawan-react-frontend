import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const FetchDetail = ({ onFetch, id }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchDataAxios = async () => {
      try {
        const response = await axios.get(
          `developer.themoviedb.org/reference/movie-details/${id}`
        );
        const data = response.data;
        onFetch(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading when the request finishes
      }
    };
    fetchDataAxios();
  }, []);

  return loading ? <div className="spinner"></div> : null;
};

// Define prop types for FetchDetail
FetchDetail.propTypes = {
  onFetch: PropTypes.func.isRequired, // onFetch should be a required function
  id: PropTypes.string.isRequired, // Add id as a required string
};

export default FetchDetail;
