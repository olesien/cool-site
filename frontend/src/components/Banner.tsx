import React from "react";
import "../Banner.css"; // Ensure this CSS file contains your provided styles.

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <video
        className="banner-video"
        src="https://videos.pexels.com/video-files/7305163/7305163-uhd_2732_1440_25fps.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="banner-text">
        <h1>Welcome to Our Store</h1>
      </div>
    </div>
  );
};

export default Banner;
