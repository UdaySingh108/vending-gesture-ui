import React from "react";
import "./CartSection.css";

const CartSection = ({ cartItems, totalCost, onClearCart, onCheckout }) => {
  return (
    <div className="cart-section">
      <h2 className="cart-title">Cart</h2>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">Qty: {item.quantity}</span>
              </div>
              <span className="item-price">₹{item.price * item.quantity}</span>
            </div>
          ))
        )}
      </div>

      <div className="cart-total">
        <span>Total:</span>
        <span>₹{totalCost}</span>
      </div>

      <div className="cart-buttons">
        <button className="clear-btn" onClick={onClearCart}>Clear Cart</button>
        <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartSection;
