import React from 'react';
import ItemCard from '../ItemCard/ItemCard';
import './CategoryRow.css';

const CategoryRow = ({ title, items }) => {
  return (
    <div className="category-row">
      <h2 className="category-title">{title}</h2>
      <div className="scroll-container">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;
