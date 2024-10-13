import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Access the environment variable correctly
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'; // Vite setup

function GiftCardList() {
    const [giftCards, setGiftCards] = useState(() => {
        const savedCards = localStorage.getItem('giftCards');
        return savedCards ? JSON.parse(savedCards) : [];
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGiftCards = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/giftcards`);
                setGiftCards(data);
                localStorage.setItem('giftCards', JSON.stringify(data));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching gift cards:', error);
                setLoading(false);
            }
        };

        if (giftCards.length === 0) {
            fetchGiftCards();
        } else {
            setLoading(false);
        }
    }, [giftCards]);

    if (loading) {
        return <p>Loading gift cards...</p>;
    }

    return (
        <div>
            <h2>Gift Card List</h2>
            <ul>
                {giftCards.length > 0 ? (
                    giftCards.map((card, index) => (
                        <li key={index}>
                            <p><strong>Type:</strong> {card.giftCardType}</p>
                            <p><strong>Amount:</strong> ${card.amount}</p>
                            <p><strong>Email:</strong> {card.email}</p>
                            <div>
                                <p>Front Image:</p>
                                {card.frontImage && (
                                    <img
                                        src={card.frontImage}
                                        alt="Front of gift card"
                                        width={200}
                                    />
                                )}
                            </div>
                            <div>
                                <p>Back Image:</p>
                                {card.backImage && (
                                    <img
                                        src={card.backImage}
                                        alt="Back of gift card"
                                        width={200}
                                    />
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
