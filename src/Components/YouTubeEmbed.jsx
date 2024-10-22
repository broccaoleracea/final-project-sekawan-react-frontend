import React, { lazy, Suspense } from "react";
const YouTube = lazy(() => import("react-youtube"));

const YoutubeEmbed = ({ videoId, width, height, autoplay }) => {
  const opts = {
    height: height || "390",
    width: width || "640",
    playerVars: {
      autoplay: autoplay || 0,
    },
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </Suspense>
  );
};

export default YoutubeEmbed;
