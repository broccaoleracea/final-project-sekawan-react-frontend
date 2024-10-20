import React from "react";
import CreateAuth from "../Components/Login/CreateAuth";
import DeleteSession from "../Components/Login/DeleteSession";

const AuthTMDB = () => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="mockup-window bg-base-300 border m-5 max-w-screen-md">
        <div className="bg-base-200 flex px-4 py-16 gap-4">
          <div className="left-pane text-left basis-3/5">
            <h2 className="text-4xl font-black">Hello!</h2>
            <p>
              Please authenticate with your TMDB account to unlock various
              features of this app. Sync your lists between various devices, and
              more.
            </p>
            <h6 className="text-lg font-bold mt-3">How to authenticate?</h6>
            <p>
              First, you'll need to authenticate your TMDB account by signing
              in. Then come back to this page to validate your login. And now
              you're in! Wonderhoy.
            </p>
            <p className="text-slate-600 italic mt-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Please do not close this page during the process.
              </span>
            </p>
          </div>
          <div className="right-pane">
            <CreateAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTMDB;
