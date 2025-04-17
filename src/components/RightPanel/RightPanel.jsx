import React from 'react';
import BucketArea from '../BucketArea/BucketArea';
import CartSection from '../CartSection/CartSection';
import CameraFeed from '../CameraFeed/CameraFeed';
import './RightPanel.css';

const RightPanel = ({ bucketItems, onItemDrop, onClearCart, onCheckout }) => {
  const totalCost = bucketItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="right-panel">
      <div className="right-panel-top">
        {/* BucketArea shows current cart items and handles new drops */}
        <BucketArea bucketItems={bucketItems} onItemDrop={onItemDrop} />
        {/* Live camera feed from gesture controller */}
        <CameraFeed />
      </div>
      {/* CartSection shows cart details and action buttons */}
      <CartSection
        cartItems={bucketItems}
        totalCost={totalCost}
        onClearCart={onClearCart}
        onCheckout={onCheckout}
      />
    </div>
  );
};

export default RightPanel;
