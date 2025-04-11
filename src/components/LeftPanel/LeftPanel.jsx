import React from 'react';
import CategoryRow from '../CategoryRow/CategoryRow';
import './LeftPanel.css';

const LeftPanel = ({ items }) => {
  return (
    <div className="left-panel">
      {items.map((category, index) => (
        <CategoryRow key={index} title={category.name} items={category.items} />
      ))}
    </div>
  );
};

export default LeftPanel;
