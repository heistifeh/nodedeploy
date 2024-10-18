import React from 'react'; // Necessary for any React component
import './Modal.css'; // Adjust the path as necessary for your project structure

const Modal = ({ closeModal, cardDetails }) => {
  const { giftCardType, amount } = cardDetails;

  const handleClose = () => {
    closeModal(); // Ensure closeModal is defined in the parent component
    window.location.href = '/'; // Redirects to the homepage and reloads the page
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose} aria-label="Close Modal">
          &times;
        </button>
        <h2>Verification Done!</h2>
        <p>BRAND: {giftCardType}</p>
        <p>AMOUNT: USD {amount}</p>
        <p>STATUS: Not activated</p>
        <button className="modal-button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
