import React from 'react';
import './BucketArea.css';

const BucketArea = ({ bucketItems, onItemDrop }) => {
  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const itemData = e.dataTransfer.getData("application/json");
    if (!itemData) return;
    const item = JSON.parse(itemData);
    onItemDrop(item); // This should trigger state update in App
  };

  return (
    <div className="bucket-area" onDragOver={handleDragOver} onDrop={handleDrop}>
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
