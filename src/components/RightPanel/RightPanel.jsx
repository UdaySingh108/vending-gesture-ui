import React, { useState } from 'react';
import BucketArea from '../BucketArea/BucketArea';
import CartSection from '../CartSection/CartSection';
import CameraFeed from '../CameraFeed/CameraFeed'; // ✅ Import camera feed
import './RightPanel.css';

const RightPanel = ({ onItemDrop }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Add to Cart
  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // ✅ Clear Cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // ✅ Checkout
  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  // ✅ Total
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="right-panel">
      {/* Container for the top section of the right panel */}
      <div className="right-panel-top">
        {/* BucketArea component to display items in the bucket */}
        <BucketArea bucketItems={cartItems} onItemDrop={handleAddToCart} />
        {/* CameraFeed component to display the camera feed */}
        <CameraFeed />{/* ✅ Camera appears next to bucket */}
      </div>
      {/* CartSection component to display cart items, total cost, and actions */}
      <CartSection
        cartItems={cartItems}
        totalCost={totalCost}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default RightPanel;
