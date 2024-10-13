import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../home/footer/Footer';
import Banner from './banner/Banner';
import Products from './product/Products';
import Gifts from '../home/gifts/Gifts';
import Modal from '../components/Modal/Modal';

const Verify = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Banner />
      <Products openModal={openModal} /> 
      <Gifts />
      <Footer />
      {isModalOpen && <Modal closeModal={closeModal} />}
    </>
  );
}

export default Verify;
