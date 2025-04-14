import React, { useState } from 'react';
import BucketArea from '../BucketArea/BucketArea';
import CartSection from '../CartSection/CartSection';
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

  // ✅ Checkout (you can customize this later)
  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  // ✅ Calculate Total Cost
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="right-panel">
      <BucketArea bucketItems={cartItems} onItemDrop={handleAddToCart} />
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
