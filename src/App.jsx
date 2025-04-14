import React, { useState } from 'react';
import itemsData from './data/items';
import LeftPanel from './components/LeftPanel/LeftPanel';
import RightPanel from './components/RightPanel/RightPanel';
import './App.css';

function App() {
  const [bucketItems, setBucketItems] = useState([]);

  const handleItemDrop = (item) => {
    setBucketItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <div className="app-container">
      <LeftPanel items={itemsData} />
      <RightPanel bucketItems={bucketItems} onItemDrop={handleItemDrop} />
    </div>
  );
}

export default App;
