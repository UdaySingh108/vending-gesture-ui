import React from 'react';
import './CameraFeed.css';

const CameraFeed = () => {
  return (
    <div className="camera-feed">
      <img src="http://localhost:5000/video_feed" alt="Live Camera Feed" />
    </div>
  );
};

export default CameraFeed;