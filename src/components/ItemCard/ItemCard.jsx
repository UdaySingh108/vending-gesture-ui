import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <h3>{item.name}</h3>
      <p>₹{item.price}</p>
    </div>
  );
};

export default ItemCard;