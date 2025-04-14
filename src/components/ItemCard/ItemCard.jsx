import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  return (
    <div
      className="item-card"
      draggable={true}
      onDragStart={handleDragStart}
    >
      <img src={item.image} alt={item.name} />
      <div className="item-info">
        <span>{item.name}</span>
        <span>₹{item.price}</span>
      </div>
    </div>
  );
};

export default ItemCard;
