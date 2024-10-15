import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function GiftCardList() {
  const [giftCards, setGiftCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect if not logged in
      return;
    }

    const fetchGiftCards = async () => {
      try {
        const response = await axios.get(`${API_URL}/giftcards`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGiftCards(response.data);
      } catch (err) {
        console.error('Error fetching gift cards:', err);
        setError('Failed to load gift cards.');
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCards();
  }, [navigate]);

  if (loading) return <p>Loading gift cards...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Gift Card List</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {giftCards.map((card) => (
          <li key={card._id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <p><strong>Type:</strong> {card.giftCardType}</p>
            <p><strong>Amount:</strong> ${card.amount}</p>
            <p><strong>Email:</strong> {card.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GiftCardList;
