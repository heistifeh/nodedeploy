import React from 'react';
import './Modal.css';

const Modal = ({ closeModal, cardDetails }) => {
  const { giftCardType, amount } = cardDetails;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal} aria-label="Close Modal">
          &times;
        </button>
        <h2>Verification Done!</h2>
        <p>BRAND: {giftCardType}</p>
        <p>AMOUNT: USD {amount}</p>
        <p>STATUS: Not activated</p>
        <button className="modal-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
