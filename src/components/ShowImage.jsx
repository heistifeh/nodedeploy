import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GiftCard({ id }) {
    const [giftCard, setGiftCard] = useState({
        giftCardType: '',
        amount: 0,
        email: '',
        frontImage: '',
        backImage: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/giftcards/${id}`);
                setGiftCard(data); // Assuming backend is returning the base64 image strings as 'frontImage' and 'backImage'
            } catch (error) {
                console.error('Error fetching gift card data:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <h2>Gift Card Details</h2>
            <p>Type: {giftCard.giftCardType}</p>
            <p>Amount: ${giftCard.amount}</p>
            <p>Email: {giftCard.email}</p>
            <div>
                <p>Front Image:</p>
                {giftCard.frontImage && <img src={giftCard.frontImage} alt="Front of Gift Card" width={200} />}
            </div>
            <div>
                <p>Back Image:</p>
                {giftCard.backImage && <img src={giftCard.backImage} alt="Back of Gift Card" width={200} />}
            </div>
        </div>
    );
}

export default GiftCard;
