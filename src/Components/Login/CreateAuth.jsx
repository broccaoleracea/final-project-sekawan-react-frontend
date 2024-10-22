import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateAuth = () => {
  const [token, setToken] = useState(null); // token
  const user = useSelector((state) => state.user.user);
  const [message, setMessage] = useState(""); // success/error messages
  const navigate = useNavigate();

  // create authentication token
  const createReqToken = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        { headers }
      );
      const requestToken = response.data.request_token;
      setToken(requestToken);
      window.open(
        `https://www.themoviedb.org/authenticate/${requestToken}`,
        "_blank",
        "noopener noreferrer"
      );
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Error while creating token.");
    }
  };

  // create session after successful authentication
  const CreateSession = async () => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;
    const apiRDT = import.meta.env.VITE_TMDB_API_TOKEN;

    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${apiRDT}`,
    };

    const body = {
      request_token: token,
    };

    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
        body,
        { headers }
      );

      //set session to expire
      // const expirationTime = new Date().getTime() + 3600000; // 1h (in ms)
      // localStorage.setItem("session_expiration", expirationTime);

      const sessionId = response.data.session_id;
      localStorage.setItem("session_id", sessionId);

      setMessage("Session successfully created!");
      // window.location.href = "/";
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Error while creating session.");
    } finally {
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {user ? (
        <div className="font-bold text-md">
          These actions are unavailable because you're already logged in.
        </div>
      ) : null}
      <div className="">
        <button
          className="btn btn-primary w-full"
          onClick={createReqToken}
          disabled={user || user != null}
        >
          Sign in using your TMDB account{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g fill="none" fillRule="evenodd">
              <path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8" />
            </g>
          </svg>
        </button>
        <p className="text-slate-600 italic text-left mt-1 text-sm">
          This will open TMDB's page on a new tab.
        </p>
      </div>
      <div className="">
        <button
          className="btn btn-accent w-full"
          onClick={CreateSession}
          disabled={!token}
        >
          Validate your login{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
        </button>
        <p className="text-slate-600 italic text-left mt-1 text-sm">
          Once validated, you'll get redirected to the homepage.
        </p>
      </div>
    </div>
  );
};

export default CreateAuth;
