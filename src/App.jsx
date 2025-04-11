import React, { useState } from 'react';
import itemsData from './data/items';
import LeftPanel from './components/LeftPanel/LeftPanel';
import RightPanel from './components/RightPanel/RightPanel';
import './App.css';

function App() {
  const [bucketItems, setBucketItems] = useState([]);

  return (
    <div className="app-container">
      <LeftPanel items={itemsData} />
      <RightPanel bucketItems={bucketItems} />
    </div>
  );
}

export default App;
