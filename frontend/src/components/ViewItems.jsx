import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Component එක load වෙද්දිම Items ටික backend එකෙන් ගන්නවා
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []); // හිස් array එකක් දැම්මම එක පාරක් විතරක් run වෙනවා

  return (
    <div style={{ marginTop: '40px', padding: '20px', borderTop: '2px solid #ccc' }}>
      <h2>📦 My Saved Items</h2>
      
      {items.length === 0 ? (
        <p>No items found. Add some items above!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {items.map((item) => (
            <div key={item._id} style={{ border: '1px solid gray', padding: '15px', borderRadius: '8px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{item.name}</h3>
              <p style={{ margin: '5px 0' }}><strong>Material:</strong> {item.material}</p>
              <p style={{ margin: '5px 0' }}><strong>Condition:</strong> {item.condition}</p>
              {item.description && <p style={{ margin: '5px 0' }}><strong>Description:</strong> {item.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}