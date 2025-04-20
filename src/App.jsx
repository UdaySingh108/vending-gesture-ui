import React, { useState, useEffect, useRef } from 'react';
import itemsData from './data/items';
import LeftPanel from './components/LeftPanel/LeftPanel';
import RightPanel from './components/RightPanel/RightPanel';
import './App.css';
import io from 'socket.io-client';

function App() {
  const [bucketItems, setBucketItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const bucketRef = useRef(null);
  const [bucketBounds, setBucketBounds] = useState(null);

  useEffect(() => {
    if (bucketRef.current) {
      const rect = bucketRef.current.getBoundingClientRect();
      setBucketBounds(rect);
    }
  }, []);

  const handleClearCart = () => {
    console.log('Clearing cart from App');
    setBucketItems([]);
  };

  const handleCheckout = () => {
    alert('Checking out');
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
    const socket = io('http://localhost:5000');

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

        // ✅ Drop zone check
        if (bucketBounds) {
          const scaleX = bucketBounds.width / 200;
          const scaleY = bucketBounds.height / 120;

          const droppedInBucket =
            data.x >= 400 && data.x <= 600 &&
            data.y >= 350 && data.y <= 470;

            if (droppedInBucket) {
              console.log("✅ Dropped inside bucket UI!");
              
              const allItems = itemsData.flatMap(category => category.items);
              const droppedItem = allItems.find(item => item.id === Number(data.item_id));
            
              if (!droppedItem) {
                console.warn(`⚠️ No matching item found for ID: ${data.item_id}`);
                return;
              }
            
              handleItemDrop(droppedItem);
            }
        }

      } else if (data.type === 'clear_cart') {
        console.log('Clearing cart');
        setBucketItems([]);

      } else if (data.type === 'checkout') {
        console.log('Checkout gesture detected');
        setShowAlert(true);
        setBucketItems([]);
        setTimeout(() => setShowAlert(false), 3000);
      }
    });

    socket.on('disconnect', () => {
      console.log('WebSocket connection closed');
    });

    return () => {
      socket.disconnect();
    };
  }, [bucketBounds]); // ✅ include dependency

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

      {/* ✅ This is your visible bucket area */}
      <div
        ref={bucketRef}
        style={{
          position: "absolute",
          top:85,
          left: 1040,
          width: 140,
          height: 275,
          border: "2px solid orange",
          zIndex: 10
        }}
      >
        Bucket
      </div>
    </>
  );
}

export default App;
