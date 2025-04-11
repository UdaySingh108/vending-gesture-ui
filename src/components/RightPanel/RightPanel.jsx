import React from 'react';
import BucketArea from '../BucketArea/BucketArea';
import CartSection from '../CartSection/CartSection';
import './RightPanel.css';

const RightPanel = ({ bucketItems }) => {
  return (
    <div className="right-panel">
      <BucketArea bucketItems={bucketItems} />
      <CartSection cartItems={bucketItems} />
    </div>
  );
};

export default RightPanel;
