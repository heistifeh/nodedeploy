import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://nodedeploy-4m6t.onrender.com';

function GiftCardList() {
    const [giftCards, setGiftCards] = useState([]);  // Full data, including images
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if localStorage has enough space to store data
    const isLocalStorageAvailable = () => {
        try {
            const testKey = 'test';
            localStorage.setItem(testKey, '1');
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            console.warn('LocalStorage is not available:', e);
            return false;
        }
    };

    useEffect(() => {
        const fetchGiftCards = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/giftcards`);
                console.log('API Response:', data);  // Log the API response

                if (Array.isArray(data)) {
                    // Only store essential metadata in localStorage
                    const minimalGiftCards = data.map(card => ({
                        _id: card._id,
                        giftCardType: card.giftCardType,
                        amount: card.amount,
                        email: card.email
                    }));

                    // Check if localStorage is available and has enough space
                    if (isLocalStorageAvailable()) {
                        try {
                            localStorage.setItem('giftCards', JSON.stringify(minimalGiftCards));
                        } catch (e) {
                            console.warn('LocalStorage quota exceeded. Clearing storage.');
                            localStorage.clear();  // Clear storage to avoid quota errors
                        }
                    }

                    // Store the full data (with images) only in React state
                    setGiftCards(data);
                } else {
                    console.error('Invalid data format:', data);
                    setGiftCards([]);
                }

                setError(null);  // Clear any previous errors
            } catch (err) {
                console.error('Error fetching gift cards:', err);
                setError('Failed to load gift cards. Please try again.');
            } finally {
                setLoading(false);  // Stop the loading spinner
            }
        };

        fetchGiftCards();  // Fetch gift cards on component load
    }, []);

    // Show loading indicator while fetching data
    if (loading) {
        return <p>Loading gift cards...</p>;
    }

    // Display error message if there is an error
    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    console.log('GiftCards before mapping:', giftCards);  // Log state for debugging

    return (
        <div>
            <h2>Gift Card List</h2>
            <ul>
                {/* Render gift cards if available */}
                {giftCards.length > 0 ? (
                    giftCards.map((card, index) => (
                        <li key={card._id || index}>
                            <p><strong>Type:</strong> {card.giftCardType}</p>
                            <p><strong>Amount:</strong> ${card.amount}</p>
                            <p><strong>Email:</strong> {card.email}</p>
                            <div>
                                <p>Front Image:</p>
                                {card.frontImage ? (
                                    <img
                                        src={card.frontImage}
                                        alt="Front of gift card"
                                        width={200}
                                    />
                                ) : (
                                    <p>No front image available</p>
                                )}
                            </div>
                            <div>
                                <p>Back Image:</p>
                                {card.backImage ? (
                                    <img
                                        src={card.backImage}
                                        alt="Back of gift card"
                                        width={200}
                                    />
                                ) : (
                                    <p>No back image available</p>
                                )}
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No gift cards found</p>
                )}
            </ul>
        </div>
    );
}

export default GiftCardList;
