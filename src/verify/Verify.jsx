import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../home/footer/Footer';
import Banner from './banner/Banner';
import Products from './product/Products';
import Gifts from '../home/gifts/Gifts';
import Modal from '../components/Modal/Modal';

const Verify = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState({ giftCardType: '', amount: '' });

  // Function to open the modal with card details
  const openModal = (giftCardType, amount) => {
    setCardDetails({ giftCardType, amount });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false); // Close the modal

  // Prevent background scroll when the modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  return (
    <>
      <Navbar />
      <Banner />
      <Products openModal={openModal} />  {/* Pass openModal to Products */}
      <Gifts />
      <Footer />
      {isModalOpen && (
        <Modal 
          closeModal={closeModal} 
          cardDetails={cardDetails}  // Pass card details to Modal
        />
      )}
    </>
  );
};

export default Verify;
