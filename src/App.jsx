import React, { useState, useEffect } from 'react';
import itemsData from './data/items';
import LeftPanel from './components/LeftPanel/LeftPanel';
import RightPanel from './components/RightPanel/RightPanel';
import './App.css';
import io from 'socket.io-client';

function App() {
  const [bucketItems, setBucketItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleClearCart = () => {
    console.log('Clearing cart from App');
    setBucketItems([]);
  };
  
  const handleCheckout = () => {
    alert('Checking out');
    // Add checkout logic here if needed
  };

  const handleItemDrop = (item) => {
    console.log("handleItemDrop called with:", item);
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

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Using socket.io-client for WebSocket

    socket.on('connect', () => {
      console.log('WebSocket connection established');
      console.log('Socket ID:', socket.id);
    });

    socket.on('gesture', (data) => {
      console.log('Received gesture event:', data);
      
      if (data.type === 'drag_start') {
        console.log('Drag started at:', data.x, data.y);
      } else if (data.type === 'drag_update') {
        console.log('Dragging at position:', data.x, data.y);
      } else if (data.type === 'drop') {
        console.log('Dropped item at:', data.x, data.y);
        if (data.inBucket) {
          const droppedItem = { id: 1, name: 'Item', price: 10 }; // Simulate item
          handleItemDrop(droppedItem);
        }
      }
      else if(data.type === 'clear_cart') {
        console.log('Clearing cart');
        setBucketItems([]);
      }
      else if(data.type === 'checkout') {
        console.log('Checkout gesture detected');
        setShowAlert(true);
        setBucketItems([]);
        setTimeout(() => setShowAlert(false), 3000); // Hide after 3 sec
        
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket connection closed');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
    {showAlert && (
      <div className="custom-alert">
        Checkout successful!
      </div>
    )}
    <div className="app-container">
      <LeftPanel items={itemsData} />
      <RightPanel
        bucketItems={bucketItems}
        onItemDrop={handleItemDrop}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />
    </div>
    </>
    
  );
}

export default App;
