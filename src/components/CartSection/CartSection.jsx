import React from 'react';
import './CartSection.css';

const CartSection = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-section">
      <h2 className="cart-title">Cart Summary</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">No items in cart</p>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">
        <strong>Total: ₹{total}</strong>
      </div>
    </div>
  );
};

export default CartSection;
