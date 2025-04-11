import React from 'react';
import './BucketArea.css';

const BucketArea = ({ bucketItems }) => {
  return (
    <div className="bucket-area">
      <h2 className="bucket-title">Bucket</h2>
      <div className="bucket-items">
        {bucketItems.length === 0 ? (
          <p className="empty-text">Drop items here</p>
        ) : (
          bucketItems.map((item, index) => (
            <div className="bucket-item" key={index}>
              <img src={item.image} alt={item.name} />
              <span>{item.name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BucketArea;
